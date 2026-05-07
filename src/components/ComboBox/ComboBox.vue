<template>
  <SdsFloatingUi
    ref="floatingUiRef"
    data-id="sds-combo-box"
    class="w-full"
    placement="bottom-start"
    strategy="absolute"
    match-width
    hide-arrow
    shift
    disable-animation
    :offset="4"
    popper-class="absolute z-50 p-0 bg-white border rounded-theme-sm shadow-lg dark:border-gray-700 dark:bg-gray-850"
    @close="onFloatingUiClose"
  >
    <template #trigger>
      <div
        class="relative"
        :class="{ 'focus-ring rounded-theme-sm': showTagsBar }"
      >
        <div
          v-if="showTagsBar"
          class="form-border border-b-0 rounded-t-theme-sm bg-gray-25 dark:bg-gray-900/50 flex flex-row flex-wrap gap-1 p-2 justify-start w-full"
          :class="validationClasses"
        >
          <SdsTag
            v-for="(option, index) in selected"
            :key="index"
            :disabled="disabled"
            :readonly="readonly || disabled"
            :size="size === 'sm' ? 'sm' : 'md'"
            action="remove"
            class="grow-0"
            :label="getLabel(option)"
            @remove="multiselectRemove(index)"
          />
        </div>
        <div
          class="input-group"
          :class="[
            validationClasses,
            {
              'input-group-sm': size === 'sm',
              'input-group-lg': size === 'lg',
              'border-t-0 rounded-t-none': showTagsBar,
              'ring-0! focus-within:ring-0!': showTagsBar,
            }
          ]"
        >
          <div class="input-group-addon">
            <span class="sr-only">Combo box</span>
            <IconFa7SolidMagnifyingGlass
              v-if="!pending"
              :class="searchIconClass"
            />
            <SdsLoadingSpinner
              v-else
              size="sm"
            />
          </div>
          <input
            :id="id"
            ref="inputField"
            v-bind="validationAttrs"
            :value="inputDisplayValue"
            type="text"
            :multiple="multiple || undefined"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            autocorrect="off"
            class="form-control px-0 truncate overflow-hidden text-ellipsis whitespace-nowrap"
            :class="{ 'no-readonly-style': showSingleSelectionDisplay }"
            :placeholder="placeholder || undefined"
            :disabled="disabled || undefined"
            :readonly="readonly || showSingleSelectionDisplay || undefined"
            :maxlength="maxlength !== undefined ? maxlength : undefined"
            :required="inputRequired || undefined"
            @input="onInputFieldInput"
            @focus="handleInputFocus"
            @keydown="onKeydownWhenSingleSelected"
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
            v-if="isSelectType"
            type="text"
            :value="selected.length > 0 ? 'selected' : ''"
            :required="required || undefined"
            tabindex="-1"
            class="absolute h-px p-0 m-0 overflow-hidden whitespace-nowrap border-0 left-1/2 -translate-x-1/2 -translate-y-1/2 top-full w-full"
            style="clip: rect(0, 0, 0, 0);"
            @input.prevent
            @keydown.prevent
          >
          <div
            v-if="showClearButton"
            class="input-group-addon"
          >
            <button
              tabindex="-1"
              type="button"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
              :class="clearButtonClass"
              @mousedown.prevent="clearQuery"
            >
              <span class="sr-only">Clear query</span>
              <IconFa7SolidXmark />
            </button>
          </div>
          <div
            v-if="showFocusIndicator"
            class="input-group-addon"
          >
            <SdsTooltip>
              <template #trigger>
                <div
                  class="border dark:border-gray-700 rounded-theme-sm shadow-sm py-1 cursor-default bg-white dark:bg-gray-900/50"
                  :class="focusIndicatorClass"
                >
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
    </template>
    <div
      ref="dropdownRef"
      data-id="sds-combo-box-dropdown"
    >
      <div
        v-if="hasCategories"
        class="
          overflow-x-auto overflow-y-hidden flex
          after:w-full after:h-full after:content-[''] after:mt-auto
          after:border-b after:border-b-gray-100
          dark:after:border-b-gray-800
        "
        @focusin.capture="onComboBoxTabsFocusIn"
      >
        <SdsTabs
          v-model="comboBoxTabs"
          :focusable="false"
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
        />
      </div>
      <SdsScrollArea
        ref="scrollArea"
        class="max-h-72"
        :class="{
          'py-0 flex flex-col': optionType !== 'custom',
          'pt-2': !isFlatArray && allCount > 1 && countVisibleOptions(suggestionOptions) > 0 && type !== 'text' && enableSelectAll,
        }"
        @scroll.passive="onVirtualScroll"
      >
        <!-- Select all option for multiselect -->
        <template v-if="selectAllRendered">
          <button
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
            v-if="isSelectType && multiple && isFlatArray"
            class="border-gray-100 dark:border-gray-700"
          >
        </template>
        <div
          v-if="!shouldVirtualizeOptions && optionType !== 'custom' && displayOptionRows.length"
          class="flex flex-col gap-y-1 py-2"
        >
          <template
            v-for="row in displayOptionRows"
            :key="row.key"
          >
            <div
              v-if="row.kind === 'group'"
              class="flex w-full px-4 py-2 text-sm text-left text-black dark:text-white font-semibold list-none border-t border-gray-50 dark:border-gray-800"
              :class="{ 'border-t-0!': row.groupIndex === 0 && !enableSelectAll }"
            >
              <!-- @slot Option Group content. Good for customizing the content for each group option -->
              <slot
                name="optionGroup"
                :option="row.option"
                :label="getGroupLabel(row.option)"
              >
                {{ getGroupLabel(row.option) }}
              </slot>
            </div>
            <component
              :is="optionType"
              v-else
              :href="optionType === 'a' ? getHref(row.option) : undefined"
              class="flex w-full sds-theme-forge:mx-2 sds-theme-plaid:px-4 p-2 sds-theme-forge:max-w-[calc(100%-1rem)] sds-theme-forge:rounded text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-25 dark:hover:bg-gray-750"
              :class="{
                'text-gray-700 dark:text-gray-300': !isDropdownItemActive(row.option),
                'text-black dark:text-white font-semibold': isSelected(getLabel(row.option)) && type !== 'text',
                'text-black dark:text-white bg-gray-25 dark:bg-gray-750': isDropdownItemActive(row.option),
              }"
              :data-active="isDropdownItemActive(row.option)"
              :type="optionType === 'button' ? 'button' : undefined"
              tabindex="-1"
              @click.prevent="handleSuggestionClick(row.option)"
            >
              <!-- @slot Option content. Good for customizing the content for each option -->
              <template v-if="isSelectType && multiple">
                <input
                  type="checkbox"
                  class="mr-2 my-auto pointer-events-none"
                  aria-label="Select option"
                  tabindex="-1"
                  :checked="isSelected(getLabel(row.option))"
                >
              </template>
              <slot
                name="option"
                :option="row.option"
                :label="getLabel(row.option)"
              >
                {{ getLabel(row.option) }}
              </slot>
              <IconFa7SolidCheck
                v-if="isSelected(getLabel(row.option)) && type !== 'text' && !multiple"
                class="text-blue-700 dark:text-blue-400 ml-auto my-auto w-3 h-3"
              />
            </component>
          </template>
        </div>
        <template v-if="optionType === 'custom'">
          <template
            v-for="s, sindex in suggestionOptions"
            :key="`${s}_${sindex}`"
          >
            <div
              v-if="getChildren(s).length"
              class="flex flex-col gap-y-1 pb-2 mb-0 border-t border-gray-50 dark:border-gray-800"
              :class="{
                'border-t-0!': !multiple || !enableSelectAll || activeGroupKey === -1 || countVisibleOptions(getChildren(s)) <= 1,
                'pt-2': activeGroupKey !== -1 && countVisibleOptions(getChildren(s)) > 1,
              }"
            >
              <div
                v-if="activeGroupKey === -1"
                class="flex w-full px-4 py-2 text-sm text-left text-black dark:text-white font-semibold list-none"
                :class="{
                  'border-t border-gray-50 dark:border-gray-800': sindex !== 0 || enableSelectAll
                }"
              >
                <!-- @slot Option Group content. Good for customizing the content for each group option -->
                <slot
                  name="optionGroup"
                  :option="s"
                  :label="getGroupLabel(s)"
                >
                  {{ getGroupLabel(s) }}
                </slot>
              </div>
              <div
                v-for="c, cindex in getChildren(s)"
                :key="`${s}_${c}_${cindex}`"
                class="first:mt-2 last:mb-2"
              >
                <slot
                  name="customOption"
                  :href="getHref(c)"
                  :class-list="{
                    'flex w-full sds-theme-forge:mx-2 sds-theme-plaid:px-4 p-2 sds-theme-forge:max-w-[calc(100%-1rem)] sds-theme-forge:rounded text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800': true,
                    'text-gray-700 dark:text-gray-300': !isDropdownItemActive(c),
                    'text-black dark:text-white bg-gray-50 dark:bg-gray-800': isDropdownItemActive(c)
                  }"
                  :data-active="isDropdownItemActive(c)"
                  :tabindex="arrowCounter === 0 ? 0 : -1"
                  :option="c"
                  :label="getLabel(c)"
                  @click.prevent="handleSuggestionClick(c)"
                >
                  {{ getLabel(c) }}
                </slot>
              </div>
            </div>
            <div
              v-else
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
                :href="getHref(s)"
                :tabindex="arrowCounter === 0 ? 0 : -1"
                :option="s"
                :label="getLabel(s)"
                @click.prevent="handleSuggestionClick(s)"
              >
                {{ getLabel(s) }}
              </slot>
            </div>
          </template>
        </template>
        <div
          v-if="shouldVirtualizeOptions && suggestionOptions.length"
          class="relative shrink-0"
          :style="{ height: `${virtualOptionsHeight}px` }"
        >
          <template
            v-for="virtualRow in virtualSuggestionRows"
            :key="virtualRow.key"
          >
            <div
              v-if="virtualRow.item.kind === 'group'"
              class="flex w-full px-4 py-2 text-sm text-left text-black dark:text-white font-semibold list-none absolute left-0 right-0"
              :style="{ transform: `translateY(${virtualRow.offsetTop}px)`, minHeight: `${virtualRow.height}px` }"
            >
              <!-- @slot Option Group content. Good for customizing the content for each group option -->
              <slot
                name="optionGroup"
                :option="virtualRow.item.option"
                :label="getGroupLabel(virtualRow.item.option)"
              >
                {{ getGroupLabel(virtualRow.item.option) }}
              </slot>
            </div>
            <component
              :is="optionType"
              v-else
              :href="optionType === 'a' ? getHref(virtualRow.item.option) : undefined"
              class="flex w-full sds-theme-forge:mx-2 sds-theme-plaid:px-4 p-2 sds-theme-forge:max-w-[calc(100%-1rem)] sds-theme-forge:rounded text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-white hover:bg-gray-25 dark:hover:bg-gray-750 absolute left-0 right-0"
              :class="{
                'text-gray-700 dark:text-gray-300': !isDropdownItemActive(virtualRow.item.option),
                'text-black dark:text-white font-semibold': isSelected(getLabel(virtualRow.item.option)) && type !== 'text',
                'text-black dark:text-white bg-gray-25 dark:bg-gray-750': isDropdownItemActive(virtualRow.item.option),
              }"
              :style="{ transform: `translateY(${virtualRow.offsetTop}px)`, minHeight: `${virtualRow.height}px` }"
              :data-active="isDropdownItemActive(virtualRow.item.option)"
              :type="optionType === 'button' ? 'button' : undefined"
              tabindex="-1"
              @click.prevent="handleSuggestionClick(virtualRow.item.option)"
            >
              <template v-if="isSelectType && multiple">
                <input
                  type="checkbox"
                  class="mr-2 my-auto pointer-events-none"
                  aria-label="Select option"
                  tabindex="-1"
                  :checked="isSelected(getLabel(virtualRow.item.option))"
                >
              </template>
              <slot
                name="option"
                :option="virtualRow.item.option"
                :label="getLabel(virtualRow.item.option)"
              >
                {{ getLabel(virtualRow.item.option) }}
              </slot>
              <IconFa7SolidCheck
                v-if="isSelected(getLabel(virtualRow.item.option)) && type !== 'text' && !multiple"
                class="text-blue-700 dark:text-blue-400 ml-auto my-auto w-3 h-3"
              />
            </component>
          </template>
        </div>
        <!-- No matches message -->
        <div
          v-if="hasNoMatches && !shouldShowNewSuggestion"
          class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 italic"
          data-id="sds-combo-box-no-matches"
        >
          No matches for "{{ query }}"
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
              'text-gray-700 dark:text-gray-300': !isAddSuggestionActive,
              'text-black dark:text-white bg-gray-50 dark:bg-gray-800': isSelected(query) && !isAddSuggestionActive,
              'text-black dark:text-white bg-gray-25 dark:bg-gray-750': isAddSuggestionActive || arrowCounter === lastDropdownItemIndex(),
            }"
            :aria-selected="isAddSuggestionActive ? 'true' : 'false'"
            :data-active="isAddSuggestionActive"
            tabindex="-1"
            @keydown.delete="handleDelete"
            @keydown.tab="showDropdown = false"
            @keydown.left.prevent.stop="handleArrows('left', $event)"
            @keydown.right.prevent.stop="handleArrows('right', $event)"
            @keydown.enter.prevent="handleSuggestionClick(addSuggestion)"
            @mousedown.prevent="handleSuggestionClick(addSuggestion)"
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
  </SdsFloatingUi>
</template>

<script setup lang="ts">
import SdsFloatingUi from '../FloatingUi/FloatingUi.vue'
import SdsTooltip from '../Tooltip/Tooltip.vue'
import SdsScrollArea from '../ScrollArea/ScrollArea.vue'
import SdsTabs from '../Tabs/Tabs.vue'
import { removeHtmlFromString, useComboBoxDropdownItems, useComboBoxQuery, useComboBoxSelection, useComboBoxSuggestions, useFormField, useVirtualScroller } from '@/composables'
import type { ComboBoxGroup, ComboBoxSuggestion, ComboBoxSuggestionObject, ComboBoxType } from '@/composables'

export type { ComboBoxSuggestionObject, ComboBoxSuggestion } from '@/composables'

interface ComboBoxProps {
  /**
   * Focuses the text input when the ComboBox mounts.
   *
   * @default false
   */
  autofocus?: boolean;
  /**
   * Opens the suggestions dropdown when the user clicks the input, even before they type.
   *
   * Use this for select-like ComboBoxes where users should browse the full suggestion list.
   * When false, the dropdown opens from typing or keyboard navigation instead.
   *
   * @default false
   */
  clickToSelect?: boolean;
  /**
   * Number of milliseconds to wait after the query changes before emitting `complete`.
   *
   * Increase this when `complete` triggers remote search requests. Set to `0` when suggestions
   * should react immediately, such as in tests or small local lists.
   *
   * @default 250
   */
  debounceComplete?: number;
  /**
   * Hides group tabs that have no visible suggestions.
   *
   * This only applies when suggestions are grouped with `optionGroupLabel` and
   * `optionGroupChildren`. It is most useful with `filterSuggestions`, where typing can empty
   * some groups.
   *
   * @default false
   */
  disableGroupTabs?: boolean;
  /**
   * Shows a "Select all" row for multi-select ComboBoxes.
   *
   * The row appears only when `multiple` is true and `type` is `select` or `taggable-select`.
   * In grouped lists, it selects the currently visible group when a specific group tab is active.
   *
   * @default false
   */
  enableSelectAll?: boolean;
  /**
   * Maximum number of characters allowed in the input query.
   *
   * This is passed to the native input `maxlength` attribute. Leave unset for no component-level
   * character limit.
   *
   * @default undefined
   */
  maxlength?: number;
  /**
   * Allows more than one selected value.
   *
   * This only affects `type="select"` and `type="taggable-select"`. Selected values render as
   * removable tags above the input. `type="text"` is an autosuggest text field and does not use
   * multi-selection.
   *
   * @default false
   */
  multiple?: boolean;
  /**
   * ID applied to the visible text input.
   *
   * Use this to connect the ComboBox to an external label or form helper text.
   *
   * @default undefined
   */
  id?: string;
  /**
   * Focuses the ComboBox input when the user presses `/` anywhere on the page.
   *
   * Pair with `hideFocusIndicator` when you want the keyboard shortcut without showing the visual
   * `/` helper in the input group.
   *
   * @default false
   */
  focusOnKeyPress?: boolean;
  /**
   * Filters the provided `suggestions` locally as the user types.
   *
   * Set this to true for small or already-loaded lists. Keep it false when suggestions are fetched
   * from an API in response to the `complete` event, because the parent is already returning the
   * filtered list.
   *
   * @default false
   */
  filterSuggestions?: boolean;
  /**
   * Hides the visual `/` keyboard shortcut helper.
   *
   * This does not disable the shortcut itself. Use `focusOnKeyPress` to control whether `/` focuses
   * the input.
   *
   * @default false
   */
  hideFocusIndicator?: boolean;
  /**
   * Object key used as the display label for each suggestion.
   *
   * Use this when `suggestions` contains objects instead of strings. For example,
   * `optionLabel="name"` displays `suggestion.name` in the dropdown and input.
   *
   * @default undefined
   */
  optionLabel?: string;
  /**
   * Object key used as the display label for each suggestion group.
   *
   * Providing this prop tells the ComboBox that `suggestions` is grouped. Each group should also
   * provide a children array identified by `optionGroupChildren`.
   *
   * @default undefined
   */
  optionGroupLabel?: string;
  /**
   * Object key that contains a group's child suggestions.
   *
   * Use with `optionGroupLabel`. For example, with
   * `{ section: 'Fruits', items: [{ name: 'Apple' }] }`, set `optionGroupLabel="section"` and
   * `optionGroupChildren="items"`.
   *
   * @default undefined
   */
  optionGroupChildren?: string;
  /**
   * Element or rendering mode used for suggestion rows.
   *
   * Use `button` for standard selectable options, `a` when suggestions should render as anchors,
   * and `custom` when option content is supplied through the option slot. Virtualization is disabled
   * for `custom` options because custom rows can have unknown heights.
   *
   * @default 'button'
   */
  optionType?: 'a' | 'button' | 'custom';
  /**
   * Shows a loading spinner in the input and suppresses the dropdown while loading.
   *
   * Use this while fetching suggestions asynchronously after the `complete` event.
   *
   * @default false
   */
  pending?: boolean;
  /**
   * Placeholder text shown when the query is empty and no single selection is displayed.
   *
   * @default undefined
   */
  placeholder?: string;
  /**
   * Visual size of the input.
   *
   * `sm` and `lg` apply compact or large form-control styles. Leave unset for the default medium
   * size.
   *
   * @default undefined
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Suggestions shown in the dropdown.
   *
   * Items may be strings or objects. For object suggestions, use `optionLabel` to choose the
   * display field. For grouped suggestions, provide group objects and configure
   * `optionGroupLabel` plus `optionGroupChildren`.
   *
   * @default []
   */
  suggestions?: ComboBoxSuggestion[];
  /**
   * Interaction mode for the ComboBox.
   *
   * `text` behaves like an autosuggest input and writes the chosen label into the query.
   * `select` requires the final value to come from `suggestions`.
   * `taggable-select` allows both suggestions and new user-created values.
   *
   * @default 'text'
   */
  type?: ComboBoxType;
  /**
   * Disables the ComboBox.
   *
   * Disabled ComboBoxes cannot be focused, typed into, opened, cleared, or changed.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Makes the ComboBox read-only while still allowing focus.
   *
   * Read-only ComboBoxes cannot be edited or changed, but they can still receive focus so users can
   * inspect the value and assistive technology can announce it.
   *
   * @default false
   */
  readonly?: boolean;
  /**
   * Marks the field as required for native form validation.
   *
   * For select modes, the hidden validation input is considered valid when at least one selection
   * exists.
   *
   * @default false
   */
  required?: boolean;
  /**
   * Applies valid form-control styling.
   *
   * This only controls presentation. It does not perform validation.
   *
   * @default false
   */
  valid?: boolean;
  /**
   * Applies invalid form-control styling.
   *
   * This only controls presentation. It does not perform validation.
   *
   * @default false
   */
  invalid?: boolean;
  /**
   * Enables fixed-height virtualization for large standard option lists.
   *
   * Virtualization renders only the visible rows plus a small buffer, which keeps very large flat or
   * grouped lists responsive. It is used only when `optionType` is not `custom` and the visible
   * option count meets `virtualizeThreshold`.
   *
   * @default true
   */
  virtualize?: boolean;
  /**
   * Minimum visible option count required before virtualization turns on.
   *
   * Lower this for shorter lists when rendering is still expensive. Raise it when normal rendering
   * is preferable for medium-sized lists.
   *
   * @default 100
   */
  virtualizeThreshold?: number;
  /**
   * Fixed row height, in pixels, used by the virtual scroller.
   *
   * This should match the rendered height of each standard option row. Incorrect values can make
   * keyboard scrolling and scrollbar position feel inaccurate.
   *
   * @default 36
   */
  virtualItemHeight?: number;
}

defineOptions({ name: 'SdsComboBox' })

const props = withDefaults(defineProps<ComboBoxProps>(), {
  autofocus: false,
  clickToSelect: false,
  debounceComplete: 250,
  disableGroupTabs: false,
  enableSelectAll: false,
  maxlength: undefined,
  multiple: false,
  id: undefined,
  focusOnKeyPress: false,
  filterSuggestions: false,
  hideFocusIndicator: false,
  optionLabel: undefined,
  optionGroupLabel: undefined,
  optionGroupChildren: undefined,
  optionType: 'button',
  pending: false,
  placeholder: undefined,
  size: undefined,
  suggestions: () => [],
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  valid: false,
  invalid: false,
  virtualize: true,
  virtualizeThreshold: 100,
  virtualItemHeight: 36
})

const emit = defineEmits(['close', 'complete', 'enter', 'focus', 'open', 'result'])

const scrollArea = ref(), inputField = ref()
const virtualScrollContainer = ref<HTMLElement>()
const floatingUiRef = ref()
const dropdownRef = ref()

const { validationClasses, validationAttrs } = useFormField(props)
const query = defineModel({ type: String, default: '' })
const selected = defineModel<ComboBoxSuggestion[]>('selected', { type: Array as () => ComboBoxSuggestion[], default: () => [] })
const showDropdown = ref(false)
const arrowCounter = ref(-1)
const shouldScrollActiveItem = ref(false)
const shouldAutoHighlightOnOpen = ref(false)
// True when arrowCounter was set automatically (on dropdown open/query change) rather than by
// explicit arrow-key navigation. In this state the input shows the user's query, not the
// highlighted item's label.
const autoFocused = ref(false)
const activeGroupKey = ref(-1)

type ComboBoxTab = {
  key: string;
  title: string;
  count: number;
  active: boolean;
  disabled: boolean
}

type ComboBoxDisplayRow =
  | { kind: 'group'; option: ComboBoxSuggestion; key: string; groupIndex: number }
  | { kind: 'option'; option: ComboBoxSuggestion; key: string }

const {
  labelKey,
  getLabel,
  getGroupLabel,
  getChildren,
  getHref,
  countVisibleOptions,
  flattenOptions,
  allSuggestionOptions,
  allCount,
  groups,
  groupSuggestionOptions,
  suggestionOptions,
  shouldShowNewSuggestion,
  hasDropdownSuggestion,
  isFlatArray,
  hasCategories,
  hasNoMatches
} = useComboBoxSuggestions({
  suggestions: () => props.suggestions,
  query,
  type: () => props.type,
  filterSuggestions: () => props.filterSuggestions,
  optionLabel: () => props.optionLabel,
  optionGroupLabel: () => props.optionGroupLabel,
  optionGroupChildren: () => props.optionGroupChildren,
  disableGroupTabs: () => props.disableGroupTabs,
  activeGroupKey
})

const {
  findOriginalSuggestion,
  stripIdx,
  findSelectedIndex,
  addSelection,
  replaceSelection,
  removeSelectionAt,
  clearSelections,
  isSelected,
  resolveSuggestion,
  areAllSelected,
  areSomeSelected,
  toggleSelections
} = useComboBoxSelection({
  selected,
  suggestions: () => props.suggestions,
  getLabel,
  getChildren
})

const selectAllVisible = computed(() => isSelectType.value && props.multiple && props.enableSelectAll && allCount.value > 1)

const selectAllRendered = computed(() => selectAllVisible.value && countVisibleOptions(suggestionOptions.value) > 1)

const addSuggestion = computed<ComboBoxSuggestionObject>(() => ({
  label: query.value,
  name: query.value,
  value: query.value,
  __cbxIdx: 'add'
}))

const {
  dropdownItems,
  getCurrentSuggestion,
  lastDropdownItemIndex,
  firstItemIndex,
  isDropdownItemActive,
  isAddSuggestionActive
} = useComboBoxDropdownItems({
  suggestionOptions,
  optionGroupChildren: () => props.optionGroupChildren,
  selectAllRendered,
  shouldShowNewSuggestion,
  addSuggestion,
  arrowCounter
})

const shouldVirtualizeOptions = computed(() => {
  return props.virtualize &&
    props.optionType !== 'custom' &&
    countVisibleOptions(suggestionOptions.value) >= props.virtualizeThreshold
})

const displayOptionRows = computed<ComboBoxDisplayRow[]>(() => {
  return suggestionOptions.value.flatMap((suggestion, suggestionIndex) => {
    const children = getChildren(suggestion)
    if (!children.length) {
      return [{ kind: 'option', option: suggestion, key: `option-${suggestionIndex}-${getLabel(suggestion)}` }]
    }

    const groupRows: ComboBoxDisplayRow[] = activeGroupKey.value === -1
      ? [{ kind: 'group', option: suggestion, key: `group-${suggestionIndex}-${getGroupLabel(suggestion)}`, groupIndex: suggestionIndex }]
      : []
    return [
      ...groupRows,
      ...children.map((child, childIndex): ComboBoxDisplayRow => ({
        kind: 'option',
        option: child,
        key: `option-${suggestionIndex}-${childIndex}-${getLabel(child)}`
      }))
    ]
  })
})

const {
  virtualItems: virtualSuggestionRows,
  totalHeight: virtualOptionsHeight,
  onScroll: onVirtualScroll,
  scrollToIndex: scrollToVirtualIndex,
  setScrollTop: setVirtualScrollTop
} = useVirtualScroller<ComboBoxDisplayRow>({
  items: displayOptionRows,
  itemHeight: () => props.virtualItemHeight,
  containerRef: virtualScrollContainer,
  containerHeight: 288,
  overscan: 6,
  getKey: item => item.key
})

// Computed property to map ComboBox groups to SdsTabs format
const comboBoxTabs = computed({
  get() {
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

// True when the component is operating in one of the selection types (select / taggable-select).
const isSelectType = computed(() => props.type === 'select' || props.type === 'taggable-select')

// True when the multiselect tag bar above the input should be rendered.
const showTagsBar = computed(() => isSelectType.value && props.multiple && selected.value.length > 0)

// True when single-select should display the selected value without editing it in place.
const showSingleSelectionDisplay = computed(() => !props.multiple && isSelectType.value && selected.value.length > 0)

// Whether the main input's required attribute should be set (select types use a hidden validation input instead).
const inputRequired = computed(() => props.required && !isSelectType.value)

// Size-based padding class for the clear button.
const clearButtonClass = computed(() => {
  if (props.size === 'sm') return 'px-1'
  if (props.size === 'lg') return 'px-3'
  return 'px-2'
})

// Size-based icon class for the search icon.
const searchIconClass = computed(() => {
  if (props.size === 'lg') return 'w-5 h-5'
  return 'w-4 h-4'
})

// Size-based leading/padding class for the "/" focus-on-key-press indicator badge.
const focusIndicatorClass = computed(() => {
  if (props.size === 'sm') return 'leading-2.5 px-1.5'
  if (props.size === 'lg') return 'leading-4 px-1.75'
  return 'leading-3.5 px-1.5'
})

const showClearButton = computed(() => {
  if (props.disabled || props.readonly) return false
  if (inputDisplayValue.value !== '') return true
  if (props.type !== 'text' && selected.value.length > 0) return true
  return false
})

const getCurrentGroupOptions = (): ComboBoxSuggestion[] => {
  const options = !isFlatArray.value && activeGroupKey.value !== -1 ? groupSuggestionOptions.value : allSuggestionOptions.value
  return flattenOptions(options)
}

const inputClick = () => {
  if (props.readonly || props.disabled) return
  if (props.clickToSelect) {
    shouldAutoHighlightOnOpen.value = !showDropdown.value
    showDropdown.value = !showDropdown.value
  }
}

const selectAllChecked = computed(() => {
  return areAllSelected(getCurrentGroupOptions())
})

const selectAllIndeterminate = computed(() => {
  return areSomeSelected(getCurrentGroupOptions())
})

const toggleSelectAll = () => {
  toggleSelections(getCurrentGroupOptions())
}

// Computed property for input display value
const inputDisplayValue = computed(() => {
  // If a suggestion is highlighted via explicit arrow-key navigation, show its label.
  // When autoFocused is true the highlight was set automatically (on dropdown open/query change)
  // and we intentionally keep showing the user's typed query instead.
  if (arrowCounter.value !== -1 && !autoFocused.value && suggestionOptions.value.length > 0) {
    // Find the suggestion with the current arrowCounter
    const found: ComboBoxSuggestion | null | undefined = getCurrentSuggestion()
    if (found) {
      return removeHtmlFromString(getLabel(found))
    }
  }
  // If there are selections (and query is empty), use the first selected value for form validation
  // Only for single-select mode (multiselect shows selected items as tags, so input should be empty)
  if (selected.value.length > 0 && query.value === '' && !props.multiple) {
    return getLabel(selected.value[0])
  }
  // Otherwise, show the query
  return removeHtmlFromString(query.value)
})

const { setQuery, setUserQuery } = useComboBoxQuery({
  query,
  debounce: () => props.debounceComplete,
  onComplete: value => emit('complete', value),
  onShowDropdown: () => { showDropdown.value = true }
})

onMounted(() => { if (props.autofocus) inputField.value.focus() })

const collapseInputSelectionToEnd = () => {
  const input = inputField.value as HTMLInputElement | undefined
  if (!input || input.selectionStart === null || input.selectionEnd === null) return
  const end = input.value.length
  input.setSelectionRange(end, end)
}

const handleInputFocus = () => {
  emit('focus')
  if (!showSingleSelectionDisplay.value) return
  collapseInputSelectionToEnd()
  window.setTimeout(collapseInputSelectionToEnd, 0)
}

onKeyStroke('Escape', (e: KeyboardEvent) => {
  e.preventDefault()
  if (!showDropdown.value) inputField.value.blur()
  showDropdown.value = false
})

// When FloatingUi closes externally (click-outside, Escape), sync local state
const onFloatingUiClose = () => {
  showDropdown.value = false
}

onKeyStroke('/', (e: KeyboardEvent) => {
  if (!props.focusOnKeyPress) return
  if (!e.target) return
  const tagName = (e.target as HTMLElement).tagName.toLowerCase()
  if (["textarea", "input", "select"].includes(tagName)) return
  e.preventDefault()
  inputField.value.focus()
})

const getScrollAreaElement = (): HTMLElement | undefined => {
  if (!scrollArea.value) return undefined
  const element = scrollArea.value instanceof HTMLElement ? scrollArea.value : scrollArea.value.$el
  virtualScrollContainer.value = element
  return element
}

const onComboBoxTabsFocusIn = () => {
  inputField.value?.focus()
}

const resetVirtualScroll = () => {
  const parent = getScrollAreaElement()
  if (shouldVirtualizeOptions.value) setVirtualScrollTop(0)
  if (parent) parent.scrollTop = 0
}

const canSwitchTabsFromInputBoundary = (direction: 'left' | 'right', event: KeyboardEvent): boolean => {
  if (!hasCategories.value || arrowCounter.value === -1) return false
  const inputElement = inputField.value as HTMLInputElement | undefined
  if (!inputElement || event.target !== inputElement) return true
  if (inputElement.selectionStart === null || inputElement.selectionEnd === null) return false
  if (inputElement.selectionStart !== inputElement.selectionEnd) return false
  return direction === 'left'
    ? inputElement.selectionStart === 0
    : inputElement.selectionEnd === inputElement.value.length
}

const scrollToChild = async () => {
  await nextTick()
  if (shouldVirtualizeOptions.value) {
    getScrollAreaElement()
    const activeItem = dropdownItems.value.find(item => item.index === arrowCounter.value)

    if (activeItem?.kind === 'option') {
      const virtualIndex = displayOptionRows.value.findIndex(item => item.kind === 'option' && item.option === activeItem.option)
      if (virtualIndex === -1) return
      const alignment = activeItem.index === lastDropdownItemIndex() ? 'end' : 'auto'
      scrollToVirtualIndex(virtualIndex, alignment)
    } else if (activeItem?.kind === 'add') {
      setVirtualScrollTop(virtualOptionsHeight.value)
      return
    }
    return
  }
  const parent = getScrollAreaElement()
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
  // For multiselect: first click clears query, second click clears selections
  // For single-select: one click clears everything
  if (inputDisplayValue.value !== '') {
    setQuery('')
    // In multiselect mode, only clear query on first click (keep selections)
    if (props.multiple && (props.type === 'select' || props.type === 'taggable-select')) {
      showDropdown.value = false
      inputField.value.focus()
      return
    }
  }
  // Clear selections for select/taggable-select types (and text type when input is empty)
  // This handles the second click in multiselect mode or any click when input is already empty
  if (props.type === 'select' || props.type === 'taggable-select' || props.type === 'text') {
    clearSelections()
  }
  showDropdown.value = false
  inputField.value.focus()
}

const shake = () => {
  if (!inputField.value) return
  inputField.value.classList.add('animate-shake')
  setTimeout(() => inputField.value.classList.remove('animate-shake'), 500)
}

// Add or remove selection based on query
const multiselectAdd = async () => {
  if (!query.value) return
  let suggestion = findOriginalSuggestion(query.value)
  if (!suggestion && query.value !== '') {
    suggestion = props.type === 'text' ? query.value : {
      [labelKey.value]: query.value
    }
  }
  const normalizedObj = stripIdx(suggestion ?? {})
  const idx = findSelectedIndex(query.value)
  if (idx !== -1) {
    removeSelectionAt(idx)
    shake()
    return
  }
  addSelection(normalizedObj as ComboBoxSuggestion)
  inputField.value.focus()
  // Handle dropdown and query update for single select/text
  if ((!props.multiple && (props.type === 'select' || props.type === 'taggable-select')) || props.type === 'text') {
    showDropdown.value = false
    const normalizedLabel = getLabel(normalizedObj)
    setQuery(normalizedLabel)
  }
  await nextTick()
  arrowCounter.value = -1
}

const multiselectRemove = (index: number) => {
  if (!selected.value.length) return
  if (index < 0) {
    // Remove last item
    removeSelectionAt(selected.value.length - 1)
  } else if (index >= 0 && index < selected.value.length) {
    removeSelectionAt(index)
  }
  // Reset input and state if no items left
  if (selected.value.length === 0) {
    setQuery('')
  }
  // Always update input field focus
  if (inputField.value) inputField.value.focus()
}

const handleDelete = () => {
  if (selected.value.length && props.type === 'text' && inputField.value.value === '') {
    clearSelections()
    return
  }
  if (selected.value.length && props.type === 'text') removeSelectionAt(selected.value.length - 1)
  // For single-select (select/taggable-select), pressing Delete clears the entire selection
  if (selected.value.length && !props.multiple && (props.type === 'select' || props.type === 'taggable-select')) {
    multiselectRemove(-1)
    setQuery('')
    return
  }
  if (selected.value.length && inputField.value.value === '') multiselectRemove(-1)
}

const activeElement = useActiveElement()
const isFocused = computed(() => {
  // SSR guard: activeElement might be null during SSR
  if (!activeElement.value || !inputField.value) return false
  return activeElement.value === inputField.value
})

// Whether the "/" focus-on-key-press indicator badge should be shown.
const showFocusIndicator = computed(() => props.focusOnKeyPress && !props.hideFocusIndicator && !isFocused.value && !props.disabled)

const emitEnter = () => {
  if (props.type === 'text') emit('enter', query.value)
  else emit('enter', selected.value.length ? selected.value : query.value)
}

// When the input is readonly due to a single selection, intercept printable key presses to
// clear the selection and begin a new query — without ever showing the caret in the field.
const onKeydownWhenSingleSelected = async (e: KeyboardEvent) => {
  if (!showSingleSelectionDisplay.value) return
  if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return
  e.preventDefault()
  clearSelections()
  shouldAutoHighlightOnOpen.value = true
  setUserQuery(e.key)
  await nextTick()
  inputField.value.focus()
  handleInput()
}

// Input handler for the input field (replaces v-model)
const onInputFieldInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  // If user starts typing with an existing single selection in select/taggable-select mode,
  // clear the selection and allow them to type a new value
  if (!props.multiple && (props.type === 'select' || props.type === 'taggable-select') && selected.value.length > 0) {
    clearSelections()
    // Clear the input value so typing starts fresh (not concatenated to the selected value)
    const nextQuery = target.value.slice(-1) // Keep only the last typed character
    shouldAutoHighlightOnOpen.value = true
    setUserQuery(nextQuery)
    handleInput()
    return
  }
  shouldAutoHighlightOnOpen.value = true
  setUserQuery(target.value)
  handleInput()
}

const handleInput = async () => {
  await nextTick()
  // When the dropdown is already open and the query changes, keep the first item auto-focused
  // so the user can press Enter without having to navigate down first.
  if (showDropdown.value) {
    shouldAutoHighlightOnOpen.value = true
    arrowCounter.value = firstItemIndex.value
    autoFocused.value = true
  }
}

const commitSelection = () => {
  selected.value = selected.value.length ? selected.value : [query.value]
  showDropdown.value = false
  emitEnter()
}

const handleSuggestionClick = async (option: ComboBoxSuggestion) => {
  const { normalizedOption, emitValue } = resolveSuggestion(option)

  // For type="text", update the query to the suggestion's label
  if (props.type === 'text') {
    setQuery(getLabel(normalizedOption))
  }
  // Check for duplicate
  const idx = findSelectedIndex(getLabel(normalizedOption))
  if (idx !== -1) {
    removeSelectionAt(idx)
  } else {
    // Replace selection for single select, otherwise add to selection
    if (!props.multiple && (props.type === 'select' || props.type === 'taggable-select'))
      replaceSelection(normalizedOption)
    else
      addSelection(normalizedOption)
  }
  await nextTick()
  emit('result', emitValue)
  // Close dropdown
  showDropdown.value = false
  if (props.type !== 'text') {
    setQuery('')
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
    if (arrowCounter.value === 0 && props.enableSelectAll) {
      toggleSelectAll()
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
  const initialQuery = query.value
  let suggestionObj = getCurrentSuggestion()
  // If "Select all" is focused, trigger select all
  if (suggestionObj === null) {
    toggleSelectAll()
    return
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
      [labelKey.value]: query.value
    }
  }
  let emitValue: ComboBoxSuggestion | undefined
  if (suggestionObj) {
    const resolvedSuggestion = resolveSuggestion(suggestionObj)
    setQuery(getLabel(resolvedSuggestion.normalizedOption))
    emitValue = resolvedSuggestion.emitValue
  } else if (props.type === 'text') {
    emitValue = query.value
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
      break
    }
    case 'select':
    case 'taggable-select': {
      const alreadySelectedIdx = findSelectedIndex(query.value)
      if (alreadySelectedIdx !== -1) {
        multiselectRemove(alreadySelectedIdx)
      } else {
        multiselectAdd()
      }
      if (!props.multiple) {
        if (selected.value.length === 1 && query.value === '' && !initialQuery.length) commitSelection()
        if ((initialQuery.length && !query.value.length) || !query.value.length) shake()
      } else {
        if (selected.value.length && query.value === '' && !initialQuery.length) commitSelection()
        if ((initialQuery.length && !query.value.length) || (!query.value.length && selected.value.length === 0)) shake()
      }
      setQuery('')
      break
    }
  }
}

const handleArrows = async (direction: 'up' | 'down' | 'left' | 'right', event: KeyboardEvent) => {
  // SSR guard: ensure dropdownRef.value exists before querying
  const activeTab = (dropdownRef.value?.querySelector('button.tab[data-active="true"]') as HTMLElement) || null

  if (direction === 'up' || direction === 'down') {
    // Show dropdown if not already shown and there are suggestions
    if (!showDropdown.value && hasDropdownSuggestion.value) {
      if (!inputField.value.readOnly) {
        event.preventDefault()
        shouldAutoHighlightOnOpen.value = false
        showDropdown.value = true
      }
      arrowCounter.value = -1
      activeTab?.blur()
      activeGroupKey.value = -1
      return
    }
  }

  switch (direction) {
    case 'down': {
      // User is explicitly navigating — disable auto-focus so input shows the highlighted label
      autoFocused.value = false
      shouldScrollActiveItem.value = true
      if (hasCategories.value) { // Has categories?
        if (arrowCounter.value === -1) { // Input should be focused
          arrowCounter.value = firstItemIndex.value
          return
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
      // User is explicitly navigating — disable auto-focus so input shows the highlighted label
      autoFocused.value = false
      shouldScrollActiveItem.value = true
      if (hasCategories.value) { // Has categories?
        if (arrowCounter.value === firstItemIndex.value) { // First option is active
          arrowCounter.value = -1
          inputField.value.focus()
          return
        }
      }

      const lastIdx = lastDropdownItemIndex()
      if (arrowCounter.value > -1) {
        if (arrowCounter.value === 1 && hasCategories.value && countVisibleOptions(suggestionOptions.value) === 1 && props.enableSelectAll) {
          arrowCounter.value--
        }
        arrowCounter.value--
      } else {
        arrowCounter.value = lastIdx
      }
      break
    }
    // Allow left/right arrow navigation only if categories are shown and input is not focused
    case 'left':
      if (canSwitchTabsFromInputBoundary(direction, event)) {
        event.preventDefault()
        if (activeGroupKey.value === -1) {
          activeGroupKey.value = comboBoxTabs.value.length - 2
        } else {
          activeGroupKey.value--
        }
        await nextTick()
        const newActiveTab = dropdownRef.value?.querySelector('button.tab[data-active="true"]')
        newActiveTab?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
      }
      break
    case 'right':
      if (canSwitchTabsFromInputBoundary(direction, event)) {
        event.preventDefault()
        if (activeGroupKey.value === comboBoxTabs.value.length - 2) {
          activeGroupKey.value = -1
        } else {
          activeGroupKey.value++
        }
        await nextTick()
        const newActiveTab = dropdownRef.value?.querySelector('button.tab[data-active="true"]')
        newActiveTab?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
      }
      break
  }
}

// Watch arrowCounter and scroll to the active suggestion when it changes
watch(arrowCounter, (val, oldVal) => {
  if (val !== oldVal && showDropdown.value && shouldScrollActiveItem.value) {
    scrollToChild()
  }
  shouldScrollActiveItem.value = false
})

const shouldShowDropdown = computed(() => {
  if (props.disabled) return false
  if (props.pending) return false
  if (!showDropdown.value) return false
  if (!hasDropdownSuggestion.value && !hasNoMatches.value) return false
  if (props.type !== 'text' && selected.value.length === 1 && !props.multiple && !props.clickToSelect) return false
  return true
})

watch(shouldShowDropdown, async (val) => {
  // Drive FloatingUi open/close state
  if (val) {
    await floatingUiRef.value?.onOpen()
    emit('open')
  } else {
    await floatingUiRef.value?.onClose()
    emit('close')
  }
  // When the dropdown opens, auto-focus the first item so the user can press Enter immediately.
  // autoFocused keeps the typed query visible in the input (no label substitution).
  if (val) {
    if (shouldAutoHighlightOnOpen.value) {
      arrowCounter.value = firstItemIndex.value
      autoFocused.value = true
    } else {
      arrowCounter.value = -1
      autoFocused.value = false
    }
    shouldAutoHighlightOnOpen.value = false
    await nextTick()
    resetVirtualScroll()
  } else {
    arrowCounter.value = -1
    autoFocused.value = false
    shouldAutoHighlightOnOpen.value = false
  }
  activeGroupKey.value = -1
})

watch(activeGroupKey, async () => {
  if (!shouldShowDropdown.value) return
  arrowCounter.value = firstItemIndex.value
  autoFocused.value = true
  await nextTick()
  resetVirtualScroll()
})

watch(displayOptionRows, async () => {
  if (!shouldShowDropdown.value) return
  await nextTick()
  resetVirtualScroll()
})
</script>
