<template>
  <select
    :id="id"
    v-model="localValue"
    data-id="sds-select"
    :disabled="disabled"
    :required="required"
    :name="name ? name : undefined"
    class="form-control"
    :class="{ 'form-control-sm': size === 'sm', valid, invalid }"
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
type SelectOptionValue = boolean | string | number | null

interface SelectOption<T> {
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
   * The v-model of the component.
   */
  modelValue: { type: [Boolean, String, Number, Array, Object] as PropType<SelectOptionValue>, default: null },
  /**
   * The options for the component.
   * 
   * Expects: `{ id, value, text }`
   */
  options: { type: Array as PropType<SelectOption<SelectOptionValue>[]>, default: () => [] },
  /**
   * Disables the component to prevent user interaction.
   */
  disabled: { type: Boolean, default: false },
  /**
   * Determines whether the select is required or not.
   */
  required: { type: Boolean, default: false },
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
  /**
   * Sets a valid styling if true.
   */
  valid: { type: Boolean, default: false },
  /**
   * Sets an invalid styling if true.
   */
  invalid: { type: Boolean, default: false },
})

const emit = defineEmits(['update:model-value'])

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(value: SelectOptionValue) {
    /**
     * Emitted when modelValue changes.
     */
    emit("update:model-value", value);
  }
})
</script>