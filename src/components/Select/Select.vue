<template>
  <select
    :id="id"
    v-model="localValue"
    data-id="sds-select"
    :disabled="disabled"
    :readonly="readonly"
    class="form-control"
    :class="{ 'form-control-sm': size === 'sm' }"
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
import { PropType, computed } from 'vue'

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
   * Determines if the component is read-only.
   */
  readonly: { type: Boolean, default: false },
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
  valueKey: { type: String, default: 'value' }
})

const emit = defineEmits(['update:modelValue'])

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(value: SelectOptionValue) {
    /**
     * Emitted when modelValue changes.
     */
    emit("update:modelValue", value);
  }
})
</script>