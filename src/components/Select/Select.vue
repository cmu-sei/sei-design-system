<template>
  <select
    :id="id"
    v-model="model"
    data-id="sds-select"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :name="name ? name : undefined"
    class="form-control"
    :class="{ 'form-control-sm': size === 'sm', ...validationClasses }"
  >
    <option
      disabled
      value=""
    />
    <option
      v-for="option in options"
      :key="`${id}_${JSON.stringify(option)}`"
      :value="option[valueKey!]"
    >
      {{ option[labelKey!] }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { useFormField } from '@/composables'

export type SelectOptionValue = boolean | string | number | null

export interface SelectOption<T> {
  [key: string]: T
}

defineOptions({
  name: 'SdsSelect'
})

interface SelectProps {
  /**
   * Determines the id of the select.
   */
  id?: string
  /**
   * The name of the select form field.
   */
  name?: string | null
  /**
   * The options for the component.
   * 
   * Expects: `{ id, value, text }`
   */
  options?: SelectOption<SelectOptionValue>[]
  /**
   * Determines the size of the component.
   */
  size?: 'md' | 'sm' | ''
  /**
   * Determines the label key used for options
   */
  labelKey?: string
  /**
   * Determines the value key used for options
   */
  valueKey?: string
  /**
   * Disabled state for the form field.
   */
  disabled?: boolean
  /**
   * Readonly state for the form field.
   */
  readonly?: boolean
  /**
   * Required state for the form field.
   */
  required?: boolean
  /**
   * Valid state for the form field.
   */
  valid?: boolean
  /**
   * Invalid state for the form field.
   */
  invalid?: boolean
}

const props = withDefaults(defineProps<SelectProps>(), {
  id: undefined,
  name: null,
  options: () => [],
  size: '',
  labelKey: 'text',
  valueKey: 'value',
  disabled: false,
  readonly: false,
  required: false,
  valid: false,
  invalid: false
})

/**
 * The v-model of the component.
 */
const model = defineModel<boolean | string | number | null>({
  type: [Boolean, String, Number, Array, Object] as PropType<SelectOptionValue>,
  default: null
})

const { validationClasses } = useFormField(props)
</script>