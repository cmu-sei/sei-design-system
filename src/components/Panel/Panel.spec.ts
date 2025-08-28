import { describe, expect, it, afterEach, beforeEach, afterAll, vi } from 'vitest'
import { mount, enableAutoUnmount } from '@vue/test-utils'
import Panel from './Panel.vue'
import { ref } from 'vue'

describe('Panel', () => {
  enableAutoUnmount(afterEach)

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Clean up teleported elements between tests
    document.body.innerHTML = ''
    vi.resetAllMocks()
    vi.useRealTimers()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('renders panel when `modelValue` is true', async () => {
    const model = ref(true)
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: {
        modelValue: model.value,
      },
      slots: { default: '', title: '', footer: '' }
    })
    await wrapper.vm.$nextTick()
    expect(document.querySelector('[data-id="sds-panel-backdrop"]')).not.toBeNull()
    expect(document.querySelector('[data-id="sds-panel"]')).not.toBeNull()
  })

  it('does not render panel when `modelValue` is false', async () => {
    const model = ref(false)
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: {
        modelValue: model.value
      },
      slots: { default: '', title: '', footer: '' }
    })
    await wrapper.vm.$nextTick()
    expect(document.querySelector('[data-id="sds-panel-backdrop"]')).toBeNull()
    expect(document.querySelector('[data-id="sds-panel"]')).toBeNull()
  })

  it('renders slot content in main area', async () => {
    const model = ref(true)
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: {
        modelValue: model.value
      },
      slots: {
        default: 'Default content',
        title: '',
        footer: ''
      }
    })
    await wrapper.vm.$nextTick()
    expect(document.querySelector('[data-id="sds-panel"]')).not.toBeNull()
    expect(document.body.innerHTML).toContain('Default content')
  })

  it('renders title slot in header', async () => {
    const model = ref(true)
    const wrapper = mount(Panel, {
      props: {
        modelValue: model.value
      },
      slots: {
        default: '',
        title: 'My Title',
        footer: ''
      }
    })
    await wrapper.vm.$nextTick()
    expect(document.querySelectorAll('header')[0]).not.toBeNull()
    expect(document.body.innerHTML).toContain('My Title')
  })

  it('renders footer slot when provided', async () => {
    const model = ref(true)
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: {
        modelValue: model.value,
      },
      slots: {
        default: '',
        title: '',
        footer: 'Footer content'
      }
    })
    await wrapper.vm.$nextTick()
    expect(document.querySelectorAll('footer')[0]).not.toBeNull()
    expect(document.body.innerHTML).toContain('Footer content')
  })

  it('applies correct size and side classes', async () => {
    const model = ref(true)
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: {
        modelValue: model.value,
        size: 'lg',
        side: 'left'
      },
      slots: { default: '', title: '', footer: '' }
    })
    await wrapper.vm.$nextTick()
    expect(document.querySelector('[data-id="sds-panel"]')).not.toBeNull()
    expect(document.querySelector('[data-id="sds-panel"]')?.classList).toContain('max-w-lg')
    expect(document.querySelector('[data-id="sds-panel"]')?.classList).toContain('left-0')
  })

  it('applies correct zIndex class for all valid zIndex prop values', () => {
    const zIndexes = ['0', '10', '20', '30', '40', '50', 'auto', '']
    const expectedClasses = {
      '0': 'z-0',
      '10': 'z-10',
      '20': 'z-20',
      '30': 'z-30',
      '40': 'z-40',
      '50': 'z-50',
      'auto': 'z-auto',
      '': ''
    }
    zIndexes.forEach(async (zIndex) => {
      document.body.innerHTML = ''
      const model = ref(true)
      const wrapper = mount(Panel, {
        attachTo: document.body,
        props: {
          modelValue: model.value,
          zIndex
        },
        slots: { default: '', title: '', footer: '' }
      })
      await wrapper.vm.$nextTick()
      const panelBackdropEl = document.querySelector('[data-id="sds-panel-backdrop"]')
      expect(panelBackdropEl).not.toBeNull()
      if (expectedClasses[zIndex]) {
        expect(panelBackdropEl?.classList).toContain(expectedClasses[zIndex])
      } else {
        // If zIndex is empty string, no z-* class should be present
        expect(panelBackdropEl?.classList).not.toContain('z-')
      }
      wrapper.unmount()
    })
  })
})
