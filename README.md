Simple example of reading mappings from an s3 bucket using
Cognito to allow anonymous access.

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

