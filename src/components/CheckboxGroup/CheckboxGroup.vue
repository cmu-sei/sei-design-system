<template>
  <div
    ref="root"
    v-uid
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
      class="flex gap-2 items-center"
    >
      <input
        :id="`${root?.id}__option_${index}`"
        v-model="localModelValue"
        type="checkbox"
        :value="option[valueKey]"
        :name="name ? name : `${root?.id}__option`"
        :required="required"
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
        ><span>{{ option[labelKey] }}</span></label>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from "vue";
import { Uid } from "@shimyshack/uid";

type CheckboxGroupOptionValue = string | number | boolean

interface CheckboxGroupOption<T> {
  [key: string]: T
}

defineOptions({
  name: "SdsCheckboxGroup",
  directives: {
    uid: Uid
  }
})

const props = defineProps({
  /**
   * The v-model of the checkbox group.
   */
  modelValue: { type: Array as PropType<CheckboxGroupOptionValue[]>, default: () => [] },
  /**
   * The name of the checkbox form field.
   */
  name: { type: String, default: null },
  /**
   * An array of options for the checkbox group.
   */
  options: { type: Array as PropType<CheckboxGroupOption<CheckboxGroupOptionValue>[]>, default: () => [] },
  /**
   * Determines whether the checkbox group is required or not.
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
  set(value: CheckboxGroupOptionValue[]) {
    /**
     * Emmitted when modelValue changes.
     */
    emit("update:model-value", value)
  }
})

const onChange = (value: CheckboxGroupOptionValue) => {
  /**
   * Emitted when an option's value has changed.
   */
  emit('change', value)
}
</script>
