#!/bin/bash
# Promote Stage to Primary
echo "Promoting Stage to Primary..."
ETag_Primary=$(aws cloudfront get-distribution-config --id E2YAWA0EIJXOFL --query 'ETag' --output text)
ETag_Stage=$(aws cloudfront get-distribution-config --id E12GHX0ZY83HKZ --query 'ETag' --output text)
          aws cloudfront update-distribution-with-staging-config \
          --id E2YAWA0EIJXOFL \
          --staging-distribution-id E12GHX0ZY83HKZ \
          --if-match $ETag_Primary,$ETag_Stage
if [ $? -ne 0 ]; then
  echo "Failed to promote stage to primary."
  exit 1
fi

echo "Waiting for changes to propagate to edge locations..."
sleep 120  

# Shift 0% traffic to Stage
echo "Shifting 0% traffic to Stage..."
ETag=$(aws cloudfront get-continuous-deployment-policy --id fd3606da-4994-4b5e-9927-97aabf33c180 --query 'ETag' --output text)
          aws cloudfront update-continuous-deployment-policy \
              --id fd3606da-4994-4b5e-9927-97aabf33c180 \
              --if-match $ETag \
              --continuous-deployment-policy-config '{
                  "StagingDistributionDnsNames": {
                      "Quantity": 1,
                      "Items": ["d17f67r3sozxp1.cloudfront.net"]
                  },
                  "Enabled": true,
                  "TrafficConfig": {
                      "Type": "SingleWeight",
                      "SingleWeightConfig": {
                          "Weight": 0.00,
                          "SessionStickinessConfig": {
                              "IdleTTL": 300,
                              "MaximumTTL": 3600
                          }
                      }
                  }
              }'

if [ $? -ne 0 ]; then
  echo "Failed to shift 0% traffic to Stage."
  exit 1
fi

# Add sleep to allow changes to propagate to edge locations
echo "Waiting for traffic changes to propagate..."
sleep 120  

# Add new origin (current green) to the staging distribution

# Ensure the STAGE_CF_DOMAIN is set correctly
if [ -z "$STAGE_CF_DOMAIN" ]; then
  echo "STAGE_CF_DOMAIN is not set. Exiting..."
  exit 1
fi

echo "Adding new origin (current green) to the staging distribution..."
ETag=$(aws cloudfront get-distribution-config --id E12GHX0ZY83HKZ --query 'ETag' --output text)
          aws cloudfront update-distribution \
  --id E12GHX0ZY83HKZ \
  --if-match $ETag \
  --distribution-config "$(cat <<EOF
{
  "CallerReference": "terraform-20240926092347149000000001",
  "Aliases": {
    "Quantity": 0
  },
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "$STAGE_CF_DOMAIN",
        "DomainName": "$STAGE_CF_DOMAIN",
        "OriginPath": "",
        "CustomHeaders": {
          "Quantity": 0
        },
        "S3OriginConfig": {
          "OriginAccessIdentity": "origin-access-identity/cloudfront/E36TM6C01W0JV4"
        },
        "ConnectionAttempts": 3,
        "ConnectionTimeout": 10,
        "OriginShield": {
          "Enabled": false
        },
        "OriginAccessControlId": ""
      }
    ]
  },
  "OriginGroups": {
    "Quantity": 0
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "$STAGE_CF_DOMAIN",
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "TrustedKeyGroups": {
      "Enabled": false,
      "Quantity": 0
    },
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": [
        "HEAD",
        "GET"
      ],
      "CachedMethods": {
        "Quantity": 2,
        "Items": [
          "HEAD",
          "GET"
        ]
      }
    },
    "SmoothStreaming": false,
    "Compress": false,
    "LambdaFunctionAssociations": {
      "Quantity": 0
    },
    "FunctionAssociations": {
      "Quantity": 0
    },
    "FieldLevelEncryptionId": "",
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      },
      "Headers": {
        "Quantity": 0
      },
      "QueryStringCacheKeys": {
        "Quantity": 0
      }
    },
    "MinTTL": 0,
    "DefaultTTL": 1,
    "MaxTTL": 1
  },
  "CacheBehaviors": {
    "Quantity": 0
  },
  "CustomErrorResponses": {
        "Quantity": 2,
        "Items": [
            {
                "ErrorCode": 403,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 0
            },
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 0
            }
        ]
    },
  "Comment": "Staging CloudFront Distribution",
  "Logging": {
    "Enabled": false,
    "IncludeCookies": false,
    "Bucket": "",
    "Prefix": ""
  },
  "PriceClass": "PriceClass_200",
  "Enabled": true,
  "ViewerCertificate": {
    "CloudFrontDefaultCertificate": true,
    "SSLSupportMethod": "vip",
    "MinimumProtocolVersion": "TLSv1",
    "CertificateSource": "cloudfront"   
  },
  "Restrictions": {
    "GeoRestriction": {
      "RestrictionType": "none",
      "Quantity": 0
    }
  },
  "WebACLId": "",
  "HttpVersion": "http2",
  "IsIPV6Enabled": false,
  "ContinuousDeploymentPolicyId": "fd3606da-4994-4b5e-9927-97aabf33c180",
  "Staging": true
}
EOF
)"
if [ $? -ne 0 ]; then
  echo "Failed to add new origin to staging distribution."
  exit 1
fi

echo "CloudFront operations completed successfully."