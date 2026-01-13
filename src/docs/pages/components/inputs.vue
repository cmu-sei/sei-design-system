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
      <form
        class="mb-4"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-4">
          <code class="text-xs">type="text" no autosuggest</code>
          <SdsComboBox
            v-model="comboBox0.modelValue"
            size="sm"
            placeholder="Search"
            focus-on-key-press
            @enter="comboBox0.onEnter"
          />
          <code class="text-xs">type="taggable-select" multiple simulated request</code>
          <SdsComboBox
            v-model="comboBox1.modelValue"
            v-model:selected="comboBox1.selected"
            type="taggable-select"
            placeholder="Search"
            :pending="comboBox1.pending"
            :suggestions="comboBox1.suggestions"
            focus-on-key-press
            multiple
            @complete="comboBox1.onComplete"
            @result="comboBox1.onResult"
            @enter="comboBox1.onEnter"
          />
          <SdsFormGroup
            for="comboBox2_1"
            label="type='select' :multiple='false' :click-to-select='true'"
            helper-text="Select items to add to your grocery list"
          >
            <SdsComboBox
              id="comboBox2_1"
              v-model="comboBox2_1.modelValue"
              v-model:selected="comboBox2_1.selected"
              placeholder="Search"
              :suggestions="comboBox2_1.suggestions"
              size="sm"
              type="select"
              filter-suggestions
              focus-on-key-press
              click-to-select
              @complete="comboBox2_1.onComplete"
              @result="comboBox2_1.onResult"
              @enter="comboBox2_1.onEnter"
            />
          </SdsFormGroup>
          <code class="text-xs">type="select" :multiple="true"</code>
          <SdsComboBox
            v-model="comboBox2_2.modelValue"
            v-model:selected="comboBox2_2.selected"
            placeholder="Search"
            :disabled="false"
            :autofocus="false"
            :suggestions="comboBox2_2.suggestions"
            :debounce-complete="0"
            size="sm"
            type="select"
            multiple
            filter-suggestions
            focus-on-key-press
            option-label="name"
            @complete="comboBox2_2.onComplete"
            @result="comboBox2_2.onResult"
            @enter="comboBox2_2.onEnter"
          />
          <code class="text-xs">type="taggable-select" :multiple="false"</code>
          <SdsComboBox
            v-model="comboBox3.modelValue"
            v-model:selected="comboBox3.selected"
            placeholder="Search"
            :disabled="false"
            :autofocus="false"
            :suggestions="comboBox3.suggestions"
            :debounce-complete="0"
            size="sm"
            type="taggable-select"
            filter-suggestions
            focus-on-key-press
            option-label="name"
            option-group-label="section"
            option-group-children="items"
            :click-to-select="false"
            @complete="comboBox3.onComplete"
            @result="comboBox3.onResult"
            @enter="comboBox3.onEnter"
          />
          <code class="text-xs">type="taggable-select" :multiple="true"</code>
          <SdsComboBox
            v-model="comboBox4.modelValue"
            v-model:selected="comboBox4.selected"
            placeholder="Search"
            :disabled="false"
            :autofocus="false"
            :suggestions="comboBox4.suggestions"
            :debounce-complete="0"
            size="sm"
            type="taggable-select"
            multiple
            filter-suggestions
            focus-on-key-press
            option-label="name"
            option-group-label="section"
            option-group-children="items"
            @complete="comboBox4.onComplete"
            @result="comboBox4.onResult"
            @enter="comboBox4.onEnter"
          />
          <code class="text-xs">type="text" option-type="custom"</code>
          <SdsComboBox
            v-model="comboBox5.modelValue"
            v-model:selected="comboBox5.selected"
            placeholder="Search"
            :disabled="false"
            :autofocus="false"
            :suggestions="comboBox5.suggestions"
            :debounce-complete="0"
            size="sm"
            type="text"
            filter-suggestions
            focus-on-key-press
            option-label="term"
            option-type="custom"
            @complete="comboBox5.onComplete"
            @enter="comboBox5.onEnter"
          >
            <template #customOption="{ label, classList, dataActive, href, onClick }">
              <a
                :class="classList"
                :href="href"
                :data-active="dataActive"
                @click="onClick"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 pt-1 mr-2"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M10.73 14.97c.27.11.36.41.24.66s-.41.37-.66.24h-.01c-.46-.21-.89-.51-1.27-.9a4.49 4.49 0 0 1 0-6.36l3.53-3.53a4.49 4.49 0 0 1 6.36 0a4.49 4.49 0 0 1 0 6.36l-1.63 1.63l-.15-1.26l1.08-1.08a3.513 3.513 0 0 0 0-4.95a3.513 3.513 0 0 0-4.95 0L9.73 9.32a3.513 3.513 0 0 0 0 4.95c.3.3.64.53 1 .7m-6.65 4.95a4.49 4.49 0 0 1 0-6.36l1.63-1.63l.15 1.26l-1.08 1.08a3.513 3.513 0 0 0 0 4.95a3.513 3.513 0 0 0 4.95 0l3.54-3.54a3.513 3.513 0 0 0 0-4.95c-.3-.3-.64-.53-1-.7v.01a.49.49 0 0 1-.24-.67c.12-.25.41-.37.66-.24h.01c.46.21.89.51 1.27.9a4.49 4.49 0 0 1 0 6.36l-3.53 3.53a4.49 4.49 0 0 1-6.36 0"
                  />
                </svg>
                {{ label }}
              </a>
            </template>
          </SdsComboBox>
          <code class="text-xs">type="select" option-type="custom" multiple with Avatar, Badge, and Indicator</code>
          <SdsComboBox
            v-model="comboBox6.modelValue"
            v-model:selected="comboBox6.selected"
            placeholder="Search users..."
            :disabled="false"
            :autofocus="false"
            :suggestions="comboBox6.suggestions"
            :debounce-complete="0"
            size="sm"
            type="select"
            multiple
            filter-suggestions
            focus-on-key-press
            option-label="name"
            option-type="custom"
            @complete="comboBox6.onComplete"
            @result="comboBox6.onResult"
            @enter="comboBox6.onEnter"
          >
            <template #customOption="{ option, classList, dataActive, onClick }">
              <button
                type="button"
                :class="classList"
                :data-active="dataActive"
                class="flex items-center gap-3 w-full"
                @click="onClick"
              >
                <SdsIndicator
                  :variant="option.status === 'online' ? 'green' : option.status === 'away' ? 'orange' : 'gray'"
                  :hide-indicator="option.status === 'offline'"
                  placement="bottom-right"
                  placement-over="circle"
                  size="sm"
                >
                  <SdsAvatar
                    :name="option.name"
                    :variant="option.variant"
                    size="sm"
                    shape="circle"
                  />
                </SdsIndicator>
                <div class="flex-1 min-w-0 text-left">
                  <div class="font-medium text-sm truncate">
                    {{ option.name }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {{ option.email }}
                  </div>
                </div>
                <SdsBadge
                  :variant="option.variant"
                  type="light"
                  class="!text-[10px] !px-1.5 !py-0.5"
                >
                  {{ option.role }}
                </SdsBadge>
              </button>
            </template>
          </SdsComboBox>
        </div>
        <SdsButton
          type="submit"
          kind="primary"
          size="sm"
          class="mt-4"
        >
          Submit
        </SdsButton>
      </form>
      <div class="border-solid border p-4 bg-white dark:bg-black">
        <h3>Form Data</h3>
        <table>
          <tbody>
            <tr>
              <td>(text):</td><td>'{{ formData.comboBox1 }}'</td>
            </tr>
            <tr>
              <td>(select):</td><td>{{ formData.comboBox2_1 }}</td>
            </tr>
            <tr>
              <td>(select, multiple):</td><td>{{ formData.comboBox2_2 }}</td>
            </tr>
            <tr>
              <td>(taggable-select):</td><td>{{ formData.comboBox3 }}</td>
            </tr>
            <tr>
              <td>(taggable-select, multiple):</td><td>{{ formData.comboBox4 }}</td>
            </tr>
            <tr>
              <td>(select, custom, multiple):</td><td>{{ formData.comboBox6 }}</td>
            </tr>
          </tbody>
        </table>
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

const comboBox0 = reactive({
  modelValue: '',
  onEnter(value: string) {
    console.info('onEnter:', value)
  }
})

const comboBox1 = reactive({
  modelValue: '',
  selected: [] as ComboBoxSuggestion[],
  pending: false,
  suggestions: [] as ComboBoxSuggestion[],
  async onComplete(query: string) {
    console.info('onComplete:', query)
    await mockApiRequest(query)
  },
  onResult(result: ComboBoxSuggestion) {
    console.info('onResult:', result)
  },
  onEnter(value: string) {
    console.info('onEnter:', value)
  }
})

const wait = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const mockApiRequest = async (query: string) => {
  comboBox1.suggestions = []
  if (query === '') return
  comboBox1.pending = true
  console.log("Waiting 1 seconds...");
  await wait(1000);
  console.log("1 seconds passed... now return mock API data");
  comboBox1.suggestions = [
    { label: 'Apple', test: 'cool', index: 'cool2' },
    'Banana',
    'Kiwi',
    'Orange',
    'Mango',
    'Pineapple',
    'Pomegranate',
    'Raspberry',
    'Strawberry',
    'Watermelon',
    'Cool',
    'Awesome',
    'Neato',
    'Wow',
    'OMG',
    'That is amazing',
    'Holy cow'
  ].filter(i => {
    if (typeof i === 'string') {
      return i.toLowerCase().includes(query.toLowerCase())
    } else if (typeof i === 'object' && 'label' in i && typeof i.label === 'string') {
      return i.label.toLowerCase().includes(query.toLowerCase())
    }
    return false
  }) as ComboBoxSuggestion[]
  comboBox1.pending = false
}

const comboBox2_1 = reactive({
  modelValue: '',
  suggestions: [
    'Apple',
    'Banana',
    'Blueberry',
    'Cantaloupe',
    'Kiwi',
    'Strawberry',
    'Artichoke'
  ] as ComboBoxSuggestion[],
  selected: [] as ComboBoxSuggestion[],
  async onComplete(query: string) {
    console.info('onComplete:', query)
  },
  onResult(result: ComboBoxSuggestion) {
    console.info('onResult:', result)
  },
  onEnter(value: string) {
    console.info('onEnter:', value)
  }
})
const comboBox2_2 = reactive({
  modelValue: '',
  suggestions: [
    { name: 'Apple' },
    { name: 'Banana' },
    { name: 'Blueberry' },
    { name: 'Cantaloupe' },
    { name: 'Kiwi' },
    { name: 'Strawberry' },
    { name: 'Artichoke' },
    { name: 'Avocado' },
    { name: 'Beetroot' },
    { name: 'Celery' },
    { name: 'Cucumber' },
    { name: 'Daikon' },
    { name: 'Eggplant' },
    { name: 'Kale' },
    { name: 'Shallot' }
  ] as ComboBoxSuggestion[],
  selected: [] as ComboBoxSuggestion[],
  async onComplete(query: string) {
    console.info('onComplete:', query)
  },
  onResult(result: ComboBoxSuggestion) {
    console.info('onResult:', result)
  },
  onEnter(value: string) {
    console.info('onEnter:', value)
  }
})
const comboBox3 = reactive({
  modelValue: '',
  selected: [] as ComboBoxSuggestion[],
  suggestions: [
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
  ] as ComboBoxSuggestion[],
  async onComplete(query: string) {
    console.info('onComplete:', query)
  },
  onResult(result: ComboBoxSuggestion) {
    console.info('onResult:', result)
  },
  onEnter(value: string) {
    console.info('onEnter:', value)
  }
})
const comboBox4 = reactive({
  modelValue: '',
  selected: [] as ComboBoxSuggestion[],
  suggestions: [
    {
      section: 'Fruits',
      items: [
        { name: 'Apple', test: 'cool' },
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
    },
    {
      section: 'Monkeys',
      items: [
        { name: 'Baboon' },
      ]
    },
    {
      section: 'Bread',
      items: [
        { name: 'White' },
        { name: 'Wheat' },
        { name: 'Rye' }
      ]
    },
    {
      section: 'Insects',
      items: [
        { name: 'Ant' },
        { name: 'Butterfly' }
      ]
    },
  ] as ComboBoxSuggestion[],
  async onComplete(query: string) {
    console.info('onComplete:', query)
  },
  onResult(result: ComboBoxSuggestion) {
    console.info('onResult:', result)
  },
  onEnter(value: string) {
    console.info('onEnter:', value)
  }
})

const customSuggestions = [
  { term: "Radio Group", href: "/components/radio-group" },
  { term: "Checkbox Group", href: "/components/checkbox-group" },
  { term: "Select", href: "/components/select" },
  { term: "Filter by Dropdown", href: "/components/filter-by-dropdown" },
  { term: "Multiselect", href: "/components/multiselect" },
  { term: "Combo Box", href: "/components/combo-box" },
  { term: "Radio 2 Group", href: "/components/radio-group" },
  { term: "Checkbox 2 Group", href: "/components/checkbox-group" },
  { term: "Select 2", href: "/components/select" },
  { term: "Filter by Dropdown 2", href: "/components/filter-by-dropdown" },
  { term: "Multiselect 2", href: "/components/multiselect" },
  { term: "Combo Box 2", href: "/components/combo-box" },
  { term: "Radio Group 3", href: "/components/radio-group" },
  { term: "Checkbox Group 3", href: "/components/checkbox-group" },
  { term: "Select 3", href: "/components/select" },
  { term: "Filter by Dropdown 3", href: "/components/filter-by-dropdown" },
  { term: "Multiselect 3", href: "/components/multiselect" },
  { term: "Combo Box 3", href: "/components/combo-box" }
] as ComboBoxSuggestion[]


const comboBox5 = reactive({
  modelValue: '',
  selected: [] as ComboBoxSuggestion[],
  suggestions: customSuggestions,
  async onComplete(query: string) {
    console.info('onComplete:', query)
  },
  onEnter(value: ComboBoxSuggestion) {
    const suggestion = customSuggestions.find(s => (s as { term: string, href: string }).term === value[0])
    if (suggestion) {
      const url = (suggestion as { term: string, href: string })?.href as string || ''
      if (url.length)
        window.location.href = url
    }
  }
})

const userSuggestions = [
  { id: 1, name: 'Sarah Chen', email: 'sarah.chen@example.com', role: 'Admin', status: 'online', initials: 'SC', variant: 'blue' },
  { id: 2, name: 'James Rodriguez', email: 'james.r@example.com', role: 'Developer', status: 'online', initials: 'JR', variant: 'green' },
  { id: 3, name: 'Emily Johnson', email: 'emily.j@example.com', role: 'Designer', status: 'away', initials: 'EJ', variant: 'purple' },
  { id: 4, name: 'Michael Kim', email: 'michael.kim@example.com', role: 'Developer', status: 'offline', initials: 'MK', variant: 'green' },
  { id: 5, name: 'Aisha Patel', email: 'aisha.p@example.com', role: 'Manager', status: 'online', initials: 'AP', variant: 'yellow' },
  { id: 6, name: 'David Martinez', email: 'david.m@example.com', role: 'Developer', status: 'online', initials: 'DM', variant: 'green' },
  { id: 7, name: 'Lisa Anderson', email: 'lisa.a@example.com', role: 'Designer', status: 'offline', initials: 'LA', variant: 'purple' },
  { id: 8, name: 'Robert Chang', email: 'robert.chang@example.com', role: 'Admin', status: 'away', initials: 'RC', variant: 'blue' },
  { id: 9, name: 'Maria Garcia', email: 'maria.g@example.com', role: 'Manager', status: 'online', initials: 'MG', variant: 'yellow' },
  { id: 10, name: 'Thomas Wright', email: 'thomas.w@example.com', role: 'Developer', status: 'online', initials: 'TW', variant: 'green' }
] as ComboBoxSuggestion[]

const comboBox6 = reactive({
  modelValue: '',
  selected: [] as ComboBoxSuggestion[],
  suggestions: userSuggestions,
  async onComplete(query: string) {
    console.info('onComplete:', query)
  },
  onResult(result: ComboBoxSuggestion) {
    console.info('onResult:', result)
  },
  onEnter(value: string) {
    console.info('onEnter:', value)
  }
})

const formData = reactive({
  comboBox1: '',
  comboBox2_1: ([] as ComboBoxSuggestion[]),
  comboBox2_2: ([] as ComboBoxSuggestion[]),
  comboBox3: ([] as ComboBoxSuggestion[]),
  comboBox4: ([] as ComboBoxSuggestion[]),
  comboBox5: ([] as ComboBoxSuggestion[]),
  comboBox6: ([] as ComboBoxSuggestion[])
})

watchEffect(() => {
  formData.comboBox1 = comboBox1.modelValue
  formData.comboBox2_1 = comboBox2_1.selected
  formData.comboBox2_2 = comboBox2_2.selected
  formData.comboBox3 = comboBox3.selected
  formData.comboBox4 = comboBox4.selected
  formData.comboBox5 = comboBox5.selected
  formData.comboBox6 = comboBox6.selected
})

const handleSubmit = () => {
  alert(`Form submitted with data: ${JSON.stringify(formData)}`)
}

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

<style scoped>
td {
  padding-right: 1rem;
}
</style>
