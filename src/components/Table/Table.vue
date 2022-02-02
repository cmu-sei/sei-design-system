<template>
  <table>
    <!-- Table col definition -->
    <colgroup>
      <col
        v-for="field in fields"
        :key="field.key"
        :class="{
          [sortedColumnClass]: sortField === field.key
        }"
      >
    </colgroup>
    <!-- Table header -->
    <thead>
      <tr>
        <th
          v-for="field in fields"
          :key="field.key"
          :class="{ 
            [sortedColumnClass]: sortField === field.key,
            'pointer-events-none': !field.sortable
          }"
          class="space-x-1 cursor-pointer select-none group"
          @click="handleSortBy(field)"
        >
          <span>{{ field.label }}</span>
          <svg
            v-if="field.sortable"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="inline-block w-4 h-4 group-hover:opacity-100"
            :class="{
              'opacity-100': sortField === field.key,
              'opacity-50': sortField !== field.key,
            }"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 320 512"
          >
            <path
              v-if="sortField !== field.key"
              d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
              fill="currentColor"
            />
            <path
              v-if="sortField === field.key && sortOrder > 0"
              d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
              fill="currentColor"
            />
            <path
              v-if="sortField === field.key && sortOrder < 0"
              d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
              fill="currentColor"
            />
          </svg>
        </th>
        <th v-if="showActionsColumn">
          Actions
        </th>
      </tr>
    </thead>
    <!-- Table body -->
    <tbody>
      <!-- @slot Table content. Use this to override the table rows. @binding items -->
      <slot :items="filteredItems">
        <tr
          v-for="item in filteredItems"
          :key="item.id"
        >
          <td
            v-for="(value, key) in item"
            :key="key"
          >
            <!-- @slot Dynamic table cell content. Use this to target a table cell using a slot cell(FIELD_KEY) format. @binding item -->
            <slot
              :name="`cell(${key})`"
              :item="originalItem(item)"
            >
              {{ formatItem(value, key) }}
            </slot>
          </td>
          <td v-if="showActionsColumn">
            <!-- @slot Actions column content. Use this to add content to the actions column when not using the default slot. @binding item -->
            <slot
              name="actions-column"
              :item="originalItem(item)"
            />
          </td>
        </tr>
      </slot>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'SdsTable',
  props: {
    /**
     * An array of objects. Each object must have a unique "id" but everything else is optional.
     * 
     * Please note that the **items** keys map 1:1 to the **fields** keys, meaning that, any key found in the items
     * array that is not in the fields array will be ignored and not displayed.
     *
     * Example object:
     * 
     * **{ id: 1, title: "Title", lastModified: "01/01/2019" }**
     */
    items: {
      type: Array,
      default: () => [],
    },
    /**
     * An array of objects. These objects determine the column headers.
     * 
     * Each object must contain a unique "key" and a "label" for use in the table column header.
     * 
     * Optional object properties include a "sortable" boolean and a "format" function. The "sortable"
     * key indicates whether a table column is sortable. The "format" key allows you to customize
     * the way the item's data appears in the table.
     *
     * Basic example object (not sortable):
     * 
     * **{ key: "id", label: "ID" }**
     * 
     * Advanced example object (sortable with custom formatter):
     * 
     * **{ key: "lastModifiedDate", label: 'Last Modified', sortable: true, format: (date) => date.toLocaleDateString() }**
     */
    fields: {
      type: Array,
      default: () => [],
    },
    sortBy: { type: String, default: '' },
    sortDesc: { type: Boolean, default: false },
    /**
     * Determines whether to append an unsortable "Actions" column to the table. When set to true, an additional column is added
     * to the right side of the table.
     * 
     * The "actions-column" slot can be used to add action buttons for each entry row (edit, remove, etc).
     */
    showActionsColumn: {
      type: Boolean,
      default: false
    },
    /**
     * Determines the CSS classes used on the sorted column.
     */
    sortedColumnClass: {
      type: String,
      default: 'bg-gray-100 dark:bg-gray-800'
    }
  },
  data() {
    return {
      sortField: this.sortBy,
      sortOrder: this.sortDesc ? -1 : 1
    }
  },
  computed: {
    filteredItems() {
      return this.items && this.items.map((i) => {
        const item = {}
        this.fields.forEach((x) => {
          item[x.key] = i[x.key]
        })
        return item
      }).sort((a, b) => this.sortCompare(a, b, this.sortField)) || []
    }
  },
  watch: {
    sortBy (value) {
      this.sortField = value
    },
    sortDesc (value) {
      this.sortOrder = value ? -1 : 1
    }
  },
  methods: {
    originalItem(item) {
      return this.items.find((i) => i.id === item.id)
    },
    formatItem (value, key) {
      const field = this.fields.filter((i) => i.key === key)
      return field.length && field[0].format ? field[0].format(value) : value
    },
    handleSortBy(field) {
      this.sortField = field.key
      this.sortOrder = this.sortOrder === 0 ? 1 : this.sortOrder === 1 ? -1 : 1
    },
    sortCompare(aRow, bRow, key) {
      const a = aRow[key]
      const b = bRow[key]
      if (
        (typeof a === 'number' && typeof b === 'number') ||
        (a instanceof Date && b instanceof Date)
      ) {
        // If both compared fields are native numbers or both are native dates
        return (a < b ? -1 : a > b ? 1 : 0) * this.sortOrder
      } else {
        // Otherwise stringify the field data and use String.prototype.localeCompare
        return this.toString(a).localeCompare(toString(b)) * this.sortOrder
      }
    },
    // Helper function to stringify the values of an Object
    toString(value) {
      if (value === null || typeof value === 'undefined') {
        return ''
      } else if (value instanceof Object) {
        return Object.keys(value)
          .sort()
          .map(key => toString(value[key]))
          .join(' ')
      } else {
        return String(value)
      }
    }
  }
};
</script>
