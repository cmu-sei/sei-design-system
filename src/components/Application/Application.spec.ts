import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import Component from './Application.vue'

describe('Application', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      slots: {
        default: 'Button'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('top-aligns app icons with the first line of app names', async () => {
    const wrapper = mount(Component, {
      props: {
        appName: 'An application name that can wrap'
      }
    })

    await wrapper.find('[aria-label="Open mobile menu"]').trigger('click')
    const appIcons = wrapper.findAll('span.flex.items-center.w-4.h-4.shrink-0')

    expect(appIcons).toHaveLength(2)
    appIcons.forEach((appIcon) => {
      expect(appIcon.classes()).toContain('mt-1')
      expect(appIcon.classes()).not.toContain('my-auto')
    })
  })

  it('top-aligns navigation icons with the first line of item labels', async () => {
    const wrapper = mount(Component, {
      props: {
        appName: 'Test application',
        sidebarNavigationItems: [
          {
            id: 'group',
            href: '/group',
            active: false,
            title: 'A navigation group label that can wrap',
            items: []
          },
          {
            id: 'item',
            href: '/item',
            active: false,
            title: 'A navigation item label that can wrap'
          }
        ]
      }
    })

    await wrapper.find('[aria-label="Open mobile menu"]').trigger('click')
    const navigationIcons = wrapper.findAll('nav span.flex.items-center.w-4.h-4.shrink-0')

    expect(navigationIcons).toHaveLength(4)
    navigationIcons.forEach((navigationIcon) => {
      expect(navigationIcon.classes()).toContain('mt-1')
      expect(navigationIcon.classes()).toContain('self-start')
      expect(navigationIcon.classes()).not.toContain('my-auto')
    })
  })

  it('constrains desktop navigation tooltip triggers to the sidebar width', () => {
    const wrapper = mount(Component, {
      props: {
        sidebarNavigationItems: [
          {
            id: 'group',
            href: '/group',
            active: false,
            title: 'A navigation group label that can wrap',
            items: []
          },
          {
            id: 'item',
            href: '/item',
            active: false,
            title: 'A navigation item label that can wrap'
          }
        ]
      }
    })

    const tooltipTriggers = wrapper.findAll('nav[aria-label="Sidebar"] [data-id="sds-tooltip"]')

    expect(tooltipTriggers).toHaveLength(2)
    tooltipTriggers.forEach((tooltipTrigger) => {
      expect(tooltipTrigger.classes()).toContain('w-full')
    })
  })

  it('keeps standalone item badges attached to the final title word', async () => {
    const wrapper = mount(Component, {
      props: {
        appName: 'Test application',
        sidebarNavigationItems: [
          {
            id: 'item',
            href: '/item',
            active: false,
            title: 'A navigation item label that can wrap',
            badgeCount: 2
          }
        ]
      }
    })

    await wrapper.find('[aria-label="Open mobile menu"]').trigger('click')
    const itemLinks = wrapper.findAll('nav a[href="/item"]')

    expect(itemLinks).toHaveLength(2)
    itemLinks.forEach((itemLink) => {
      const title = itemLink.find('[data-id="sds-application-navigation-label"]')
      const badge = title.find('.rounded-full')

      expect(title.classes()).toContain('flex-1')
      expect(title.classes()).toContain('w-0')
      expect(title.classes()).toContain('text-pretty')
      expect(title.find('.whitespace-nowrap').exists()).toBe(false)
      expect(badge.exists()).toBe(true)
      expect(badge.classes()).toContain('inline-flex')
      expect(badge.classes()).toContain('h-5')
      expect(badge.classes()).toContain('min-w-5')
      expect(badge.classes()).toContain('-top-0.5')
      expect(badge.classes()).toContain('relative')
      expect(badge.classes()).not.toContain('py-1')
    })
  })

  it('keeps closed group badges attached to the final title word', async () => {
    const wrapper = mount(Component, {
      props: {
        appName: 'Test application',
        sidebarNavigationItems: [
          {
            id: 'group',
            href: '/group',
            active: false,
            title: 'A navigation group label that can wrap',
            items: [
              {
                id: 'subitem',
                href: '/subitem',
                active: false,
                title: 'Subitem',
                badgeCount: 2
              }
            ]
          }
        ]
      }
    })

    await wrapper.find('[aria-label="Open mobile menu"]').trigger('click')
    const groupButtons = wrapper.findAll('nav button')

    expect(groupButtons).toHaveLength(2)
    groupButtons.forEach((groupButton) => {
      const title = groupButton.find('[data-id="sds-application-navigation-label"]')
      const badge = title.find('.rounded-full')

      expect(title.classes()).toContain('flex-1')
      expect(title.classes()).toContain('w-0')
      expect(title.classes()).toContain('text-pretty')
      expect(title.find('.whitespace-nowrap').exists()).toBe(false)
      expect(badge.exists()).toBe(true)
      expect(badge.classes()).toContain('inline-flex')
      expect(badge.classes()).toContain('h-5')
      expect(badge.classes()).toContain('min-w-5')
      expect(badge.classes()).toContain('-top-0.5')
      expect(badge.classes()).toContain('relative')
      expect(badge.classes()).not.toContain('py-1')
    })
  })

  it('keeps subitem badges attached to the final title word', async () => {
    const wrapper = mount(Component, {
      props: {
        appName: 'Test application',
        sidebarNavigationItems: [
          {
            id: 'group',
            href: '/group',
            active: false,
            title: 'Group',
            items: [
              {
                id: 'subitem',
                href: '/subitem',
                active: false,
                title: 'A navigation subitem label that can wrap',
                badgeCount: 2
              }
            ]
          }
        ]
      }
    })

    await wrapper.find('[aria-label="Open mobile menu"]').trigger('click')
    await wrapper.find('nav button').trigger('click')
    const subitemLinks = wrapper.findAll('nav a[href="/subitem"]')

    expect(subitemLinks).toHaveLength(2)
    subitemLinks.forEach((subitemLink) => {
      const title = subitemLink.find('[data-id="sds-application-navigation-label"]')
      const badge = title.find('.rounded-full')

      expect(title.classes()).toContain('flex-1')
      expect(title.classes()).toContain('w-0')
      expect(title.classes()).toContain('text-pretty')
      expect(title.find('.whitespace-nowrap').exists()).toBe(false)
      expect(badge.exists()).toBe(true)
      expect(badge.classes()).toContain('inline-flex')
      expect(badge.classes()).toContain('h-5')
      expect(badge.classes()).toContain('min-w-5')
      expect(badge.classes()).toContain('-top-0.5')
      expect(badge.classes()).toContain('relative')
      expect(badge.classes()).not.toContain('py-1')
    })
  })

  it('top-aligns keyboard shortcuts without stretching beside wrapped labels', async () => {
    const wrapper = mount(Component, {
      props: {
        appName: 'Test application',
        sidebarNavigationItems: [
          {
            id: 'group',
            href: '/group',
            active: false,
            title: 'A navigation group label that can wrap',
            items: [
              {
                id: 'subitem',
                href: '/subitem',
                active: false,
                title: 'A navigation subitem label that can wrap',
                keyboardShortcut: ['Ctrl', 'K']
              }
            ]
          },
          {
            id: 'item',
            href: '/item',
            active: false,
            title: 'A navigation item label that can wrap',
            keyboardShortcut: ['Ctrl', 'L']
          }
        ]
      }
    })

    await wrapper.find('[aria-label="Open mobile menu"]').trigger('click')
    await wrapper.find('nav button').trigger('click')
    const keyboardShortcuts = wrapper.findAll('nav span.inline-flex.gap-1.ml-auto')

    expect(keyboardShortcuts).toHaveLength(4)
    keyboardShortcuts.forEach((keyboardShortcut) => {
      expect(keyboardShortcut.classes()).toContain('self-start')
      expect(keyboardShortcut.classes()).not.toContain('my-auto')
    })
  })

  it('top-aligns group disclosure icons with the first line of item labels', async () => {
    const wrapper = mount(Component, {
      props: {
        appName: 'Test application',
        sidebarNavigationItems: [
          {
            id: 'group',
            href: '/group',
            active: false,
            title: 'A navigation group label that can wrap',
            items: []
          }
        ]
      }
    })

    await wrapper.find('[aria-label="Open mobile menu"]').trigger('click')
    const collapsedDisclosureIcons = wrapper.findAll('nav .shrink-0.w-4.h-4.ml-auto')

    expect(collapsedDisclosureIcons).toHaveLength(2)
    collapsedDisclosureIcons.forEach((disclosureIcon) => {
      expect(disclosureIcon.classes()).toContain('mt-1')
      expect(disclosureIcon.classes()).toContain('self-start')
      expect(disclosureIcon.classes()).not.toContain('my-auto')
    })

    await wrapper.find('nav button').trigger('click')
    const expandedDisclosureIcons = wrapper.findAll('nav .shrink-0.w-4.h-4.ml-auto')

    expect(expandedDisclosureIcons).toHaveLength(2)
    expandedDisclosureIcons.forEach((disclosureIcon) => {
      expect(disclosureIcon.classes()).toContain('mt-1')
      expect(disclosureIcon.classes()).toContain('self-start')
      expect(disclosureIcon.classes()).not.toContain('my-auto')
    })
  })

  it('provides top-aligned classes to custom icon slots', async () => {
    const renderCustomIcon = ({ classList }: { classList: string }) => h('span', {
      class: ['custom-icon', classList]
    })
    const wrapper = mount(Component, {
      props: {
        appName: 'Test application',
        sidebarNavigationItems: [
          {
            id: 'item',
            href: '/item',
            active: false,
            title: 'A navigation item label that can wrap'
          }
        ]
      },
      slots: {
        'app-icon': renderCustomIcon,
        'mobile-sidebar-navigation-item-icon': renderCustomIcon,
        'sidebar-navigation-item-icon': renderCustomIcon
      }
    })

    await wrapper.find('[aria-label="Open mobile menu"]').trigger('click')
    const customIcons = wrapper.findAll('.custom-icon')

    expect(customIcons).toHaveLength(4)
    customIcons.forEach((customIcon) => {
      expect(customIcon.classes()).toContain('mt-1')
      expect(customIcon.classes()).toContain('self-start')
      expect(customIcon.classes()).not.toContain('my-auto')
    })
  })
})