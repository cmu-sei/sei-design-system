<template>
  <div
    v-if="loaded"
    :id="id"
    data-id="sds-checkbox-group"
    role="group"
    tabindex="-1"
    class="flex"
    :class="{
      'flex-col gap-2': stacked,
      'gap-4': !stacked
    }"
  >
    <div
      v-for="(option, index) in options"
      :key="option.text"
      class="flex gap-2 items-center"
    >
      <input
        :id="`${id}__option_${index}`"
        v-model="localChecked"
        type="checkbox"
        :value="option.value"
        :name="name ? name : `${id}__option`"
        :required="required"
        @click="onChange(option.value)"
      >
      <!-- @slot Label content (used to replace label element). @binding optionId, option -->
      <slot
        name="label"
        :option-id="`${id}__option_${index}`"
        :option="option"
      >
        <label
          :for="`${id}__option_${index}`"
        ><span>{{ option.text }}</span></label>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

let id = 0;

type CheckboxGroupOptionValue = string | number | boolean
interface CheckboxGroupOption {
  value: CheckboxGroupOptionValue
  text: string
}

export default defineComponent({
  name: "SdsCheckboxGroup",
  props: {
    /**
     * The v-model for the checkbox group.
     */
    modelValue: { type: Array as PropType<CheckboxGroupOptionValue[]>, default: () => [] },
    /**
     * The name for the input form field.
     */
    name: { type: String, default: null },
    /**
     * An array of options available for the checkbox group.
     * Each option should have a `value` and a `text` parameter.
     */
    options: { type: Array as PropType<CheckboxGroupOption[]>, default: () => [] },
    /**
     * Determines whether this field is required or not.
     */
    required: { type: Boolean, default: false },
    /**
     * Determines if the options should be stacked vertically or horizontally.
     */
    stacked: { type: Boolean, default: false },
  },
  emits: ['change', 'update:modelValue'],
  data() {
    return {
      id: "",
      loaded: false,
    };
  },
  computed: {
    localChecked: {
      get() {
        return this.modelValue;
      },
      set(value: CheckboxGroupOptionValue) {
        /**
         * Emitted when modelValue changes.
         */
        this.$emit("update:modelValue", value);
      },
    },
  },
  mounted() {
    id++;
    this.id = `sds-checkbox-group_${id}`;
    this.loaded = true
  },
  methods: {
    onChange(value: CheckboxGroupOptionValue) {
      /**
       * Emitted when an option's value has changed.
       */
      this.$emit('change', value)
    }
  }
});
</script>
