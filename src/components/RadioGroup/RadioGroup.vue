<template>
  <div
    :id="id"
    role="radiogroup"
    tabindex="-1"
    class="focus:outline-none"
  >
    <div
      v-for="(option, index) in options"
      :key="option.value"
      class="space-x-1"
      :class="{ 'inline-block mr-4': !stacked }"
    >
      <input
        :id="`${id}__option_${index}`"
        v-model="localChecked"
        type="radio"
        class="focus:outline-none"
        :value="option.value"
        :name="name ? name : `${id}__option`"
        :required="required"
        @click="$emit('change', option.value)"
      ><label
        :for="`${id}__option_${index}`"
      ><span>{{ option.text }}</span></label>
    </div>
  </div>
</template>

<script>
let id = 0;

export default {
  name: "SdsRadioGroup",
  props: {
    /**
     * The v-model of the radio group
     */
    modelValue: { type: [Boolean, String, Number, null], default: null },
    /**
     * The name of the radio form field
     */
    name: { type: String, default: null },
    /**
     * An array of options for the radio group
     */
    options: { type: Array, default: () => [] },
    /**
     * Determines whether the radio group is required or not
     */
    required: { type: Boolean, default: false },
    /**
     * Determines whehter the options are stacked vertically or horizontally
     */
    stacked: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      id: "",
    };
  },
  computed: {
    localChecked: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  mounted() {
    id++;
    this.id = `sds-radio-group_${id}`;
  },
};
</script>
