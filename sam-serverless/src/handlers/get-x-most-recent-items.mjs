import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});
import { BatchGetItemCommand } from "@aws-sdk/client-dynamodb";


let ddbDocClient = DynamoDBDocumentClient.from(client);

// redirect dynamodb if this is ran locally
if (process.env.AWS_SAM_LOCAL) {
    ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({
        endpoint: "http://172.20.0.2:8000"
    }));
}

const tableName = process.env.MAIN_TABLE;

const dateToFormattedString = (dateObj) => {
    return `${("0" + dateObj.getMonth() + 1).slice(-2)}/${("0" + dateObj.getDate()).slice(-2)}/${dateObj.getFullYear()} ${("0" + dateObj.getHours()).slice(-2)}:${("0" + dateObj.getMinutes()).slice(-2)}`
}

const getXMostRecentTimestamps = (timestampQuantity) => {
    // GetBatchItem can only return 25 items at a time, for now I will cap it.
    if (timestampQuantity > 25) timestampQuantity = 25

    // get the current time
    let timestamp = new Date();
    timestamp.setHours(timestamp.getHours() - 8) // time zone change
    console.log("Current Hour Check: ", timestamp.getHours())
    console.log("Timestamp Quantity", timestampQuantity)
    // get the current hour at the 0 minute
    let currentHour = new Date(timestamp.setMinutes(0))


    // get resulting list of formatted string timestamps
    const results = []
    results.push(dateToFormattedString(currentHour))
    for (let i = 0; i < timestampQuantity - 1; i++) {
        currentHour.setHours(currentHour.getHours() - 1)
        results.push(dateToFormattedString(currentHour))
    }
    console.log("timestamps that I'm looking for: ", JSON.stringify(results))
    return results.reverse()
}

const formatTimestampsForQuery = (timestamps) => {
    const results = []
    timestamps.forEach(timestamp => {
        results.push({ timestamp: { S: timestamp } })
    })
    return results
}

const formatQueriedData = (dataList) => {
    if (!dataList) return []

    const results = []

    dataList.forEach(item => {
        results.push(
            {
                timestamp: item.timestamp.S,
                temperature: Number(item.temperature.N),
                humidity: Number(item.humidity.N)
            }
        )
    })

    return results
}

export const getXMostRecentItemsHandler = async (event) => {
    if (event.httpMethod !== 'GET')
        throw new Error(`getXMostRecentTimestampsMethod only accepts GET method, you tried: ${event.httpMethod} method.`);

    console.log('recieved: ', event)

    const timestampQuantity = event.pathParameters.timestampQuantity;
    const formattedKeys = formatTimestampsForQuery(getXMostRecentTimestamps(timestampQuantity))
    var params = {
        RequestItems: {
            [tableName]: {
                Keys: formattedKeys,
                // ProjectionExpression: 'timestamp, timestamp'
            }
        }
    };

    let formattedData;

    try {
        const response = await ddbDocClient.send(new BatchGetItemCommand(params))
        let data;
        console.log("raw responce: ", response)
        if (response) {
            data = response.Responses[tableName]
            console.log('data: ', data)
            console.log(response)
        }
        else {
            data = []
        }

        formattedData = formatQueriedData(data)
    } catch (err) {
        console.log("Error", err);
    }

    console.log(formattedData)

    const response = {
        statusCode: 200,
        body: JSON.stringify({ items: formattedData })
    };

    return response;
}