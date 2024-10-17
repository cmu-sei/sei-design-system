import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Datepicker.vue'

describe('Datepicker', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {})
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should show the arrow for a range selection', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: { start: new Date(2022, 8, 3), end: new Date(2022, 8, 8) },
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should hide arrow for a range selection', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: { start: new Date(2022, 8, 3), end: new Date(2022, 8, 8) },
        hideArrow: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should show the sm size with the dateTime mode', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: { start: new Date(2022, 8, 3, 8, 0, 0), end: new Date(2022, 8, 8, 10, 0, 0) },
        size: 'sm',
        mode: 'dateTime'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should show the sm size with the time mode', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: { start: new Date(2022, 8, 3, 8, 0, 0), end: new Date(2022, 8, 8, 10, 0, 0) },
        size: 'sm',
        mode: 'time'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should show required', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: { start: new Date(2022, 8, 3, 8, 0, 0), end: new Date(2022, 8, 8, 10, 0, 0) },
        required: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should show disabled', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: { start: new Date(2022, 8, 3, 8, 0, 0), end: new Date(2022, 8, 8, 10, 0, 0) },
        disabled: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should show valid', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: { start: new Date(2022, 8, 3, 8, 0, 0), end: new Date(2022, 8, 8, 10, 0, 0) },
        valid: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should show invalid', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: { start: new Date(2022, 8, 3, 8, 0, 0), end: new Date(2022, 8, 8, 10, 0, 0) },
        invalid: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should show readonly', () => {
    const wrapper = mount(Component, {
      props: {
        modelValue: { start: new Date(2022, 8, 3, 8, 0, 0), end: new Date(2022, 8, 8, 10, 0, 0) },
        readonly: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
