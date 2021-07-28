<template>
  <div>
    <input
      v-model="text"
      class="form-control"
      :class="{ valid, invalid }"
      :type="type"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
    >
    <character-counter
      v-if="countCharacters"
      class="text-right text-gray-500"
      :current-value="text.length"
      :max-value="maxlength"
    />
  </div>
</template>

<script>
import CharacterCounter from '../CharacterCounter/CharacterCounter.vue'

export default {
  name: 'SdsInput',
  components: {
    CharacterCounter,
  },
  props: {
    modelValue: { type: String, default: "" },
    countCharacters: { type: Boolean, default: false },
    maxlength: { type: Number, default: 524288 },
    placeholder: { type: String, default: "" },
    type: { type: String, default: "text" },
    autofocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    valid: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  computed: {
    text: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
