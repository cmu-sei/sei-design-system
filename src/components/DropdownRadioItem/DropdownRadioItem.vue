<template>
  <li
    data-id="sds-dropdown-radio-item"
    class="group px-2 py-1.5 rounded-lg hover:bg-gray-25 dark:hover:bg-gray-750"
    :class="{ 'opacity-50 cursor-not-allowed': disabled }"
    role="menuitemradio"
    :aria-checked="isChecked"
  >
    <label
      :for="computedId"
      class="flex flex-row gap-2 items-center cursor-pointer"
      :class="{ 'cursor-not-allowed': disabled }"
    >
      <input
        :id="computedId"
        :checked="isChecked"
        type="radio"
        class="cursor-pointer relative top-px"
        :value="value"
        :name="name"
        :disabled="disabled"
        @change="handleClick"
      >
      <span class="flex items-center gap-1.5 text-sm text-black dark:text-gray-300 group-hover:text-gray-900 group-hover:dark:text-white w-full">
        <!-- @slot Optional icon slot. -->
        <slot name="icon" />
        <!-- @slot Label content for the radio. -->
        <slot>{{ label }}</slot>
      </span>
    </label>
  </li>
</template>

<script setup lang="ts">
interface DropdownRadioItemProps {
  /**
   * The v-model value for the radio group.
   */
  modelValue: string | number | null;
  /**
   * The value this radio represents.
   */
  value: string | number;
  /**
   * The label text for the radio.
   */
  label?: string;
  /**
   * The name attribute for the radio group.
   */
  name?: string;
  /**
   * Optional ID (auto-generated if not provided).
   */
  id?: string;
  /**
   * Whether the radio is disabled.
   */
  disabled?: boolean;
}

defineOptions({
  name: 'SdsDropdownRadioItem'
})

const props = withDefaults(defineProps<DropdownRadioItemProps>(), {
  label: '',
  name: undefined,
  id: undefined,
  disabled: false
})

const emit = defineEmits(['update:modelValue'])

// Auto-generate SSR-safe ID if not provided
const autoId = useId()
const computedId = computed(() => props.id || autoId)

const isChecked = computed(() => props.modelValue === props.value)

const handleClick = () => {
  if (props.disabled) return
  emit('update:modelValue', props.value)
}
</script>
