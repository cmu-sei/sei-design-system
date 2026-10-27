<template>
  <SdsFloatingUi
    v-bind="getRootAttrs()"
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
    popper-class="absolute z-50 p-0 bg-white border rounded-theme-sm shadow-lg dark:border-gray-700 dark:bg-gray-950"
    @close="onFloatingUiClose"
  >
    <template #trigger>
      <div
        class="relative"
        :class="{ 'focus-ring rounded-theme-sm': showTagsBar }"
        @mousedown="handleTriggerMouseDown"
      >
        <div
          v-if="showTagsBar"
          class="form-border border-b-0 rounded-t-theme-sm bg-gray-25 dark:bg-gray-900/50 flex flex-row flex-wrap gap-1 p-2 justify-start w-full"
          :class="[validationClasses, { invalid: showSelectionError }]"
        >
          <SdsTag
            v-for="(option, index) in selected"
            :key="index"
            :disabled="disabled"
            :readonly="readonly || disabled"
            :size="size === 'sm' ? 'sm' : 'md'"
            action="remove"
            :action-label="text.remove(getLabel(option))"
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
              invalid: showSelectionError,
              'input-group-sm': size === 'sm',
              'input-group-lg': size === 'lg',
              'border-t-0 rounded-t-none': showTagsBar,
              'ring-0! focus-within:ring-0!': showTagsBar,
            }
          ]"
        >
          <button
            v-if="!pending"
            data-id="sds-combo-box-search-button"
            type="button"
            tabindex="-1"
            class="input-group-addon cursor-pointer disabled:cursor-not-allowed"
            :aria-controls="dropdownId"
            :aria-expanded="shouldShowDropdown ? 'true' : 'false'"
            :disabled="disabled || readonly || undefined"
            @click="showDropdownResults"
          >
            <span class="sr-only">{{ text.showSuggestions }}</span>
            <IconFa7SolidMagnifyingGlass
              aria-hidden="true"
              :class="searchIconClass"
            />
          </button>
          <div
            v-else
            class="input-group-addon"
          >
            <span class="sr-only">{{ text.loading }}</span>
            <SdsLoadingSpinner
              aria-hidden="true"
              size="sm"
              class="inline-flex shrink-0 items-center justify-center"
              :class="searchIconClass"
            />
          </div>
          <input
            :id="inputId"
            ref="inputField"
            :name="!isSelectType ? name : undefined"
            :form="form"
            :value="inputDisplayValue"
            type="text"
            role="combobox"
            aria-autocomplete="list"
            :aria-label="getAriaAttribute('aria-label')"
            :aria-labelledby="getAriaAttribute('aria-labelledby')"
            :aria-describedby="getInputDescriptionIds()"
            :aria-invalid="invalid || showSelectionError || undefined"
            :aria-busy="pending || undefined"
            :aria-controls="dropdownId"
            :aria-expanded="shouldShowDropdown ? 'true' : 'false'"
            :aria-activedescendant="activeDescendantId"
            :multiple="multiple || undefined"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            autocorrect="off"
            v-bind="{ ...validationAttrs, ...getInputAttrs() }"
            class="form-control truncate overflow-hidden text-ellipsis whitespace-nowrap"
            :placeholder="placeholder || undefined"
            :disabled="disabled || undefined"
            :readonly="readonly || undefined"
            :maxlength="maxlength !== undefined ? maxlength : undefined"
            :required="inputRequired || undefined"
            @input="onInputFieldInput"
            @compositionstart="onCompositionStart"
            @compositionend="onCompositionEnd"
            @invalid="handleInvalid"
            @focus="emit('focus')"
            @click="showDropdownResults"
            @keydown="handleInputKeydown"
            @keyup.enter="handleEnterKeyUp"
          >
          <div
            v-if="showClearButton"
            class="input-group-addon"
          >
            <button
              data-id="sds-combo-box-clear-button"
              tabindex="-1"
              type="button"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
              :class="clearButtonClass"
              @mousedown.prevent
              @click="clearQuery"
            >
              <span class="sr-only">{{ text.clearSearch }}</span>
              <IconFa7SolidXmark aria-hidden="true" />
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
                {{ text.focusHint }}
              </p>
            </SdsTooltip>
          </div>
          <button
            v-else-if="isSelectType && hasDropdownSuggestion"
            data-id="sds-combo-box-select-caret"
            type="button"
            tabindex="-1"
            class="input-group-addon cursor-pointer disabled:cursor-not-allowed"
            :aria-controls="dropdownId"
            :aria-expanded="shouldShowDropdown ? 'true' : 'false'"
            :disabled="disabled || readonly || undefined"
            @click="showDropdownResults"
          >
            <span class="sr-only">{{ text.showSuggestions }}</span>
            <span
              aria-hidden="true"
              class="block size-4.75 shrink-0 bg-no-repeat bg-center bg-size-[1rem_1rem] bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20viewBox%3D%270%200%2016%2016%27%20fill%3D%27none%27%3E%3Cpath%20d%3D%27M4%206l4%204%204-4%27%20stroke%3D%27%23747578%27%20stroke-width%3D%271.75%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27/%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20viewBox%3D%270%200%2016%2016%27%20fill%3D%27none%27%3E%3Cpath%20d%3D%27M4%206l4%204%204-4%27%20stroke%3D%27%23a6a7aa%27%20stroke-width%3D%271.75%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27/%3E%3C/svg%3E')]"
            />
          </button>
          <!-- @slot Default content. Good for adding content to the end of the input group -->
          <slot />
        </div>
        <input
          v-for="(option, index) in isSelectType && name ? selected.filter(option => getLabel(option).trim()) : []"
          :key="index"
          type="hidden"
          :name="name"
          :form="form"
          :disabled="disabled"
          :value="getOptionValue(option)"
        >
        <p
          :id="feedbackId"
          role="status"
          aria-live="polite"
          class="mt-1 text-sm text-gray-600 dark:text-gray-300"
          :class="{ 'sr-only': !actionFeedback }"
        >
          {{ actionFeedback }}
        </p>
        <p
          v-if="showSelectionError"
          :id="selectionErrorId"
          class="mt-1 text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {{ selectionValidationMessage }}
        </p>
        <span
          v-if="showTagsBar"
          :id="selectionSummaryId"
          class="sr-only"
        >{{ text.selectedSummary(selected.map(getLabel)) }}</span>
        <span
          class="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          data-id="sds-combo-box-selection-status"
        >{{ selectionAnnouncement }}</span>
        <span
          class="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          data-id="sds-combo-box-results-status"
        >{{ resultsAnnouncement }}</span>
      </div>
    </template>
    <div
      ref="dropdownRef"
      data-id="sds-combo-box-dropdown"
      class="@container"
    >
      <div
        v-if="!pending && hasCategories"
        data-id="sds-combo-box-categories"
        class="overflow-x-auto overflow-y-hidden flex border-b border-gray-100 dark:border-gray-800"
      >
        <div
          role="group"
          :aria-label="text.categories"
          class="flex shrink-0 px-4"
        >
          <button
            v-for="tab in comboBoxTabs"
            :key="tab.key"
            type="button"
            class="tab tab-underline tab-blue text-sm whitespace-nowrap after:rounded-(--tab-indicator-radius,var(--radius-md))"
            :class="{ active: tab.active }"
            :data-active="tab.active || undefined"
            :aria-pressed="tab.active"
            :aria-controls="dropdownId"
            :disabled="tab.disabled"
            tabindex="-1"
            @mousedown.prevent
            @click="activeGroupKey = Number(tab.key)"
          >
            {{ tab.title }} <span class="tab-count">{{ tab.count.toLocaleString() }}</span>
          </button>
        </div>
      </div>
      <SdsScrollArea
        :id="dropdownId"
        ref="scrollArea"
        role="listbox"
        :aria-multiselectable="isMultiselect ? 'true' : undefined"
        :aria-label="getAriaAttribute('aria-label') || text.suggestions"
        :aria-labelledby="getAriaAttribute('aria-labelledby')"
        :aria-busy="pending || undefined"
        class="max-h-72"
        :class="{
          'py-0 flex flex-col': optionType !== 'custom',
        }"
        @scroll.passive="onVirtualScroll"
      >
        <div
          v-if="!pending && (shouldShowNewSuggestion || selectAllRendered)"
          data-id="sds-combo-box-actions"
          class="flex flex-col"
        >
          <div
            v-if="shouldShowNewSuggestion"
            class="py-2"
          >
            <p
              v-if="isSelected(query)"
              class="px-3 text-sm"
            >
              {{ text.alreadyAdded(query.trim()) }}
            </p>
            <button
              v-else
              :id="getAddSuggestionId()"
              type="button"
              :class="[optionClass, {
                'text-gray-700 dark:text-gray-100': !isAddSuggestionActive,
                'text-black dark:text-gray-100 bg-gray-25 dark:bg-gray-900': isAddSuggestionActive,
              }]"
              aria-selected="false"
              aria-posinset="1"
              :aria-setsize="rootOptionSetSize"
              :data-active="isAddSuggestionActive"
              tabindex="-1"
              role="option"
              @keydown="handleInputKeydown"
              @keyup.enter="handleEnterKeyUp"
              @mousedown.prevent
              @click="handleSuggestionClick(addSuggestion)"
            >
              <!-- @slot Option content. Good for customizing the content for each option -->
              <slot
                name="option"
                :option="addSuggestion"
                :label="query.trim()"
              >
                <span
                  aria-hidden="true"
                  class="mr-2 flex size-4 shrink-0"
                >
                  <IconFa7SolidPlus class="size-3 m-auto" />
                </span>
                <span class="min-w-0 wrap-anywhere">{{ text.add(query.trim()) }}</span>
              </slot>
            </button>
          </div>
          <hr
            v-if="shouldShowNewSuggestion && selectAllRendered"
            aria-hidden="true"
            class="border-gray-100 dark:border-gray-700"
          >
          <!-- Select all option for multiselect -->
          <div
            v-if="selectAllRendered"
            class="py-2"
          >
            <button
              :id="getDropdownItemId(selectAllIndex)"
              type="button"
              :class="[optionClass, {
                'text-gray-700 dark:text-gray-100': arrowCounter !== selectAllIndex,
                'text-black dark:text-gray-100 bg-gray-25 dark:bg-gray-900': arrowCounter === selectAllIndex
              }]"
              :aria-selected="selectAllChecked ? 'true' : 'false'"
              :aria-posinset="selectAllIndex + 1"
              :aria-setsize="rootOptionSetSize"
              :aria-describedby="selectAllIndeterminate ? selectAllStateId : undefined"
              :data-active="arrowCounter === selectAllIndex ? 'true' : 'false'"
              tabindex="-1"
              role="option"
              @mousedown.prevent
              @click="toggleSelectAll"
              @keydown.enter.prevent="toggleSelectAll"
            >
              <span
                :id="`${componentId}-select-all`"
                data-id="sds-combo-box-checkbox"
                :data-checked="selectAllChecked || selectAllIndeterminate"
                :data-indeterminate="selectAllIndeterminate"
                aria-hidden="true"
                :class="checkboxClass"
              >
                <IconFa7SolidMinus
                  v-if="selectAllIndeterminate"
                  class="size-3"
                />
                <IconFa7SolidCheck
                  v-else-if="selectAllChecked"
                  class="size-3"
                />
              </span>
              <span class="min-w-0 wrap-anywhere select-none">{{ text.selectAll }}</span>
            </button>
            <span
              :id="selectAllStateId"
              class="sr-only"
            >{{ text.partiallySelected }}</span>
          </div>
        </div>
        <hr
          v-if="(shouldShowNewSuggestion || selectAllRendered) && displayOptionRows.length"
          aria-hidden="true"
          class="border-gray-100 dark:border-gray-700"
        >
        <div
          v-if="displayOptionRows.length"
          ref="virtualOptionsContainer"
          :class="shouldVirtualizeOptions ? 'relative shrink-0 overflow-clip' : 'flex flex-col gap-y-1 py-2'"
          :style="shouldVirtualizeOptions ? { height: `${virtualOptionsScrollHeight}px` } : undefined"
        >
          <div
            v-for="group in renderedOptionGroups"
            :key="group.key"
            :role="group.label !== undefined ? 'group' : undefined"
            :aria-label="group.label"
            :class="!shouldVirtualizeOptions ? 'flex flex-col gap-y-1' : undefined"
          >
            <template
              v-for="row in group.rows"
              :key="row.item.key"
            >
              <div
                v-if="row.item.kind === 'group'"
                aria-hidden="true"
                class="flex w-full px-4 py-2 text-sm text-left text-black dark:text-white font-semibold border-t border-gray-50 dark:border-gray-800"
                :class="{ 'border-t-0!': row.item.groupIndex === 0, 'absolute left-0 right-0 overflow-hidden': row.virtual }"
                :style="row.virtual ? { transform: `translateY(${row.virtual.offsetTop}px)`, height: `${row.virtual.height}px` } : undefined"
              >
                <!-- @slot Group heading content. Receives the group option and its display label. -->
                <slot
                  name="optionGroup"
                  :option="row.item.option"
                  :label="getGroupLabel(row.item.option)"
                >
                  {{ getGroupLabel(row.item.option) }}
                </slot>
              </div>
              <component
                :is="optionType === 'custom' ? 'div' : optionType"
                v-else
                :id="getOptionId(row.item.option)"
                :aria-posinset="row.item.position + (row.item.isRoot ? rootActionCount : 0)"
                :aria-setsize="row.item.setSize + (row.item.isRoot ? rootActionCount : 0)"
                :href="optionType === 'a' ? getHref(row.item.option) : undefined"
                :class="[
                  optionType !== 'custom' ? optionClass : 'cursor-pointer hover:text-black dark:hover:text-gray-100 hover:bg-gray-25 dark:hover:bg-gray-900',
                  {
                    'text-gray-700 dark:text-gray-100': !isDropdownItemActive(row.item.option),
                    'text-black dark:text-gray-100 font-semibold': isSelected(row.item.option) && type !== 'text',
                    'text-black dark:text-gray-100 bg-gray-25 dark:bg-gray-900': isDropdownItemActive(row.item.option),
                    'absolute left-0 right-0 overflow-hidden': row.virtual
                  }
                ]"
                :style="row.virtual ? { transform: `translateY(${row.virtual.offsetTop}px)`, height: `${row.virtual.height}px` } : undefined"
                :data-active="isDropdownItemActive(row.item.option)"
                :type="optionType === 'button' ? 'button' : undefined"
                tabindex="-1"
                role="option"
                :aria-selected="isOptionSelected(row.item.option) ? 'true' : 'false'"
                @mousedown="handleOptionMouseDown"
                v-on="optionType === 'custom' ? { clickCapture: captureCustomOptionClick } : {}"
                @click="handleOptionClick($event, row.item.option)"
              >
                <slot
                  v-if="optionType === 'custom'"
                  name="customOption"
                  :option-attrs="getCustomOptionAttrs()"
                  :class-list="{ 'flex w-full p-2 text-sm text-left': true }"
                  :data-active="isDropdownItemActive(row.item.option)"
                  :href="getHref(row.item.option)"
                  :tabindex="-1"
                  :option="row.item.option"
                  :label="getLabel(row.item.option)"
                  :on-click="(event?: Event) => handleCustomOptionClick(event, row.item.option)"
                >
                  {{ getLabel(row.item.option) }}
                </slot>
                <template v-else>
                  <span
                    v-if="isSelectType && multiple"
                    data-id="sds-combo-box-checkbox"
                    :class="checkboxClass"
                    aria-hidden="true"
                    :data-checked="isSelected(row.item.option)"
                  >
                    <IconFa7SolidCheck
                      v-if="isSelected(row.item.option)"
                      class="size-3"
                    />
                  </span>
                  <span
                    class="min-w-0 wrap-anywhere"
                    :class="{ truncate: row.virtual }"
                    :title="row.virtual ? getLabel(row.item.option) : undefined"
                  >
                    <slot
                      name="option"
                      :option="row.item.option"
                      :label="getLabel(row.item.option)"
                    >
                      {{ getLabel(row.item.option) }}
                    </slot>
                  </span>
                  <IconFa7SolidCheck
                    v-if="isSelected(row.item.option) && type !== 'text' && !multiple"
                    class="text-blue-700 dark:text-blue-400 ml-auto my-auto w-3 h-3 shrink-0"
                  />
                </template>
              </component>
            </template>
          </div>
        </div>
        <div
          v-if="pending"
          class="flex items-center gap-2 py-3 px-4 text-sm text-gray-600 dark:text-gray-400"
          data-id="sds-combo-box-loading"
        >
          <SdsLoadingSpinner
            aria-hidden="true"
            size="sm"
            class="shrink-0"
          />
          <span>{{ text.loading }}</span>
        </div>
        <div
          v-else-if="hasNoMatches && !shouldShowNewSuggestion"
          class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 italic"
          data-id="sds-combo-box-no-matches"
        >
          {{ text.noMatches(query) }}
        </div>
      </SdsScrollArea>
      <!-- Footer section -->
      <div
        v-if="!pending && !isSelected(query)"
        data-id="sds-combo-box-footer"
        class="grid items-start gap-2 border-t rounded-b-theme-sm border-gray-100 dark:border-gray-700 bg-gray-25 dark:bg-gray-900 px-3 py-2 text-xs text-gray-700 dark:text-gray-300 @min-[28rem]:flex @min-[28rem]:items-center @min-[28rem]:gap-6 @min-[28rem]:px-4 @min-[28rem]:text-sm"
        :class="isFlatArray || groups.length <= 1 ? 'grid-cols-2' : 'grid-cols-3'"
      >
        <div class="flex flex-col items-center gap-1 whitespace-nowrap @min-[28rem]:ml-auto @min-[28rem]:flex-row @min-[28rem]:gap-1.5">
          <div class="flex gap-1 p-1 border border-gray-100 dark:border-gray-500 rounded-theme-sm shadow-inner">
            <IconFa7SolidArrowUp
              class="w-3 h-3"
            />
            <IconFa7SolidArrowDown
              class="w-3 h-3"
            />
          </div>
          <span class="sr-only">{{ text.navigationKeys }}</span> {{ text.navigate }}
        </div>
        <div
          v-if="!isFlatArray && groups.length > 1"
          class="flex flex-col items-center gap-1 whitespace-nowrap @min-[28rem]:flex-row @min-[28rem]:gap-1.5"
        >
          <div class="flex gap-1 p-1 border border-gray-100 dark:border-gray-500 rounded-theme-sm shadow-inner">
            <span aria-hidden="true">{{ text.altKey }}</span>
            <IconFa7SolidArrowLeft
              class="w-3 h-3"
            />
            <IconFa7SolidArrowRight
              class="w-3 h-3"
            />
          </div>
          <span class="sr-only">{{ text.categoryKeys }}</span> {{ text.switchGroups }}
        </div>
        <div class="flex flex-col items-center gap-1 whitespace-nowrap @min-[28rem]:flex-row @min-[28rem]:gap-1.5">
          <span class="inline-block p-1 border text-xs font-mono border-gray-100 dark:border-gray-500 rounded-theme-sm shadow-inner">
            {{ text.enterKey }}
          </span>
          {{ text.select }}
        </div>
      </div>
    </div>
  </SdsFloatingUi>
</template>

<script setup lang="ts">
import SdsFloatingUi from '../FloatingUi/FloatingUi.vue'
import SdsTooltip from '../Tooltip/Tooltip.vue'
import SdsScrollArea from '../ScrollArea/ScrollArea.vue'
import SdsTag from '../Tag/Tag.vue'
import { useComboBoxCore, useFormField, useResizeObserver, useVirtualScroller } from '@/composables'
import type { ComboBoxGroup, ComboBoxSuggestion, ComboBoxType, VirtualListItem } from '@/composables'
import { normalizeString } from '@/composables/useComboBoxSuggestions'
import { comboBoxMessages, type ComboBoxMessages } from '@/composables/useComboBoxMessages'
import type { VNodeChild } from 'vue'
import { watchDebounced } from '@vueuse/core'

export type { ComboBoxSuggestionObject, ComboBoxSuggestion } from '@/composables'
export type { ComboBoxMessages } from '@/composables/useComboBoxMessages'

interface ComboBoxProps {
  /** Native form field name. Multiselect submits repeated entries with this name. */
  name?: string;
  /** ID of an associated form, including forms outside the component's ancestors. */
  form?: string;
  /** Stable string or numeric object field used for identity and form values; defaults to label matching. */
  optionValue?: string;
  /** Overrides visible copy and announcements for localization. */
  messages?: Partial<ComboBoxMessages>;
  /**
   * Focuses the text input when the ComboBox mounts.
   *
   * @default false
   */
  autofocus?: boolean;
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
   * Shows loading indicators in the input and open dropdown while blocking suggestion actions.
   *
   * Enable as soon as a remote search is queued, including debounce delay, until its results are applied.
   * An empty response may hide the dropdown but preserves the query so the user can refine it.
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
   * Select modes require at least one selected item. Validation errors focus the visible input.
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
   * @default false
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

type ComboBoxOptionSlotProps = {
  option: ComboBoxSuggestion;
  label: string;
}

type ComboBoxOptionGroupSlotProps = {
  option: ComboBoxSuggestion | ComboBoxGroup;
  label: string;
}

type ComboBoxCustomOptionSlotProps = ComboBoxOptionSlotProps & {
  optionAttrs: ComboBoxCustomOptionAttrs;
  href: string | undefined;
  classList: Record<string, boolean>;
  dataActive: boolean;
  tabindex: number;
  onClick: (event?: Event) => Promise<void>;
}

type ComboBoxCustomOptionAttrs = {
  role: 'presentation';
}

defineSlots<{
  default?: () => VNodeChild;
  option?: (props: ComboBoxOptionSlotProps) => VNodeChild;
  optionGroup?: (props: ComboBoxOptionGroupSlotProps) => VNodeChild;
  customOption?: (props: ComboBoxCustomOptionSlotProps) => VNodeChild;
}>()

defineOptions({ name: 'SdsComboBox', inheritAttrs: false })

const props = withDefaults(defineProps<ComboBoxProps>(), {
  name: undefined,
  form: undefined,
  optionValue: undefined,
  messages: undefined,
  autofocus: false,
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
  virtualize: false,
  virtualizeThreshold: 100,
  virtualItemHeight: 36
})

const emit = defineEmits(['close', 'complete', 'enter', 'focus', 'open', 'result'])

const scrollArea = ref()
const inputField = ref<HTMLInputElement>()
const virtualScrollContainer = ref<HTMLElement>()
const virtualOptionsContainer = ref<HTMLElement>()
const floatingUiRef = ref()
const dropdownRef = ref()
const componentId = useId()

const { validationClasses, validationAttrs } = useFormField(props)
const query = defineModel({ type: String, default: '' })
const selected = defineModel<ComboBoxSuggestion[]>('selected', { type: Array as () => ComboBoxSuggestion[], default: () => [] })
const showDropdown = ref(false)
const arrowCounter = ref(-1)
const shouldScrollActiveItem = ref(false)
const shouldAutoHighlightOnOpen = ref(false)
const ignoreNextFloatingUiClose = ref(false)
const shakeTimeout = ref<ReturnType<typeof window.setTimeout>>()
const isComposing = ref(false)
const compositionQuery = ref('')
const ignoreCompositionEnter = ref(false)
const selectionValidationAttempted = ref(false)
const selectionAnnouncement = ref('')
const resultsAnnouncement = ref('')
const actionFeedback = ref('')
const attrs = useAttrs()
const text = computed(() => ({
  ...comboBoxMessages,
  ...Object.fromEntries(Object.entries(props.messages ?? {}).filter(([, value]) => value !== undefined))
}))
const optionClass = 'flex items-center w-full sds-theme-forge:mx-2 sds-theme-plaid:px-4 p-2 sds-theme-forge:max-w-[calc(100%-1rem)] sds-theme-forge:rounded text-sm text-left list-none cursor-pointer hover:text-black dark:hover:text-gray-100 hover:bg-gray-25 dark:hover:bg-gray-900'
const checkboxClass = 'mr-2 flex size-4 shrink-0 items-center justify-center rounded border border-gray-400 bg-white dark:border-gray-500 dark:bg-gray-900 data-[checked=true]:border-blue-500 data-[checked=true]:bg-blue-500 data-[checked=true]:text-white'
const isInputAttribute = (key: string) => key.startsWith('aria-') || key.startsWith('on') ||
  ['tabindex', 'title', 'inputmode', 'enterkeyhint', 'autocomplete', 'autocapitalize', 'autocorrect', 'spellcheck', 'minlength', 'pattern'].includes(key)
const getInputAttrs = () => Object.fromEntries(Object.entries(attrs).filter(([key]) => isInputAttribute(key) &&
  !['aria-label', 'aria-labelledby', 'aria-describedby', 'aria-invalid', 'aria-busy', 'aria-controls', 'aria-expanded', 'aria-activedescendant', 'aria-required', 'aria-readonly', 'aria-disabled'].includes(key)))
const getRootAttrs = () => Object.fromEntries(Object.entries(attrs).filter(([key]) => !isInputAttribute(key)))
const getAriaAttribute = (name: 'aria-label' | 'aria-labelledby' | 'aria-describedby'): string | undefined => {
  const value = attrs[name]
  return typeof value === 'string' ? value : undefined
}
// True when arrowCounter was set automatically (on dropdown open/query change) rather than by
// explicit arrow-key navigation. In this state the input shows the user's query, not the
// highlighted item's label.
const autoFocused = ref(false)

const inputId = computed(() => props.id ?? `${componentId}-input`)
const dropdownId = computed(() => `${componentId}-listbox`)
const selectionErrorId = computed(() => `${componentId}-error`)
const selectionSummaryId = computed(() => `${componentId}-selection`)
const selectAllStateId = computed(() => `${componentId}-select-all-state`)
const feedbackId = computed(() => `${componentId}-feedback`)

type ComboBoxOptionRow = {
  kind: 'option';
  option: ComboBoxSuggestion;
  key: string;
  groupKey: number;
  position: number;
  setSize: number;
  isRoot: boolean;
}

type ComboBoxDisplayRow =
  | { kind: 'group'; option: ComboBoxSuggestion; key: string; groupIndex: number; groupKey: number }
  | ComboBoxOptionRow

type ComboBoxDisplayGroup = {
  key: number;
  label?: string;
  rows: ComboBoxDisplayRow[];
}

type ComboBoxRenderedGroup = Omit<ComboBoxDisplayGroup, 'rows'> & {
  rows: { item: ComboBoxDisplayRow; virtual?: VirtualListItem<ComboBoxDisplayRow> }[];
}

const {
  findOriginalSuggestion,
  getOptionValue,
  sameOption,
  findSelectedIndex,
  addSelection,
  replaceSelection,
  removeSelectionAt,
  clearSelections,
  isSelected,
  resolveSuggestion,
  toggleSelections,
  selectAllChecked,
  selectAllIndeterminate,
  selectAllRendered,
  addSuggestion,
  activeGroupKey,
  isSelectType,
  getLabel,
  getGroupLabel,
  getChildren,
  getHref,
  countVisibleOptions,
  groups,
  suggestionOptions,
  shouldShowNewSuggestion,
  hasDropdownSuggestion,
  isFlatArray,
  hasCategories,
  hasNoMatches,
  dropdownItems,
  activeItem,
  getDropdownItem,
  lastDropdownItemIndex,
  firstItemIndex,
  isDropdownItemActive,
  isAddSuggestionActive,
  getCurrentGroupOptions,
  setQuery,
  setUserQuery
} = useComboBoxCore({
  suggestions: () => props.suggestions,
  query,
  selected,
  arrowCounter,
  type: () => props.type,
  multiple: () => props.multiple,
  enableSelectAll: () => props.enableSelectAll,
  filterSuggestions: () => props.filterSuggestions,
  optionLabel: () => props.optionLabel,
  optionValue: () => props.optionValue,
  allGroupLabel: () => text.value.all,
  optionGroupLabel: () => props.optionGroupLabel,
  optionGroupChildren: () => props.optionGroupChildren,
  disableGroupTabs: () => props.disableGroupTabs,
  debounceComplete: () => props.debounceComplete,
  onComplete: value => emit('complete', value),
  onShowDropdown: () => {
    if (props.disabled || props.readonly || isComposing.value) return
    openDropdown()
  }
})

const getDropdownItemId = (index: number) => `${componentId}-option-${index}`
const getOptionId = (option: ComboBoxSuggestion) => {
  const item = getDropdownItem(option)
  return item ? getDropdownItemId(item.index) : undefined
}
const getAddSuggestionId = () => {
  const item = getDropdownItem(addSuggestion.value)
  return item ? getDropdownItemId(item.index) : undefined
}
const isOptionSelected = (option: ComboBoxSuggestion): boolean => {
  return isSelectType.value ? isSelected(option) : isDropdownItemActive(option)
}
const getCustomOptionAttrs = (): ComboBoxCustomOptionAttrs => ({ role: 'presentation' })
const isOptionLinkEvent = (event: Event): boolean => {
  const link = event.target instanceof Element ? event.target.closest('a[href]') : null
  return !!link && event.currentTarget instanceof Element && event.currentTarget.contains(link)
}
const handleOptionMouseDown = (event: MouseEvent) => {
  if (!isOptionLinkEvent(event)) event.preventDefault()
}
const handleOptionClick = (event: MouseEvent, option: ComboBoxSuggestion) => {
  if (isOptionLinkEvent(event)) return
  event.preventDefault()
  return handleSuggestionClick(option)
}
let customOptionClickEvent: Event | undefined
const captureCustomOptionClick = (event: Event) => {
  customOptionClickEvent = event
  queueMicrotask(() => {
    if (customOptionClickEvent === event) customOptionClickEvent = undefined
  })
}
const handleCustomOptionClick = async (event: Event | undefined, option: ComboBoxSuggestion) => {
  const clickEvent = event ?? customOptionClickEvent
  if (clickEvent instanceof MouseEvent && isOptionLinkEvent(clickEvent) &&
    (clickEvent.button !== 0 || clickEvent.ctrlKey || clickEvent.metaKey || clickEvent.shiftKey || clickEvent.altKey)) return
  clickEvent?.stopPropagation()
  return handleSuggestionClick(option)
}
const activeDescendantId = computed(() => {
  if (props.pending || !shouldShowDropdown.value) return undefined
  const item = activeItem.value
  if (!item || (item.kind === 'add' && isSelected(query.value))) return undefined
  return getDropdownItemId(item.index)
})

const shouldVirtualizeOptions = computed(() => {
  return !props.pending && props.virtualize &&
    props.optionType !== 'custom' &&
    countVisibleOptions(suggestionOptions.value) >= props.virtualizeThreshold
})

const optionLayout = computed(() => {
  const rows: ComboBoxDisplayRow[] = []
  const groups: ComboBoxDisplayGroup[] = []
  const groupsByKey = new Map<number, ComboBoxDisplayGroup>()
  const optionRowIndices = new Map<ComboBoxSuggestion, number>()
  const rootOptions: ComboBoxOptionRow[] = []

  const appendOption = (option: ComboBoxSuggestion, key: string, group: ComboBoxDisplayGroup) => {
    const row: ComboBoxOptionRow = {
      kind: 'option', option, key, groupKey: group.key,
      position: 0, setSize: 0, isRoot: group.label === undefined
    }
    if (!optionRowIndices.has(option)) optionRowIndices.set(option, rows.length)
    rows.push(row)
    group.rows.push(row)
    if (row.isRoot) rootOptions.push(row)
  }

  for (const [index, suggestion] of (props.pending ? [] : suggestionOptions.value).entries()) {
    const children = getChildren(suggestion)
    const previous = groups.at(-1)
    const group: ComboBoxDisplayGroup = !children.length && previous && previous.label === undefined
      ? previous
      : { key: index, label: children.length ? getGroupLabel(suggestion) : undefined, rows: [] }
    if (group !== previous) {
      groups.push(group)
      groupsByKey.set(group.key, group)
    }
    if (children.length) {
      if (activeGroupKey.value === -1) {
        const heading: ComboBoxDisplayRow = {
          kind: 'group', option: suggestion, key: `group-${index}-${getGroupLabel(suggestion)}`,
          groupIndex: index, groupKey: group.key
        }
        rows.push(heading)
        group.rows.push(heading)
      }
      children.forEach((child, childIndex) => appendOption(child, `option-${index}-${childIndex}-${getLabel(child)}`, group))
      const options = group.rows.filter(row => row.kind === 'option')
      options.forEach((row, optionIndex) => {
        row.position = optionIndex + 1
        row.setSize = options.length
      })
    } else {
      appendOption(suggestion, `option-${index}-${getLabel(suggestion)}`, group)
    }
  }
  rootOptions.forEach((row, index) => {
    row.position = index + 1
    row.setSize = rootOptions.length
  })
  return { rows, groups, groupsByKey, optionRowIndices, rootOptionCount: rootOptions.length }
})

const displayOptionRows = computed(() => optionLayout.value.rows)
const rootActionCount = computed(() => dropdownItems.value.filter(item => item.kind !== 'option').length)
const rootOptionSetSize = computed(() => rootActionCount.value + optionLayout.value.rootOptionCount)
const activeVirtualRowIndex = computed(() => {
  const active = activeItem.value
  return active?.kind === 'option' ? optionLayout.value.optionRowIndices.get(active.option) ?? -1 : -1
})

const {
  virtualItems: virtualSuggestionRows,
  scrollHeight: virtualOptionsScrollHeight,
  onScroll: onVirtualScroll,
  scrollToIndex: scrollToVirtualIndex,
  setScrollTop: setVirtualScrollTop
} = useVirtualScroller<ComboBoxDisplayRow>({
  items: displayOptionRows,
  itemHeight: () => props.virtualItemHeight,
  containerRef: virtualScrollContainer,
  containerHeight: 288,
  scrollOffset: getVirtualOptionsOffset,
  overscan: 6,
  pinnedIndices: () => activeVirtualRowIndex.value < 0 ? [] : [activeVirtualRowIndex.value],
  getKey: item => item.key
})

const renderedOptionGroups = computed<ComboBoxRenderedGroup[]>(() => {
  if (!shouldVirtualizeOptions.value) {
    return optionLayout.value.groups.map(group => ({
      ...group,
      rows: group.rows.map(item => ({ item }))
    }))
  }

  const groups = new Map<number, ComboBoxRenderedGroup>()
  for (const virtual of virtualSuggestionRows.value) {
    const group = optionLayout.value.groupsByKey.get(virtual.item.groupKey)
    if (!group) continue
    let renderedGroup = groups.get(group.key)
    if (!renderedGroup) {
      renderedGroup = { key: group.key, label: group.label, rows: [] }
      groups.set(group.key, renderedGroup)
    }
    renderedGroup.rows.push({ item: virtual.item, virtual })
  }
  return [...groups.values()]
})

const defaultItemIndex = computed(() => {
  if (props.pending) return -1
  const exact = dropdownItems.value.find(item => item.kind === 'option' && normalizeString(getLabel(item.option)) === normalizeString(query.value))
  if (query.value.trim() && exact) return exact.index
  if (props.type === 'taggable-select' && query.value.trim() && (isSelected(query.value) || findOriginalSuggestion(query.value))) return -1
  if (props.type === 'select' && query.value.trim()) {
    return dropdownItems.value.find(item => item.kind === 'option' && normalizeString(getLabel(item.option)).includes(normalizeString(query.value)))?.index ?? -1
  }
  return firstItemIndex.value
})

const comboBoxTabs = computed(() => groups.value.map((group: ComboBoxGroup) => ({
  key: String(group.key),
  title: group.label,
  count: group.count,
  active: String(group.key) === String(activeGroupKey.value) && group.count > 0,
  disabled: group.count < 1
})))

// Selected values use the same tag bar in single- and multi-select modes.
const showTagsBar = computed(() => isSelectType.value && selected.value.length > 0)

const isMultiselect = computed(() => isSelectType.value && props.multiple)
const selectAllIndex = computed(() => dropdownItems.value.find(item => item.kind === 'select-all')?.index ?? -1)

const hasValidSelection = computed(() => selected.value.some(option => getLabel(option).trim() !== ''))
const inputRequired = computed(() => props.required && (!isSelectType.value || !hasValidSelection.value))
const selectionMissing = computed(() => isSelectType.value && props.required && !hasValidSelection.value && !props.disabled && !props.readonly)
const selectionValidationMessage = computed(() => props.type === 'taggable-select'
  ? text.value.requiredTaggable
  : text.value.requiredSelect)
const showSelectionError = computed(() => selectionValidationAttempted.value && selectionMissing.value)
const getInputDescriptionIds = () => [
  getAriaAttribute('aria-describedby'),
  showTagsBar.value ? selectionSummaryId.value : undefined,
  showSelectionError.value ? selectionErrorId.value : undefined,
  actionFeedback.value ? feedbackId.value : undefined
].filter(Boolean).join(' ') || undefined

watchEffect(() => {
  inputField.value?.setCustomValidity(selectionMissing.value ? selectionValidationMessage.value : '')
  if (!selectionMissing.value) selectionValidationAttempted.value = false
}, { flush: 'post' })

const handleInvalid = () => {
  if (!selectionMissing.value) return
  selectionValidationAttempted.value = true
}

watch(() => [...selected.value], (items, previousItems) => {
  if (!isSelectType.value) return
  const added = items.filter(item => !previousItems.some(previous => sameOption(item, previous))).map(getLabel)
  const removed = previousItems.filter(item => !items.some(current => sameOption(item, current))).map(getLabel)
  const changes = [
    removed.length ? text.value.removed(removed) : '',
    added.length ? text.value.added(added) : ''
  ].filter(Boolean)
  if (changes.length) {
    selectionAnnouncement.value = `${changes.join(' ')} ${text.value.selectedCount(items.length)}`
  }
})

// Size-based padding class for the clear button.
const clearButtonClass = computed(() => {
  if (props.size === 'sm') return 'px-1'
  if (props.size === 'lg') return 'px-3'
  return 'px-2'
})

// Size-based icon class for the search/loading indicator.
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

const showClearButton = computed(() => !props.disabled && !props.readonly && query.value !== '')

const showDropdownResults = () => {
  if (props.readonly || props.disabled || isComposing.value) return
  if (!props.pending && !hasDropdownSuggestion.value && !hasNoMatches.value) return
  inputField.value?.focus()
  if (showDropdown.value) return
  openDropdown()
}

const toggleSelectAll = () => {
  if (props.disabled || props.readonly || props.pending || isComposing.value) return
  actionFeedback.value = ''
  toggleSelections(getCurrentGroupOptions())
}

// Computed property for input display value
const inputDisplayValue = computed(() => {
  if (isComposing.value) return compositionQuery.value
  // If a suggestion is highlighted via explicit arrow-key navigation, show its label.
  // When autoFocused is true the highlight was set automatically (on dropdown open/query change)
  // and we intentionally keep showing the user's typed query instead.
  if (!props.pending && showDropdown.value && arrowCounter.value !== -1 && !autoFocused.value && suggestionOptions.value.length > 0) {
    // Find the suggestion with the current arrowCounter
    const active = activeItem.value
    if (active && active.kind !== 'select-all') {
      return getLabel(active.option)
    }
  }
  // Otherwise, show the query
  return query.value
})

const initialQuery = query.value
const initialSelected = [...selected.value]
useEventListener(() => props.form && typeof document !== 'undefined' ? document.getElementById(props.form) : inputField.value?.form, 'reset', (event: Event) => {
  queueMicrotask(async () => {
    if (event.defaultPrevented) return
    selected.value = [...initialSelected]
    setQuery(initialQuery)
    closeDropdown({ resetSelectDisplay: false })
    selectionValidationAttempted.value = false
    actionFeedback.value = ''
    await nextTick()
    if (inputField.value) inputField.value.value = inputDisplayValue.value
  })
})
onMounted(() => { if (props.autofocus) inputField.value?.focus() })

onBeforeUnmount(() => {
  if (shakeTimeout.value) window.clearTimeout(shakeTimeout.value)
})

const isTriggerableAction = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false
  return !!target.closest('button, a[href], input, select, textarea, label, summary, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])')
}

const handleTriggerMouseDown = (event: MouseEvent) => {
  if (props.disabled || isTriggerableAction(event.target)) return
  inputField.value?.focus()
}

const resetSelectDisplayOnClose = () => {
  if (isSelectType.value) setQuery('')
}

const resetActiveOption = () => {
  arrowCounter.value = -1
  autoFocused.value = false
}

const highlightDefaultOption = () => {
  arrowCounter.value = defaultItemIndex.value
  autoFocused.value = true
}

const openDropdown = (direction?: 'up' | 'down') => {
  shouldAutoHighlightOnOpen.value = direction === undefined
  showDropdown.value = true
  if (direction) {
    activeGroupKey.value = -1
    arrowCounter.value = direction === 'down' ? defaultItemIndex.value : lastDropdownItemIndex()
    autoFocused.value = false
  }
}

type CloseDropdownOptions = {
  resetSelectDisplay?: boolean;
}

const closeDropdown = (options: CloseDropdownOptions = {}) => {
  showDropdown.value = false
  actionFeedback.value = ''
  if (options.resetSelectDisplay !== false) resetSelectDisplayOnClose()
  resetActiveOption()
}

onKeyStroke('Escape', (e: KeyboardEvent) => {
  if (isComposing.value || e.isComposing || e.keyCode === 229) return
  if (!showDropdown.value) return
  e.preventDefault()
  closeDropdown({ resetSelectDisplay: false })
})

// When FloatingUi closes externally (click-outside, Escape), sync local state
const onFloatingUiClose = () => {
  if (ignoreNextFloatingUiClose.value) {
    ignoreNextFloatingUiClose.value = false
    return
  }
  closeDropdown()
}

onKeyStroke('/', (e: KeyboardEvent) => {
  if (!props.focusOnKeyPress) return
  if (!e.target) return
  const tagName = (e.target as HTMLElement).tagName.toLowerCase()
  if (["textarea", "input", "select"].includes(tagName)) return
  e.preventDefault()
  inputField.value?.focus()
})

const getScrollAreaElement = (): HTMLElement | undefined => {
  if (!scrollArea.value) return undefined
  const element = scrollArea.value instanceof HTMLElement ? scrollArea.value : scrollArea.value.$el
  virtualScrollContainer.value = element
  return element
}

function getVirtualOptionsOffset(): number {
  const parent = getScrollAreaElement()
  const child = virtualOptionsContainer.value
  if (!parent || !child) return 0
  const parentTop = parent.getBoundingClientRect().top
  const childTop = child.getBoundingClientRect().top
  return Math.max(0, childTop - parentTop + parent.scrollTop)
}

const resetVirtualScroll = () => {
  const parent = getScrollAreaElement()
  if (shouldVirtualizeOptions.value) setVirtualScrollTop(0)
  if (parent) parent.scrollTop = 0
}

const syncDropdownScroll = async () => {
  await nextTick()
  resetVirtualScroll()
  if (!autoFocused.value || isAddSuggestionActive.value) await scrollToChild()
}

const scrollToChild = async () => {
  await nextTick()
  if (shouldVirtualizeOptions.value) {
    getScrollAreaElement()
    const active = activeItem.value

    if (active?.kind === 'option') {
      const virtualIndex = activeVirtualRowIndex.value
      if (virtualIndex === -1) return
      const alignment = active.index === lastDropdownItemIndex() ? 'end' : 'auto'
      scrollToVirtualIndex(virtualIndex, alignment)
    } else if (active?.kind === 'add') {
      setVirtualScrollTop(0)
      const parent = getScrollAreaElement()
      if (parent) parent.scrollTop = 0
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

useResizeObserver(virtualScrollContainer, (entry) => {
  // FloatingUi initially mounts at zero width before applying its position and width.
  if (entry.contentRect.width > 0 && shouldShowDropdown.value && !autoFocused.value) syncDropdownScroll()
})

const clearQuery = () => {
  if (props.disabled || props.readonly) return
  actionFeedback.value = ''
  setQuery('')
  closeDropdown({ resetSelectDisplay: false })
  inputField.value?.focus()
}

const shake = (message = query.value.trim() ? text.value.chooseSuggestion : text.value.emptyValue) => {
  actionFeedback.value = message
  if (!inputField.value) return
  inputField.value.classList.add('animate-shake')
  if (shakeTimeout.value) window.clearTimeout(shakeTimeout.value)
  shakeTimeout.value = window.setTimeout(() => {
    inputField.value?.classList.remove('animate-shake')
    shakeTimeout.value = undefined
  }, 500)
}

const multiselectRemove = (index: number) => {
  if (props.disabled || props.readonly) return
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
  if (props.disabled || props.readonly || !inputField.value) return
  if (selected.value.length && props.type === 'text' && inputField.value.value === '') {
    clearSelections()
    return
  }
  if (selected.value.length && props.type === 'text') removeSelectionAt(selected.value.length - 1)
  // Only remove a selected tag when there is no search text to edit.
  if (selected.value.length && !props.multiple && isSelectType.value && inputField.value.value === '') {
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

// Input handler for the input field (replaces v-model)
const onInputFieldInput = (e: Event) => {
  if (props.disabled || props.readonly) return
  const target = e.target
  if (!(target instanceof HTMLInputElement)) return
  if (isComposing.value || (e instanceof InputEvent && e.isComposing)) {
    compositionQuery.value = target.value
    return
  }
  shouldAutoHighlightOnOpen.value = true
  actionFeedback.value = ''
  setUserQuery(target.value)
  handleInput()
}

const onCompositionStart = () => {
  compositionQuery.value = inputField.value?.value ?? ''
  isComposing.value = true
}

const onCompositionEnd = (event: CompositionEvent) => {
  isComposing.value = false
  ignoreCompositionEnter.value = true
  onInputFieldInput(event)
}

const handleInputKeydown = (event: KeyboardEvent) => {
  if (isComposing.value || event.isComposing || event.keyCode === 229) {
    event.stopPropagation()
    return
  }
  ignoreCompositionEnter.value = false
  if (props.disabled || props.readonly) return
  switch (event.key) {
    case 'Enter':
      if (shouldShowDropdown.value || (props.type === 'taggable-select' && query.value.trim())) event.preventDefault()
      break
    case 'Backspace':
    case 'Delete':
      handleDelete()
      break
    case 'Tab':
      closeDropdown()
      break
    case 'ArrowUp':
    case 'ArrowDown':
      if (event.ctrlKey || event.metaKey || event.shiftKey) return
      if (event.altKey) {
        event.preventDefault()
        if (event.key === 'ArrowUp') closeDropdown()
        else showDropdownResults()
        return
      }
      if (props.pending) {
        event.preventDefault()
        showDropdownResults()
        return
      }
      if (!hasDropdownSuggestion.value && !hasNoMatches.value) return
      event.preventDefault()
      handleArrows(event.key === 'ArrowUp' ? 'up' : 'down', event)
      break
    case 'ArrowLeft':
    case 'ArrowRight':
      if (event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey && hasCategories.value && shouldShowDropdown.value) {
        handleArrows(event.key === 'ArrowLeft' ? 'left' : 'right', event)
      }
      break
  }
}

const handleInput = async () => {
  await nextTick()
  // Prefer adding custom text unless the user explicitly navigates to a suggestion.
  if (showDropdown.value) {
    shouldAutoHighlightOnOpen.value = true
    highlightDefaultOption()
    if (isAddSuggestionActive.value) await scrollToChild()
  }
}

const commitSelection = () => {
  if (!query.value.trim() && !selected.value.length) {
    shake()
    return
  }
  selected.value = selected.value.length ? selected.value : [query.value]
  if (!isMultiselect.value) closeDropdown({ resetSelectDisplay: isSelectType.value })
  emitEnter()
}

const handleSuggestionClick = async (option: ComboBoxSuggestion) => {
  if (props.disabled || props.readonly || props.pending || isComposing.value) return
  if (!getLabel(option).trim()) {
    shake(text.value.emptyValue)
    return
  }
  actionFeedback.value = ''
  const { normalizedOption, emitValue } = resolveSuggestion(option)

  // For type="text", update the query to the suggestion's label
  if (props.type === 'text') {
    setQuery(getLabel(normalizedOption))
  }
  if (!props.multiple) {
    replaceSelection(normalizedOption)
  } else {
    const index = findSelectedIndex(normalizedOption)
    if (index === -1) addSelection(normalizedOption)
    else removeSelectionAt(index)
  }
  // Reset the query and close before rendering an intermediate "Already added" state.
  if (props.type !== 'text') {
    setQuery('')
  }
  if (isMultiselect.value) {
    resetActiveOption()
  } else {
    closeDropdown({ resetSelectDisplay: false })
  }
  await nextTick()
  emit('result', emitValue)
  inputField.value?.focus()
}

const handleEnterKeyUp = async (event: KeyboardEvent | MouseEvent) => {
  if (props.disabled || props.readonly) return
  if (event instanceof KeyboardEvent && (isComposing.value || event.isComposing || event.keyCode === 229 || ignoreCompositionEnter.value)) {
    ignoreCompositionEnter.value = false
    return
  }
  if (props.pending) {
    shake(text.value.loading)
    return
  }
  const currentItem = shouldShowDropdown.value ? activeItem.value : undefined
  if (currentItem?.kind === 'select-all') {
    toggleSelectAll()
    return
  }
  if (currentItem) {
    if (currentItem.kind === 'add' && isSelected(query.value)) {
      shake(text.value.alreadyAdded(query.value.trim()))
      return
    }
    await handleSuggestionClick(currentItem.option)
    return
  }
  if (props.type === 'text') {
    commitSelection()
    return
  }
  if (query.value.trim()) {
    if (isSelected(query.value)) {
      shake(text.value.alreadyAdded(query.value.trim()))
      return
    }
    const exact = findOriginalSuggestion(query.value)
    if (exact) {
      await handleSuggestionClick(exact)
      return
    }
    if (props.type === 'taggable-select') {
      await handleSuggestionClick(addSuggestion.value)
      return
    }
  }
  if (!query.value.trim() && hasValidSelection.value && !shouldShowDropdown.value) emitEnter()
  else shake()
}

const handleArrows = async (direction: 'up' | 'down' | 'left' | 'right', event: KeyboardEvent) => {
  if (props.disabled || props.readonly || props.pending || isComposing.value) return
  // SSR guard: ensure dropdownRef.value exists before querying
  const activeTab = (dropdownRef.value?.querySelector('button.tab[data-active="true"]') as HTMLElement) || null

  if (direction === 'up' || direction === 'down') {
    // Show dropdown if not already shown and there are suggestions
    if (!showDropdown.value && hasDropdownSuggestion.value) {
      event.preventDefault()
      openDropdown(direction)
      activeTab?.blur()
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
          inputField.value?.focus()
          return
        }
      }

      const lastIdx = lastDropdownItemIndex()
      if (arrowCounter.value > -1) {
        arrowCounter.value--
      } else {
        arrowCounter.value = lastIdx
      }
      break
    }
    // Allow left/right arrow navigation only if categories are shown and input is not focused
    case 'left':
      if (hasCategories.value && shouldShowDropdown.value) {
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
      if (hasCategories.value && shouldShowDropdown.value) {
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
  if (props.disabled || props.readonly) return false
  if (!showDropdown.value) return false
  if (props.pending) return true
  if (!hasDropdownSuggestion.value && !hasNoMatches.value) return false
  return true
})

watchDebounced(() => [
  props.pending,
  shouldShowDropdown.value,
  countVisibleOptions(suggestionOptions.value),
  shouldShowNewSuggestion.value ? query.value : '',
  activeGroupKey.value
] as const, ([pending, open, count]) => {
  if (pending) {
    resultsAnnouncement.value = text.value.loading
  } else if (open) {
    const category = hasCategories.value ? `${groups.value.find(group => group.key === activeGroupKey.value)?.label ?? text.value.all}. ` : ''
    const countMessage = `${category}${text.value.results(count)}`
    const addMessage = shouldShowNewSuggestion.value && !isSelected(query.value)
      ? ` ${text.value.addHint(query.value.trim())}`
      : ''
    resultsAnnouncement.value = `${countMessage}${addMessage}`
  } else {
    resultsAnnouncement.value = ''
  }
}, { debounce: 200 })

watch(shouldShowDropdown, async (val) => {
  const preserveQueryWhilePending = !val && props.pending
  // Explicit closes already reset the query; empty results only hide the popup.
  const shouldResetSelectDisplay = !val && showDropdown.value && !props.pending && (props.disabled || props.readonly)
  // Drive FloatingUi open/close state
  if (val) {
    if (shouldAutoHighlightOnOpen.value) highlightDefaultOption()
    shouldAutoHighlightOnOpen.value = false
    await floatingUiRef.value?.onOpen()
    if (!shouldShowDropdown.value) return
    emit('open')
  } else {
    ignoreNextFloatingUiClose.value = true
    await floatingUiRef.value?.onClose()
    await nextTick()
    ignoreNextFloatingUiClose.value = false
    emit('close')
  }
  // Auto-focus the default action so the user can press Enter immediately.
  // autoFocused keeps the typed query visible in the input (no label substitution).
  if (val) {
    await syncDropdownScroll()
  } else {
    resetActiveOption()
    if (!preserveQueryWhilePending) shouldAutoHighlightOnOpen.value = false
    if (shouldResetSelectDisplay) resetSelectDisplayOnClose()
  }
  activeGroupKey.value = -1
})

watch(activeGroupKey, async () => {
  if (!shouldShowDropdown.value) return
  highlightDefaultOption()
  await syncDropdownScroll()
})

watch(displayOptionRows, async () => {
  if (!props.pending && actionFeedback.value === text.value.loading) actionFeedback.value = ''
  if (!shouldShowDropdown.value) return
  if (props.pending) {
    autoFocused.value = true
    activeGroupKey.value = -1
  }
  if (autoFocused.value) highlightDefaultOption()
  await syncDropdownScroll()
})

watch(dropdownItems, (items, previousItems) => {
  if (!shouldShowDropdown.value || autoFocused.value) return
  const previous = previousItems.find(item => item.index === arrowCounter.value)
  if (previous?.kind !== 'option') return
  arrowCounter.value = items.find(item => item.kind === 'option' && sameOption(item.option, previous.option))?.index ?? -1
})
</script>
