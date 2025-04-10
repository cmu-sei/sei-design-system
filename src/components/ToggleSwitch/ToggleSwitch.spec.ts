import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import Component from './ToggleSwitch.vue'

describe('ToggleSwitch.vue', () => {
  let wrapper: VueWrapper<InstanceType<typeof Component>>

  afterAll(() => {
    wrapper.unmount()
  })

  beforeEach(() => {
    wrapper = mount(Component)
  })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('matches default snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('matches snapshot with no assigned props', async () => {
    await wrapper.setProps({})
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with assigned props', async () => {
    const props = {
      disabled: false,
      variant: 'primary',
      value: false
    }

    await wrapper.setProps({ ...props })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with assigned `modelValue` prop', async () => {
    await wrapper.setProps({ modelValue: true })
    await nextTick()

    const button = wrapper.find('button[role="switch"]')
    await button.trigger('click')
    await nextTick()

    expect(button.attributes('aria-checked')).toBe('true')
    expect(wrapper.html()).toMatchSnapshot()
  })
});
