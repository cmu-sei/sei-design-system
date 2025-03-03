<template>
  <table
    :id="id || 'sds-table'"
    data-id="sds-table"
    class="table-prose dark:table-prose-invert"
    :class="[paddingClass]"
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
    <thead 
      class="border-t dark:border-gray-700"
      :class="{
        'hidden': hideTableHeader
      }"
    >
      <tr>
        <th 
          v-if="hasDrawers"
          class="w-6"
        >
          <button 
            class="flex items-center justify-center w-6 h-6"
            @click="toggleAllDrawers"
          >
            <SdsSvgIcon
              v-if="isBatchExpanded"
              aria-hidden="true"
              class="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              :height="icons['angle-up'].height"
              :path="icons['angle-up'].path"
              :view-box="icons['angle-up'].viewBox"
              :width="icons['angle-up'].width"
            />
            <SdsSvgIcon
              v-else
              aria-hidden="true"
              class="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              :height="icons['angle-down'].height"
              :path="icons['angle-down'].path"
              :view-box="icons['angle-down'].viewBox"
              :width="icons['angle-down'].width"
            />
            <span class="sr-only">{{ isBatchExpanded ? 'Collapse all drawers' : 'Expand all drawers' }}</span>
          </button>
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
                class="after:content-['/'] after:font-normal after:inline-block after:ml-0.5 last:after:hidden"
                :class="{
                  'cursor-default after:mr-0.5': !f.sortable,
                  'after:mr-4' : f.sortable
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
            'dark:[.table-prose_tbody_&]:border-b-0 [.table-prose_tbody_&]:border-b-0 border-b-0': item.toggled,
            'hover:[.table-prose_tbody_&]:bg-gray-25 dark:hover:[.table-prose_tbody_&]:bg-gray-850': props.rowHighlight,
            '[.table-prose_tbody_&]:bg-gray-25 dark:[.table-prose_tbody_&]:bg-gray-850': props.rowHighlight && item.toggled
          }"
        >
          <td
            v-if="hasDrawers"
            class="w-6"
            :aria-label="hasDrawers ? 'No value' : undefined"
          >
            <button 
              v-if="item.enableDrawer"
              class="flex items-center justify-center w-6 h-6"
              @click="toggleDrawer(item)"
            >
              <SdsSvgIcon
                v-if="item.toggled"
                aria-hidden="true"
                class="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                :height="icons['angle-up'].height"
                :path="icons['angle-up'].path"
                :view-box="icons['angle-up'].viewBox"
                :width="icons['angle-up'].width"
              />
              <SdsSvgIcon
                v-else
                aria-hidden="true"
                class="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                :height="icons['angle-down'].height"
                :path="icons['angle-down'].path"
                :view-box="icons['angle-down'].viewBox"
                :width="icons['angle-down'].width"
              />
              <span class="sr-only">{{ item.toggled ? 'Collapse drawer' : 'Expand drawer' }}</span>
            </button>
          </td>
          <template
            v-for="key in displayedFieldKeys"
            :key="key"
          >
            <component
              :is="cellElement(key)"
              :class="{
                'text-left': displayedFields.find((i: TableField) => i.key === key)?.align === 'left',
                'text-center': displayedFields.find((i: TableField) => i.key === key)?.align === 'center',
                'text-right': displayedFields.find((i: TableField) => i.key === key)?.align === 'right'
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
          v-if="item.toggled"
          :id="`${id || 'sds-table'}_tr_${item.id || index}_drawer`"
          :class="{
            '[.table-prose_tbody_&]:bg-gray-25 dark:[.table-prose_tbody_&]:bg-gray-850': props.rowHighlight && item.toggled
          }"
        >
          <td 
            class="has-[.table-prose]:p-0"
            :colspan="displayedFieldKeys.length + 1"
          >
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

<script setup lang="ts">
export type TableDensity = typeof densityTypes[number]

export interface TableField {
  key: string
  label?: string | undefined
  format?: GenericFunctionType | undefined
  sortable?: boolean | undefined
  hidden?: boolean | undefined
  header?: boolean | undefined
  align?: 'left' | 'center' | 'right' | undefined
  fields?: TableField[] | undefined
  [key: string]: unknown
}

export interface TableItem {
  id: number
  enableDrawer?: boolean
  toggled?: boolean
  [key: string]: unknown
}

defineOptions({
  name: 'SdsTable'
})

const props = defineProps({
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
  onSort: { type: Function as PropType<GenericFunctionType>, default: undefined },
  /**
   * Determines the table's density, or padding, for the "th", "td" HTML tags
   * 
   * Density options:
   *
   * * comfortable: p-4 (16px)
   * * condensed: p-1 (4px)
   * * default: p-2 (8px)
   */
  density: { type: String as PropType<TableDensity>, default: undefined },
  /**
   * Determines if rows within a table have a hover state (bg-gray-25)
   */
  rowHighlight: { type: Boolean, default: undefined },
  /**
   * Determines whether to display or hide the table's header: i.e. "thead"
   */
  hideHeader: { type: Boolean, default: undefined }
})

const emit = defineEmits(['open-drawer'])

const densityTypes = ['comfortable', 'condensed'] as const

const icons = Object.freeze({
  'angle-down': {
    height: 6,
    path: 'M9.59375 1.71094L5.4375 5.62109C5.30078 5.75781 5.13672 5.8125 5 5.8125C4.83594 5.8125 4.67188 5.75781 4.53516 5.64844L0.378906 1.71094C0.105469 1.46484 0.105469 1.05469 0.351562 0.78125C0.597656 0.507812 1.00781 0.507812 1.28125 0.753906L5 4.25391L8.69141 0.753906C8.96484 0.507812 9.375 0.507812 9.62109 0.78125C9.86719 1.05469 9.86719 1.46484 9.59375 1.71094Z',
    viewBox: '0 0 10 6',
    width: 10
  },
  'angle-up': {
    height: 6,
    path: 'M0.378906 4.81641L4.53516 0.90625C4.67188 0.769531 4.83594 0.6875 5 0.6875C5.13672 0.6875 5.30078 0.769531 5.4375 0.878906L9.59375 4.78906C9.86719 5.03516 9.86719 5.44531 9.62109 5.71875C9.375 5.99219 8.96484 5.99219 8.69141 5.74609L4.97266 2.24609L1.28125 5.74609C1.00781 5.99219 0.597656 5.99219 0.351562 5.71875C0.105469 5.47266 0.105469 5.0625 0.378906 4.81641Z',
    viewBox: '0 0 10 6',
    width: 10
  }
} as const)

const isBatchExpanded = ref(false)
const itemsNormalized = ref<TableItem[]>([])
const sortField = ref(props.sortBy)
const sortOrder = ref(props.sortDesc ? -1 : 1)

const flatFields = computed(() => {
  return props.fields.flatMap(i => {
    if (i.fields) {
      return i.fields
    } else {
      return i
    }
  })
})

const hasDrawers = computed(() => itemsNormalized.value.filter((i) => i.enableDrawer).length > 0)

const sortedItems = computed(() => {
  if (props.onSort) return [ ...itemsNormalized.value ]
  const items = [ ...itemsNormalized.value ]
  return items.sort((a, b) => sortCompare(a, b, sortField.value))
})

const displayedFields = computed(() => {
  return props.fields.filter((i) => !i.hidden)
})

const displayedFieldKeys = computed(() => {
  return Object.entries(displayedFields.value).map(([_key, value]) => value.key)
})

const hideTableHeader = computed(() => {
  if (typeof props.hideHeader === 'undefined') return false
  return props.hideHeader ? true : false
})

const paddingClass = computed(() => {
  const { density } = props
  switch (density) {
    case densityTypes[0]: // comfortable
      return 'table-prose-lg'
    case densityTypes[1]: // condensed
      return 'table-prose-sm'
    default:
      return ''
  }
})

const cellElement = (key: string) => {
  const field = props.fields.find((f) => f.key === key)
  return field && field.header ? 'th' : 'td'
}

const format = (item: TableItem, key: string = '') => {
  const field = flatFields.value.find(i => i.key === key)
  return field && field.format ? field.format(item[key]) : item[key]
}

const handleSortBy = (field: TableField) => {
  if (props.onSort) {
    props.onSort({
      field,
      sortBy: field.key,
      sortDesc: sortOrder.value === 0 ? false : sortOrder.value === 1 ? true : false
    })
  } else {
    sortField.value = field.key
    sortOrder.value = sortOrder.value === 0 ? 1 : sortOrder.value === 1 ? -1 : 1
  }
}

const normalizeItems = (items: TableItem[]) => {
  if (props.enableDrawer) {
    return [ ...items ].map((i) => ({
      ...i,
      enableDrawer: true,
      toggled: false
    }))
  }
  return [ ...items ].map((i) => {
    if ('enableDrawer' in i) {
      if ('toggled' in i) return i
      return { ...i, toggled: false }
    }
    return i
  })
}

const sortCompare = (aRow: TableItem, bRow: TableItem, key: string) => {
  const a = aRow[key]
  const b = bRow[key]
  if (
    (typeof a === 'number' && typeof b === 'number') ||
    (a instanceof Date && b instanceof Date)
  ) {
    // If both compared fields are native numbers or both are native dates
    return (a < b ? -1 : a > b ? 1 : 0) * sortOrder.value
  } else {
    // Otherwise stringify the field data and use String.prototype.localeCompare
    return toString(a as TableItem).localeCompare(toString(b as TableItem)) * sortOrder.value
  }
}

const toggleDrawer = (item: TableItem) => {
  const i = itemsNormalized.value.find(({ id }) => id === item.id)
  if (typeof i === 'undefined') return
  i.toggled = i.toggled ? false : true
  if (i.toggled) {
    /**
     * Emitted when a drawer is opened. @binding item
     */
    emit('open-drawer', i)
  }
}

const toggleAllDrawers = () => {
  isBatchExpanded.value = !isBatchExpanded.value
  itemsNormalized.value = [ ...itemsNormalized.value ].map((i) => {
    if (i.enableDrawer) {
      return {
        ...i,
        toggled: isBatchExpanded.value ? true : false
      }
    }
    return i
  })
}

// Helper function to stringify the values of an Object
const toString = (value: TableItem): string => {
  if (value === null || typeof value === 'undefined') {
    return ''
  } else if (value instanceof Object) {
    return Object.keys(value)
      .sort()
      .map(key => toString(value[key] as TableItem))
      .join(' ')
  } else {
    return String(value)
  }
}

watch(() => props.items, (value) => {
  itemsNormalized.value = normalizeItems(value)
}, { deep: true, immediate: true })

watch(() => props.sortBy, (value) => {
  sortField.value = value
})

watch(() => props.sortDesc, (value) => {
  sortOrder.value = value ? -1 : 1
})
</script>
