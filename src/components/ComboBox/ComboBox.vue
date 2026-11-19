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
    :close-on-escape="false"
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
        @focus.capture="handleFieldFocus"
        @blur.capture="handleFieldBlur"
        @keydown.esc="handleEscape"
        @keyup.esc="handleEscapeKeyup"
      >
        <div
          v-if="showTagsBar"
          class="form-border border-b-0 rounded-t-theme-sm bg-gray-25 dark:bg-gray-900/50 flex flex-row flex-wrap gap-1 p-2 justify-start w-full"
          :class="[validationClasses, { invalid: showSelectionError }]"
        >
          <SdsTag
            v-for="(option, index) in visibleTags"
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
          <button
            v-if="hasHiddenTags || tagsExpanded"
            type="button"
            data-id="sds-combo-box-tags-toggle"
            :disabled="disabled"
            class="px-2 text-sm text-blue-700 dark:text-blue-400 hover:underline"
            :aria-expanded="tagsExpanded"
            @click="tagsExpanded = !tagsExpanded"
          >
            {{ tagsExpanded ? text.showFewerSelections : text.moreSelections(selected.length - visibleTags.length) }}
          </button>
        </div>
        <div
          class="input-group"
          :class="[
            validationClasses,
            {
              invalid: showSelectionError,
              'input-group-sm': size === 'sm',
              'input-group-lg': size === 'lg',
              '[&>.input-group-addon]:flex-none': usesDropdownSearch,
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
            :aria-controls="controlledPopupId"
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
            v-else-if="pending"
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
          <button
            v-if="usesDropdownSearch"
            :id="inputId"
            ref="inputField"
            type="button"
            role="combobox"
            aria-autocomplete="none"
            :aria-haspopup="hasSuggestionSource ? 'dialog' : undefined"
            :form="form"
            :value="inputDisplayValue"
            :aria-label="getAriaAttribute('aria-label')"
            :aria-labelledby="getAriaAttribute('aria-labelledby')"
            :aria-describedby="getInputDescriptionIds()"
            :aria-invalid="invalid || showSelectionError || undefined"
            :aria-busy="pending || undefined"
            :aria-controls="controlledPopupId"
            :aria-expanded="shouldShowDropdown ? 'true' : 'false'"
            :aria-required="required || undefined"
            :aria-readonly="readonly || undefined"
            :disabled="disabled || undefined"
            v-bind="getInputAttrs()"
            class="form-control min-w-0 w-0 flex-1 text-left select-none cursor-pointer disabled:cursor-not-allowed"
            @click="toggleDropdownResults"
            @keydown="handleInputKeydown"
            @keyup.enter="handleEnterKeyUp"
          >
            <span
              class="block truncate"
              :class="{ 'italic text-gray-400': !inputDisplayValue }"
            >{{ inputDisplayValue || placeholder || '\u00a0' }}</span>
          </button>
          <input
            v-else
            :id="inputId"
            ref="inputField"
            :name="!isSelectType ? name : undefined"
            :form="form"
            :value="inputDisplayValue"
            type="text"
            role="combobox"
            :aria-autocomplete="hasSuggestionSource && !usesDropdownSearch ? 'list' : 'none'"
            :aria-haspopup="hasSuggestionSource && usesDropdownSearch ? 'dialog' : undefined"
            :aria-label="getAriaAttribute('aria-label')"
            :aria-labelledby="getAriaAttribute('aria-labelledby')"
            :aria-describedby="getInputDescriptionIds()"
            :aria-invalid="invalid || showSelectionError || undefined"
            :aria-busy="pending || undefined"
            :aria-controls="controlledPopupId"
            :aria-expanded="shouldShowDropdown ? 'true' : 'false'"
            :aria-activedescendant="usesDropdownSearch ? undefined : activeDescendantId"
            :multiple="multiple || undefined"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            autocorrect="off"
            v-bind="{ ...validationAttrs, ...getInputAttrs() }"
            class="form-control truncate overflow-hidden text-ellipsis whitespace-nowrap"
            :placeholder="placeholder || undefined"
            :disabled="disabled || undefined"
            :readonly="readonly || usesDropdownSearch || undefined"
            :maxlength="maxlength !== undefined ? maxlength : undefined"
            :required="inputRequired || undefined"
            @input="onInputFieldInput"
            @compositionstart="onCompositionStart"
            @compositionend="onCompositionEnd"
            @invalid="handleInvalid"
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
              <span class="sr-only">{{ clearButtonLabel }}</span>
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
            v-else-if="isSelectType && (usesDropdownSearch || hasDropdownSuggestion)"
            data-id="sds-combo-box-select-caret"
            type="button"
            tabindex="-1"
            class="input-group-addon cursor-pointer disabled:cursor-not-allowed"
            :aria-controls="controlledPopupId"
            :aria-expanded="shouldShowDropdown ? 'true' : 'false'"
            :disabled="disabled || readonly || undefined"
            @click="toggleDropdownResults"
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
        <!-- Read-only triggers do not participate in native constraint validation. -->
        <select
          v-if="usesDropdownSearch && required"
          ref="selectionField"
          class="sr-only"
          tabindex="-1"
          aria-hidden="true"
          :form="form"
          :disabled="disabled || readonly"
          required
          @invalid.prevent="handleSelectionInvalid"
          @focus="inputField?.focus()"
        >
          <option
            :value="hasValidSelection ? 'selected' : ''"
            selected
          >
            {{ selected.length ? getLabel(selected[0]) : '' }}
          </option>
        </select>
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
      :id="usesDropdownSearch ? popupId : undefined"
      ref="dropdownRef"
      data-id="sds-combo-box-dropdown"
      class="@container"
      :role="usesDropdownSearch ? 'dialog' : undefined"
      :aria-label="usesDropdownSearch ? text.suggestions : undefined"
      @focus.capture="handleFieldFocus"
      @blur.capture="handleFieldBlur"
      @keydown="handlePopupKeydown"
      @keydown.esc="handleEscape"
      @keyup.esc="handleEscapeKeyup"
    >
      <div
        v-if="usesDropdownSearch"
        class="p-2 border-b border-gray-100 dark:border-gray-800"
      >
        <input
          :id="`${inputId}-filter`"
          ref="searchField"
          data-id="sds-combo-box-filter"
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          :aria-label="text.searchSuggestions"
          :aria-controls="dropdownId"
          :aria-expanded="shouldShowDropdown && !hasError && (pending || hasDropdownSuggestion) ? 'true' : 'false'"
          :aria-activedescendant="activeDescendantId"
          :aria-describedby="getInputDescriptionIds()"
          :aria-busy="pending || undefined"
          :value="isComposing ? compositionQuery : query"
          :placeholder="text.searchSuggestions"
          :maxlength="maxlength"
          class="form-control"
          :class="{ 'form-control-sm': size === 'sm', 'form-control-lg': size === 'lg' }"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          v-bind="getQueryInputAttrs()"
          @input="onInputFieldInput"
          @compositionstart="onCompositionStart"
          @compositionend="onCompositionEnd"
          @keydown="handleInputKeydown"
          @keyup.enter="handleEnterKeyUp"
        >
      </div>
      <div
        v-if="!pending && !hasError && hasCategories"
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
        v-show="!hasError && (pending || hasDropdownSuggestion)"
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
          v-if="!pending && !hasError && (shouldShowNewSuggestion || selectAllRendered)"
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
          v-if="!hasError && (shouldShowNewSuggestion || selectAllRendered) && displayOptionRows.length"
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
                    class="min-w-0 flex-1"
                    :class="{ truncate: row.virtual }"
                    :title="row.virtual ? getLabel(row.item.option) : undefined"
                  >
                    <slot
                      name="option"
                      :option="row.item.option"
                      :label="getLabel(row.item.option)"
                    >
                      <span
                        class="block"
                        :class="row.virtual ? 'truncate' : 'wrap-anywhere'"
                      >{{ getLabel(row.item.option) }}</span>
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
      </SdsScrollArea>
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
        v-else-if="hasError"
        data-id="sds-combo-box-error"
        class="py-3 px-4 text-sm text-red-600 dark:text-red-400"
        @keydown.enter="ignoreActionEnter = true"
      >
        <!-- @slot Remote failure feedback. Receives the message and a retry callback. -->
        <slot
          name="error"
          :message="error"
          :retry="retrySearch"
        >
          <p role="alert">
            {{ error }}
          </p>
          <button
            v-if="canRetry()"
            type="button"
            class="mt-2 text-blue-700 dark:text-blue-400 underline"
            @click="retrySearch"
          >
            {{ text.retry }}
          </button>
        </slot>
      </div>
      <div
        v-else-if="!hasDropdownSuggestion && !shouldShowNewSuggestion"
        class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 italic"
        data-id="sds-combo-box-no-matches"
      >
        {{ query.trim() ? text.noMatches(query) : text.noOptions }}
      </div>
      <div
        v-if="!pending && !hasError && hasDropdownSuggestion && !isSelected(query)"
        data-id="sds-combo-box-footer"
        class="hidden items-center justify-end gap-6 border-t rounded-b-theme-sm border-gray-100 dark:border-gray-700 bg-gray-25 dark:bg-gray-900 px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
        :class="hasCategories ? '@min-[30rem]:flex' : '@min-[28rem]:flex'"
      >
        <div class="flex items-center gap-1.5 whitespace-nowrap">
          <div class="flex gap-1 p-1 border border-gray-100 dark:border-gray-500 rounded-theme-sm shadow-inner">
            <IconFa7SolidArrowUp class="w-3 h-3" />
            <IconFa7SolidArrowDown class="w-3 h-3" />
          </div>
          <span class="sr-only">{{ text.navigationKeys }}</span> {{ text.navigate }}
        </div>
        <div
          v-if="hasCategories"
          class="flex items-center gap-1.5 whitespace-nowrap"
        >
          <div
            aria-hidden="true"
            class="flex items-center gap-1 p-1 border border-gray-100 dark:border-gray-500 rounded-theme-sm shadow-inner"
          >
            <span class="text-xs font-mono">{{ text.altKey }}</span>
            <span class="text-xs font-mono">+</span>
            <IconFa7SolidArrowLeft class="w-3 h-3" />
            <IconFa7SolidArrowRight class="w-3 h-3" />
          </div>
          <span class="sr-only">{{ text.categoryKeys }}</span> {{ text.switchGroups }}
        </div>
        <div class="flex items-center gap-1.5 whitespace-nowrap">
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
import { focusTrapScopeKey, FOCUSABLE_SELECTOR } from '@/composables/useFocusTrap'
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
  /** Maximum tags shown before an expandable summary. Unset keeps every tag visible. */
  maxVisibleTags?: number;
  /**
   * Allows more than one selected value.
   *
   * This only affects `type="select"` and `type="taggable-select"`. Selected values render as
   * removable tags above the input. `type="text"` is an autosuggest text field and does not use
   * multi-selection.
   *
   * Multiselect dropdowns stay open for further selections. Clearing suggestions after a selection
   * dismisses the dropdown without empty-list feedback; a new search, loading, or an error preserves
   * its own feedback instead.
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
   * Focuses the ComboBox input when the user presses `/` outside text-entry elements.
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
   *
   * @default false
   */
  pending?: boolean;
  /** Remote search failure message. Supply a retry listener to offer a retry action. */
  error?: string;
  /**
   * Placeholder text shown when the input is empty.
   * Uses the same muted, italic styling in single-select and multiselect modes.
   *
   * In single-select modes this labels the trigger. Use `messages.searchSuggestions` to localize
   * the separate dropdown search field.
   * Provide an associated label, `aria-label`, or `aria-labelledby` for the field's accessible name;
   * the single-select button does not use its placeholder or selected text as an accessible name.
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
   * Omit this prop to disable the suggestions dropdown. Pass an empty array to enable
   * suggestions before results arrive or to show no-match feedback for an empty response.
   *
   * @default undefined
   */
  suggestions?: ComboBoxSuggestion[];
  /**
   * Interaction mode for the ComboBox.
   *
   * `text` behaves like an autosuggest input and writes the chosen label into the query.
   * Enter submits the literal text query, including an empty query unless `required` is enabled.
   * `select` requires the final value to come from `suggestions`.
   * `taggable-select` allows both suggestions and new user-created values.
   * Single-select modes keep the selected label in the trigger and search through a separate
   * field in the dropdown. Multiple selections keep the search field in the trigger.
   * Every mode shows a leading search icon, replaced by a spinner while pending.
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
   * option count meets `virtualizeThreshold`. Default and slotted labels inherit single-line
   * truncation. Use the `option` slot to customize content and `virtualItemHeight` to match a
   * custom fixed-height layout.
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
  error?: (props: { message: string | undefined; retry: () => void }) => VNodeChild;
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
  maxVisibleTags: undefined,
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
  error: undefined,
  placeholder: undefined,
  size: undefined,
  suggestions: undefined,
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

const emit = defineEmits([
  /** Emitted when focus leaves the trigger or popup for an outside control. */
  'blur',
  'close', 'complete', 'enter', 'focus', 'open', 'result',
  /** Requests another remote search with the current query. */
  'retry'
])

const scrollArea = ref()
const inputField = ref<HTMLInputElement | HTMLButtonElement>()
const searchField = ref<HTMLInputElement>()
const selectionField = ref<HTMLSelectElement>()
const virtualScrollContainer = ref<HTMLElement>()
const virtualOptionsContainer = ref<HTMLElement>()
const floatingUiRef = ref()
const dropdownRef = ref<HTMLElement>()
const componentId = useId()

const { validationClasses, validationAttrs } = useFormField(props)
const query = defineModel({ type: String, default: '' })
const selected = defineModel<ComboBoxSuggestion[]>('selected', { type: Array as () => ComboBoxSuggestion[], default: () => [] })
const showDropdown = ref(false)
const shouldDismissEmptySuggestions = ref(false)
const arrowCounter = ref(-1)
const shouldScrollActiveItem = ref(false)
const shouldAutoHighlightOnOpen = ref(false)
const ignoreNextFloatingUiClose = ref(false)
const shakeTimeout = ref<ReturnType<typeof window.setTimeout>>()
const isComposing = ref(false)
const compositionQuery = ref('')
const ignoreCompositionEnter = ref(false)
const ignoreActionEnter = ref(false)
const ignoreEscapeKeyup = ref(false)
const tagsExpanded = ref(false)
const focusScope = inject(focusTrapScopeKey, undefined)
const instance = getCurrentInstance()
const hasSuggestionSource = computed(() => props.suggestions !== undefined)
const hasError = computed(() => !props.pending && !!props.error?.trim())
const canRetry = () => !!instance?.vnode.props?.onRetry
const retrySearch = () => {
  if (props.disabled || props.readonly || props.pending) return
  queryField.value?.focus({ preventScroll: true })
  emit('retry', query.value)
}
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
const isQueryAttribute = (key: string) => /^(on(Input|Beforeinput|Change|Key|Composition))/i.test(key) ||
  ['inputmode', 'enterkeyhint', 'autocomplete', 'autocapitalize', 'autocorrect', 'spellcheck', 'minlength', 'pattern'].includes(key)
const getInputAttrs = () => Object.fromEntries(Object.entries(attrs).filter(([key]) => isInputAttribute(key) &&
  (!usesDropdownSearch.value || !isQueryAttribute(key)) &&
  !['aria-label', 'aria-labelledby', 'aria-describedby', 'aria-invalid', 'aria-busy', 'aria-controls', 'aria-expanded', 'aria-activedescendant', 'aria-required', 'aria-readonly', 'aria-disabled'].includes(key)))
const getQueryInputAttrs = () => Object.fromEntries(Object.entries(attrs).filter(([key]) => isQueryAttribute(key)))
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
const popupId = computed(() => `${componentId}-popup`)
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
  createMatcher,
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
  allCount,
  groups,
  suggestionOptions,
  shouldShowNewSuggestion,
  hasDropdownSuggestion,
  hasCategories,
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
  suggestions: () => props.suggestions ?? [],
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
  pending: () => props.pending,
  optionGroupLabel: () => props.optionGroupLabel,
  optionGroupChildren: () => props.optionGroupChildren,
  disableGroupTabs: () => props.disableGroupTabs,
  debounceComplete: () => props.debounceComplete,
  onComplete: value => {
    shouldDismissEmptySuggestions.value = false
    emit('complete', value)
  },
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
  if (props.pending || hasError.value || !shouldShowDropdown.value) return undefined
  const item = activeItem.value
  if (!item || (item.kind === 'add' && isSelected(query.value))) return undefined
  return getDropdownItemId(item.index)
})

const shouldVirtualizeOptions = computed(() => {
  return !props.pending && !hasError.value && props.virtualize &&
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

  for (const [index, suggestion] of (props.pending || hasError.value ? [] : suggestionOptions.value).entries()) {
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

const selectedItemIndex = computed(() => selected.value.length
  ? dropdownItems.value.find(item => item.kind === 'option' && sameOption(item.option, selected.value[0]))?.index ?? -1
  : -1)
const defaultItemIndex = computed(() => {
  if (props.pending || hasError.value) return -1
  if (usesDropdownSearch.value && !query.value.trim() && selectedItemIndex.value !== -1) return selectedItemIndex.value
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
  active: group.key === activeGroupKey.value,
  disabled: group.count < 1 && group.key !== -1 && group.key !== activeGroupKey.value
})))

const showTagsBar = computed(() => isMultiselect.value && selected.value.length > 0)
const visibleTags = computed(() => tagsExpanded.value || props.maxVisibleTags === undefined
  ? selected.value
  : selected.value.slice(0, Math.max(1, props.maxVisibleTags)))
const hasHiddenTags = computed(() => visibleTags.value.length < selected.value.length)
watch(() => props.maxVisibleTags, () => { tagsExpanded.value = false })

const isMultiselect = computed(() => isSelectType.value && props.multiple)
const usesDropdownSearch = computed(() => isSelectType.value && !props.multiple)
const controlledPopupId = computed(() => {
  if (!hasSuggestionSource.value) return undefined
  return usesDropdownSearch.value ? popupId.value : dropdownId.value
})
const queryField = computed(() => usesDropdownSearch.value ? searchField.value : inputField.value)
const selectAllIndex = computed(() => dropdownItems.value.find(item => item.kind === 'select-all')?.index ?? -1)

const hasValidSelection = computed(() => selected.value.some(option => getLabel(option).trim() !== ''))
const inputRequired = computed(() => !usesDropdownSearch.value && props.required && (!isSelectType.value || !hasValidSelection.value))
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
  if (inputField.value && 'setCustomValidity' in inputField.value) {
    inputField.value.setCustomValidity(selectionMissing.value ? selectionValidationMessage.value : '')
  }
  selectionField.value?.setCustomValidity(selectionMissing.value ? selectionValidationMessage.value : '')
  if (!selectionMissing.value) selectionValidationAttempted.value = false
}, { flush: 'post' })

const handleInvalid = () => {
  if (!selectionMissing.value) return
  selectionValidationAttempted.value = true
}

const handleSelectionInvalid = () => {
  handleInvalid()
  inputField.value?.focus()
}

watch(() => [...selected.value], (items, previousItems) => {
  if (!isSelectType.value) return
  const wasSelected = createMatcher(previousItems)
  const nowSelected = createMatcher(items)
  const added = items.filter(item => !wasSelected(item)).map(getLabel)
  const removed = previousItems.filter(item => !nowSelected(item)).map(getLabel)
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

const showClearButton = computed(() => {
  if (props.disabled || props.readonly) return false
  if (usesDropdownSearch.value) return hasValidSelection.value
  if (inputDisplayValue.value !== '') return true
  if (props.type !== 'text' && selected.value.length > 0) return true
  return false
})

const clearButtonLabel = computed(() => {
  if (isSelectType.value && selected.value.length && (!props.multiple || inputDisplayValue.value === '')) {
    return props.multiple ? text.value.clearAllSelections : text.value.clearSelection
  }
  return text.value.clearSearch
})

const showDropdownResults = () => {
  if (props.readonly || props.disabled || isComposing.value) return
  if (showDropdown.value) {
    queryField.value?.focus({ preventScroll: true })
    return
  }
  if (!usesDropdownSearch.value && !props.pending && !hasError.value && !hasDropdownSuggestion.value && !query.value.trim()) return
  inputField.value?.focus()
  openDropdown()
}

const toggleDropdownResults = () => {
  if (props.readonly || props.disabled || isComposing.value) return
  if (showDropdown.value) {
    closeDropdown()
    inputField.value?.focus({ preventScroll: true })
  } else {
    showDropdownResults()
  }
}

const toggleSelectAll = () => {
  if (props.disabled || props.readonly || props.pending || hasError.value || isComposing.value) return
  actionFeedback.value = ''
  toggleSelections(getCurrentGroupOptions())
  shouldDismissEmptySuggestions.value = true
}

// Computed property for input display value
const inputDisplayValue = computed(() => {
  if (usesDropdownSearch.value) return selected.value.length ? getLabel(selected.value[0]) : ''
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
  if (selected.value.length > 0 && query.value === '' && !props.multiple) {
    return getLabel(selected.value[0])
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
    if (inputField.value && !usesDropdownSearch.value) inputField.value.value = inputDisplayValue.value
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
  shouldDismissEmptySuggestions.value = false
  shouldAutoHighlightOnOpen.value = direction === undefined
  showDropdown.value = true
  if (direction) {
    activeGroupKey.value = -1
    arrowCounter.value = usesDropdownSearch.value && !query.value.trim() && selectedItemIndex.value !== -1
      ? selectedItemIndex.value
      : direction === 'down' ? defaultItemIndex.value : lastDropdownItemIndex()
    autoFocused.value = false
  }
}

type CloseDropdownOptions = {
  resetSelectDisplay?: boolean;
}

const closeDropdown = (options: CloseDropdownOptions = {}) => {
  shouldDismissEmptySuggestions.value = false
  if (usesDropdownSearch.value && dropdownRef.value?.contains(document.activeElement)) inputField.value?.focus({ preventScroll: true })
  showDropdown.value = false
  actionFeedback.value = ''
  if (options.resetSelectDisplay !== false) resetSelectDisplayOnClose()
  resetActiveOption()
}

// Loading and errors must not inherit dismissal from a previous selection.
watch([() => props.pending, () => props.error], () => {
  shouldDismissEmptySuggestions.value = false
}, { flush: 'sync' })

watch(() => shouldDismissEmptySuggestions.value && allCount.value === 0 && !props.pending && !hasError.value, (shouldDismiss) => {
  if (shouldDismiss) closeDropdown({ resetSelectDisplay: false })
})

const handleEscape = (event: KeyboardEvent) => {
  if (isComposing.value || event.isComposing || event.keyCode === 229) return
  if (!shouldShowDropdown.value) return
  event.preventDefault()
  event.stopPropagation()
  ignoreEscapeKeyup.value = true
  closeDropdown()
}

const handleEscapeKeyup = (event: KeyboardEvent) => {
  if (shouldShowDropdown.value && (isComposing.value || event.isComposing || event.keyCode === 229)) {
    event.stopPropagation()
    return
  }
  if (!ignoreEscapeKeyup.value) return
  event.preventDefault()
  event.stopPropagation()
  ignoreEscapeKeyup.value = false
}

watch(() => props.disabled || props.readonly, (blocked) => {
  if (blocked) closeDropdown()
}, { flush: 'sync' })

const isComboBoxTarget = (target: EventTarget | null) => target instanceof Node && (
  inputField.value?.closest('[data-id="sds-combo-box"]')?.contains(target) || dropdownRef.value?.contains(target)
)
const handleFieldFocus = (event: FocusEvent) => {
  if (!isComboBoxTarget(event.relatedTarget)) emit('focus')
}
const handleFieldBlur = (event: FocusEvent) => {
  if (!isComboBoxTarget(event.relatedTarget)) emit('blur', event)
}

const getFocusable = (container: ParentNode): HTMLElement[] => {
  const displayed = new Map<HTMLElement, boolean>()
  const isDisplayed = (element: HTMLElement): boolean => {
    const cached = displayed.get(element)
    if (cached !== undefined) return cached
    const visible = getComputedStyle(element).display !== 'none' &&
      (!element.parentElement || isDisplayed(element.parentElement))
    displayed.set(element, visible)
    return visible
  }
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    .filter(element => element.tabIndex >= 0 && !element.matches(':disabled, input[type="hidden"]') &&
      !element.closest('[inert], [hidden], [aria-hidden="true"]') &&
      getComputedStyle(element).visibility !== 'hidden' && isDisplayed(element))
    .sort((left, right) => left.tabIndex === right.tabIndex ? 0
      : left.tabIndex === 0 ? 1 : right.tabIndex === 0 ? -1 : left.tabIndex - right.tabIndex)
}

const handlePopupKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Tab' || event.defaultPrevented || isComposing.value) return
  event.preventDefault()
  event.stopPropagation()
  const popup = dropdownRef.value
  const popupFields = popup ? getFocusable(popup) : []
  const index = popupFields.findIndex(element => element === event.target)
  const nextPopupField = popupFields[index + (event.shiftKey ? -1 : 1)]
  if (index !== -1 && nextPopupField) {
    nextPopupField.focus({ preventScroll: true })
    return
  }
  if (event.shiftKey && !usesDropdownSearch.value) {
    inputField.value?.focus({ preventScroll: true })
    return
  }
  const scope = focusScope?.enabled() ? focusScope.container.value : undefined
  const fields = getFocusable(scope ?? document).filter(element => !popup?.contains(element))
  const triggerIndex = fields.findIndex(element => element === inputField.value)
  const nextIndex = triggerIndex + (event.shiftKey ? -1 : 1)
  const next = fields[(nextIndex + fields.length) % fields.length]
  closeDropdown()
  next?.focus({ preventScroll: true })
}

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
  const isTextEntry = e.composedPath().some(target => target instanceof HTMLElement && (
    target.isContentEditable ||
    target.matches('input, textarea, select, [contenteditable=""], [contenteditable="true"], [contenteditable="plaintext-only"], [role="textbox"], [role="searchbox"], [role="combobox"]')
  ))
  if (isTextEntry) return
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

const shouldRevealActiveOption = () => !autoFocused.value || isAddSuggestionActive.value ||
  (usesDropdownSearch.value && !query.value.trim() && selectedItemIndex.value !== -1)

const syncDropdownScroll = async () => {
  await nextTick()
  resetVirtualScroll()
  if (shouldRevealActiveOption()) await scrollToChild()
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
  if (entry.contentRect.width > 0 && shouldShowDropdown.value && shouldRevealActiveOption()) syncDropdownScroll()
})

const clearQuery = () => {
  if (props.disabled || props.readonly) return
  actionFeedback.value = ''
  const shouldClearSelections = !isMultiselect.value || inputDisplayValue.value === ''
  if (query.value !== '') setQuery('')
  if (shouldClearSelections) clearSelections()
  closeDropdown({ resetSelectDisplay: false })
  inputField.value?.focus()
}

const shake = (message = query.value.trim() ? text.value.chooseSuggestion : text.value.emptyValue) => {
  actionFeedback.value = message
  const field = queryField.value ?? inputField.value
  if (!field) return
  field.classList.add('animate-shake')
  if (shakeTimeout.value) window.clearTimeout(shakeTimeout.value)
  shakeTimeout.value = window.setTimeout(() => {
    field.classList.remove('animate-shake')
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

const handleDelete = (event: KeyboardEvent) => {
  if (props.disabled || props.readonly || !inputField.value) return
  if (usesDropdownSearch.value && event.target === searchField.value) return
  if (selected.value.length && props.type === 'text' && inputField.value.value === '') {
    clearSelections()
    return
  }
  if (selected.value.length && props.type === 'text') removeSelectionAt(selected.value.length - 1)
  if (selected.value.length && usesDropdownSearch.value) {
    event.preventDefault()
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
  return activeElement.value === inputField.value || activeElement.value === searchField.value
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
  if (usesDropdownSearch.value && target !== searchField.value) return
  shouldDismissEmptySuggestions.value = false
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
  shouldDismissEmptySuggestions.value = false
  compositionQuery.value = queryField.value?.value ?? ''
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
  ignoreActionEnter.value = false
  if (props.disabled || props.readonly) return
  if (usesDropdownSearch.value && event.target === inputField.value) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      ignoreActionEnter.value = event.key === 'Enter'
      showDropdownResults()
      return
    }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault()
      showDropdownResults()
      setUserQuery(event.key)
      handleInput()
      return
    }
  }
  switch (event.key) {
    case 'Enter':
      if (shouldShowDropdown.value || (props.type === 'taggable-select' && query.value.trim())) event.preventDefault()
      break
    case 'Backspace':
    case 'Delete':
      handleDelete(event)
      break
    case 'Tab':
      if (!usesDropdownSearch.value && shouldShowDropdown.value && !event.shiftKey && dropdownRef.value) {
        const firstPopupField = getFocusable(dropdownRef.value)[0]
        if (firstPopupField) {
          event.preventDefault()
          event.stopPropagation()
          firstPopupField.focus({ preventScroll: true })
          return
        }
      }
      if (!usesDropdownSearch.value || event.target === inputField.value) closeDropdown()
      break
    case 'Home':
    case 'End':
      if (!usesDropdownSearch.value || event.target !== inputField.value || event.ctrlKey || event.metaKey || event.altKey) return
      event.preventDefault()
      showDropdownResults()
      shouldAutoHighlightOnOpen.value = false
      autoFocused.value = false
      shouldScrollActiveItem.value = true
      arrowCounter.value = event.key === 'Home' ? firstItemIndex.value : lastDropdownItemIndex()
      break
    case 'PageUp':
    case 'PageDown': {
      if (event.ctrlKey || event.metaKey || event.altKey || props.pending || hasError.value) return
      event.preventDefault()
      showDropdownResults()
      shouldAutoHighlightOnOpen.value = false
      autoFocused.value = false
      shouldScrollActiveItem.value = true
      const page = Math.max(1, Math.floor((getScrollAreaElement()?.clientHeight || 288) / props.virtualItemHeight))
      arrowCounter.value = Math.max(firstItemIndex.value, Math.min(lastDropdownItemIndex(),
        arrowCounter.value + (event.key === 'PageDown' ? page : -page)))
      break
    }
    case 'ArrowUp':
    case 'ArrowDown':
      if (event.ctrlKey || event.metaKey || event.shiftKey) return
      if (event.altKey) {
        event.preventDefault()
        if (event.key === 'ArrowUp') closeDropdown()
        else showDropdownResults()
        return
      }
      if (props.pending || hasError.value) {
        event.preventDefault()
        showDropdownResults()
        return
      }
      if (!hasDropdownSuggestion.value) {
        event.preventDefault()
        showDropdownResults()
        return
      }
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
  const hasQuery = query.value.trim() !== ''
  if (!hasQuery && !selected.value.length && props.required) {
    shake()
    return
  }
  if (hasQuery && !selected.value.length) selected.value = [query.value]
  if (!isMultiselect.value) closeDropdown({ resetSelectDisplay: isSelectType.value })
  emitEnter()
}

const handleSuggestionClick = async (option: ComboBoxSuggestion) => {
  if (props.disabled || props.readonly || props.pending || hasError.value || isComposing.value) return
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
  await nextTick()
  emit('result', emitValue)
  if (props.type !== 'text') {
    setQuery('')
  }
  if (isMultiselect.value) {
    resetActiveOption()
    shouldDismissEmptySuggestions.value = true
  } else {
    closeDropdown({ resetSelectDisplay: false })
  }
  inputField.value?.focus()
}

const handleEnterKeyUp = async (event: KeyboardEvent | MouseEvent) => {
  if (props.disabled || props.readonly) return
  if (ignoreActionEnter.value) {
    ignoreActionEnter.value = false
    return
  }
  if (event instanceof KeyboardEvent && (isComposing.value || event.isComposing || event.keyCode === 229 || ignoreCompositionEnter.value)) {
    ignoreCompositionEnter.value = false
    return
  }
  if (props.pending) {
    shake(text.value.loading)
    return
  }
  if (hasError.value) {
    shake(props.error)
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
  if (props.disabled || props.readonly || props.pending || hasError.value || isComposing.value) return
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
          queryField.value?.focus({ preventScroll: true })
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
    case 'right':
      if (hasCategories.value && shouldShowDropdown.value) {
        event.preventDefault()
        const tabs = comboBoxTabs.value.filter(tab => !tab.disabled)
        const current = tabs.findIndex(tab => Number(tab.key) === activeGroupKey.value)
        const next = tabs[(current + (direction === 'right' ? 1 : -1) + tabs.length) % tabs.length]
        if (!next) return
        activeGroupKey.value = Number(next.key)
        await nextTick()
        const tab = dropdownRef.value?.querySelector<HTMLElement>('button.tab[data-active="true"]')
        const container = tab?.closest<HTMLElement>('[data-id="sds-combo-box-categories"]')
        if (tab && container) {
          const tabRect = tab.getBoundingClientRect()
          const containerRect = container.getBoundingClientRect()
          if (tabRect.left < containerRect.left) container.scrollLeft += tabRect.left - containerRect.left
          else if (tabRect.right > containerRect.right) container.scrollLeft += tabRect.right - containerRect.right
        }
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
  if (!hasSuggestionSource.value) return false
  return showDropdown.value
})

watchDebounced(() => [
  props.pending,
  shouldShowDropdown.value,
  countVisibleOptions(suggestionOptions.value),
  shouldShowNewSuggestion.value ? query.value : '',
  activeGroupKey.value,
  hasError.value,
  hasSuggestionSource.value
] as const, ([pending, open, count]) => {
  if (!hasSuggestionSource.value) {
    resultsAnnouncement.value = ''
  } else if (pending) {
    resultsAnnouncement.value = text.value.loading
  } else if (hasError.value) {
    resultsAnnouncement.value = ''
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
  // Explicit closes already applied their query-reset policy.
  const shouldResetSelectDisplay = !val && showDropdown.value && !props.pending
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
    if (usesDropdownSearch.value && shouldShowDropdown.value) searchField.value?.focus({ preventScroll: true })
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
  if (props.pending || hasError.value) {
    autoFocused.value = true
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
