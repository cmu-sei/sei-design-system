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
              [sortedColumnClass || '']: sortField === field.key
            }"
          >
        </slot>
      </template>
    </colgroup>
    <thead>
      <tr>
        <th 
          v-if="hasDrawers"
          class="in-[.table-prose_&]:px-2 w-10"
        >
          <button 
            class="flex items-center justify-center w-6 h-6"
            type="button"
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
              <span
                v-if="field.srOnly"
                class="sr-only"
              >{{ field.label }}</span>
              <button
                v-for="f, index in field.fields"
                v-else
                :key="f.key"
                type="button"
                class="inline-flex items-center after:content-['/'] after:font-normal after:inline-block after:ml-0.5 last:after:hidden"
                :class="{
                  'cursor-default after:mr-0.5': !f.sortable,
                  'after:mr-4' : f.sortable,
                  'flex-row-reverse': field.align === 'right'
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
                      'text-gray-900 dark:text-gray-100 font-bold': sortField === f.key,
                      'font-normal': sortField !== f.key && index !== 0 
                    }"
                  >{{ f.label }}</span>
                  <template v-if="f.sortable">
                    <IconFa7SolidUpDown
                      v-if="sortField !== f.key"
                      class="inline-block text-gray-900 dark:text-gray-100"
                      :class="{
                        'opacity-100': sortField === f.key,
                        'opacity-0 group-hover:opacity-50': sortField !== f.key,
                        'ml-2': f.align !== 'right',
                        'mr-2': f.align === 'right',
                      }"
                    />
                    <IconFa7SolidArrowUp
                      v-else-if="sortOrder > 0"
                      class="inline-block text-gray-900 dark:text-gray-100"
                      :class="{
                        'opacity-100': sortField === f.key,
                        'opacity-0 group-hover:opacity-50': sortField !== f.key,
                        'ml-2': f.align !== 'right',
                        'mr-2': f.align === 'right',
                      }"
                    />
                    <IconFa7SolidArrowDown
                      v-else
                      class="inline-block text-gray-900 dark:text-gray-100"
                      :class="{
                        'opacity-100': sortField === f.key,
                        'opacity-0 group-hover:opacity-50': sortField !== f.key,
                        'ml-2': f.align !== 'right',
                        'mr-2': f.align === 'right',
                      }"
                    />
                  </template>
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
              <span
                v-if="field.srOnly"
                class="sr-only"
              >{{ field.label }}</span>
              <button
                v-else
                class="inline-flex items-center"
                :class="{
                  'cursor-default': !field.sortable,
                  'flex-row-reverse': field.align === 'right'
                }"
                type="button"
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
                      'text-gray-900 dark:text-gray-100 font-bold': sortField === field.key
                    }"
                  >{{ field.label }}</span>
                  <template v-if="field.sortable">
                    <IconFa7SolidUpDown
                      v-if="sortField !== field.key"
                      class="inline-block text-gray-900 dark:text-gray-100"
                      :class="{
                        'opacity-100': sortField === field.key,
                        'opacity-0 group-hover:opacity-50': sortField !== field.key,
                        'ml-2': field.align !== 'right',
                        'mr-2': field.align === 'right',
                      }"
                    />
                    <IconFa7SolidArrowUp
                      v-else-if="sortOrder > 0"
                      class="inline-block text-gray-900 dark:text-gray-100"
                      :class="{
                        'opacity-100': sortField === field.key,
                        'opacity-0 group-hover:opacity-50': sortField !== field.key,
                        'ml-2': field.align !== 'right',
                        'mr-2': field.align === 'right',
                      }"
                    />
                    <IconFa7SolidArrowDown
                      v-else
                      class="inline-block text-gray-900 dark:text-gray-100"
                      :class="{
                        'opacity-100': sortField === field.key,
                        'opacity-0 group-hover:opacity-50': sortField !== field.key,
                        'ml-2': field.align !== 'right',
                        'mr-2': field.align === 'right',
                      }"
                    />
                  </template>
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
            'hover:[.table-prose_tbody_&]:bg-gray-25 dark:hover:[.table-prose_tbody_&]:bg-gray-900/85': rowHighlight,
            'peer has-[+tr[data-drawer]:hover]:bg-gray-25 dark:has-[+tr[data-drawer]:hover]:bg-gray-900/85': isToggled(item) && !item.nestedRows && rowHighlight
          }"
          @mouseover="onMouseover(item)"
          @mouseleave="onMouseleave(item)"
        >
          <td
            v-if="hasDrawers"
            class="[.table-prose_tbody_&]:px-2 w-10"
            :class="{
              'border-b-0': isToggled(item)
            }"
            :aria-label="hasDrawers ? undefined : 'No value'"
          >
            <button 
              v-if="isDrawerEnabled(item)"
              type="button"
              class="flex items-center justify-center w-6 h-6"
              @click="toggleDrawer(item)"
            >
              <SdsSvgIcon
                v-if="isToggled(item)"
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
              <span class="sr-only">{{ isToggled(item) ? 'Collapse drawer' : 'Expand drawer' }}</span>
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
                'text-right': displayedFields.find((i: TableField) => i.key === key)?.align === 'right',
                'border-b-0': isToggled(item)
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
        <template v-if="item.nestedRows && item.nestedRows.length">
          <template v-for="rItem, rIndex in item.nestedRows">
            <tr
              v-if="isDrawerEnabled(item) && isToggled(item)"
              :id="`${id || 'sds-table'}_tr_${rItem.id || rIndex}`"
              :key="rIndex"
              :class="{
                'hover:[.table-prose_tbody_&]:bg-gray-25 dark:hover:[.table-prose_tbody_&]:bg-gray-900/85': rowHighlight
              }"
            >
              <td 
                aria-label="No value"
                class="[.table-prose_tbody_&]:px-2 w-10"
                :class="{
                  'border-b-0': rIndex !== (item.nestedRows.length - 1)
                }"
              />
              <template
                v-for="key in displayedFieldKeys"
                :key="key"
              >
                <component
                  :is="cellElement(key)"
                  :class="{
                    'text-left': displayedFields.find((i: TableField) => i.key === key)?.align === 'left',
                    'text-center': displayedFields.find((i: TableField) => i.key === key)?.align === 'center',
                    'text-right': displayedFields.find((i: TableField) => i.key === key)?.align === 'right',
                    'border-b-0': rIndex !== (item.nestedRows.length - 1)
                  }"
                >
                  <!-- @slot Cell content. Allow for styling table cell content. @binding value, item, and format -->
                  <slot
                    :name="`cell(${key})`"
                    :value="format(rItem, key)"
                    :item="rItem"
                    :format="(k: string) => format(rItem, k)"
                  >
                    {{ format(rItem, key) }}
                  </slot>
                </component>
              </template>
            </tr>
          </template>
        </template>
        <template v-else>
          <tr
            v-if="isDrawerEnabled(item) && isToggled(item)"
            :id="`${id || 'sds-table'}_tr_${item.id || index}_drawer`"
            data-drawer="true"
            :class="{
              'hover:[.table-prose_tbody_&]:bg-gray-25 dark:hover:[.table-prose_tbody_&]:bg-gray-900/85': rowHighlight,
              '[.table-prose_tbody_&]:peer-hover:bg-gray-25 dark:[.table-prose_tbody_&]:peer-hover:bg-gray-900/85': rowHighlight && hoveredItemIds.has(item.id)
            }"
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
      </template>
    </tbody>
    <tfoot v-if="$slots.footer">
      <tr>
        <td :colspan="displayedFieldKeys.length + 1">
          <slot name="footer" />
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script setup lang="ts">
import SdsSvgIcon from '../SvgIcon'

export type TableDensity = typeof densityTypes[number];

export interface TableField {
  key: string;
  label?: string;
  srOnly?: boolean;
  format?: GenericFunctionType;
  sortable?: boolean;
  hidden?: boolean;
  header?: boolean;
  align?: 'left' | 'center' | 'right';
  fields?: TableField[];
  [key: string]: unknown;
}

export interface TableItem {
  id: number;
  enableDrawer?: boolean;
  toggled?: boolean;
  nestedRows?: TableItem[];
  [key: string]: unknown;
}

/**
 * Props for the Table component.
 */
export interface TableProps {
  /**
   * A unique id used as a prefix for unique table row ids.
   * @default undefined
   */
  id?: string;
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
  items: TableItem[];
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
  fields: TableField[];
  /**
   * Determines the field key to sort by.
   */
  sortBy?: string;
  /**
   * Determines if sorting should be descending or ascending.
   * @default false
   */
  sortDesc?: boolean;
  /**
   * Determines the caption for the table if desired.
   * @default undefined
   */
  caption?: string;
  /**
   * Determines the CSS classes used on the sorted column.
   * @default undefined
   */
  sortedColumnClass?: string;
  /**
   * Toggles on/off a drawer below each table row.
   * @default false
   */
  enableDrawer?: boolean;
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
   * @default undefined
   */
  onSort?: GenericFunctionType;
  /**
   * Determines the table's density, or padding, for the "th", "td" HTML tags.
   * 
   * Density options:
   *
   * * comfortable: p-4 (16px)
   * * condensed: p-1 (4px)
   * * default: p-2 (8px)
   * @default undefined
   */
  density?: TableDensity;
  /**
   * Determines if rows within a table have a hover state (bg-gray-25).
   * @default undefined
   */
  rowHighlight?: boolean;
}

defineOptions({
  name: 'SdsTable'
})

const props = withDefaults(defineProps<TableProps>(), {
  id: undefined,
  sortBy: undefined,
  sortDesc: false,
  caption: undefined,
  sortedColumnClass: undefined,
  enableDrawer: false,
  onSort: undefined,
  density: undefined,
  rowHighlight: undefined,
})

const emit = defineEmits([
  'open-drawer',
  'open-all-drawers'
])

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
const enableDrawer = ref(props.enableDrawer)
const sortField = ref(props.sortBy ?? '')
const sortOrder = ref(props.sortDesc ? -1 : 1)
const hoveredItemIds = ref<Set<number>>(new Set())
const toggledItemIds = ref<Set<number>>(new Set())

const flatFields = computed(() => {
  return props.fields.flatMap(i => {
    if (i.fields) {
      return i.fields
    } else {
      return i
    }
  })
})

// Helper functions to check state without copying objects
const isDrawerEnabled = (item: TableItem) => enableDrawer.value || !!item.enableDrawer
const isToggled = (item: TableItem) => toggledItemIds.value.has(item.id)

const hasDrawers = computed(() => props.items.filter((i) => isDrawerEnabled(i)).length > 0)

const sortedItems = computed(() => {
  if (props.onSort) return props.items
  // Sort returns original objects, not copies
  return [...props.items].sort((a, b) => sortCompare(a, b, sortField.value))
})

const displayedFields = computed(() => {
  return props.fields.filter((i) => !i.hidden)
})

const displayedFieldKeys = computed(() => {
  return Object.entries(displayedFields.value).map(([, value]) => value.key)
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



const onMouseover = (item: TableItem) => hoveredItemIds.value.add(item.id)
const onMouseleave = (item: TableItem) => hoveredItemIds.value.delete(item.id) 

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
  if (toggledItemIds.value.has(item.id)) {
    toggledItemIds.value.delete(item.id)
  } else {
    toggledItemIds.value.add(item.id)
    /**
     * Emitted when a drawer is opened. @binding item
     */
    emit('open-drawer', item)
  }
}

const toggleAllDrawers = () => {
  isBatchExpanded.value = !isBatchExpanded.value
  if (isBatchExpanded.value) {
    // Add all drawer-enabled items to toggledItemIds
    props.items.forEach((i) => {
      if (isDrawerEnabled(i)) {
        toggledItemIds.value.add(i.id)
      }
    })
  } else {
    // Clear all toggled items
    toggledItemIds.value.clear()
  }
  /**
   * Emitted when all drawers are opened. @binding items
   */
  emit('open-all-drawers', props.items)
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

watch(() => props.enableDrawer, (value) => {
  enableDrawer.value = value
})

watch(() => props.items, (items) => {
  // Sync toggled state from items that have toggled: true
  items.forEach(item => {
    if (item.toggled && !toggledItemIds.value.has(item.id)) {
      toggledItemIds.value.add(item.id)
    }
  })
}, { immediate: true })

watch(() => props.sortBy, (value) => {
  if (!value) return
  sortField.value = value
})

watch(() => props.sortDesc, (value) => {
  sortOrder.value = value ? -1 : 1
})

// Watch for changes in toggled state to update batch expanded state
const drawerEnabledItemsCount = computed(() => {
  return props.items.filter((i) => isDrawerEnabled(i)).length
})

watch([toggledItemIds, drawerEnabledItemsCount], ([toggled, enabled]) => {
  isBatchExpanded.value = enabled > 0 && toggled.size === enabled
}, { deep: true, immediate: true })
</script>