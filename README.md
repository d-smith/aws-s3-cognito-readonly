Simple example of reading mappings from an s3 bucket using
Cognito to allow anonymous access.

The idea is we have some non-sensitive static information we want to expose to external
client applications or consumers without having to set up an Internet facing
web server in a traditional data center.

With Amazon S3, we can put the content in file stored in a bucket, and use
Cognito to control access to the content via a policy that is scoped to
the file (no browsing, no general read access, etc)


The security policy associated with the cognito identity is:

    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": [
            "s3:GetObject"
          ],
          "Resource": "arn:aws:s3:::xt-client-mapping/mapping.json"
        }
      ]
    }

Note that above policy is scoped to a single file, clients can only access the
mappings.json file stored in the bucket. Also note that some speed bumps are
put in place - accessing the file content also requires the client to know
the account number, the role ARN, and the IdentifyPoolId. 
