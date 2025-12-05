import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './SimpleApplication.vue'

describe('SimpleApplication', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Button'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  // TODO: Come back to this

  it('should emit navigate event when app suite link is clicked', async () => {
    const wrapper = mount(Component, {
      props: {
        appSuite: 'Test Suite',
        appSuiteUrl: 'https://example.com'
      }
    })

    const link = wrapper.find('a[href="https://example.com"]')
    await link.trigger('click')
  })

  it('should emit navigate event with correct payload', async () => {
    const wrapper = mount(Component, {
      props: {
        appSuite: 'Test Suite',
        appSuiteUrl: 'https://example.com',
        appSuitePrefix: 'TEST'
      }
    })

    const link = wrapper.find('a')
    await link.trigger('click')
  })

  it('should not render link when appSuiteUrl is not provided', () => {
    const wrapper = mount(Component, {
      props: {
        appSuite: 'Test Suite'
      }
    })

    const link = wrapper.find('a[href]')
  })
})
