import { describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Component from './Calendar.vue'

describe('Calendar', () => {
  it('should match its default snapshot', () => {
    const date = new Date(2021, 11, 19)
    vi.useFakeTimers()
    vi.setSystemTime(date)
    const wrapper = shallowMount(Component, {
      props: {
        modelValue: null
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('start and end date should be correct', () => {
    const systemDate = new Date(2021, 11, 15)
    const start = new Date(2021, 11, 19)
    const end = new Date(2021, 11, 25)

    vi.useFakeTimers()
    vi.setSystemTime(systemDate)

    const wrapper = shallowMount(Component, {
      props: {
        modelValue: { start: start, end: end},
        mode: 'date'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('calendar mode should be dateTime', () => {
    const systemDate = new Date(2021, 11, 15)
    const start = new Date(2021, 11, 19)
    const end = new Date(2021, 11, 25)

    vi.useFakeTimers()
    vi.setSystemTime(systemDate)

    const wrapper = shallowMount(Component, {
      props: {
        modelValue: { start: start, end: end},
        mode: 'dateTime'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('calendar mode should be time', () => {
    const systemDate = new Date(2021, 11, 15)
    const start = new Date(2021, 11, 19)
    const end = new Date(2021, 11, 25)

    vi.useFakeTimers()
    vi.setSystemTime(systemDate)

    const wrapper = shallowMount(Component, {
      props: {
        modelValue: { start: start, end: end},
        mode: 'time'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('calendar mode min and max is correct', () => {
    const systemDate = new Date(2021, 11, 15)
    const start = new Date(2021, 11, 19)
    const end = new Date(2021, 11, 25)

    vi.useFakeTimers()
    vi.setSystemTime(systemDate)

    const wrapper = shallowMount(Component, {
      props: {
        modelValue: { start: start, end: end},
        min: new Date(2021, 11, 15),
        max: new Date(2021, 11, 29)
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
