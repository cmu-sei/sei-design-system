#!/bin/bash

set -e

# commit confirm prompt
read -p "Have you committed all changes? (y,n) " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 0
fi

# version type confirm prompt
read -p 'Enter a version type (prerelease to bump beta version [recommended], or premajor, preminor, or prepatch for new prerelease): ' version

if [ "$version" == "premajor" ] || [ "$version" == "preminor" ] || [ "$version" == "prepatch" ] || [ "$version" == "prerelease" ] ;then
    echo Proceeding with $version beta release...
    npm version $version --preid=beta
    git push --follow-tags
    npm publish --tag beta --@sds:registry=https://artifacts.sei.cmu.edu/artifactory/api/npm/sei-design-system/
    npm publish --tag beta --@sds:registry=https://artifacts-new.sei.cmu.edu/artifactory/api/npm/sei-design-system/
else
    printf "\nCould not process release.\nEnsure to use a version type for this release: premajor, preminor, prepatch, preminor.\n\n"
    exit 0
fi