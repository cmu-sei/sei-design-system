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
        :disabled="disabled"
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
            :class="[
              hideArrow ? `flex flex-col items-center justify-center ${buttonSizeClasses}` : ''
            ]"
            :disabled="disabled"
            @click="toggle()"
          >
            <IconFa7SolidUpDown
              :class="[iconSizeClasses]"
              class="inline-block self-center"
            />
            <!-- @slot Title content of trigger button. -->
            <slot name="title">
              <span v-if="!hideArrow">{{ title }}</span>
            </slot>
            <IconFa7SolidChevronDown
              v-if="!hideArrow"
              class="inline-block self-center w-4 h-4"
            />
          </SdsActionButton>
        </template>
        <p>{{ tooltip }}</p>
      </SdsTooltip>
    </template>
    <template #default>
      <div class="flex flex-col">
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
              >
              <label
                :for="`${id}__sortBy__option_${index}`"
                class="cursor-pointer text-sm text-black dark:text-gray-300 group-hover:text-gray-900 group-hover:dark:text-white w-full"
              >
                <span>{{ option.label }}</span>
              </label>
            </li>
          </ul>
        </div>
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
                @click.stop
              >
              <label
                :for="filter.id"
                class="flex items-center gap-1.5 cursor-pointer text-sm text-black dark:text-gray-300 group-hover:text-gray-900 group-hover:dark:text-white w-full"
                @click.stop
              >
                <IconFa7SolidArrowUp
                  v-if="filter.direction.includes('ascending')"
                  class="h-3.5 w-3.5"
                />
                <IconFa7SolidArrowDown
                  v-else
                  class="h-3.5 w-3.5"
                />
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
import type { Placement as BasePlacement } from '@floating-ui/dom'
import SdsActionButton from '../ActionButton/ActionButton.vue'
import SdsFloatingUi from '../FloatingUi/FloatingUi.vue'
import SdsTooltip from '../Tooltip/Tooltip.vue'
import { useZIndex, useVariantClasses } from '@/composables'

export type SortByDropdownPlacement = BasePlacement;

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
const ORDER_BY_TYPES = readonly(ref({
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
}))

interface SortByDropdownProps {
  /**
   * Determines the purpose and particular function of the component.
   */
  kind?: 'primary' | 'secondary' | 'ghost';
  /**
   * Determines the color of the component.
   */
  variant?: 'gray' | 'red' | 'blue' | 'white';
  /**
   * Determines the size.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /**
   * The z-index for the popover.
   */
  zIndex?: '0' | '10' | '20' | '30' | '40' | '50' | 'auto' | '';
  /**
   * The title for the toggle button.
   */
  title?: string;
  /**
   * Determines if the arrow should display or not.
   */
  hideArrow?: boolean;
  /**
   * Determines the placement of the dropdown on the screen.
   */
  placement?: SortByDropdownPlacement;
  /**
   * Determines if the dropdown is disabled
   */
  disabled?: boolean;
  /**
   * The name of the radio form field.
   */
  name?: string | null;
  /**
   * An array of options for the dropdown.
   */
  options?: SortByDropdownOption[];
  /**
   * The tooltip text for the sort button.
   */
  tooltip?: string;
}

defineOptions({
  name: "SdsSortByDropdown"
})

const props = withDefaults(defineProps<SortByDropdownProps>(), {
  kind: 'ghost',
  variant: 'gray',
  size: 'sm',
  zIndex: '50',
  title: 'Sort by',
  hideArrow: false,
  placement: 'bottom-start',
  disabled: false,
  name: null,
  options: () => [],
  tooltip: 'Sort'
})

/**
 * The v-model of the radio group.
 */
const model = defineModel<SortByDropdownModel | null>({
  type: Object as PropType<SortByDropdownModel | null>,
  default: null
})

const id = useId()
const button = ref<HTMLButtonElement | undefined>()

// Track selected option and direction separately
const selectedOption = ref<SortByDropdownOption | null>(null)
const selectedDirection = ref<SortByDropdownType | null>(null)

// Flag to prevent duplicate emissions during internal state updates
const isInternalUpdate = ref(false)

const iconSizeClasses = useVariantClasses(() => props.size, {
  xs: 'w-4 h-4',
  sm: 'w-4 h-4',
  md: 'w-4.5 h-4.5',
  lg: 'w-4.5 h-4.5'
}, 'w-4.5 h-4.5')

const buttonSizeClasses = useVariantClasses(() => props.size, {
  xs: 'h-6.5 w-6.5',
  sm: 'h-7.5 w-7.5',
  md: 'h-8.5 w-8.5',
  lg: 'h-10.5 w-10.5'
}, 'h-8.5 w-8.5')

const { zIndexClass } = useZIndex(() => props.zIndex)

const localModelValue = computed({
  get() {
    return selectedOption.value?.value || null
  },
  set(value: RadioGroupOptionValue) {
    isInternalUpdate.value = true
    
    // Find and set the selected option based on the new value
    selectedOption.value = props.options.find((opt) => opt.value === value) ?? null
    // Set default direction to "ascending" when changing the main option
    selectedDirection.value = selectedOption.value && selectedOption.value.type 
      ? `${selectedOption.value.type}:ascending` 
      : null
    
    if (selectedOption.value) {
      model.value = {
        sortBy: selectedOption.value.value,
        orderBy: selectedDirection.value
      }
    }
    
    nextTick(() => {
      isInternalUpdate.value = false
    })
  }
})

/**
 * Computes the currently selected sort option.
 */
const orderBy = computed(() => selectedOption.value)

/**
 * Generates direction filters based on the currently selected option's type.
 * Creates radio button options for sorting direction (ascending/descending) 
 * with appropriate labels based on the selected sort type.
 */
const directionFilters = computed(() => {
  if (!orderBy.value || !orderBy.value.type) return []
  
  // Order by filter options to be returned
  const filters: Array<{ 
    id: `${SortByDropdownOption['id']}`;
    label: SortByDropdownOption['label'];
    value: SortByDropdownType;
    direction: OrderByDirection;
  }> = []
  
  // Get the type key in uppercase to match ORDER_BY_TYPES keys
  const typeKey = orderBy.value.type.toUpperCase() as keyof typeof ORDER_BY_TYPES.value
  
  if (ORDER_BY_TYPES.value[typeKey]) {
    const directions = ORDER_BY_TYPES.value[typeKey]
    
    // Create a filter option for each direction/type (ascending/descending)
    Object.entries(directions).forEach(
      ([directionKey, directionLabel]: [string, string | ((value: string) => string)]) => {
        // Construct the type/direction value in the format "type:direction"
        const type = (`${typeKey.toLowerCase()}:${directionKey.toLowerCase()}` as SortByDropdownType)
        // Create unique ID for the radio input
        const filterId = `${id}__${orderBy.value?.type}__${type}`
        
        let label: string
        if (typeof directionLabel === 'function') {
          /**
           * For custom types, pass the selected option's customAttribute prop to a function if available 
           * for dynamically, generated labels, otherwise use the label to get the context
           */
          const customValue = (orderBy.value?.customAttribute || orderBy.value?.label || '').toString().toLowerCase()
          label = directionLabel(customValue)
        } else {
          // For static types (alpha, chronological, numerical), use predefined labels
          label = directionLabel
        }
        
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

// Watch for direction changes and update the model
watch(selectedDirection, (newDirection, oldDirection) => {
  // Only update if this is not an internal update, a direction actually changed, and we have a valid state
  if (!isInternalUpdate.value && newDirection !== oldDirection && newDirection !== null && selectedOption.value) {
    model.value = {
      sortBy: selectedOption.value.value,
      orderBy: newDirection
    }
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
    if (model.value.sortBy && model.value.orderBy) {
      selectedOption.value = props.options.find(opt => opt.value === model.value?.sortBy) || null
      selectedDirection.value = model.value.orderBy
    } else {
      selectedOption.value = null
      selectedDirection.value = null
    }
  } else if (props.options.length > 0) {
    selectedOption.value = props.options[0]
    selectedDirection.value = `${selectedOption.value.type}:ascending`
    
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