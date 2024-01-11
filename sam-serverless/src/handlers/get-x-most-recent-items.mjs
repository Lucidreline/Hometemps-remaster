import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});
import { BatchGetItemCommand } from "@aws-sdk/client-dynamodb";


let ddbDocClient = DynamoDBDocumentClient.from(client);

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
    if (timestampQuantity > 25) timestampQuantity = 25

    // get the current time
    const timestamp = new Date();
    timestamp.setHours(timestamp.getHours() - 8) // time zone change

    // get the current hour at the 0 minute
    let currentHour = new Date(timestamp.setMinutes(0))


    // get resulting list of formatted string timestamps
    const results = []
    results.push(dateToFormattedString(currentHour))
    for (let i = 0; i < timestampQuantity - 1; i++) {
        currentHour.setHours(currentHour.getHours() - 1)
        results.push(dateToFormattedString(currentHour))
    }
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

    try {
        const response = await ddbDocClient.send(new BatchGetItemCommand(params))
        if (response)
            var data = response.Responses[tableName]

        else
            data = []


        var formattedData = formatQueriedData(data)
    } catch (err) {
        console.log("Error", err);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify({ items: formattedData })
    };

    return response;
}