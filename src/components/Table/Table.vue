<template>
  <table
    :id="id || 'sds-table'"
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
    <thead class="border-t dark:border-gray-700">
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
                'text-left': !field.align || field.align === 'left',
                'text-center': field.align === 'center',
                'text-right': field.align === 'right',
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
                'text-left': !field.align || field.align === 'left',
                'text-center': field.align === 'center',
                'text-right': field.align === 'right',
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
        v-for="item, index in sortedItems"
        :key="item.id"
      >
        <tr
          :id="`${id || 'sds-table'}_tr_${item.id || index}`"
          :class="{
            'dark:[.table-prose_tbody_&]:border-b-0 [.table-prose_tbody_&]:border-b-0 border-b-0 dark:[.table-prose_tbody_&]:bg-gray-850 [.table-prose_tbody_&]:bg-gray-50 bg-gray-50 dark:bg-gray-850': item.id === openDrawerID
          }"
        >
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
            <component
              :is="cellElement(key) as unknown"
              :class="{
                'text-left': displayedFields.find(i => i.key === key)?.align === 'left',
                'text-center': displayedFields.find(i => i.key === key)?.align === 'center',
                'text-right': displayedFields.find(i => i.key === key)?.align === 'right'
              }"
            >
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
          v-if="item.id === openDrawerID"
          :id="`${id || 'sds-table'}_tr_${item.id || index}_drawer`"
          class="dark:[.table-prose_tbody_&]:bg-gray-850 [.table-prose_tbody_&]:bg-gray-50 bg-gray-50 dark:bg-gray-850"
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
  align?: 'left' | 'center' | 'right' | undefined
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
     * A unique id used as a prefix for unique table row ids.
     */
    id: {
      type: String,
      default: null
    },
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
     * Optional object properties include a "sortable" boolean, a "format" function, and an "align"
     * string. The "sortable" key indicates whether a table column is sortable. The "format" key allows for
     * customization of the item's data. The "align" key enables you to align the content of that field's
     * header and content to the "left", "center", or "right".
     *
     * Basic example object (not sortable):
     *
     * **{ key: "id", label: "ID" }**
     *
     * Advanced example object (sortable, custom formatter, and alignment):
     *
     * **{
     *   key: "lastModifiedDate",
     *   label: "Last Modified",
     *   align: "right"
     *   sortable: true,
     *   format: (date) => date.toLocaleDateString()
     * }**
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
     * Determines if sorting should be descending or ascending.
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
    enableDrawer: { type: Boolean, default: false },
    /**
     * Overrides the built-in sorting behavior of the table.
     * 
     * This is useful when an external source should control
     * the table's sorting.
     *
     * If the `onSort` prop is set, the table will not sort unless
     * you provide the logic to update the table's `items` prop.
     * 
     * Furthermore, your logic must also set the `sortBy` and 
     * `sortDesc` props on the table in order for the table's
     * header to reflect your changes.
     * 
     * Method's definition:
     * 
     * `onSort({ field, sortBy, sortDesc })`
     * 
     * This method provides the following parameters for use:
     * 
     * * `field`: The field you are sorting on.
     * * `sortBy`: The field key. Provided as a helper that can be used to update the `sortBy` prop of this component.
     * * `sortDesc`: The component's internal value for what it expects the `sortDesc` prop to equal. Provided as a helper that can be used to update the `sortDesc` prop of the component.
     */
    onSort: { type: Function, default: undefined }
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
      if (this.onSort) return this.items
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
  watch: {
    sortBy(value) {
      this.sortField = value
    },
    sortDesc(value) {
      this.sortOrder = value ? -1 : 1
    }
  },
  methods: {
    toggleDrawer(item: TableItem) {
      if (this.openDrawerID === item.id) {
        this.openDrawerID = -1
      } else {
        this.openDrawerID = item.id
        /**
         * Emitted when a drawer is opened. @binding item
         */
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
      if (this.onSort) {
        this.onSort({
          field,
          sortBy: field.key,
          sortDesc: this.sortOrder === 0 ? false : this.sortOrder === 1 ? true : false
        })
      } else {
        this.sortField = field.key
        this.sortOrder = this.sortOrder === 0 ? 1 : this.sortOrder === 1 ? -1 : 1
      }
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
