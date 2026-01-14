<template>
  <SdsFloatingUi
    data-id="sds-filter-by-dropdown"
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
        @click="toggle(); handleInputFocus(); resetTmpOptions()"
      >
        <!-- @slot Title content of trigger button. -->
        <slot name="title">
          <span>{{ title + (props.count ? ` (${selectedCount})` : '') }}</span>
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
    <template #default="{ close }">
      <div
        aria-orientation="vertical"
        :aria-labelledby="button && button.id || undefined"
      >
        <div
          v-if="enableFilter"
          class="px-4 pt-4 pb-2.5"
        >
          <div
            class="input-group input-group-sm"
          >
            <input
              ref="filterTextInput"
              v-model="filterText"
              type="text"
              class="form-control"
              placeholder="Type to filter"
            >
          </div>
        </div>
        <div
          v-if="!enableFilter"
          class="py-2 mb-2 border-b border-gray-100 dark:border-gray-700 pt-2"
        >
          <div
            class="leading-5 flex gap-2 items-start px-2 mx-2 py-1.5 rounded-lg sds-theme-plaid:rounded-none hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <input
              id="filter_by_dropdown_select_all"
              type="checkbox"
              class="my-auto focus:ring-0 mt-0.5"
              :checked="allSelected"
              :indeterminate.prop="indeterminate"
              @change="toggleSelect()"
            >
            <label
              for="filter_by_dropdown_select_all"
              class="cursor-pointer leading-none text-gray-900 dark:text-gray-50 flex gap-2 items-center w-full"
            >
              <span class="my-auto">Select all</span>
            </label>
          </div>
        </div>
        <div class="scroll-area max-h-56">
          <ul>
            <li
              v-for="o in filteredTmpOptions"
              :key="o.id"
            >
              <div 
                class="leading-5 flex gap-2 items-start px-2 mx-2 py-1.5 rounded-lg sds-theme-plaid:rounded-none hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <input
                  :id="`filter_by_dropdown_selection_list_${o.id}`"
                  v-model="o.selected"
                  type="checkbox"
                  class="focus:ring-0 mt-0.5"
                  :value="o.id"
                >
                <label
                  :for="`filter_by_dropdown_selection_list_${o.id}`"
                  class="text-gray-900 hover:text-black dark:text-gray-50 dark:hover:text-white block w-full cursor-pointer"
                >{{ o.text }}</label>
              </div>
            </li>
          </ul>
        </div>
        <div class="px-4 pt-2.5 pb-2 space-y-2">
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
        </div>
      </div>
    </template>
  </SdsFloatingUi>
</template>

<script setup lang="ts">
import SdsActionButton from '../ActionButton/ActionButton.vue'
import SdsFloatingUi from '../FloatingUi/FloatingUi.vue'
import SdsButton from '../Button/Button.vue'

export interface FilterByDropdownOption {
  id: string | number
  selected: boolean
  text: string
  [key: string]: unknown
}

export type FilterByDropdownPlacement = 'auto' | 'top' | 'right'

const id = useId()

defineOptions({
  name: "SdsFilterByDropdown"
})

const props = defineProps({
  /**
   * Determines the purpose and particular function of the component.
   */
  kind: { type: String as PropType<'primary' | 'secondary' | 'ghost'>, default: 'ghost' },
  /**
   * Determines the color of the component.
   */
  variant: { type: String as PropType<'gray' | 'blue'>, default: 'gray' },
  /**
   * Determines the size.
   */
  size: { type: String as PropType<'xs' | 'sm' | 'md' | 'lg'>, default: 'sm' },
  /**
   * The z-index for the popover.
   */
  zIndex: { type: String as PropType<'0' | '10' | '20' | '30' | '40' | '50' | 'auto' | ''>, required: false, default: '50' },
  /**
   * The title for the toggle button.
   */
  title: { type: String, default: "Filter" },
  /**
   * Determine whether to enable option filtering on the dropdown.
   */
  enableFilter: { type: Boolean, default: false },
  /**
   * Determines whether to alphabetically sort the options.
   */
  enableSortOptions: { type: Boolean, default: false },
  /**
   * Determines the placement of the dropdown on the screen.
   */
  placement: { type: String as PropType<FilterByDropdownPlacement>, default: 'bottom-start' },
  /**
   * Determines if the dropdown is disabled
   */
  disabled: { type: Boolean, default: false},
  /**
   * Determines if the count is visible next to the title
   */
  count: { type: Boolean, default: false}
})

/**
 * The v-model for this component. Determines opened/closed state.
 */
const model = defineModel<FilterByDropdownOption[]>({ type: Array as PropType<FilterByDropdownOption[]>, default: () => [] })

const emit = defineEmits(['update:modelValue'])

const button = ref<HTMLButtonElement | undefined>()
const filterTextInput = ref<HTMLInputElement | undefined>()
const filterText = ref("")
const tmpOptions = ref([])

const selectedCount = computed(() => options.value.filter((i: FilterByDropdownOption) => i.selected).length)

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

const options = computed({
  get() {
    return model.value;
  },
  set(value: FilterByDropdownOption[]) {
    /**
     * Emmitted when modelValue changes.
     */
    emit("update:modelValue", value);
  },
})

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
  /**
   * Emmitted when modelValue changes.
   */
  emit("update:modelValue", tmpOptions.value);
}

const cancelSelections = () => {
  // Make a unique copy of default list data
  resetTmpOptions();
}

const handleInputFocus = () => {
  if (!props.enableFilter) return
  const interval = setInterval(() => {
    if (typeof filterTextInput.value === 'undefined') return
    filterTextInput.value?.focus()
    clearInterval(interval)
  }, 100)
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
