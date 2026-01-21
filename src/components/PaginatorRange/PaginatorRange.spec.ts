import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './PaginatorRange.vue'

describe('SdsPaginatorRange', () => {
  it('should render with default props', () => {
    const wrapper = mount(Component)
    expect(wrapper.text()).toContain('Showing 0 of 0')
    expect(wrapper.attributes('data-id')).toBe('sds-paginator-range')
  })

  it('should display correct range for props', () => {
    const wrapper = mount(Component, {
      props: {
        currentPage: 2,
        totalResultsPerPage: 10,
        totalResults: 25,
        totalPages: 3
      }
    })
    expect(wrapper.text()).toContain('Showing 11-20 of 25')
  })

  it('should use slot content if provided', () => {
    const wrapper = mount(Component, {
      props: {
        currentPage: 1,
        totalResultsPerPage: 10,
        totalResults: 10,
        totalPages: 1
      },
      slots: {
        default: ({ start, end, total }) => `Custom: ${start}-${end} of ${total}`
      }
    })
    expect(wrapper.text()).toContain('Custom: 1-10 of 10')
  })

  it('should set aria-live and aria-atomic for accessibility', () => {
    const wrapper = mount(Component)
    expect(wrapper.attributes('aria-live')).toBe('polite')
    expect(wrapper.attributes('aria-atomic')).toBe('true')
  })
})