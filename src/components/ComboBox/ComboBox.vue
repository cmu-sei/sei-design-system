<template>
  <div
    ref="root"
    data-id="sds-combo-box"
    class="relative"
  >
    <div
      class="input-group flex flex-col"
      :class="{
        disabled,
        'input-group-sm': size === 'sm'
      }"
    >
      <div
        v-if="(type === 'taggable-select' || (type === 'select' && multiple)) && selected.length > 0"
        class="flex flex-row flex-wrap bg-gray-25 dark:bg-gray-950 rounded-t-sm gap-1 p-2 mr-auto justify-start w-full"
      >
        <SdsTag
          v-for="(option, index) in selected"
          :key="index"
          :disabled="disabled"
          action="remove"
          class="grow-0"
          :label="option as string"
          @remove="multiselectRemove(index)"
        />
      </div>
      <div class="flex flex-row">
        <button
          class="input-group-addon"
          :disabled="disabled"
          type="button"
          @click="handleEnterKeyUp"
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
          >
            <path
              fill="currentColor"
              d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"
            />
          </svg>
        </button>
        <span
          v-if="!multiple && type === 'select' && selected.length"
          class="input-group-addon"
        >{{ selected[0] }}</span>
        <input
          :id="id"
          ref="inputField"
          v-model.trim="query"
          type="text"
          :multiple="type === 'taggable-select' || multiple"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          autocorrect="off"
          class="form-control border-none"
          :class="{
            'opacity-0': !multiple && type === 'select' && selected.length
          }"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="isReadonly"
          :maxlength="maxlength"
          @input="handleInput"
          @focus.prevent="handleFocus"
          @keydown.delete="handleDelete"
          @keydown.tab="showDropdown = false"
          @keydown.down.prevent="handleArrows('down', $event)"
          @keydown.up.prevent="handleArrows('up', $event)"
          @keydown.left="handleArrows('left', $event)"
          @keydown.right="handleArrows('right', $event)"
          @keydown.enter.prevent.self
          @keyup.enter.prevent.self="handleEnterKeyUp"
        >
        <button
          v-if="showClearButton"
          tabindex="-1"
          type="button"
          class="btn-sm my-auto py-0 ml-auto btn text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
          :class="{
            'px-2': size === 'sm',
            'px-3': size !== 'sm'
          }"
          @click.prevent="clearQuery"
        >
          <span class="sr-only">Clear query</span>
          <svg
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
            :class="{
              'w-4 h-4': size === 'sm',
              'w-5 h-5': size !== 'sm',
            }"
            aria-hidden="true"
          ><path d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div
          v-if="focusOnKeyPress && !hideFocusHelperText && !showDropdown"
          class="input-group-addon"
        >
          <SdsTooltip>
            <template #trigger>
              <div class="border dark:border-gray-700 rounded-theme-sm shadow-sm px-1.5 py-1 leading-2.5 cursor-default">
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
    </div>
    <div
      v-if="showDropdown && suggestionOptions?.length"
      class="absolute z-50 w-full p-0 mt-1 bg-white border rounded-theme-sm shadow-lg dark:border-gray-700 dark:bg-gray-850"
    >
      <div
        v-if="!disableGroupTabs && groups.length > 1"
        class="overflow-x-auto flex after:w-full after:h-full after:content-[''] after:mt-auto after:border-b-2 after:border-b-gray-100 dark:after:border-b-gray-100"
      >
        <button
          v-for="group in groups"
          :key="group.index"
          type="button"
          tabindex="-1"
          class="text-sm flex flex-row font-semibold p-3 space-x-1.5 whitespace-nowrap"
          :disabled="group.count < 1"
          :class="{
            'text-gray-300 dark:text-gray-600 border-b-2 border-gray-100 dark:border-gray-100': group.count < 1,
            'border-b-2 border-b-blue-600 text-blue-600 dark:border-b-blue-400 dark:text-blue-400': group.count > 0 && activeGroupKey === group.key,
            'text-gray-600 dark:text-gray-300 border-b-2 border-gray-100 dark:border-gray-100': group.count > 0 && activeGroupKey !== group.key,
          }"
          @click="setActiveGroup(group)"
        >
          <span>{{ group.label }}</span>
          <span
            class="my-auto text-xs px-1 rounded-xl py-0.25 px-1.5"
            :class="{
              'text-gray-50 dark:text-gray-400 bg-gray-200 dark:bg-gray-700': group.count < 1,
              'text-white bg-blue-600 dark:bg-blue-400': group.count > 0 && activeGroupKey === group.key,
              'text-white bg-gray-500 dark:bg-gray-700': group.count > 0 && activeGroupKey !== group.key,
            }"
          >{{ group.count }}</span>
        </button>
      </div>
      <SdsScrollArea
        ref="scrollArea"
        class="max-h-72 [&>button+div]:border-t last:[&>div]:border-b-0 last:[&>button]:border-b-0"
        :class="{
          'pt-2 flex flex-col gap-y-1': groups.length < 2
        }"
      >
        <template
          v-for="s, sindex in suggestionOptions"
          :key="`${s}_${sindex}`"
        >
          <div
            v-if="optionGroupChildren && s[optionGroupChildren]"
            class="flex flex-col gap-y-1 border-b border-gray-100 dark:border-gray-700 py-2"
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
            <template
              v-for="c, cindex in s[optionGroupChildren]"
              :key="`${s}_${c}_${cindex}`"
            >
              <template v-if="optionType !== 'custom'">
                <component
                  :is="optionType"
                  ref="dropdownOption"
                  :href="optionType === 'a' ? c.href : undefined"
                  class="flex flex-row w-full sds-theme-forge:mx-2 sds-theme-plaid:px-4 p-2 sds-theme-forge:max-w-[calc(100%-1rem)] sds-theme-forge:rounded text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  :class="{
                    'text-gray-700 dark:text-gray-300': c.index !== arrowCounter,
                    'text-black dark:text-white bg-gray-50 dark:bg-gray-800': c.index === arrowCounter || selected.includes(optionLabel ? c[optionLabel] : c[defaultOptionLabel])
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
                  <svg
                    v-if="selected.includes(optionLabel ? c[optionLabel] : c[defaultOptionLabel])"
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="9"
                    viewBox="0 0 11 9"
                    fill="none"
                    class="text-blue-700 dark:text-blue-400 ml-auto my-auto"
                  >
                    <path d="M10.5156 0.984375C10.8203 1.26562 10.8203 1.75781 10.5156 2.03906L4.51562 8.03906C4.23438 8.34375 3.74219 8.34375 3.46094 8.03906L0.460938 5.03906C0.15625 4.75781 0.15625 4.26562 0.460938 3.98438C0.742188 3.67969 1.23438 3.67969 1.51562 3.98438L3.97656 6.44531L9.46094 0.984375C9.74219 0.679688 10.2344 0.679688 10.5156 0.984375Z" fill="currentColor" />
                  </svg>
                </component>
              </template>
              <div
                v-else
                ref="dropdownOption"
              >
                <slot
                  name="customOption"
                  :href="c.href"
                  class="flex w-full sds-theme-forge:mx-2 sds-theme-plaid:px-4 p-2 sds-theme-forge:max-w-[calc(100%-1rem)] sds-theme-forge:rounded text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                  :class-list="{
                    'text-gray-700 dark:text-gray-300': c.index !== arrowCounter,
                    'text-black dark:text-white bg-gray-50 dark:bg-gray-800': c.index === arrowCounter
                  }"
                  :data-active="c.index === arrowCounter"
                  tabindex="-1"
                  :option="c"
                  :label="optionLabel ? c[optionLabel] : c[defaultOptionLabel]"
                  @click="handleSuggestionClick(c)"
                >
                  {{ optionLabel ? c[optionLabel] : c[defaultOptionLabel] }}
                </slot>
              </div>
            </template>
          </div>
          <template v-else>
            <template v-if="optionType !== 'custom'">
              <component
                :is="optionType"
                ref="dropdownOption"
                :href="optionType === 'a' ? s.href : undefined"
                class="flex w-full sds-theme-forge:mx-2 sds-theme-plaid:px-4 p-2 sds-theme-forge:max-w-[calc(100%-1rem)] sds-theme-forge:rounded text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                :class="{
                  'text-gray-700 dark:text-gray-300': s.index !== arrowCounter,
                  'text-black dark:text-white bg-gray-50 dark:bg-gray-800': s.index === arrowCounter,
                  'last:mb-2': groups.length < 2
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
            <div
              v-else
              ref="dropdownOption"
            >
              <slot
                name="customOption"
                class="flex w-full sds-theme-forge:mx-2 sds-theme-plaid:px-4 p-2 sds-theme-forge:max-w-[calc(100%-1rem)] sds-theme-forge:rounded text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                :class-list="{
                  'text-gray-700 dark:text-gray-300': s.index !== arrowCounter,
                  'text-black dark:text-white bg-gray-50 dark:bg-gray-800': s.index === arrowCounter
                }"
                :data-active="s.index === arrowCounter"
                :href="s.href"
                tabindex="-1"
                :option="s"
                :label="optionLabel ? s[optionLabel] : s[defaultOptionLabel]"
                @click="handleSuggestionClick(s)"
              >
                {{ optionLabel ? s[optionLabel] : s[defaultOptionLabel] }}
              </slot>
            </div>
          </template>
        </template>
      </SdsScrollArea>
      <!-- Footer section -->
      <div
        class="border-t rounded-b-theme-sm border-gray-100 dark:border-gray-700 bg-gray-25 dark:bg-gray-800 px-4 py-2 flex gap-6 items-center text-sm text-gray-700 dark:text-gray-300"
      >
        <div class="ml-auto flex items-center gap-1.5">
          <div class="flex gap-1 p-1 border border-gray-100 dark:border-gray-500 rounded-theme-sm shadow-inner">
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
          <div class="flex gap-1 p-1 border border-gray-100 dark:border-gray-500 rounded-theme-sm shadow-inner">
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
          <div class="inline-block p-1 border border-gray-100 dark:border-gray-500 rounded-theme-sm shadow-inner">
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
   * The multiple prop allows the user to select multiple options. If 'type' is set
   * to 'taggable-select', this will be set to true.
   */
  multiple: { type: Boolean, default: false },
  /**
   * Use combobox as text "autosuggest", selectable text, or taggable-selection.
   */
  type: { type: String as PropType<'text' | 'select' | 'taggable-select'>, default: 'text' },
  /**
   * Determines the type, or tag, use for the option/component
   */
  optionType: {
    type: String as PropType<'a' | 'button' | 'custom'>,
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
   * The delimiter used to separate selected options in the input field.
   */
  delimiter: { type: String, default: ',' },
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

const emit = defineEmits(['update:modelValue', 'complete', 'enter', 'result'])

const removeHtmlFromString = (value: string) => {
  if (typeof document === 'undefined') return value
  const div = document.createElement('div')
  div.innerHTML = value
  return div.textContent || div.innerText || ''
}

const root = ref()
const scrollArea = ref()
const inputField = ref()
const dropdownOption = ref()
const isReadonly = ref(false)

/* Setup query to bind to modelValue */
const query = defineModel({ type: String, default: '' })
const selected = defineModel('selected', { type: Array as PropType<ComboBoxSuggestion[]>, default: () => [] })

// Hide dropdown initially
const showDropdown = ref(false)
// Disable dropdown focus initially
const arrowCounter = ref(-1)
const defaultOptionLabel = ref('label')

watch(query, (value: string) => {
  /* Always remove HTML from query value if found */
  const htmlRegex = /<[^>]*(>|$)/
  if (htmlRegex.test(value))
    query.value = removeHtmlFromString(value)
  /* Show "X" button to clear current selection
   * Follow inputField.value to check on keypress */
  const inputLength = inputField.value ? inputField.value.value.length : 0
  /* Only show clear button if input is set */
  showClearButton.value = inputLength > 0
})

watchDebounced(query, () => {
  emitComplete()
}, { debounce: props.debounceComplete })

watch(showDropdown, () => {
  // Move focus out of dropdown when it is closed
  arrowCounter.value = -1
  activeGroupKey.value = -1
})

const reduceList = (arr: ComboBoxSuggestion[]) => {
  if (!Array.isArray(arr)) return []
  const cleanArray = arr.reduce((acc: ComboBoxSuggestion[], item: ComboBoxSuggestion) => {
    if (typeof item !== 'string') {
      const newItem = Object.assign({}, item)
      if (props.optionGroupChildren && item[props.optionGroupChildren]) {
        newItem[props.optionGroupChildren] = reduceList(item[props.optionGroupChildren] as ComboBoxSuggestion[])
        if ((newItem[props.optionGroupChildren] as ComboBoxSuggestion[]).length > 0) {
          acc.push(newItem)
        }
      } else {
        if (
          removeHtmlFromString(newItem[props.optionLabel ? props.optionLabel : defaultOptionLabel.value] as string)
          .toLowerCase()
          .includes(query.value.toLowerCase())
        ) {
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

const groupSuggestionOptions = ref()
const showClearButton = ref(false)

const allSuggestions = computed(() => {
  return props.suggestions?.map(i => {
    if (typeof i !== 'object') {
      i = {
        [props.optionLabel ? props.optionLabel : defaultOptionLabel.value]: i
      }
    }
    return i
  })
})

const allSuggestionOptions = computed(() => {
  return props.filterSuggestions && allSuggestions.value ?
    reduceList(allSuggestions.value) :
    allSuggestions.value && addIndexToList(allSuggestions.value)
})

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

// Group Suggestions
const groupSuggestions = computed(() => {
  return props.suggestions?.filter(i => {
    return typeof i !== 'string' && props.optionGroupChildren &&
      i[props.optionGroupLabel ? props.optionGroupLabel : defaultOptionLabel.value] === activeGroup.value?.label
  })
})

const suggestionOptions = computed(() => {
  groupSuggestionOptions.value = props.filterSuggestions && groupSuggestions.value ?
    reduceList(groupSuggestions.value) :
    groupSuggestions.value && addIndexToList(groupSuggestions.value)

  // Combined Suggestion Options
  return activeGroupKey.value === -1 ? allSuggestionOptions.value : groupSuggestionOptions.value
})

const setActiveGroup = (group: { key: number }) => {
  inputField.value.focus()
  activeGroupKey.value = group.key
}

onMounted(() => {
  if (props.autofocus) inputField.value.focus();
})

onKeyStroke('Escape', () => {
  showDropdown.value = false
  inputField.value.blur()
})

// Close dropdown when clicking outside of ComboBox
onClickOutside(root, () => {
  showDropdown.value = false
})

onKeyStroke('/', (e: KeyboardEvent) => {
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

/* Clear the input field query and query */
const clearQuery = () => {
  query.value = ''
  inputField.value.value = ''
  if (!props.multiple && props.type === 'select')
    selected.value = []
    isReadonly.value = false
  showClearButton.value = false
}

/* Shake the input field when the value is already selected or bad option */
const shake = () => {
  inputField.value.classList.add('animate-shake')
  setTimeout(() => {
    inputField.value.classList.remove('animate-shake')
  }, 500)
}

/**
 * Add a dismissable tags to the ComboBox
 * input field when multiple is enabled
 * and props.type is 'select'. Or, when
 * props.type is 'taggable-select'.
 */
const multiselectAdd = async () => {
  /* Wait for query.value to be set */
  if (!query.value) return;
  if (!selected.value.includes(query.value) && query.value !== '') {
    /* Add to selected suggestions if it's not present. */
    selected.value.push(query.value as ComboBoxSuggestion)
    /* Refocus the input field */
    inputField.value.focus()

    /* Single-select, hdie the dropdown */
    if (!props.multiple && props.type === 'select') {
      showDropdown.value = false // Hide the dropdown
      query.value = selected.value[0] as string
      if (selected.value ? selected.value.length > 0 : false)
        isReadonly.value = true // Set readonly to true if not multiple and type is select
    }

    /* Multiple select and taggable, keep the dropdown open */
    if (props.multiple && props.type === 'select' || props.type === 'taggable-select')
      query.value = selected.value.join(props.delimiter)

    await nextTick()

    /* Hide the clear all button */
    if (props.multiple && props.type === 'select' || props.type === 'taggable-select')
      showClearButton.value = false

    /* Move focus out of the dropdown */
    arrowCounter.value = -1
  } else {
    /* Hide the clear all button */
    showClearButton.value = false
    shake()
  }
}

const multiselectRemove = (index: number) => {
  selected.value.splice(index, 1)
}

const handleDelete = () => {
  // If multiple is enabled and the input field is empty,
  if (selected.value.length > 0 && inputField.value.value === '') {
    // Remove the last tag from the end of the list
    multiselectRemove(-1)
  }
}

const handleSuggestionClick = (option: ComboBoxSuggestion) => {
  handleEnterKeyUp(option)
}

const getCurrentSuggestion = () => {
  let option
  suggestionOptions.value?.forEach((i: ComboBoxSuggestion) => {
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
  if (!option) {
    return ''
  }
  return props.optionLabel ? option[props.optionLabel] : option[defaultOptionLabel.value]
}

const handleFocus = () => {
  if (!props.multiple && props.type === 'select') {
    if (selected.value.length === 1) {
      showDropdown.value = false
    } else {
      showDropdown.value = true
    }
  } else {
    showDropdown.value = true
  }
}

const handleInput = async () => {
  await nextTick()
}

const firstTick = ref()

const sendResult = async () => {
  selected.value = selected.value.length > 0 ?
    selected.value :
    [query.value] as ComboBoxSuggestion[]

  clearQuery() // Clear the query
  // Hide, the dropdown, reset selection to empty, and unfocus the input field
  showDropdown.value = false // Hide the dropdown
  selected.value = []
  inputField.value.blur()
}

const handleEnterKeyUp = async (option: ComboBoxSuggestion | KeyboardEvent | MouseEvent | null) => {
  if (props.disabled) return;

  firstTick.value = query.value
  // Determine selected option
  if (option !== null) {
    if (option instanceof KeyboardEvent || option instanceof MouseEvent) {
      // If option is a KeyboardEvent, use the current suggestion value
      switch (props.type) {
        case 'text':
        case 'taggable-select':
          query.value = getCurrentSuggestionValue() || query.value
          break;
        default:
          query.value = getCurrentSuggestionValue()
          break;
        }
    } else {
      // Otherwise, set the query value based on the given option ('string' or object)
      if (typeof option === 'string') {
        query.value = option
      } else {
        query.value = props.optionLabel ? option[props.optionLabel] as string : option[defaultOptionLabel.value] as string
      }
    }
  }

  await nextTick()
  emitEnter()
  // Emit the selected option (max 1 w/o multiple)
  emitResult(query.value)

  switch (props.type) {
    case 'text':
      await nextTick()

      // Toggle selection depending on whether it exists in selected
      if (selected.value.includes(query.value)) {
        multiselectRemove(selected.value.indexOf(query.value))
      } else {
        multiselectAdd() // Will select chosen option if props.multiple
      }

      if (selected.value.length > 0)
        sendResult()

      break;
    case 'select':
      await nextTick()

      // Toggle selection depending on whether it exists in selected
      if (selected.value.includes(query.value)) {
        multiselectRemove(selected.value.indexOf(query.value))
      } else {
        multiselectAdd() // Will select chosen option if props.multiple
      }

      if (!props.multiple) {
        if (selected.value.length === 1 && query.value === '' && !firstTick.value.length)
          sendResult()
        // Result already exists or is an invalid selection
        if (firstTick.value.length && !query.value.length) {
          /* Hide the clear all button */
          showClearButton.value = false
          shake()
        }
      } else {
        // Hide the "clear query" x button
        showClearButton.value = false
        if (selected.value.length > 0 && query.value === '' && !firstTick.value.length)
          sendResult()
        // Result already exists or is an invalid selection
        if (firstTick.value.length && !query.value.length)
          shake()
      }

      firstTick.value = '' // Reset firstTick after selection
      query.value = '' // Reset query value after selection
      break;
    case 'taggable-select':
      await nextTick()

      // Toggle selection depending on whether it exists in selected
      if (selected.value.includes(query.value)) {
        multiselectRemove(selected.value.indexOf(query.value))
      } else {
        multiselectAdd() // Will select chosen option if props.multiple
      }
      //if (selected.value.length === 1 && query.value === '') {
      if (selected.value.length > 0 && query.value === '')
        sendResult()
      // Hide the "clear query" x button
      showClearButton.value = false
      query.value = '' // Reset query value after selection
      break;
  }
}

const handleArrows = (direction: 'up' | 'down' | 'left' | 'right', event: KeyboardEvent) => {
  // Allow an open state
  if (!showDropdown.value && (direction === 'up' || direction === 'down')) {
    showDropdown.value = true
  } else {
    switch (direction) {
      // When going down, select next result until end
      // then loop back around starting with original query.
      case "down":
        // if (!this.isOpen && this.metThreshold) this.filterResults();
        if (arrowCounter.value < dropdownOption.value?.length - 1) {
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
          } else {
            // Allow circular navigation
            event.preventDefault()
            arrowCounter.value = groups.value.length - 1;
            activeGroupKey.value = groups.value[groups.value.length-1].key; // Reset to all suggestions
          }
        }
        break;
      case "right":
        if (!props.disableGroupTabs && suggestionOptions.value.length > 0) {
          if (activeGroupKey.value < groups.value[groups.value.length - 1].key && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
            event.preventDefault()
            arrowCounter.value = -1
            activeGroupKey.value = activeGroupKey.value + 1;
          } else {
            // Allow circular navigation
            event.preventDefault()
            arrowCounter.value = -1
            activeGroupKey.value = -1; // Reset to all suggestions
          }
        }
        break;
    }
    // Scroll to selected result
    scrollToChild()
  }
}

const emitResult = (result: ComboBoxSuggestion | ComboBoxSuggestion[]) => {
  /**
   * Emitted when a result is clicked inside the dropdown. Occurs before the search event.
   */
  emit('result', result)
}

const emitComplete = () => {
  /**
   * Emitted when internal query changes.
   */
  emit('complete', query.value)
}

const emitEnter = () => {
  /**
   * Emitted whenever the enter key is pressed.
   */
  emit('enter', selected.value.length ? selected.value : query.value)
}
</script>
