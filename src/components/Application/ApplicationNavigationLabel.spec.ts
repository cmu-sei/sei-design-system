import axe from 'axe-core'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Component from './ApplicationNavigationLabel.vue'

describe('ApplicationNavigationLabel', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      props: {
        title: 'Navigation label'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render the badge directly after the complete title', () => {
    const wrapper = mount(Component, {
      props: {
        title: 'A navigation label that can wrap',
        badgeCount: 2
      }
    })

    const badge = wrapper.find('.rounded-full')
    const contentNodes = Array.from(wrapper.element.childNodes)
      .filter((node) => node.textContent?.trim())

    expect(contentNodes[0]?.textContent?.trim()).toBe('A navigation label that can wrap')
    expect(wrapper.element.lastElementChild).toBe(badge.element)
    expect(badge.text()).toBe('2')
  })

  it('should render the title without a badge group when no count is provided', () => {
    const wrapper = mount(Component, {
      props: {
        title: 'Navigation label'
      }
    })

    expect(wrapper.text()).toBe('Navigation label')
    expect(wrapper.find('[data-id="sds-application-navigation-label-suffix"]').exists()).toBe(false)
  })

  it('should forward attributes to the label', () => {
    const wrapper = mount(Component, {
      attrs: {
        class: 'custom-class',
        style: 'color: red;'
      },
      props: {
        title: 'Navigation label'
      }
    })

    expect(wrapper.classes()).toContain('custom-class')
    expect(wrapper.attributes('style')).toContain('color: red')
  })

  it('should have no accessibility violations', async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: {
        title: 'Navigation label',
        badgeCount: 2
      }
    })

    const results = await axe.run(wrapper.element as Element)

    expect(results.violations).toHaveLength(0)
    wrapper.unmount()
  })
})
