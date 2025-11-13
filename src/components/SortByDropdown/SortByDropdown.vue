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
      <SdsTooltip
        size="auto"
        type="dark"
      >
        <template #trigger>
          <SdsActionButton 
            :id="id"
            ref="button"
            :kind="kind"
            :variant="variant"
            :size="size" 
            :active="isOpen"
            aria-haspopup="true"
            :aria-expanded="isOpen"
            :class="{
              'flex flex-col items-center justify-center h-8.5 w-8.5': hideArrow
            }"
            @click="toggle()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              fill="currentColor"
              class="inline-block self-center w-4.5 h-4.5"
            >
              <path d="M214.6 73.4C202.1 60.9 181.8 60.9 169.3 73.4L73.3 169.4C60.8 181.9 60.8 202.2 73.3 214.7C85.8 227.2 106.1 227.2 118.6 214.7L160 173.3L160 544C160 561.7 174.3 576 192 576C209.7 576 224 561.7 224 544L224 173.3L265.4 214.7C277.9 227.2 298.2 227.2 310.7 214.7C323.2 202.2 323.2 181.9 310.7 169.4L214.7 73.4zM566.6 470.7C579.1 458.2 579.1 437.9 566.6 425.4C554.1 412.9 533.8 412.9 521.3 425.4L480 466.7L480 96C480 78.3 465.7 64 448 64C430.3 64 416 78.3 416 96L416 466.7L374.6 425.3C362.1 412.8 341.8 412.8 329.3 425.3C316.8 437.8 316.8 458.1 329.3 470.6L425.3 566.6C437.8 579.1 458.1 579.1 470.6 566.6L566.6 470.6z" />
            </svg>
            <!-- @slot Title content of trigger button. -->
            <slot name="title">
              <span v-if="!hideArrow">{{ title }}</span>
            </slot>
            <svg
              v-if="!hideArrow"
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
        <p>{{ tooltip }}</p>
      </SdsTooltip>
    </template>
    <template #default>
      <div class="flex flex-col">
        <!-- First group: Original options (what to sort by) -->
        <div class="px-2 pt-4 pb-2">
          <span class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 px-2">
            Sort by
          </span>
          <ul
            v-if="options.length"
            class="flex flex-col"
          >
            <li
              v-for="(option, index) in options"
              :key="`${id}__sortBy__option_${index}`"
              class="group flex flex-row gap-2 items-center px-2 py-1.5 rounded-lg hover:bg-gray-25 dark:hover:bg-gray-750 cursor-pointer"
            >
              <input
                :id="`${id}__sortBy__option_${index}`"
                v-model="localModelValue"
                type="radio"
                class="cursor-pointer relative top-px"
                :value="option.value"
                :name="name ? name : `${id}__sortBy__option`"
                :disabled="disabled"
              >
              <label
                :for="`${id}__sortBy__option_${index}`"
                :class="{
                  'opacity-50 pointer-events-none select-none': disabled
                }"
                class="cursor-pointer text-sm text-black dark:text-gray-300 group-hover:text-gray-900 group-hover:dark:text-white w-full"
              >
                <span>{{ option.label }}</span>
              </label>
            </li>
          </ul>
        </div>
        <!-- Second group: Direction filters (how to sort) based on selected option -->
        <div
          v-if="orderBy"
          class="border-t border-gray-100 dark:border-gray-700 px-2 pt-4 pb-2"
        >
          <span class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 px-2">
            Order by
          </span>
          <ul class="flex flex-col">
            <li
              v-for="(filter, index) in directionFilters"
              :key="index"
              class="group flex flex-row gap-2 items-center px-2 py-1.5 rounded-lg hover:bg-gray-25 dark:hover:bg-gray-750 cursor-pointer"
            >
              <input
                :id="filter.id"
                v-model="selectedDirection"
                type="radio"
                class="cursor-pointer relative top-px"
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
                class="flex items-center gap-1.5 cursor-pointer text-sm text-black dark:text-gray-300 group-hover:text-gray-900 group-hover:dark:text-white w-full"
                @click.stop
              >
                <svg 
                  v-if="filter.direction.includes('ascending')"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  fill="currentColor"
                  class="h-3.5 w-3.5"
                >
                  <path d="M342.6 81.4C330.1 68.9 309.8 68.9 297.3 81.4L137.3 241.4C124.8 253.9 124.8 274.2 137.3 286.7C149.8 299.2 170.1 299.2 182.6 286.7L288 181.3L288 552C288 569.7 302.3 584 320 584C337.7 584 352 569.7 352 552L352 181.3L457.4 286.7C469.9 299.2 490.2 299.2 502.7 286.7C515.2 274.2 515.2 253.9 502.7 241.4L342.7 81.4z" />
                </svg>
                <svg 
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  fill="currentColor"
                  class="h-3.5 w-3.5"
                >
                  <path d="M297.4 566.6C309.9 579.1 330.2 579.1 342.7 566.6L502.7 406.6C515.2 394.1 515.2 373.8 502.7 361.3C490.2 348.8 469.9 348.8 457.4 361.3L352 466.7L352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 466.7L182.6 361.3C170.1 348.8 149.8 348.8 137.3 361.3C124.8 373.8 124.8 394.1 137.3 406.6L297.3 566.6z" />
                </svg>
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
  label: RadioGroupOptionValue;
  type: OrderByType;
  customAttribute?: string;
}

export interface SortByDropdownModel {
  sortBy: SortByDropdownOption['value'] | null;
  orderBy: SortByDropdownType | null;
}

/**
 * A mapping of order by types and their corresponding direction labels.
 * Used to generate appropriate labels for sorting directions based on the selected sort type.
 */
const ORDER_BY_TYPES = Object.freeze({
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
   * Determines if the arrow should display or not.
   */
  hideArrow: { type: Boolean, default: false },
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
  options: { type: Array as PropType<SortByDropdownOption[]>, default: () => [] },
  /**
   * The tooltip text for the sort button.
   */
  tooltip: { type: String, default: 'Sort' }
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
    selectedDirection.value = selectedOption.value && selectedOption.value.type 
      ? `${selectedOption.value.type}:ascending` 
      : null
    
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
 * Creates radio button options for sorting direction (ascending/descending) 
 * with appropriate labels based on the selected sort type.
 */
const directionFilters = computed(() => {
  // Return empty array if no option is selected
  if (!orderBy.value) return []
  
  // Return empty array if the option has no type property
  if (!orderBy.value.type) return []
  
  // Array to hold the generated filter options
  const filters: Array<{ 
    id: `${SortByDropdownOption['id']}`;
    label: SortByDropdownOption['label'];
    value: SortByDropdownType;
    direction: OrderByDirection;
  }> = []
  
  // Convert the selected option type to uppercase for ORDER_BY_TYPES lookup
  const typeKey = orderBy.value.type.toUpperCase() as keyof typeof ORDER_BY_TYPES
  
  // Generate direction options if the type exists in our configuration
  if (ORDER_BY_TYPES[typeKey]) {
    const directions = ORDER_BY_TYPES[typeKey]
    
    // Create a filter option for each direction/type (ascending/descending)
    Object.entries(directions).forEach(
      ([directionKey, directionLabel]: [string, string | ((value: string) => string)]) => {
        // Construct the direction/type value in the format "type:direction"
        const type = `${typeKey.toLowerCase()}:${directionKey.toLowerCase()}` as SortByDropdownType
        
        // Create unique ID for the radio input
        const filterId = `${id}__${orderBy.value?.type}__${type}`
        
        let label: string
        // Handle dynamic labels for custom sort types
        if (typeof directionLabel === 'function') {
          // For custom types, pass the selected option's customAttribute prop if available, otherwise use the label to generate contextual text
          const customValue = (orderBy.value?.customAttribute || orderBy.value?.label || '').toString().toLowerCase()
          label = directionLabel(customValue)
        } else {
          // For static types (alpha, chronological, numerical), use predefined labels
          label = directionLabel
        }
        
        // Add the filter option to the array
        filters.push({
          id: filterId,
          label,
          value: type,
          direction: (directionKey.toLowerCase() as OrderByDirection)
        })
      }
    )
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
  
  if (model.value !== null) {
    // Model value was explicitly provided (even if properties are null)
    if (model.value.sortBy && model.value.orderBy) {
      // If there's a valid model value, extract sortBy and orderBy
      selectedOption.value = props.options.find(opt => opt.value === model.value?.sortBy) || null
      selectedDirection.value = model.value.orderBy
    } else {
      // Model value explicitly set but with null properties - don't auto-select
      selectedOption.value = null
      selectedDirection.value = null
    }
  } else if (props.options.length > 0) {
    // No model value provided - select first option by default
    selectedOption.value = props.options[0]
    selectedDirection.value = `${selectedOption.value.type}:ascending`
    
    // Set the initial model value
    model.value = {
      sortBy: selectedOption.value.value,
      orderBy: selectedDirection.value
    }
  }
  
  // Reset the internal update flag
  nextTick(() => {
    isInternalUpdate.value = false
  })
})
</script>