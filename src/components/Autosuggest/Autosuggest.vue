<template>
  <div class="relative">
    <div class="input-group">
      <div
        class="relative w-full input-group"
        :class="{
          'opacity-50 pointer-events-none': disabled,
        }"
      >
        <input
          ref="input"
          v-model.trim="q"
          type="text"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          autocorrect="off"
          class="pr-8 rounded-r-none form-control"
          :placeholder="placeholder"
          :disabled="disabled"
          :maxlength="maxlength"
          @input="handleChange"
          @keydown.down="handleArrows('down')"
          @keydown.up="handleArrows('up')"
          @keyup.enter.self="handleEnter"
          @keyup.esc="handleEsc"
          @blur="resetDropdown"
        >
        <button
          v-if="q.length > 0"
          tabindex="-1"
          type="button"
          class="absolute text-gray-500 right-2 top-3 hover:text-secondary focus:outline-none"
          :disabled="disabled"
          @click="handleClearSearchBtn"
        >
          <span class="sr-only">Clear search</span>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5 x"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <button
        :disabled="disabled || disableSearch"
        :class="[variantClass, btnClass]"
        type="button"
        @click="handleSearchBtn"
      >
        <span class="sr-only">Search</span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5 search"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <ul
      v-if="isOpen && !preventDisplay"
      class="absolute z-50 w-full p-0 mt-1 overflow-auto bg-white border rounded shadow dark:border-gray-600 dark:bg-gray-700"
    >
      <li
        v-for="(result, i) in results"
        :key="i"
        class="flex px-4 py-2 text-sm text-left text-gray-900 list-none cursor-pointer dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
        :class="{ 'active bg-gray-200 dark:bg-gray-600': i === arrowCounter }"
        @mousedown.prevent="handleDropdownClick(result)"
      >
        <div>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            class="inline-block w-5 h-5 my-auto mr-2 search"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="flex-grow inline-block my-auto truncate align-middle">
          <span v-html="resultWithHightlight(result)" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import uniq from "lodash/uniq";

export default {
  name: "SdsAutosuggest",
  props: {
    /**
     * The v-model passed from the parent that is used to init the local state this.q
     */
    modelValue: {
      type: String,
      default: "",
    },
    /**
     * The placeholder for the input
     */
    placeholder: {
      type: String,
      default: "",
    },
    /**
     * Determine whether to disable the component
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Sets the maxlength of the input field
     */
    maxlength: {
      type: Number,
      default: 524288,
    },
    /**
     * Determine whether to disable the search capability of the component
     */
    disableSearch: {
      type: Boolean,
      default: false,
    },
    /**
     * A function that is triggered when autosuggestion should take place
     */
    autosuggest: {
      type: Function,
      default: () => {},
    },
    /**
     * The look and feel of the search box
     */
    variant: {
      type: String,
      default: "default",
    },
    /**
     * A string used to manipulate the CSS classes assigned to the search button
     */
    btnClass: {
      type: String,
      default: "px-3",
    },
    /**
     * The items used by autosuggest
     */
    items: {
      type: Array,
      default: () => [],
    },
    /**
     * The character threshold before autosuggest kicks in
     */
    threshold: {
      type: Number,
      default: 1,
    },
    /**
     * Determine whether to autofocus the input
     */
    autofocus: {
      type: Boolean,
      default: false,
    },
    /**
     * Determine whether to use the built-in search term highlighter
     */
    useBuiltInHighlighting: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'search', 'result'],
  data() {
    return {
      originalQ: "",
      loading: false,
      isOpen: false,
      preventDisplay: true,
      results: [],
      arrowCounter: 0,
    };
  },
  computed: {
    q: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
    // Determine whether to start autosuggest based on threshold
    metThreshold() {
      return this.q.length >= this.threshold;
    },
    variantClass() {
      switch (this.variant) {
        case "primary":
          return "btn btn-default text-primary dark:text-blue-400";
        case "success":
          return "btn btn-default text-success dark:text-green-400";
        case "info":
          return "btn btn-default text-info dark:text-teal-400";
        case "warning":
          return "btn btn-default text-warning dark:text-orange-400";
        case "danger":
          return "btn btn-default text-danger dark:text-red-400";
        case "light":
          return "btn btn-default text-light";
        case "dark":
          return "btn btn-default text-dark";
        default:
          return "btn btn-default text-secondary dark:text-gray-300";
      }
    },
  },
  watch: {
    items(val) {
      this.results = val;
      this.loading = false;
      this.filterResults();
    },
  },
  mounted() {
    if (this.autofocus) this.$refs.input.focus();
    document.addEventListener("click", this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    formatTerm(text) {
      return text.replace(/<\/?b>/gi, "").trim();
    },
    // Filter results based on query
    filterResults() {
      // uncapitalize all terms to help with filtering,
      // then trim all of the terms,
      // then strip duplicates
      const items = JSON.parse(JSON.stringify(this.items));
      this.results = uniq(
        items
          .filter((item) => {
            const terms = this.q.toLowerCase().replace('"', "").split(" ");
            let termFound = false;
            terms.forEach((term) => {
              if (
                this.formatTerm(item.term)
                  .toLowerCase()
                  .indexOf(this.formatTerm(term)) > -1
              )
                termFound = true;
            });
            return termFound;
          })
          .map((item) => {
            item.term = item.term.trim();
            return item;
          }),
        "term"
      );
      this.isOpen = this.results.length > 0 && this.q !== "";
      if (this.originalQ === "") this.originalQ = (" " + this.q).slice(1);
    },
    // Html version of result used in dropdown list with original query highlighting
    resultWithHightlight(result) {
      if (!this.useBuiltInHighlighting) return result.term;
      let terms = this.originalQ.replace('"', "").split(" ");
      terms = terms.join("|").replace(/[-[\]{}()*+?.,\\^$]/g, "\\$&");
      const matcher = new RegExp(terms, "gi");
      return result.term.replace(matcher, (match) => `<b>${match}</b>`);
    },
    // Reset the dropdown
    resetDropdown() {
      this.originalQ = "";
      this.isOpen = false;
      this.preventDisplay = true;
      this.results = [];
      this.arrowCounter = -1;
    },
    // Handle input box text changes, added a debounce to allow time before
    // ajax request
    handleChange() {
      // Only autosuggest after threshold met
      if (!this.metThreshold) {
        this.resetDropdown();
        return;
      }

      // Reset dropdown options but keep/allow an open state
      this.originalQ = "";
      this.arrowCounter = -1;
      this.preventDisplay = false;

      this.loading = true;
      // Handle autosuggest
      this.autosuggest();
    },
    // Up/Down arrow key logic
    handleArrows(direction) {
      // Allow an open state
      this.preventDisplay = false;

      switch (direction) {
        // When going down, select next result until end
        // then loop back around starting with original query.
        case "down":
          if (!this.isOpen && this.metThreshold) this.filterResults();
          if (this.arrowCounter < this.results.length - 1) {
            this.arrowCounter = this.arrowCounter + 1;
          } else {
            this.arrowCounter = -1;
          }
          break;
        // When going up, select prev result until at original query
        // then loop back around starting at the end of the results.
        case "up":
          if (this.arrowCounter > -1) {
            this.arrowCounter = this.arrowCounter - 1;
          } else {
            this.arrowCounter = this.results.length - 1;
          }
          break;
      }
      if (this.isOpen) {
        // Set the input boxes text to the value of the result
        if (
          this.results.length > 0 &&
          typeof this.results[this.arrowCounter] !== "undefined"
        ) {
          this.q = this.formatTerm(this.results[this.arrowCounter].term);
        }
        // If not on a result, use the original query
        if (this.arrowCounter === -1) this.q = this.originalQ;
      }
    },
    // Esc key logic
    handleEsc() {
      if (this.originalQ !== "") this.q = (" " + this.originalQ).slice(1);
      this.resetDropdown();
    },
    // Click outside of search box and dropdown handler
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.resetDropdown();
      }
    },
    handleClearSearchBtn() {
      this.q = "";
      this.$refs.input.focus();
    },
    // Handle Search button logic
    handleSearchBtn() {
      if (this.disabled || this.disableSearch) return;
      this.resetDropdown();
      this.$emit("search", this.q);
    },
    // Handle click on dropdown results
    async handleDropdownClick(result) {
      if (this.disabled || this.disableSearch) return;
      this.q = this.formatTerm(result.term);
      this.resetDropdown();
      if (result !== null) {
        this.$emit("result", result);
      }
      this.$nextTick(() => this.$emit("search", this.q));
    },
    // Handle Enter key logic
    async handleEnter() {
      if (this.disabled || this.disableSearch) return;
      const result =
        typeof this.results[this.arrowCounter] !== "undefined"
          ? this.results[this.arrowCounter]
          : null;
      this.q =
        result !== null
          ? this.formatTerm(this.results[this.arrowCounter].term)
          : this.originalQ || this.q;
      this.resetDropdown();
      if (result !== null) {
        this.$emit("result", result);
      }
      this.$nextTick(() => this.$emit("search", this.q));
    },
  },
};
</script>
