import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import axe from 'axe-core'
import Component from './Section.vue'

describe('Section', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('displays title and subtitle props with default title styling', () => {
    const wrapper = mount(Component, {
      props: {
        title: 'Account details',
        subtitle: 'Manage account information'
      }
    })

    const title = wrapper.get('.slot-title')

    expect(title.text()).toBe('Account details')
    expect(title.classes()).toEqual(expect.arrayContaining(['uppercase', 'font-semibold']))
    expect(wrapper.get('header').text()).toContain('Manage account information')
  })

  it('displays named slots instead of title and subtitle props', () => {
    const wrapper = mount(Component, {
      props: {
        title: 'Prop title',
        subtitle: 'Prop subtitle'
      },
      slots: {
        title: 'Slot title',
        subtitle: 'Slot subtitle'
      }
    })

    const headerText = wrapper.get('header').text()

    expect(headerText).toContain('Slot title')
    expect(headerText).toContain('Slot subtitle')
    expect(headerText).not.toContain('Prop title')
    expect(headerText).not.toContain('Prop subtitle')
  })

  it('does not display heading wrappers for empty title and subtitle props', () => {
    const wrapper = mount(Component, {
      props: {
        title: '',
        subtitle: ''
      }
    })

    expect(wrapper.find('.slot-title').exists()).toBe(false)
    expect(wrapper.find('.text-sm').exists()).toBe(false)
  })

  it('hides title and subtitle props when the header is hidden', () => {
    const wrapper = mount(Component, {
      props: {
        title: 'Account details',
        subtitle: 'Manage account information',
        hideHeader: true
      }
    })

    expect(wrapper.find('header').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('Account details')
    expect(wrapper.text()).not.toContain('Manage account information')
  })

  it('has no accessibility violations', async () => {
    const wrapper = mount(Component, { attachTo: document.body })
    const results = await axe.run(wrapper.element as Element)
    expect(results.violations).toHaveLength(0)
    wrapper.unmount()
  })
})
