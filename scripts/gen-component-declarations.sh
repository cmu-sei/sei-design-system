rm -rf ./volar.d.ts

OUTPUT="
// GlobalComponents for Volar\ndeclare module \"vue\" {\n\texport interface GlobalComponents {
"

for d in ./src/components/*; do
  if [ -d "$d" ]; then
    name=$(basename $d)
    # Don't include CharacterCounter, since it isn't exposed
    if [ $name != "CharacterCounter" ]; then
      OUTPUT="$OUTPUT\n\t\tSds$name: typeof import(\"@sds/components-vue3\")[\"Sds$name\"];"
    fi
  fi
done

OUTPUT="$OUTPUT \n\t}\n}"
OUTPUT="$OUTPUT\n\nexport {};"

echo $OUTPUT >> ./volar.d.ts