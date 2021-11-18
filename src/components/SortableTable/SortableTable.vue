<template>
  <table>
    <!-- Table col definition -->
    <colgroup>
      <col
        v-for="key in localSortKeys"
        :key="key.id"
        :class="[
          key.class,
          localSortKey === key.id ? 'bg-gray-100 dark:bg-gray-800' : '',
        ]"
      >
      <col>
    </colgroup>
    <!-- Table header -->
    <thead>
      <tr>
        <th
          v-for="key in localSortKeys"
          :key="key.id"
          :class="{ 'bg-white dark:bg-gray-700': localSortKey === key.id }"
          class="space-x-2 cursor-pointer"
          @click="sortBy(key.id)"
        >
          <span>{{ key.title }}</span>
          <i
            class="fas"
            :class="{
              'fa-sort': localSortOrders[key.id] === 0,
              'fa-sort-up': localSortOrders[key.id] > 0,
              'fa-sort-down': localSortOrders[key.id] < 0,
            }"
          />
        </th>
        <th v-if="showActionColumn">
          <span>Actions</span>
        </th>
      </tr>
    </thead>
    <!-- Table body -->
    <tbody>
      <tr
        v-for="entry in filteredEntries"
        :key="entry.id"
      >
        <!-- @slot Sortable table content. @binding entry, activeSortKey -->
        <slot
          :entry="entry"
          :active-sort-key="localSortKey"
        />
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'SdsSortableTable',
  props: {
    /**
     * An array of objects. Each object must have a unique "id" param but everything else is optional.
     *
     * Example object: { id: 1, title: "Title", lastModified: "01/01/2019" }.
     */
    entries: {
      type: Array,
      default: () => [],
    },
    /**
     * The id of the current sortKeys item being using to sort the table.
     */
    sortKey: {
      type: String,
      default: "",
    },
    /**
     * An array of objects. These objects determine the params of the entries object array that should be used to sort the table.
     * Each object must contain an "id" that identifies the entries array's object key used for sorting, a "title" that is used in the table
     * column header, and a "type" that is used to determine how the sort functionality should treat the data (string, date, object, other).
     *
     * If using type "date", ensure the date can be parsed by JavaScript's Date Instance: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date.
     *
     * Example sortKeys object: { id: "title", title: "Column Title", type: "string" }.
     *
     * Another example sortKeys object: { id: "lastModified", title: "Last Modified Date", type: "date" }.
     */
    sortKeys: {
      type: Array,
      default: () => [],
    },
    /**
     * Determines whether to append an unsortable "actions" column to the table. When set to true, add an additional column
     * to the slot which can be used to add action buttons for each entry row (edit, remove, etc).
     *
     * Is is recommended to use the "action-col" class for the action column.
     */
    showActionColumn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localSortKey: this.sortKey,
      localSortKeys: this.sortKeys,
      localSortOrders: {},
    };
  },
  computed: {
    filteredEntries() {
      let data = JSON.parse(JSON.stringify(this.entries));

      // Column sorting
      if (this.localSortKey !== "") {
        const order = this.localSortOrders[this.localSortKey] || 1;
        const sortObject = this.localSortKeys.find(
          (i) => i.id === this.localSortKey
        );
        data = data.slice().sort((a, b) => {
          switch (sortObject.type) {
            case "object":
              if (
                a[this.localSortKey][sortObject.key] === null ||
                b[this.localSortKey][sortObject.key] === null
              ) {
                return order === 1 ? -1 : 1;
              }
              a = a[this.localSortKey][sortObject.key];
              b = b[this.localSortKey][sortObject.key];
              break;
            case "objectArray":
              if (
                a[this.localSortKey].every((i) => i[sortObject.key] === null) ||
                b[this.localSortKey].every((i) => i[sortObject.key] === null)
              ) {
                return order === 1 ? -1 : 1;
              }
              a = a[this.localSortKey][0][sortObject.key];
              b = b[this.localSortKey][0][sortObject.key];
              break;
            case "date":
              if (
                a[this.localSortKey] === null ||
                b[this.localSortKey] === null
              ) {
                return order === 1 ? -1 : 1;
              }
              a = new Date(a[this.localSortKey]);
              b = new Date(b[this.localSortKey]);
              break;
            default:
              if (
                a[this.localSortKey] === null ||
                b[this.localSortKey] === null
              ) {
                return order === 1 ? -1 : 1;
              }
              a = a[this.localSortKey];
              b = b[this.localSortKey];
          }
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return data;
    },
  },
  mounted() {
    this.createLocalSortOrders();
    this.sortBy(this.localSortKey, true);
  },
  methods: {
    createLocalSortOrders() {
      for (const sortKey of this.localSortKeys) {
        this.localSortOrders[sortKey.id] = 0;
      }
    },

    // Sorting
    sortBy(key, desc = false) {
      this.localSortKey = key;
      Object.keys(this.localSortOrders).forEach((i) => {
        if (i !== key) this.localSortOrders[i] = 0;
      });
      if (desc) {
        this.localSortOrders[key] = -1;
      } else {
        this.localSortOrders[key] =
          this.localSortOrders[key] === 0 ? 1 : this.localSortOrders[key] * -1;
      }
    },
  },
};
</script>
