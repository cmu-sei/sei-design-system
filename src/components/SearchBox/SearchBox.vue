<template>
  <div
    data-id="sds-search-box"
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
      @click="input?.focus()"
    >
      <span class="sr-only">Search box</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        height="16"
        width="16"
        viewBox="0 0 512 512"
        aria-hidden="true"
      >
        <path
          d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
        />
      </svg>
    </button>
    <input
      :id="id"
      ref="input"
      v-model.trim="q"
      type="text"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
      autocorrect="off"
      class="form-control"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      @keyup="searchOnKeyUp ? search() : null"
      @keyup.enter.self="search"
    >
    <button
      v-if="q.length > 0 && !disabled"
      tabindex="-1"
      type="button"
      class="btn px-1 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
      :class="{
        'btn-sm': size === 'sm'
      }"
      @click="clearSearch"
    >
      <span class="sr-only">Clear search</span>
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <!-- @slot Default content. -->
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsSearchBox'
})

const props = defineProps({
  /**
   * Determines the id of the input.
   */
  id: { type: String, default: undefined },
  /**
   * The v-model passed from the parent that is used to init the local state "q.value".
   */
  modelValue: {
    type: String,
    default: "",
  },
  /**
   * The placeholder for the input.
   */
  placeholder: {
    type: String,
    default: "",
  },
  /**
   * Disables the component to prevent user interaction.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * The max amount of characters that can be entered into the input.
   */
  maxlength: {
    type: Number,
    default: 524288,
  },
  /**
   * Determines the size of the input field. Options are "sm" and "md".
   */
  size: { type: String as PropType<"sm" | "md">, default: "" },
  /**
   * Determines if a search should be performed on key up.
   */
  searchOnKeyUp: {
    type: Boolean,
    default: false,
  },
  /**
   * Determine whether to autofocus the input.
   */
  autofocus: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:model-value', 'search'])

const input = ref()

const q = computed({
  get() {
    return props.modelValue;
  },
  set(val: string) {
    /**
     * Emitted when modelValue changes.
     */
    emit("update:model-value", val);
  },
})

onMounted(() => {
  if (props.autofocus) input.value.focus();
})

const clearSearch = () => {
  q.value = "";
  input.value.focus();
}

const search = () => {
  if (props.disabled) return;
  /**
   * Emitted when a search is triggered with a payload of the query.
   */
  emit("search", q.value);
}
</script>
