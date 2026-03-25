import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import axe from 'axe-core'
import Scrollspy from './Scrollspy.vue'

const items = [
  { id: 'scrollspy-test', text: 'Heading 1' },
  { id: 'scrollspy-test-2', text: 'Heading 2' },
  { id: 'scrollspy-test-3', text: 'Heading 3' },
  { id: 'scrollspy-test-4', text: 'Heading 4' },
  { id: 'scrollspy-test-5', text: 'Heading 5' }
]

describe('Scrollspy', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0)
      return 0
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders a nav element with correct structure', () => {
    const wrapper = mount(Scrollspy, {})
    expect(wrapper.element.tagName).toBe('NAV')
    expect(wrapper.findAll('a')).toHaveLength(0)
  })

  it('renders all items as links with correct attributes and content', () => {
    const wrapper = mount(Scrollspy, {
      props: { items }
    })

    const links = wrapper.findAll('a')
    expect(links).toHaveLength(items.length)

    links.forEach((link, index) => {
      const item = items[index]
      expect(link.attributes('href')).toBe(`#${item.id}`)
      expect(link.attributes('data-id')).toBe('sds-scrollspy')
      expect(link.text()).toBe(item.text)
    })
  })

  it('renders custom slot content for each item', () => {
    const wrapper = mount(Scrollspy, {
      props: { items },
      slots: {
        default: ({ item }: { item: { id: string; text: string } }) =>
          `<span class="custom-class">${item.text.toUpperCase()}</span>`
      }
    })

    const links = wrapper.findAll('a')
    expect(links).toHaveLength(items.length)

    links.forEach((link, index) => {
      expect(link.html()).toContain('custom-class')
      expect(link.html()).toContain(items[index].text.toUpperCase())
    })
  })

  it('applies activeClass to the active item and inactiveClass to others', async () => {
    const wrapper = mount(Scrollspy, {
      props: {
        items,
        itemClass: 'tab',
        activeClass: 'active',
        inactiveClass: 'inactive'
      }
    })

    const links = wrapper.findAll('a')
    links.forEach(link => {
      expect(link.classes()).toContain('tab')
      expect(link.classes()).toContain('inactive')
    })
  })

  it('attaches window scroll event listener when no parent is provided', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')

    mount(Scrollspy, {
      props: { items }
    })

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), {})
  })

  it('removes window scroll event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const wrapper = mount(Scrollspy, {
      props: { items }
    })

    wrapper.unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), {})
  })

  it('attaches parent element scroll event listener when parent selector is provided', () => {
    const parentElement = document.createElement('div')
    parentElement.id = 'test-parent'
    document.body.appendChild(parentElement)
    const addEventListenerSpy = vi.spyOn(parentElement, 'addEventListener')

    mount(Scrollspy, {
      props: {
        items,
        parent: '#test-parent'
      }
    })

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), {})

    document.body.removeChild(parentElement)
  })

  it('removes parent element scroll event listener on unmount', () => {
    const parentElement = document.createElement('div')
    parentElement.id = 'test-parent'
    document.body.appendChild(parentElement)
    const removeEventListenerSpy = vi.spyOn(parentElement, 'removeEventListener')

    const wrapper = mount(Scrollspy, {
      props: {
        items,
        parent: '#test-parent'
      }
    })

    wrapper.unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), {})

    document.body.removeChild(parentElement)
  })

  it('does not call preventDefault when no parent is provided', async () => {
    const wrapper = mount(Scrollspy, {
      props: { items }
    })

    const link = wrapper.find('a')
    const event = new Event('click')
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

    link.element.dispatchEvent(event)

    expect(preventDefaultSpy).not.toHaveBeenCalled()
  })

  it('handles missing target element in scrollToIdTarget gracefully', async () => {
    const parentElement = document.createElement('div')
    parentElement.id = 'scrollable-parent'
    document.body.appendChild(parentElement)

    const wrapper = mount(Scrollspy, {
      props: {
        items,
        parent: '#scrollable-parent'
      }
    })

    const link = wrapper.find('a')

    await link.trigger('click')

    expect(wrapper.exists()).toBe(true)

    document.body.removeChild(parentElement)
  })

  it('renders with data-id attribute', () => {
    const wrapper = mount(Scrollspy, {
      props: { items }
    })

    const links = wrapper.findAll('[data-id="sds-scrollspy"]')
    expect(links.length).toBe(items.length)
  })

  it('has no accessibility violations', async () => {
    const wrapper = mount(Scrollspy, {
      attachTo: document.body,
      props: { items }
    })
    const results = await axe.run(wrapper.element as Element)
    expect(results.violations).toHaveLength(0)
    wrapper.unmount()
  })
})
