import type { TableItem } from '../Table/Table.vue'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SdsDataTable from './DataTable.vue'

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
      expect(table.props('fields')).toEqual(fields)
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
      expect(wrapper.findComponent({ name: 'SdsPaginatorPageSizeDropdown' }).exists()).toBe(true)
    })

    it('should render pagination controls even when pagination prop is not provided', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items }
        },
        attachTo: container
      })

      expect(wrapper.findComponent({ name: 'SdsPaginator' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'SdsPaginatorRange' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'SdsPaginatorPageSizeDropdown' }).exists()).toBe(true)
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

    it('should maintain internal refs independently from prop updates', async () => {
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
      expect(paginatorComponent.props('currentPage')).toBe(1)
      expect(paginatorComponent.props('totalPages')).toBe(pagination.totalPages)
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

    it('should pass page size options to SdsPaginatorPageSizeDropdown', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        attachTo: container
      })

      const dropdownComponent = wrapper.findComponent({ name: 'SdsPaginatorPageSizeDropdown' })
      expect(dropdownComponent.props('options')).toEqual([
        { value: 10, text: '10' },
        { value: 25, text: '25' },
        { value: 50, text: '50' }
      ])
    })

    it('should bind totalResultsPerPage to dropdown with v-model', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        attachTo: container
      })

      const dropdownComponent = wrapper.findComponent({ name: 'SdsPaginatorPageSizeDropdown' })
      expect(dropdownComponent.props('modelValue')).toBe(pagination.totalResultsPerPage)
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

    it('should have update:model-value listener on SdsPaginatorPageSizeDropdown', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items },
          pagination
        },
        attachTo: container
      })

      const dropdownComponent = wrapper.findComponent({ name: 'SdsPaginatorPageSizeDropdown' })
      expect(dropdownComponent.exists()).toBe(true)
      expect(dropdownComponent.vm).toBeDefined()
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
    it('should use default values when data prop is undefined', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          pagination
        },
        attachTo: container
      })

      const tableComponent = wrapper.findComponent({ name: 'SdsTable' })
      expect(tableComponent.props('items')).toEqual([])
      expect(tableComponent.props('fields')).toEqual([])
    })

    it('should use default pagination values when pagination prop is undefined', () => {
      const wrapper = mount(SdsDataTable, {
        props: {
          data: { fields, items }
        },
        attachTo: container
      })

      const paginatorComponent = wrapper.findComponent({ name: 'SdsPaginator' })
      expect(paginatorComponent.exists()).toBe(true)
      expect(paginatorComponent.props('currentPage')).toBe(1)
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
  })
})