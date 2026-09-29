import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useChartDimensions } from './index'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

class ResizeObserverMock {
  static callback: ResizeObserverCallback | null = null
  static instances: ResizeObserverMock[] = []
  observe = vi.fn()
  disconnect = vi.fn()

  constructor(callback: ResizeObserverCallback) {
    ResizeObserverMock.callback = callback
    ResizeObserverMock.instances.push(this)
  }
}

describe('useChartDimensions', () => {
  const originalResizeObserver = globalThis.ResizeObserver

  beforeEach(() => {
    globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver
    ResizeObserverMock.callback = null
    ResizeObserverMock.instances = []
  })

  afterEach(() => {
    globalThis.ResizeObserver = originalResizeObserver
    vi.restoreAllMocks()
  })

  it('derives dimensions from fixed height when no aspect ratio is provided', async () => {
    const Harness = {
      setup() {
        const containerRef = ref<HTMLElement | null>(null)
        const margin = ref({ top: 10, right: 20, bottom: 30, left: 40 })
        const height = ref<string | number>(400)
        const dims = useChartDimensions(containerRef, height, margin)
        return { containerRef, ...dims }
      },
      template: '<div ref="containerRef"></div>',
    }

    const wrapper = mount(Harness)
    Object.defineProperty(wrapper.element, 'clientWidth', { value: 900, configurable: true })

    ResizeObserverMock.callback?.(
      [{ contentRect: { width: 900 } } as ResizeObserverEntry],
      {} as ResizeObserver,
    )
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.containerWidth).toBe(900)
    expect(wrapper.vm.svgHeight).toBe(400)
    expect(wrapper.vm.innerWidth).toBe(840)
    expect(wrapper.vm.innerHeight).toBe(360)
  })

  it('uses aspect ratio when provided', async () => {
    const Harness = {
      setup() {
        const containerRef = ref<HTMLElement | null>(null)
        const margin = ref({ top: 10, right: 10, bottom: 10, left: 10 })
        const height = ref<string | number>(100)
        const aspectRatio = ref<number | undefined>(16 / 9)
        const dims = useChartDimensions(containerRef, height, margin, aspectRatio)
        return { containerRef, ...dims }
      },
      template: '<div ref="containerRef"></div>',
    }

    const wrapper = mount(Harness)
    Object.defineProperty(wrapper.element, 'clientWidth', { value: 800, configurable: true })

    ResizeObserverMock.callback?.(
      [{ contentRect: { width: 800 } } as ResizeObserverEntry],
      {} as ResizeObserver,
    )
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.svgHeight).toBeCloseTo(450, 4)
    expect(wrapper.vm.innerHeight).toBeCloseTo(430, 4)
  })

  it('parses string heights and clamps negative inner dimensions to zero', async () => {
    const Harness = {
      setup() {
        const containerRef = ref<HTMLElement | null>(null)
        const margin = ref({ top: 80, right: 80, bottom: 80, left: 80 })
        const height = ref<string | number>('120')
        const dims = useChartDimensions(containerRef, height, margin)
        return { containerRef, ...dims }
      },
      template: '<div ref="containerRef"></div>',
    }

    const wrapper = mount(Harness)
    Object.defineProperty(wrapper.element, 'clientWidth', { value: 100, configurable: true })

    ResizeObserverMock.callback?.(
      [{ contentRect: { width: 100 } } as ResizeObserverEntry],
      {} as ResizeObserver,
    )
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.svgHeight).toBe(120)
    expect(wrapper.vm.innerWidth).toBe(0)
    expect(wrapper.vm.innerHeight).toBe(0)
  })

  it('falls back to explicit height when aspect ratio is set but width is zero', async () => {
    const Harness = {
      setup() {
        const containerRef = ref<HTMLElement | null>(null)
        const margin = ref({ top: 10, right: 10, bottom: 10, left: 10 })
        const height = ref<string | number>(240)
        const aspectRatio = ref<number | undefined>(16 / 9)
        const dims = useChartDimensions(containerRef, height, margin, aspectRatio)
        return { containerRef, ...dims }
      },
      template: '<div ref="containerRef"></div>',
    }

    const wrapper = mount(Harness)
    Object.defineProperty(wrapper.element, 'clientWidth', { value: 0, configurable: true })

    ResizeObserverMock.callback?.(
      [{ contentRect: { width: 0 } } as ResizeObserverEntry],
      {} as ResizeObserver,
    )
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.svgHeight).toBe(240)
    expect(wrapper.vm.innerHeight).toBe(220)
  })

  it('observes the element and disconnects on unmount', async () => {
    const Harness = {
      setup() {
        const containerRef = ref<HTMLElement | null>(null)
        const margin = ref({ top: 10, right: 10, bottom: 10, left: 10 })
        const height = ref<string | number>(120)
        useChartDimensions(containerRef, height, margin)
        return { containerRef }
      },
      template: '<div ref="containerRef"></div>',
    }

    const wrapper = mount(Harness)
    await nextTick()

    const instance = ResizeObserverMock.instances[0]
    expect(instance?.observe).toHaveBeenCalledOnce()

    wrapper.unmount()
    expect(instance?.disconnect).toHaveBeenCalled()
  })

  it('ignores resize callbacks without entries', async () => {
    const Harness = {
      setup() {
        const containerRef = ref<HTMLElement | null>(null)
        const margin = ref({ top: 10, right: 10, bottom: 10, left: 10 })
        const height = ref<string | number>(120)
        const dims = useChartDimensions(containerRef, height, margin)
        return { containerRef, ...dims }
      },
      template: '<div ref="containerRef"></div>',
    }

    const wrapper = mount(Harness)
    await nextTick()
    ResizeObserverMock.callback?.(
      [{ contentRect: { width: 320 } } as ResizeObserverEntry],
      {} as ResizeObserver,
    )
    await wrapper.vm.$nextTick()

    ResizeObserverMock.callback?.([], {} as ResizeObserver)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.containerWidth).toBe(320)
  })
})