/* Amplify Params - DO NOT EDIT
	API_AMPGLOBALBADMINTON_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPGLOBALBADMINTON_GRAPHQLAPIIDOUTPUT
	API_AMPGLOBALBADMINTON_GRAPHQLAPIKEYOUTPUT
	API_AMPGLOBALBADMINTON_TODOTABLE_ARN
	API_AMPGLOBALBADMINTON_TODOTABLE_NAME
	AUTH_AMPGLOBALBADMINTOND6811DDF_USERPOOLID
	ENV
	FUNCTION_AMPGLOBALBADMINTOND6811DDFCUSTOMMESSAGE_NAME
	FUNCTION_AMPGLOBALBADMINTOND6811DDFPOSTCONFIRMATION_NAME
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const cognitoIdentityProviderClient = require("@aws-sdk/client-cognito-identity-provider");

const client = new cognitoIdentityProviderClient.CognitoIdentityProviderClient();

exports.handler = async (event, context) => {
  
  var userPoolId = event.userPoolId;
  var emailFilter = "\"" + "email" + "\"" + "=" + "\"" + event.request.userAttributes.email + "\"";

  const input = {
  "AttributesToGet": [
    "email"
  ],
  "Filter": emailFilter,
  "Limit": 1,
  "UserPoolId": userPoolId
  };

  const command = new cognitoIdentityProviderClient.ListUsersCommand(input);
  const response = await client.send(command);


  if(await response.Users.length > 0){
       context.done("Email already exists", event);
  }else{
       context.succeed(event);
  }
  
  
};