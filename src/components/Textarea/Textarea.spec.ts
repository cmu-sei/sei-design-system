import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import axe from 'axe-core'
import Component from './Textarea.vue'

describe('Textarea', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Component)
    expect(wrapper.vm).toBeTruthy()
  })

  it('matches snapshot with no props assigned', () => {
    const wrapper = mount(Component, { props: {} })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with maxlength and count-characters prop assigned', () => {
    const wrapper = mount(Component, {
      props: {
        maxlength: 50,
        countCharacters: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with rows prop assigned', () => {
    const wrapper = mount(Component, {
      props: {
        rows: 2
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with disabled prop assigned', () => {
    const wrapper = mount(Component, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with readonly prop assigned', () => {
    const wrapper = mount(Component, {
      props: {
        readonly: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with placeholder prop assigned', () => {
    const wrapper = mount(Component, {
      props: {
        placeholder: 'This is a placeholder'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with value prop assigned', () => {
    const wrapper = mount(Component, {
      props: {
        value: 'This is the text content'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with resize prop assigned', () => {
    const wrapper = mount(Component, {
      props: {
        resize: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits when `modelValue` changes', async () => {
    const wrapper = mount(Component)
    const textarea = wrapper.find('textarea')
    await textarea.setValue('New content')
    expect(wrapper.emitted()).toHaveProperty('change')
  })

  it('has no accessibility violations', async () => {
    const container = document.createElement('div')
    const label = document.createElement('label')
    label.setAttribute('for', 'a11y-textarea')
    label.textContent = 'Description'
    container.appendChild(label)
    document.body.appendChild(container)
    const wrapper = mount(Component, {
      attachTo: container,
      props: { id: 'a11y-textarea' }
    })
    const results = await axe.run(container)
    expect(results.violations).toHaveLength(0)
    wrapper.unmount()
    document.body.removeChild(container)
  })
})
