<template>
  <div
    data-id="sds-dropdown-input-item"
    class="px-4 pt-4 pb-2.5"
  >
    <label
      v-if="label"
      :for="computedId"
      class="sr-only"
    >
      {{ label }}
    </label>
    <div
      class="input-group"
      :class="sizeClass"
    >
      <input
        :id="computedId"
        ref="inputRef"
        :value="modelValue"
        type="text"
        class="form-control"
        :placeholder="placeholder"
        :aria-label="ariaLabel || label || placeholder || undefined"
        @input="handleInput"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVariantClasses } from '@/composables'

interface DropdownInputItemProps {
  /**
   * The input text (v-model).
   */
  modelValue: string;
  /**
   * Placeholder text for the input.
   */
  placeholder?: string;
  /**
   * Label text for the input (visually hidden but accessible).
   */
  label?: string;
  /**
   * Optional ID (auto-generated if not provided).
   */
  id?: string;
  /**
   * Optional aria-label override.
   */
  ariaLabel?: string;
  /**
   * Whether to auto-focus the input on mount.
   */
  autofocus?: boolean;
  /**
   * The size variant of the input.
   */
  size?: 'sm' | 'md';
}

defineOptions({
  name: 'SdsDropdownInputItem'
})

const props = withDefaults(defineProps<DropdownInputItemProps>(), {
  placeholder: 'Type to filter',
  label: '',
  id: undefined,
  ariaLabel: undefined,
  autofocus: false,
  size: 'sm'
})

const emit = defineEmits(['update:modelValue'])

const inputRef = ref<HTMLInputElement>()

// Auto-generate SSR-safe ID if not provided
const autoId = useId()
const computedId = computed(() => props.id || autoId)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const sizeClass = useVariantClasses(() => props.size, {
  'sm': 'input-group-sm',
  'md': 'input-group-md'
}, 'input-group-sm')

onMounted(() => {
  if (props.autofocus && inputRef.value) {
    setTimeout(() => {
      inputRef.value?.focus()
    }, 0)
  }
})
</script>
