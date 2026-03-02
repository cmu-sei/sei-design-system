import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Table from './Table.vue'
import type { TableField, TableItem } from './Table.vue'

describe('Table - srOnly field property', () => {
  const items: TableItem[] = [
    { id: 1, name: 'Item 1', status: 'Active' },
    { id: 2, name: 'Item 2', status: 'Inactive' }
  ]

  it('should apply sr-only class to field label when srOnly is true', () => {
    const fields: TableField[] = [
      { key: 'name', label: 'Name', srOnly: true },
      { key: 'status', label: 'Status' }
    ]

    const wrapper = mount(Table, {
      props: { fields, items }
    })

    // Find the header cells
    const headers = wrapper.findAll('thead th')
    
    // First header should have sr-only span as direct child (not in button)
    const nameHeader = headers[0]
    const nameSpan = nameHeader.find('span.sr-only')
    expect(nameSpan.exists()).toBe(true)
    expect(nameSpan.text()).toBe('Name')
    // Should NOT have a button when srOnly is true
    expect(nameHeader.find('button').exists()).toBe(false)

    // Second header should have button with span inside (not sr-only)
    const statusHeader = headers[1]
    const statusButton = statusHeader.find('button')
    expect(statusButton.exists()).toBe(true)
    const statusSpan = statusButton.find('span')
    expect(statusSpan.classes()).not.toContain('sr-only')
    expect(statusSpan.text()).toBe('Status')
  })

  it('should apply sr-only to parent field with nested fields', () => {
    const fields: TableField[] = [
      {
        key: 'combined',
        label: 'Combined',
        srOnly: true,
        fields: [
          { key: 'name', label: 'Name' },
          { key: 'status', label: 'Status' }
        ]
      }
    ]

    const wrapper = mount(Table, {
      props: { fields, items }
    })

    // Find the header cell with nested fields
    const headers = wrapper.findAll('thead th')
    const combinedHeader = headers[0]
    
    // Should have sr-only span at th level
    const srOnlySpan = combinedHeader.find('span.sr-only')
    expect(srOnlySpan.exists()).toBe(true)
    expect(srOnlySpan.text()).toBe('Combined')
    
    // Should NOT have buttons because parent has srOnly
    expect(combinedHeader.findAll('button').length).toBe(0)
  })

  it('should render nested fields with buttons when parent does not have srOnly', () => {
    const fields: TableField[] = [
      {
        key: 'combined',
        label: 'Combined',
        fields: [
          { key: 'name', label: 'Name', sortable: true },
          { key: 'status', label: 'Status', sortable: false }
        ]
      }
    ]

    const wrapper = mount(Table, {
      props: { fields, items }
    })

    const headers = wrapper.findAll('thead th')
    const combinedHeader = headers[0]
    
    // Should NOT have sr-only span
    expect(combinedHeader.find('span.sr-only').exists()).toBe(false)
    
    // Should have buttons for each nested field
    const buttons = combinedHeader.findAll('button')
    expect(buttons.length).toBe(2)
    
    // Check button contents
    expect(buttons[0].text()).toContain('Name')
    expect(buttons[1].text()).toContain('Status')
  })

  it('should not apply sr-only class when srOnly is false or undefined', () => {
    const fields: TableField[] = [
      { key: 'name', label: 'Name', srOnly: false },
      { key: 'status', label: 'Status' } // srOnly undefined
    ]

    const wrapper = mount(Table, {
      props: { fields, items }
    })

    const headers = wrapper.findAll('thead th')
    
    // Both should have buttons with spans inside (not sr-only at th level)
    const nameButton = headers[0].find('button')
    expect(nameButton.exists()).toBe(true)
    const nameSpan = nameButton.find('span')
    expect(nameSpan.classes()).not.toContain('sr-only')
    
    const statusButton = headers[1].find('button')
    expect(statusButton.exists()).toBe(true)
    const statusSpan = statusButton.find('span')
    expect(statusSpan.classes()).not.toContain('sr-only')
  })

  it('should not render button for fields with srOnly (accessibility improvement)', () => {
    const fields: TableField[] = [
      { key: 'selected', label: 'Select', srOnly: true },
      { key: 'name', label: 'Name' }
    ]

    const wrapper = mount(Table, {
      props: { fields, items }
    })

    const headers = wrapper.findAll('thead th')
    
    // srOnly field should NOT have button (since it's not interactive)
    const selectedHeader = headers[0]
    expect(selectedHeader.find('button').exists()).toBe(false)
    expect(selectedHeader.find('span.sr-only').exists()).toBe(true)
    
    // Normal field should have button
    const nameHeader = headers[1]
    expect(nameHeader.find('button').exists()).toBe(true)
  })
})
