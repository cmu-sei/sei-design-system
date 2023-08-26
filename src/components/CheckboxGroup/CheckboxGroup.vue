<template>
  <fieldset
    ref="root"
    v-uid
    data-id="sds-checkbox-group"
    class="space-y-2"
    :disabled="disabled"
  >
    <legend
      v-if="label"
      :class="{
        'font-medium': labelWeight === 'medium',
        'font-semibold': labelWeight === 'semibold',
        'font-bold': labelWeight === 'bold',
      }"
      class="flex gap-1 items-center"
    >
      <span>{{ label }}</span>
      <span
        v-if="required"
        class="font-normal text-red-500 dark:text-red-300 text-xs"
      >* required</span>
    </legend>
    <p
      v-if="description"
      class="block text-xs italic text-gray-600 dark:text-gray-500"
    >
      {{ description }}
    </p>
    <div
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
          type="checkbox"
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
  </fieldset>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Uid } from "@shimyshack/uid";

type CheckboxGroupOptionValue = string | number | boolean

interface CheckboxGroupOption {
  value: CheckboxGroupOptionValue
  text: string
}

export default defineComponent({
  name: "SdsCheckboxGroup",
  directives: {
    uid: Uid
  }
})
</script>

<script setup lang="ts">
import { ref, computed, PropType } from "vue";

const props = defineProps({
  /**
   * The v-model of the checkbox group.
   */
  modelValue: { type: Array as PropType<CheckboxGroupOptionValue[]>, default: () => [] },
  /**
   * The label of the checkbox form field group.
   */
  label: { type: String, default: null },
  /**
   * Determines the font weight of the label.
   */
  labelWeight: { type: String as PropType<'medium' | 'semibold' | 'bold'>, default: 'medium' },
  /**
   * The description of the checkbox form field group.
   */
  description: { type: String, default: null },
  /**
   * The name of the checkbox form field.
   */
  name: { type: String, default: null },
  /**
   * An array of options for the checkbox group.
   */
  options: { type: Array as PropType<CheckboxGroupOption[]>, default: () => [] },
  /**
   * Determines whether the checkbox group is required or not.
   */
  required: { type: Boolean, default: false },
  /**
   * Determines whether the checkbox group is disabled or not.
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
