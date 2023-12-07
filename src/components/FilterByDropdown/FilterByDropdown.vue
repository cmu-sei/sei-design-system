<template>
  <SdsFloatingUi
    data-id="sds-filter-by-dropdown"
    :placement="placement"
    :popper-class="`absolute border shadow-lg rounded-md bg-white dark:border-gray-700 dark:bg-gray-850 w-72 ${zIndexClass}`"
    arrow-class="absolute bg-white border dark:border-gray-700 dark:bg-gray-850 w-3 h-3 rotate-45"
    placement-top-arrow-class="-bottom-1.5 border-t-0 border-l-0"
    placement-right-arrow-class="-left-1.5 border-t-0 border-r-0"
    placement-bottom-arrow-class="-top-1.5 border-b-0 border-r-0"
    placement-left-arrow-class="-right-1.5 border-b-0 border-l-0"
    shift
  >
    <template #trigger="{ isOpen, toggle }">
      <button
        ref="button"
        v-uid
        :class="variantClass"
        type="button"
        aria-haspopup="true"
        :aria-expanded="isOpen"
        @click="toggle(); resetTmpOptions()"
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
      </button>
    </template>
    <template #default="{ close }">
      <div
        class="p-4"
        aria-orientation="vertical"
        :aria-labelledby="button && (button as HTMLElement).id || undefined"
      >
        <div
          v-if="enableFilter"
          class="input-group input-group-sm mb-2 border-b"
        >
          <button
            class="input-group-text mt-0.5"
            @click="filterTextInput?.focus()"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="w-3.5 h-3.5"
            ><path
              fill="currentColor"
              d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"
            /></svg>
          </button>
          <input
            ref="filterTextInput"
            v-model="filterText"
            type="text"
            class="form-control"
            placeholder="Type to filter"
          >
        </div>
        <div
          v-if="!enableFilter"
          class="pb-2 mb-2 space-x-2 space-y-2 border-b dark:border-gray-700"
        >
          <label
            class="text-gray-900 dark:text-gray-50 flex gap-2 items-center w-max"
          >
            <input
              type="checkbox"
              class="my-auto"
              :checked="allSelected"
              :indeterminate.prop="indeterminate"
              @click="toggleSelect()"
            >
            <span class="my-auto">Select all</span>
          </label>
        </div>
        <div class="scroll-area max-h-48">
          <ul>
            <li
              v-for="o in filteredTmpOptions"
              :key="o.id"
              class="space-y-2"
            >
              <div class="space-x-2 flex items-center">
                <input
                  :id="`filter_by_dropdown_selection_list_${o.id}`"
                  v-model="o.selected"
                  type="checkbox"
                  class="focus:ring-0"
                  :value="o.id"
                >
                <label
                  :for="`filter_by_dropdown_selection_list_${o.id}`"
                  class="text-gray-900 dark:text-gray-50 ml-1 block"
                >{{ o.text }}</label>
              </div>
            </li>
          </ul>
        </div>
        <div class="pt-4 space-y-2">
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
import SdsFloatingUi from '../FloatingUi/FloatingUi.vue'
import SdsButton from '../Button/Button.vue'
import { Uid } from '@shimyshack/uid'

interface FilterByDropdownOption {
  id: string | number
  selected: boolean
  text: string
}

type FilterByDropdownPlacement = 'auto' | 'top' | 'right'

defineOptions({
  name: "SdsFilterByDropdown",
  directives: {
    uid: Uid
  }
})

const props = defineProps({
  /**
   * The v-model for this component. Determines opened/closed state.
   */
  modelValue: { type: Array as PropType<FilterByDropdownOption[]>, default: () => [] },
  /**
   * Determines the purpose and particular function of the component.
   */
  kind: { type: String as PropType<'primary' | 'secondary'>, default: 'secondary' },
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
  placement: { type: String as PropType<FilterByDropdownPlacement>, default: 'bottom-start' }
})

const emit = defineEmits(['update:model-value'])

const button = ref()
const filterTextInput = ref()
const filterText = ref("")
const tmpOptions = ref([])

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
    return props.modelValue;
  },
  set(value: FilterByDropdownOption[]) {
    /**
     * Emmitted when modelValue changes.
     */
    emit("update:model-value", value);
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

const variantClass = computed(() => {
  switch (props.kind) {
      case 'primary':
      return 'link link-primary'
    case 'secondary':
      return 'link link-secondary'
    default:
      return ''
  }
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
  emit("update:model-value", tmpOptions.value);
}

const cancelSelections = () => {
  // Make a unique copy of default list data
  resetTmpOptions();
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
