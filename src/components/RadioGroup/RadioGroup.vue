<template>
  <div
    :id="id"
    ref="root"
    data-id="sds-radio-group"
    class="flex"
    :class="{
      'flex-col gap-2': stacked,
      'gap-4': !stacked
    }"
  >
    <div
      v-for="(option, index) in options"
      :key="`${root?.id}_${JSON.stringify(option)}`"
      class="flex gap-2 items-start"
    >
      <input
        :id="`${root?.id}__option_${index}`"
        v-model="model"
        type="radio"
        class="relative top-1"
        :class="validationClasses"
        :value="option[valueKey]"
        :name="name ? name : `${root?.id}__option`"
        :required="required && !model"
        :disabled="disabled"
        :readonly="readonly"
        @click="onChange(option[valueKey])"
      >
      <!-- @slot Label content (used to replace label element). @binding optionId, option -->
      <slot
        name="label"
        :option-id="`${root?.id}__option_${index}`"
        :option="option"
      >
        <label
          :for="`${root?.id}__option_${index}`"
          :class="{
            'opacity-50 pointer-events-none select-none': disabled || readonly
          }"
        ><span>{{ option[labelKey] }}</span></label>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormField } from '@/composables'

export type RadioGroupOptionValue = boolean | string | number | null

export interface RadioGroupOption<T> {
  [key: string]: T
}

const id = useId()

defineOptions({
  name: "SdsRadioGroup"
})

interface RadioGroupProps {
  /**
   * The name of the radio form field.
   */
  name?: string | null
  /**
   * An array of options for the radio group.
   */
  options?: RadioGroupOption<RadioGroupOptionValue>[]
  /**
   * Determines whether the options are stacked vertically or horizontally.
   */
  stacked?: boolean
  /**
   * Determines the label key used for options
   */
  labelKey?: string
  /**
   * Determines the value key used for options
   */
  valueKey?: string
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

const props = withDefaults(defineProps<RadioGroupProps>(), {
  name: null,
  options: () => [],
  stacked: false,
  labelKey: 'text',
  valueKey: 'value',
  disabled: false,
  readonly: false,
  required: false,
  valid: false,
  invalid: false
})

/**
 * The v-model of the radio group.
 */
const model = defineModel<RadioGroupOptionValue | undefined>({
  type: [Boolean, String, Number, null] as PropType<RadioGroupOptionValue>,
  default: undefined
})

const emit = defineEmits(['change'])

const { validationClasses } = useFormField(props)

const root = ref()

const onChange = (value: RadioGroupOptionValue) => {
  /**
   * Emitted when an option's value has changed.
   */
  emit('change', value)
}
</script>
