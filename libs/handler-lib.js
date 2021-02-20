export default function handler(lambda) {
    return async function (event, context) {
        let body, statusCode;

        try {
            // run the lambda
            body = await lambda(event, context);
            statusCode = 200;
        } catch (e) {
            console.log("ERROR", e);
            body = { error: e.message };
            statusCode = 500;
        }

        // return the HTTP response
        return {
            statusCode,
            body: JSON.stringify(body),
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
            },
        };
    };
}