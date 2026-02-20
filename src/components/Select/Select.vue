<template>
  <select
    :id="id"
    v-model="localValue"
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
      :value="option[valueKey]"
    >
      {{ option[labelKey] }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { useFormField, formFieldProps } from '@/composables'

export type SelectOptionValue = boolean | string | number | null

export interface SelectOption<T> {
  [key: string]: T
}

defineOptions({
  name: 'SdsSelect'
})

const props = defineProps({
  /**
   * Determines the id of the select.
   */
  id: { type: String, default: undefined },
  /**
   * The name of the select form field.
   */
  name: { type: String, default: null },
  /**
   * The options for the component.
   * 
   * Expects: `{ id, value, text }`
   */
  options: { type: Array as PropType<SelectOption<SelectOptionValue>[]>, default: () => [] },
  /**
   * Determines the size of the component.
   */
  size: { type: String as PropType<'md' | 'sm' | ''>, default: 'md' },
  /**
   * Determines the label key used for options
   */
  labelKey: { type: String, default: 'text' },
  /**
   * Determines the value key used for options
   */
  valueKey: { type: String, default: 'value' },
  ...formFieldProps,
})

/**
 * The v-model of the component.
 */
const model = defineModel<boolean | string | number | null>({
  type: [Boolean, String, Number, Array, Object] as PropType<SelectOptionValue>,
  default: null
})

const emit = defineEmits(['update:modelValue'])

const { validationClasses } = useFormField(props)

const localValue = computed({
  get() {
    return model.value;
  },
  set(value: SelectOptionValue) {
    /**
     * Emitted when modelValue changes.
     */
    emit("update:modelValue", value);
  }
})
</script>