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

  it('should render with data-id attribute', () => {
    const wrapper = mount(Component)
    expect(wrapper.find('[data-id="sds-simple-application"]').exists()).toBe(true)
  })

  it('should display default appSuitePrefix', () => {
    const wrapper = mount(Component, {
      props: {
        appSuite: 'Test Suite'
      }
    })
    const prefix = wrapper.find('.text-red-600')
    expect(prefix.text()).toBe('SEI')
  })

  it('should display custom appSuitePrefix', () => {
    const wrapper = mount(Component, {
      props: {
        appSuite: 'Test Suite',
        appSuitePrefix: 'TEST'
      }
    })
    const prefix = wrapper.find('.text-red-600')
    expect(prefix.text()).toBe('TEST')
  })

  it('should display appSuite name', () => {
    const wrapper = mount(Component, {
      props: {
        appSuite: 'My Application'
      }
    })
    expect(wrapper.html()).toContain('My Application')
  })

  it('should render app suite as link when appSuiteUrl is provided', () => {
    const wrapper = mount(Component, {
      props: {
        appSuite: 'Test Suite',
        appSuiteUrl: 'https://example.com'
      }
    })
    const link = wrapper.find('a[href="https://example.com"]')
    expect(link.exists()).toBe(true)
    expect(link.text()).toContain('Test Suite')
  })

  it('should render app suite as paragraph when appSuiteUrl is not provided', () => {
    const wrapper = mount(Component, {
      props: {
        appSuite: 'Test Suite'
      }
    })
    const appSuiteLink = wrapper.find('header h1 a')
    const paragraph = wrapper.find('header h1 p')
    expect(appSuiteLink.exists()).toBe(false)
    expect(paragraph.exists()).toBe(true)
    expect(paragraph.text()).toContain('Test Suite')
  })

  it('should display pageTitle when provided', () => {
    const wrapper = mount(Component, {
      props: {
        pageTitle: 'Dashboard'
      }
    })
    expect(wrapper.html()).toContain('Dashboard')
  })

  it('should hide page header when hidePageHeader is true', () => {
    const wrapper = mount(Component, {
      props: {
        pageTitle: 'Dashboard',
        hidePageHeader: true
      }
    })
    const pageHeader = wrapper.find('.sticky.top-0')
    expect(pageHeader.exists()).toBe(false)
  })

  it('should show page header when hidePageHeader is false', () => {
    const wrapper = mount(Component, {
      props: {
        pageTitle: 'Dashboard',
        hidePageHeader: false
      }
    })
    const pageHeader = wrapper.find('.sticky.top-0')
    expect(pageHeader.exists()).toBe(true)
  })

  it('should render user-section slot content', () => {
    const wrapper = mount(Component, {
      slots: {
        'user-section': '<div class="test-user">User Menu</div>'
      }
    })
    expect(wrapper.find('.test-user').exists()).toBe(true)
    expect(wrapper.html()).toContain('User Menu')
  })

  it('should render page-title slot content', () => {
    const wrapper = mount(Component, {
      slots: {
        'page-title': '<h2>Custom Title</h2>'
      }
    })
    expect(wrapper.html()).toContain('Custom Title')
  })

  it('should render page-header slot content', () => {
    const wrapper = mount(Component, {
      slots: {
        'page-header': '<button>Action</button>'
      }
    })
    expect(wrapper.html()).toContain('<button>Action</button>')
  })

  it('should render default slot content', () => {
    const wrapper = mount(Component, {
      slots: {
        default: '<div class="test-content">Main Content</div>'
      }
    })
    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.html()).toContain('Main Content')
  })

  it('should render footer-top slot content', () => {
    const wrapper = mount(Component, {
      slots: {
        'footer-top': '<div class="test-footer-top">Footer Top</div>'
      }
    })
    expect(wrapper.find('.test-footer-top').exists()).toBe(true)
    expect(wrapper.html()).toContain('Footer Top')
  })

  it('should render footer-middle slot content', () => {
    const wrapper = mount(Component, {
      slots: {
        'footer-middle': '<div class="test-footer-middle">Footer Middle</div>'
      }
    })
    expect(wrapper.find('.test-footer-middle').exists()).toBe(true)
    expect(wrapper.html()).toContain('Footer Middle')
  })

  it('should render footer-right slot with current year', () => {
    const wrapper = mount(Component)
    const currentYear = new Date().getFullYear()
    expect(wrapper.html()).toContain(`© ${currentYear} Carnegie Mellon University`)
  })

  it('should render custom footer-right slot content', () => {
    const wrapper = mount(Component, {
      slots: {
        'footer-right': '<div class="test-footer-right">Custom Footer</div>'
      }
    })
    expect(wrapper.find('.test-footer-right').exists()).toBe(true)
    expect(wrapper.html()).toContain('Custom Footer')
  })

  it('should render action-bar slot when provided and not hidden', () => {
    const wrapper = mount(Component, {
      props: {
        hideActionBar: false
      },
      slots: {
        'action-bar': '<div class="test-action-bar">Action Bar</div>'
      }
    })
    expect(wrapper.find('.test-action-bar').exists()).toBe(true)
    expect(wrapper.html()).toContain('Action Bar')
  })

  it('should hide action-bar when hideActionBar is true', () => {
    const wrapper = mount(Component, {
      props: {
        hideActionBar: true
      },
      slots: {
        'action-bar': '<div class="test-action-bar">Action Bar</div>'
      }
    })
    const actionBar = wrapper.find('.test-action-bar')
    expect(actionBar.exists()).toBe(false)
  })

  it('should render SEI wordmark link', () => {
    const wrapper = mount(Component)
    const seiLink = wrapper.find('a[href="https://sei.cmu.edu"]')
    expect(seiLink.exists()).toBe(true)
  })

  it('should compute current year correctly', () => {
    const wrapper = mount(Component)
    const currentYear = new Date().getFullYear()
    const year = wrapper.html().match(new RegExp(`© (\\d{4}) Carnegie`))
    expect(year).toBeTruthy()
    expect(parseInt(year![1])).toBe(currentYear)
  })
})
