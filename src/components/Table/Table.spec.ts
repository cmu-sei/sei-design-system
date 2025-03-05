import type { TableField, TableItem } from './Table.vue'
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Component from './Table.vue'

describe('Table', () => {
  let wrapper: VueWrapper<InstanceType<typeof Component>>

  const items: TableItem[] = [
    {
      id: 1,
      name: 'A title',
      fruit: 'Apple',
      vegetable: 'Broccoli',
      createdDate: new Date('2000-01-01'),
      lastUpdatedDate: new Date('2014-11-12')
    },
    {
      id: 2,
      name: 'B title',
      fruit: 'Banana',
      vegetable: 'Carrots',
      createdDate: new Date('2013-02-01'),
      lastUpdatedDate: new Date('2013-10-10')
    }
  ]
  
  const fields: TableField[] = [
    { key: 'name', label: 'Title', sortable: true },
    { key: 'fruit', label: 'Fruit', sortable: true },
    { key: 'vegetable', label: 'Vegetable', sortable: true },
    { key: 'createdDate', label: 'Created', sortable: true, format: (date: Date) => date.toLocaleDateString() },
    { key: 'lastUpdatedDate', label: 'Last modified', sortable: true, format: (date: Date) => date.toLocaleDateString() }
  ]
  
  const slots = {
    'cell(drawer)': `
      <template #drawer='{ item }'>
        <p>{{ item.additionalData.description }}</p>
      </template>
    `
  }

  const props = {
    id: 'unique-id',
    items: [...items],
    fields: [...fields],
    sortBy: 'lastUpdatedDate'
  }

  afterAll(() => {
    wrapper.unmount()
  })

  beforeEach(() => {
    wrapper = mount(Component, { props })
  })

  it('matches default snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with assigned `caption` prop', async () => {
    await wrapper.setProps({ ...props, caption: 'Caption' })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('sorts table by field (column)', async () => {
    await wrapper.setProps({ ...props, sortBy: 'name' })
    const button = wrapper.find('table thead tr th:nth-child(2) button') // Fruit
    await button.trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('sorts table using an external source as its sorting behavior', async () => {
    const sortTableItems = vi.fn()
    await wrapper.setProps({ ...props, sortBy: 'name', sortDesc: true, onSort: sortTableItems })
    const button = wrapper.find('table thead tr th:nth-child(3) button') // Vegetable
    await button.trigger('click')
    expect(sortTableItems).toHaveBeenCalledWith({
      field: { ...fields[2] },
      sortBy: 'vegetable',
      sortDesc: false
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with multisort columns', async () => {
    const [name,,, createdDate, lastUpdatedDate] = fields
    const props = {
      items: [...items],
      fields: [
        name,
        { 
          key: 'fruit_vegetable', 
          fields: [
            { key: 'fruit', label: 'Fruit', sortable: true },
            { key: 'vegetable', label: 'Vegetable', sortable: true }
          ] 
        },
        createdDate,
        lastUpdatedDate
      ]
    }
    await wrapper.setProps({ ...props })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('sorts table by fields (multisort columns)', async () => {
    const [name,,, createdDate, lastUpdatedDate] = fields
    const props = {
      items: [...items],
      fields: [
        name,
        { 
          key: 'fruit_vegetable', 
          fields: [
            { key: 'fruit', label: 'Fruit', sortable: true },
            { key: 'vegetable', label: 'Vegetable', sortable: true }
          ] 
        },
        createdDate,
        lastUpdatedDate
      ]
    }
    await wrapper.setProps({ ...props })
    await wrapper
      .find('table thead tr th:nth-child(2) button:nth-child(1)')
      .trigger('click') // Fruit
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper
      .find('table thead tr th:nth-child(2) button:nth-child(2)')
      .trigger('click') // Vegetable
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with assigned `enableDrawer` prop', () => {
    const props = {
      enableDrawer: true,
      items: [
        ...items.map((i) => ({
          ...i,
          additionalData: {
            description: 'Lorem ipsum dolor sit amet'
          }
        }))
      ],
      fields: [...fields]
    }
    const wrapper = mount(Component, { props, slots })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits when toggling a table drawer', async () => {
    const props = {
      enableDrawer: true,
      items: [
        ...items.map((i) => ({ 
          ...i,
          additionalData: {
            description: 'Lorem ipsum dolor sit amet'
          }
        }))
      ],
      fields: [...fields]
    }
    const wrapper = mount(Component, { props, slots })
    const button = wrapper.find('table tbody tr:nth-child(1) td:nth-child(1) button')
    await button.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits when toggling all table drawers', async () => {
    const props = {
      items: [
        ...items.map((i) => ({ 
          ...i, 
          enableDrawer: true, 
          additionalData: { 
            description: 'Lorem ipsum dolor sit amet' 
          }
        }))
      ],
      fields: [...fields]
    }
    const wrapper = mount(Component, { props, slots })
    const button = wrapper.find('table thead tr th:nth-child(1) button')
    await button.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with assigned `density` prop', async () => {
    await wrapper.setProps({ ...props, density: 'condensed' })
    expect(wrapper.classes()).toContain('table-prose-sm')
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setProps({ density: 'comfortable' })
    expect(wrapper.classes()).toContain('table-prose-lg')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with assigned `hideHeader` prop', async () => {
    await wrapper.setProps({ ...props, hideHeader: true })
    expect(wrapper.find('[data-id="sds-table"] thead').attributes('hidden')).not.toBeUndefined()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
