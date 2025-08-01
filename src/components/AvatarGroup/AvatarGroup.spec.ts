import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Directive } from 'vue'
import Component from './AvatarGroup.vue'
import SdsAvatar from '../Avatar/Avatar.vue'
import SdsAvatarGroup from './AvatarGroup.vue'
import SdsTooltip from '../Tooltip/Tooltip.vue'
import SdsDropdown from '../Dropdown/Dropdown.vue'
import SdsDropdownItem from '../DropdownItem/DropdownItem.vue'


const makeAvatars = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    name: `User ${i + 1}`,
    src: null,
    variant: 'gray',
  }))

describe('AvatarGroup', () => {
  const srcset = [
    {
      name: 'Avatar Name1',
      src: 'https://picsum.photos/seed/1/200/200',
      variant: 'purple',
      href: 'https://designsystem.sei.cmu.edu',
      target: '_blank'
    },
    {
      name: 'Avatar Name2',
      src: 'https://picsum.photos/seed/2/200/200',
      variant: 'green',
      href: 'https://designsystem.sei.cmu.edu',
      target: '_blank'
    },
    {
      name: 'Avatar Name3',
      src: 'https://picsum.photos/seed/3/200/200',
      variant: 'green',
      href: 'https://designsystem.sei.cmu.edu',
      target: '_blank'
    },
    {
      name: 'Avatar Name4',
      src: 'https://picsum.photos/seed/4/200/200',
      variant: 'green',
      href: 'https://designsystem.sei.cmu.edu',
      target: '_blank'
    },
    {
      name: 'Avatar Name5',
      src: 'https://picsum.photos/seed/5/200/200',
      variant: 'green',
      href: 'https://designsystem.sei.cmu.edu',
      target: '_blank'
    },
    {
      name: 'Avatar Name6',
      src: 'https://picsum.photos/seed/6/200/200',
      variant: 'green',
      href: 'https://designsystem.sei.cmu.edu',
      target: '_blank'
    },
    {
      name: 'Avatar Name7',
      src: 'https://picsum.photos/seed/7/200/200',
      variant: 'green',
      href: 'https://designsystem.sei.cmu.edu',
      target: '_blank'
    }
  ]

  it('applies mask-none and max-w-fit classes to the last avatar', () => {
    const wrapper = mount(Component, { props: { srcset: srcset.slice(0, 4) } })
    // The last avatar is index 3, length-1 = 3
    const tooltips = wrapper.findAllComponents(SdsTooltip)
    // Find the last tooltip
    const lastTooltip = tooltips[tooltips.length - 1]
    expect(lastTooltip.classes()).toContain('max-w-fit')
    // Find the last avatar inside the last tooltip
    const lastAvatar = lastTooltip.findComponent(SdsAvatar)
    expect(lastAvatar.classes()).toContain('mask-none')
  })

  it('applies correct classes to dropdown trigger button for all size/shape combos', async () => {
    const combos = [
      { size: 'md', shape: 'circle', expected: ['rounded-full', 'text-md', 'size-12'] },
      { size: 'md', shape: 'square', expected: ['sds-theme-plaid:rounded-none', 'rounded-md', 'text-md', 'size-12'] },
      { size: 'sm', shape: 'square', expected: ['sds-theme-plaid:rounded-none', 'rounded', 'text-sm', 'size-8'] },
      { size: 'xs', shape: 'square', expected: ['sds-theme-plaid:rounded-none', 'rounded-sm', 'text-xs', 'size-6'] },
    ]
    for (const { size, shape, expected } of combos) {
      const wrapper = mount(Component, { props: { srcset: srcset.slice(0, 5), size, shape } })
      const button = wrapper.find('button')
      for (const cls of expected) {
        expect(button.classes()).toContain(cls)
      }
    }
  })

  it('renders avatar and name in each SdsDropdownItem', async () => {
    const srcset = makeAvatars(6)
    const wrapper = mount(Component, { props: { srcset } })
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 10))
    const items = wrapper.findAllComponents(SdsDropdownItem)
    items.forEach((item, idx) => {
      const avatar = item.findComponent(SdsAvatar)
      expect(avatar.exists()).toBe(true)
      expect(item.text()).toContain(`User ${idx + 5}`)
    })
  })

  it('does not set target or rel if not provided', () => {
    const srcset = [{ name: 'No Target', href: 'https://a.com' }]
    const wrapper = mount(Component, { props: { srcset } })
    const link = wrapper.find('a')
    expect(link.attributes('target')).toBeUndefined()
    expect(link.attributes('rel')).toBeUndefined()
  })

  it('defaults variant to gray if not provided', () => {
    const srcset = [{ name: 'No Variant' }]
    const wrapper = mount(Component, { props: { srcset } })
    const avatar = wrapper.findComponent(SdsAvatar)
    expect(avatar.props('variant')).toBe('gray')
  })

  it('defaults src to empty string if not provided', () => {
    const srcset = [{ name: 'No Src' }]
    const wrapper = mount(Component, { props: { srcset } })
    const avatar = wrapper.findComponent(SdsAvatar)
    expect(avatar.props('src')).toBe('')
  })

  it('SdsAvatar in dropdown is always size xs', async () => {
    const srcset = makeAvatars(6)
    const wrapper = mount(Component, { props: { srcset } })
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 10))
    const avatars = wrapper.findAllComponents(SdsDropdownItem).map(item => item.findComponent(SdsAvatar))
    avatars.forEach(avatar => {
      expect(avatar.props('size')).toBe('xs')
    })
  })

  it('SdsAvatar in dropdown uses correct props', async () => {
    const wrapper = mount(Component, { props: { srcset } })
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 10))
    const avatar = wrapper.findComponent(SdsDropdownItem).findComponent(SdsAvatar)
    expect(avatar.props('variant')).toBe(srcset[4].variant)
    expect(avatar.props('src')).toBe(srcset[4].src)
    expect(avatar.props('name')).toBe(srcset[4].name)
  })

  it('root div has correct classes for each size', () => {
    const sizes = ['md', 'sm', 'xs']
    const expected = {
      md: '[&_[data-id="sds-dropdown"]]:size-12 h-12',
      sm: '[&_[data-id="sds-dropdown"]]:size-8 h-8',
      xs: '[&_[data-id="sds-dropdown"]]:size-6 h-6'
    }
    for (const size of sizes) {
      const wrapper = mount(Component, { props: { srcset, size } })
      expect(wrapper.find('[data-id="sds-avatargroup"]').classes().join(' ')).toContain(expected[size])
    }
  })

  it('root div always has data-id="sds-avatargroup"', () => {
    const wrapper = mount(Component, { props: { srcset } })
    expect(wrapper.find('[data-id="sds-avatargroup"]').exists()).toBe(true)
  })

  it('handles null/undefined optional fields gracefully', () => {
    const srcset = [
      {
        name: 'Null Fields',
        src: null,
        variant: null,
        href: null,
        target: null
      }
    ]
    const wrapper = mount(Component, { props: { srcset } })
    const avatar = wrapper.findComponent(SdsAvatar)
    expect(avatar.props('src')).toBe('')
    expect(avatar.props('variant')).toBe('gray')
  })

  it('handles empty srcset gracefully', () => {
    const wrapper = mount(Component, { props: { srcset: [] } })
    expect(wrapper.findComponent(SdsAvatar).exists()).toBe(false)
  })

  it('renders avatar without <a> when href is not provided', () => {
    const srcset = [{ name: 'No Link', src: 'img.png' }]
    const wrapper = mount(Component, { props: { srcset } })
    expect(wrapper.find('a').exists()).toBe(false)
    expect(wrapper.findComponent(SdsAvatar).exists()).toBe(true)
  })

  it('sets rel="noopener noreferrer" only when target is _blank', () => {
    const srcset = [
      { name: 'Blank', href: 'https://a.com', target: '_blank' },
      { name: 'Self', href: 'https://b.com', target: '_self' },
      { name: 'No Target', href: 'https://c.com' }
    ]
    const wrapper = mount(Component, { props: { srcset } })
    const links = wrapper.findAll('a')
    expect(links[0].attributes('rel')).toBe('noopener noreferrer')
    expect(links[1].attributes('rel')).toBeUndefined()
    expect(links[2].attributes('rel')).toBeUndefined()
  })

  it('renders avatar with initials when src is not provided', () => {
    const srcset = [{ name: 'Jane Doe' }]
    const wrapper = mount(Component, { props: { srcset } })
    const avatar = wrapper.findComponent(SdsAvatar)
    expect(avatar.props('name')).toBe('Jane Doe')
    expect(avatar.element.textContent).toBe('JD')
  })

  it('ignores extra fields in srcset', () => {
    const srcset = [{ name: 'Extra', foo: 'bar', baz: 123 }]
    const wrapper = mount(Component, { props: { srcset } })
    const avatar = wrapper.findComponent(SdsAvatar)
    expect(avatar.props('name')).toBe('Extra')
  })

  it('renders correct number of avatars and dropdown for 4, 5, 6, 7, 8 avatars', () => {
    [4, 5, 6, 7, 8].forEach(count => {
      const srcset = Array.from({ length: count }, (_, i) => ({ name: `Avatar ${i+1}` }))
      const wrapper = mount(Component, { props: { srcset } })
      const avatars = wrapper.findAllComponents(SdsAvatar)
      const dropdown = wrapper.findAllComponents(SdsDropdown)
      if (count <= 4) {
        expect(avatars.length).toBe(count)
        expect(dropdown.length).toBe(0)
      } else {
        expect(avatars.length).toBe(4)
        expect(dropdown.length).toBe(1)
      }
    })
  })

  it('applies correct max-width class for condensed density and xs size', () => {
    const wrapper = mount(Component, { props: { srcset, density: 'condensed', size: 'xs' } })
    const tooltip = wrapper.findComponent(SdsTooltip)
    expect(tooltip.classes()).toContain('max-w-3')
  })

  const wrapper3 = mount(Component, {
    attachTo: document.body,
    directives: {
      focus: {
        mounted(el: HTMLElement) {
          el.focus();
        },
      } as Directive
    },
    props: {
      srcset: srcset.slice(0, 3)
    }
  })

  it('matches snapshot with default props', () => {
    expect(wrapper3.element).toMatchSnapshot()
  })

  it('has size-12 class on default (md) avatar element', () => {
    /* Ensure the Avatar renders with the correct size class */
    const avatar = wrapper3.findComponent(SdsAvatar)
    expect(avatar.classes()).toContain('size-12')
  })

  it('has 3 tooltip elements and no dropdown', () => {
    /* Ensure the AvatarGroup renders with the correct number of avatars */
    const tooltips = wrapper3.findAllComponents(SdsTooltip)
    expect(tooltips.length).toBe(3)
    /* Dropdown should not exist for groups <5 */
    const dropdown = wrapper3.findAllComponents(SdsDropdown)
    expect(dropdown.length).toBe(0)
  })

  const wrapper4 = mount(Component, {
    attachTo: document.body,
    directives: {
      focus: {
        mounted(el: HTMLElement) {
          el.focus();
        },
      } as Directive
    },
    props: {
      shape: 'square',
      size: 'sm',
      density: 'condensed',
      srcset: srcset.slice(0, 4)
    }
  })

  it('matches snapshot with 4 avatars and specific props (shape: square, size: xs, density: condensed)', () => {
    expect(wrapper4.element).toMatchSnapshot()
  })

  it('has rounded-theme-sm class on square shape (sm) avatar element', () => {
    /* Ensure the Avatar renders with the correct size class */
    const avatar = wrapper4.findComponent(SdsAvatar)
    expect(avatar.classes()).toContain('rounded-theme-sm')
  })

  it('has size-8 class on default (sm) avatar element', () => {
    /* Ensure the Avatar renders with the correct size class */
    const avatar = wrapper4.findComponent(SdsAvatar)
    expect(avatar.classes()).toContain('size-8')
  })

  it('has 4 tooltip elements and no dropdown (shape: square, size: xs, density: condensed)', () => {
    /* Ensure the AvatarGroup renders with the correct number of avatars */
    const tooltips = wrapper4.findAllComponents(SdsTooltip)
    expect(tooltips.length).toBe(4)
    /* Dropdown should not exist for groups <5 */
    const dropdown = wrapper4.findAllComponents(SdsDropdown)
    expect(dropdown.length).toBe(0)
  })

  const wrapper7 = mount(Component, {
    attachTo: document.body,
    directives: {
      focus: {
        mounted(el: HTMLElement) {
          el.focus();
        },
      } as Directive
    },
    props: {
      shape: 'circle',
      size: 'xs',
      density: 'condensed',
      srcset: srcset
    }
  })

  it('matches snapshot with 7 avatars and specific props (shape: square, size: xs, density: condensed)', async () => {
    await wrapper7.vm.$nextTick()
    expect(wrapper7.element).toMatchSnapshot()
  })

  it('has rounded-full class on circle shape avatar element', () => {
    /* Ensure the Avatar renders with the correct size class */
    const avatar = wrapper7.findComponent(SdsAvatar)
    expect(avatar.classes()).toContain('rounded-full')
  })

  it('has size-6 class on default (xs) avatar element', () => {
    /* Ensure the Avatar renders with the correct size class */
    const avatar = wrapper7.findComponent(SdsAvatar)
    expect(avatar.classes()).toContain('size-6')
  })

  it('has "+3" in the dropdown trigger text', () => {
    /* Ensure the dropdown trigger text reflects the number of additional avatars */
    const dropdown = wrapper7.findComponent(SdsDropdown)
    expect(dropdown.text()).toContain('+3')
  })

  it('has correct href and target on first avatar', () => {
    /* Ensure the first avatar has the correct href and target attributes */
    const firstAvatar = wrapper7.element.querySelector('a')
    expect(firstAvatar.href).toBe('https://designsystem.sei.cmu.edu/')
    expect(firstAvatar.target).toBe('_blank')
  })

  it('has correct background-image on first avatar', () => {
    /* Ensure the first avatar has the correct background image */
    const firstAvatar = wrapper7.findAllComponents(SdsAvatar)[0].element.querySelector('[title="Avatar Name1"]')
    expect(firstAvatar.style.backgroundImage).toEqual('url("https://picsum.photos/seed/1/200/200")');
  })

  it('has 7 tooltip elements and a dropdown (shape: square, size: xs, density: condensed)', () => {
    /* Ensure the AvatarGroup renders with the correct number of avatars */
    const tooltips = wrapper7.findAllComponents(SdsTooltip)
    expect(tooltips.length).toBe(4)
    /* Dropdown should appear for groups >4 */
    const dropdown = wrapper7.findAllComponents(SdsDropdown)
    expect(dropdown.length).toBe(1)
  })

  it('shows SdsDropdown div after click, contains 3 additional SdsAvatars', async () => {
    wrapper7.find('button').trigger('click')
    await wrapper7.vm.$nextTick()
    // Wait for the floating-ui element to appear
    await new Promise(resolve => setTimeout(resolve, 10))
    expect(wrapper7.findAllComponents(SdsDropdownItem).length).toEqual(3)
    expect(wrapper7.findAllComponents(SdsAvatar).length).toEqual(srcset.length)
  })
})
