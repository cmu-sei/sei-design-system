<template>
  <div
    data-id="sds-input"
    class="w-full relative"
  >
    <input
      :id="id || undefined"
      v-model="text"
      class="form-control"
      :class="{
        ...validationClasses,
        'form-control-sm': size === 'sm'
      }"
      :type="type"
      :maxlength="maxlength !== undefined ? maxlength : undefined"
      :placeholder="placeholder || undefined"
      :autofocus="autofocus || undefined"
      :disabled="disabled || undefined"
      :readonly="readonly || undefined"
      :required="required || undefined"
      :pattern="pattern || undefined"
    >
    <character-counter
      v-if="countCharacters"
      class="absolute right-0 text-gray-600 dark:text-gray-400"
      :current-value="text.length"
      :max-value="maxlength"
    />
  </div>
</template>

<script setup lang="ts">
import CharacterCounter from '../CharacterCounter/CharacterCounter.vue'
import { useFormField } from '@/composables'

defineOptions({
  name: 'SdsInput'
})

interface InputProps {
  /**
   * Determines whether to display the character counter or not.
   */
  countCharacters?: boolean
  /**
   * Determines the maxlength of the component.
   */
  maxlength?: number
  /**
   * Determines the id of the input.
   */
  id?: string
  /**
   * Determines the placeholder of the component.
   */
  placeholder?: string
  /**
   * Determines the type of the input field.
   */
  type?: string
  /**
   * Determines the size of the input field. Options are "sm" and "md".
   */
  size?: 'sm' | 'md' | ''
  /**
   * Determines whether to autofocus the input or not.
   */
  autofocus?: boolean
  /**
   * Determines the regex pattern used for validation.
   */
  pattern?: string
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

const props = withDefaults(defineProps<InputProps>(), {
  countCharacters: false,
  maxlength: 524288,
  id: undefined,
  placeholder: '',
  type: 'text',
  size: '',
  autofocus: false,
  pattern: '',
  disabled: false,
  readonly: false,
  required: false,
  valid: false,
  invalid: false
})

/**
 * The v-model of the component (the text input).
 */
const text = defineModel({ type: String, default: '' })

const { validationClasses } = useFormField(props)
</script>
