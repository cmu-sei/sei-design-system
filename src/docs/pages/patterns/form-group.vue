<template>
  <div class="grid gap-8">
    <SdsFormGroup
      v-slot="{ id, disabled, readonly, required, valid, invalid }"
      :state="state"
      show-marker
      required
      label="Field label"
      helper-text="Field helper text"
      valid-feedback="Field valid feedback"
      invalid-feedback="Field invalid feedback"
      label-position="left"
      label-alignment="right"
      :label-width="4"
      :label-margin="0.5"
    >
      <SdsInput
        :id="id"
        v-model="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :valid="valid"
        :invalid="invalid"
      />
    </SdsFormGroup>
    <form @submit.prevent>
      <SdsFormGroup
        v-slot="{ id, disabled, readonly, required, valid, invalid }"
        :state="state"
        show-marker
        required
        label="Field label is so cool lkjasdflk jsdflkj sdflk jsdflkj sdflkj sdflk jsdflkj sdflkj sdf"
        helper-text="Field helper text"
        valid-feedback="Field valid feedback"
        invalid-feedback="Field invalid feedback"
        type="horizontal"
        label-position="left"
        label-alignment="right"
        :label-width="4"
      >
        <SdsTextarea
          :id="id"
          v-model="modelValue"
          :disabled="disabled"
          :readonly="readonly"
          :required="required"
          :valid="valid"
          :invalid="invalid"
          :minlength="10"
          :maxlength="100"
          count-characters
        />
      </SdsFormGroup>
      <button type="submit">
        Submit
      </button>
    </form>
    <SdsFormGroup
      v-slot="{ id, disabled, required, valid, invalid }"
      :state="state"
      label="Field label"
      helper-text="Field helper text"
      valid-feedback="Field valid feedback"
      invalid-feedback="Field invalid feedback"
      required
      show-marker
      label-position="left"
      label-alignment="right"
      :label-width="4"
    >
      <SdsSelect
        :id="id"
        v-model="selectModelValue"
        :options="options"
        :disabled="disabled"
        :required="required"
        :valid="valid"
        :invalid="invalid"
      />
    </SdsFormGroup>
    <SdsFormGroup
      v-slot="{ disabled, readonly, required, valid, invalid }"
      :state="state"
      el="fieldset"
      label="Field label"
      helper-text="Field helper text"
      valid-feedback="Field valid feedback"
      invalid-feedback="Field invalid feedback"
      label-position="left"
      label-alignment="right"
      :label-width="4"
      :label-margin="3"
    >
      <SdsDatepicker
        v-model="datepickerModelValue"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :valid="valid"
        :invalid="invalid"
      />
    </SdsFormGroup>
    <SdsFormGroup
      v-slot="{ required, disabled }"
      el="fieldset"
      label="Field label"
      helper-text="Field helper text"
      label-position="left"
      label-alignment="right"
      :label-width="4"
    >
      <SdsCheckboxGroup
        v-model="checkboxModelValue"
        :options="options"
        :required="required"
        :disabled="disabled"
        stacked
      />
    </SdsFormGroup>
    <SdsFormGroup
      v-slot="{ required, disabled }"
      el="fieldset"
      label="Field label"
      helper-text="Field helper text"
      label-position="left"
      label-alignment="right"
      :label-width="4"
    >
      <SdsRadioGroup
        v-model="radioModelValue"
        :options="options"
        :required="required"
        :disabled="disabled"
        stacked
      />
    </SdsFormGroup>
    <SdsFormGroup
      v-slot="{ disabled, required }"
      el="fieldset"
      label="Field label"
      helper-text="Field helper text"
      label-position="left"
      label-alignment="right"
      :label-width="4"
      disabled
      required
      show-marker
    >
      <SdsMultiselect
        v-model="multiselect.modelValue"
        :selected="multiselect.selected"
        :options="multiselect.options"
        :loading="multiselect.loading"
        :disabled="disabled"
        :required="required"
        taggable
        default-msg="Search for a fruit such as an apple"
        show-clear
        @update-selected="updateSelected"
      />
    </SdsFormGroup>

    <hr class="dark:border-gray-700">

    <SdsFormGroup
      v-slot="{ id, disabled, readonly, required, invalid }"
      :state="state"
      show-marker
      required
      label="Field label"
      helper-text="Field helper text"
      valid-feedback="Field valid feedback"
      invalid-feedback="Field invalid feedback"
    >
      <SdsInput
        :id="id"
        v-model="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :invalid="invalid"
      />
    </SdsFormGroup>
    <SdsFormGroup
      v-slot="{ id, disabled, readonly, required, invalid }"
      :state="state"
      show-marker
      label="Field label is so cool lkjasdflk jsdflkj sdflk jsdflkj sdflkj sdflk jsdflkj sdflkj sdf"
      helper-text="Field helper text"
      valid-feedback="Field valid feedback"
      invalid-feedback="Field invalid feedback"
    >
      <SdsTextarea
        :id="id"
        v-model="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :invalid="invalid"
      />
    </SdsFormGroup>
    <SdsFormGroup
      v-slot="{ id, disabled, readonly, required, invalid }"
      :state="state"
      label="Field label"
      helper-text="Field helper text"
      valid-feedback="Field valid feedback"
      invalid-feedback="Field invalid feedback"
      required
      show-marker
    >
      <SdsSelect
        :id="id"
        v-model="selectModelValue"
        :options="options"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :invalid="invalid"
      />
    </SdsFormGroup>
    <SdsFormGroup
      v-slot="{ disabled, readonly, required, valid, invalid }"
      :state="state"
      el="fieldset"
      label="Field label"
      helper-text="Field helper text"
      valid-feedback="Field valid feedback"
      invalid-feedback="Field invalid feedback"
    >
      <SdsDatepicker
        v-model="datepickerModelValue"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :valid="valid"
        :invalid="invalid"
      />
    </SdsFormGroup>
    <SdsFormGroup
      v-slot="{ required, valid, invalid }"
      :state="state"
      el="fieldset"
      label="Field label"
      helper-text="Field helper text"
    >
      <SdsCheckboxGroup
        v-model="checkboxModelValue"
        :options="options"
        :required="required"
        :valid="valid"
        :invalid="invalid"
        stacked
      />
    </SdsFormGroup>
    <SdsFormGroup
      v-slot="{ required, valid, invalid }"
      :state="state"
      el="fieldset"
      label="Field label"
      helper-text="Field helper text"
    >
      <SdsRadioGroup
        v-model="radioModelValue"
        :options="options"
        :required="required"
        :valid="valid"
        :invalid="invalid"
        stacked
      />
    </SdsFormGroup>
    <SdsFormGroup
      v-slot="{ disabled, required }"
      el="fieldset"
      label="Field label"
      helper-text="Field helper text"
    >
      <SdsMultiselect
        v-model="multiselect.modelValue"
        :selected="multiselect.selected"
        :options="multiselect.options"
        :loading="multiselect.loading"
        :disabled="disabled"
        :required="required"
        taggable
        default-msg="Search for a fruit such as an apple"
        show-clear
        @update-selected="updateSelected"
      />
    </SdsFormGroup>
  </div>
</template>

<script setup lang="ts">
import { MultiselectOption } from '../../../components/Multiselect/Multiselect.vue';

const modelValue = ref('')
const selectModelValue = ref('')
const datepickerModelValue = ref()
const checkboxModelValue = ref()
const radioModelValue = ref()

const state = ref<boolean>()

const options = ref([
  { value: 'option 1', text: 'Option 1' },
  { value: 'option 2', text: 'Option 2' },
  { value: 'option 3', text: 'Option 3' }
])

const multiselect = reactive({
  modelValue: '',
  selected: [] as MultiselectOption[],
  options: [] as MultiselectOption[],
  loading: false
})

const updateSelected = (selections: MultiselectOption[]) => {
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

defineOptions({
  name: 'FormGroupPage'
})

definePage({
  meta: {
    title: 'Form Group'
  }
})

useHead({
  title: 'Form Group'
})
</script>