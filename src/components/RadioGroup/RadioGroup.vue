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
      :key="`${root?.id}_${option.text}`"
      class="flex gap-2 items-center"
    >
      <input
        :id="`${root?.id}__option_${index}`"
        v-model="localModelValue"
        type="radio"
        :value="option.value"
        :name="name ? name : `${root?.id}__option`"
        :required="required"
        @click="onChange(option.value)"
      >
      <!-- @slot Label content (used to replace label element). @binding optionId, option -->
      <slot
        name="label"
        :option-id="`${root?.id}__option_${index}`"
        :option="option"
      >
        <label
          :for="`${root?.id}__option_${index}`"
        ><span>{{ option.text }}</span></label>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Uid } from "@shimyshack/uid";

type RadioGroupOptionValue = boolean | string | number

interface RadioGroupOption {
  value: RadioGroupOptionValue
  text: string
}

export default defineComponent({
  name: "SdsRadioGroup",
  directives: {
    uid: Uid
  }
})
</script>

<script setup lang="ts">
import { ref, computed, PropType } from "vue";

const props = defineProps({
  /**
   * The v-model of the radio group.
   */
  modelValue: { type: [Boolean, String, Number] as PropType<RadioGroupOptionValue>, default: null },
  /**
   * The label of the radio form field group.
   */
  label: { type: String, default: null },
  /**
   * Determines the font weight of the label.
   */
  labelWeight: { type: String as PropType<'medium' | 'semibold' | 'bold'>, default: 'medium' },
  /**
   * The description of the radio form field group.
   */
  description: { type: String, default: null },
  /**
   * The name of the radio form field.
   */
  name: { type: String, default: null },
  /**
   * An array of options for the radio group.
   */
  options: { type: Array as PropType<RadioGroupOption[]>, default: () => [] },
  /**
   * Determines whether the radio group is required or not.
   */
  required: { type: Boolean, default: false },
  /**
   * Determines whether the radio group is disabled or not.
   */
  disabled: { type: Boolean, default: false },
  /**
   * Determines whether the options are stacked vertically or horizontally.
   */
  stacked: { type: Boolean, default: false },
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
