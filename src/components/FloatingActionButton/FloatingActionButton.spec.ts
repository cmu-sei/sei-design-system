import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Component from './FloatingActionButton.vue'

describe('SdsFloatingActionButton', () => {
  it('should match its default snapshot', () => {
    const wrapper = shallowMount(Component, {
      props: {
        modelValue: [
          { key: 'tab1', tabName: 'Tab 1', title: 'Active Tab 1', active: true },
          { key: 'tab2', tabName: 'Tab 2', title: 'Active Tab 2', active: false },
          { key: 'tab3', tabName: 'Tab 3', title: 'Active Tab 3', active: false }
        ]
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})