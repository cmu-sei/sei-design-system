<template>
  <div
    data-id="sds-textarea"
    class="w-full relative"
  >
    <textarea
      :id="id"
      v-model="text"
      class="form-control"
      :class="{ valid, invalid, 'resize-none': !resize }"
      :rows="rows"
      :maxlength="maxlength"
      :minlength="minlength"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
    />
    <character-counter
      v-if="countCharacters"
      class="absolute right-0 text-gray-600 dark:text-gray-400"
      :current-value="text.length"
      :min-value="minlength"
      :max-value="maxlength"
    />
  </div>
</template>

<script setup lang="ts">
import CharacterCounter from '../CharacterCounter/CharacterCounter.vue'

defineOptions({
  name: 'SdsTextarea'
})

defineProps({
  /**
   * Determine whether to display the character counter or not.
   */
  countCharacters: { type: Boolean, default: false },
  /**
   * Determines the minlength of the component.
   */
  minlength: { type: Number, default: 0 },
  /**
   * Determines the maxlength of the component.
   */
  maxlength: { type: Number, default: 524288 },
  /**
   * Determines the id of the textarea.
   */
  id: { type: String, default: undefined },
  /**
   * Determines the placeholder text of the component.
   */
  placeholder: { type: String, default: '' },
  /**
   * Determines the row (height) of the component.
   */
  rows: { type: Number, default: 5 },
  /**
   * Determines whether to autofocus the component or not.
   */
  autofocus: { type: Boolean, default: false },
  /**
   * Disables the component to prevent user interaction.
   */
  disabled: { type: Boolean, default: false },
  /**
   * Determines the required state of the component.
   */
  required: { type: Boolean, default: false },
  /**
   * Determines the read-only state of the component.
   */
  readonly: { type: Boolean, default: false },
  /**
   * Gives the component a valid/success styling.
   */
  valid: { type: Boolean, default: false },
  /**
   * Gives the component an invalid/danger styling.
   */
  invalid: { type: Boolean, default: false },
 /**
   * Determines whether or not the component can be resized
   */
  resize: { type: Boolean, default: false}
})

/**
 * The v-model for this component's text input.
 */
const model = defineModel({ type: String, default: '' })

const emit = defineEmits(['update:modelValue'])

const text = computed({
  get() {
    return model.value
  },
  set(value: string) {
    /**
     * Emitted when modelValue changes.
     */
    emit('update:modelValue', value)
  },
})
</script>
