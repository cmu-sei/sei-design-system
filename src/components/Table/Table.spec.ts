import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Table.vue'

const items = [
  {
    id: 1,
    name: 'A title',
    fruit: 'Apple',
    vegetable: 'Broccoli',
    createdDate: new Date('2000-01-01'),
    lastUpdatedDate: new Date('2014-11-12'),
  },
  {
    id: 2,
    name: 'B title',
    fruit: 'Banana',
    vegetable: 'Carrots',
    createdDate: new Date('2013-02-01'),
    lastUpdatedDate: new Date('2013-10-10'),
  },
]

const fields = [
  { key: 'name', label: 'Title', sortable: true },
  { key: 'fruit', label: 'Fruit', sortable: true },
  { key: 'vegetable', label: 'Vegetable', sortable: true },
  { key: 'createdDate', label: 'Created', sortable: true, format: (date: Date) => date.toLocaleDateString() },
  { key: 'lastUpdatedDate', label: 'Last modified', sortable: true, format: (date: Date) => date.toLocaleDateString() }
]

describe('Table', () => {
  it('matches default snapshot', () => {
    const props = {}
    const wrapper = mount(Component, { props })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with assigned props', () => {
    const props = {
      items: [...items],
      fields: [...fields],
      sortBy: 'lastUpdatedDate'
    }
    const wrapper = mount(Component, { props })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with assigned `caption` prop', () => {
    const props = {
      items: [...items],
      fields: [...fields],
      caption: 'Caption'
    }
    const wrapper = mount(Component, { props })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('sorts table by field (column)', async () => {
    const props = {
      items: [...items],
      fields: [...fields],
      sortBy: 'name'
    }
    const wrapper = mount(Component, { props })
    const button = wrapper.find('table thead tr th:nth-child(2) button') // Fruit
    await button.trigger('click')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('sorts table using an external source as its sorting behavior', async () => {
    const sortTableItems = vi.fn()
    const props = {
      items: [...items],
      fields: [...fields],
      sortBy: 'name',
      sortDesc: true,
      onSort: sortTableItems
    }
    const wrapper = mount(Component, { props })
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
    const wrapper = mount(Component, { props })
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
    const wrapper = mount(Component, { props })
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
      items: [...items.map((i) => ({ ...i, additionalData: { description: 'Lorem ipsum dolor sit amet' } }))],
      fields: [...fields]
    }
    const slots = {
      'cell(drawer)': `
        <template #drawer='{ item }'>
          <p>{{ item.additionalData.description }}</p>
        </template>
      `
    }
    const wrapper = mount(Component, { props, slots })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits when toggling a table drawer', async () => {
    const props = {
      enableDrawer: true,
      items: [...items.map((i) => ({ ...i, additionalData: { description: 'Lorem ipsum dolor sit amet' } }))],
      fields: [...fields]
    }
    const slots = {
      'cell(drawer)': `
        <template #drawer='{ item }'>
          <p>{{ item.additionalData.description }}</p>
        </template>
      `
    }
    const wrapper = mount(Component, { props, slots })
    const button = wrapper.find('table tbody tr:nth-child(1) td:nth-child(1) button')
    await button.trigger('click')
    expect(wrapper.emitted()['open-drawer'][0]![0]).toStrictEqual(props.items[0])
  })
})
