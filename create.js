import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event, context) {
    // request body is passed in as a JSON encoded string in 'event.body'
    // JSON.parse parses the JSON string into the Javascript object / value that's represented in the string.
    const data = JSON.parse(event.body);

    const params = {

        TableName: process.env.tableName,
        Item: {
            // the attributes of the item to be created
            userId: "123", // the id of the author (later set this to the id of the authenticated user)
            noteId: uuid.v1(), // a unique uuid
            content: data.content, // parsed from request body
            attachment: data.attachment, // parsed from request body
            createdAt: Date.now(), // Current Unix timestamp
        },
    };

    try {
        await dynamoDb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e }),
        };
    }
}