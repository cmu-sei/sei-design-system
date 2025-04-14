<template>
  <div
    ref="root"
    data-id="sds-multiselect"
    class="sds-multiselect"
    :class="{
      valid,
      invalid,
      open: showDropdown,
      active,
      disabled,
      up: dropUp,
      canSearch,
      hideCaret,
      showClear,
      hasTags: !hideTags && selected.length > 0,
      showResults
    }"
    @mouseup="handleMouseUp"
    @mousedown.prevent.stop.self
    @dblclick="selectText"
    @keydown="handleKeyDown($event)"
    @keyup="handleKeyUp($event)"
  >
    <ul
      class="tag-list"
      :class="{ single: !multiple }"
    >
      <template v-if="!hideTags || !multiple">
        <li
          v-for="s in selected"
          :key="s[valueKey] as string"
          class="tag-list-item"
        >
          <!-- @slot Tag template content. @binding tag, remove, disabled -->
          <slot
            name="tagTemplate"
            :tag="s"
            :remove="remove"
            :disabled="disabled"
          >
            <button
              v-if="multiple"
              type="button"
              class="remove"
              tabindex="-1"
              :title="`Clear ${s[labelKey]}`"
              :aria-label="`Clear ${s[labelKey]}`"
              :disabled="disabled"
              @click="remove(s)"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <span>{{ s[labelKey] }}</span>
          </slot>
        </li>
      </template>
      <li
        :style="{
          width: !multiple && showDropdown && canSearch ? '100%' : inputWidth,
        }"
        class="tag-list-item input"
      >
        <span
          ref="fauxInput"
          class="faux-input"
          aria-hidden="true"
        >
          {{ model }}
        </span>
        <select
          v-if="required && selected.length < 1"
          class="faux-input"
          aria-hidden="true"
          tabindex="-1"
          required
          @focus="handleRequired"
        >
          <option />
        </select>
        <label>
          <input
            ref="input"
            :value="model"
            :placeholder="showPlaceholder ? placeholder : ''"
            :readonly="isReadonlyInput"
            :disabled="disabled"
            :style="{
              width: !multiple && showDropdown && canSearch ? '100%' : inputWidth,
            }"
            :maxlength="maxlength"
            autocomplete="off"
            spellcheck="false"
            autocorrect="off"
            type="text"
            class="p-0 m-0 border-0 focus:shadow-none focus:ring-0"
            @blur="handleBlur($event)"
            @input="search($event)"
          >
          <span class="sr-only">Enter text</span>
        </label>
      </li>
    </ul>
    <button
      v-if="selected.length > 0 && showClear"
      type="button"
      tabindex="-1"
      title="Clear all"
      aria-label="Clear all"
      class="multiselect-clear"
      @click.prevent.stop="handleClearBtn"
    >
      <svg
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        stroke="currentColor"
        viewBox="0 0 24 24"
        class="h-5 w-5"
        aria-hidden="true"
      ><path d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
    <div
      v-if="!hideCaret && !(showClear && selected.length > 0)"
      aria-hidden="true"
      class="multiselect-caret"
    />
    <select
      v-if="id"
      :id="id"
      :required="required"
      :multiple="multiple"
      class="sr-only"
      aria-hidden="true"
      tabindex="-1"
    >
      <option
        v-for="i in selected"
        :key="i.id as string"
        :value="i.id"
        selected
      >
        {{ i[labelKey] }}
      </option>
    </select>
    <ul
      v-if="showDropdown"
      ref="dropdownMenu"
      :style="{ bottom, maxHeight: maxHeight + 'px' }"
      class="dropdown-list"
    >
      <li
        v-if="showLoading"
        class="dropdown-list-item loading"
      >
        <!-- @slot Loading template content. @binding loadingMsg -->
        <slot
          name="loadingTemplate"
          :loading-msg="loadingMsg"
        >
          {{ loadingMsg }}
        </slot>
      </li>
      <template v-if="showResults">
        <li
          v-for="(o, i) in filteredOptions"
          :key="o[valueKey] as string"
          :disabled="disabled"
          class="dropdown-list-item"
          :class="{ selected: isSelectedOption(o), active: i === arrowCounter }"
          @click="add(o)"
          @mouseover="arrowCounter = i"
        >
          <!-- @slot Option template content. @binding option, add, disabled, isSelectedOption -->
          <slot
            name="optionTemplate"
            :option="o"
            :add="add"
            :disabled="disabled"
            :is-selected-option="isSelectedOption(o)"
          >
            {{ o[labelKey] }}
            <template v-if="o.isNewTag && !isSelectedOption(o)">
              (new)
            </template>
          </slot>
        </li>
      </template>
      <li
        v-if="showDefault"
        class="dropdown-list-item default"
      >
        <!-- @slot Default template content. @binding defaultMsg -->
        <slot
          name="defaultTemplate"
          :default-msg="defaultMsg"
        >
          {{ defaultMsg }}
        </slot>
      </li>
      <li
        v-if="showNoResults"
        class="dropdown-list-item no-result"
      >
        <!-- @slot No results template content. @binding noResultsMsg -->
        <slot
          name="noResultsTemplate"
          :no-results-msg="noResultsMsg"
        >
          {{ noResultsMsg }}
        </slot>
      </li>
      <li
        v-if="showCannotAddResults"
        class="dropdown-list-item cannot-add-result"
      >
        <!-- @slot Cannot add results content. @binding cannotAddResultsMsg -->
        <slot
          name="cannotAddResultsTemplate"
          :cannot-add-results-msg="cannotAddResultsMsg"
        >
          {{ cannotAddResultsMsg }}
        </slot>
      </li>
      <li
        v-if="showInvalidInput"
        class="dropdown-list-item invalid-input"
      >
        <!-- @slot Invalid input content. @binding invalidInputMsg -->
        <slot
          name="invalidInputTemplate"
          :invalid-input-msg="invalidInputMsg"
        >
          {{ invalidInputMsg }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import debounce from "../../helpers/debounce";

export interface MultiselectOption {
  [id: string | number]: unknown
}

export interface MultiselectTag {
  [id: string | number]: unknown
  isNewTag?: boolean
}

defineOptions({
  name: 'SdsMultiselect'
})

const props = defineProps({
  /**
   * Determines the id of the component.
   */
  id: { type: String, default: undefined },
  /**
   * An array of the selected options.
   */
  selected: {
    type: Array as PropType<MultiselectOption[]>,
    default: () => [],
  },
  /**
   * An array of options that can be selected.
   */
  options: {
    type: Array as PropType<MultiselectOption[]>,
    default: () => [],
  },
  /**
   * The key used for an option's value.
   *
   * Be careful when setting this as it can trigger `undefined`
   * errors if it doesn't exist in the options object.
   */
  valueKey: {
    type: String,
    default: "key",
  },
  /**
   * The key used for an option's label.
   *
   * Be careful when setting this as it can trigger `undefined`
   * and `trim()` errors if it doesn't exist in the options object.
   */
  labelKey: {
    type: String,
    default: "value",
  },
  /**
   * Determines whether to enable autofocus or not.
   */
  autofocus: {
    type: Boolean,
    default: false,
  },
  /**
   * Determines whether more than one option can be selected.
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * Disables the component to prevent user interaction.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * Determines the required state of the component.
   */
  required: {
    type: Boolean,
    default: false,
  },
  /**
   * Determines the loading state of the component.
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * The message displayed while loading is true.
   */
  loadingMsg: {
    type: String,
    default: "Loading...",
  },
  /**
   * The message that displays when the menu is initially opened.
   */
  defaultMsg: {
    type: String,
    default: "",
  },
  /**
   * The message that displays when there are no results returned from a lookup.
   */
  noResultsMsg: {
    type: String,
    default: "",
  },
  /**
   * The message that displays when you cannot select more items.
   */
  cannotAddResultsMsg: {
    type: String,
    default: "You have added the maximum amount of items allowed.",
  },
  /**
   * The message that displays when the user enters invalid text.
   */
  invalidInputMsg: {
    type: String,
    default: "HTML input is not allowed.",
  },
  /**
   * Determines whether to show or hide your selections as tags inside the input field.
   */
  hideTags: {
    type: Boolean,
    default: false,
  },
  /**
   * Determines whether you can loop through the menu's options with the arrow keys
   * (e.g., pressing down on that last result sends you to the first result).
   */
  canLoopOptions: {
    type: Boolean,
    default: false,
  },
  /**
   * Determines if options can be toggled when selected from the options list.
   */
  toggleSelectedOptions: {
    type: Boolean,
    default: false,
  },
  /**
   * Determines if selected options should appear in the options list.
   */
  hideSelectedOptions: {
    type: Boolean,
    default: false,
  },
  /**
   * Determines whether to close the menu on selection.
   */
  closeOnSelection: {
    type: Boolean,
    default: true,
  },
  /**
   * Determines whether the component allows for searching.
   */
  canSearch: {
    type: Boolean,
    default: true,
  },
  /**
   * Determines whether to remove the last selection.
   */
  disableRemoveLastSelection: {
    type: Boolean,
    default: false,
  },
  /**
   * Determines if the input should be cleared after making a selection.
   */
  clearInputOnSelection: {
    type: Boolean,
    default: true,
  },
  /**
   * Determines if the options list should be purged on selection.
   */
  clearOptionsOnSelection: {
    type: Boolean,
    default: true,
  },
  /**
   * Determines the placeholder of the input.
   */
  placeholder: {
    type: String,
    default: "",
  },
  /**
   * Determines the position of the menu.
   */
  openDirection: {
    type: String,
    default: "auto",
  },
  /**
   * Determines the max height of the open menu.
   */
  maxHeight: {
    type: Number,
    default: 200,
  },
  /**
   * Determines whether to hide the caret or not.
   */
  hideCaret: {
    type: Boolean,
    default: false,
  },
  /**
   * Determines whether to show the clear field button or not.
   */
  showClear: {
    type: Boolean,
    default: false,
  },
  /**
   * Determines whether the multiselect will accept new values from the input.
   */
  taggable: {
    type: Boolean,
    default: false,
  },
  /**
   * Determines the maxlength of the input field.
   */
  maxlength: {
    type: Number as PropType<number | undefined>,
    default: undefined,
  },
  /**
   * Determines the max number of items that can be selected.
   */
  maxItems: {
    type: Number,
    default: -1,
  },
  /**
   * Determines if new tags are forced to be lowercase.
   */
  enforceLowercaseNewTag: {
    type: Boolean,
    default: false,
  },
  /**
   * Determines if the multiselect shows a valid state
   */
  valid: {
    type: Boolean,
    default: false
  },
    /**
   * Determines if the multiselect shows an invalid state
   */
   invalid: {
    type: Boolean,
    default: false
  }
})

/**
 * The v-model that determines the text value of the input field.
 */
const model = defineModel<string>({ type: String, default: '' })

const emit = defineEmits(['update:modelValue', 'update-selected', 'update-options', 'open', 'close', 'focus'])

const debouncePositionDropdown = ref<null | EventListener>(null)
const root = ref()
const input = ref()
const fauxInput = ref()
const dropdownMenu = ref()
const isOpen = ref(false)
const active = ref(false)
const inputWidth = ref<number | string>(0)
const arrowCounter = ref(0)
const bottom = ref('auto')
const dropUp = ref(false)

const showDropdown = computed(() => {
  return (
    showLoading.value ||
    showDefault.value ||
    showNoResults.value ||
    showResults.value ||
    showCannotAddResults.value ||
    showInvalidInput.value
  );
})

const showLoading = computed(() => {
  return props.loading && isOpen.value && canAddItem.value;
})

const showResults = computed(() => {
  return (
    filteredOptions.value.length > 0 &&
    isOpen.value &&
    !props.loading &&
    canAddItem.value
  );
})

const showDefault = computed(() => {
  return (
    props.defaultMsg !== "" &&
    trimmedValue.value === "" &&
    filteredOptions.value.length < 1 &&
    !props.loading &&
    isOpen.value &&
    canAddItem.value
  );
})

const showNoResults = computed(() => {
  return (
    props.noResultsMsg !== "" &&
    trimmedValue.value !== "" &&
    filteredOptions.value.length < 1 &&
    !props.loading &&
    isOpen.value &&
    canAddItem.value
  );
})

const showPlaceholder = computed(() => {
  return (
    props.placeholder !== "" &&
    props.selected.length < 1 &&
    trimmedValue.value === ""
  );
})

const showCannotAddResults = computed(() => {
  return isOpen.value && !canAddItem.value && isCleanInput.value;
})

const showInvalidInput = computed(() => {
  return !isCleanInput.value;
})

const canAddItem = computed(() => {
  return (
    isCleanInput.value &&
    (props.maxItems < 0 || props.selected.length < props.maxItems)
  );
})

const isReadonlyInput = computed(() => {
  return !props.canSearch;
})

const isCleanInput = computed(() => {
  // TODO: Fix this linting issue
  // eslint-disable-next-line no-constant-binary-expression
  return !trimmedValue.value.match(/<[^\s]|&[^\s;]*;/gi) !== null;
})

const trimmedValue = computed(() => {
  return model.value.trim() || '';
})

const filteredOptions = computed(() => {
  const options = props.options;
  if (props.taggable && trimmedValue.value !== "") {
    if (
      !options.some((i: MultiselectOption) => {
        return props.enforceLowercaseNewTag
          ? (i[props.labelKey] as string).trim().toLowerCase() ===
              trimmedValue.value.toLowerCase()
          : (i[props.labelKey] as string).trim() === trimmedValue.value;
      })
    ) {
      options.push(newTag.value);
    }
  }
  if (props.hideSelectedOptions) {
    return options.filter((o) => {
      return (
        props.selected.filter((s) => {
          return o[props.valueKey] === s[props.valueKey];
        }).length === 0
      );
    });
  }
  return options;
})

const newTag = computed(() => {
  const tag: MultiselectTag = {};
  // random number between 100,000 and 1,000,000
  const uniqueId = Math.floor(Math.random() * (1000000 - 100000) + 100000);
  tag[props.valueKey] = uniqueId;
  tag[props.labelKey] = props.enforceLowercaseNewTag
    ? trimmedValue.value.toLowerCase()
    : trimmedValue.value;
  tag.isNewTag = true;
  return tag;
})

watch(showDropdown, (show) => {
  if (show) positionDropdown();
})

watch(filteredOptions, () => {
  arrowCounter.value = 0;
})

onMounted(() => {
  resizeInput();
  setTimeout(() => {
    if (props.autofocus) {
      (input.value as HTMLInputElement).focus();
      active.value = true;
    }
  }, 0);
  document.addEventListener("click", handleOutsideClick);
  document.addEventListener("keyup", handleOutsideKeyUp);

  debouncePositionDropdown.value = debounce(positionDropdown, 150);
  document.addEventListener("scroll", debouncePositionDropdown.value);
  window.addEventListener("resize", debouncePositionDropdown.value);
})

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
  document.removeEventListener("keyup", handleOutsideKeyUp);
  document.removeEventListener("scroll", (debouncePositionDropdown.value as EventListener));
  window.removeEventListener("resize", (debouncePositionDropdown.value as EventListener));
})

const selectText = () => {
  (input.value as HTMLInputElement).setSelectionRange(0, model.value.length);
}

const search = ($event: Event) => {
  if (!props.canSearch || !$event.target) return;
  setInput(($event.target as HTMLInputElement).value);
}

const resizeInput = () => {
  requestAnimationFrame(() => {
    if (showPlaceholder.value) {
      inputWidth.value = "100%";
    } else {
      const minWidth = 20;
      const fauxInputWidth =
        fauxInput.value && typeof fauxInput.value !== "undefined"
          ? (fauxInput.value as HTMLElement).clientWidth + 20
          : 0;
      let elWidth = (root.value?.clientWidth || 0) - 20;
      if (!props.hideCaret || (props.showClear && props.selected.length > 0))
        elWidth = elWidth - 10;
      const width = Math.min(Math.max(fauxInputWidth, minWidth), elWidth);
      inputWidth.value = width + "px";
    }
  });
}

const removeLastSelection = () => {
  if (
    model.value !== "" ||
    !props.canSearch ||
    props.hideTags ||
    props.disableRemoveLastSelection
  )
    return;
  const s = props.selected;
  s.splice(-1, 1);
  updateSelected(s);
  positionDropdown();
}

const add = (selection: MultiselectOption) => {
  if (!canAddItem.value) return;
  if (isSelectedOption(selection)) {
    if (props.toggleSelectedOptions) remove(selection);
    return;
  }
  let s: MultiselectOption[] = [];
  if (props.multiple) s = props.selected;
  s.push(selection);
  updateSelected(s);
  if (props.clearInputOnSelection) clearInput();
  if (props.clearOptionsOnSelection) clearOptions();
  handleCloseOnSelection();
  positionDropdown();
}

const remove = (selection: MultiselectOption) => {
  updateSelected(
    props.selected.filter(
      (i) => i[props.valueKey] !== selection[props.valueKey]
    )
  );
  handleCloseOnSelection();
  positionDropdown();
}

const isSelectedOption = (option: MultiselectOption) => {
  return props.selected.some(
    (s) => s[props.labelKey] === option[props.labelKey]
  );
}

const focusInput = () => {
  /**
   * Emmitted when input is focused.
   */
  emit("focus");
  (input.value as HTMLInputElement).focus();
}

const clearInput = () => {
  setInput("");
}

const clearSelected = () => {
  updateSelected([]);
}

const clearOptions = () => {
  updateOptions([]);
}

const setInput = (value: string) => {
  /**
   * Emmitted when modelValue changes.
   */
  emit("update:modelValue", value);
  resizeInput();
  positionDropdown();
}

const updateSelected = (s: MultiselectOption[]) => {
  /**
   * Emmitted when selections have changed with payload of selections.
   */
  emit("update-selected", s);
  resizeInput();
  if (arrowCounter.value > filteredOptions.value.length - 1) {
    arrowCounter.value = filteredOptions.value.length - 1;
  }
}

const updateOptions = (s: MultiselectOption[]) => {
  /**
   * Emmitted when options have changed with payload of options.
   */
  emit("update-options", s);
}

const open = async () => {
  if (props.disabled) return;
  if (!showDropdown.value) {
    /**
     * Emmitted when dropdown is opened.
     */
    emit("open");
    focusInput();
    isOpen.value = true;
    await nextTick()
    arrowCounter.value = 0;
  }
}

const close = () => {
  if (showDropdown.value) {
    /**
     * Emmitted when dropdown is closed.
     */
    emit("close");
    if (!props.multiple) clearInput();
    isOpen.value = false;
    arrowCounter.value = 0;
  }
}

const handleClearBtn = () => {
  clearSelected();
  clearInput();
  focusInput();
  positionDropdown();
}

const handleArrows = (direction: string) => {
  if (!showDropdown.value) return;
  const min = 0;
  switch (direction) {
    // When going down, select next result until end
    // then loop back around starting with original query.
    case "down":
      if (arrowCounter.value < filteredOptions.value.length - 1) {
        arrowCounter.value = arrowCounter.value + 1;
        handleDropdownScroll();
      } else {
        if (props.canLoopOptions) arrowCounter.value = min;
        if (props.canLoopOptions) handleDropdownScroll();
      }
      break;
    // When going up, select prev result until at original query
    // then loop back around starting at the end of the results.
    case "up":
      if (arrowCounter.value > min) {
        arrowCounter.value = arrowCounter.value - 1;
        handleDropdownScroll();
      } else {
        if (props.canLoopOptions)
          arrowCounter.value = filteredOptions.value.length - 1;
        if (props.canLoopOptions) handleDropdownScroll(true);
      }
      break;
  }
}

const handleDropdownScroll = (jumpToLast = false) => {
  if (!showDropdown.value || typeof dropdownMenu.value === "undefined")
    return;
  const element: Element =
    (dropdownMenu.value as HTMLElement).children[arrowCounter.value] || false;
  const itemHeight = element ? (element as HTMLElement).offsetHeight : 0;
  let pixelsToItemTop = 0;
  for (let i = 0; i < arrowCounter.value; i++) {
    pixelsToItemTop += ((dropdownMenu.value as HTMLElement).children[i] as HTMLElement).offsetHeight;
  }
  const pixelsToItemBottom = pixelsToItemTop + itemHeight;
  const viewport = {
    top: (dropdownMenu.value as HTMLElement).scrollTop || 0,
    bottom:
      (dropdownMenu.value as HTMLElement).offsetHeight +
        (dropdownMenu.value as HTMLElement).scrollTop || 0,
  };

  // scroll to item
  if (jumpToLast) {
    (dropdownMenu.value as HTMLElement).scrollTop = pixelsToItemBottom;
  } else if (pixelsToItemTop <= viewport.top) {
    (dropdownMenu.value as HTMLElement).scrollTop = pixelsToItemTop;
  } else if (pixelsToItemBottom >= viewport.bottom) {
    (dropdownMenu.value as HTMLElement).scrollTop = viewport.top + itemHeight;
  }
}

const handleBlur = async ($event: FocusEvent) => {
  if (
    showDropdown.value &&
    arrowCounter.value <= filteredOptions.value.length - 1 &&
    arrowCounter.value > -1 &&
    canAddItem.value &&
    model.value && model.value.trim() !== '' &&
    !isSelectedOption(filteredOptions.value[arrowCounter.value])
  ) {
    add(filteredOptions.value[arrowCounter.value]);
    $event.preventDefault();
  }
  setInput('')
  await nextTick()
  close()
}

const handleKeyUp = ($event: KeyboardEvent) => {
  if (props.disabled) return;
  const keys = [
    "Enter",
    "Backspace",
    "Delete",
    "Tab",
    "Alt",
    "Shift",
    "Control",
    "Meta",
    "CapsLock",
    "Fn",
    "FnLock",
    "Hyper",
    "NumLock",
    "ScrollLock",
    "Super",
    "Symbol",
    "SymbolLock",
    "ArrowLeft",
    "ArrowRight",
    "Left",
    "Right",
  ];
  // Enter
  if ($event.key === "Enter" && showDropdown.value) {
    if (
      arrowCounter.value <= filteredOptions.value.length - 1 &&
      arrowCounter.value > -1
    ) {
      add(filteredOptions.value[arrowCounter.value]);
    }
    // Esc
  } else if ($event.key === 'Escape') {
    $event.preventDefault();
    $event.stopPropagation();
    handleEsc();
    // Tab
  } else if ($event.key === "Tab") {
    if (!active.value) active.value = true;
    // Non-special keys
  } else if (!showDropdown.value && !keys.includes($event.key)) {
    open();
  }
}

const handleKeyDown = ($event: KeyboardEvent) => {
  if (props.disabled) return;
  // Space bar
  if (!props.canSearch && $event.key === 'Space') $event.preventDefault();
  // Enter
  if ($event.key === "Enter" && showDropdown.value) $event.preventDefault();
  // Delete or Backspace
  if ($event.key === "Delete" || $event.key === "Backspace") {
    removeLastSelection();
    // Tab
  } else if ($event.key === "Tab") {
    if (showDropdown.value) {
      $event.preventDefault();
      if (
        arrowCounter.value <= filteredOptions.value.length - 1 &&
        arrowCounter.value > -1 &&
        canAddItem.value &&
        model.value && model.value.trim() !== '' &&
        !isSelectedOption(filteredOptions.value[arrowCounter.value])
      ) {
        add(filteredOptions.value[arrowCounter.value]);
      }
    }
    // Up Arrow
  } else if ($event.key === "ArrowUp" || $event.key === "Up") {
    $event.preventDefault();
    $event.stopPropagation();
    handleArrows("up");
    // Down Arrow
  } else if ($event.key === "ArrowDown" || $event.key === "Down") {
    $event.preventDefault();
    $event.stopPropagation();
    handleArrows("down");
  }
}

const handleMouseUp = () => {
  if (props.disabled) return;
  open();
  active.value = true;
}

const handleCloseOnSelection = () => {
  if (props.closeOnSelection) {
    close();
  } else {
    focusInput();
  }
}

const handleOutsideClick = ($event: MouseEvent) => {
  if (root.value?.contains($event.target)) return;

  if (showDropdown.value) {
    if (
      arrowCounter.value <= filteredOptions.value.length - 1 &&
      arrowCounter.value > -1 &&
      canAddItem.value &&
      model.value && model.value.trim() !== ''
    ) {
      add(filteredOptions.value[arrowCounter.value]);
      $event.preventDefault();
    }
  }

  if (active.value) active.value = false;
  close();
}

const handleOutsideKeyUp = ($event: KeyboardEvent) => {
  if (root.value?.contains($event.target)) return;
  if (active.value) active.value = false;
}

const positionDropdown = async () => {
  if (!showDropdown.value) return;
  await nextTick()
  if (props.openDirection === "down") dropUp.value = false;
  if (props.openDirection === "up") {
    dropUp.value = true;
    bottom.value = root.value.clientHeight + "px";
  }
  if (props.openDirection === "auto") {
    // const spaceAbove = root.value.getBoundingClientRect().top
    const spaceBelow =
      window.innerHeight - root.value.getBoundingClientRect().bottom;
    const notEnoughSpaceBelow = spaceBelow < props.maxHeight;
    dropUp.value = notEnoughSpaceBelow;
    bottom.value = dropUp.value ? root.value.clientHeight + "px" : "auto";
  }
}

const handleEsc = () => {
  close();
}

const handleRequired = () => {
  (input.value as HTMLInputElement).focus();
  if (!active.value) active.value = true;
}
</script>

<style lang="postcss" scoped>
@reference "../../../tailwindcss/tailwind.css";

.sds-multiselect {
  @apply block relative border border-gray-300 dark:border-gray-700 py-0.5 min-w-0 whitespace-normal text-base shadow-inner text-gray-900 bg-white rounded-theme-sm w-full dark:text-gray-50 dark:bg-gray-900;
}

.sds-multiselect.active,
.sds-multiselect.open {
  @apply border-blue-500 rounded-theme-sm ring-2 ring-blue-300 dark:ring-blue-700;
}

.sds-multiselect.open:not(.up) {
  border-bottom: 1px solid transparent;
  border-radius: 4px 4px 0 0;
  @apply sds-theme-plaid:rounded-none;
}

.sds-multiselect.open.up {
  border-top: 1px solid transparent;
  border-radius: 0 0 4px 4px;
  @apply sds-theme-plaid:rounded-none;
  box-shadow: inset 0 -1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
}

.sds-multiselect.disabled,
fieldset[disabled] .sds-multiselect {
  @apply cursor-auto shadow-none bg-gray-100 border-gray-100 text-gray-400 dark:bg-gray-850 dark:border-gray-850 dark:text-gray-600;
}

.sds-multiselect.disabled *,
fieldset[disabled] .sds-multiselect * {
  @apply select-none pointer-events-none placeholder:text-gray-400 dark:placeholder:text-gray-600;
}

.sds-multiselect.invalid,
fieldset[invalid] .sds-multiselect {
  @apply border-red-500 dark:border-red-300;
}

.sds-multiselect.valid,
fieldset[valid] .sds-multiselect {
  @apply border-green-500 dark:border-green-400;
}

.multiselect-caret {
  @apply transition-transform duration-200 ease-linear text-center absolute;
  width: 32px;
  height: 34px;
  right: 0;
  top: 0;
  padding: 4px 8px;
}

.open .multiselect-caret {
  transform: rotate(180deg);
}

.multiselect-caret:before {
  position: relative;
  right: 0;
  top: 65%;
  color: theme("colors.gray.400");
  margin-top: 4px;
  border-style: solid;
  border-width: 5px 5px 0;
  border-color: theme("colors.gray.300") transparent transparent;
  content: "";
}

.dark .multiselect-caret {
  border-color: theme("colors.gray.500") transparent transparent;
  color: theme("colors.gray.600");
}

.multiselect-clear {
  @apply text-gray-400;
  position: absolute;
  top: 0;
  right: 0;
  height: 42px;
  width: 32px;
  background: 0;
  border: 0;
  cursor: pointer;
}

.multiselect-clear:hover,
.multiselect-clear:active,
.multiselect-clear:focus {
  @apply text-gray-900 dark:text-gray-100;
}

.dropdown-list {
  position: absolute;
  background: theme("colors.white");
  padding: 0;
  border: 1px solid theme("colors.blue.400");
  border-radius: 0 0 4px 4px;
  @apply sds-theme-plaid:rounded-none;
  width: calc(100% + 2px);
  overflow-y: auto;
  left: -1px;
  z-index: 1000;
}

.dark .dropdown-list {
  border: 1px solid theme("colors.blue.600");
  background: theme("colors.gray.850");
}

.open:not(.up) .dropdown-list {
  border-top: 0;
  border-radius: 0 0 4px 4px;
  @apply sds-theme-plaid:rounded-none;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.175);
}

.showResults.open:not(.up) .dropdown-list {
  border-top: 1px solid theme("colors.gray.300");
}

.dark .showResults.open:not(.up) .dropdown-list {
  border-top: 1px solid theme("colors.gray.850");
}

.open.up .dropdown-list {
  border-bottom: 0;
  border-radius: 4px 4px 0 0;
  @apply sds-theme-plaid:rounded-none;
  box-shadow: 0 -10px 10px rgba(0, 0, 0, 0.175);
}

.showResults.open.up .dropdown-list {
  border-bottom: 1px solid theme("colors.gray.300");
}

.dark .showResults.open.up .dropdown-list {
  border-bottom: 1px solid theme("colors.gray.850");
}

.dropdown-list-item {
  padding: 4px 12px;
  cursor: pointer;
}

.dropdown-list-item.active {
  background: theme("colors.gray.50");
  color: theme("colors.black");
}

.dark .dropdown-list-item.active {
  background: theme("colors.gray.800");
  color: theme("colors.white");
}

.dropdown-list-item.selected {
  opacity: 0.5;
}

.dropdown-list-item.active.selected {
  background: theme("colors.transparent");
}

.dropdown-list-item.loading {
  color: theme("colors.gray.600");
}

.dark .dropdown-list-item.loading {
  color: theme("colors.gray.400");
}

.tag-list,
.dropdown-list {
  list-style: none;
  margin: 0;
}

.tag-list {
  @apply flex flex-wrap items-center py-[2px] px-[8px];
}

.hideCaret .tag-list,
.showClear .tag-list {
  margin-right: 26px;
}

.tag-list-item {
  display: inline-block;
  border: 1px solid theme("colors.gray.300");
  background: theme("colors.white");
  border-radius: 4px;
  @apply sds-theme-plaid:rounded-none;
  padding: 0 6px;
  margin: 3px 4px;
  cursor: pointer;
}

.dark .tag-list-item {
  border: 1px solid theme("colors.gray.700");
  background: theme("colors.gray.800");
}

.tag-list-item .remove {
  border: 0;
  background: 0;
  color: theme("colors.gray.300");
  cursor: pointer;
  margin: 0;
  padding: 0 3px 0 0;
  font-weight: bold;
}

.dark .tag-list-item .remove {
  color: theme("colors.gray.50");
}

.tag-list-item .remove:hover,
.tag-list-item .remove:active,
.tag-list-item .remove:focus {
  @apply text-gray-900 dark:text-gray-300;
}

.tag-list.single {
  width: 100%;
}

.hideCaret:not(.hasTags) .tag-list.single {
  width: auto;
}

.tag-list.single .tag-list-item:not(.input) {
  border: 0;
  padding: 0;
  background: 0;
}

.tag-list-item.input {
  border: none;
  margin: 0;
  padding: 4px;
  cursor: pointer;
  background: transparent;
}

.tag-list-item.input input {
  margin: 0;
  padding: 0;
  border: 0;
  cursor: pointer;
  background: transparent;
}

.tag-list-item.input input:focus {
  outline: none;
}

.tag-list-item.input input::-ms-clear {
  display: none;
}

.tag-list-item.input input::placeholder {
  @apply italic text-gray-300;
}

.dark .tag-list-item.input input::placeholder {
  @apply  text-gray-700;
}

.open.hasTags.canSearch .single .tag-list-item.input input {
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  border: 1px solid theme("colors.gray.300");
  border-radius: 4px;
  @apply sds-theme-plaid:rounded-none;
  padding: 4px;
}

.dark .open.hasTags.canSearch .single .tag-list-item.input input {
  border: 1px solid theme("colors.gray.800");
}

.hasTags:not(.open) .single .tag-list-item.input input {
  opacity: 0;
  margin-left: -9999px;
}

.faux-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  height: auto;
  width: auto;
  white-space: nowrap;
  margin: 0;
  padding: 0;
}
</style>
