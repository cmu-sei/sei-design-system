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

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SdsSelect',
  props: {
    /**
     * The v-model of the component
     */
    modelValue: { type: [Boolean, String, Number, null], default: null },
    /**
     * The options for the component. Expects { id, value, text }
     */
    options: { type: Array, default: () => [] },
    /**
     * Determines if the component can have multiple selections
     */
    multiple: { type: Boolean, default: false },
    /**
     * Determines if the component is disabled
     */
    disabled: { type: Boolean, default: false },
    /**
     * Determines if the component is readonly
     */
    readonly: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  computed: {
    localValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    }
  }
})
</script>