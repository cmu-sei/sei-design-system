import type { TableItem } from '../Table/Table.vue'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import SdsDataTable from './DataTable.vue'
import type { DataTableFilterConfig } from './DataTable.vue'

interface CellSlotProps {
  item: TableItem
  value: unknown
  format: (key: string) => unknown
}

const fields = [
  { key: 'task', label: 'Task', sortable: true },
  { key: 'description', label: 'Description', sortable: false },
  { key: 'assignee', label: 'Assignee', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false, align: 'right' as const }
]

const items = [
  { id: 1, task: 'SDS-101', description: 'Implement responsive navigation', assignee: 'Jamie Carter', status: 'Draft', actions: 'Edit' },
  { id: 2, task: 'SDS-102', description: 'Refactor authentication module', assignee: 'Morgan Lee', status: 'Submitted', actions: 'Edit' },
  { id: 3, task: 'SDS-103', description: 'Optimize image loading', assignee: 'Riley Thompson', status: 'Approved', actions: 'Edit' },
  { id: 4, task: 'SDS-104', description: 'Add accessibility features', assignee: 'Taylor Nguyen', status: 'Draft', actions: 'Edit' },
  { id: 5, task: 'SDS-105', description: 'Integrate third-party API', assignee: 'Casey Martinez', status: 'Submitted', actions: 'Edit' },
  { id: 6, task: 'SDS-106', description: 'Update user profile page', assignee: 'Jordan Kim', status: 'Approved', actions: 'Edit' },
  { id: 7, task: 'SDS-107', description: 'Fix mobile layout issues', assignee: 'Alex Patel', status: 'Draft', actions: 'Edit' },
  { id: 8, task: 'SDS-108', description: 'Implement dark mode', assignee: 'Samira Hassan', status: 'Submitted', actions: 'Edit' },
  { id: 9, task: 'SDS-109', description: 'Set up CI/CD pipeline', assignee: 'Chris Walker', status: 'Approved', actions: 'Edit' },
  { id: 10, task: 'SDS-110', description: 'Improve form validation', assignee: 'Jamie Carter', status: 'Draft', actions: 'Edit' }
]

const pagination = {
  currentPage: 1,
  totalPages: 2,
  totalResultsPerPage: 5,
  totalResults: 10
}

describe('SdsDataTable', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  describe('Basic Rendering & Component Integration', () => {
    it('should render DataTable container with data-id attribute', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        attachTo: container
      })

      expect(wrapper.find('[data-id="sds-data-table"]').exists()).toBe(true)
    })

    it('should render SdsTable with provided fields and items from data prop', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        attachTo: container
      })

      const table = wrapper.findComponent({ name: 'SdsTable' })
      expect(table.exists()).toBe(true)

      const renderedFields = table.props('fields') as Array<Record<string, unknown>>
      expect(renderedFields).toHaveLength(fields.length)
      expect(renderedFields.map((field) => field.key)).toEqual(fields.map((field) => field.key))
      expect(renderedFields[0]).toMatchObject({
        key: 'task',
        stickyPosition: 0,
        stickyLeftClass: 'left-0',
        stickyEnd: true
      })
      expect(table.props('items')).toEqual(items)
    })

    it('should render all three pagination components when pagination prop is provided', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        attachTo: container
      })

      expect(wrapper.findComponent({ name: 'SdsPaginator' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'SdsPaginatorRange' }).exists()).toBe(true)
      expect(wrapper.find('[data-id="sds-data-table-page-size-dropdown"]').exists()).toBe(true)
    })

    it('should not render pagination controls when pagination prop is not provided', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items }
        },
        attachTo: container
      })

      expect(wrapper.findComponent({ name: 'SdsPaginator' }).exists()).toBe(false)
      expect(wrapper.findComponent({ name: 'SdsPaginatorRange' }).exists()).toBe(false)
      expect(wrapper.find('[data-id="sds-data-table-page-size-dropdown"]').exists()).toBe(false)
    })

    it('should set data-has-footer when pagination prop is provided', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        attachTo: container
      })

      const dataTable = wrapper.find('[data-id="sds-data-table"]')
      expect(dataTable.attributes('data-has-footer')).toBe('true')
    })

    it('should not set data-has-footer when pagination prop is not provided', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items }
        },
        attachTo: container
      })

      const dataTable = wrapper.find('[data-id="sds-data-table"]')
      expect(dataTable.attributes('data-has-footer')).toBeUndefined()
    })

    it('should not render faux footer controls when there are no items', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items: [] },
          pagination
        },
        attachTo: container
      })

      expect(wrapper.findComponent({ name: 'SdsPaginator' }).exists()).toBe(false)
      expect(wrapper.findComponent({ name: 'SdsPaginatorRange' }).exists()).toBe(false)
      expect(wrapper.find('[data-id="sds-data-table-page-size-dropdown"]').exists()).toBe(false)
    })

  })

  describe('Pagination State Management', () => {
    it('should initialize internal state from pagination prop on mount', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        attachTo: container
      })

      const paginatorComponent = wrapper.findComponent({ name: 'SdsPaginator' })
      expect(paginatorComponent.props('currentPage')).toBe(pagination.currentPage)
      expect(paginatorComponent.props('totalPages')).toBe(pagination.totalPages)
    })

    it('should update pagination props when pagination prop changes', async () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        attachTo: container
      })

      await wrapper.setProps({
        data: { fields, items },
        pagination: {
          currentPage: 2,
          totalPages: 3,
          totalResultsPerPage: 10,
          totalResults: 30
        }
      })
      
      await wrapper.vm.$nextTick()

      const paginatorComponent = wrapper.findComponent({ name: 'SdsPaginator' })
      expect(paginatorComponent.props('currentPage')).toBe(2)
      expect(paginatorComponent.props('totalPages')).toBe(3)
    })

    it('should pass current pagination state to SdsPaginator via props', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        attachTo: container
      })

      const paginatorComponent = wrapper.findComponent({ name: 'SdsPaginator' })
      expect(paginatorComponent.props('currentPage')).toBe(pagination.currentPage)
      expect(paginatorComponent.props('totalPages')).toBe(pagination.totalPages)
    })

    it('should pass current pagination state to SdsPaginatorRange via props', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        attachTo: container
      })

      const rangeComponent = wrapper.findComponent({ name: 'SdsPaginatorRange' })
      expect(rangeComponent.props('currentPage')).toBe(pagination.currentPage)
      expect(rangeComponent.props('totalResultsPerPage')).toBe(pagination.totalResultsPerPage)
      expect(rangeComponent.props('totalResults')).toBe(pagination.totalResults)
      expect(rangeComponent.props('totalPages')).toBe(pagination.totalPages)
    })
  })

  describe('Event Handlers', () => {
    it('should have go-to-page listener on SdsPaginator', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        attachTo: container
      })

      const paginatorComponent = wrapper.findComponent({ name: 'SdsPaginator' })
      expect(paginatorComponent.exists()).toBe(true)
      expect(paginatorComponent.vm).toBeDefined()
    })

    it('should emit update:pagination when go-to-page is emitted by paginator', async () => {
      const onUpdatePagination = vi.fn()

      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination,
          ['onUpdate:pagination']: onUpdatePagination
        },
        attachTo: container
      })

      const paginatorComponent = wrapper.findComponent({ name: 'SdsPaginator' })
      paginatorComponent.vm.$emit('go-to-page', {
        page: 2,
        event: new MouseEvent('click')
      })

      await wrapper.vm.$nextTick()
      await flushPromises()

      expect(onUpdatePagination).toHaveBeenCalledTimes(1)
      expect(onUpdatePagination.mock.calls[0][0]).toMatchObject({
        currentPage: 2,
        totalPages: pagination.totalPages,
        totalResults: pagination.totalResults,
        totalResultsPerPage: pagination.totalResultsPerPage
      })
    })

    it('should set data-scrollable when scroll container overflows horizontally', async () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        attachTo: container
      })

      const scrollContainer = wrapper.find('div.overflow-x-auto.max-w-full')
      const element = scrollContainer.element as HTMLElement

      Object.defineProperty(element, 'scrollWidth', {
        configurable: true,
        value: 200
      })

      Object.defineProperty(element, 'clientWidth', {
        configurable: true,
        value: 100
      })

      await scrollContainer.trigger('scroll')

      expect(scrollContainer.attributes('data-scrollable')).toBe('true')
    })

    it('should keep data-scrollable unset when scroll container does not overflow', async () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        attachTo: container
      })

      const scrollContainer = wrapper.find('div.overflow-x-auto.max-w-full')
      const element = scrollContainer.element as HTMLElement

      Object.defineProperty(element, 'scrollWidth', {
        configurable: true,
        value: 100
      })

      Object.defineProperty(element, 'clientWidth', {
        configurable: true,
        value: 100
      })

      await scrollContainer.trigger('scroll')

      expect(scrollContainer.attributes('data-scrollable')).toBeUndefined()
    })

    it('should emit update:pagination with currentPage as a number when paginator emits string page', async () => {
      const onUpdatePagination = vi.fn()

      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination,
          ['onUpdate:pagination']: onUpdatePagination
        },
        attachTo: container
      })

      const paginatorComponent = wrapper.findComponent({ name: 'SdsPaginator' })
      paginatorComponent.vm.$emit('go-to-page', {
        page: '2',
        event: new MouseEvent('click')
      })

      await wrapper.vm.$nextTick()
      await flushPromises()

      expect(onUpdatePagination).toHaveBeenCalledTimes(1)
      expect(onUpdatePagination.mock.calls[0][0]).toMatchObject({
        currentPage: 2
      })
    })

    it('should render current page size in the faux footer', async () => {
      const onUpdatePagination = vi.fn()

      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination,
          ['onUpdate:pagination']: onUpdatePagination
        },
        attachTo: container
      })

      await wrapper.vm.$nextTick()
      await flushPromises()

      expect(wrapper.find('[data-id="sds-data-table-page-size-dropdown"]').exists()).toBe(true)
      expect(wrapper.text()).toContain('5 rows')
    })
  })

  describe('Batch Selection', () => {
    it('should emit selected items when toggling an item checkbox', async () => {
      const onUpdateSelectedItems = vi.fn()

      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination,
          enableBatchSelection: true,
          ['onUpdate:selectedItems']: onUpdateSelectedItems
        },
        attachTo: container
      })

      const rowCheckbox = wrapper.find('#select-1')
      expect(rowCheckbox.exists()).toBe(true)

      await rowCheckbox.setValue(true)
      await wrapper.vm.$nextTick()
      await flushPromises()

      expect(onUpdateSelectedItems).toHaveBeenCalled()

      const latestPayload = onUpdateSelectedItems.mock.calls.at(-1)?.[0] as Array<Record<string, unknown>>
      const firstItem = latestPayload.find((item) => item.id === 1)

      expect(firstItem).toBeDefined()
      expect(firstItem?.selected).toBe(true)
    })

    it('should select all rows when the select-all checkbox is checked', async () => {
      const onUpdateSelectedItems = vi.fn()

      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination,
          enableBatchSelection: true,
          ['onUpdate:selectedItems']: onUpdateSelectedItems
        },
        attachTo: container
      })

      const selectAllCheckbox = wrapper.find('#select-all')
      expect(selectAllCheckbox.exists()).toBe(true)

      await selectAllCheckbox.setValue(true)
      await wrapper.vm.$nextTick()
      await flushPromises()

      expect(onUpdateSelectedItems).toHaveBeenCalled()

      const latestPayload = onUpdateSelectedItems.mock.calls.at(-1)?.[0] as Array<Record<string, unknown>>
      const allSelected = latestPayload.every((item) => item.selected === true)
      expect(allSelected).toBe(true)
    })

    it('should execute batch action callback with selected ids', async () => {
      const batchActionSpy = vi.fn()

      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination,
          filterSearch: true,
          enableBatchSelection: true,
          batchSelectionActions: [
            {
              label: 'Archive',
              action: batchActionSpy
            }
          ]
        },
        attachTo: container
      })

      await wrapper.find('#select-all').setValue(true)
      await wrapper.vm.$nextTick()

      const archiveButton = wrapper.findAll('button').find((button) => button.text().includes('Archive'))
      expect(archiveButton).toBeDefined()

      await archiveButton?.trigger('click')

      expect(batchActionSpy).toHaveBeenCalledTimes(1)

      const selectedIds = batchActionSpy.mock.calls[0][0] as number[]
      expect(selectedIds).toHaveLength(items.length)
      expect(selectedIds).toContain(1)
      expect(selectedIds).toContain(10)
    })
  })

  describe('Filters And Search', () => {
    it('should emit and reset filters when selecting a segment and clearing filters', async () => {
      const onUpdateFilters = vi.fn()

      const filtersConfig: DataTableFilterConfig[] = [
        {
          key: 'status',
          label: 'Status',
          type: 'segment',
          segments: [
            { label: 'Draft', selected: false },
            { label: 'Submitted', selected: false }
          ]
        },
        {
          key: 'assignee',
          label: 'Assignee',
          type: 'dropdown',
          options: [
            { text: 'Jamie Carter', value: 'Jamie Carter', selected: true }
          ]
        }
      ]

      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination,
          filters: filtersConfig,
          ['onUpdate:filters']: onUpdateFilters
        },
        attachTo: container
      })

      const draftButton = wrapper.findAll('button').find((button) => button.text().trim() === 'Draft')
      expect(draftButton).toBeDefined()

      await draftButton?.trigger('click')
      await wrapper.vm.$nextTick()
      await flushPromises()

      expect(onUpdateFilters).toHaveBeenCalled()

      const clearFiltersButton = wrapper.findAll('button').find((button) => button.text().includes('Clear filters'))
      expect(clearFiltersButton).toBeDefined()

      await clearFiltersButton?.trigger('click')
      await wrapper.vm.$nextTick()
      await flushPromises()

      expect(onUpdateFilters.mock.calls.length).toBeGreaterThan(1)

      const resetFilters = onUpdateFilters.mock.calls.at(-1)?.[0] as DataTableFilterConfig[]
      const statusFilter = resetFilters.find((filter) => filter.key === 'status')
      const assigneeFilter = resetFilters.find((filter) => filter.key === 'assignee')

      expect(statusFilter?.segments?.[0]?.label).toBe('All')
      expect(statusFilter?.segments?.[0]?.selected).toBe(true)
      expect(statusFilter?.segments?.slice(1).every((segment) => !segment.selected)).toBe(true)
      expect(assigneeFilter?.options?.every((option) => !option.selected)).toBe(true)
    })

    it('should emit update:filters when dropdown filter model updates', async () => {
      const onUpdateFilters = vi.fn()

      const filtersConfig: DataTableFilterConfig[] = [
        {
          key: 'assignee',
          label: 'Assignee',
          type: 'dropdown',
          options: [
            { text: 'Jamie Carter', value: 'Jamie Carter', selected: false }
          ]
        }
      ]

      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination,
          filters: filtersConfig,
          ['onUpdate:filters']: onUpdateFilters
        },
        attachTo: container
      })

      const filterDropdown = wrapper.findComponent({ name: 'SdsFilterByDropdown' })
      expect(filterDropdown.exists()).toBe(true)

      filterDropdown.vm.$emit('update:model-value', [
        { text: 'Jamie Carter', value: 'Jamie Carter', selected: true }
      ])
      await wrapper.vm.$nextTick()
      await flushPromises()

      expect(onUpdateFilters).toHaveBeenCalled()
    })

    it('should emit debounced search updates and clear the query on cancel', async () => {
      vi.useFakeTimers()

      try {
        const onUpdateFilterSearchQuery = vi.fn()

        const wrapper = mount(SdsDataTable, {
          props: {
            data: { fields, items },
            pagination,
            filterSearch: true,
            filterSearchDebounce: 50,
            ['onUpdate:filterSearchQuery']: onUpdateFilterSearchQuery
          },
          attachTo: container
        })

        const searchButton = wrapper.findAll('button').find((button) => button.text().includes('Search'))
        expect(searchButton).toBeDefined()

        await searchButton?.trigger('click')
        await wrapper.vm.$nextTick()

        const comboBox = wrapper.findComponent({ name: 'SdsComboBox' })
        expect(comboBox.exists()).toBe(true)

        comboBox.vm.$emit('update:modelValue', 'Draft')
        await wrapper.vm.$nextTick()

        vi.advanceTimersByTime(50)
        await wrapper.vm.$nextTick()
        await flushPromises()

        expect(onUpdateFilterSearchQuery).toHaveBeenCalled()
        expect(onUpdateFilterSearchQuery.mock.calls.at(-1)?.[0]).toBe('Draft')

        const cancelButton = wrapper.findAll('button').find((button) => button.text().includes('Cancel'))
        expect(cancelButton).toBeDefined()

        await cancelButton?.trigger('click')
        await wrapper.vm.$nextTick()

        vi.advanceTimersByTime(50)
        await wrapper.vm.$nextTick()
        await flushPromises()

        expect(onUpdateFilterSearchQuery.mock.calls.at(-1)?.[0]).toBe('')
      } finally {
        vi.useRealTimers()
      }
    })
  })

  describe('Slot Pass-Through', () => {
    it('should pass all table slots through to SdsTable component', () => {
      const customSlot = ({ item }: CellSlotProps) => `Custom: ${item.task}`
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        slots: {
          'cell(task)': customSlot
        },
        attachTo: container
      })

      const tableComponent = wrapper.findComponent({ name: 'SdsTable' })
      expect(tableComponent.exists()).toBe(true)
    })

    it('should render custom slot content with correct item data for specific field', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        slots: {
          'cell(task)': ({ item }: CellSlotProps) => `Task ID: ${item.task}`
        },
        attachTo: container
      })

      expect(wrapper.html()).toContain('Task ID:')
    })

    it('should preserve slot props when passing slots to SdsTable', () => {
      let receivedSlotProps: CellSlotProps | null = null
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        slots: {
          'cell(status)': (slotProps: CellSlotProps) => {
            receivedSlotProps = slotProps
            return (slotProps.item.status as string) || ''
          }
        },
        attachTo: container
      })

      expect(wrapper.exists()).toBe(true)
      expect(receivedSlotProps).not.toBeNull()
      expect(receivedSlotProps).toHaveProperty('item')
    })
  })

  describe('Props & Configuration', () => {
    it('should render empty state when data prop is undefined', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          pagination
        },
        attachTo: container
      })

      // When no data is provided, table should not render
      const tableComponent = wrapper.findComponent({ name: 'SdsTable' })
      expect(tableComponent.exists()).toBe(false)
      
      // Should show "No Results" empty state instead
      expect(wrapper.text()).toContain('No Results')
      expect(wrapper.text()).toContain('There are no results you can view')
    })

    it('should not render paginator when pagination prop is undefined', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items }
        },
        attachTo: container
      })

      const paginatorComponent = wrapper.findComponent({ name: 'SdsPaginator' })
      expect(paginatorComponent.exists()).toBe(false)
    })

    it('should merge $attrs with child component props for proper attribute inheritance', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        attrs: {
          'data-test-id': 'custom-table'
        },
        attachTo: container
      })

      const tableComponent = wrapper.findComponent({ name: 'SdsTable' })
      expect(tableComponent.attributes('data-test-id')).toBe('custom-table')
    })

    it('should prepend selected field and sticky metadata when batch selection is enabled', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination,
          enableBatchSelection: true
        },
        attachTo: container
      })

      const tableComponent = wrapper.findComponent({ name: 'SdsTable' })
      const renderedFields = tableComponent.props('fields') as Array<Record<string, unknown>>

      expect(renderedFields[0]).toMatchObject({
        key: 'selected',
        stickyPosition: 0,
        stickyLeftClass: 'left-0'
      })

      expect(renderedFields[1]).toMatchObject({
        key: 'task',
        stickyPosition: 1,
        stickyLeftClass: 'left-8',
        stickyEnd: true
      })
    })
  })
})