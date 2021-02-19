import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler( async (event, context) => {
    // request body is passed in as a JSON encoded string in 'event.body'
    // JSON.parse parses the JSON string into the Javascript object / value that's represented in the string.
    const data = JSON.parse(event.body);

    const params = {

        TableName: process.env.tableName,
        Item: {
            // the attributes of the item to be created
            userId: event.requestContext.identity.cognitoIdentityId, // the id of the author (later set this to the id of the authenticated user)
            noteId: uuid.v1(), // a unique uuid
            content: data.content, // parsed from request body
            attachment: data.attachment, // parsed from request body
            createdAt: Date.now(), // Current Unix timestamp
        },
    };


        await dynamoDb.put(params);

        return params.Item;
});