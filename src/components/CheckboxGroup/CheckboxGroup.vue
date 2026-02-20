<template>
  <div
    :id="id"
    ref="root"
    data-id="sds-checkbox-group"
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
        v-model="localModelValue"
        type="checkbox"
        class="relative top-1"
        :class="validationClasses"
        :value="option[valueKey]"
        :name="name ? name : `${root?.id}__option`"
        :required="required && localModelValue.length < 1"
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
import { useFormField, formFieldProps } from '@/composables'

export type CheckboxGroupOptionValue = string | number | boolean

export interface CheckboxGroupOption<T> {
  [key: string]: T
}

const id = useId()

defineOptions({
  name: "SdsCheckboxGroup"
})

const props = defineProps({
  /**
   * The name of the checkbox form field.
   */
  name: { type: String, default: null },
  /**
   * An array of options for the checkbox group.
   */
  options: { type: Array as PropType<CheckboxGroupOption<CheckboxGroupOptionValue>[]>, default: () => [] },
  /**
   * Determines whether the options are stacked vertically or horizontally.
   */
  stacked: { type: Boolean, default: false },
  /**
   * Determines the label key used for options
   */
  labelKey: { type: String, default: 'text' },
  /**
   * Determines the value key used for options
   */
  valueKey: { type: String, default: 'value' },
  ...formFieldProps,
})

/**
 * The v-model of the checkbox group.
 */
const model = defineModel<CheckboxGroupOptionValue[]>({ type: Array as PropType<CheckboxGroupOptionValue[]>, default: () => [] })

const emit = defineEmits(['update:modelValue', 'change'])

const { validationClasses } = useFormField(props)

const root = ref()

const localModelValue = computed({
  get() {
    return model.value
  },
  set(value: CheckboxGroupOptionValue[]) {
    /**
     * Emmitted when modelValue changes.
     */
    emit('update:modelValue', value)
  }
})

const onChange = (value: CheckboxGroupOptionValue) => {
  /**
   * Emitted when an option's value has changed.
   */
  emit('change', value)
}
</script>
