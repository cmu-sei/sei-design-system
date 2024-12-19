import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Tag.vue'

describe('Tag', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `id` prop', () => {
    const wrapper = mount(Component, {
      props: {
        id: 'unique-id',
        label: 'Tag'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `size` prop', () => {
    const wrapper = mount(Component, {
      props: {
        label: 'Tag',
        size: 'md'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `href`, `external` props', () => {
    const wrapper = mount(Component, {
      props: {
        href: 'https://www.google.com/',
        label: 'Google',
        external: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `readonly` prop', () => {
    const wrapper = mount(Component, {
      props: {
        label: 'Tag',
        readonly: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot(s) with assigned `action` prop', async () => {
    const wrapper = mount(Component, {
      props: {
        label: 'Tag',
        action: 'increment'
      }
    })
    expect(wrapper.element).toMatchSnapshot()

    await wrapper.setProps({ action: 'decrement' })
    expect(wrapper.element).toMatchSnapshot()

    await wrapper.setProps({ action: 'remove' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot on mouseover, mouseleave events', async () => {
    const wrapper = mount(Component, {
      props: {
        href: 'https://www.google.com/',
        label: 'Google'
      }
    })

    await wrapper.find('a').trigger('mouseover')
    expect(wrapper.element).toMatchSnapshot()

    await wrapper.find('a').trigger('mouseleave')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot on mousedown, mouseup events', async () => {
    const wrapper = mount(Component, {
      props: {
        href: 'https://www.google.com/',
        label: 'Google'
      }
    })

    await wrapper.find('a').trigger('mouseover')
    await wrapper.find('a').trigger('mousedown')
    expect(wrapper.element).toMatchSnapshot()

    await wrapper.find('a').trigger('mouseup')
    expect(wrapper.element).toMatchSnapshot()
  })
})