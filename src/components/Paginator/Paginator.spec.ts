import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Component from "./Paginator.vue"

describe('Paginator', () => {
  let wrapper: VueWrapper<InstanceType<typeof Component>>
  
  const props = {
    currentPage: 1,
    totalPages: 10
  }

  afterAll(() => {
    wrapper.unmount()
  })

  beforeEach(async () => {
    wrapper = mount(Component, {
      attachTo: document.body,
      props
    })
    await wrapper.vm.$nextTick()
  })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('does NOT render paginator when `totalPages` < 1', async () => {
    await wrapper.setProps({ totalPages: 0 })
    expect(wrapper.find('[data-id="sds-paginator"]').exists()).toBeFalsy()
    expect(document.body).toMatchSnapshot()
  })

  it('disables the "Previous page" button when `currentPage` is set to 1', async () => {
    const prevBtn = wrapper.find('button[aria-label="Previous page"]')
    expect(prevBtn.attributes('disabled')).toBeDefined()
    expect(document.body).toMatchSnapshot()
  })

  it('disables the current page', async () => {
    await wrapper.setProps({ currentPage: 5, totalPages: 10 })
    const page = wrapper.find('button[aria-label="Current page, page 5"]')
    expect(page.attributes('disabled')).toBeDefined()
    expect(page.attributes('aria-current')).toBe('page')
    expect(page.attributes('aria-disabled')).toBeTruthy()
    expect(document.body).toMatchSnapshot()
  })

  it('disables the "Next page" button when `currentPage` is set to 10', async () => {
    await wrapper.setProps({ currentPage: 10 })
    const nextBtn = wrapper.find('button[aria-label="Next page"]')
    expect(nextBtn.attributes('disabled')).toBeDefined()
    expect(document.body).toMatchSnapshot()
  })

  it('increments paginator when clicking the "Next page" button', async () => {
    const nextBtn = wrapper.find('button[aria-label="Next page"]')
    await nextBtn.trigger('click')
    expect(document.body).toMatchSnapshot()
  })

  it('decrements paginator when clicking the "Previous page" button', async () => {
    const prevBtn = wrapper.find('button[aria-label="Previous page"]')
    await prevBtn.trigger('click')
    expect(document.body).toMatchSnapshot()
  })

  it('does NOT render an ellipsis when `totalPages` is <= threshold', async () => {
    await wrapper.setProps({ currentPage: 1, totalPages: 5, threshold: 5 })
    expect(document.body).toMatchSnapshot()
  })

  it('emits the page event when clicking a page number', async () => {
    const pageBtn = wrapper.find('button[aria-label="Go to page 2"]')
    await pageBtn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(document.body).toMatchSnapshot()
  })

  it('emits the page event when the selected value changes', async () => {
    const select = wrapper.find('select')
    await select.setValue('2')
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(document.body).toMatchSnapshot()
  })
})