<template>
  <SdsFloatingUi
    data-id="sds-filter-by-dropdown"
    :offset="offset"
    :placement="placement"
    :popper-class="`absolute border shadow-lg rounded-theme-md bg-white border-gray-200 dark:border-gray-700 dark:bg-gray-850 w-56 ${zIndexClass}`"
    hide-arrow
    shift
  >
    <template #trigger="{ isOpen, toggle }">
      <SdsTooltip
        v-if="iconOnly && tooltip"
        :disabled="disabled"
        size="auto"
        type="dark"
      >
        <template #trigger>
          <SdsIndicator
            :hide-indicator="!(showCount && selectedCount > 0)"
            variant="red"
            placement="top-right"
            placement-over="circle"
            :size="size"
            :status="selectedCount > 0 ? `${selectedCount} items selected` : null"
          >
            <SdsActionButton 
              :id="id"
              ref="button"
              :kind="kind"
              :variant="variant"
              :size="size" 
              :active="isOpen"
              :disabled="disabled"
              :block="block"
              :class="iconOnlyClasses"
              aria-haspopup="true"
              :aria-expanded="isOpen"
              :aria-label="tooltip || title"
              @click="toggle(); resetTmpOptions()"
            >
              <IconFa7SolidFilter :class="iconSizeClasses" />
              <span class="sr-only">{{ title }}</span>
            </SdsActionButton>
          </SdsIndicator>
        </template>
        {{ tooltip }}
      </SdsTooltip>

      <SdsIndicator
        v-else-if="iconOnly"
        :hide-indicator="!(showCount && selectedCount > 0)"
        variant="red"
        placement="top-right"
        placement-over="circle"
        :size="size"
        :status="selectedCount > 0 ? `${selectedCount} items selected` : null"
      >
        <SdsActionButton 
          :id="id"
          ref="button"
          :kind="kind"
          :variant="variant"
          :size="size" 
          :active="isOpen"
          :disabled="disabled"
          :block="block"
          :class="iconOnlyClasses"
          aria-haspopup="true"
          :aria-expanded="isOpen"
          :aria-label="title"
          @click="toggle(); resetTmpOptions()"
        >
          <IconFa7SolidFilter :class="iconSizeClasses" />
          <span class="sr-only">{{ title }}</span>
        </SdsActionButton>
      </SdsIndicator>

      <SdsActionButton 
        v-else
        :id="id"
        ref="button"
        :kind="kind"
        :variant="variant"
        :size="size" 
        :active="isOpen"
        :disabled="disabled"
        :block="block"
        aria-haspopup="true"
        :aria-expanded="isOpen"
        @click="toggle(); resetTmpOptions()"
      >
        <!-- @slot Title content of trigger button. -->
        <slot name="title">
          <span>{{ title + (props.showCount ? ` (${selectedCount})` : '') }}</span>
        </slot>
        <IconFa7SolidChevronDown
          class="inline-block self-center w-4 h-4"
        />
      </SdsActionButton>
    </template>
    <template #default="{ close }">
      <div
        role="dialog"
        aria-modal="false"
        :aria-label="title"
        :aria-labelledby="button && button.id || undefined"
      >
        <SdsDropdownInputItem
          v-if="enableFilter"
          v-model="filterText"
          placeholder="Type to filter"
          autofocus
        />
        
        <SdsDropdownSection
          v-if="!enableFilter"
          divider
        >
          <SdsDropdownCheckboxItem
            id="filter_by_dropdown_select_all"
            v-model="allSelected"
            label="Select all"
            :indeterminate="indeterminate"
            @update:model-value="toggleSelect"
          />
        </SdsDropdownSection>
        
        <SdsDropdownSection
          scrollable
          max-height="14rem"
        >
          <SdsDropdownCheckboxItem
            v-for="o in filteredTmpOptions"
            :id="`filter_by_dropdown_selection_list_${o.id}`"
            :key="o.id"
            v-model="o.selected"
            :label="o.text"
            :value="o.id"
          />
        </SdsDropdownSection>
        
        <SdsDropdownFooter divider>
          <SdsButton
            kind="primary"
            size="sm"
            block
            @click="saveSelections(); close()"
          >
            Apply filter
          </SdsButton>
          <SdsButton
            kind="ghost"
            size="sm"
            block
            @click="cancelSelections(); close()"
          >
            Cancel
          </SdsButton>
        </SdsDropdownFooter>
      </div>
    </template>
  </SdsFloatingUi>
</template>

<script setup lang="ts">
import SdsActionButton from '../ActionButton/ActionButton.vue'
import SdsFloatingUi from '../FloatingUi/FloatingUi.vue'
import SdsButton from '../Button/Button.vue'
import SdsTooltip from '../Tooltip/Tooltip.vue'
import SdsIndicator from '../Indicator/Indicator.vue'
import SdsDropdownCheckboxItem from '../DropdownCheckboxItem/DropdownCheckboxItem.vue'
import SdsDropdownInputItem from '../DropdownInputItem/DropdownInputItem.vue'
import SdsDropdownSection from '../DropdownSection/DropdownSection.vue'
import SdsDropdownFooter from '../DropdownFooter/DropdownFooter.vue'
import { useDropdown, type ButtonVariant, type DropdownPlacement } from '@/composables'

export interface FilterByDropdownOption {
  id: string | number
  selected: boolean
  text: string
  [key: string]: unknown
}

defineOptions({
  name: "SdsFilterByDropdown"
})

/**
 * A specialized dropdown for filtering items with checkboxes and apply/cancel actions.
 * 
 * Features:
 * - Multi-select with checkboxes
 * - "Select all" functionality with indeterminate state
 * - Optional search/filter input
 * - Apply/Cancel pattern for controlled updates
 * - Selected count display
 * 
 * For other dropdown patterns, consider:
 * - {@link SdsActionDropdown} - Generic dropdown with custom content
 * - {@link SdsSortByDropdown} - Sorting with field and direction selection
 * 
 * @component
 */
interface FilterByDropdownProps {
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
  zIndex?: '0' | '10' | '20' | '30' | '40' | '50' | 'auto';
  /**
   * The title for the toggle button.
   */
  title?: string;
  /**
   * When true, displays only an icon without text label.
   * Useful for compact layouts and toolbars.
   */
  iconOnly?: boolean;
  /**
   * Tooltip text to display when iconOnly is enabled.
   * Only shown when iconOnly is true and tooltip text is provided.
   */
  tooltip?: string;
  /**
   * Determine whether to enable option filtering on the dropdown.
   */
  enableFilter?: boolean;
  /**
   * Determines whether to alphabetically sort the options.
   */
  enableSortOptions?: boolean;
  /**
   * Determines the placement of the dropdown on the screen.
   */
  placement?: DropdownPlacement;
  /**
   * Determines if the dropdown is disabled
   */
  disabled?: boolean;
  /**
   * Determines if the count is visible next to the title
   */
  showCount?: boolean;
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
}

const props = withDefaults(defineProps<FilterByDropdownProps>(), {
  kind: 'ghost',
  variant: 'gray',
  size: 'sm',
  zIndex: '50',
  title: "Filter",
  iconOnly: false,
  tooltip: '',
  enableFilter: false,
  enableSortOptions: false,
  placement: 'bottom-start',
  disabled: false,
  showCount: false,
  offset: 5,
  openDelay: 0,
  closeDelay: 0,
  block: false
})

/**
 * The v-model for this component. Determines opened/closed state.
 */
const options = defineModel<FilterByDropdownOption[]>({ type: Array as PropType<FilterByDropdownOption[]>, default: () => [] })

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

const filterText = ref("")
const tmpOptions = ref([])

const selectedCount = computed(() => options.value.filter((i: FilterByDropdownOption) => i.selected).length)

const allSelected = computed(() => {
  return tmpOptions.value.every((i: FilterByDropdownOption) => i.selected);
})

const someSelected = computed(() => {
  return tmpOptions.value.some((i: FilterByDropdownOption) => i.selected);
})

const indeterminate = computed(() => {
  return someSelected.value && !allSelected.value;
})

const filteredTmpOptions = computed<FilterByDropdownOption[]>(() => {
  return tmpOptions.value.filter(
    (i: FilterByDropdownOption) =>
      i.text && i.text.toLowerCase().includes(filterText.value.toLowerCase())
  );
})

const toggleSelect = () => {
  if (allSelected.value) {
    deselectAllOptions();
  } else {
    selectAllOptions();
  }
}

const saveSelections = () => {
  options.value = tmpOptions.value;
}

const cancelSelections = () => {
  // Make a unique copy of default list data
  resetTmpOptions()
}

const resetTmpOptions = () => {
  const opts = JSON.parse(JSON.stringify(options.value));
  if (props.enableSortOptions) {
    tmpOptions.value = opts
      .sort((a: FilterByDropdownOption, b: FilterByDropdownOption) => {
        return a.text.toLowerCase() < b.text.toLowerCase()
          ? -1
          : a.text.toLowerCase() > b.text.toLowerCase()
            ? 1
            : 0;
      })
      .sort((a: FilterByDropdownOption, b: FilterByDropdownOption) => {
        return a.selected > b.selected
          ? -1
          : a.selected < b.selected
            ? 1
            : 0;
      });
  } else {
    tmpOptions.value = opts;
  }
  filterText.value = ''
}

const deselectAllOptions = () => {
  tmpOptions.value.forEach((i: FilterByDropdownOption) => {
    i.selected = false;
  });
}

const selectAllOptions = () => {
  tmpOptions.value.forEach((i: FilterByDropdownOption) => {
    i.selected = true;
  });
}
</script>
