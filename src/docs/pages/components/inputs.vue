<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Checkbox Group
      </h2>
      <div>
        <SdsCheckboxGroup
          v-model="checkboxGroup.modelValue"
          :stacked="true"
          :options="checkboxGroup.options"
        />
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        File Uploader
      </h2>
      <div>
        <SdsFileUploader
          :accept="fileUploader.accept"
          :helper-text="fileUploader.helperText"
          :allowed-filetypes="fileUploader.allowedFiletypes"
          :filesize="fileUploader.filesize"
          multiple
        />
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Input
      </h2>
      <div>
        <SdsInput
          v-model="input.modelValue"
          type="text"
          :disabled="false"
          :invalid="false"
          :readonly="false"
          :required="false"
          :valid="false"
          :autofocus="false"
          :count-characters="false"
          size="md"
          placeholder="testing"
        />
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Multiselect
      </h2>
      <div>
        <SdsMultiselect
          v-model="multiselect.modelValue"
          :selected="multiselect.selected"
          :options="multiselect.options"
          :loading="multiselect.loading"
          :disabled="false"
          :multiple="true"
          :required="false"
          :taggable="false"
          default-msg="Search for a fruit such as an apple"
          placeholder="testing"
          show-clear
          @update-selected="multiselectUpdateSelected"
        />
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Radio Group
      </h2>
      <div>
        <SdsRadioGroup
          v-model="radioGroup.modelValue"
          :stacked="true"
          :options="radioGroup.options"
        />
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Combo Box
      </h2>
      <div class="space-y-4">
        <SdsComboBox
          v-model="comboBox.modelValue"
          placeholder="Search"
          :disabled="false"
          :autofocus="false"
          :suggestions="comboBox.suggestions"
          filter-suggestions
          focus-on-key-press
          option-label="term"
          option-group-label="label"
          option-group-children="items"
          @complete="comboBox.onComplete"
          @result="comboBox.onResult"
          @enter="comboBox.onEnter"
        />
        <SdsComboBox
          v-model="comboBox.modelValue"
          placeholder="Search"
          size="sm"
          :disabled="true"
          :autofocus="false"
          @enter="comboBox.onEnter"
        />
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Select
      </h2>
      <div>
        <SdsSelect
          v-model="select.modelValue"
          :options="select.options"
          size="md"
          :disabled="false"
        />
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Textarea
      </h2>
      <div>
        <SdsTextarea
          v-model="textarea.modelValue"
          :count-characters="false"
          :disabled="false"
          :invalid="false"
          :maxlength="textarea.maxlength"
          :readonly="false"
          :valid="false"
        />
      </div>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Toggle Switch
      </h2>
      <div>
        <SdsToggleSwitch
          v-model="toggleSwitch.modelValue"
          :disabled="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const checkboxGroup = reactive({
  modelValue: ['option 2'],
  options: [
    { value: 'option 1', text: 'Option 1' },
    { value: 'option 2', text: 'Option 2' },
    { value: 'option 3', text: 'Option 3' },
  ]
})

const fileUploader = reactive({
  accept: ".jpg, .jpeg, .png, .doc, .docx, .xls, .xlsx, .csv, .json",
  helperText: "Use a JSON, JPG, JPEG, PNG, DOC, DOCX, XLS, XLSX or CSV under 1MB.",
  allowedFiletypes: [
    'image/jpeg',
    'image/png',
    'text/csv',
    'application/json',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ],
  filesize: 1
})

const input = reactive({
  modelValue: ''
})

const multiselect = reactive({
  modelValue: '',
  selected: [],
  options: [] as { key: number, value: string }[],
  loading: false
})

const multiselectUpdateSelected = (selections: any) => {
  multiselect.selected = selections
}

watch(() => multiselect.modelValue, (value) => {
  /**
   * We are faking a slow API request
   * in this example to simulate how
   * to handle such a situation.
   *
   * Typically, you'd want to couple
   * this with debounce code to prevent
   * excessive calls to your API. This
   * is just a simple example though
   * so we do not include that here.
   **/

  multiselect.loading = true

  setTimeout(() => {
    if (!value) {

      /**
       * In this example, when the modelValue is empty
       * we reset the options.
       *
       * If you want to retain them, for instance,
       * if you set the closeOnSelection prop to false,
       * do not clear them.
       **/

      multiselect.options = []
      multiselect.loading = false
    } else {
      const fauxRestApiOptions = [
        { key: 1, value: 'Apple' },
        { key: 2, value: 'Banana' },
        { key: 3, value: 'Cherry' },
        { key: 4, value: 'Grapes' },
        { key: 5, value: 'Kiwi' },
        { key: 6, value: 'Pineapple' },
        { key: 7, value: 'Strawberry' },
        { key: 8, value: 'Watermelon' }
      ]
      multiselect.options = fauxRestApiOptions.filter((i) => {
        return i.value.toLowerCase().includes(value.toLowerCase())
      })
      multiselect.loading = false
    }
  }, 500)
})

const radioGroup = reactive({
  modelValue: 'option 2',
  options: [
    { value: 'option 1', text: 'Option 1' },
    { value: 'option 2', text: 'Option 2' },
    { value: 'option 3', text: 'Option 3' },
  ]
})

const comboBox = reactive({
  modelValue: '',
  onEnter(value: string) {
    console.log(`onEnter`, value)
  },
  suggestions: [] as { term?: string, label?:string, payload?: string, items?: { term: string, payload?: string }[] }[],
  // suggestions: [] as any,
  onResult(option: any) {
    console.log('onResult', option)
  },
  async onComplete(query: string) {
    comboBox.suggestions = query ? [
      "Testing 123",
      { term: "Apple", payload: "test" },
      {
        term:
          "Apple lksd kljsdflk jsdflk sdflkj sdflkj sdflk sdflkj sdflk sdflk sdflkj sdflkj sdflkj sdflkj sdflkj sdflksjd f",
        payload: "test",
      },
      { term: "Banana", payload: "test" },
      {
        label: "Group Label",
        items: [
          { term: "Apple Group", payload: "test" },
          { term: "Unique to Group", payload: "test" },
          { term: "Banana Group", payload: "test" },
          { term: "Orange Group", payload: "test" },
          { term: "Pineapple Group", payload: "test" },
          { term: "Grape Group", payload: "test" },
        ]
      },
      { term: "Kiwi", payload: "test" },
      { term: "Pomegranate", payload: "test" },
      { term: "Strawberry", payload: "test" },
      {
        label: "Group 2 Label",
        items: [
          { term: "Apple Group 2", payload: "test" },
          { term: "Banana Group 2", payload: "test" },
          { term: "Date Group 2", payload: "test" },
          { term: "Orange Group 2", payload: "test" },
          { term: "Pineapple Group 2", payload: "test" },
          { term: "Grape Group 2", payload: "test" },
        ]
      },
      { term: "Orange", payload: "test" },
      { term: "Pineapple", payload: "test" },
      { term: "Raspberry", payload: "test" },
      { term: "Watermelon", payload: "test" },
      { term: "Mango", payload: "test" },
    ] : [] as any
    // comboBox.suggestions = query ? [
    //   "Apple",
    //   "Banana",
    //   "Cranberry"
    // ] : []
  }
})

const select = reactive({
  modelValue: 'option 2',
  options: [
    { value: 'option 1', text: 'Option 1' },
    { value: 'option 2', text: 'Option 2' },
    { value: 'option 3', text: 'Option 3' },
  ]
})

const textarea = reactive({
  modelValue: '',
  maxlength: 1800
})

const toggleSwitch = reactive({
  modelValue: true
})

defineOptions({
  name: 'InputsPage'
})

definePage({
  meta: {
    title: 'Inputs'
  }
})

useHead({
  title: 'Inputs'
})
</script>