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
        v-if="((type === 'taggable-select' || type === 'select') && multiple) && selected.length"
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
            v-if="!loading"
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            :class="{
              'w-4 h-3.5': size === 'sm',
              'w-4 h-4': size !== 'sm',
            }"
          >
            <path
              fill="currentColor"
              d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"
            />
          </svg>
          <SdsLoadingSpinner
            v-else
            size="sm"
          />
        </button>
        <span
          v-if="!multiple && (type === 'select' || type === 'taggable-select') && selected.length"
          class="input-group-addon"
        >{{ selected[0] }}</span>
        <input
          :id="id"
          ref="inputField"
          v-model.trim="query"
          type="text"
          :multiple="multiple"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          autocorrect="off"
          class="form-control border-none"
          :class="{
            'opacity-0': !multiple && (type === 'select' || type === 'taggable-select') && selected.length
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
          v-if="focusOnKeyPress && !hideFocusHelperText && !isFocused"
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
      v-if="
        showDropdown &&
        (type !== 'taggable-select' ? allCount : true)
      "
      class="absolute z-50 w-full p-0 mt-1 bg-white border rounded-theme-sm shadow-lg dark:border-gray-700 dark:bg-gray-850"
    >
      <div
        v-if="groups?.length && !disableGroupTabs && !isFlatArray"
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
          @click="(e) => setActiveGroup(e, group)"
        >
          <span>{{ group.label }}</span>
          <span
            class="my-auto text-xs rounded-xl py-0.25 px-1.5"
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
          'py-2 flex flex-col gap-y-1': optionType !== 'custom'
        }"
      >
        <template
          v-for="s, sindex in suggestionOptions"
          :key="`${s}_${sindex}`"
        >
          <!-- Show <query> (new) for taggable-select when no suggestions match -->
          <template
            v-if="
              query?.length && sindex === 0 && type === 'taggable-select' && !matchesSuggestion
            "
          >
            <div
              ref="dropdownOption"
              class="flex flex-row w-full sds-theme-forge:mx-2 sds-theme-plaid:px-4 p-2 sds-theme-forge:max-w-[calc(100%-1rem)] sds-theme-forge:rounded text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-25 dark:hover:bg-gray-750"
              :class="{
                'text-gray-700 dark:text-gray-300': arrowCounter !== 0,
                'text-black dark:text-white bg-gray-50 dark:bg-gray-800': selected.includes(query) && arrowCounter !== 0,
                'text-black dark:text-white bg-gray-25 dark:bg-gray-750': arrowCounter === 0,
              }"
              :data-active="arrowCounter === 0"
              type="button"
              tabindex="-1"
              @click="handleSuggestionClick({
                label: query,
                name: query,
                value: query,
                index: 0
              })"
            >
              <!-- @slot Option content. Good for customizing the content for each option -->
              <slot
                name="option"
                :option="{
                  label: query,
                  name: query,
                  value: query,
                  index: 0
                }"
                :label="query"
              >
                {{ query }} (new)
              </slot>
              <svg
                v-if="selected.includes(query)"
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="9"
                viewBox="0 0 11 9"
                fill="none"
                class="text-blue-700 dark:text-blue-400 ml-auto my-auto"
              >
                <path d="M10.5156 0.984375C10.8203 1.26562 10.8203 1.75781 10.5156 2.03906L4.51562 8.03906C4.23438 8.34375 3.74219 8.34375 3.46094 8.03906L0.460938 5.03906C0.15625 4.75781 0.15625 4.26562 0.460938 3.98438C0.742188 3.67969 1.23438 3.67969 1.51562 3.98438L3.97656 6.44531L9.46094 0.984375C9.74219 0.679688 10.2344 0.679688 10.5156 0.984375Z" fill="currentColor" />
              </svg>
            </div>
          </template>
          <div
            v-if="optionGroupChildren && s[optionGroupChildren]?.length"
            class="flex flex-col gap-y-1 border-b border-gray-100 dark:border-gray-700 pb-2 -mb-2"
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
              <component
                :is="optionType"
                v-if="optionType !== 'custom'"
                ref="dropdownOption"
                :href="optionType === 'a' ? c.href : undefined"
                class="flex flex-row w-full sds-theme-forge:mx-2 sds-theme-plaid:px-4 p-2 sds-theme-forge:max-w-[calc(100%-1rem)] sds-theme-forge:rounded text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-25 dark:hover:bg-gray-750"
                :class="{
                  'text-gray-700 dark:text-gray-300': c.index !== arrowCounter,
                  'text-black dark:text-white bg-gray-50 dark:bg-gray-800': selected.includes(optionLabel ? c[optionLabel] : c[defaultOptionLabel]) && c.index !== arrowCounter && type !== 'text',
                  'text-black dark:text-white bg-gray-25 dark:bg-gray-750': c.index === arrowCounter,
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
                  v-if="selected.includes(optionLabel ? c[optionLabel] : c[defaultOptionLabel]) && type !== 'text'"
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
          <template v-else-if="!optionGroupChildren">
            <component
              :is="optionType"
              v-if="optionType !== 'custom'"
              ref="dropdownOption"
              :href="optionType === 'a' ? s.href : undefined"
              class="flex w-full sds-theme-forge:mx-2 sds-theme-plaid:px-4 p-2 sds-theme-forge:max-w-[calc(100%-1rem)] sds-theme-forge:rounded text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-25 dark:hover:bg-gray-750"
              :class="{
                'text-gray-700 dark:text-gray-300': s.index !== arrowCounter,
                'text-black dark:text-white bg-gray-50 dark:bg-gray-800': selected.includes(optionLabel ? s[optionLabel] : s[defaultOptionLabel]) && s.index !== arrowCounter && type !== 'text',
                'text-black dark:text-white bg-gray-25 dark:bg-gray-750': s.index === arrowCounter,
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
              <svg
                v-if="selected.includes(optionLabel ? s[optionLabel] : s[defaultOptionLabel]) && type !== 'text'"
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
            <div
              v-else
              ref="dropdownOption"
              class="first:mt-2 last:mb-2"
            >
              <slot
                name="customOption"
                :class-list="{
                  'flex w-full sds-theme-forge:mx-2 sds-theme-plaid:px-4 p-2 sds-theme-forge:max-w-[calc(100%-1rem)] sds-theme-forge:rounded text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800': true,
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
          v-if="!isFlatArray && groups.length > 1"
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
   * The loading prop allows the user to show a loading spinner in the input.
   * This is useful when fetching suggestions from an API.
   */
  loading: { type: Boolean, default: false },
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

const groups = ref()
const activeGroup = ref()
const activeGroupKey = ref(-1)

const allSuggestions = ref()
const allSuggestionOptions = ref()
const allCount = ref(0)
const groupSuggestions = ref()
const groupSuggestionOptions = ref()
const suggestionOptions = ref()

const showClearButton = ref(false)

const reduceList = (arr: ComboBoxSuggestion[]) => {
  if (!Array.isArray(arr)) return []
  const cleanArray = arr.reduce((acc: ComboBoxSuggestion[], item: ComboBoxSuggestion) => {
    if (typeof item !== 'string') {
      const newItem = Object.assign({}, item)
      if (props.optionGroupChildren && item[props.optionGroupChildren]) {
        newItem[props.optionGroupChildren] = reduceList(item[props.optionGroupChildren] as ComboBoxSuggestion[])
        // If "hideEmptyGroups" is configured, don't add empty groups to the reduced list
        if (props.hideEmptyGroups) {
          if ((newItem[props.optionGroupChildren] as ComboBoxSuggestion[]).length)
            acc.push(newItem)
        } else {
          // Otherwise, just add the disabled group label to the tab button
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

const flatSuggestions = computed(() => {
  // Flatten suggestions into a single array of strings
  const suggestions = props.suggestions?.flatMap((s) => {
    if (s && props.optionGroupChildren && typeof s === 'object')
      return s[props.optionGroupChildren] as string
    else if (typeof s === 'string')
      return s
  }).map((s) => {
    if (s && typeof s === 'object')
      return s[props.optionLabel ? props.optionLabel : defaultOptionLabel.value] as string
    else if (typeof s === 'string')
      return s
  }).filter((s) => typeof s === 'string')
  return suggestions
})

const addIndexToList = (arr: ComboBoxSuggestion[]) => {
  if (!Array.isArray(arr)) return []
  /* Get flat array of suggestions to determine index for dropdown navigation.
   * Skip index 0 if we have taggable-select and the query is not in the suggestions */
  const suggestions = flatSuggestions.value
  let index = (query.value?.length && props.type === 'taggable-select' && !suggestions?.includes(query.value)) ? 1 : 0
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

const isFlatArray = computed(() => {
  // If there are no suggestions, return true (hide group tabs)
  if (!groups.value.length) return true
  /* For flat groups, 'All' tab with have a count, but
   * all others will have a count of 0 */
  let count = 0
  for (const suggestion of groups.value) {
    if (suggestion.count > 0) {
      count++
    }
  }
  /* If there was more than one group with a count,
   * then this is not a flat array */
  if (count > 1) {
    return false
  }
  // Otherwise, this is a flat array of suggestions
  return true
})

/* Check if the current query matches any suggestion */
const matchesSuggestion = computed(() => {
  const suggestions = flatSuggestions.value
  return suggestions?.includes(query.value)
})

const updateSuggestions = () => {
  // Convert suggestions to an array of objects if they are not already
  allSuggestions.value = props.suggestions?.map((i: ComboBoxSuggestion) => {
    if (typeof i !== 'object') {
      i = {
        [props.optionLabel ? props.optionLabel : defaultOptionLabel.value]: i
      }
    }
    return i
  })
  // Reduce the list of suggestions based on the query
  allSuggestionOptions.value = props.filterSuggestions && allSuggestions.value ?
    reduceList(allSuggestions.value) :
    allSuggestions.value && addIndexToList(allSuggestions.value)

  // Configure counts for all suggestion groups
  let count = 0
  allSuggestionOptions.value?.forEach((i: ComboBoxSuggestion) => {
    if (typeof i !== 'string' && props.optionGroupChildren && i[props.optionGroupChildren]) {
      count = count + (i[props.optionGroupChildren] as ComboBoxSuggestion[]).length
    } else {
      count = count + 1
    }
  })
  allCount.value = count

  let key = -1
  groups.value = allSuggestionOptions.value ? [
    { index: -1, key, label: 'All', count: allCount.value },
    ...allSuggestionOptions.value.map((i: ComboBoxSuggestion, index: number) => {
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
    }).filter((i: { index: number, key: number, label: string, count: number }) => typeof i !== 'string' && i && props.hideEmptyGroups ? i.count > 0 : true)
  ] : []

  activeGroup.value = groups.value?.find((i: ComboBoxSuggestion) => {
    return typeof i !== 'string' && i?.key === activeGroupKey.value
  })

  // Group Suggestions
  groupSuggestions.value = props.suggestions?.filter(i => {
    return typeof i !== 'string' && props.optionGroupChildren &&
      i[props.optionGroupLabel ?
        props.optionGroupLabel :
        defaultOptionLabel.value] === activeGroup.value?.label
  })

  groupSuggestionOptions.value = props.filterSuggestions && groupSuggestions.value ?
    reduceList(groupSuggestions.value) :
    groupSuggestions.value && addIndexToList(groupSuggestions.value)

  // Combined Suggestion Options
  suggestionOptions.value = activeGroupKey.value === -1 ?
    allSuggestionOptions.value :
    groupSuggestionOptions.value
}

watch(query, (value: string) => {
  /* Always remove HTML from query value if found */
  const htmlRegex = /<[^>]*(>|$)/
  if (htmlRegex.test(value))
    query.value = removeHtmlFromString(value)

  updateSuggestions()

  /* Show "X" button to clear current selection
   * Follow inputField.value to check on keypress */
  const inputLength = inputField.value ? inputField.value.value.length : 0
  /* Only show clear button if input is set */
  showClearButton.value = inputLength > 0
})

watch(() => props.suggestions, () => {
  updateSuggestions() // Show dropdown and update suggestions
})

watchDebounced(query, async () => {
  await nextTick()
  // Only emit complete event if the query is not already selected
  if (!selected.value.includes(query.value) && query.value !== '') {
    emitComplete()
  }

  // Show the clear query button depending on the query value and type
  if (
    (props.multiple === false && (props.type === 'select' || props.type === 'taggable-select'))
    || props.type === 'text'
  ) {
    if (query.value === '' && !selected.value.length)
      showClearButton.value = false // Hide the clear button
  } else {
    if (query.value === '')
      showClearButton.value = false // Hide the clear button
  }
}, { debounce: props.debounceComplete })

watch(showDropdown, () => {
  // Move focus out of dropdown when it is closed
  arrowCounter.value = -1
  activeGroupKey.value = -1
})

const setActiveGroup = (e: MouseEvent | KeyboardEvent, group: { key: number }) => {
  e.preventDefault()
  inputField.value.focus()
  activeGroupKey.value = group.key
  updateSuggestions()
}

onMounted(() => {
  updateSuggestions()
  if (props.autofocus) inputField.value.focus();
})

onKeyStroke('Escape', (e: KeyboardEvent) => {
  e.preventDefault()
  if (!showDropdown.value)
    inputField.value.blur() // Blur the input field
  showDropdown.value = false
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
  if (!props.multiple && (props.type === 'select'|| props.type === 'taggable-select'))
    selected.value = []
  isReadonly.value = false
  showClearButton.value = false
  inputField.value.focus() // Refocus the input field
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

    /* Single-select, hide the dropdown */
    if ((!props.multiple && (props.type === 'select' || props.type === 'taggable-select')) || props.type === 'text') {
      showDropdown.value = false // Hide the dropdown
      query.value = selected.value[0] as string
      if (selected.value ? (selected.value.length && props.type !== 'text') : false)
        isReadonly.value = true // Set readonly to true if not multiple and type is select
    }

    /* Run nextTick to update DOM and hide the clear button */
    await nextTick()

    /* Move focus out of the dropdown */
    arrowCounter.value = -1
  } else {
    shake()
  }
}

const multiselectRemove = (index: number) => {
  selected.value.splice(index, 1)
  if (selected.value.length === 0) {
    // If no selected items, reset the input field
    query.value = ''
    inputField.value.value = ''
    isReadonly.value = false // Set readonly to false if no selected items
    showClearButton.value = false // Hide the clear button

    if (!showDropdown.value)
      showDropdown.value = true
  }
}

const handleDelete = () => {
  // Special handling for text input type
  if (selected.value.length && props.type === 'text')
    selected.value.pop() // Remove the last selected item
    if (!showDropdown.value)
      showDropdown.value = true
  // If multiple is enabled and the input field is empty,
  if (selected.value.length && inputField.value.value === '') {
    // Remove the last tag from the end of the list
    multiselectRemove(-1)
  }
}

const handleSuggestionClick = (option: ComboBoxSuggestion) => {
  handleEnterKeyUp(option, true)
}

const getCurrentSuggestion = () => {
  let option
  suggestionOptions.value?.forEach((i: ComboBoxSuggestion) => {
    if (typeof i !== 'string') {
      if (props.optionGroupChildren && i[props.optionGroupChildren]) {
        const tmp = (i[props.optionGroupChildren] as ComboBoxSuggestion[]).find((x: ComboBoxSuggestion) => {
          return typeof x !== 'string' && x.index === arrowCounter.value
        })
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

const activeElement = useActiveElement()

const isFocused = computed(() => {
  return activeElement.value === inputField.value
})

const handleFocus = () => {
  if (!props.multiple && (props.type === 'select' || props.type === 'taggable-select')) {
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
  /* When typing, always reset arrowCounter to -1 to use "all"
   * possible suggestions available. */
  if (showDropdown.value)
    arrowCounter.value = -1 // Reset arrow counter on input
}

const firstTick = ref()

const commitSelection = () => {
  selected.value = selected.value.length ?
    selected.value :
    [query.value] as ComboBoxSuggestion[]

  // Hide, the dropdown, unfocus the input field, and trigger enter event
  showDropdown.value = false // Hide the dropdown
  inputField.value.blur()
  emitEnter()
}

const handleEnterKeyUp = async (option: ComboBoxSuggestion | KeyboardEvent | MouseEvent | null, clicked=false) => {
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
  // Emit the selected option (max 1 w/o multiple)
  emitResult(query.value)

  switch (props.type) {
    case 'text':
      /**
       * 1. selected.value should have a length (this means a click or enter event has already submitted a value)
       * 2. not "clicked", don't submit when clicking a suggestion
       * 3. arrowCounter is -1, don't submit when selecting a suggestion with arrows
       */
      if (!clicked && arrowCounter.value === -1) {
        commitSelection()
      } else {
        // Empty selected items (there can be only one) in selected.value
        multiselectRemove(0)
        // Populate selected.value with the new query
        multiselectAdd()
        showClearButton.value = true
      }
      // Result already exists or is an invalid selection
      if ((firstTick.value.length && !query.value.length) || !query.value.length) {
        showClearButton.value = false
        shake()
      }

      firstTick.value = '' // Reset firstTick after selection
      break;
    case 'select':
    case 'taggable-select':
      // Toggle selection depending on whether it exists in selected
      if (selected.value.includes(query.value)) {
        multiselectRemove(selected.value.indexOf(query.value))
      } else {
        multiselectAdd() // Will select chosen option if props.multiple
      }

      if (!props.multiple) {
        if (selected.value.length === 1 && query.value === '' && !firstTick.value.length)
          commitSelection()
        // Result already exists or is an invalid selection
        if ((firstTick.value.length && !query.value.length) || !query.value.length)
          shake()
      } else {
        if (selected.value.length && query.value === '' && !firstTick.value.length)
          commitSelection()
        // Result already exists or is an invalid selection
        if ((firstTick.value.length && !query.value.length) || (!query.value.length && selected.value.length === 0))
          shake()
      }

      firstTick.value = '' // Reset firstTick after selection
      query.value = '' // Reset query value after selection
      break;
  }
}

const handleArrows = (direction: 'up' | 'down' | 'left' | 'right', event: KeyboardEvent) => {
  if (!showDropdown.value && (direction === 'up' || direction === 'down')) {
    // Lock it down if readonly
    if ((!props.multiple && (props.type === 'select' || props.type === 'taggable-select')) || props.type === 'text') {
      if (inputField.value.readOnly === true) {
        event.preventDefault()
        showDropdown.value = false // Hide the dropdown if only one item is selected
        return
      }
    }
    // Otherwise, show open state
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
        if (!props.disableGroupTabs && suggestionOptions.value?.length && inputField.value?.selectionStart === 0) {
          if (activeGroupKey.value > -1 && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
            setActiveGroup(event, { key: activeGroupKey.value - 1 });
          } else {
            // Allow circular navigation
            setActiveGroup(event, { key: groups.value[groups.value.length - 1].key }); // Set to first 'all' group
          }
        }
        break;
      case "right":
        if (!props.disableGroupTabs && suggestionOptions.value?.length && inputField.value?.selectionStart === query.value?.length) {
          if (activeGroupKey.value < groups.value[groups.value.length - 1].key && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
            setActiveGroup(event, { key: activeGroupKey.value + 1 });
          } else {
            // Set to first 'all' group
            setActiveGroup(event, { key: -1 });
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
