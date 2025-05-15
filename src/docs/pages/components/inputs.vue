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
      <div class="sds-theme-plaid">
        <span class="text-sm">Plaid theme</span>
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
      <div class="overflow-hidden">
        <SdsFileUploader
          :accept="fileUploader.accept"
          :helper-text="fileUploader.helperText"
          :allowed-filetypes="fileUploader.allowedFiletypes"
          :filesize="fileUploader.filesize"
          :max-files-size="fileUploader.maxFilesSize"
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
      <div class="sds-theme-plaid">
        <span class="text-sm">Plaid theme</span>
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
          :valid="false"
          :invalid="false"
          default-msg="Search for a fruit such as an apple"
          placeholder="testing"
          show-clear
          @update-selected="multiselectUpdateSelected"
        />
      </div>
      <div class="sds-theme-plaid">
        <span class="text-sm">Plaid theme</span>
        <SdsMultiselect
          v-model="multiselect.modelValue"
          :selected="multiselect.selected"
          :options="multiselect.options"
          :loading="multiselect.loading"
          :disabled="false"
          :multiple="true"
          :required="false"
          :taggable="false"
          :valid="false"
          :invalid="false"
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
      <div class="sds-theme-plaid">
        <span class="text-sm">Plaid theme</span>
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
          :debounce-complete="0"
          multiselect
          filter-suggestions
          focus-on-key-press
          option-label="name"
          option-group-label="section"
          option-group-children="items"
          option-type="custom"
          @focused="comboBox.onFocused"
          @complete="comboBox.onComplete"
          @result="comboBox.onResult"
          @enter="comboBox.onEnter"
        >
          <template #customOption="{ label, classList, href, onClick }">
            <a
              :class="classList"
              :href="href"
              @click="onClick"
              v-html="label"
            />
          </template>
        </SdsComboBox>
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
      <div class="sds-theme-plaid">
        <span class="text-sm">Plaid theme</span>
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
          :resize="false"
        />
      </div>
      <div class="sds-theme-plaid">
        <span class="text-sm">Plaid theme</span>
        <SdsTextarea
          v-model="textarea.modelValue"
          :count-characters="false"
          :disabled="false"
          :invalid="false"
          :maxlength="textarea.maxlength"
          :readonly="false"
          :valid="false"
          :resize="false"
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
        <SdsToggleSwitch
          v-model="toggleSwitch.modelValue"
          :disabled="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComboBoxSuggestion } from '../../../components/ComboBox/ComboBox.vue';
import type { MultiselectOption } from '../../../components/Multiselect/Multiselect.vue';

const checkboxGroup = reactive({
  modelValue: ['option 2'],
  options: [
    { value: 'option 1', text: 'Option 1' },
    { value: 'option 2', text: 'Option 2' },
    { value: 'option 3', text: 'Option 3' },
  ]
})

const fileUploader = reactive({
  accept: ".pdf, .json, .jpg, .jpeg, .png, .webp, .mov, .mp4, .doc, .docx, .xls, .xlsx, .csv",
  helperText: "Use a PDF, JSON, JPG, JPEG, PNG, WebP, MOV, MP4, DOC, DOCX, XLS, XLSX or CSV under 1 MB.",
  allowedFiletypes: [
    'application/pdf',
    'application/json',
    'image/jpeg',
    'image/png',
    'image/webp',
    'video/quicktime',
    'video/mp4',
    'text/csv',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ],
  filesize: 1,
  maxFilesSize: 3,
  multiple: true
})

const input = reactive({
  modelValue: ''
})

const multiselect = reactive({
  modelValue: '',
  selected: [] as MultiselectOption[],
  options: [] as MultiselectOption[],
  loading: false
})

const multiselectUpdateSelected = (selections: MultiselectOption[]) => {
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

//const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

const comboBox = reactive({
  modelValue: '',
  onEnter(value: string) {
    console.log(`onEnter ${value}`)
  },
  suggestions: [],
  async onFocused(value: boolean) {
    if (value) {
      console.log('focused')
      comboBox.suggestions = [
        {
          section: 'Fruits',
          items: [
            { name: 'Apple' },
            { name: 'Banana' },
            { name: 'Blueberry' },
            { name: 'Cantaloupe' },
            { name: 'Kiwi' },
            { name: 'Strawberry' }
          ]
        },
        {
          section: 'Vegetables',
          items: [
            { name: 'Artichoke' },
            { name: 'Avocado' },
            { name: 'Beetroot' },
            { name: 'Celery' },
            { name: 'Cucumber' },
            { name: 'Daikon' },
            { name: 'Eggplant' },
            { name: 'Kale' },
            { name: 'Shallot' }
          ]
        }
      ]
    }
  },
  //suggestions: [] as ComboBoxSuggestion[],
  onResult(option: ComboBoxSuggestion) {
    console.log('onResult', option)
  },
  async onComplete(query: string) {
  //async onComplete() {
    //await delay(500)
    comboBox.suggestions = [
      {
        section: 'Fruits',
        items: [
          { name: 'Apple' },
          { name: 'Banana' },
          { name: 'Blueberry' },
          { name: 'Cantaloupe' },
          { name: 'Kiwi' },
          { name: 'Strawberry' }
        ]
      },
      {
        section: 'Vegetables',
        items: [
          { name: 'Artichoke' },
          { name: 'Avocado' },
          { name: 'Beetroot' },
          { name: 'Celery' },
          { name: 'Cucumber' },
          { name: 'Daikon' },
          { name: 'Eggplant' },
          { name: 'Kale' },
          { name: 'Shallot' }
        ]
      }
    ]
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
