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
        class="input-group-text"
        :disabled="disabled"
        tabindex="-1"
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
        @input="query = filterQuery"
        @keydown.tab="showDropdown = false"
        @keydown.down.prevent="handleArrows('down', $event)"
        @keydown.up.prevent="handleArrows('up', $event)"
        @keydown.left="handleArrows('left', $event)"
        @keydown.right="handleArrows('right', $event)"
        @keydown.enter.prevent.self
        @keyup.enter.prevent.self="handleEnterKeyUp"
      >
      <button
        v-if="query.length > 0 && !disabled"
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
        v-if="focusOnKeyPress"
        class="input-group-text"
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
        class="absolute z-50 w-full p-0 mt-1 overflow-auto bg-white border rounded shadow-lg dark:border-gray-700 dark:bg-gray-850"
      >
        <div
          v-if="groups.length > 1"
          class="overflow-x-auto flex gap-2 p-2 [&+button]:border-t [&+button]:border-gray-100 dark:[&+button]:border-gray-700"
        >
          <button
            v-for="group in groups"
            :key="group.index"
            type="button"
            tabindex="-1"
            class="text-xs font-semibold p-2 rounded space-x-1.5"
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
        <template
          v-for="s, sindex in suggestionOptions"
          :key="`${s}_${sindex}`"
        >
          <div
            v-if="optionGroupChildren && s[optionGroupChildren]"
            class="[&+button]:border-t [&+button]:border-gray-100 dark:[&+button]:border-gray-700 border-t border-gray-100 dark:border-gray-700"
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
            <button
              v-for="c, cindex in s[optionGroupChildren]"
              :key="`${s}_${c}_${cindex}`"
              ref="dropdownOption"
              class="flex w-full px-4 py-2 text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              :class="{
                'text-gray-700 dark:text-gray-300': c.index !== arrowCounter,
                'text-black dark:text-white bg-gray-100 dark:bg-gray-800': c.index === arrowCounter
              }"
              :data-active="c.index === arrowCounter"
              type="button"
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
            </button>
          </div>
          <button
            v-else
            ref="dropdownOption"
            class="flex w-full px-4 py-2 text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="{
              'text-gray-700 dark:text-gray-300': s.index !== arrowCounter,
              'text-black dark:text-white bg-gray-100 dark:bg-gray-800': s.index === arrowCounter
            }"
            :data-active="s.index === arrowCounter"
            type="button"
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
          </button>
        </template>
        <!-- Footer section -->
        <div class="border-t border-gray-100 dark:border-gray-700 bg-gray-25 dark:bg-gray-800 px-4 py-2 flex gap-6 items-center text-sm text-gray-700 dark:text-gray-300">
          <div class="flex items-center gap-1.5">
            <div class="inline-block p-1 border border-gray-100 dark:border-gray-500 rounded shadow-inner">
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
            </div>
            <div class="inline-block p-1 border border-gray-100 dark:border-gray-500 rounded shadow-inner">
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
            <div class="inline-block p-1 border border-gray-100 dark:border-gray-500 rounded shadow-inner">
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
            </div>
            <div class="inline-block p-1 border border-gray-100 dark:border-gray-500 rounded shadow-inner">
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
   * The suggestions used for autosuggest.
   */
  suggestions: { type: Array as PropType<any[]>, default: undefined },
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
   * The debounce period before the suggestions are updated.
   */
  debounceSuggestions: { type: Number, default: 250 }
})

const emit = defineEmits(['update:model-value', 'complete', 'enter', 'result'])

const root = ref()
const inputField = ref()
const dropdownOption = ref()
const query = ref(props.modelValue)
const filterQuery = ref(props.modelValue)
const showDropdown = ref(false)
const arrowCounter = ref(-1)
const defaultOptionLabel = ref('label')

watch(query, (value) => {
  activeGroupKey.value = -1
  filterQuery.value = value
  emitComplete()
})

watch(showDropdown, () => {
  arrowCounter.value = -1
  activeGroupKey.value = -1
})

watchDebounced(() => props.suggestions, (value) => {
  if (query.value !== props.modelValue) {
    showDropdown.value = typeof value !== 'undefined' && value.length > 0
  }
}, { debounce: props.debounceSuggestions })

const reduceList = (arr: any) => {
  if (!Array.isArray(arr)) return []
  const cleanArray = arr.reduce((acc:any, item:any) => {
    const newItem = item
    if (props.optionGroupChildren && item[props.optionGroupChildren]) {
      newItem[props.optionGroupChildren] = reduceList(item[props.optionGroupChildren])
      if (newItem[props.optionGroupChildren].length > 0) {
        acc.push(newItem)
      }
    } else {
      if (newItem[props.optionLabel ? props.optionLabel : defaultOptionLabel.value].toLowerCase().includes(query.value.toLowerCase())) {
        acc.push(newItem)
      }
    }
    return acc
  }, [])

  return addIndexToList(cleanArray)
}

const addIndexToList = (arr: any) => {
  if (!Array.isArray(arr)) return []
  let index = 0
  return arr.map((i: any) => {
    if (props.optionGroupChildren && i[props.optionGroupChildren]) {
      i[props.optionGroupChildren] = i[props.optionGroupChildren].map((x: any) => {
        x.index = index
        index++
        return x
      })
    } else {
      i.index = index
      index++
    }
    return i
  })
}

const allCount = computed(() => {
  let count = 0
  allSuggestionOptions.value?.forEach((i: any) => {
    if (props.optionGroupChildren && i[props.optionGroupChildren]) {
      count = count + i[props.optionGroupChildren].length
    } else {
      count = count + 1
    }
  })
  return count
})

const groupsWithItems = computed(() => {
  return props.suggestions?.filter(i => props.optionGroupChildren && i[props.optionGroupChildren])
})

const groups = computed(() => {
  let key = -1
  return groupsWithItems.value ? [
    { index: -1, key, label: 'All', count: allCount.value },
    ...groupsWithItems.value.map((i, index) => {
      const count = props.optionGroupChildren && i[props.optionGroupChildren].length || 0
      if (count > 0) {
        key = key + 1
      }
      return {
        index,
        key,
        label: i[props.optionGroupLabel ? props.optionGroupLabel : defaultOptionLabel.value],
        count
      }
    })
  ] : []
})

const activeGroupKey = ref(-1)

const activeGroup = computed(() => {
  return groups.value.find(i => i.key === activeGroupKey.value)
})

const setActiveGroup = (group: { key: number, label: string, count: number }) => {
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
  allSuggestionOptions.value = props.filterSuggestions ?
    reduceList(allSuggestions) :
    addIndexToList(allSuggestions)

  // Group Suggestions
  const groupSuggestions = props.suggestions?.filter(i => {
    return props.optionGroupChildren &&
      i[props.optionGroupLabel ? props.optionGroupLabel : defaultOptionLabel.value] === activeGroup.value?.label
  })
  groupSuggestionOptions.value = props.filterSuggestions ?
    reduceList(groupSuggestions) :
    addIndexToList(groupSuggestions)
  
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
  filterQuery.value = query.value
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

onClickOutside(root, () => {
  filterQuery.value = query.value
  showDropdown.value = false
})

const closeDropdownAndFocusInput = () => {
  showDropdown.value = false
  inputField.value.focus();
}

const clearQuery = () => {
  query.value = '';
  emitUpdateModelValue()
  inputField.value.focus();
}

const handleSuggestionClick = (option: any) => {
  query.value = props.optionLabel ? option[props.optionLabel] : option[defaultOptionLabel.value]
  emitUpdateModelValue()
  emitResult(option)
  emitEnter()
  closeDropdownAndFocusInput()
}

const getCurrentSuggestion = () => {
  let option
  suggestionOptions.value.forEach((i: any) => {
    if (props.optionGroupChildren && i[props.optionGroupChildren]) {
      const tmp = i[props.optionGroupChildren].find((x: any) => x.index === arrowCounter.value)
      if (tmp) {
        option = props.optionLabel ? tmp[props.optionLabel] : tmp[defaultOptionLabel.value]
      }
    } else {
      if (i.index === arrowCounter.value) {
        option = props.optionLabel ? i[props.optionLabel] : i[defaultOptionLabel.value]
      }
    }
  })
  return option
}

const handleEnterKeyUp = () => {
  if (props.disabled) return;

  if (dropdownIsOpen.value) {
    const option = getCurrentSuggestion()
    if (option) {
      query.value = option
      emitResult(option)
      emitUpdateModelValue()
    }
    closeDropdownAndFocusInput()
  }
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
        if (suggestionOptions.value.length > 0) {
          if (activeGroupKey.value > -1 && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
            event.preventDefault()
            arrowCounter.value = -1
            activeGroupKey.value = activeGroupKey.value - 1;
          }
        }
        break;
      case "right":
        if (suggestionOptions.value.length > 0) {
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
      filterQuery.value = option
    } else {
      filterQuery.value = query.value
    }
  }
}

const emitUpdateModelValue = () => {
  /**
   * Emmited when the modelValue changes.
   */
  emit('update:model-value', query.value)
}

const emitResult = (result: any) => {
  /**
   * Emitted when a result is clicked inside the dropdown. Occurs before the search event.
   */
  emit('result', result);
}

const emitComplete = () => {
  /**
   * Emitted when internal query changes.
   */
  emit('complete', query.value);
}

const emitEnter = () => {
  /**
   * Emitted whenever the enter key is pressed.
   */
  emit('enter', query.value)
}
</script>
