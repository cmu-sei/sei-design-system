<template>
  <table
    data-id="sds-table"
    class="table-prose dark:table-prose-invert"
  >
    <caption v-if="!!$slots.caption || caption">
      <!-- @slot Caption content. This will override the **caption** prop. -->
      <slot name="caption">
        {{ caption }}
      </slot>
    </caption>
    <colgroup>
      <template v-for="field in displayedFields">
        <!-- @slot Col content. Used to help style columns. @binding active, activeClass -->
        <slot
          :name="`col(${field.key})`"
          :active="sortField === field.key"
          :active-class="sortedColumnClass"
        >
          <col
            :key="field.key"
            :class="{
              [sortedColumnClass]: sortField === field.key
            }"
          >
        </slot>
      </template>
    </colgroup>
    <thead class="border-t dark:border-gray-800">
      <tr>
        <th v-if="enableDrawer">
          <span class="sr-only">Drawers</span>
        </th>
        <template v-for="field in displayedFields">
          <template v-if="field.fields">
            <th
              :key="field.key"
              :class="{
                [sortedColumnClass || '']: sortField === field.key,
              }"
              class="whitespace-nowrap select-none group"
            >
              <button
                v-for="f, index in field.fields"
                :key="f.key"
                type="button"
                class="after:content-['/'] after:font-normal after:inline-block after:ml-0.5 after:mr-4 last:after:hidden"
                :class="{
                  'cursor-default': !f.sortable
                }"
                @click="f.sortable ? handleSortBy(f) : undefined"
              >
                <!-- @slot Head content. Allows for the customization of field titles. @binding field, active -->
                <slot
                  :name="`head(${f.key})`"
                  :field="f"
                  :active="sortField === f.key"
                >
                  <span
                    :class="{
                      'text-gray-900 dark:text-gray-100': sortField === f.key,
                      'font-normal': sortField !== f.key && index !== 0 
                    }"
                  >{{ f.label }}</span>
                  <svg
                    v-if="f.sortable"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    class="inline-block w-4 h-4 text-gray-900 dark:text-gray-100 -mt-2"
                    :class="{
                      'opacity-100': sortField === f.key,
                      'opacity-0 -mb-1 group-hover:opacity-50': sortField !== f.key,
                      '-mb-3': sortField === f.key && sortOrder > 0,
                      '-mt-2': sortField === f.key && sortOrder < 0,
                    }"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 320 512"
                  >
                    <path
                      v-if="sortField !== f.key"
                      d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
                      fill="currentColor"
                    />
                    <path
                      v-if="sortField === f.key && sortOrder > 0"
                      d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
                      fill="currentColor"
                    />
                    <path
                      v-if="sortField === f.key && sortOrder < 0"
                      d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
                      fill="currentColor"
                    />
                  </svg>
                </slot>
              </button>
            </th>
          </template>
          <template v-else>
            <th
              :key="field.key"
              :class="{
                [sortedColumnClass || '']: sortField === field.key,
              }"
              class="whitespace-nowrap space-x-1 select-none group"
            >
              <button
                :class="{
                  'cursor-default': !field.sortable
                }"
                @click="field.sortable ? handleSortBy(field) : undefined"
              >
                <!-- @slot Head content. Allows for the customization of field titles. @binding field, active -->
                <slot
                  :name="`head(${field.key})`"
                  :field="field"
                  :active="sortField === field.key"
                >
                  <span
                    :class="{
                      'text-gray-900 dark:text-gray-100': sortField === field.key
                    }"
                  >{{ field.label }}</span>
                  <svg
                    v-if="field.sortable"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    class="inline-block w-4 h-4 text-gray-900 dark:text-gray-100 -mt-2"
                    :class="{
                      'opacity-100': sortField === field.key,
                      'opacity-0 -mb-1 group-hover:opacity-50': sortField !== field.key,
                      '-mb-3': sortField === field.key && sortOrder > 0,
                      '-mt-2': sortField === field.key && sortOrder < 0,
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
                </slot>
              </button>
            </th>
          </template>
        </template>
      </tr>
    </thead>
    <tbody>
      <template
        v-for="item in sortedItems"
        :key="item.id"
      >
        <tr>
          <td
            v-if="enableDrawer"
            class="cursor-pointer w-4"
          >
            <button @click="toggleDrawer(item)">
              <svg
                v-if="item.id === openDrawerID"
                height="16"
                class="mt-1 text-gray-600 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                viewBox="0 0 512 512"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7L86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                  fill="currentColor"
                />
              </svg>
              <svg
                v-else
                height="16"
                class="mt-1 text-gray-600 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
                viewBox="0 0 384 512"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256L105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                  fill="currentColor"
                />
              </svg>
              <span class="sr-only">Toggle drawer</span>
            </button>
          </td>
          <template
            v-for="key in displayedFieldKeys"
            :key="key"
          >
            <component :is="cellElement(key)">
              <!-- @slot Cell content. Allow for styling table cell content. @binding value, item, and format -->
              <slot
                :name="`cell(${key})`"
                :value="format(item, key)"
                :item="item"
                :format="(k: string) => format(item, k)"
              >
                {{ format(item, key) }}
              </slot>
            </component>
          </template>
        </tr>
        <tr
          v-if="enableDrawer"
          :class="[openDrawerID !== item.id && 'collapse']"
        >
          <td :colspan="displayedFieldKeys.length + 1">
            <!-- @slot Drawer content. Allow for styling drawer and drawer content. @binding item -->
            <slot
              name="drawer"
              :item="item"
            />
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface TableField {
  key: string
  label: string
  format?: Function | undefined
  sortable?: boolean | undefined
  hidden?: boolean | undefined
  header?: boolean | undefined
  fields?: TableField[] | undefined
}

interface TableItem {
  id: number
  [key: string]: unknown
}

export default defineComponent({
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
      type: Array as PropType<TableItem[]>,
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
      type: Array as PropType<TableField[]>,
      default: () => [],
    },
    /**
     * Determines the field key to sort by.
     */
    sortBy: { type: String, default: '' },
    /**
     * Determines if sorting should be descending by default.
     */
    sortDesc: { type: Boolean, default: false },
    /**
     * Determines the caption for the table if desired.
     */
    caption: { type: String, default: null },
    /**
     * Determines the CSS classes used on the sorted column.
     */
    sortedColumnClass: { type: String, default: null },
    /**
     * Toggles on/off a drawer below each table row
     */
    enableDrawer: { type: Boolean, default: false }
  },
  emits: ['open-drawer'],
  data() {
    return {
      sortField: this.sortBy,
      sortOrder: this.sortDesc ? -1 : 1,
      openDrawerID: -1
    }
  },
  computed: {
    flatFields() {
      return this.fields.flatMap(i => {
        if (i.fields) {
          return i.fields
        } else {
          return i
        }
      })
    },
    sortedItems() {
      const items = this.items
      return items.sort((a, b) => this.sortCompare(a, b, this.sortField))
    },
    displayedFields() {
      return this.fields.filter((i) => !i.hidden)
    },
    displayedFieldKeys() {
      return Object.entries(this.displayedFields).map(([_key, value]) => value.key)
    }
  },
  methods: {
    toggleDrawer(item: TableItem) {
      if (this.openDrawerID === item.id) {
        this.openDrawerID = -1
      } else {
        this.openDrawerID = item.id
        this.$emit('open-drawer', item)
      }
    },
    cellElement(key: string) {
      const field = this.fields.find((f) => f.key === key)
      return field && field.header ? 'th' : 'td'
    },
    format(item: TableItem, key: string = '') {
      const field = this.flatFields.find(i => i.key === key)
      return field && field.format ? field.format(item[key]) : item[key]
    },
    handleSortBy(field: TableField) {
      this.sortField = field.key
      this.sortOrder = this.sortOrder === 0 ? 1 : this.sortOrder === 1 ? -1 : 1
    },
    sortCompare(aRow: TableItem, bRow: TableItem, key: string) {
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
        return this.toString(a as TableItem).localeCompare(this.toString(b as TableItem)) * this.sortOrder
      }
    },
    // Helper function to stringify the values of an Object
    toString(value: TableItem): string {
      if (value === null || typeof value === 'undefined') {
        return ''
      } else if (value instanceof Object) {
        return Object.keys(value)
          .sort()
          .map(key => this.toString(value[key] as TableItem))
          .join(' ')
      } else {
        return String(value)
      }
    }

  }
})
</script>
