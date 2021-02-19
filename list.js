import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        // KeyConditionExpression defines the condition for the query
        // userId = :userId means only return items matching the 'userId' partition key
        KeyConditionExpression: "userId = :userId",
        // ExpressionAttributeValues defines the value in the condition
        ExpressionAttributeValues: {
            ":userId": event.requestContext.identity.cognitoIdentityId,
        },
    };

    const result = await dynamoDb.query(params);

    // return the matching list items in response body
    return result.Items;
});