#!/usr/bin/env bash

original="https:\/\/artifacts.sei.cmu.edu:443\/artifactory\/api\/npm\/npm-remote\/"
replacement="https:\/\/registry.npmjs.org\/"
filename="package-lock.json"

if [ ! -f "$filename" ]; then
  echo "File $filename not found!"
  exit 1
fi

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i.bak "s/$original/$replacement/g" "$filename" && rm -f "${filename}.bak"
else
  sed -i "s/$original/$replacement/g" "$filename"
fi

if [ $? -eq 0 ]; then
  echo "Successfully updated $filename"
else
  echo "Failed to update $filename"
  exit 1
fi