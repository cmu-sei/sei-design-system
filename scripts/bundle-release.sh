#!/bin/bash

set -e

start=$SECONDS

# clean dist directory
rm -rf dist/

# for d in src/components/* ; do
#   if [[ "$d" == *"index.js"* ]]; then
#     printf "\nbuilding all components...\n"
#     LIB_NAME=SeiDesignSystem LIB_ROOT=src/components npx vite build --root src/components --config vite-library.config.js --outDir dist/lib/
#   elif [[ "$d" != *"vite-library.config.js"* ]]; then
#     printf "\nbuilding individual component ${d##*/}...\n"
#     echo "LIB_NAME=Sds${d##*/} LIB_ROOT=src/components/${d##*/} npx vite build --root src/components/${d##*/} --config vite-library.config.js --outDir dist/components/${d##*/}"
#     LIB_NAME=Sds${d##*/} LIB_ROOT=src/components/${d##*/} npx vite build --root src/components/${d##*/} --config vite-library.config.js --outDir dist/components/${d##*/}
#   fi
# done

printf "\nbuilding all components...\n"
LIB_NAME=SeiDesignSystem LIB_ROOT=src/components npx vite build --root src/components --config vite-library.config.js --outDir dist/lib/

#####################
# Additional Clean Up
#####################

printf "\nmoving lib to base of dist..."
cd dist
find lib -maxdepth 1 -mindepth 1 -exec mv {} . \;
rmdir lib

duration=$(( SECONDS - start ))

printf "\n\nFinished build in $duration seconds.\n\n"