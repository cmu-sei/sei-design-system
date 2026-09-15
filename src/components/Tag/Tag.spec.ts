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

  it('should match its snapshot(s) with assigned `disabled` prop', async () => {
    const wrapper = mount(Component, {
      props: {
        label: 'Tag',
        disabled: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('emits increment when a non-link tag is clicked', async () => {
    const wrapper = mount(Component, {
      props: {
        action: 'increment',
        counter: 2,
        id: 'tag-id',
        label: 'Tag'
      }
    })

    await wrapper.get('[data-id="sds-tag-action-target"]').trigger('click')

    expect(wrapper.emitted('increment')).toEqual([
      [{ id: 'tag-id', count: 3 }]
    ])
  })

  it('expands a non-link action button over the full tag', () => {
    const wrapper = mount(Component, {
      props: {
        action: 'increment',
        label: 'Tag'
      }
    })

    expect(wrapper.get('[data-id="sds-tag"]').element.tagName).toBe('DIV')
    expect(wrapper.get('[data-id="sds-tag-action-target"]').classes()).toEqual(
      expect.arrayContaining(['absolute', 'inset-0'])
    )
    expect(wrapper.get('[data-id="sds-tag"]').classes()).toEqual(
      expect.arrayContaining([
        'cursor-pointer',
        'hover:bg-blue-50',
        'dark:hover:bg-blue-900',
        'hover:text-blue-600',
        'dark:hover:text-blue-300',
        'hover:border-blue-600',
        'dark:hover:border-blue-300',
        'active:bg-blue-100',
        'dark:active:bg-blue-800'
      ])
    )
    expect(wrapper.get('button').classes()).toEqual(
      expect.arrayContaining([
        'hover:bg-blue-50',
        'dark:hover:bg-blue-900',
        'active:bg-blue-100',
        'dark:active:bg-blue-800'
      ])
    )
    expect(wrapper.get('[data-id="sds-tag"]').classes()).not.toEqual(
      expect.arrayContaining([
        'active:border-gray-900',
        'dark:active:border-gray-100'
      ])
    )
  })

  it('emits decrement when a non-link tag is clicked', async () => {
    const wrapper = mount(Component, {
      props: {
        action: 'decrement',
        counter: 2,
        id: 'tag-id',
        label: 'Tag'
      }
    })

    await wrapper.get('[data-id="sds-tag-action-target"]').trigger('click')

    expect(wrapper.emitted('decrement')).toEqual([
      [{ id: 'tag-id', count: 1 }]
    ])
  })

  it('emits remove when a non-link tag is clicked', async () => {
    const wrapper = mount(Component, {
      props: {
        action: 'remove',
        counter: 2,
        id: 'tag-id',
        label: 'Tag'
      }
    })

    expect(wrapper.get('[data-id="sds-tag"]').classes()).toEqual(
      expect.arrayContaining([
        'hover:bg-red-50',
        'dark:hover:bg-red-900',
        'hover:text-red-600',
        'dark:hover:text-red-300',
        'hover:border-red-600',
        'dark:hover:border-red-300',
        'active:bg-red-100',
        'dark:active:bg-red-800',
        'group/tag'
      ])
    )
    expect(wrapper.get('.bg-blue-600').classes()).toContain(
      'group-hover/tag:bg-red-600'
    )
    expect(wrapper.get('button').classes()).toEqual(
      expect.arrayContaining([
        'active:bg-red-100',
        'dark:active:bg-red-800'
      ])
    )

    await wrapper.get('[data-id="sds-tag-action-target"]').trigger('click')

    expect(wrapper.emitted('remove')).toEqual([['tag-id']])
  })

  it('does not expand the action button over a linked tag', () => {
    const wrapper = mount(Component, {
      props: {
        action: 'remove',
        href: '/tags/tag-id',
        id: 'tag-id',
        label: 'Tag'
      }
    })

    expect(wrapper.find('[data-id="sds-tag-action-target"]').exists()).toBe(false)
    expect(wrapper.emitted('remove')).toBeUndefined()
  })

  it('shows linked focus on the tag without changing action focus', () => {
    const wrapper = mount(Component, {
      props: {
        action: 'increment',
        href: '/tags/tag-id',
        label: 'Tag'
      }
    })

    expect(wrapper.get('a').classes()).toContain('focus:outline-none')
    expect(wrapper.get('[data-id="sds-tag"]').classes()).toEqual(
      expect.arrayContaining([
        'has-[a:focus-visible]:outline-2',
        'has-[a:focus-visible]:outline-offset-2',
        'has-[a:focus-visible]:outline-blue-600',
        'dark:has-[a:focus-visible]:outline-blue-400'
      ])
    )
    expect(wrapper.get('button').classes()).toContain('focus-visible:bg-blue-50')
  })

  it('preserves the separate action button for a linked tag', async () => {
    const wrapper = mount(Component, {
      props: {
        action: 'remove',
        href: '/tags/tag-id',
        id: 'tag-id',
        label: 'Tag'
      }
    })

    expect(wrapper.get('button').classes()).toEqual(
      expect.arrayContaining([
        'active:bg-red-100',
        'dark:active:bg-red-800'
      ])
    )

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('remove')).toEqual([['tag-id']])
  })

  it('disables the action button when the tag is disabled', async () => {
    const wrapper = mount(Component, {
      props: {
        action: 'remove',
        disabled: true,
        id: 'tag-id',
        label: 'Tag'
      }
    })

    expect(wrapper.get('button').attributes('disabled')).toBe('')

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted('remove')).toBeUndefined()
  })
})
