#!/bin/bash
output=$(node .github/workflows/scripts/wait-for-netlify-deploy.js)
exit_code=$?

# Check if the process exited with a non-zero status
if [ $exit_code -ne 0 ]; then
    echo "The process exited with a non-zero status: $exit_code"
    exit $exit_code
fi

deploy_url=$(echo "$output" | grep -o 'Deploy URL: https://[^ ]*' | awk '{print $3}')
echo "Deploy URL is: $deploy_url"
TARGET_URL=$deploy_url/storybook-static npm run test-storybook -- --no-index-json