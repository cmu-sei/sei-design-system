import type { TabItem } from './Tabs.vue'
import { nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Component from './Tabs.vue'

describe('Tabs', () => {
  let wrapper: VueWrapper<InstanceType<typeof Component>>

  const props = {
    size: 'sm',
    type: 'folder',
    variant: 'red',
    modelValue: [
      { key: 'tab-1', title: 'Tab label 1', active: true },
      { key: 'tab-2', title: 'Tab label 2' },
      { key: 'tab-3', title: 'Tab label 3' }
    ] as TabItem[]
  }

  const slots = {
    'panel': `
      <template #panel="{ item }">
        <div class="p-4">
          This is the panel content for {{ item?.title }}.
        </div>
      </template>
    `,
  }

  afterEach(() => {
    wrapper.unmount()
  })

  beforeEach(() => {
    wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el: HTMLDivElement) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props,
      slots
    })
  })

  it('should match its default snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `size` prop: "lg"', async () => {
    await wrapper.setProps({ size: 'lg' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `variant` prop: "blue"', async () => {
    await wrapper.setProps({ variant: 'blue' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `variant` prop: "gray"', async () => {
    await wrapper.setProps({ variant: 'gray' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `type` prop: "underline"', async () => {
    await wrapper.setProps({ type: 'underline' })
    expect(wrapper.element).toMatchSnapshot()

    await wrapper.setProps({ type: 'underline', variant: 'blue' })
    expect(wrapper.element).toMatchSnapshot()

    await wrapper.setProps({ type: 'underline', variant: 'gray' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `type` prop: "block"', async () => {
    await wrapper.setProps({ type: 'block' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot when property `tag` in tab item(s) is set to "a"', async () => {
    const props = {
      type: 'folder',
      modelValue: [
        { key: 'tab-1', title: 'Tab label 1', tag: 'a', href: 'https://seinet.sei.cmu.edu/' },
        { key: 'tab-2', title: 'Tab label 2', tag: 'a', href: 'https://designsystem.sei.cmu.edu/' },
        { key: 'tab-3', title: 'Tab label 3', tag: 'a', href: 'https://www.google.com/', external: true }
      ] as TabItem[]
    }
    await wrapper.setProps({ ...props })
    await wrapper
      .findAll('a[role="tab"]')[2]
      .trigger('click')
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with property `count` in tab item(s) is set to a numerical value', async () => {
    const props = {
      size: 'sm',
      type: 'folder',
      variant: 'red',
      modelValue: [
        { key: 'tab-1', title: 'Tab label 1', count: 3, active: true },
        { key: 'tab-2', title: 'Tab label 2', count: 5 },
        { key: 'tab-3', title: 'Tab label 3', count: 1 }
      ] as TabItem[]
    }
    await wrapper.setProps({ ...props })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot when property `disabled` in tab item(s) is set to "true"', async () => {
    const props = {
      type: 'folder',
      modelValue: [
        { key: 'tab-1', title: 'Tab label 1', tag: 'button', disabled: true },
        { key: 'tab-2', title: 'Tab label 2', tag: 'button', active: true },
        { key: 'tab-3', title: 'Tab label 3', tag: 'button' }
      ] as TabItem[]
    }
    await wrapper.setProps({ ...props })
    expect(wrapper.findAll('button[role="tab"]')[0].attributes('disabled')).not.toBeUndefined()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot when changing tabs', async () => {
    const slots = {
      'panel(tab-2)': `
        <template #panel(tab-2)>
          <div class="p-4">
            This is the content for tab 2.
          </div>
        </template>
      `,
    }
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el: HTMLDivElement) {
            el.setAttribute('id', 'unique-id')
          }
        }
      },
      props,
      slots
    })
    await wrapper
      .findAll('button[role="tab"]')[1]
      .trigger('click')
    expect(props.modelValue[1].active).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should fire as expected with assigned `willChangeTab` prop/function', async () => {
    const willChangeTab = vi.fn()
    await wrapper.setProps({ ...props, willChangeTab })
    await wrapper
      .findAll('button[role="tab"]')[1]
      .trigger('click')
    expect(willChangeTab).toHaveBeenCalled()
    expect(props.modelValue[1].active).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should activate next tab on "ArrowRight" key', async () => {
    await wrapper.findAll('button[role="tab"]')[0].trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    expect(props.modelValue[1].active).toBeTruthy()
  })

  it('should activate previous tab on "ArrowLeft" key', async () => {
    // Activate second tab first
    await wrapper.findAll('button[role="tab"]')[1].trigger('click')
    await nextTick()
    // Now test ArrowLeft
    await wrapper.findAll('button[role="tab"]')[1].trigger('keydown', { key: 'ArrowLeft' })
    await nextTick()
    expect(props.modelValue[0].active).toBeTruthy()
  })

  it('should activate first tab on "Home" key', async () => {
    await wrapper.findAll('button[role="tab"]')[2].trigger('keydown', { key: 'Home' })
    await nextTick()
    expect(props.modelValue[0].active).toBeTruthy()
  })

  it('should activate last tab on "End" key', async () => {
    await wrapper.findAll('button[role="tab"]')[0].trigger('keydown', { key: 'End' })
    await nextTick()
    expect(props.modelValue[2].active).toBeTruthy()
  })

  it('should skip disabled tabs during navigation', async () => {
    await wrapper.setProps({
      modelValue: [
        { key: 'tab-1', title: 'Tab label 1', disabled: true },
        { key: 'tab-2', title: 'Tab label 2', active: true },
        { key: 'tab-3', title: 'Tab label 3' }
      ]
    })
    await wrapper.findAll('button[role="tab"]')[1].trigger('keydown', { key: 'ArrowLeft' })
    await nextTick()
    // Should wrap to tab-3, not tab-1 (which is disabled)
    expect(props.modelValue[2].active).toBeTruthy()
  })
})
