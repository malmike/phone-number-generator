#!/bin/bash
createS3Bucket(){
    aws s3 ls s3://$1 2>&1 | grep -c "NoSuchBucket"
    if [[ $? -ne 1 ]]; then
        aws s3api create-bucket --bucket $1
        aws s3api put-bucket-policy --bucket $1 --policy '{
            "Version": "2012-10-17",
            "Statement": [{
                "Sid": "AddPerm",
                "Effect": "Allow",
                "Principal": "*",
                "Action": ["s3:GetObject"],
                "Resource": ["arn:aws:s3:::'"$1"'/*"]
                }]
            }'
        aws s3api put-bucket-website --bucket $1 --website-configuration '{
            "IndexDocument": {
                "Suffix": "index.html"
            },
            "ErrorDocument": {
                "Key": "error.html"
            }
        }'
    fi
}

echo "Enter bucket name:"
read BUCKET_NAME

createS3Bucket $BUCKET_NAME