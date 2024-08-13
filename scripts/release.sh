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
read -p 'Enter a version type (major, minor, or patch): ' version

if [ "$version" == "major" ] || [ "$version" == "minor" ] || [ "$version" == "patch" ] ;then
    echo Proceeding with $version release...

    echo Building Storybook...
    rm -rf storybook-static/
    npm run build-storybook

    echo Bundling components...
    npm run bundle:release

    echo Publishing...
    npm version $version
    git push --follow-tags
    npm publish --@sds:registry=https://artifacts-new.sei.cmu.edu/artifactory/api/npm/pde-npm-local/
else
    printf "\nCould not process release.\nEnsure to use a version type for this release: major, minor, or patch.\n\n"
    exit 0
fi
