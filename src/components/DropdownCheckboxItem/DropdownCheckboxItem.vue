<template>
  <li
    data-id="sds-dropdown-checkbox-item"
    class="leading-5 px-2 mx-2 py-1.5 rounded-lg sds-theme-plaid:rounded-none hover:bg-gray-50 dark:hover:bg-gray-700"
  >
    <label
      :for="computedId"
      class="flex gap-2 items-start cursor-pointer"
      :class="{ 'cursor-not-allowed opacity-50': disabled }"
    >
      <input
        :id="computedId"
        :checked="modelValue"
        type="checkbox"
        class="focus:ring-0 mt-0.5"
        :value="value"
        :disabled="disabled"
        :indeterminate.prop="indeterminate"
        @change="handleClick"
      >
      <span class="text-gray-900 hover:text-black dark:text-gray-50 dark:hover:text-white block w-full">
        <!-- @slot Label content for the checkbox. -->
        <slot>{{ label }}</slot>
      </span>
    </label>
  </li>
</template>

<script setup lang="ts">
interface DropdownCheckboxItemProps {
  /**
   * The value of the checkbox (v-model).
   */
  modelValue: boolean;
  /**
   * The label text for the checkbox.
   */
  label?: string;
  /**
   * Optional ID (auto-generated if not provided).
   */
  id?: string;
  /**
   * The checkbox value attribute.
   */
  value?: string | number;
  /**
   * Whether the checkbox is in indeterminate state.
   */
  indeterminate?: boolean;
  /**
   * Whether the checkbox is disabled.
   */
  disabled?: boolean;
}

defineOptions({
  name: 'SdsDropdownCheckboxItem'
})

const props = withDefaults(defineProps<DropdownCheckboxItemProps>(), {
  label: '',
  id: undefined,
  value: undefined,
  indeterminate: false,
  disabled: false
})

const emit = defineEmits(['update:modelValue'])

// Auto-generate SSR-safe ID if not provided
const autoId = useId()
const computedId = computed(() => props.id || autoId)

const handleClick = () => {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
}
</script>
