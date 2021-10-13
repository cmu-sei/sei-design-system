<template>
  <div
    :id="id"
    role="checkboxgroup"
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
        type="checkbox"
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
  name: "SdsCheckboxGroup",
  props: {
    modelValue: { type: Array, default: () => [] },
    name: { type: String, default: null },
    options: { type: Array, default: () => [] },
    required: { type: Boolean, default: false },
    stacked: { type: Boolean, default: false },
  },
  emits: ['change', 'update:modelValue'],
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
    this.id = `sds-checkbox-group_${id}`;
  },
};
</script>
