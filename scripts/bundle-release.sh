#!/bin/bash

set -e

start=$SECONDS

# clean dist directory
rm -rf dist/

printf "\nlint check all components...\n"
npm run lint

printf "\ncheck tests for all components...\n"
npm test

printf "\nbuilding all components...\n"
LIB_NAME=SeiDesignSystem LIB_ROOT=src/components npx vite build --config vite-library.config.js
npx vue-tsc --declaration --emitDeclarationOnly --outDir dist/types

# Generate ./volar.d.ts that adds Types for Global Components
printf "\nGenerating Volar types for global components...\n"
npm run gen-volar-dts

duration=$(( SECONDS - start ))

printf "\n\nFinished build in $duration seconds.\n\n"
