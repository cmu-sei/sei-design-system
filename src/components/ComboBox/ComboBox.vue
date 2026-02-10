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
        'input-group-sm': size === 'sm',
        'bg-gray-50 dark:bg-gray-950': readonly
      }"
    >
      <div
        v-if="((type === 'taggable-select' || type === 'select') && multiple) && Array.isArray(selected) && selected.length > 0"
        class="flex flex-row flex-wrap rounded-t-sm gap-1 p-2 mr-auto justify-start w-full"
        :class="{
          'bg-gray-50': readonly,
          'bg-gray-25 dark:bg-gray-950': !disabled,
          'bg-gray-100 dark:bg-gray-850': disabled
        }"
      >
        <SdsTag
          v-for="(option, index) in selected"
          :key="index"
          :disabled="disabled"
          :readonly="readonly || disabled"
          action="remove"
          class="grow-0"
          :label="typeof option === 'object' ? String(option[optionLabel as string] ?? option[defaultOptionLabel as string] ?? '') : String(option)"
          @remove="multiselectRemove(index)"
        />
      </div>
      <div
        class="flex flex-row"
        :class="{
          'h-7': size === 'sm',
          'h-10': size !== 'sm',
        }"
      >
        <div
          class="input-group-addon absolute z-0"
          :class="{
            'py-1.75': size === 'sm',
            'py-3': size !== 'sm',
          }"
        >
          <span class="sr-only">Combo box</span>
          <IconFa7SolidMagnifyingGlass
            v-if="!pending"
            :class="{
              'w-4 h-3.5': size === 'sm',
              'w-4 h-4': size !== 'sm',
            }"
          />
          <SdsLoadingSpinner
            v-else
            size="sm"
          />
        </div>
        <span
          v-if="!multiple && (type === 'select' || type === 'taggable-select') && selected.length"
          class="input-group-addon absolute z-0"
          :class="{
            'py-1 left-7': size === 'sm',
            'py-2 left-8': size !== 'sm',
          }"
        >
          {{ typeof selected[0] === 'object' ? String(selected[0][optionLabel as string] ?? selected[0][defaultOptionLabel as string] ?? '') : String(selected[0]) }}
        </span>
        <input
          :id="id"
          ref="inputField"
          :value="inputDisplayValue"
          type="text"
          :multiple="multiple"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          autocorrect="off"
          class="form-control border-none focus-visible:ring-0 z-1"
          :class="{
            'opacity-0': !multiple && (type === 'select' || type === 'taggable-select') && selected.length,
            'pl-8': size === 'sm',
            'pl-10': size !== 'sm',
            'absolute block left-0 w-[calc(100%-4rem)]': !showDropdown && selected.length && !multiple
          }"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="isReadonly"
          :maxlength="maxlength"
          :required="required && !((type === 'select' || type === 'taggable-select'))"
          @input="onInputFieldInput"
          @click.prevent="inputClick"
          @keydown.delete="handleDelete"
          @keydown.tab="showDropdown = false"
          @keydown.up.prevent="handleArrows('up', $event)"
          @keydown.down.prevent="handleArrows('down', $event)"
          @keydown.left="handleArrows('left', $event)"
          @keydown.right="handleArrows('right', $event)"
          @keydown.enter.prevent.self
          @keyup.enter.prevent.self="handleEnterKeyUp"
        >
        <!-- Validation input for select/taggable-select types - checks if selected array has items -->
        <input
          v-if="(type === 'select' || type === 'taggable-select')"
          type="text"
          :value="selected.length > 0 ? 'selected' : ''"
          :required="required"
          tabindex="-1"
          class="absolute h-px p-0 m-0 overflow-hidden whitespace-nowrap border-0 left-1/2 -translate-x-1/2 -translate-y-1/2 top-full w-full"
          style="clip: rect(0, 0, 0, 0);"
          @input.prevent
          @keydown.prevent
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
          @mousedown.prevent="clearQuery"
        >
          <span class="sr-only">Clear query</span>
          <IconFa7SolidXmark />
        </button>
        <div
          v-if="focusOnKeyPress && !hideFocusIndicator && !isFocused && !disabled"
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
      v-if="shouldShowDropdown"
      data-id="sds-combo-box-dropdown"
      class="
        absolute z-50 w-full p-0 mt-1 bg-white border rounded-theme-sm shadow-lg
        dark:border-gray-700 dark:bg-gray-850
      "
    >
      <div
        v-if="groups?.length && !disableGroupTabs && !isFlatArray"
        class="
          overflow-x-auto overflow-y-hidden flex
          after:w-full after:h-full after:content-[''] after:mt-auto
          after:border-b after:border-b-gray-100
          dark:after:border-b-gray-800
        "
      >
        <SdsTabs
          v-if="hasCategories"
          ref="tabs"
          v-model="comboBoxTabs"
          type="underline"
          variant="blue"
          class="
            [&>div:first-of-type]:flex [&>div:first-of-type]:flex-row
            [&>div:first-of-type:before]:block
            [&>div:first-of-type:before]:content-['']
            [&>div:first-of-type:before]:w-4
            [&>div:first-of-type:before]:h-12
            [&>div:first-of-type:after]:block
            [&>div:first-of-type:after]:content-['']
            [&>div:first-of-type:after]:w-4
            [&>div:first-of-type:after]:h-12
          "
          @click.prevent.self="handleEnterKeyUp"
          @keydown.enter.prevent.self
          @keyup.enter.prevent.self="handleEnterKeyUp"
          @keydown.up.prevent="handleArrows('tabsUp', $event)"
          @keydown.down.prevent="handleArrows('tabsDown', $event)"
        />
      </div>
      <SdsScrollArea
        ref="scrollArea"
        class="max-h-72"
        :class="{
          'py-0 flex flex-col': optionType !== 'custom',
          'pt-2': !isFlatArray && allCount > 1 && countVisibleOptions(suggestionOptions) > 0 && type !== 'text',
        }"
      >
        <!-- Select all option for multiselect -->
        <template
          v-if="(type === 'taggable-select' || type === 'select') && multiple && allCount > 1 && countVisibleOptions(suggestionOptions) > 1"
        >
          <button
            ref="selectAllRef"
            type="button"
            class="
              flex items-center
              py-2
              px-2
              text-sm
              text-gray-600 dark:text-gray-300
              mb-2
              focus:outline-none
              sds-theme-forge:mx-2
              sds-theme-plaid:px-4
              sds-theme-forge:max-w-[calc(100%-1rem)]
              sds-theme-forge:rounded
              w-full text-left cursor-pointer
              hover:bg-gray-25 dark:hover:bg-gray-750
            "
            :class="{
              'mt-2': isFlatArray,
              'text-black dark:text-white bg-gray-25 dark:bg-gray-750': arrowCounter === 0
            }"
            :aria-selected="arrowCounter === 0 ? 'true' : 'false'"
            :data-active="arrowCounter === 0 ? 'true' : 'false'"
            tabindex="-1"
            role="option"
            @click="toggleSelectAll"
            @keydown.enter.prevent="toggleSelectAll"
          >
            <input
              id="select-all"
              type="checkbox"
              :checked="selectAllChecked"
              :indeterminate="selectAllIndeterminate"
              aria-label="Select all"
              class="mr-2 pointer-events-none"
              tabindex="-1"
            >
            <label
              for="select-all"
              class="cursor-pointer select-none pointer-events-none"
            >
              <span>Select all</span>
            </label>
          </button>
          <hr
            v-if="(type === 'taggable-select' || type === 'select') && multiple && isFlatArray"
            class="border-gray-100 dark:border-gray-700"
          >
        </template>
        <template
          v-for="s, sindex in suggestionOptions"
          :key="`${s}_${sindex}`"
        >
          <div
            v-if="optionGroupChildren && s[optionGroupChildren]?.length"
            class="flex flex-col gap-y-1 pb-2 mb-0"
            :class="{
              'first:[&>div]:border-t-0': !multiple,
              'border-t border-gray-50 dark:border-gray-800 pt-2': activeGroup.label !== 'All' && multiple && countVisibleOptions(s[optionGroupChildren]) > 1
            }"
          >
            <div
              v-if="activeGroupKey === -1"
              class="flex w-full px-4 py-2 text-sm text-left text-black list-none dark:text-white font-semibold"
              :class="{
                'border-t border-gray-50 dark:border-gray-800': activeGroup.label === 'All'
              }"
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
              <component
                :is="optionType"
                v-if="optionType !== 'custom'"
                ref="dropdownOption"
                tabindex="-1"
                :href="optionType === 'a' ? c.href : undefined"
                class="
                  flex flex-row
                  w-full p-2
                  sds-theme-forge:mx-2
                  sds-theme-plaid:px-4
                  sds-theme-forge:max-w-[calc(100%-1rem)]
                  sds-theme-forge:rounded
                  text-sm text-left list-none cursor-pointer
                  hover:text-black dark:hover:text-white
                  hover:bg-gray-25 dark:hover:bg-gray-750
                "
                :class="{
                  'text-gray-700 dark:text-gray-300': !isDropdownItemActive(c),
                  'text-black dark:text-white bg-gray-25 dark:bg-gray-750': isDropdownItemActive(c),
                  'text-black dark:text-white font-semibold': isSelected(optionLabel ? c[optionLabel] : c[defaultOptionLabel]) && type !== 'text'
                }"
                :data-active="isDropdownItemActive(c)"
                :type="optionType === 'button' ? 'button' : undefined"
                @click.prevent="handleSuggestionClick(c)"
              >
                <!-- @slot Option content. Good for customizing the content for each option -->
                <template v-if="(type === 'taggable-select' || type === 'select') && multiple">
                  <input
                    type="checkbox"
                    class="mr-2 my-auto"
                    tabindex="-1"
                    aria-label="Select option"
                    :checked="isSelected(optionLabel ? c[optionLabel] : c[defaultOptionLabel])"
                    @change.stop="handleSuggestionClick(c)"
                  >
                </template>
                <slot
                  name="option"
                  :option="c"
                  :label="optionLabel ? c[optionLabel] : c[defaultOptionLabel]"
                >
                  {{ optionLabel ? c[optionLabel] : c[defaultOptionLabel] }}
                </slot>
                <IconFa7SolidCheck
                  v-if="isSelected(optionLabel ? c[optionLabel] : c[defaultOptionLabel]) && type !== 'text' && !multiple"
                  class="text-blue-700 dark:text-blue-400 ml-auto my-auto w-3 h-3"
                />
              </component>
              <div
                v-else
                ref="dropdownOption"
                class="first:mt-2 last:mb-2"
              >
                <slot
                  name="customOption"
                  :href="c.href"
                  :class-list="{
                    'flex w-full sds-theme-forge:mx-2 sds-theme-plaid:px-4 p-2 sds-theme-forge:max-w-[calc(100%-1rem)] sds-theme-forge:rounded text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800': true,
                    'text-gray-700 dark:text-gray-300': !isDropdownItemActive(c),
                    'text-black dark:text-white bg-gray-50 dark:bg-gray-800': isDropdownItemActive(c)
                  }"
                  :data-active="isDropdownItemActive(c)"
                  :tabindex="arrowCounter === 0 ? 0 : -1"
                  :option="c"
                  :label="optionLabel ? c[optionLabel] : c[defaultOptionLabel]"
                  @click.prevent="handleSuggestionClick(c)"
                >
                  {{ optionLabel ? c[optionLabel] : c[defaultOptionLabel] }}
                </slot>
              </div>
            </template>
          </div>
        </template>
        <div
          v-if="!optionGroupChildren && suggestionOptions.length"
          class="flex flex-col gap-y-1"
          :class="{
            'py-2': optionType !== 'custom'
          }"
        >
          <template
            v-for="s, sindex in suggestionOptions"
            :key="`${s}_${sindex}`"
          >
            <component
              :is="optionType"
              v-if="optionType !== 'custom'"
              ref="dropdownOption"
              :href="optionType === 'a' ? s.href : undefined"
              class="flex w-full sds-theme-forge:mx-2 sds-theme-plaid:px-4 p-2 sds-theme-forge:max-w-[calc(100%-1rem)] sds-theme-forge:rounded text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-25 dark:hover:bg-gray-750"
              :class="{
                'text-gray-700 dark:text-gray-300': !isDropdownItemActive(s),
                'text-black dark:text-white font-semibold': isSelected(optionLabel ? s[optionLabel] : s[defaultOptionLabel]) && type !== 'text',
                'text-black dark:text-white bg-gray-25 dark:bg-gray-750': isDropdownItemActive(s),
                'last:mb-2': groups.length < 2
              }"
              :data-active="isDropdownItemActive(s)"
              :type="optionType === 'button' ? 'button' : undefined"
              tabindex="-1"
              @click.prevent="handleSuggestionClick(s)"
            >
              <!-- @slot Option content. Good for customizing the content for each option -->
              <template v-if="(type === 'taggable-select' || type === 'select') && multiple">
                <input
                  type="checkbox"
                  class="mr-2 my-auto"
                  aria-label="Select option"
                  :tabindex="arrowCounter === 0 ? 0 : -1"
                  :checked="isSelected(optionLabel ? s[optionLabel] : s[defaultOptionLabel])"
                  @change.stop="handleSuggestionClick(s)"
                >
              </template>
              <slot
                name="option"
                :option="s"
                :label="optionLabel ? s[optionLabel] : s[defaultOptionLabel]"
              >
                {{ optionLabel ? s[optionLabel] : s[defaultOptionLabel] }}
              </slot>
              <IconFa7SolidCheck
                v-if="isSelected(optionLabel ? s[optionLabel] : s[defaultOptionLabel]) && type !== 'text' && !multiple"
                class="text-blue-700 dark:text-blue-400 ml-auto my-auto w-3 h-3"
              />
            </component>
            <div
              v-else
              ref="dropdownOption"
              class="first:mt-2 last:mb-2"
            >
              <slot
                name="customOption"
                :class-list="{
                  'flex w-full sds-theme-forge:mx-2 sds-theme-plaid:px-4 p-2 sds-theme-forge:max-w-[calc(100%-1rem)] sds-theme-forge:rounded text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800': true,
                  'text-gray-700 dark:text-gray-300': !isDropdownItemActive(s),
                  'text-black dark:text-white bg-gray-50 dark:bg-gray-800': isDropdownItemActive(s)
                }"
                :data-active="isDropdownItemActive(s)"
                :href="s.href"
                :tabindex="arrowCounter === 0 ? 0 : -1"
                :option="s"
                :label="optionLabel ? s[optionLabel] : s[defaultOptionLabel]"
                @click.prevent="handleSuggestionClick(s)"
              >
                {{ optionLabel ? s[optionLabel] : s[defaultOptionLabel] }}
              </slot>
            </div>
          </template>
        </div>
        <!-- Show '+ Add "query"' for taggable-select when no suggestions match -->
        <hr
          v-if="shouldShowNewSuggestion && type === 'taggable-select' && allCount"
          class="border-gray-100 dark:border-gray-700"
        >
        <div
          v-if="shouldShowNewSuggestion"
          class="py-2"
        >
          <template v-if="isSelected(query)">
            <p class="px-3 text-sm">
              <i class="text-gray-600">Already added</i> "{{ query }}"
            </p>
          </template>
          <button
            v-else
            ref="dropdownOption"
            class="
              flex flex-row
              w-full
              sds-theme-forge:mx-2
              sds-theme-plaid:px-4
              p-2
              sds-theme-forge:max-w-[calc(100%-1rem)]
              sds-theme-forge:rounded
              text-sm text-left list-none
              cursor-pointer
              hover:text-black dark:hover:text-white
              hover:bg-gray-25 dark:hover:bg-gray-750
            "
            :class="{
              'text-gray-700 dark:text-gray-300': !isDropdownItemActive({ __cbxIdx: 'add' }),
              'text-black dark:text-white bg-gray-50 dark:bg-gray-800': isSelected(query) && !isDropdownItemActive({ __cbxIdx: 'add' }),
              'text-black dark:text-white bg-gray-25 dark:bg-gray-750': isDropdownItemActive({ __cbxIdx: 'add' }) || arrowCounter === lastDropdownItemIndex(),
            }"
            :aria-selected="arrowCounter === 0 ? 'true' : 'false'"
            :data-active="isDropdownItemActive({ __cbxIdx: 'add' })"
            tabindex="-1"
            @input="onInputFieldInput"
            @click.prevent="showDropdown = (readonly || disabled) ? false : !showDropdown"
            @keydown.delete="handleDelete"
            @keydown.tab="showDropdown = false"
            @keydown.left.prevent.stop="handleArrows('left', $event)"
            @keydown.right.prevent.stop="handleArrows('right', $event)"
            @keydown.enter.prevent="handleSuggestionClick({
              label: query,
              name: query,
              value: query,
              __cbxIdx: 'add'
            })"
            @mousedown.prevent="handleSuggestionClick({
              label: query,
              name: query,
              value: query,
              __cbxIdx: 'add'
            })"
          >
            <!-- @slot Option content. Good for customizing the content for each option -->
            <slot
              name="option"
              :option="{
                label: query,
                name: query,
                value: query,
                index: 'add'
              }"
              :label="query"
            >
              <IconFa7SolidPlus
                class="w-3 h-3 my-auto ml-1 mr-2"
              />
              Add "{{ query }}"
            </slot>
          </button>
        </div>
      </SdsScrollArea>
      <!-- Footer section -->
      <div
        v-if="!isSelected(query)"
        class="border-t rounded-b-theme-sm border-gray-100 dark:border-gray-700 bg-gray-25 dark:bg-gray-800 px-4 py-2 flex gap-6 items-center text-sm text-gray-700 dark:text-gray-300"
      >
        <div class="ml-auto flex items-center gap-1.5">
          <div class="flex gap-1 p-1 border border-gray-100 dark:border-gray-500 rounded-theme-sm shadow-inner">
            <IconFa7SolidArrowUp
              class="w-3 h-3"
            />
            <IconFa7SolidArrowDown
              class="w-3 h-3"
            />
          </div>
          <span class="sr-only">Up, down</span> to navigate
        </div>
        <div
          v-if="!isFlatArray && groups.length > 1"
          class="flex items-center gap-1.5"
        >
          <div class="flex gap-1 p-1 border border-gray-100 dark:border-gray-500 rounded-theme-sm shadow-inner">
            <IconFa7SolidArrowLeft
              class="w-3 h-3"
            />
            <IconFa7SolidArrowRight
              class="w-3 h-3"
            />
          </div>
          <span class="sr-only">Left, right</span> to switch tabs
        </div>
        <div class="flex items-center gap-1.5">
          <div class="inline-block p-1 border border-gray-100 dark:border-gray-500 rounded-theme-sm shadow-inner">
            <IconFa7SolidRotateLeft
              class="w-3 h-3"
            />
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
import SdsTabs from '../Tabs/Tabs.vue'

export type ComboBoxSuggestionObject = { [id: string | number]: unknown }
export type ComboBoxSuggestion = ComboBoxSuggestionObject | string

defineOptions({ name: 'SdsComboBox' })

const props = defineProps({
  /**
   * Determine whether to autofocus the input.
   */
  autofocus: { type: Boolean, default: false },
  /**
   * Display the suggestions dropdown on click.
   */
  clickToSelect: { type: Boolean, default: false },
  /**
   * The debounce period before complete event is emitted.
   */
  debounceComplete: { type: Number, default: 250 },
  /**
   * Disables the component to prevent user interaction.
   */
  disabled: { type: Boolean, default: false },
  /**
   * Determines whether to hide empty groups from the tabbed group suggestions.
   */
  disableGroupTabs: { type: Boolean, default: false },
  /**
   * The max amount of characters that can be entered into the input.
   */
  maxlength: { type: Number, default: undefined },
  /**
   * Allows the user to select multiple items. This setting only works with the `type`
   * prop set to "select" or "taggable-select", because the text type is not a selection field.
   */
  multiple: { type: Boolean, default: false },
  /**
   * Determines the id of the input.
   */
  id: { type: String, default: undefined },
  /**
   * Determines whether to focus the input on "/" key press.
   */
  focusOnKeyPress: { type: Boolean, default: false },
  /**
   * If enabled, the suggestions will narrow down as the user types, otherwise the suggestions
   * will remain a static list. Setting to `false` is necessary for suggestions that are provided
   * _and filtered_ by a secondary API.
   */
  filterSuggestions: { type: Boolean, default: false },
  /**
   * This will hide the "/" and focus tooltip helper text,
   * but `focusOnKeyPress` can still be enabled.
   */
  hideFocusIndicator: { type: Boolean, default: false },
  /**
   * Determines whether to hide empty groups from the tabbed group suggestions.
   */
  hideEmptyGroups: { type: Boolean, default: false },
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
   * Determines the type, or tag, use for the option/component
   */
  optionType: { type: String as () => 'a' | 'button' | 'custom', default: 'button' },
  /**
   * The pending prop allows the user to show a loading spinner in the input.
   * This is useful when fetching suggestions from an API.
   */
  pending: { type: Boolean, default: false },
  /**
   * The placeholder for the input.
   */
  placeholder: { type: String, default: undefined },
  /**
   * Makes the input read-only, preventing user input but still allowing focus and selection.
   */
  readonly: { type: Boolean, default: false },
  /**
   * Determines if the input is required.
   */
  required: { type: Boolean, default: false },
  /**
   * Determines the size of the input field. Options are "sm" and "md".
   */
  size: { type: String as () => 'sm' | 'md', default: undefined },
  /**
   * The suggestions used for autosuggest.
   */
  suggestions: { type: Array as () => ComboBoxSuggestion[], default: () => [] },
  /**
   * Use combobox as text "autosuggest", selectable text, or taggable-selection.
   */
  type: { type: String as () => 'text' | 'select' | 'taggable-select', default: 'text' }
})

const emit = defineEmits(['update:modelValue', 'complete', 'enter', 'result'])

const root = ref(), scrollArea = ref(), inputField = ref(), selectAllRef = ref(), dropdownOption = ref()
const isReadonly = ref(props.readonly)
const query = defineModel({ type: String, default: '' })
const selected = defineModel<ComboBoxSuggestion[]>('selected', { type: Array as () => ComboBoxSuggestion[], default: () => [] })
const showDropdown = ref(false)
const forceShowDropdown = ref(false)
const arrowCounter = ref(-1)
const defaultOptionLabel = ref('label')
const groups = ref(), activeGroup = ref(), activeGroupKey = ref(-1)
const allSuggestions = ref(), allSuggestionOptions = ref(), allCount = ref(0)
const groupSuggestions = ref(), groupSuggestionOptions = ref(), suggestionOptions = ref()
const firstTickQuery = ref()

type ComboBoxGroup = {
  key: string | number;
  label: string;
  count: number;
}

type ComboBoxTab = {
  key: string;
  title: string;
  count: number;
  active: boolean;
  disabled: boolean
}

// Computed property to map ComboBox groups to SdsTabs format
const comboBoxTabs = computed({
  get() {
    if (!groups.value) return []
    return groups.value.map((group: ComboBoxGroup) => ({
      key: String(group.key),
      title: group.label,
      count: group.count,
      active: String(group.key) === String(activeGroupKey.value) && group.count > 0,
      disabled: group.count < 1
    }))
  },
  set(newTabs) {
    // SdsTabs will update the active property, so sync activeGroupKey
    const activeTab = newTabs.find((tab: ComboBoxTab) => tab.active)
    if (activeTab) {
      activeGroupKey.value = Number(activeTab.key)
    }
  }
})

const showClearButton = computed(() => {
  if (props.disabled || props.readonly) return false
  if (inputDisplayValue.value !== '') return true
  if (props.type !== 'text' && selected.value.length > 0) return true
  return false
})

// Select All logic
const getCurrentGroupOptions = (): ComboBoxSuggestion[] => {
  // If grouped and on a specific tab, return only that group's options
  if (groups.value && !isFlatArray.value && activeGroupKey.value !== -1 && groupSuggestionOptions.value) {
    // Flatten groupSuggestionOptions
    return groupSuggestionOptions.value.flatMap((g: ComboBoxSuggestion) => {
      if (typeof g === 'object' && props.optionGroupChildren && Array.isArray(g[props.optionGroupChildren])) {
        return g[props.optionGroupChildren] as ComboBoxSuggestion[]
      }
      return [g]
    })
  }
  // If grouped and on "All" tab, or ungrouped, use allSuggestionOptions
  if (allSuggestionOptions.value) {
    return allSuggestionOptions.value.flatMap((g: ComboBoxSuggestion) => {
      if (typeof g === 'object' && props.optionGroupChildren && Array.isArray(g[props.optionGroupChildren])) {
        return g[props.optionGroupChildren] as ComboBoxSuggestion[]
      }
      return [g]
    })
  }
  return []
}

const inputClick = () => {
  if (props.readonly || props.disabled) return
  if (props.clickToSelect)
    showDropdown.value = !showDropdown.value
}

const selectAllChecked = computed(() => {
  const options = getCurrentGroupOptions()
  if (!options.length) return false
  return options.every((opt: ComboBoxSuggestion) => {
    const label = typeof opt === 'object' ? String(props.optionLabel ? opt[props.optionLabel] : opt[defaultOptionLabel.value]) : String(opt)
    return isSelected(label)
  })
})

const selectAllIndeterminate = computed(() => {
  const options = getCurrentGroupOptions()
  if (!options.length) return false
  const selectedCount = options.filter((opt: ComboBoxSuggestion) => {
    const label = typeof opt === 'object' ? String(props.optionLabel ? opt[props.optionLabel] : opt[defaultOptionLabel.value]) : String(opt)
    return isSelected(label)
  }).length
  return selectedCount > 0 && selectedCount < options.length
})

const toggleSelectAll = () => {
  const options = getCurrentGroupOptions()
  if (!options.length) return
  const allSelected = options.every((opt: ComboBoxSuggestion) => {
    const label = typeof opt === 'object' ? String(props.optionLabel ? opt[props.optionLabel] : opt[defaultOptionLabel.value]) : String(opt)
    return isSelected(label)
  })
  if (allSelected) {
    // Deselect all in scope
    options.forEach((opt: ComboBoxSuggestion) => {
      const label = typeof opt === 'object' ? String(props.optionLabel ? opt[props.optionLabel] : opt[defaultOptionLabel.value]) : String(opt)
      const idx = selected.value.findIndex(s => getLabel(s) === label)
      if (idx !== -1) selected.value.splice(idx, 1)
    })
  } else {
    // Select all in scope
    options.forEach((opt: ComboBoxSuggestion) => {
      const label = typeof opt === 'object' ? String(props.optionLabel ? opt[props.optionLabel] : opt[defaultOptionLabel.value]) : String(opt)
      if (!isSelected(label)) {
        // Use original suggestion if possible
        const suggestion = findOriginalSuggestion(label) ?? opt
        if (suggestion) selected.value.push(stripIdx(suggestion))
      }
    })
  }
}

const removeHtmlFromString = (value: string) => {
  if (typeof document === 'undefined') return value
  const div = document.createElement('div')
  div.innerHTML = value
  return div.textContent || div.innerText || ''
}

// Helper: normalize string for case-insensitive, trimmed comparison
const normalizeString = (val: string | undefined | null): string => {
  return (val ?? '').toString().trim().toLowerCase();
}

const flatSuggestions = computed<string[]>(() => {
  return (props.suggestions as ComboBoxSuggestion[]).flatMap((s) => {
    if (s && props.optionGroupChildren && typeof s === 'object')
      return s[props.optionGroupChildren] as ComboBoxSuggestion[]
    else if (typeof s === 'string')
      return s
    return []
  }).map((s) => {
    if (s && typeof s === 'object')
      return String(props.optionLabel ? s[props.optionLabel] : s[defaultOptionLabel.value])
    else if (typeof s === 'string')
      return s
    return ''
  }).filter((s): s is string => typeof s === 'string' && s.length > 0)
})

const CBX_IDX = '__cbxIdx'
const addIndexToList = (arr: ComboBoxSuggestion[]) => {
  if (!Array.isArray(arr)) return []
  const suggestions = flatSuggestions.value.map(normalizeString)
  let cbxIdx = (normalizeString(query.value).length && props.type === 'taggable-select' && !suggestions.includes(normalizeString(query.value))) ? 1 : 0
  return arr.map((i: ComboBoxSuggestion) => {
    if (typeof i !== 'string') {
      if (props.optionGroupChildren && i[props.optionGroupChildren]) {
        i[props.optionGroupChildren] = (i[props.optionGroupChildren] as ComboBoxSuggestion[]).map((x: ComboBoxSuggestion) => {
          if (typeof x !== 'string') {
            x[CBX_IDX] = cbxIdx
            cbxIdx++
          }
          return x
        })
      } else {
        i[CBX_IDX] = cbxIdx
        cbxIdx++
      }
    }
    return i
  })
}

const reduceList = (arr: ComboBoxSuggestion[]) => {
  if (!Array.isArray(arr)) return []
  const cleanArray = arr.reduce((acc: ComboBoxSuggestion[], item: ComboBoxSuggestion) => {
    if (typeof item !== 'string') {
      const newItem = { ...item }
      if (props.optionGroupChildren && item[props.optionGroupChildren]) {
        newItem[props.optionGroupChildren] = reduceList(item[props.optionGroupChildren] as ComboBoxSuggestion[])
        if (props.hideEmptyGroups) {
          if ((newItem[props.optionGroupChildren] as ComboBoxSuggestion[]).length)
            acc.push(newItem)
        } else {
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

const isFlatArray = computed(() => {
  if (!groups.value?.length) return true
  let count = 0
  for (const suggestion of groups.value) {
    if (suggestion.count > 0) count++
  }
  return count <= 1
})

// Helper to get the dropdown index of an item as rendered, including new suggestion if present
const getDropdownIndex = (item: ComboBoxSuggestion): number | null => {
  // For type='taggable-select' with "Select all" present, offset by 1 only if Select all is rendered
  let current = ((props.type === 'taggable-select' || props.type === 'select') && props.multiple && allCount.value > 1) ? 1 : 0
  const options = suggestionOptions.value as ComboBoxSuggestion[] | undefined
  if (!options) return null
  // Flatten options for group/ungrouped
  for (const opt of options) {
    if (typeof opt === 'object' && props.optionGroupChildren && Array.isArray(opt[props.optionGroupChildren])) {
      for (const child of opt[props.optionGroupChildren] as ComboBoxSuggestion[]) {
        if (child === item) return current
        current++
      }
    } else {
      if (opt === item) return current
      current++
    }
  }
  // If shouldShowNewSuggestion and item is the "Add" option, return current (last)
  if (
    props.type === 'taggable-select' && shouldShowNewSuggestion.value &&
    item && typeof item === 'object' && item.__cbxIdx === 'add'
  ) {
    return current
  }

  return null
}

const isDropdownItemActive = (item: ComboBoxSuggestion) => {
  // "Select all" is handled separately in the template (arrowCounter === 0)
  if (typeof item !== 'object' || item === null) return false;
  // For "Add" option, check if arrowCounter matches last index
  if (
    props.type === 'taggable-select' && shouldShowNewSuggestion.value &&
    item && typeof item === 'object' && item.__cbxIdx === 'add'
  ) {
    const options = suggestionOptions.value as ComboBoxSuggestion[] | undefined;
    let lastIdx = (props.type === 'taggable-select' && props.multiple) ? 1 : 0;
    if (options) {
      for (const opt of options) {
        if (typeof opt === 'object' && props.optionGroupChildren && Array.isArray(opt[props.optionGroupChildren])) {
          lastIdx += (opt[props.optionGroupChildren] as ComboBoxSuggestion[]).length;
        } else {
          lastIdx++;
        }
      }
    }

    return arrowCounter.value === lastIdx;
  }
  const idx = getDropdownIndex(item);

  if (idx === null) return false;
  return arrowCounter.value === idx;
}

// Helper to recursively check for a match in groups or flat suggestions
function suggestionMatchesQuery(suggestion: ComboBoxSuggestion, q: string): boolean {
  if (typeof suggestion === 'object' && suggestion !== null && props.optionGroupChildren && Array.isArray(suggestion[props.optionGroupChildren])) {
    // Recursively check children
    return (suggestion[props.optionGroupChildren] as ComboBoxSuggestion[]).some(child => suggestionMatchesQuery(child, q));
  }
  let label = '';
  if (typeof suggestion === 'object' && suggestion !== null) {
    label = String(props.optionLabel ? suggestion[props.optionLabel] : suggestion[defaultOptionLabel.value] ?? '');
  } else if (typeof suggestion === 'string') {
    label = suggestion;
  }
  return normalizeString(label) === normalizeString(q);
}

const matchesSuggestion = computed(() => {
  if (props.type === 'taggable-select') {
    return (props.suggestions as ComboBoxSuggestion[]).some(s => suggestionMatchesQuery(s, query.value));
  }
  const normQuery = normalizeString(query.value);
  return flatSuggestions.value.map(normalizeString).includes(normQuery);
})

// Computed property for input display value
const inputDisplayValue = computed(() => {
  // If a suggestion is highlighted, show its label
  if (arrowCounter.value !== -1 && suggestionOptions.value && suggestionOptions.value.length > 0) {
    // Find the suggestion with the current arrowCounter
    const found: ComboBoxSuggestion | null | undefined = getCurrentSuggestion()
    if (found) {
      let label = ''
      if (typeof found === 'object') {
        label = String(props.optionLabel ? found[props.optionLabel as string] : found[defaultOptionLabel.value] ?? '')
      } else {
        label = String(found)
      }
      return removeHtmlFromString(label)
    }
  }
  // If there are selections (and query is empty), use the first selected value for form validation
  // Only for single-select mode (multiselect shows selected items as tags, so input should be empty)
  if (selected.value.length > 0 && query.value === '' && !props.multiple) {
    const firstSelected = selected.value[0]
    if (typeof firstSelected === 'object') {
      return String(props.optionLabel ? firstSelected[props.optionLabel as string] : firstSelected[defaultOptionLabel.value] ?? '')
    }
    return String(firstSelected)
  }
  // Otherwise, show the query
  return removeHtmlFromString(query.value)
})

// Dedicated suppression flags for robust event suppression
let suppressCompleteDueToSelection = false
let suppressCompleteDueToLabelUpdate = false
let suppressShowDropdownNext = false // Boolean: suppress dropdown for the next query change only

const pendingQueryDebounce = ref(false)

watch(query, () => {
  pendingQueryDebounce.value = true;
})

watchDebounced(query, async () => {
  await nextTick()
  // Show dropdown on query change, unless query is empty or suppressed due to selection (for type='text')
  let skipDropdown = false
  if (suppressShowDropdownNext && props.type === 'text') {
    skipDropdown = true
    suppressShowDropdownNext = false // Only suppress for one cycle
  }
  if (query.value !== '' && !skipDropdown) {
    showDropdown.value = true
  }
  if (!suppressCompleteDueToSelection && !suppressCompleteDueToLabelUpdate) {
    emit('complete', query.value)
  }
  suppressCompleteDueToSelection = false;
  suppressCompleteDueToLabelUpdate = false;
  pendingQueryDebounce.value = false;
}, { debounce: props.debounceComplete })

onMounted(() => { if (props.autofocus) inputField.value.focus() })

onKeyStroke('Escape', (e: KeyboardEvent) => {
  e.preventDefault()
  if (!showDropdown.value) inputField.value.blur()
  showDropdown.value = false
})

onClickOutside(root, () => showDropdown.value = false)

onKeyStroke('/', (e: KeyboardEvent) => {
  if (!props.focusOnKeyPress) return
  if (!e.target) return
  const tagName = (e.target as HTMLElement).tagName.toLowerCase()
  if (["textarea", "input", "select"].includes(tagName)) return
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
  const isViewable = (childRect.top >= parentRect.top) && (childRect.bottom <= parentRect.top + parent.clientHeight)
  if (!isViewable) {
    const scrollTop = childRect.top - parentRect.top
    const scrollBot = childRect.bottom - parentRect.bottom
    parent.scrollTop += Math.abs(scrollTop) < Math.abs(scrollBot) ? scrollTop : scrollBot
  }
}

const clearQuery = () => {
  suppressCompleteDueToSelection = true
  // For multiselect: first click clears query, second click clears selections
  // For single-select: one click clears everything
  if (inputDisplayValue.value !== '') {
    query.value = ''
    inputField.value.value = ''
    // In multiselect mode, only clear query on first click (keep selections)
    if (props.multiple && (props.type === 'select' || props.type === 'taggable-select')) {
      isReadonly.value = props.readonly || false
      showDropdown.value = false
      inputField.value.focus()
      return
    }
  }
  // Clear selections for select/taggable-select types (and text type when input is empty)
  // This handles the second click in multiselect mode or any click when input is already empty
  if (props.type === 'select' || props.type === 'taggable-select' || props.type === 'text') {
    selected.value = []
  }
  isReadonly.value = props.readonly || false
  showDropdown.value = false
  inputField.value.focus()
}

const shake = () => {
  inputField.value.classList.add('animate-shake')
  setTimeout(() => inputField.value.classList.remove('animate-shake'), 500)
}

// Find the original suggestion from props.suggestions, returning the exact value (string or object)
const findOriginalSuggestion = (val: string): ComboBoxSuggestion | undefined => {
  if (!props.suggestions) return undefined
  return props.suggestions.find((s: ComboBoxSuggestion) => {
    if (typeof s === 'object') {
      return (props.optionLabel ? s[props.optionLabel as string] : s[defaultOptionLabel.value]) === val
    }
    return s === val
  })
}

// Utility: Get label from suggestion (object or string)
const getLabel = (item: ComboBoxSuggestion) => {
  if (typeof item === 'object' && item !== null) {
    return String(props.optionLabel ? item[props.optionLabel as string] : item[defaultOptionLabel.value] ?? '')
  }
  return String(item)
}

// Utility: Remove __cbxIdx from object
const stripIdx = (obj: ComboBoxSuggestion) => {
  if (typeof obj === 'object' && obj !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [CBX_IDX]: _cbxIdx, ...rest } = obj as Record<string, unknown>
    return { ...rest }
  }
  return obj
}

// Add or remove selection based on query
const multiselectAdd = async () => {
  if (!query.value) return
  let suggestion = findOriginalSuggestion(query.value)
  if (!suggestion && query.value !== '') {
    suggestion = props.type === 'text' ? query.value : {
      [props.optionLabel ? props.optionLabel as string : defaultOptionLabel.value]: query.value
    }
  }
  const normalizedObj = stripIdx(suggestion ?? {})
  const idx = selected.value.findIndex(s => getLabel(s) === query.value)
  if (idx !== -1) {
    selected.value.splice(idx, 1)
    shake()
    return
  }
  selected.value.push(normalizedObj as ComboBoxSuggestion)
  inputField.value.focus()
  // Handle dropdown and query update for single select/text
  if ((!props.multiple && (props.type === 'select' || props.type === 'taggable-select')) || props.type === 'text') {
    showDropdown.value = false
    const normalizedLabel = getLabel(normalizedObj)
    if (props.type === 'text' && query.value !== normalizedLabel) {
      suppressShowDropdownNext = true
    }
    suppressCompleteDueToLabelUpdate = true
    query.value = normalizedLabel
  }
  await nextTick()
  arrowCounter.value = -1
}

const multiselectRemove = (index: number) => {
  if (!selected.value.length) return
  if (index < 0) {
    // Remove last item
    selected.value.splice(selected.value.length - 1, 1)
  } else if (index >= 0 && index < selected.value.length) {
    selected.value.splice(index, 1)
  }
  // Reset input and state if no items left
  if (selected.value.length === 0) {
    query.value = ''
    if (inputField.value) inputField.value.value = ''
    isReadonly.value = props.readonly || false
  }
  // Always update input field focus
  if (inputField.value) inputField.value.focus()
}

const handleDelete = () => {
  if (selected.value.length && props.type === 'text') (selected.value as ComboBoxSuggestion[]).pop()
  // For single-select (select/taggable-select), pressing Delete clears the entire selection
  if (selected.value.length && !props.multiple && (props.type === 'select' || props.type === 'taggable-select')) {
    multiselectRemove(-1)
    query.value = ''
    if (inputField.value) inputField.value.value = ''
    isReadonly.value = props.readonly || false
    return
  }
  if (selected.value.length && inputField.value.value === '') multiselectRemove(-1)
}

const getCurrentSuggestion = (): ComboBoxSuggestion | null | undefined => {
  // If "Add" option is focused and is the only option, return custom sentinel
  if (
    props.type === 'taggable-select' &&
    props.multiple &&
    shouldShowNewSuggestion.value &&
    arrowCounter.value === 0 &&
    (!suggestionOptions.value || suggestionOptions.value.length === 0)
  ) {

    return {
      label: query.value,
      name: query.value,
      value: query.value,
      __cbxIdx: 'add'
    };
  }
  // If "Select all" is focused, return sentinel value (only if rendered)
  if ((props.type === 'taggable-select' || props.type === 'select') && props.multiple && arrowCounter.value === 0 && allCount.value > 1) {
    return null;
  }
  // If "Add" option is focused, return custom sentinel
  if (
    props.type === 'taggable-select' &&
    shouldShowNewSuggestion.value &&
    arrowCounter.value === lastDropdownItemIndex()
  ) {

    return {
      label: query.value,
      name: query.value,
      value: query.value,
      __cbxIdx: 'add'
    };
  }
  let option: ComboBoxSuggestion | undefined = undefined;
  const opts = suggestionOptions.value as ComboBoxSuggestion[] | undefined;
  if (!opts) return undefined;
  const startIdx = ((props.type === 'taggable-select' || props.type === 'select') && props.multiple && allCount.value > 1) ? 1 : 0;
  let idx = startIdx;
  opts.forEach((i: ComboBoxSuggestion) => {
    if (typeof i !== 'string') {
      if (props.optionGroupChildren && i[props.optionGroupChildren]) {
        const tmp = (i[props.optionGroupChildren] as ComboBoxSuggestion[]).find((x: ComboBoxSuggestion) => {
          return typeof x !== 'string' && arrowCounter.value === idx++
        })
        if (tmp) option = tmp
      } else {
        if (arrowCounter.value === idx) option = i;
        idx++;
      }
    }
  });
  return option;
}

// Helper to check if a value is selected (works for both string and object)
const isSelected = (val: string) => {
  return selected.value.some((s: ComboBoxSuggestion) => {
    if (typeof s === 'object') {
      return (props.optionLabel ? s[props.optionLabel as string] : s[defaultOptionLabel.value]) === val
    }
    return s === val
  })
}

const activeElement = useActiveElement()
const isFocused = computed(() => activeElement.value === inputField.value)

// Watcher to force open the dropdown for one tick when requested
watch(forceShowDropdown, (val) => {
  if (val) {
    showDropdown.value = true
    forceShowDropdown.value = false
  }
})

const emitEnter = () => {
  if (props.type === 'text') emit('enter', query.value)
  else emit('enter', selected.value.length ? selected.value : query.value)
  // Reset suppression so 'complete' can fire on next query change
  suppressCompleteDueToSelection = false
  suppressCompleteDueToLabelUpdate = false
}

// Show clear button based on inputDisplayValue, not query
watch([query, inputDisplayValue, () => selected.value.length, () => props.multiple, () => props.disabled, () => props.type], () => {
  const htmlRegex = /<[^>]*(>|$)/
  if (htmlRegex.test(query.value)) query.value = removeHtmlFromString(query.value)
})

// Input handler for the input field (replaces v-model)
const onInputFieldInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  // If user starts typing with an existing single selection in select/taggable-select mode,
  // clear the selection and allow them to type a new value
  if (!props.multiple && (props.type === 'select' || props.type === 'taggable-select') && selected.value.length > 0) {
    selected.value = []
    isReadonly.value = props.readonly || false
    // Clear the input value so typing starts fresh (not concatenated to the selected value)
    target.value = target.value.slice(-1) // Keep only the last typed character
    query.value = target.value
    handleInput()
    return
  }
  query.value = target.value
  handleInput()
}

const handleInput = async () => {
  // If user input occurs, always reset dropdown suppression
  suppressShowDropdownNext = false
  await nextTick()
  if (showDropdown.value) arrowCounter.value = -1
}

const commitSelection = () => {
  selected.value = selected.value.length ? selected.value : [query.value]
  showDropdown.value = false
  emitEnter()
}

const handleSuggestionClick = async (option: ComboBoxSuggestion) => {
  // Find the original suggestion from props.suggestions, if it exists
  let normalizedOption: ComboBoxSuggestion = option
  let original: ComboBoxSuggestion | undefined = undefined
  if (typeof option === 'object' && option !== null) {
    const val = props.optionLabel ? option[props.optionLabel as string] : option[defaultOptionLabel.value]
    original = findOriginalSuggestion(val as string)
    if (typeof original === 'string') {
      normalizedOption = original
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [CBX_IDX]: _cbxIdx, ...rest } = option as Record<string, unknown>
      normalizedOption = { ...rest }
    }
  } else {
    // If it's a string, try to find the original string suggestion
    original = findOriginalSuggestion(option as string)
  }
  // For type="text", update the query to the suggestion's label
  if (props.type === 'text') {
    suppressCompleteDueToLabelUpdate = true;
    suppressShowDropdownNext = true;
    let label = '';
    if (typeof normalizedOption === 'object' && normalizedOption !== null) {
      label = String(props.optionLabel ? normalizedOption[props.optionLabel as string] : normalizedOption[defaultOptionLabel.value] ?? '');
    } else if (typeof normalizedOption === 'string') {
      label = normalizedOption;
    }
    query.value = label;
  }
  // Check for duplicate
  const idx = selected.value.findIndex((s: ComboBoxSuggestion) => {
    if (typeof s === 'object' && typeof normalizedOption === 'object') {
      return (props.optionLabel ? s[props.optionLabel as string] : s[defaultOptionLabel.value]) === (props.optionLabel ? normalizedOption[props.optionLabel as string] : normalizedOption[defaultOptionLabel.value])
    }
    return s === normalizedOption
  })
  if (idx !== -1) {
    (selected.value as ComboBoxSuggestion[]).splice(idx, 1)
  } else {
    // Replace selection for single select, otherwise add to selection
    if (!props.multiple && (props.type === 'select' || props.type === 'taggable-select'))
      selected.value.splice(0, selected.value.length, normalizedOption)
    else
      (selected.value as ComboBoxSuggestion[]).push(normalizedOption)
  }
  // Always emit the original value from props.suggestions (object or string) for this click
  let emitValue = original !== undefined ? original : option
  // Strip __cbxIdx if present
  if (typeof emitValue === 'object' && emitValue !== null && '__cbxIdx' in emitValue) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __cbxIdx, ...rest } = emitValue as Record<string, unknown>
    emitValue = rest
  }
  await nextTick()
  emit('result', emitValue)
  // Close dropdown
  showDropdown.value = false
  suppressCompleteDueToSelection = true
  if (props.type !== 'text') {
    query.value = ''
  }
  inputField.value.focus()
}

const handleEnterKeyUp = async (event: KeyboardEvent | MouseEvent) => {
  if (props.disabled) return
  // Prevent adding to selected if type is 'select' and there are no suggestions
  if (
    props.type === 'select' &&
    inputDisplayValue.value !== '' &&
    !getCurrentSuggestion()
  ) {
    if (arrowCounter.value === 0) {
      toggleSelectAll();
    } else {
      shake()
    }
    return
  }
  // Prevent adding to selected if type is 'taggable-select' and dropdown is not open
  if (
    props.type === 'taggable-select' &&
    !showDropdown.value
  ) {
    if (selected.value.length > 0) {
      emitEnter()
    } else {
      shake()
    }
    return
  }
  if (props.type !== 'text' && arrowCounter.value === -1 && inputDisplayValue.value !== '') {
    shake()
    return
  }
  firstTickQuery.value = query.value
  let suggestionObj = getCurrentSuggestion()
  // If "Select all" is focused, trigger select all
  if (suggestionObj === null) {
    toggleSelectAll();
    return;
  }
  // If "Add" option is focused, handle custom add
  if (
    suggestionObj && typeof suggestionObj === 'object' && suggestionObj.__cbxIdx === 'add'
  ) {
    await handleSuggestionClick(suggestionObj)
    return
  }
  if (!suggestionObj && query.value) {
    suggestionObj = findOriginalSuggestion(query.value) || {
      [props.optionLabel ? props.optionLabel : defaultOptionLabel.value]: query.value
    }
  }
  let emitValue: ComboBoxSuggestion | undefined = undefined
  if (suggestionObj && typeof suggestionObj === 'object') {
    const obj = suggestionObj as ComboBoxSuggestionObject
    if (props.type === 'text' && query.value !== (props.optionLabel ? obj[props.optionLabel] : obj[defaultOptionLabel.value])) {
      suppressShowDropdownNext = true // Only suppress if query is actually changing
    }
    suppressCompleteDueToLabelUpdate = true
    query.value = (props.optionLabel ? obj[props.optionLabel] : obj[defaultOptionLabel.value]) as string
    // Try to find the original suggestion (object or string)
    const val = props.optionLabel ? obj[props.optionLabel] : obj[defaultOptionLabel.value]
    const original = findOriginalSuggestion(val as string)
    emitValue = original !== undefined ? original : obj
  } else if (suggestionObj && typeof suggestionObj === 'string') {
    const original = findOriginalSuggestion(suggestionObj)
    if (props.type === 'text' && query.value !== suggestionObj) {
      suppressShowDropdownNext = true // Only suppress if query is actually changing
    }
    suppressCompleteDueToLabelUpdate = true
    query.value = suggestionObj
    emitValue = original !== undefined ? original : suggestionObj
  } else if (props.type === 'text') {
    emitValue = query.value
  }
  // Strip __cbxIdx if present
  if (typeof emitValue === 'object' && emitValue !== null && '__cbxIdx' in emitValue) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __cbxIdx, ...rest } = emitValue as Record<string, unknown>
    emitValue = rest
  }
  await nextTick()
  // Always emit the original value from props.suggestions (object or string), unless nothing is selected
  if (!(arrowCounter.value === -1 && event instanceof KeyboardEvent)) {
    await nextTick()
    if (emitValue !== undefined) {
      emit('result', emitValue)
    }
  }
  // Close dropdown
  showDropdown.value = false
  switch (props.type) {
    case 'text': {
      if (arrowCounter.value === -1) {
        commitSelection()
      } else {
        multiselectRemove(0)
        multiselectAdd()
      }
      firstTickQuery.value = ''
      break
    }
    case 'select':
    case 'taggable-select': {
      const alreadySelectedIdx = selected.value.findIndex((s: ComboBoxSuggestion) => {
        if (typeof s === 'object') {
          return (props.optionLabel ? s[props.optionLabel as string] : s[defaultOptionLabel.value]) === query.value
        }
        return false
      })
      if (alreadySelectedIdx !== -1) {
        multiselectRemove(alreadySelectedIdx)
      } else {
        multiselectAdd()
      }
      if (!props.multiple) {
        if (selected.value.length === 1 && query.value === '' && !firstTickQuery.value.length) commitSelection()
        if ((firstTickQuery.value.length && !query.value.length) || !query.value.length) shake()
      } else {
        if (selected.value.length && query.value === '' && !firstTickQuery.value.length) commitSelection()
        if ((firstTickQuery.value.length && !query.value.length) || (!query.value.length && selected.value.length === 0)) shake()
      }
      firstTickQuery.value = ''
      // Suppress 'complete' emission when clearing query due to selection
      suppressCompleteDueToSelection = true
      query.value = ''
      break
    }
  }
}

const shouldShowNewSuggestion = computed(() => {
  return query.value !== '' && props.type === 'taggable-select' && !matchesSuggestion.value
})

const lastDropdownItemIndex = () => {
  // Start with 0
  let count = 0;
  // If "Select all" is present (multiple), add 1
  if ((props.type === 'taggable-select' || props.type === 'select') && props.multiple && allCount.value > 1) {
    count += 1;
  }
  // Add number of visible suggestions
  const options = suggestionOptions.value;
  count += countVisibleOptions(options);
  // If "Add <custom_query>" is present, add 1
  if (shouldShowNewSuggestion.value) {
    count += 1;
  }
  // Return last index (zero-based)
  return count - 1;
}

const hasCategories = computed(() => {
  /* This function should check if the suggestions have categories (tabs).
   * It should also check if the categories contain any suggestions after filtering
   * and will only return true if there are at least 2 categories with suggestions. */
  if (!groups.value?.length || isFlatArray.value || props.disableGroupTabs) return false
  return allCount.value > 1
})

// Helper to deeply count all visible options in the current suggestionOptions
function countVisibleOptions(options: ComboBoxSuggestion[] | undefined): number {
  if (!options || !Array.isArray(options)) return 0;
  let count = 0;
  for (const opt of options) {
    if (typeof opt === 'object' && props.optionGroupChildren && Array.isArray(opt[props.optionGroupChildren])) {
      count += countVisibleOptions(opt[props.optionGroupChildren] as ComboBoxSuggestion[]);
    } else {
      count++;
    }
  }
  return count;
}

// Computed property to check if the dropdown will have suggestions listed
const hasDropdownSuggestion = computed(() => {
  // Use the currently active suggestionOptions (grouped or all)
  const options = suggestionOptions.value;
  const visibleCount = countVisibleOptions(options);

  // For type="select" (any multiple), only show dropdown if there is at least one visible option
  if (props.type === 'select') {
    return visibleCount > 0;
  }

  // For taggable-select, always show dropdown if query is non-empty and not a match
  if (props.type === 'taggable-select') {
    if (shouldShowNewSuggestion.value) {
      return true;
    }
    return visibleCount > 0;
  }

  // For all other cases, only show dropdown if there are visible options
  return visibleCount > 0;
})

const handleArrows = async (direction: 'up' | 'down' | 'left' | 'right' | 'tabsUp' | 'tabsDown', event: KeyboardEvent) => {
  const activeTab = (root.value.querySelector('button.tab[data-active="true"]') as HTMLElement) || null
  if (direction === 'tabsUp' || direction === 'tabsDown') {
    if (direction === 'tabsUp') {
      event.preventDefault()
      // focus input field
      inputField.value.focus()
      return
    }
    if (direction === 'tabsDown') {
      event.preventDefault()
      // focus first suggestion
      inputField.value.focus()
      /* Increment arrowCounter +1 to step over the "Select all" option.
       * It won't be visible when only one option is available and props.multiple === true */
      if (hasCategories.value && countVisibleOptions(suggestionOptions.value) === 1 && props.multiple)
        arrowCounter.value++
      arrowCounter.value++
      return
    }
  }

  if (direction === 'up' || direction === 'down') {
    // Show dropdown if not already shown and there are suggestions
    if (!showDropdown.value && hasDropdownSuggestion.value) {
      if (!inputField.value.readOnly) {
        event.preventDefault()
        showDropdown.value = true
        // Focus the "All" tab when dropdown is shown
        if (hasCategories.value) {
          activeTab?.focus()
        }
      }
      arrowCounter.value = -1
      activeTab?.blur()
      activeGroupKey.value = -2
      return
    }
  }

  switch (direction) {
    case 'down': {
      if (hasCategories.value) { // Has categories?
        if (arrowCounter.value === -1) { // Input should be focused
          if (document.activeElement !== activeTab) { // "All" tab is not focused?
            arrowCounter.value = -1
            activeTab?.focus()
            return
          }
        }
      }

      const lastIdx = lastDropdownItemIndex()
      if (arrowCounter.value < lastIdx) {
        arrowCounter.value++
      } else {
        arrowCounter.value = -1
      }
      break
    }
    case 'up': {
      if (hasCategories.value) { // Has categories?
        if (arrowCounter.value === 0) { // First suggestion is focused
          if (document.activeElement !== activeTab) { // "All" tab is not focused?
            arrowCounter.value = -1
            activeTab?.focus()
            return
          }
        }
      }

      const lastIdx = lastDropdownItemIndex()
      if (arrowCounter.value > -1) {
        if (arrowCounter.value === 1 && hasCategories.value && countVisibleOptions(suggestionOptions.value) === 1) {
          arrowCounter.value--
          activeTab?.focus()
        }
        arrowCounter.value--
      } else {
        arrowCounter.value = lastIdx
      }
      break
    }
    // Allow left/right arrow navigation only if categories are shown and input is not focused
    case 'left':
      if (arrowCounter.value > -1) {
        if (activeGroupKey.value === -1) {
          activeGroupKey.value = comboBoxTabs.value ? comboBoxTabs.value.length - 2 : -1
        } else {
          activeGroupKey.value--
        }
        await nextTick()
        const newActiveTab = root.value.querySelector('button.tab[data-active="true"]')
        newActiveTab?.focus()
        newActiveTab?.scrollIntoView()
        arrowCounter.value = -1
      }
      break
    case 'right':
      if (arrowCounter.value > -1) {
        if (activeGroupKey.value === comboBoxTabs.value.length - 2) {
          activeGroupKey.value = -1
        } else {
          activeGroupKey.value++
        }
        await nextTick()
        const newActiveTab = root.value.querySelector('button.tab[data-active="true"]')
        newActiveTab?.focus()
        newActiveTab?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
        arrowCounter.value = -1
      }
      break
  }
}

// Watch arrowCounter and scroll to the active suggestion when it changes
watch(arrowCounter, (val, oldVal) => {
  if (val !== oldVal && showDropdown.value) {
    scrollToChild()
  }
})

watchEffect(() => {
  allSuggestions.value = props.suggestions?.map((i: ComboBoxSuggestion) => {
    if (typeof i !== 'object') {
      i = { [props.optionLabel ? props.optionLabel : defaultOptionLabel.value]: i }
    }
    return i
  })
  allSuggestionOptions.value = props.filterSuggestions && allSuggestions.value ?
    reduceList(allSuggestions.value) :
    allSuggestions.value && addIndexToList(allSuggestions.value)
  let count = 0
  allSuggestionOptions.value?.forEach((i: ComboBoxSuggestion) => {
    if (typeof i !== 'string' && props.optionGroupChildren && i[props.optionGroupChildren]) {
      count += (i[props.optionGroupChildren] as ComboBoxSuggestion[]).length
    } else {
      count += 1
    }
  })
  allCount.value = count
  let key = -1
  groups.value = allSuggestionOptions.value ? [
    { index: -1, key, label: 'All', count: allCount.value },
    ...allSuggestionOptions.value.map((i: ComboBoxSuggestion, index: number) => {
      const count = typeof i !== 'string' && props.optionGroupChildren && (i[props.optionGroupChildren] as ComboBoxSuggestion[]).length || 0
      if (count > 0) key = key + 1
      return {
        index,
        key,
        label: typeof i !== 'string' && i[props.optionGroupLabel ? props.optionGroupLabel : defaultOptionLabel.value],
        count
      }
    }).filter((i: { index: number, key: number, label: string, count: number }) => typeof i !== 'string' && i && props.hideEmptyGroups ? i.count > 0 : true)
  ] : []
  activeGroup.value = groups.value?.find((i: ComboBoxSuggestion) => typeof i !== 'string' && i?.key === activeGroupKey.value)
  groupSuggestions.value = props.suggestions?.filter(i => typeof i !== 'string' && props.optionGroupChildren &&
    i[props.optionGroupLabel ? props.optionGroupLabel : defaultOptionLabel.value] === activeGroup.value?.label)
  groupSuggestionOptions.value = props.filterSuggestions && groupSuggestions.value ?
    reduceList(groupSuggestions.value) :
    groupSuggestions.value && addIndexToList(groupSuggestions.value)
  suggestionOptions.value = activeGroupKey.value === -1 ? allSuggestionOptions.value : groupSuggestionOptions.value
})

const shouldShowDropdown = computed(() => {
  if (props.disabled) return false
  if (props.pending) return false
  if (pendingQueryDebounce.value) return false
  if (!showDropdown.value) return false
  if (!hasDropdownSuggestion.value) return false
  if (props.type !== 'text' && selected.value.length === 1 && !props.multiple && !props.clickToSelect) return false
  return true
})

watch(shouldShowDropdown, async () => {
  await nextTick()
  arrowCounter.value = -1
  activeGroupKey.value = -1
})

watch(activeGroupKey, () => {
  arrowCounter.value = -1
})
</script>
