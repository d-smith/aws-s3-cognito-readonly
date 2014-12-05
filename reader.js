var AWS = require('aws-sdk');

var cognitoParams = {
  AccountId: "930295567417",
  RoleArn: "arn:aws:iam::930295567417:role/Cognito_mobile_appUnauth_DefaultRole",
  IdentityPoolId: "us-east-1:7921a787-e7e8-4787-b1dd-be614e84892e"
};

var httpProxy = process.env.http_proxy;
if(httpProxy !== undefined) {

  var HttpProxyAgent = require('https-proxy-agent');
  var proxyAgent = new HttpProxyAgent(httpProxy);
  AWS.config.httpOptions = { agent: proxyAgent };

} else {
  console.log("No proxy settings found");
}

AWS.config.update({region: 'us-east-1'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials(cognitoParams);
AWS.config.credentials.get(function(err) {
    if (!err) {
        console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);
    }
});




var s3 = new AWS.S3();


var objParams = {
  Bucket : 'xt-client-mapping',
  Key: 'mapping.json'
};

s3.getObject(objParams, function(err,data) {
  if(err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
