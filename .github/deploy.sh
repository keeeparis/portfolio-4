#!/usr/bin/env sh

set -e

if [ -d "/dist" ]
then 
    rm dist -r
else
    echo "folder dist does not exist"
fi

npm run build

cd dist

git init 
git checkout -b main
git add -A

git config --local user.email "githubActions"
git config --local user.name "byKeeeparis"

git commit -m 'deploy'

cd -