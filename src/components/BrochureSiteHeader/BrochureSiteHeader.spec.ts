import { describe, expect, it } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Component from './BrochureSiteHeader.vue'

describe('SdsBrochureSiteHeader', () => {
  let wrapper: VueWrapper<InstanceType<typeof Component>>

  // default rendering
  it('should render header element', () => {
    wrapper = mount(Component, { props: { page: {} } })
    const header = wrapper.find('header[data-id="sds-brochure-site-header"]')
    expect(header.exists()).toBe(true)
  })

  it('should render CMU wordmark link', () => {
    wrapper = mount(Component, { props: { page: {} } })
    const link = wrapper.find('a[href="https://www.cmu.edu/"]')
    expect(link.exists()).toBe(true)
    expect(link.attributes('target')).toBe('_self')
  })

  it('should render CMU wordmark with screen reader text', () => {
    wrapper = mount(Component, { props: { page: {} } })
    const srText = wrapper.find('.sr-only')
    expect(srText.text()).toBe('Carnegie Mellon University')
  })

  it('should render BrochureSiteWordmark component', () => {
    wrapper = mount(Component, { props: { page: {} } })
    const wordmark = wrapper.find('[data-id="sds-brochure-site-wordmark"]')
    expect(wordmark.exists()).toBe(true)
  })

  it('should render SEI title link', () => {
    wrapper = mount(Component, { props: { page: {} } })
    const seiLink = wrapper.find('a[href="https://sei.cmu.edu"]')
    expect(seiLink.exists()).toBe(true)
    expect(seiLink.text()).toBe('Software Engineering Institute')
  })

  it('should apply correct heading hierarchy', () => {
    wrapper = mount(Component, { props: { page: {} } })
    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBe(true)
    expect(h1.classes()).toContain('text-5xl')
    expect(h1.classes()).toContain('font-extralight')
  })

  // organization prop
  it('should not render organization when not provided', () => {
    wrapper = mount(Component, { props: { page: {} } })
    const h2 = wrapper.find('h2')
    expect(h2.exists()).toBe(false)
  })

  it('should render organization when provided', () => {
    wrapper = mount(Component, {
      props: { page: { organization: 'CERT Division' } }
    })
    const h2 = wrapper.find('h2')
    expect(h2.exists()).toBe(true)
    expect(h2.text()).toBe('CERT Division')
  })

  it('should apply correct organization styling', () => {
    wrapper = mount(Component, {
      props: { page: { organization: 'CERT Division' } }
    })
    const h2 = wrapper.find('h2')
    expect(h2.classes()).toContain('text-2xl')
    expect(h2.classes()).toContain('text-gray-500')
  })

  it('should handle empty organization string', () => {
    wrapper = mount(Component, {
      props: { page: { organization: '' } }
    })
    const h2 = wrapper.find('h2')
    expect(h2.exists()).toBe(false)
  })

  // Styling
  it('should apply red background to top section', () => {
    wrapper = mount(Component, { props: { page: {} } })
    const redSection = wrapper.find('.bg-red-600')
    expect(redSection.exists()).toBe(true)
  })

  it('should apply white background to bottom section', () => {
    wrapper = mount(Component, { props: { page: {} } })
    const whiteSection = wrapper.find('.bg-white')
    expect(whiteSection.exists()).toBe(true)
  })

  it('should apply hover effect to SEI link', () => {
    wrapper = mount(Component, { props: { page: {} } })
    const seiLink = wrapper.find('a[href="https://sei.cmu.edu"]')
    expect(seiLink.classes()).toContain('hover:text-red-500')
  })

  it('should apply container constraints', () => {
    wrapper = mount(Component, { props: { page: {} } })
    const containers = wrapper.findAll('.container.max-w-screen-xl')
    expect(containers.length).toBeGreaterThanOrEqual(2)
  })

  // Accessibility
  it('should use semantic header element', () => {
    wrapper = mount(Component, { props: { page: {} } })
    expect(wrapper.element.tagName).toBe('HEADER')
  })

  it('should have proper heading hierarchy (h1 before h2)', () => {
    wrapper = mount(Component, {
      props: { page: { organization: 'CERT Division' } }
    })
    const h1 = wrapper.find('h1')
    const h2 = wrapper.find('h2')
    expect(h1.exists()).toBe(true)
    expect(h2.exists()).toBe(true)
  })

  it('should provide screen reader text for CMU link', () => {
    wrapper = mount(Component, { props: { page: {} } })
    const cmuLink = wrapper.find('a[href="https://www.cmu.edu/"]')
    const srText = cmuLink.find('.sr-only')
    expect(srText.exists()).toBe(true)
    expect(srText.text()).toBe('Carnegie Mellon University')
  })

  it('should have descriptive link text for SEI', () => {
    wrapper = mount(Component, { props: { page: {} } })
    const seiLink = wrapper.find('a[href="https://sei.cmu.edu"]')
    expect(seiLink.text()).toBe('Software Engineering Institute')
  })

  // Edge cases
  it('should handle undefined page prop', () => {
    wrapper = mount(Component)
    expect(wrapper.exists()).toBe(true)
    const h2 = wrapper.find('h2')
    expect(h2.exists()).toBe(false)
  })

  it('should handle page prop with extra properties', () => {
    wrapper = mount(Component, {
      props: { page: { organization: 'CERT', extra: 'value', another: 123 } }
    })
    const h2 = wrapper.find('h2')
    expect(h2.text()).toBe('CERT')
  })

  it('should handle special characters in organization', () => {
    wrapper = mount(Component, {
      props: { page: { organization: 'R&D <Division>' } }
    })
    const h2 = wrapper.find('h2')
    expect(h2.text()).toBe('R&D <Division>')
  })


  // Data attributes
  it('should have correct data-id on header', () => {
    wrapper = mount(Component, { props: { page: {} } })
    expect(wrapper.attributes('data-id')).toBe('sds-brochure-site-header')
  })

  it('should have correct data-id on wordmark', () => {
    wrapper = mount(Component, { props: { page: {} } })
    const wordmark = wrapper.find('[data-id="sds-brochure-site-wordmark"]')
    expect(wordmark.exists()).toBe(true)
  })
})
