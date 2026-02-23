<template>
  <div
    data-id="sds-textarea"
    class="w-full relative"
  >
    <textarea
      :id="id"
      v-model="text"
      class="form-control"
      :class="{ ...validationClasses, 'resize-none': !resize }"
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
import { useFormField } from '@/composables'

defineOptions({
  name: 'SdsTextarea'
})

interface TextareaProps {
  /**
   * Determine whether to display the character counter or not.
   */
  countCharacters?: boolean
  /**
   * Determines the minlength of the component.
   */
  minlength?: number
  /**
   * Determines the maxlength of the component.
   */
  maxlength?: number
  /**
   * Determines the id of the textarea.
   */
  id?: string
  /**
   * Determines the placeholder text of the component.
   */
  placeholder?: string
  /**
   * Determines the row (height) of the component.
   */
  rows?: number
  /**
   * Determines whether to autofocus the component or not.
   */
  autofocus?: boolean
  /**
   * Determines whether or not the component can be resized
   */
  resize?: boolean
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

const props = withDefaults(defineProps<TextareaProps>(), {
  countCharacters: false,
  minlength: 0,
  maxlength: 524288,
  id: undefined,
  placeholder: '',
  rows: 5,
  autofocus: false,
  resize: false,
  disabled: false,
  readonly: false,
  required: false,
  valid: false,
  invalid: false
})

/**
 * The v-model for this component's text input.
 */
const text = defineModel<string>({ type: String, default: '' })

const { validationClasses } = useFormField(props)
</script>
