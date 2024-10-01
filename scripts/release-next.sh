#!/bin/bash

set -e

# version type confirm prompt
read -p 'Enter a version type (prerelease to bump next version [recommended], or premajor, preminor, or prepatch for new prerelease): ' version

if [ "$version" == "premajor" ] || [ "$version" == "preminor" ] || [ "$version" == "prepatch" ] || [ "$version" == "prerelease" ] ;then
    echo Proceeding with $version next release...

    echo Building Storybook...
    rm -rf storybook-static/
    npm run build-storybook

    echo Bundling components...
    npm run bundle:release

    echo Publishing...
    npm version $version --preid=next
    git push --follow-tags
    npm publish --tag next --@sds:registry=https://artifacts.sei.cmu.edu/artifactory/api/npm/sei-design-system/
else
    printf "\nCould not process release.\nEnsure to use a version type for this release: premajor, preminor, prepatch, preminor.\n\n"
    exit 0
fi