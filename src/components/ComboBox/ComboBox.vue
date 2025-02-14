<template>
  <div
    ref="root"
    data-id="sds-combo-box"
    class="relative"
  >
    <div
      class="input-group"
      :class="{
        disabled,
        'input-group-sm': size === 'sm'
      }"
    >
      <button
        class="input-group-addon"
        :disabled="disabled"
        tabindex="-1"
        type="button"
        @click="inputField?.focus()"
      >
        <span class="sr-only">Combo box</span>
        <svg
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          :class="{
            'w-3.5 h-3.5': size === 'sm',
            'w-4 h-4': size !== 'sm',
          }"
        ><path
          fill="currentColor"
          d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"
        /></svg>
      </button>
      <input
        :id="id"
        ref="inputField"
        v-model.trim="filterQuery"
        type="text"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        autocorrect="off"
        class="form-control"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        @input="handleInput()"
        @keydown.tab="showDropdown = false"
        @keydown.down.prevent="handleArrows('down', $event)"
        @keydown.up.prevent="handleArrows('up', $event)"
        @keydown.left="handleArrows('left', $event)"
        @keydown.right="handleArrows('right', $event)"
        @keydown.enter.prevent.self
        @keyup.enter.prevent.self="handleEnterKeyUp"
      >
      <button
        v-if="filterQuery.length > 0 && !disabled"
        tabindex="-1"
        type="button"
        class="btn text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
        :class="{
          'btn-sm py-1 px-2': size === 'sm',
          'btn-sm py-2 px-3': size !== 'sm'
        }"
        @click="clearQuery"
      >
        <span class="sr-only">Clear query</span>
        <svg
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
          class="mt-0.5"
          :class="{
            'w-4 h-4': size === 'sm',
            'w-5 h-5': size !== 'sm',
          }"
          aria-hidden="true"
        ><path d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <div
        v-if="focusOnKeyPress && !hideFocusHelperText"
        class="input-group-addon"
      >
        <SdsTooltip>
          <template #trigger>
            <div class="border dark:border-gray-700 rounded shadow px-1.5 p-1 leading-3 cursor-default">
              <span>/</span>
            </div>
          </template>
          <p>
            Press "/" to focus
          </p>
        </SdsTooltip>
      </div>
      <!-- @slot Default content. Good for adding content to the end of the input group -->
      <slot />
    </div>
    <transition
      enter-active-class="transition-opacity ease-linear duration-75"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-75"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="dropdownIsOpen"
        class="absolute z-50 w-full p-0 mt-1 bg-white border rounded shadow-lg dark:border-gray-700 dark:bg-gray-850"
      >
        <div
          v-if="!disableGroupTabs && groups.length > 1"
          class="overflow-x-auto flex gap-2 p-2 border-b border-gray-100 dark:border-gray-700"
        >
          <button
            v-for="group in groups"
            :key="group.index"
            type="button"
            tabindex="-1"
            class="text-xs font-semibold p-2 rounded space-x-1.5 whitespace-nowrap"
            :disabled="group.count < 1"
            :class="{
              'text-gray-300 dark:text-gray-700': group.count < 1,
              'bg-blue-25 text-blue-600 dark:bg-blue-900 dark:text-blue-50': group.count > 0 && activeGroupKey === group.key,
              'text-gray-600 dark:text-gray-300': group.count > 0 && activeGroupKey !== group.key,
            }"
            @click="setActiveGroup(group)"
          >
            <span>{{ group.label }}</span>
            <span
              class="text-white px-1 rounded-sm"
              :class="{
                'bg-gray-200 dark:bg-gray-800': group.count < 1,
                'bg-blue-500 dark:bg-blue-700': group.count > 0 && activeGroupKey === group.key,
                'bg-gray-500 dark:bg-gray-700': group.count > 0 && activeGroupKey !== group.key,
              }"
            >{{ group.count }}</span>
          </button>
        </div>
        <SdsScrollArea
          ref="scrollArea"
          class="max-h-72 [&>button+div]:border-t last:[&>div]:border-b-0 last:[&>button]:border-b-0"
        >
          <template
            v-for="s, sindex in suggestionOptions"
            :key="`${s}_${sindex}`"
          >
            <div
              v-if="optionGroupChildren && s[optionGroupChildren]"
              class="border-b border-gray-100 dark:border-gray-700"
            >
              <div
                v-if="activeGroupKey === -1"
                class="flex w-full px-4 py-2 text-sm text-left text-black list-none dark:text-white font-semibold"
              >
                <!-- @slot Option Group content. Good for customizing the content for each group option -->
                <slot
                  name="optionGroup"
                  :option="s"
                  :label="optionGroupLabel ? s[optionGroupLabel] : s"
                >
                  {{ optionGroupLabel ? s[optionGroupLabel] : s }}
                </slot>
              </div>
              <component 
                :is="optionType"
                v-for="c, cindex in s[optionGroupChildren]"
                :key="`${s}_${c}_${cindex}`"
                ref="dropdownOption" 
                :href="optionType === 'a' ? c.href : undefined"
                class="flex w-full px-4 py-2 text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                :class="{
                  'text-gray-700 dark:text-gray-300': c.index !== arrowCounter,
                  'text-black dark:text-white bg-gray-50 dark:bg-gray-800': c.index === arrowCounter
                }"
                :data-active="c.index === arrowCounter"
                :type="optionType === 'button' ? 'button' : undefined"
                tabindex="-1"
                @click="handleSuggestionClick(c)"
              >
                <!-- @slot Option content. Good for customizing the content for each option -->
                <slot
                  name="option"
                  :option="c"
                  :label="optionLabel ? c[optionLabel] : c[defaultOptionLabel]"
                >
                  {{ optionLabel ? c[optionLabel] : c[defaultOptionLabel] }}
                </slot>
              </component>
            </div>
            <component
              :is="optionType"
              v-else
              ref="dropdownOption"
              :href="optionType === 'a' ? s.href : undefined"
              class="flex w-full px-4 py-2 text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
              :class="{
                'text-gray-700 dark:text-gray-300': s.index !== arrowCounter,
                'text-black dark:text-white bg-gray-50 dark:bg-gray-800': s.index === arrowCounter
              }"
              :data-active="s.index === arrowCounter"
              :type="optionType === 'button' ? 'button' : undefined"
              tabindex="-1"
              @click="handleSuggestionClick(s)"
            >
              <!-- @slot Option content. Good for customizing the content for each option -->
              <slot
                name="option"
                :option="s"
                :label="optionLabel ? s[optionLabel] : s[defaultOptionLabel]"
              >
                {{ optionLabel ? s[optionLabel] : s[defaultOptionLabel] }}
              </slot>
            </component>
          </template>
        </SdsScrollArea>
        <!-- Footer section -->
        <div class="border-t rounded-b border-gray-100 dark:border-gray-700 bg-gray-25 dark:bg-gray-800 px-4 py-2 flex gap-6 items-center text-sm text-gray-700 dark:text-gray-300">
          <div class="ml-auto flex items-center gap-1.5">
            <div class="flex gap-1 p-1 border border-gray-100 dark:border-gray-500 rounded shadow-inner">
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                focusable="false"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                />
              </svg>
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                focusable="false"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                />
              </svg>
            </div>
            <span class="sr-only">Up, down</span> to navigate
          </div>
          <div
            v-if="groups.length > 1"
            class="flex items-center gap-1.5"
          >
            <div class="flex gap-1 p-1 border border-gray-100 dark:border-gray-500 rounded shadow-inner">
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                focusable="false"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                />
              </svg>
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                focusable="false"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                />
              </svg>
            </div>
            <span class="sr-only">Left, right</span> to switch tabs
          </div>
          <div class="flex items-center gap-1.5">
            <div class="inline-block p-1 border border-gray-100 dark:border-gray-500 rounded shadow-inner">
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                focusable="false"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M448 64c0-17.7 14.3-32 32-32s32 14.3 32 32V224c0 53-43 96-96 96H109.3l73.4 73.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L109.3 256H416c17.7 0 32-14.3 32-32V64z"
                />
              </svg>
            </div>
            <span class="sr-only">Enter</span> to select
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import SdsTooltip from '../Tooltip/Tooltip.vue'
import SdsScrollArea from '../ScrollArea/ScrollArea.vue'

export type ComboBoxSuggestion = {
  [id: string | number]: unknown
} | string

defineOptions({
  name: 'SdsComboBox'
})

const props = defineProps({
  /**
   * Determines the id of the input.
   */
  id: { type: String, default: undefined },
  /**
   * The value of the text input.
   */
  modelValue: { type: String, default: '' },
  /**
   * The placeholder for the input.
   */
  placeholder: { type: String, default: undefined },
  /**
   * Disables the component to prevent user interaction.
   */
  disabled: { type: Boolean, default: undefined },
  /**
   * The max amount of characters that can be entered into the input.
   */
  maxlength: { type: Number, default: undefined },
  /**
   * Determines the size of the input field. Options are "sm" and "md".
   */
  size: { type: String as PropType<'sm' | 'md'>, default: undefined },
  /**
   * Determine whether to autofocus the input.
   */
  autofocus: { type: Boolean, default: undefined },
  /**
   * Determines whether to focus the input on "/" key press.
   */
  focusOnKeyPress: { type: Boolean, default: false },
  /**
   * Determines whether to display the helper text for the "/" focus key press.
   */
  hideFocusHelperText: { type: Boolean, default: false },
  /**
   * The suggestions used for autosuggest.
   */
  suggestions: { type: Array as PropType<ComboBoxSuggestion[]>, default: undefined },
  /**
   * Determines the type, or tag, use for the option/component
   */
  optionType: {
    type: String as PropType<'a' | 'button'>,
    default: 'button'
  },
  /**
   * The label key used for each non-group suggestion.
   */
  optionLabel: { type: String, default: undefined },
  /**
   * The label key used for each group suggestion.
   */
  optionGroupLabel: { type: String, default: undefined },
  /**
   * The key used to determine the children array for each group suggestion.
   */
  optionGroupChildren: { type: String, default: undefined },
  /**
   * Determine whether to use built-in suggestion filter based on modelValue.
   */
  filterSuggestions: { type: Boolean, default: undefined },
  /**
   * The debounce period before complete event is emitted.
   */
  debounceComplete: { type: Number, default: 350 },
  /**
   * Determines whether to hide empty groups from the tabbed group suggestions.
   */
  hideEmptyGroups: { type: Boolean, default: false },
  /**
   * Determines whether to hide empty groups from the tabbed group suggestions.
   */
  disableGroupTabs: { type: Boolean, default: false }
})

const emit = defineEmits(['update:model-value', 'complete', 'enter', 'result'])

const removeHtmlFromString = (value: string) => {
  if (typeof document === 'undefined') return value
  let div = document.createElement('div')
  div.innerHTML = value
  return div.textContent || div.innerText || ''
}

const root = ref()
const scrollArea = ref()
const inputField = ref()
const dropdownOption = ref()

const query = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    /**
     * Emmited when the modelValue changes.
     */
    emit('update:model-value', value)
  }
})

const filterQuery = ref(props.modelValue)
const showDropdown = ref(false)
const preventShowDropdown = ref(false)
const arrowCounter = ref(-1)
const defaultOptionLabel = ref('label')

watch(query, (value) => {
  activeGroupKey.value = -1
  arrowCounter.value = -1
  filterQuery.value = removeHtmlFromString(value)
})

watchDebounced(query, () => {
  emitComplete()
}, { debounce: props.debounceComplete })

watch(showDropdown, () => {
  arrowCounter.value = -1
  activeGroupKey.value = -1
})

watch(() => props.suggestions, (value) => {
  if (!preventShowDropdown.value) {
    showDropdown.value = typeof value !== 'undefined' && value.length > 0
  }
})

watch(filterQuery, (value) => {
  preventShowDropdown.value = value === removeHtmlFromString(query.value)
})

const reduceList = (arr: ComboBoxSuggestion[]) => {
  if (!Array.isArray(arr)) return []
  const cleanArray = arr.reduce((acc:ComboBoxSuggestion[], item:ComboBoxSuggestion) => {
    if (typeof item !== 'string') {
      const newItem = item
      if (props.optionGroupChildren && item[props.optionGroupChildren]) {
        newItem[props.optionGroupChildren] = reduceList(item[props.optionGroupChildren] as ComboBoxSuggestion[])
        if ((newItem[props.optionGroupChildren] as ComboBoxSuggestion[]).length > 0) {
          acc.push(newItem)
        }
      } else {
        if (removeHtmlFromString(newItem[props.optionLabel ? props.optionLabel : defaultOptionLabel.value] as string).toLowerCase().includes(removeHtmlFromString(query.value).toLowerCase())) {
          acc.push(newItem)
        }
      }
    }
    return acc
  }, [])

  return addIndexToList(cleanArray)
}

const addIndexToList = (arr: ComboBoxSuggestion[]) => {
  if (!Array.isArray(arr)) return []
  let index = 0
  return arr.map((i: ComboBoxSuggestion) => {
    if (typeof i !== 'string') {
      if (props.optionGroupChildren && i[props.optionGroupChildren]) {
        i[props.optionGroupChildren] = (i[props.optionGroupChildren] as ComboBoxSuggestion[]).map((x: ComboBoxSuggestion) => {
          if (typeof x !== 'string') {
            x.index = index
            index++
          }
          return x
        })
      } else {
        i.index = index
        index++
      }
    }
    return i
  })
}

const allCount = computed(() => {
  let count = 0
  allSuggestionOptions.value?.forEach((i: ComboBoxSuggestion) => {
    if (typeof i !== 'string' && props.optionGroupChildren && i[props.optionGroupChildren]) {
      count = count + (i[props.optionGroupChildren] as ComboBoxSuggestion[]).length
    } else {
      count = count + 1
    }
  })
  return count
})

const groupsWithItems = computed(() => {
  return props.suggestions?.filter(i => typeof i !== 'string' && props.optionGroupChildren && i[props.optionGroupChildren])
})

const groups = computed(() => {
  let key = -1
  return groupsWithItems.value ? [
    { index: -1, key, label: 'All', count: allCount.value },
    ...groupsWithItems.value.map((i, index) => {
        const count = typeof i !== 'string' && props.optionGroupChildren && (i[props.optionGroupChildren] as ComboBoxSuggestion[]).length || 0
        if (count > 0) {
          key = key + 1
        }
        return {
          index,
          key,
          label: typeof i !== 'string' && i[props.optionGroupLabel ? props.optionGroupLabel : defaultOptionLabel.value],
          count
        }
    }).filter(i => typeof i !== 'string' && i && props.hideEmptyGroups ? i.count > 0 : true)
  ] : []
})

const activeGroupKey = ref(-1)

const activeGroup = computed(() => {
  return groups.value.find(i => typeof i !== 'string' && i?.key === activeGroupKey.value)
})

const setActiveGroup = (group: { key: number }) => {
  inputField.value.focus()
  arrowCounter.value = -1
  activeGroupKey.value = group.key
}

const allSuggestionOptions = ref()
const groupSuggestionOptions = ref()
const suggestionOptions = ref()

watchEffect(() => {
  // All Suggestions
  const allSuggestions = props.suggestions?.map(i => {
    if (typeof i !== 'object') {
      i = {
        [props.optionLabel ? props.optionLabel : defaultOptionLabel.value]: i
      }
    }
    return i
  })
  allSuggestionOptions.value = props.filterSuggestions && allSuggestions ?
    reduceList(allSuggestions) :
    allSuggestions && addIndexToList(allSuggestions)

  // Group Suggestions
  const groupSuggestions = props.suggestions?.filter(i => {
    return typeof i !== 'string' && props.optionGroupChildren &&
      i[props.optionGroupLabel ? props.optionGroupLabel : defaultOptionLabel.value] === activeGroup.value?.label
  })
  groupSuggestionOptions.value = props.filterSuggestions && groupSuggestions ?
    reduceList(groupSuggestions) :
    groupSuggestions && addIndexToList(groupSuggestions)
  
  // Combined Suggestion Options
  suggestionOptions.value = activeGroupKey.value === -1 ? allSuggestionOptions.value : groupSuggestionOptions.value
})

const dropdownIsOpen = computed(() => {
  return showDropdown.value && suggestionOptions.value && suggestionOptions.value.length > 0
})

onMounted(() => {
  if (props.autofocus) inputField.value.focus();
})

onKeyStroke('Escape', () => {
  filterQuery.value = removeHtmlFromString(query.value)
  preventShowDropdown.value = true
  showDropdown.value = false
})

onClickOutside(root, () => {
  filterQuery.value = removeHtmlFromString(query.value)
  preventShowDropdown.value = true
  showDropdown.value = false
})

onKeyStroke('/', (e) => {
  if (!props.focusOnKeyPress) return
  if (!e.target) return
  const tagName = (e.target as HTMLElement).tagName.toLowerCase()
  if (tagName === "textarea") return
  if (tagName === "input") return
  if (tagName === "select") return

  e.preventDefault()
  inputField.value.focus()
})

const scrollToChild = async () => {
  await nextTick()
  if (!scrollArea.value) return
  const parent = scrollArea.value.$el
  if (!parent) return
  const child = parent.querySelector('[data-active="true"]')
  if (!child) return
  const parentRect = parent.getBoundingClientRect()
  const childRect = child.getBoundingClientRect()

  const isViewable = (childRect.top >= parentRect.top) && (childRect.bottom <= parentRect.top + parent.clientHeight);

  // If you can't see the child try to scroll parent
  if (!isViewable) {
    // Should we scroll using top or bottom? Find the smaller ABS adjustment
    const scrollTop = childRect.top - parentRect.top;
    const scrollBot = childRect.bottom - parentRect.bottom;
    if (Math.abs(scrollTop) < Math.abs(scrollBot)) {
      // We're near the top of the list
      parent.scrollTop += scrollTop
    } else {
      // We're near the bottom of the list
      parent.scrollTop += scrollBot
    }
  }
}

const closeDropdownAndFocusInput = () => {
  showDropdown.value = false
  inputField.value.focus()
}

const clearQuery = () => {
  query.value = ''
  inputField.value.focus()
}

const handleSuggestionClick = (option: ComboBoxSuggestion) => {
  preventShowDropdown.value = true
  if (typeof option === 'string') {
    query.value = option
  } else {
    query.value = props.optionLabel ? option[props.optionLabel] as string : option[defaultOptionLabel.value] as string
  }
  emitResult(option)
  emitEnter()
  closeDropdownAndFocusInput()
}

const getCurrentSuggestion = () => {
  let option
  suggestionOptions.value.forEach((i: ComboBoxSuggestion) => {
    if (typeof i !== 'string') {
      if (props.optionGroupChildren && i[props.optionGroupChildren]) {
        const tmp = (i[props.optionGroupChildren] as ComboBoxSuggestion[]).find((x: ComboBoxSuggestion) => typeof x !== 'string' && x.index === arrowCounter.value)
        if (tmp) {
          option = tmp
        }
      } else {
        if (i.index === arrowCounter.value) {
          option = i
        }
      }
    }
  })
  return option
}

const getCurrentSuggestionValue = () => {
  const option = getCurrentSuggestion()
  if (!option) return ''
  return props.optionLabel ? option[props.optionLabel] : option[defaultOptionLabel.value]
}

const handleInput = async () => {
  await nextTick()
  query.value = filterQuery.value
}

const handleEnterKeyUp = () => {
  if (props.disabled) return;

  if (dropdownIsOpen.value) {
    const option = getCurrentSuggestion()
    if (option) {
      query.value = getCurrentSuggestionValue()
      emitResult(option)
    }
    closeDropdownAndFocusInput()
  }
  preventShowDropdown.value = true
  emitEnter()
}

const handleArrows = (direction: 'up' | 'down' | 'left' | 'right', event: KeyboardEvent) => {
  // Allow an open state
  if (!dropdownIsOpen.value && (direction === 'up' || direction === 'down')) {
    showDropdown.value = true
  } else {
    switch (direction) {
      // When going down, select next result until end
      // then loop back around starting with original query.
      case "down":
        // if (!this.isOpen && this.metThreshold) this.filterResults();
        if (arrowCounter.value < dropdownOption.value.length - 1) {
          arrowCounter.value = arrowCounter.value + 1;
        } else {
          arrowCounter.value = -1;
        }
        break;
      // When going up, select prev result until at original query
      // then loop back around starting at the end of the results.
      case "up":
        if (arrowCounter.value > -1) {
          arrowCounter.value = arrowCounter.value - 1;
        } else {
          arrowCounter.value = dropdownOption.value.length - 1;
        }
        break;
      case "left":
        if (!props.disableGroupTabs && suggestionOptions.value.length > 0) {
          if (activeGroupKey.value > -1 && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
            event.preventDefault()
            arrowCounter.value = -1
            activeGroupKey.value = activeGroupKey.value - 1;
          }
        }
        break;
      case "right":
        if (!props.disableGroupTabs && suggestionOptions.value.length > 0) {
          if (activeGroupKey.value < groups.value[groups.value.length - 1].key && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
            event.preventDefault()
            arrowCounter.value = -1
            activeGroupKey.value = activeGroupKey.value + 1;
          }
        }
        break;
    }
    // Set the input boxes text to the value of the result
    const option = getCurrentSuggestion()
    if (option) {
      filterQuery.value = removeHtmlFromString(getCurrentSuggestionValue())
    } else {
      filterQuery.value = removeHtmlFromString(query.value)
    }

    // Scroll to selected result
    scrollToChild()
  }
}

const emitResult = (result: ComboBoxSuggestion) => {
  /**
   * Emitted when a result is clicked inside the dropdown. Occurs before the search event.
   */
  emit('result', result);
}

const emitComplete = () => {
  /**
   * Emitted when internal query changes.
   */
  emit('complete', filterQuery.value);
}

const emitEnter = () => {
  /**
   * Emitted whenever the enter key is pressed.
   */
  emit('enter', filterQuery.value)
}
</script>
