<template>
  <dropdown
    v-model="open"
    :hide-caret="hideCaret"
    :btn-class="btnClass"
    :menu-class="menuClass"
    :right="right"
    :drop-up="dropUp"
  >
    <template #title>
      {{ btnText }}
    </template>
    <div
      v-if="enableFilter"
      class="input-group input-group-sm mb-2 pb-2 border-b"
    >
      <input
        v-model="filterText"
        type="text"
        class="form-control"
        placeholder="Type to filter"
      >
      <span class="input-group-text">
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </div>
    <div
      v-if="!enableFilter"
      class="pb-2 mb-2 space-x-1 space-y-2 border-b dark:border-gray-500"
    >
      <input
        :id="`filter_by_dropdown_select_all_${uuid}`"
        type="checkbox"
        :checked="allSelected"
        :indeterminate.prop="indeterminate"
        @click="toggleSelect"
      >
      <label
        :for="`filter_by_dropdown_select_all_${uuid}`"
        class="text-gray-900 dark:text-gray-50"
      >Select all</label>
    </div>
    <div class="scroll-area max-h-48">
      <ul>
        <li
          v-for="o in filteredTmpOptions"
          :key="o.id"
        >
          <div class="space-x-1">
            <input
              :id="`filter_by_dropdown_selection_list_${o.id}`"
              v-model="o.selected"
              type="checkbox"
              class="focus:ring-0"
              :value="o.id"
            >
            <label
              :for="`filter_by_dropdown_selection_list_${o.id}`"
              class="text-gray-900 dark:text-gray-50"
            >{{ o.text }}</label>
          </div>
        </li>
      </ul>
    </div>
    <div class="pt-4 space-y-2">
      <button
        class="btn btn-blue btn-block btn-sm"
        @click="saveSelections"
      >
        Apply filter
      </button>
      <button
        class="btn btn-default btn-block btn-sm"
        @click="cancelSelections"
      >
        Cancel
      </button>
    </div>
  </dropdown>
</template>

<script>
import Dropdown from '../Dropdown/Dropdown.vue';
import uuid from '../../helpers/uuid';

export default {
  name: "SdsFilterByDropdown",
  components: {
    Dropdown,
  },
  props: {
    /**
     * The v-model for this comonent. Determines opened/closed state.
     */
    modelValue: {
      type: Array,
      default: () => [],
    },
    /**
     * The text for the toggle button.
     */
    btnText: {
      type: String,
      default: "Filter",
    },
    /**
     * Determines whether to show or hide the caret.
     */
    hideCaret: {
      type: Boolean,
      default: false,
    },
    /**
     * Determines the class list to use on the toggle button.
     */
    btnClass: {
      type: String,
      default: "link link-secondary",
    },
    /**
     * Determines the class list to use on the menu.
     */
    menuClass: {
      type: String,
      default: "p-2 my-1 bg-gray-100 border rounded-md shadow-lg w-72 dark:border-gray-500 dark:bg-gray-700",
    },
    /**
     * Determines whether to right-align the menu.
     */
    right: {
      type: Boolean,
      default: false,
    },
    /**
     * Determines whether to position the menu above the toggle button.
     */
    dropUp: {
      type: Boolean,
      default: false,
    },
    /**
     * Determine whether to enable option filtering on the dropdown.
     */
    enableFilter: {
      type: Boolean,
      default: false,
    },
    /**
     * Determines whether to alphabetically sort the options.
     */
    enableSortOptions: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      uuid: null,
      filterText: "",
      tmpOptions: [],
      open: false,
    };
  },
  computed: {
    options: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
    allSelected() {
      return this.tmpOptions.every((i) => i.selected);
    },
    someSelected() {
      return this.tmpOptions.some((i) => i.selected);
    },
    indeterminate() {
      return this.someSelected && !this.allSelected;
    },
    filteredTmpOptions() {
      return this.tmpOptions.filter(
        (i) =>
          i.text && i.text.toLowerCase().includes(this.filterText.toLowerCase())
      );
    },
  },
  watch: {
    open() {
      this.resetTmpOptions();
      this.filterText = "";
    }
  },
  created() {
    this.uuid = `sds-filter-by-dropdown__${uuid()}`;
  },
  methods: {
    toggleSelect() {
      if (this.allSelected) {
        this.deselectAllOptions();
      } else {
        this.selectAllOptions();
      }
    },
    saveSelections() {
      this.$emit("update:modelValue", this.tmpOptions);
      this.closeDropdown();
    },
    cancelSelections() {
      if (!this.open) {
        return;
      }
      // Make a unique copy of default list data
      this.resetTmpOptions();
      this.closeDropdown();
    },
    resetTmpOptions() {
      const options = JSON.parse(JSON.stringify(this.options));
      if (this.enableSortOptions) {
        this.tmpOptions = options
          .sort((a, b) => {
            return a.text.toLowerCase() < b.text.toLowerCase()
              ? -1
              : a.text.toLowerCase() > b.text.toLowerCase()
                ? 1
                : 0;
          })
          .sort((a, b) => {
            return a.selected > b.selected
              ? -1
              : a.selected < b.selected
                ? 1
                : 0;
          });
      } else {
        this.tmpOptions = options;
      }
    },
    deselectAllOptions() {
      this.tmpOptions.forEach((i) => {
        i.selected = false;
      });
    },
    selectAllOptions() {
      this.tmpOptions.forEach((i) => {
        i.selected = true;
      });
    },
    toggleDropdown() {
      this.resetTmpOptions();
      this.filterText = "";
      this.open = !this.open;
    },
    closeDropdown() {
      this.filterText = "";
      this.open = false;
    },
  },
};
</script>
