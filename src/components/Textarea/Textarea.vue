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
import { useFormField, formFieldProps } from '@/composables'

defineOptions({
  name: 'SdsTextarea'
})

const props = defineProps({
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
   * Determines whether or not the component can be resized
   */
  resize: { type: Boolean, default: false},
  ...formFieldProps,
})

/**
 * The v-model for this component's text input.
 */
const model = defineModel<string>({ type: String, default: '' })

const emit = defineEmits(['update:modelValue'])

const { validationClasses } = useFormField(props)

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
