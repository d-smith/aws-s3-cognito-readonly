var AWS = require('aws-sdk');
var _ = require('underscore');

var cognitoParams = {
  AccountId: "930295567417",
  RoleArn: "arn:aws:iam::930295567417:role/Cognito_mobile_appUnauth_DefaultRole",
  IdentityPoolId: "us-east-1:7921a787-e7e8-4787-b1dd-be614e84892e"
};



AWS.config.update({region: 'us-east-1'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials(cognitoParams);
AWS.config.credentials.get(function(err) {
    if (!err) {
        console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);
    }
});

var s3 = new AWS.S3();

var bucketParams = {
  Bucket: 'xt-client-mapping'
};

console.log("list objects");

s3.listObjects(bucketParams, function(err, data) {
  if(err) {
	console.log('error listing objects');
	console.log(err, err.stack);
  }
  else {
    console.log(data.Contents);
    var mappingObj = _.filter(data.Contents, function(obj) {
	return obj.Key === 'mapping.json';
    });
    console.log(mappingObj[0]);
  }
});
