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
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'SdsSelect',
  props: {
    modelValue: { type: [Boolean, String, Number, null], default: null },
    /*
     * Expects { id, value, text }
     */
    options: { type: Array, default: () => [] },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
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