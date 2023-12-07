<template>
  <div
    ref="root"
    data-id="sds-search-box"
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
        <span class="sr-only">Search box</span>
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
        v-model.trim="query"
        type="text"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        autocorrect="off"
        class="form-control"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        @keydown.tab="showDropdown = false"
        @keydown.down.prevent="handleArrows('down')"
        @keydown.up.prevent="handleArrows('up')"
        @keydown.enter.prevent.self
        @keyup.enter.prevent.self="handleEnterKeyUp"
      >
      <button
        v-if="query.length > 0 && !disabled"
        tabindex="-1"
        type="button"
        class="btn text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
        :class="{
          'btn-sm px-2': size === 'sm',
          'btn-sm px-3': size !== 'sm'
        }"
        @click="clearSearch"
      >
        <span class="sr-only">Clear search</span>
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
            <div class="border dark:border-gray-700 rounded shadow px-2 py-1 leading-3 cursor-default">
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
      enter-active-class="transition-transform ease-in-out origin-top duration-150"
      enter-from-class="scale-y-0"
      enter-to-class="scale-y-100"
      leave-active-class="transition-transform ease-in-out origin-top duration-200"
      leave-from-class="scale-y-100"
      leave-to-class="scale-y-0"
    >
      <div
        v-if="dropdownIsOpen"
        class="absolute z-50 w-full p-0 mt-1 overflow-auto bg-white border rounded shadow-lg dark:border-gray-700 dark:bg-gray-850"
      >
        <template
          v-for="s, sindex in suggestionOptions"
          :key="`${s}_${sindex}`"
        >
          <template v-if="optionGroupChildren && s[optionGroupChildren]">
            <div
              class="flex w-full px-4 py-2 text-sm text-left text-black list-none dark:text-white"
            >
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
              class="flex w-full px-4 py-2 text-sm text-left text-black list-none cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              :class="{ 'active bg-gray-100 dark:bg-gray-800': c.index === arrowCounter }"
              type="button"
              tabindex="-1"
              @click="handleSuggestionClick(c)"
            >
              <slot
                name="option"
                :option="c"
                :label="optionLabel ? c[optionLabel] : c"
              >
                {{ optionLabel ? c[optionLabel] : c }}
              </slot>
            </button>
          </template>
          <button
            v-else
            ref="dropdownOption"
            class="flex w-full px-4 py-2 text-sm text-left text-black list-none cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="{ 'active bg-gray-100 dark:bg-gray-800': s.index === arrowCounter }"
            type="button"
            tabindex="-1"
            @click="handleSuggestionClick(s)"
          >
            <slot
              name="option"
              :option="s"
              :label="optionLabel ? s[optionLabel] : s"
            >
              {{ optionLabel ? s[optionLabel] : s }}
            </slot>
          </button>
        </template>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import SdsTooltip from '../Tooltip/Tooltip.vue'

defineOptions({
  name: 'SdsSearchBox'
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
   * The suggestions used by autosuggest.
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

const emit = defineEmits(['update:model-value', 'complete', 'search', 'result'])

const root = ref()
const inputField = ref()
const dropdownOption = ref()
const query = ref(props.modelValue)
const showDropdown = ref(false)
const arrowCounter = ref(-1)

watch(query, () => {
  emitComplete()
})

watch(showDropdown, () => {
  arrowCounter.value = -1
})

watchDebounced(() => props.suggestions, (value) => {
  if (query.value !== props.modelValue) {
    showDropdown.value = typeof value !== 'undefined' && value.length > 0
  }
}, { debounce: props.debounceSuggestions })

const reduceList = (arr: any) => {
  const cleanArray = arr.reduce((acc:any, item:any) => {
    const newItem = item
    if (props.optionGroupChildren && item[props.optionGroupChildren]) {
      newItem[props.optionGroupChildren] = reduceList(item[props.optionGroupChildren])
      if (newItem[props.optionGroupChildren].length > 0) {
        acc.push(newItem)
      }
    } else {
      if (newItem.term.toLowerCase().includes(query.value.toLowerCase())) {
        acc.push(newItem)
      }
    }
    return acc
  }, [])

  return addIndexToList(cleanArray)
}

const addIndexToList = (arr: any) => {
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

const suggestionOptions = computed(() => {
  return props.filterSuggestions ?
    reduceList(props.suggestions) :
    addIndexToList(props.suggestions && props.suggestions || [])
})

const dropdownIsOpen = computed(() => {
  return showDropdown.value && suggestionOptions.value && suggestionOptions.value.length > 0
})

onMounted(() => {
  if (props.autofocus) inputField.value.focus();
})

onKeyStroke('Escape', () => {
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
  showDropdown.value = false
})

const closeDropdownAndFocusInput = () => {
  showDropdown.value = false
  inputField.value.focus();
}

const clearSearch = () => {
  query.value = '';
  emitUpdateModelValue()
  inputField.value.focus();
}

const handleSuggestionClick = (option: any) => {
  query.value = props.optionLabel ? option[props.optionLabel] : option
  emitUpdateModelValue()
  emitResult(option)
  emitSearch()
  closeDropdownAndFocusInput()
}

const handleEnterKeyUp = () => {
  if (props.disabled) return;

  if (dropdownIsOpen.value) {
    let option
    suggestionOptions.value.forEach((i: any) => {
      if (props.optionGroupChildren && i[props.optionGroupChildren]) {
        const tmp = i[props.optionGroupChildren].find((x: any) => x.index === arrowCounter.value)
        if (tmp) {
          option = props.optionLabel ? tmp[props.optionLabel] : tmp
        }
      } else {
        if (i.index === arrowCounter.value) {
          option = props.optionLabel ? i[props.optionLabel] : i
        }
      }
    })
    if (option) {
      query.value = option
      emitResult(option)
      emitUpdateModelValue()
    }
    closeDropdownAndFocusInput()
  }
  emitSearch()
}

const handleArrows = (direction: 'up' | 'down') => {
  // Allow an open state
  if (!showDropdown.value) {
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

const emitSearch = () => {
  /**
   * Emitted whenever a search is triggered.
   */
  emit('search', query.value)
}
</script>
