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
        v-if="((type === 'taggable-select' || type === 'select') && multiple) && Array.isArray(selected) && selected.length > 0"
        class="flex flex-row flex-wrap bg-gray-25 dark:bg-gray-950 rounded-t-sm gap-1 p-2 mr-auto justify-start w-full"
      >
        <SdsTag
          v-for="(option, index) in selected"
          :key="index"
          :disabled="disabled"
          action="remove"
          class="grow-0"
          :label="typeof option === 'object' ? String(option[optionLabel as string] ?? option[defaultOptionLabel as string] ?? '') : String(option)"
          @remove="multiselectRemove(index)"
        />
      </div>
      <div class="flex flex-row">
        <button
          class="input-group-addon"
          :disabled="disabled"
          tabindex="-1"
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
          class="form-control border-none"
          :class="{
            'opacity-0': !multiple && (type === 'select' || type === 'taggable-select') && selected.length
          }"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="isReadonly"
          :maxlength="maxlength"
          @input="onInputFieldInput"
          @click.prevent="showDropdown = !showDropdown"
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
      v-if="shouldShowDropdown"
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
                'text-black dark:text-white bg-gray-50 dark:bg-gray-800': isSelected(query) && arrowCounter !== 0,
                'text-black dark:text-white bg-gray-25 dark:bg-gray-750': arrowCounter === 0,
              }"
              :data-active="arrowCounter === 0"
              type="button"
              tabindex="-1"
              @click="handleSuggestionClick({
                label: query,
                name: query,
                value: query,
                __cbxIdx: 0
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
                v-if="isSelected(query)"
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="9"
                viewBox="0 0 11 9"
                fill="none"
                class="text-blue-700 dark:text-blue-400 ml-auto my-auto"
              >
                <path
                  d="M10.5156 0.984375C10.8203 1.26562 10.8203 1.75781 10.5156 2.03906L4.51562 8.03906C4.23438 8.34375 3.74219 8.34375 3.46094 8.03906L0.460938 5.03906C0.15625 4.75781 0.15625 4.26562 0.460938 3.98438C0.742188 3.67969 1.23438 3.67969 1.51562 3.98438L3.97656 6.44531L9.46094 0.984375C9.74219 0.679688 10.2344 0.679688 10.5156 0.984375Z"
                  fill="currentColor"
                />
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
                  'text-gray-700 dark:text-gray-300': c.__cbxIdx !== arrowCounter,
                  'text-black dark:text-white bg-gray-50 dark:bg-gray-800': isSelected(optionLabel ? c[optionLabel] : c[defaultOptionLabel]) && c.__cbxIdx !== arrowCounter && type !== 'text',
                  'text-black dark:text-white bg-gray-25 dark:bg-gray-750': c.__cbxIdx === arrowCounter,
                }"
                :data-active="c.__cbxIdx === arrowCounter"
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
                  v-if="isSelected(optionLabel ? c[optionLabel] : c[defaultOptionLabel]) && type !== 'text'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="9"
                  viewBox="0 0 11 9"
                  fill="none"
                  class="text-blue-700 dark:text-blue-400 ml-auto my-auto"
                >
                  <path
                    d="M10.5156 0.984375C10.8203 1.26562 10.8203 1.75781 10.5156 2.03906L4.51562 8.03906C4.23438 8.34375 3.74219 8.34375 3.46094 8.03906L0.460938 5.03906C0.15625 4.75781 0.15625 4.26562 0.460938 3.98438C0.742188 3.67969 1.23438 3.67969 1.51562 3.98438L3.97656 6.44531L9.46094 0.984375C9.74219 0.679688 10.2344 0.679688 10.5156 0.984375Z"
                    fill="currentColor"
                  />
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
                    'text-gray-700 dark:text-gray-300': c.__cbxIdx !== arrowCounter,
                    'text-black dark:text-white bg-gray-50 dark:bg-gray-800': c.__cbxIdx === arrowCounter
                  }"
                  :data-active="c.__cbxIdx === arrowCounter"
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
                'text-gray-700 dark:text-gray-300': s.__cbxIdx !== arrowCounter,
                'text-black dark:text-white bg-gray-50 dark:bg-gray-800': isSelected(optionLabel ? s[optionLabel] : s[defaultOptionLabel]) && s.__cbxIdx !== arrowCounter && type !== 'text',
                'text-black dark:text-white bg-gray-25 dark:bg-gray-750': s.__cbxIdx === arrowCounter,
                'last:mb-2': groups.length < 2
              }"
              :data-active="s.__cbxIdx === arrowCounter"
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
                v-if="isSelected(optionLabel ? s[optionLabel] : s[defaultOptionLabel]) && type !== 'text'"
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="9"
                viewBox="0 0 11 9"
                fill="none"
                class="text-blue-700 dark:text-blue-400 ml-auto my-auto"
              >
                <path
                  d="M10.5156 0.984375C10.8203 1.26562 10.8203 1.75781 10.5156 2.03906L4.51562 8.03906C4.23438 8.34375 3.74219 8.34375 3.46094 8.03906L0.460938 5.03906C0.15625 4.75781 0.15625 4.26562 0.460938 3.98438C0.742188 3.67969 1.23438 3.67969 1.51562 3.98438L3.97656 6.44531L9.46094 0.984375C9.74219 0.679688 10.2344 0.679688 10.5156 0.984375Z"
                  fill="currentColor"
                />
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
                  'text-gray-700 dark:text-gray-300': s.__cbxIdx !== arrowCounter,
                  'text-black dark:text-white bg-gray-50 dark:bg-gray-800': s.__cbxIdx === arrowCounter
                }"
                :data-active="s.__cbxIdx === arrowCounter"
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

export type ComboBoxSuggestionObject = { [id: string | number]: unknown }
export type ComboBoxSuggestion = ComboBoxSuggestionObject | string

defineOptions({ name: 'SdsComboBox' })

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
  disabled: { type: Boolean, default: false },
  /**
   * The max amount of characters that can be entered into the input.
   */
  maxlength: { type: Number, default: undefined },
  /**
   * Determines the size of the input field. Options are "sm" and "md".
   */
  size: { type: String as () => 'sm' | 'md', default: undefined },
  /**
   * Determine whether to autofocus the input.
   */
  autofocus: { type: Boolean, default: false },
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
  suggestions: { type: Array as () => ComboBoxSuggestion[], default: () => [] },
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
  type: { type: String as () => 'text' | 'select' | 'taggable-select', default: 'text' },
  /**
   * Determines the type, or tag, use for the option/component
   */
  optionType: { type: String as () => 'a' | 'button' | 'custom', default: 'button' },
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
  filterSuggestions: { type: Boolean, default: false },
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

const root = ref(), scrollArea = ref(), inputField = ref(), dropdownOption = ref()
const isReadonly = ref(false)
const query = defineModel({ type: String, default: '' })
const selected = defineModel<ComboBoxSuggestion[]>('selected', { type: Array as () => ComboBoxSuggestion[], default: () => [] })
const showDropdown = ref(false)
const forceShowDropdown = ref(false)
const arrowCounter = ref(-1)
const defaultOptionLabel = ref('label')
const groups = ref(), activeGroup = ref(), activeGroupKey = ref(-1)
const allSuggestions = ref(), allSuggestionOptions = ref(), allCount = ref(0)
const groupSuggestions = ref(), groupSuggestionOptions = ref(), suggestionOptions = ref()
const showClearButton = ref(false)
const firstTickQuery = ref()

const removeHtmlFromString = (value: string) => {
  if (typeof document === 'undefined') return value
  const div = document.createElement('div')
  div.innerHTML = value
  return div.textContent || div.innerText || ''
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
      return String(s[props.optionLabel ? props.optionLabel : defaultOptionLabel.value])
    else if (typeof s === 'string')
      return s
    return ''
  }).filter((s): s is string => typeof s === 'string' && s.length > 0)
})

const CBX_IDX = '__cbxIdx'
const addIndexToList = (arr: ComboBoxSuggestion[]) => {
  if (!Array.isArray(arr)) return []
  const suggestions = flatSuggestions.value
  let cbxIdx = (query.value?.length && props.type === 'taggable-select' && !suggestions?.includes(query.value)) ? 1 : 0
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

const matchesSuggestion = computed(() => flatSuggestions.value.includes(query.value))

// Dedicated suppression flags for robust event suppression
let suppressCompleteDueToSelection = false
let suppressCompleteDueToLabelUpdate = false
let suppressShowDropdownNext = false // Boolean: suppress dropdown for the next query change only
watch(query, (value: string) => {
  const htmlRegex = /<[^>]*(>|$)/
  if (htmlRegex.test(value)) query.value = removeHtmlFromString(value)
  showClearButton.value = inputField.value ? inputField.value.value.length > 0 : false
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
    if (!selected.value.some(sel => typeof sel === 'string' ? sel === query.value : (props.optionLabel ? sel[props.optionLabel] : sel[defaultOptionLabel.value]) === query.value)) {
      emit('complete', query.value)
    }
  }
  suppressCompleteDueToSelection = false;
  suppressCompleteDueToLabelUpdate = false;
  if (
    (props.multiple === false && (props.type === 'select' || props.type === 'taggable-select'))
    || props.type === 'text'
  ) {
    if (query.value === '' && !selected.value.length) showClearButton.value = false
  } else {
    if (query.value === '') showClearButton.value = false
  }
}, { debounce: props.debounceComplete })

watch(showDropdown, (val) => {
  if (val === false) {
    arrowCounter.value = -1
    activeGroupKey.value = -1
  }
})

const setActiveGroup = (e: MouseEvent | KeyboardEvent, group: { key: number }) => {
  e.preventDefault()
  inputField.value.focus()
  activeGroupKey.value = group.key
}

onMounted(() => { if (props.autofocus) inputField.value.focus() })

onKeyStroke('Escape', (e: KeyboardEvent) => {
  e.preventDefault()
  if (!showDropdown.value) inputField.value.blur()
  showDropdown.value = false
})

onClickOutside(root, () => { showDropdown.value = false })

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
  query.value = ''
  inputField.value.value = ''
  if (!props.multiple && (props.type === 'select'|| props.type === 'taggable-select')) selected.value = []
  isReadonly.value = false
  showClearButton.value = false
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
    if (selected.value.length && props.type !== 'text') isReadonly.value = true
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
    isReadonly.value = false
    showClearButton.value = false
  }
  // Always update input field focus
  if (inputField.value) inputField.value.focus()
}

const handleDelete = () => {
  if (selected.value.length && props.type === 'text') (selected.value as ComboBoxSuggestion[]).pop()
  if (selected.value.length && inputField.value.value === '') multiselectRemove(-1)
}

const getCurrentSuggestion = (): ComboBoxSuggestion | undefined => {
  let option: ComboBoxSuggestion | undefined = undefined
  const opts = suggestionOptions.value as ComboBoxSuggestion[] | undefined
  if (!opts) return undefined
  opts.forEach((i: ComboBoxSuggestion) => {
    if (typeof i !== 'string') {
      if (props.optionGroupChildren && i[props.optionGroupChildren]) {
        const tmp = (i[props.optionGroupChildren] as ComboBoxSuggestion[]).find((x: ComboBoxSuggestion) => typeof x !== 'string' && x[CBX_IDX] === arrowCounter.value)
        if (tmp) option = tmp
      } else {
        if (i[CBX_IDX] === arrowCounter.value) option = i
      }
    }
  })
  return option
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

// Computed property for input display value
const inputDisplayValue = computed(() => {
  // If a suggestion is highlighted, show its label
  if (arrowCounter.value !== -1 && suggestionOptions.value && suggestionOptions.value.length > 0) {
    // Find the suggestion with the current arrowCounter
    let found: ComboBoxSuggestion | undefined
    suggestionOptions.value.forEach((i: ComboBoxSuggestion) => {
      if (typeof i !== 'string') {
        if (props.optionGroupChildren && i[props.optionGroupChildren]) {
          const tmp = (i[props.optionGroupChildren] as ComboBoxSuggestion[]).find((x: ComboBoxSuggestion) => typeof x !== 'string' && x[CBX_IDX] === arrowCounter.value)
          if (tmp) found = tmp
        } else {
          if (i[CBX_IDX] === arrowCounter.value) found = i
        }
      }
    })
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
  // Otherwise, show the query
  return removeHtmlFromString(query.value)
})

// Input handler for the input field (replaces v-model)
const onInputFieldInput = (e: Event) => {
  const target = e.target as HTMLInputElement
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
  // For type="text", update the query to match the selected suggestion
  if (props.type === 'text') {
    // Only suppress if query is actually changing (handled elsewhere)
    suppressCompleteDueToLabelUpdate = true
    if (typeof normalizedOption === 'object' && normalizedOption !== null) {
      query.value = String(props.optionLabel ? normalizedOption[props.optionLabel as string] : normalizedOption[defaultOptionLabel.value] ?? '')
    } else if (typeof normalizedOption === 'string') {
      query.value = normalizedOption
    }
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
  query.value = ''
  inputField.value.focus()
}

const handleEnterKeyUp = async (event: KeyboardEvent | MouseEvent) => {
  if (props.disabled) return
  firstTickQuery.value = query.value
  let suggestionObj = getCurrentSuggestion()
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
        showClearButton.value = true
      }
      if ((firstTickQuery.value.length && !query.value.length) || !query.value.length) {
        showClearButton.value = false
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

const handleArrows = (direction: 'up' | 'down' | 'left' | 'right', event: KeyboardEvent) => {
  if (direction === 'up' || direction === 'down') {
    if (!showDropdown.value) {
      if ((!props.multiple && (props.type === 'select' || props.type === 'taggable-select')) || props.type === 'text') {
        if (inputField.value.readOnly === true) {
          event.preventDefault()
          showDropdown.value = false
          return
        }
      }
      showDropdown.value = true
      return
    }
  }
  switch (direction) {
    case 'down':
      if (arrowCounter.value < dropdownOption.value?.length - 1) arrowCounter.value++
      else arrowCounter.value = -1
      break
    case 'up':
      if (arrowCounter.value > -1) arrowCounter.value--
      else arrowCounter.value = dropdownOption.value?.length - 1
      break
    case 'left':
      if (!props.disableGroupTabs && suggestionOptions.value?.length && inputField.value?.selectionStart === 0 && groups.value?.length > 0) {
        const idx = groups.value.findIndex((g: { key: number }) => g.key === activeGroupKey.value)
        let newIdx = idx > 0 ? idx - 1 : groups.value.length - 1
        // If not found or at -1 (All), wrap to last
        if (idx === -1) newIdx = groups.value.length - 1
        setActiveGroup(event, groups.value[newIdx])
      }
      break
    case 'right':
      if (!props.disableGroupTabs && suggestionOptions.value?.length && inputField.value?.selectionStart === query.value?.length && groups.value?.length > 0) {
        const idx = groups.value.findIndex((g: { key: number }) => g.key === activeGroupKey.value)
        const newIdx = idx < groups.value.length - 1 && idx !== -1 ? idx + 1 : 0
        setActiveGroup(event, groups.value[newIdx])
      }
      break
  }
  // Only scroll for up/down
  if (direction === 'up' || direction === 'down') scrollToChild()
}

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
  if ((props.suggestions?.length ?? 0) === 0) return false
  if (!showDropdown.value) return false
  if (props.type !== 'text' && selected.value.length === 1 && !props.multiple) return false
  return true
})
</script>