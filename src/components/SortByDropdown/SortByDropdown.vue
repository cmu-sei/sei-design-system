<template>
  <SdsFloatingUi
    data-id="sds-sort-by-dropdown"
    :placement="placement"
    :popper-class="`absolute border shadow-lg rounded-theme-md bg-white border-gray-200 dark:border-gray-700 dark:bg-gray-850 w-56 ${zIndexClass}`"
    hide-arrow
    placement-top-arrow-class="-bottom-1.5 border-t-0 border-l-0"
    placement-right-arrow-class="-left-1.5 border-t-0 border-r-0"
    placement-bottom-arrow-class="-top-1.5 border-b-0 border-r-0"
    placement-left-arrow-class="-right-1.5 border-b-0 border-l-0"
    shift
  >
    <template #trigger="{ isOpen, toggle }">
      <SdsActionButton 
        :id="id"
        ref="button"
        :kind="kind"
        :variant="variant"
        :size="size" 
        :active="isOpen"
        :disabled="disabled"
        aria-haspopup="true"
        :aria-expanded="isOpen"
        @click="toggle()"
      >
        <!-- @slot Title content of trigger button. -->
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
        <svg
          class="inline-block self-center w-5 h-5 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </SdsActionButton>
    </template>
    <template #default>
      <div class="px-2 py-4">
        <!-- First group: Original options (what to sort by) -->
        <div class="mb-4 px-2">
          <span class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Sort by
          </span>
          <ul
            v-if="options.length"
            class="flex flex-col gap-2"
          >
            <li
              v-for="(option, index) in options"
              :key="`${id}__sortBy__option_${index}`"
              class="flex flex-row gap-2 items-start"
            >
              <input
                :id="`${id}__sortBy__option_${index}`"
                v-model="localModelValue"
                type="radio"
                class="relative top-1"
                :value="option.value"
                :name="name ? name : `${id}__sortBy__option`"
                :disabled="disabled"
              >
              <label
                :for="`${id}__sortBy__option_${index}`"
                :class="{
                  'opacity-50 pointer-events-none select-none': disabled
                }"
              >
                <span>{{ option.label }}</span>
              </label>
            </li>
          </ul>
        </div>
        <!-- Second group: Direction filters (how to sort) based on selected option -->
        <div
          v-if="orderBy"
          class="px-2"
        >
          <span class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Order by
          </span>
          <ul class="flex flex-col gap-2">
            <li
              v-for="(filter, index) in directionFilters"
              :key="index"
              class="flex flex-row gap-2 items-start"
            >
              <input
                :id="filter.id"
                v-model="selectedDirection"
                type="radio"
                class="relative top-1"
                :value="filter.value"
                :name="name ? name : `${id}__direction__option`"
                :disabled="disabled"
                @click.stop
              >
              <label
                :for="filter.id"
                :class="{
                  'opacity-50 pointer-events-none select-none': disabled
                }"
                @click.stop
              >
                <span>{{ filter.label }}</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </SdsFloatingUi>
</template>

<script lang="ts" setup>
import type { RadioGroupOptionValue } from '../RadioGroup/RadioGroup.vue'
import SdsActionButton from '../ActionButton/ActionButton.vue'
import SdsFloatingUi from '../FloatingUi/FloatingUi.vue'

export type SortByDropdownPlacement = 'auto' | 'top' | 'right' | 'bottom-start';

type OrderByType = 'alpha' | 'chronological' | 'numerical' | 'custom';
type OrderByDirection = 'ascending' | 'descending';
export type SortByDropdownType = `${OrderByType}:${OrderByDirection}`;

export interface SortByDropdownOption {
  id: number | string;
  value: RadioGroupOptionValue;
  label: string;
  type: OrderByType;
}

export interface SortByDropdownModel {
  sortBy: SortByDropdownOption['value'] | null;
  orderBy: SortByDropdownType | null;
}

const SORT_BY_TYPES = Object.freeze({
  'ALPHA': {
    'ASCENDING': 'A-Z',
    'DESCENDING': 'Z-A'
  },
  'CHRONOLOGICAL': {
    'ASCENDING': 'Oldest first',
    'DESCENDING': 'Newest first'
  },
  'NUMERICAL': {
    'ASCENDING': 'Lowest first',
    'DESCENDING': 'Highest first'
  },
  'CUSTOM': {
    'ASCENDING': (value: string) => {
      return value ? `Most ${value} first` : 'Most first'
    },
    'DESCENDING': (value: string) => {
      return value ? `Least ${value} first` : 'Least first'
    }
  }
} as const)

defineOptions({
  name: "SdsSortByDropdown"
})

const props = defineProps({
  /**
   * Determines the purpose and particular function of the component.
   */
  kind: { type: String as PropType<'primary' | 'secondary' | 'ghost'>, default: 'secondary' },
  /**
   * Determines the color of the component.
   */
  variant: { type: String as PropType<'gray' | 'blue'>, default: 'gray' },
  /**
   * Determines the size.
   */
  size: { type: String as PropType<'xs' | 'sm' | 'md' | 'lg'>, default: 'md' },
  /**
   * The z-index for the popover.
   */
  zIndex: { type: String as PropType<'0' | '10' | '20' | '30' | '40' | '50' | 'auto' | ''>, required: false, default: '50' },
  /**
   * The title for the toggle button.
   */
  title: { type: String, default: 'Sort by' },
  /**
   * Determines the placement of the dropdown on the screen.
   */
  placement: { type: String as PropType<SortByDropdownPlacement>, default: 'bottom-start' },
  /**
   * Determines if the dropdown is disabled
   */
  disabled: { type: Boolean, default: false },
  /**
   * The name of the radio form field.
   */
  name: { type: String, default: null },
  /**
   * An array of options for the dropdown.
   */
  options: { type: Array as PropType<SortByDropdownOption[]>, default: () => [] }
})

/**
 * The v-model of the radio group.
 */
const model = defineModel<SortByDropdownModel | null>({
  type: Object as PropType<SortByDropdownModel | null>,
  default: null
})

const emit = defineEmits<{
  'update:modelValue': [value: SortByDropdownModel | null]
  'sortByChange': [value: SortByDropdownModel | null]
  'orderByChange': [value: SortByDropdownModel | null]
}>()

const id = useId()
const button = ref<HTMLButtonElement | undefined>()

// Track selected option and direction separately
const selectedOption = ref<SortByDropdownOption | null>(null)
const selectedDirection = ref<SortByDropdownType | null>(null)

// Flag to prevent duplicate emissions during internal state updates
const isInternalUpdate = ref(false)

const zIndexClass = computed(() => {
  switch (props.zIndex) {
    case '0':
      return 'z-0'
    case '10':
      return 'z-10'
    case '20':
      return 'z-20'
    case '30':
      return 'z-30'
    case '40':
      return 'z-40'
    case '50':
      return 'z-50'
    case 'auto':
      return 'z-auto'
    default:
      return ''
  }
})

const localModelValue = computed({
  get() {
    return selectedOption.value?.value || null
  },
  set(value: RadioGroupOptionValue) {
    // Set flag to indicate this is an internal update
    isInternalUpdate.value = true
    
    // Find the option that matches this value
    selectedOption.value = props.options.find(opt => opt.value === value) || null
    // Default direction to ascending when changing the main option
    selectedDirection.value = selectedOption.value && selectedOption.value.type ? `${selectedOption.value.type}:ascending` : null
    
    // Emit sortByChange with the complete object when the sort by option changes
    if (selectedOption.value) {
      const newValue = {
        sortBy: selectedOption.value.value,
        orderBy: selectedDirection.value
      }
      emit('sortByChange', newValue)
      
      // Update the model value
      model.value = newValue
    }
    
    // Reset the flag after a tick to allow other operations
    nextTick(() => {
      isInternalUpdate.value = false
    })
  }
})

/**
 * Computes the current order by filter based on the selected option.
 */
const orderBy = computed(() => selectedOption.value)

/**
 * Generates direction filters based on the currently selected option's type.
 */
const directionFilters = computed(() => {
  if (!orderBy.value) return []
  
  const filters: Array<{ 
    id: `${SortByDropdownOption['id']}`;
    label: SortByDropdownOption['label'];
    value: SortByDropdownType;
  }> = []
  const typeKey = orderBy.value.type.toUpperCase() as keyof typeof SORT_BY_TYPES
  
  if (SORT_BY_TYPES[typeKey]) {
    const directions = SORT_BY_TYPES[typeKey]
    Object.entries(directions).forEach(([directionKey, directionLabel]) => {
      const direction = `${typeKey.toLowerCase()}:${directionKey.toLowerCase()}` as SortByDropdownType
      const filterId = `${id}__${orderBy.value?.type}__${direction}`
      
      let label: string
      if (typeof directionLabel === 'function') {
        const customValue = orderBy.value?.label || ''
        label = directionLabel(customValue)
      } else {
        label = directionLabel
      }
      
      filters.push({
        id: filterId,
        label,
        value: direction,
      })
    })
  }
  
  return filters
})

// Watch for direction changes and emit the complete object
watch(selectedDirection, (newDirection) => {
  // Only emit if this is not an internal update and we have a valid state
  if (!isInternalUpdate.value && newDirection !== null && selectedOption.value) {
    // Set flag to prevent model watcher from emitting
    isInternalUpdate.value = true
    
    const newValue = {
      sortBy: selectedOption.value.value,
      orderBy: newDirection
    }
    emit('orderByChange', newValue)
    
    // Update the model value
    model.value = newValue
    
    // Reset flag after the update
    nextTick(() => {
      isInternalUpdate.value = false
    })
  }
})

// Emit model update when model changes (but prevent duplicate emissions)
watch(model, (newValue) => {
  if (!isInternalUpdate.value && newValue) {
    emit('update:modelValue', newValue)
  }
})

// Set default direction when selectedOption changes
watch(selectedOption, (newOption) => {
  // Only auto-set direction if this is not an internal update and no direction is set
  if (!isInternalUpdate.value && newOption && !selectedDirection.value) {
    selectedDirection.value = `${newOption.type}:ascending`
  }
}, { immediate: true })

// Initialize with first option if no model value is set and sync with existing model value
onMounted(() => {
  isInternalUpdate.value = true
  
  if (model.value && model.value.sortBy && model.value.orderBy) {
    // If there's already a model value, extract sortBy and orderBy
    selectedOption.value = props.options.find(opt => opt.value === model.value?.sortBy) || null
    selectedDirection.value = model.value.orderBy
  } else if (props.options.length > 0) {
    // Select first option by default and set ascending as default direction
    selectedOption.value = props.options[0]
    selectedDirection.value = `${selectedOption.value.type}:ascending`
    
    // Set the initial model value
    model.value = {
      sortBy: selectedOption.value.value,
      orderBy: selectedDirection.value
    }
  }
  
  nextTick(() => {
    isInternalUpdate.value = false
  })
})
</script>