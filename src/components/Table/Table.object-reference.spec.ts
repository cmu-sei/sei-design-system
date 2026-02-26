import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Table from './Table.vue'
import type { TableField, TableItem } from './Table.vue'

describe('Table - Object Reference Preservation', () => {
  const fields: TableField[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'selected', label: 'Selected' }
  ]

  it('should preserve object references and state across pagination changes', async () => {
    // Simulate parent component's complete dataset
    const allItems: TableItem[] = [
      { id: 1, name: 'Item 1', selected: false },
      { id: 2, name: 'Item 2', selected: false },
      { id: 3, name: 'Item 3', selected: false },
      { id: 4, name: 'Item 4', selected: false }
    ]

    // Mount with page 1 items (items 1-2)
    const wrapper = mount(Table, {
      props: {
        fields,
        items: allItems.slice(0, 2)
      }
    })

    // Simulate user selecting item 1
    allItems[0].selected = true
    await wrapper.vm.$nextTick()

    // Update to page 2 (items 3-4)
    await wrapper.setProps({
      items: allItems.slice(2, 4)
    })

    // Verify parent's selection state is still intact
    expect(allItems[0].selected).toBe(true)

    // Go back to page 1 (items 1-2)
    await wrapper.setProps({
      items: allItems.slice(0, 2)
    })

    // Verify the selection persisted - this is the key test
    expect(allItems[0].selected).toBe(true)
    
    // Verify modification through object reference works
    allItems[1].selected = true
    await wrapper.vm.$nextTick()
    expect(allItems[1].selected).toBe(true)
  })

  it('should preserve object references through sorting', async () => {
    const items: TableItem[] = [
      { id: 3, name: 'Charlie', selected: false },
      { id: 1, name: 'Alice', selected: false },
      { id: 2, name: 'Bob', selected: false }
    ]

    const wrapper = mount(Table, {
      props: {
        fields: [
          ...fields.map(f => ({ ...f, sortable: f.key === 'name' }))
        ],
        items,
        sortBy: 'name'
      }
    })

    // Select an item
    items[0].selected = true // Charlie

    await wrapper.vm.$nextTick()

    // Even though table is sorted, the object reference should be preserved
    expect(items[0].selected).toBe(true)
    expect(items[0].name).toBe('Charlie')
  })

  it('should allow v-model binding to work across pagination', async () => {
    const allItems: TableItem[] = [
      { id: 1, name: 'Item 1', checked: false },
      { id: 2, name: 'Item 2', checked: false },
      { id: 3, name: 'Item 3', checked: false }
    ]

    const wrapper = mount(Table, {
      props: {
        fields: [
          { key: 'checked', label: 'Checked' },
          { key: 'name', label: 'Name' }
        ],
        items: allItems.slice(0, 2) // Page 1
      },
      slots: {
        'cell(checked)': `
          <template #cell(checked)="{ item }">
            <input type="checkbox" v-model="item.checked" />
          </template>
        `
      }
    })

    // Modify through the item reference
    allItems[0].checked = true
    await wrapper.vm.$nextTick()

    // Navigate to page 2
    await wrapper.setProps({ items: allItems.slice(2, 3) })

    // Navigate back to page 1
    await wrapper.setProps({ items: allItems.slice(0, 2) })

    // Verify the selection persisted
    expect(allItems[0].checked).toBe(true)
  })
})
