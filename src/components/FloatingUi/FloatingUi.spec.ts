import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import Component from "./FloatingUi.vue"

describe("FloatingUi.vue", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("is a Vue instance", () => {
    const wrapper = mount(Component, { attachTo: document.body })
    expect(wrapper.vm).toBeTruthy()
  })

  it("matches snapshot with no props assigned", async () => {
    const props = {}
    const wrapper = mount(Component, { props, attachTo: document.body })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("opens and teleports content after setTimeout delay", async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      slots: {
        default: '<div id="teleported">Teleported Content</div>',
        trigger: `<template #trigger="{ open }"><button @click="open">Open</button></template>`
      }
    })
    await wrapper.find('button').trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(document.body.innerHTML).toContain('Teleported Content')
  })

  it.skip("closes when onClose is called after open", async () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      slots: {
        default: '<div id="teleported">Teleported Content</div>',
        trigger: `<template #trigger="{ open, close }"><button @click="open">Open</button><button @click="close">Close</button></template>`
      }
    })
    await wrapper.findAll('button')[0].trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(document.body.innerHTML).toContain('Teleported Content')
    await wrapper.findAll('button')[1].trigger('click')
    vi.runAllTimers()
    await flushPromises()
    expect(document.body.innerHTML).not.toContain('Teleported Content')
  })

  it("toggles open/close state with onToggle", async () => {
    const wrapper = mount(Component, {
      slots: {
        trigger: `<template #trigger="{ toggle }"><button @click="toggle">Toggle</button></template>`
      },
      attachTo: document.body
    })
  await wrapper.find('button').trigger('click')
  vi.runAllTimers()
  await flushPromises()
    expect(wrapper.html()).toContain('popperRef')
  await wrapper.find('button').trigger('click')
  vi.runAllTimers()
  await flushPromises()
    expect(wrapper.html()).not.toContain('popperRef')
  })

  it("does not open if disabled prop is true", async () => {
        const wrapper = mount(Component, {
          props: { disabled: true },
          slots: {
            trigger: `<template #trigger="{ open }"><button @click="open">Open</button></template>`
          },
          attachTo: document.body
        })
  await wrapper.find('button').trigger('click')
  vi.runAllTimers()
  await flushPromises()
      expect(wrapper.html()).not.toContain('popperRef')
  })

  it("renders arrow by default and hides when hideArrow is true", async () => {
        const wrapper = mount(Component, {
          slots: {
            trigger: `<template #trigger="{ open }"><button @click="open">Open</button></template>`
          },
          attachTo: document.body
        })
  await wrapper.find('button').trigger('click')
  vi.runAllTimers()
  await flushPromises()
      expect(wrapper.find('[ref="arrowRef"]').exists()).toBe(true)
      const wrapperNoArrow = mount(Component, {
        props: { hideArrow: true },
        slots: {
          trigger: `<template #trigger="{ open }"><button @click="open">Open</button></template>`
        },
        attachTo: document.body
      })
  await wrapperNoArrow.find('button').trigger('click')
  vi.runAllTimers()
  await flushPromises()
      expect(wrapperNoArrow.find('[ref="arrowRef"]').exists()).toBe(false)
  })

  it("passes slot props correctly to trigger slot", () => {
      const wrapper = mount(Component, {
        slots: {
          trigger: `<template #trigger="{ isOpen, open, close, toggle }">
            <button @click="toggle">Trigger</button>
          </template>`
        },
        attachTo: document.body
      })
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
