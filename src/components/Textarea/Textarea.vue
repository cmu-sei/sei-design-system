<template>
  <div>
    <textarea
      v-model="text"
      class="form-control"
      :class="{ valid, invalid }"
      :rows="rows"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
    />
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
  name: 'SdsTextarea',
  components: {
    CharacterCounter,
  },
  props: {
    /**
     * The v-model for this component's text input
     */
    modelValue: { type: String, default: "" },
    /**
     * Determine whether to display the character counter or not
     */
    countCharacters: { type: Boolean, default: false },
    /**
     * Determines the maxlength of the component
     */
    maxlength: { type: Number, default: 524288 },
    /**
     * Determines the placeholder text of the component
     */
    placeholder: { type: String, default: "" },
    /**
     * Determines the row (height) of the component
     */
    rows: { type: Number, default: 5 },
    /**
     * Determines whether to autofocus the component or not
     */
    autofocus: { type: Boolean, default: false },
    /**
     * Determines the disabled state of the component
     */
    disabled: { type: Boolean, default: false },
    /**
     * Determines the required state of the component
     */
    required: { type: Boolean, default: false },
    /**
     * Determines the readonly state of the component
     */
    readonly: { type: Boolean, default: false },
    /**
     * Gives the component a valid/success styling
     */
    valid: { type: Boolean, default: false },
    /**
     * Gives the component an invalid/danger styling
     */
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
