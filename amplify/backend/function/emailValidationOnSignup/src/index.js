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
const {CognitoIdentityProviderClient, ListUsersCommand, AdminDeleteUserCommand} = require("@aws-sdk/client-cognito-identity-provider");

const client = new CognitoIdentityProviderClient();

exports.handler = async (event, context) => {
  
  var userPoolId = event.userPoolId;
  var emailFilter = "\"" + "email" + "\"" + "=" + "\"" + event.request.userAttributes.email + "\"";

  const input = {
  "AttributesToGet": [
    "email"
  ],
  "Filter": emailFilter,
  "UserPoolId": userPoolId
  };

  const listUsersCommand = new ListUsersCommand(input);
  const listUsersResponse = await client.send(listUsersCommand);

  if(await listUsersResponse.Users.length > 0 && await listUsersResponse.Users[0].UserStatus == 'UNCONFIRMED'){
    
          var userParams = {
              UserPoolId: userPoolId,
              Username: listUsersResponse.Users[0].Username,
            };
          
          const adminDeleteUserCommand = new AdminDeleteUserCommand(userParams);
          const adminDeleteUserResponse = client.send(adminDeleteUserCommand);
          
  }

  if(await listUsersResponse.Users.length > 0 && await listUsersResponse.Users[0].UserStatus == 'CONFIRMED'){
       context.done("Email already exists", null);
  }else{
       context.succeed(event);
  }
  
  
};