import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Component from "./Paginator.vue"

describe("Paginator", () => {
  let wrapper: VueWrapper<InstanceType<typeof Component>>
  
  const props = {
    currentPage: 3,
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

  it('does NOT render paginator when totalPages < 1', () => {
    const props = { currentPage: 1, totalPages: 0 }
    const wrapper = mount(Component, { props })
    expect(wrapper.find('[data-id="sds-paginator"]').exists()).toBeFalsy()
  })

  it('renders paginator when totalPages > 1', () => {
    expect(wrapper.find('[data-id="sds-paginator"]').exists()).toBeTruthy()
  })

  it('disables the previous button on the first page', async () => {
    await wrapper.setProps({ currentPage: 1, totalPages: 10 })
    const prevBtn = wrapper.find('button[aria-label="Previous page"]')
    expect(prevBtn.attributes('disabled')).toBeDefined()
  })

  it('emits the page event when clicking the "Previous page" button', async () => {
    const prevBtn = wrapper.find('button[aria-label="Previous page"]')
    await prevBtn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('disables the next button on the last page', async () => {
    await wrapper.setProps({ currentPage: 10, totalPages: 10 })
    const nextBtn = wrapper.find('button[aria-label="Next page"]')
    expect(nextBtn.attributes('disabled')).toBeDefined()
  })

  it('emits the page event when clicking the "Next page" button', async () => {
    const prevBtn = wrapper.find('button[aria-label="Next page"]')
    await prevBtn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('does NOT render ellipsis when totalPages is <= threshold', async () => {
    await wrapper.setProps({ currentPage: 1, totalPages: 5, threshold: 5 })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits the page event when clicking a page number', async () => {
    const pageBtn = wrapper.find('button[aria-label="Go to page 4"]')
    await pageBtn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
