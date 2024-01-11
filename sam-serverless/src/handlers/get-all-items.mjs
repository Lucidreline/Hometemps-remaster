import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
let ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.MAIN_TABLE;

// redirect dynamodb if this is ran locally
if (process.env.AWS_SAM_LOCAL) {
    ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({
        endpoint: "http://172.20.0.2:8000"
    }));
}

export const getAllItemsHandler = async (event) => {
    if (event.httpMethod !== 'GET')
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);

    console.info('received:', event);

    var params = {
        TableName: tableName
    };

    try {
        const data = await ddbDocClient.send(new ScanCommand(params));
        var items = data.Items;
    } catch (err) {
        console.log("Error", err);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify({ items })
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
