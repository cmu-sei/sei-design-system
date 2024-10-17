import type { CheckboxGroupOption, CheckboxGroupOptionValue } from './CheckboxGroup.vue'
import { vi, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Component from './CheckboxGroup.vue'

describe('CheckboxGroup', () => {
  let wrapper: VueWrapper<InstanceType<typeof Component>>

  const props: { 
    modelValue: CheckboxGroupOptionValue[];
    name?: string;
    options: CheckboxGroupOption<CheckboxGroupOptionValue>[]
  } = {
    modelValue: [],
    options: [
      { id: 1, text: 'Option 1', value: 'Option 1' },
      { id: 2, text: 'Option 2', value: 'Option 2' },
      { id: 3, text: 'Option 3', value: 'Option 3' }
    ]
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  beforeEach(() => {
    wrapper = mount(Component, {
      attachTo: document.body,
      props,
      directives: {
        'uid': {
          created(el: HTMLDivElement) {
            el.setAttribute('id', 'unique-id')
          }
        }
      }
    })
  })

  it('should match its default snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('emits when `modelValue` changes', async () => {
    const checkbox = wrapper.find('[id="unique-id__option_0"]')
    await checkbox.setValue(true)
    expect(wrapper.emitted()).toHaveProperty('input')
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
})
