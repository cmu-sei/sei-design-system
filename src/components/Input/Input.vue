<template>
  <div
    data-id="sds-input"
    class="w-full relative"
  >
    <input
      :id="id"
      v-model="text"
      class="form-control"
      :class="{
        ...validationClasses,
        'form-control-sm': size === 'sm'
      }"
      :type="type"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :pattern="pattern"
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
import { useFormField, formFieldProps } from '@/composables'

defineOptions({
  name: 'SdsInput'
})

const props = defineProps({
  /**
   * Determines whether to display the character counter or not.
   */
  countCharacters: { type: Boolean, default: false },
  /**
   * Determines the maxlength of the component.
   */
  maxlength: { type: Number, default: 524288 },
  /**
   * Determines the id of the input.
   */
  id: { type: String, default: undefined },
  /**
   * Determines the placeholder of the component.
   */
  placeholder: { type: String, default: "" },
  /**
   * Determines the type of the input field.
   */
  type: { type: String, default: "text" },
  /**
   * Determines the size of the input field. Options are "sm" and "md".
   */
  size: { type: String as PropType<"sm" | "md">, default: "" },
  /**
   * Determines whether to autofocus the input or not.
   */
  autofocus: { type: Boolean, default: false },
  /**
   * Determines the regex pattern used for validation.
   */
  pattern: { type: String, default: undefined },
  ...formFieldProps,
})

/**
 * The v-model of the component (the text input).
 */
const model = defineModel({ type: String, default: '' })

const emit = defineEmits(['update:modelValue'])

const { validationClasses } = useFormField(props)

const text = computed({
  get() {
    return model.value
  },
  set(value: string) {
    /**
     * Emmitted when modelValue changes.
     */
    emit('update:modelValue', value)
  }
})
</script>
