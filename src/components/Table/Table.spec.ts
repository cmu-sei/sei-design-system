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
      createdDate: new Date(2000, 1, 1),
      lastUpdatedDate: new Date(2014, 11, 12)
    },
    {
      id: 2,
      name: 'B title',
      fruit: 'Banana',
      vegetable: 'Carrots',
      createdDate: new Date(2013, 2, 1),
      lastUpdatedDate: new Date(2013, 10, 10)
    }
  ]
  
  const fields: TableField[] = [
    { key: 'name', label: 'Title', sortable: true },
    { key: 'fruit', label: 'Fruit', sortable: true },
    { key: 'vegetable', label: 'Vegetable', sortable: true },
    { key: 'createdDate', label: 'Created', sortable: true, format: (date: Date | null) => date ? date.toLocaleDateString() : null },
    { key: 'lastUpdatedDate', label: 'Last modified', sortable: true, format: (date: Date | null) => date ? date.toLocaleDateString() : null }
  ]
  
  const slots = {
    'cell(drawer)': `
      <template #drawer='{ item }'>
        <p>{{ item.additionalData.description }}</p>
      </template>
    `
  }

  const props = {
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
    // Find all header buttons and get the Fruit column button (index 1, after Title)
    const headerButtons = wrapper.findAll('thead th button')
    await headerButtons[1].trigger('click') // Fruit
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('sorts table using an external source as its sorting behavior', async () => {
    const sortTableItems = vi.fn()
    await wrapper.setProps({ ...props, sortBy: 'name', sortDesc: true, onSort: sortTableItems })
    // Find all header buttons and get the Vegetable column button (index 2)
    const headerButtons = wrapper.findAll('thead th button')
    await headerButtons[2].trigger('click') // Vegetable
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
    // Find all buttons in the multisort column (second th element)
    const allButtons = wrapper.findAll('thead button')
    await allButtons[1].trigger('click') // Fruit (first button in multisort column)
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
    await allButtons[2].trigger('click') // Vegetable (second button in multisort column)
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

  it('matches snapshot with nested rows and columns', async () => {
    const props = {
      items: [
        items[0],
        {
          ...items[1],
          enableDrawer: true,
          toggled: true,
          nestedRows: [
            {
              id: 3,
              name: 'C title',
              fruit: 'Avocados',
              vegetable: 'Cauliflower',
              createdDate: null,
              lastUpdatedDate: null
            }
          ]
        }
      ],
      fields: [...fields]
    }
    const wrapper = mount(Component, { props })
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
    // Find all tbody buttons and get the first row's drawer toggle button
    const tbodyButtons = wrapper.findAll('tbody button')
    await tbodyButtons[0].trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')

    await tbodyButtons[0].trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(2)
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
    // Find all header buttons and get the first one (toggle all drawers button)
    const headerButtons = wrapper.findAll('thead button')
    await headerButtons[0].trigger('click')
    await headerButtons[0].trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')).toHaveLength(2)
  })

  it('renders right-aligned multisort controls with leading icon state', async () => {
    const rightAlignedFields: TableField[] = [
      {
        key: 'fruit_vegetable',
        label: 'Combined',
        align: 'right',
        fields: [
          { key: 'fruit', label: 'Fruit', sortable: true },
          { key: 'vegetable', label: 'Vegetable', sortable: true }
        ]
      }
    ]

    const wrapper = mount(Component, {
      props: {
        items: [...items],
        fields: rightAlignedFields
      }
    })

    expect(wrapper.find('thead th .mr-2').exists()).toBe(true)

    const allButtons = wrapper.findAll('thead button')
    await allButtons[0].trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('thead th .mr-2').exists()).toBe(true)
  })

  it('renders fallback custom single-field header label when no slot is provided', () => {
    const wrapper = mount(Component, {
      props: {
        items: [...items],
        fields: [{ key: 'name', label: 'Custom Title', custom: true }]
      }
    })

    const customHeader = wrapper.find('thead th')
    expect(customHeader.text()).toContain('Custom Title')
    expect(customHeader.find('button').exists()).toBe(false)
  })

  it('applies peer-hover drawer class when row is hovered and highlighted', async () => {
    const props = {
      items: [
        {
          ...items[0],
          enableDrawer: true,
          toggled: true,
          additionalData: {
            description: 'Drawer content'
          }
        }
      ],
      fields: [...fields],
      rowHighlight: true
    }

    const wrapper = mount(Component, { props, slots })
    const baseRow = wrapper.find('tbody tr')
    await baseRow.trigger('mouseover')
    await wrapper.vm.$nextTick()

    const drawerRow = wrapper.find('tr[data-drawer="true"]')
    expect(drawerRow.exists()).toBe(true)
    expect(drawerRow.classes()).toContain('[.table-prose_tbody_&]:peer-hover:bg-gray-25')

    await baseRow.trigger('mouseleave')
    await wrapper.vm.$nextTick()
  })

  it('sorts object values using recursive string conversion branch', async () => {
    const objectItems: TableItem[] = [
      { id: 1, meta: { status: 'b', nested: { rank: 2 } } },
      { id: 2, meta: { status: 'a', nested: { rank: 1 } } }
    ]

    const wrapper = mount(Component, {
      props: {
        items: objectItems,
        fields: [{ key: 'meta', label: 'Meta', sortable: true }],
        sortBy: 'meta'
      }
    })

    const sortButton = wrapper.find('thead th button')
    await sortButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('tbody tr').length).toBe(2)
  })

  it('matches snapshot with assigned `density` prop', async () => {
    await wrapper.setProps({ ...props, density: 'condensed' })
    expect(wrapper.classes()).toContain('table-prose-sm')
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setProps({ density: 'comfortable' })
    expect(wrapper.classes()).toContain('table-prose-lg')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with assigned `rowHighlight` prop', async () => {
    await wrapper.setProps({ ...props, rowHighlight: true })
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('Sticky columns', () => {
    const stickyFields: TableField[] = [
      { key: 'name', label: 'Title', sortable: true, stickyPosition: 0, stickyLeftClass: 'left-0', stickyEnd: true },
      { key: 'fruit', label: 'Fruit', sortable: true },
      { key: 'vegetable', label: 'Vegetable', sortable: true }
    ]

    it('should apply sticky class to th and td when stickyPosition is defined', () => {
      const wrapper = mount(Component, {
        props: { items: [...items], fields: stickyFields }
      })

      const stickyTh = wrapper.find('thead th.sticky')
      expect(stickyTh.exists()).toBe(true)

      const stickyTds = wrapper.findAll('tbody td.sticky')
      expect(stickyTds.length).toBe(items.length)
    })

    it('should apply default left-0 class when stickyLeftClass is not provided', () => {
      const fieldsWithoutLeftClass: TableField[] = [
        { key: 'name', label: 'Title', sortable: true, stickyPosition: 0 },
        { key: 'fruit', label: 'Fruit', sortable: true }
      ]
      const wrapper = mount(Component, {
        props: { items: [...items], fields: fieldsWithoutLeftClass }
      })

      const stickyTh = wrapper.find('thead th.sticky')
      expect(stickyTh.classes()).toContain('left-0')
    })

    it('should apply custom stickyLeftClass when provided', () => {
      const wrapper = mount(Component, {
        props: { items: [...items], fields: stickyFields }
      })

      const stickyTh = wrapper.find('thead th.sticky')
      expect(stickyTh.classes()).toContain('left-0')
    })

    it('should apply sticky-end class when stickyEnd is true', () => {
      const wrapper = mount(Component, {
        props: { items: [...items], fields: stickyFields }
      })

      const stickyTh = wrapper.find('thead th.sticky')
      expect(stickyTh.classes()).toContain('sticky-end')
    })

    it('should not apply sticky-end class when stickyEnd is false', () => {
      const fieldsNoStickyEnd: TableField[] = [
        { key: 'name', label: 'Title', sortable: true, stickyPosition: 0, stickyEnd: false },
        { key: 'fruit', label: 'Fruit', sortable: true }
      ]
      const wrapper = mount(Component, {
        props: { items: [...items], fields: fieldsNoStickyEnd }
      })

      const stickyTh = wrapper.find('thead th.sticky')
      expect(stickyTh.classes()).not.toContain('sticky-end')
    })

    it('should not apply sticky classes to fields without stickyPosition', () => {
      const wrapper = mount(Component, {
        props: { items: [...items], fields: stickyFields }
      })

      const allThs = wrapper.findAll('thead th')
      const nonStickyThs = allThs.filter((th) => !th.classes().includes('sticky'))
      expect(nonStickyThs.length).toBe(stickyFields.length - 1)
    })

    it('should apply z-10 class to sticky cells', () => {
      const wrapper = mount(Component, {
        props: { items: [...items], fields: stickyFields }
      })

      const stickyTh = wrapper.find('thead th.sticky')
      expect(stickyTh.classes()).toContain('z-10')

      const firstStickyTd = wrapper.find('tbody td.sticky')
      expect(firstStickyTd.classes()).toContain('z-10')
    })
  })
})
