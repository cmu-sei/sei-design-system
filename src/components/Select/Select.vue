<template>
  <select
    v-model="localValue"
    :multiple="multiple"
    :disabled="disabled"
    :readonly="readonly"
    class="form-control"
  >
    <option
      v-if="!multiple"
      disabled
      value=""
    />
    <option
      v-for="option in options"
      :key="option.id"
      :value="option.value"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type SelectModel = boolean | string | number | null
interface SelectOption {
  id: number | string
  value: number | string
  text: string
}

export default defineComponent({
  name: 'SdsSelect',
  props: {
    /**
     * The v-model of the component.
     */
    modelValue: { type: [Boolean, String, Number, null] as PropType<SelectModel>, default: null },
    /**
     * The options for the component. Expects { id, value, text }.
     */
    options: { type: Array as PropType<SelectOption[]>, default: () => [] },
    /**
     * Determines if the component can have multiple selections.
     */
    multiple: { type: Boolean, default: false },
    /**
     * Disables the component to prevent user interaction.
     */
    disabled: { type: Boolean, default: false },
    /**
     * Determines if the component is read-only.
     */
    readonly: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  computed: {
    localValue: {
      get() {
        return this.modelValue;
      },
      set(value: SelectModel) {
        /**
         * Emitted when modelValue changes.
         */
        this.$emit("update:modelValue", value);
      }
    }
  }
})
</script>