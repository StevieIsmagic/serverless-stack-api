import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        // key defines the partition key and sort key of the item to be retrieved
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId, // the id of the author
            noteId: event.pathParameters.id, // the id of the note from the path
        },
    };

    const result = await dynamoDb.get(params);
    console.log('RES', result, "\n PARAMS", params);

    if (!result.Item) {
        throw new Error("Item not found.");
    }

    // return the retrieved item
    return result.Item;
});