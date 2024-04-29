#!/usr/bin/env bash

COMPONENT_NAME=""

if [ $# == 0 ]; then
  read -p "Provide a name for the component. (i.e., Component): " COMPONENT_NAME
else
  COMPONENT_NAME="$1"
fi

if [ $# -lt 2 ]; then
  read -p "Provide a description for the component: " COMPONENT_DESC
fi

COMPONENT_NAME_LOWER="$(echo $COMPONENT_NAME | tr '[:upper:]' '[:lower:]')"

# Make directory for new Component
mkdir ./src/components/$COMPONENT_NAME

# Copy Components.vue template to new component folder, modify with chosen component name
cp ./scripts/templates/Component.vue "./src/components/${COMPONENT_NAME}/${COMPONENT_NAME}.vue"
sed -i '' "s/---NAME---/${COMPONENT_NAME}/g" "./src/components/${COMPONENT_NAME}/${COMPONENT_NAME}.vue"
sed -i '' "s/---NAME-LOWER---/${COMPONENT_NAME_LOWER}/g" "./src/components/${COMPONENT_NAME}/${COMPONENT_NAME}.vue"

# Copy Components.stories.js template to new component folder, modify with chosen component name
cp ./scripts/templates/Component.stories.js "./src/components/${COMPONENT_NAME}/${COMPONENT_NAME}.stories.js"
sed -i '' "s/---NAME---/${COMPONENT_NAME}/g" "./src/components/${COMPONENT_NAME}/${COMPONENT_NAME}.stories.js"
sed -i '' "s/---NAME-LOWER---/${COMPONENT_NAME_LOWER}/g" "./src/components/${COMPONENT_NAME}/${COMPONENT_NAME}.stories.js"
sed -i '' "s/---DESCRIPTION---/${COMPONENT_DESC}/g" "./src/components/${COMPONENT_NAME}/${COMPONENT_NAME}.stories.js"

# Copy Components.spec.ts template to new component folder, modify with chosen component name
cp ./scripts/templates/Component.spec.ts "./src/components/${COMPONENT_NAME}/${COMPONENT_NAME}.spec.ts"
sed -i '' "s/---NAME---/${COMPONENT_NAME}/g" "./src/components/${COMPONENT_NAME}/${COMPONENT_NAME}.spec.ts"

# Copy index.ts template to new component folder, modify with chosen component name
cp ./scripts/templates/index.ts "./src/components/${COMPONENT_NAME}/index.ts"
sed -i '' "s/---NAME---/${COMPONENT_NAME}/g" "./src/components/${COMPONENT_NAME}/index.ts"
