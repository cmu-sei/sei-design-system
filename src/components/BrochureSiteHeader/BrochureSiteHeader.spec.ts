import { afterEach, describe, expect, it } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Component from './BrochureSiteHeader.vue'

describe('SdsBrochureSiteHeader', () => {
  let wrapper: VueWrapper<InstanceType<typeof Component>>

  afterEach(() => {
    wrapper?.unmount()
    document.body.innerHTML = ''
  })

  // default rendering
  it('should render header element', () => {
    wrapper = mount(Component)
    const header = wrapper.find('header[data-id="sds-brochure-site-header"]')
    expect(header.exists()).toBe(true)
  })

  it('should render CMU wordmark link', () => {
    wrapper = mount(Component)
    const link = wrapper.find('a[href="https://www.cmu.edu/"]')
    expect(link.exists()).toBe(true)
    expect(link.attributes('target')).toBe('_self')
  })

  it('should render CMU wordmark with screen reader text', () => {
    wrapper = mount(Component)
    const srText = wrapper.find('.sr-only')
    expect(srText.text()).toBe('Carnegie Mellon University')
  })

  it('should render BrochureSiteWordmark component', () => {
    wrapper = mount(Component)
    const wordmark = wrapper.find('[data-id="sds-brochure-site-wordmark"]')
    expect(wordmark.exists()).toBe(true)
  })

  it('should render SEI title link', () => {
    wrapper = mount(Component)
    const seiLink = wrapper.find('a[href="https://sei.cmu.edu"]')
    expect(seiLink.exists()).toBe(true)
    expect(seiLink.text()).toBe('Software Engineering Institute')
  })

  it('should apply correct SEI link styling', () => {
    wrapper = mount(Component)
    const seiLink = wrapper.find('a[href="https://sei.cmu.edu"]')
    expect(seiLink.classes()).toContain('text-nowrap')
    expect(seiLink.classes()).toContain('font-extralight')
  })

  // organization prop
  it('should not render organization when not provided', () => {
    wrapper = mount(Component)
    const org = wrapper.find('.text-gray-500')
    expect(org.exists()).toBe(false)
  })

  it('should render organization when provided', () => {
    wrapper = mount(Component, {
      props: { organization: 'CERT Division' }
    })
    const org = wrapper.find('.text-gray-500')
    expect(org.exists()).toBe(true)
    expect(org.text()).toBe('CERT Division')
  })

  it('should apply correct organization styling', () => {
    wrapper = mount(Component, {
      props: { organization: 'CERT Division' }
    })
    const org = wrapper.find('.text-gray-500')
    expect(org.classes()).toContain('text-sm')
    expect(org.classes()).toContain('font-semibold')
  })

  it('should handle empty organization string', () => {
    wrapper = mount(Component, {
      props: { organization: '' }
    })
    const org = wrapper.find('.text-gray-500')
    expect(org.exists()).toBe(false)
  })

  // Styling
  it('should apply red background to top section', () => {
    wrapper = mount(Component)
    const redSection = wrapper.find('.bg-red-600')
    expect(redSection.exists()).toBe(true)
  })

  it('should apply white background to bottom section', () => {
    wrapper = mount(Component)
    const whiteSection = wrapper.find('.bg-white')
    expect(whiteSection.exists()).toBe(true)
  })

  it('should apply hover effect to SEI link', () => {
    wrapper = mount(Component)
    const seiLink = wrapper.find('a[href="https://sei.cmu.edu"]')
    expect(seiLink.classes()).toContain('hover:[&_span]:text-red-500')
  })

  it('should apply container constraints', () => {
    wrapper = mount(Component)
    const containers = wrapper.findAll('.container')
    expect(containers.length).toBeGreaterThanOrEqual(1)
  })

  // Accessibility
  it('should use semantic header element', () => {
    wrapper = mount(Component)
    expect(wrapper.element.tagName).toBe('HEADER')
  })

  it('should have descriptive link text for SEI', () => {
    wrapper = mount(Component)
    const seiLink = wrapper.find('a[href="https://sei.cmu.edu"]')
    expect(seiLink.text()).toBe('Software Engineering Institute')
  })

  it('should provide screen reader text for CMU link', () => {
    wrapper = mount(Component)
    const cmuLink = wrapper.find('a[href="https://www.cmu.edu/"]')
    const srText = cmuLink.find('.sr-only')
    expect(srText.exists()).toBe(true)
    expect(srText.text()).toBe('Carnegie Mellon University')
  })

  // Edge cases
  it('should handle undefined organization prop', () => {
    wrapper = mount(Component)
    expect(wrapper.exists()).toBe(true)
    const org = wrapper.find('.text-gray-500')
    expect(org.exists()).toBe(false)
  })

  it('should handle organization prop with extra properties', () => {
    wrapper = mount(Component, {
      props: { organization: 'CERT' }
    })
    const org = wrapper.find('.text-gray-500')
    expect(org.text()).toBe('CERT')
  })

  it('should handle special characters in organization', () => {
    wrapper = mount(Component, {
      props: { organization: 'R&D <Division>' }
    })
    const org = wrapper.find('.text-gray-500')
    expect(org.text()).toBe('R&D <Division>')
  })


  // Data attributes
  it('should have correct data-id on header', () => {
    wrapper = mount(Component)
    expect(wrapper.attributes('data-id')).toBe('sds-brochure-site-header')
  })

  it('should have correct data-id on wordmark', () => {
    wrapper = mount(Component)
    const wordmark = wrapper.find('[data-id="sds-brochure-site-wordmark"]')
    expect(wordmark.exists()).toBe(true)
  })

  // Hamburger menu
  it('should render hamburger button', () => {
    wrapper = mount(Component)
    const hamburger = wrapper.find('button[aria-label="Open mobile menu"]')
    expect(hamburger.exists()).toBe(true)
  })

  it('should apply default mobileBreakpoint classes', () => {
    wrapper = mount(Component, {
      props: {
        nav: [{ key: 'test', title: 'Test', tag: 'a', href: '/' }]
      }
    })
    const hamburger = wrapper.find('button[aria-label="Open mobile menu"]')
    expect(hamburger.classes()).toContain('flex')
    expect(hamburger.classes()).toContain('xl:hidden')
  })

  it('should respect custom mobileBreakpoint prop', () => {
    wrapper = mount(Component, {
      props: {
        nav: [{ key: 'test', title: 'Test', tag: 'a', href: '/' }],
        mobileBreakpoint: 'lg'
      }
    })
    const hamburger = wrapper.find('button[aria-label="Open mobile menu"]')
    expect(hamburger.classes()).toContain('lg:hidden')
  })

  it('should apply mobileBreakpoint classes to MegaMenu', () => {
    wrapper = mount(Component, {
      props: {
        nav: [{ key: 'test', title: 'Test', tag: 'a', href: '/' }],
        mobileBreakpoint: 'lg'
      }
    })
    const megamenu = wrapper.find('[data-id="sds-megamenu"]')
    expect(megamenu.exists()).toBe(true)
    expect(megamenu.classes()).toContain('hidden')
    expect(megamenu.classes()).toContain('lg:flex')
  })

  it('should render mobile menu with nav items', async () => {
    wrapper = mount(Component, {
      props: {
        nav: [
          { key: 'home', title: 'Home', tag: 'a', href: '/' },
          { key: 'about', title: 'About', href: '/about' }
        ]
      }
    })
    const hamburger = wrapper.find('button[aria-label="Open mobile menu"]')
    await hamburger.trigger('click')
    const panel = document.querySelector('[data-id="sds-panel"]')
    expect(panel).not.toBeNull()
    const navItems = panel!.querySelectorAll('[data-id="sds-navigationitem"]')
    expect(navItems.length).toBe(2)
  })

  it('should render mobile menu title with SEI branding', async () => {
    wrapper = mount(Component, {
      props: { organization: 'CERT Division' }
    })
    const hamburger = wrapper.find('button[aria-label="Open mobile menu"]')
    await hamburger.trigger('click')
    const panel = document.querySelector('[data-id="sds-panel"]')
    expect(panel).not.toBeNull()
    const seiLink = panel!.querySelector('a[href="https://sei.cmu.edu"]')
    expect(seiLink).not.toBeNull()
    expect(seiLink!.textContent).toContain('Software Engineering Institute')
    const org = panel!.querySelector('.font-semibold.text-gray-500')
    expect(org!.textContent).toBe('CERT Division')
  })
})
