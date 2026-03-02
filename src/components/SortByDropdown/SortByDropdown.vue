<template>
  <SdsFloatingUi
    data-id="sds-sort-by-dropdown"
    :offset="offset"
    :strategy="strategy"
    :placement="placement"
    :popper-class="`absolute border shadow-lg rounded-theme-md bg-white border-gray-200 dark:border-gray-700 dark:bg-gray-850 w-56 ${zIndexClass}`"
    hide-arrow
    shift
  >
    <template #trigger="{ isOpen, toggle }">
      <!-- Icon-only mode with tooltip -->
      <SdsTooltip
        v-if="iconOnly && tooltip"
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
            :block="block"
            aria-haspopup="true"
            :class="iconOnlyClasses"
            :disabled="disabled"
            @click="toggle()"
          >
            <IconFa7SolidUpDown
              :class="iconSizeClasses"
              class="inline-block self-center"
            />
            <span class="sr-only">{{ title }}</span>
          </SdsActionButton>
        </template>
        <p>{{ tooltip }}</p>
      </SdsTooltip>

      <!-- Icon-only mode without tooltip -->
      <SdsActionButton 
        v-else-if="iconOnly"
        :id="id"
        ref="button"
        :kind="kind"
        :variant="variant"
        :size="size" 
        :active="isOpen"
        :block="block"
        aria-haspopup="true"
        :class="iconOnlyClasses"
        :disabled="disabled"
        @click="toggle()"
      >
        <IconFa7SolidUpDown
          :class="iconSizeClasses"
          class="inline-block self-center"
        />
        <span class="sr-only">{{ title }}</span>
      </SdsActionButton>

      <!-- Full button mode -->
      <SdsActionButton
        v-else
        :id="id"
        ref="button"
        :kind="kind"
        :variant="variant"
        :size="size" 
        :active="isOpen"
        :block="block"
        aria-haspopup="true"
        :disabled="disabled"
        @click="toggle()"
      >
        <IconFa7SolidUpDown
          :class="iconSizeClasses"
          class="inline-block self-center"
        />
        <!-- @slot Title content of trigger button. -->
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
        <IconFa7SolidChevronDown
          class="inline-block self-center w-4 h-4"
        />
      </SdsActionButton>
    </template>
    <template #default>
      <div
        role="menu"
        aria-orientation="vertical"
        :aria-labelledby="button && button.id || undefined"
        class="flex flex-col"
      >
        <SdsDropdownSection
          v-if="options.length"
          title="Sort by"
        >
          <SdsDropdownRadioItem
            v-for="(option, index) in options"
            :key="`${id}__sortBy__option_${index}`"
            v-model="localModelValue"
            :value="option.value"
            :label="String(option.label || '')"
            :name="name ? name : `${id}__sortBy__option`"
          />
        </SdsDropdownSection>
        
        <SdsDropdownSection
          v-if="orderBy"
          title="Order by"
          divider
        >
          <SdsDropdownRadioItem
            v-for="(filter, index) in directionFilters"
            :id="filter.id"
            :key="index"
            v-model="selectedDirection"
            :value="filter.value"
            :name="name ? name : `${id}__direction__option`"
            @click.stop
          >
            <template #icon>
              <IconFa7SolidArrowUp
                v-if="filter.direction.includes('ascending')"
                class="h-3.5 w-3.5"
              />
              <IconFa7SolidArrowDown
                v-else
                class="h-3.5 w-3.5"
              />
            </template>
            {{ filter.label }}
          </SdsDropdownRadioItem>
        </SdsDropdownSection>
      </div>
    </template>
  </SdsFloatingUi>
</template>

<script lang="ts" setup>
import type { RadioGroupOptionValue } from '../RadioGroup/RadioGroup.vue'
import type { Strategy } from '@floating-ui/dom'
import SdsActionButton from '../ActionButton/ActionButton.vue'
import SdsFloatingUi from '../FloatingUi/FloatingUi.vue'
import SdsTooltip from '../Tooltip/Tooltip.vue'
import SdsDropdownRadioItem from '../DropdownRadioItem/DropdownRadioItem.vue'
import SdsDropdownSection from '../DropdownSection/DropdownSection.vue'
import { useDropdown, type ButtonVariant, type DropdownPlacement } from '@/composables'

type OrderByType = 'alpha' | 'chronological' | 'numerical' | 'custom';
type OrderByDirection = 'ascending' | 'descending';
export type SortByDropdownType = `${OrderByType}:${OrderByDirection}`;

export interface SortByDropdownOption {
  id: number | string;
  value: string | number;
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
   * Styling for the button trigger.
   */
  variant?: ButtonVariant;
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
   * Displays only an icon button without label/arrow.
   */
  iconOnly?: boolean;
  /**
   * Determines the placement of the dropdown on the screen.
   */
  placement?: DropdownPlacement;
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
   * Tooltip text to display when iconOnly is enabled.
   * Only shown when iconOnly is true and tooltip text is provided.
   */
  tooltip?: string;
  /**
   * The distance between the popper and the trigger.
   */
  offset?: number;
  /**
   * Delays opening the dropdown in ms.
   */
  openDelay?: number;
  /**
   * Delays closing the dropdown in ms.
   */
  closeDelay?: number;
  /**
   * Determines whether to use block styling on the trigger button.
   */
  block?: boolean;
  /**
   * The strategy of the popover on the screen.
   */
  strategy?: Strategy;
}

defineOptions({
  name: "SdsSortByDropdown"
})

/**
 * A specialized dropdown for sorting with field and direction selection.
 * 
 * Features:
 * - Radio button selection for sort field
 * - Automatic direction filters (ascending/descending) based on field type
 * - Smart label generation for different sort types (alpha, chronological, numerical, custom)
 * - Icon-only mode with tooltip
 * - Immediate updates on selection
 * 
 * For other dropdown patterns, consider:
 * - {@link SdsActionDropdown} - Generic dropdown with custom content
 * - {@link SdsFilterByDropdown} - Multi-select filtering with checkboxes
 * 
 * @component
 */
const props = withDefaults(defineProps<SortByDropdownProps>(), {
  kind: 'ghost',
  variant: 'gray',
  size: 'sm',
  zIndex: '50',
  title: 'Sort by',
  iconOnly: false,
  placement: 'bottom-start',
  disabled: false,
  name: null,
  options: () => [],
  tooltip: 'Sort',
  offset: 5,
  openDelay: 0,
  closeDelay: 0,
  block: false,
  strategy: 'absolute'
})

/**
 * The v-model of the radio group.
 */
const model = defineModel<SortByDropdownModel | null>({
  type: Object as PropType<SortByDropdownModel | null>,
  default: null
})

// Use unified dropdown composable
const {
  id,
  buttonRef: button,
  zIndexClass,
  iconOnlyClasses,
  iconSizeClasses
} = useDropdown({
  prefix: 'action-btn',
  kind: () => props.kind,
  variant: () => props.variant,
  size: () => props.size,
  zIndex: () => props.zIndex,
  disabled: () => props.disabled,
  block: () => props.block,
  iconOnly: () => props.iconOnly,
  openDelay: props.openDelay,
  closeDelay: props.closeDelay
})

// Track selected option and direction separately
const selectedOption = ref<SortByDropdownOption | null>(null)
const selectedDirection = ref<SortByDropdownType | null>(null)

// Flag to prevent duplicate emissions during internal state updates
const isInternalUpdate = ref(false)

const localModelValue = computed<string | number | null>({
  get() {
    const value = selectedOption.value?.value
    if (typeof value === 'string' || typeof value === 'number') {
      return value
    }
    return null
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