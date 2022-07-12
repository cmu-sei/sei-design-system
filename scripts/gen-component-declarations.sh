rm -rf ./volar.d.ts

OUTPUT="
// GlobalComponents for Volar\ndeclare module \"vue\" {\n\texport interface GlobalComponents {
"

for d in ./src/components/*; do
  if [ -d "$d" ]; then
    name=$(basename $d)
    OUTPUT="$OUTPUT\n\t\tSds$name: typeof import(\"@sds/components-vue3\")[\"Sds$name\"];"
  fi
done

OUTPUT="$OUTPUT \n\t}\n}"
OUTPUT="$OUTPUT\n\nexport {};"

echo $OUTPUT >> ./volar.d.ts