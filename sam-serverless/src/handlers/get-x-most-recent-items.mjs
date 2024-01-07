import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});

let ddbDocClient = DynamoDBDocumentClient.from(client);

// redirect dynamodb if this is ran locally
if (process.env.AWS_SAM_LOCAL) {
    ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({
        endpoint: "http://172.18.0.2:8000"
    }));
}

const tableName = "HomeTemps";

export const getXMostRecentItemsHandler = async (event) => {
    if (event.httpMethod !== 'GET')
        throw new Error(`getXMostRecentTimestampsMethod only accepts GET method, you tried: ${event.httpMethod} method.`);

    console.log('recieved: ', event)
}