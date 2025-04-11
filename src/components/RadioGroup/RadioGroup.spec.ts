import type { RadioGroupOptionValue, RadioGroupOption } from './RadioGroup.vue'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Component from './RadioGroup.vue'

describe('RadioGroup', () => {
  let wrapper: VueWrapper<InstanceType<typeof Component>>

  const props: {
    modelValue: RadioGroupOptionValue,
    options: RadioGroupOption<RadioGroupOptionValue>[]
  } = {
    modelValue: '',
    options: [
      { id: 1, text: 'Option 1', value: 'Option 1' },
      { id: 2, text: 'Option 2', value: 'Option 2' },
      { id: 3, text: 'Option 3', value: 'Option 3' }
    ]
  }

  afterEach(() => {
    wrapper.unmount()
  })

  beforeEach(() => {
    wrapper = mount(Component, {
      attachTo: document.body,
      props
    })
  })

  it('should match its default snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `name` prop', async () => {
    await wrapper.setProps({ name: 'options-group' })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `disabled` prop', async () => {
    await wrapper.setProps({ disabled: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `required` prop', async () => {
    await wrapper.setProps({ required: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `stacked` prop', async () => {
    await wrapper.setProps({ stacked: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `valid` prop', async () => {
    await wrapper.setProps({ valid: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should match its snapshot with assigned `invalid` prop', async () => {
    await wrapper.setProps({ invalid: true })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('emits on click event', async () => {
    const radio = wrapper.findAll('input[type="radio"]')[0]
    await radio.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})