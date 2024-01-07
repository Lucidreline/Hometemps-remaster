import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});

let ddbDocClient = DynamoDBDocumentClient.from(client);

// redirect dynamodb if this is ran locally
if (process.env.AWS_SAM_LOCAL) {
    ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({
        endpoint: "http://172.18.0.2:8000"
    }));
}

const tableName = "HomeTemps";

const dateToFormattedString = (dateObj) => {
    return `${("0" + dateObj.getMonth() + 1).slice(-2)}/${("0" + dateObj.getDate()).slice(-2)}/${dateObj.getFullYear()} ${("0" + dateObj.getHours()).slice(-2)}:${("0" + dateObj.getMinutes()).slice(-2)}`
}

const getXMostRecentTimestamps = (timestampQuantity) => {
    // GetBatchItem can only return 25 items at a time, for now I will cap it.
    if (timestampQuantity > 25) timestampQuantity = 25

    // get the current time
    let timestamp = new Date();
    timestamp.setHours(timestamp.getHours() - 8) // time zone change

    // get the current hour at the 0 minute
    let currentHour = new Date(timestamp.setMinutes(0))


    // get resulting list of formatted string timestamps
    const results = []
    for (let i = 0; i < timestampQuantity; i++) {
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

export const getXMostRecentItemsHandler = async (event) => {
    if (event.httpMethod !== 'GET')
        throw new Error(`getXMostRecentTimestampsMethod only accepts GET method, you tried: ${event.httpMethod} method.`);

    console.log('recieved: ', event)

    const timestampQuantity = event.pathParameters.timestampQuantity;
    const formattedKeys = formatTimestampsForQuery(getXMostRecentTimestamps(timestampQuantity))

    // var params = {
    //     RequestItems: {
    //         "HomeTemps": {
    //             Keys: [
    //                 { 'KEY_NAME': { N: 'KEY_VALUE_1' } },
    //                 { 'KEY_NAME': { N: 'KEY_VALUE_2' } },
    //                 { 'KEY_NAME': { N: 'KEY_VALUE_3' } }
    //             ],
    //             ProjectionExpression: 'KEY_NAME, ATTRIBUTE'
    //         }
    //     }
    // };

    // try {
    //     const data = await ddbDocClient.batchGetItem()
    //     var items = data.Items;
    // } catch (err) {
    //     console.log("Error", err);
    // }

    const response = {
        statusCode: 200,
        body: JSON.stringify({ keys: formattedKeys })
    };

    return response;
}