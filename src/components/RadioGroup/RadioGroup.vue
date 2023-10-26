<template>
  <div
    ref="root"
    v-uid
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
      class="flex gap-2 items-center"
    >
      <input
        :id="`${root?.id}__option_${index}`"
        v-model="localModelValue"
        type="radio"
        :value="option[valueKey]"
        :name="name ? name : `${root?.id}__option`"
        :required="required"
        :disabled="disabled"
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
            'opacity-50 pointer-events-none select-none': disabled
          }"
        ><span>{{ option[labelKey] }}</span></label>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from "vue";
import { Uid } from "@shimyshack/uid";

type RadioGroupOptionValue = boolean | string | number

interface RadioGroupOption<T> {
  [key: string]: T
}

defineOptions({
  name: "SdsRadioGroup",
  directives: {
    uid: Uid
  }
})

const props = defineProps({
  /**
   * The v-model of the radio group.
   */
  modelValue: { type: [Boolean, String, Number] as PropType<RadioGroupOptionValue>, default: null },
  /**
   * The name of the radio form field.
   */
  name: { type: String, default: null },
  /**
   * An array of options for the radio group.
   */
  options: { type: Array as PropType<RadioGroupOption<RadioGroupOptionValue>[]>, default: () => [] },
  /**
   * Determines whether the radio group is disabled or not.
   */
  disabled: { type: Boolean, default: false },
  /**
   * Determines whether the radio group is required or not.
   */
  required: { type: Boolean, default: false },
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
  valueKey: { type: String, default: 'value' }
})

const emit = defineEmits(['update:model-value', 'change'])

const root = ref()

const localModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value: RadioGroupOptionValue) {
    /**
     * Emmitted when modelValue changes.
     */
    emit("update:model-value", value)
  }
})

const onChange = (value: RadioGroupOptionValue) => {
  /**
   * Emitted when an option's value has changed.
   */
  emit('change', value)
}
</script>
