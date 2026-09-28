import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axisBottom, axisLeft, scaleBand } from '@/lib/d3'
import ChartAxis from './ChartAxis.vue'

const xLabels = ['North Region', 'South Region']
const yLabels = ['North East', 'South West']
const AxisHost = {
  components: { ChartAxis },
  props: ['axis', 'innerWidth', 'innerHeight', 'orientation', 'maxLabelWidth'],
  template: '<svg><ChartAxis v-bind="$props" /></svg>',
}

function textWidth(text: SVGElement): number {
  const fontSize = Number.parseFloat(text.getAttribute('font-size') ?? '14')
  return (text.textContent?.length ?? 0) * 8 * fontSize / 14
}

describe('ChartAxis', () => {
  beforeEach(() => {
    Object.defineProperty(SVGElement.prototype, 'getComputedTextLength', {
      configurable: true,
      value: function (this: SVGElement) { return textWidth(this) },
    })
    vi.spyOn(SVGElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: SVGElement) {
      if (this.tagName.toLowerCase() === 'svg') return new DOMRect(0, 0, 240, 120)
      const tickX = Number(this.parentElement?.getAttribute('transform')?.match(/translate\(([-\d.]+)/)?.[1] ?? 0)
      const width = textWidth(this)
      return new DOMRect(tickX - width / 2, 0, width, 14)
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    delete (SVGElement.prototype as SVGElement & { getComputedTextLength?: () => number }).getComputedTextLength
  })

  it('renders a D3 x-axis with readable labels when there is sufficient width', () => {
    const axis = axisBottom(scaleBand().domain(['Jan', 'Feb']).range([0, 240]))
    const wrapper = mount(AxisHost, {
      props: { axis, innerWidth: 240, innerHeight: 100, orientation: 'x' },
    })

    const labels = wrapper.findAll('.tick text')
    expect(labels.map((label) => label.text())).toEqual(['Jan', 'Feb'])
    expect(wrapper.findAll('tspan[data-wrap-x]')).toHaveLength(0)
    expect(labels[0].attributes('font-size')).toBe('14px')
    expect(labels[0].attributes('text-anchor')).toBe('middle')
    wrapper.unmount()
  })

  it('wraps long x-axis labels into tspans and recomputes them when width changes', async () => {
    const axis = axisBottom(scaleBand().domain(xLabels).range([0, 240]))
    const wrapper = mount(AxisHost, {
      props: { axis, innerWidth: 100, innerHeight: 100, orientation: 'x' },
    })

    expect(wrapper.findAll('.tick:first-of-type tspan[data-wrap-x]').length).toBeGreaterThan(1)
    expect(wrapper.findAll('.tick text').map((label) =>
      label.findAll('tspan').map((line) => line.text()).join(' '),
    )).toEqual(xLabels)
    const initialCount = wrapper.findAll('tspan[data-wrap-x]').length

    await wrapper.setProps({ innerWidth: 90 })
    expect(wrapper.findAll('tspan[data-wrap-x]')).toHaveLength(initialCount)
    expect(wrapper.findAll('.tick text').map((label) =>
      label.findAll('tspan').map((line) => line.text()).join(' '),
    )).toEqual(xLabels)
    wrapper.unmount()
  })

  it('nudges an overflowing first x-axis label inward without changing its alignment', () => {
    const axis = axisBottom(scaleBand().domain(['Extremely Long First Label', 'End']).range([0, 240]))
    const wrapper = mount(AxisHost, {
      props: { axis, innerWidth: 240, innerHeight: 100, orientation: 'x' },
    })

    const first = wrapper.find('.tick text')
    expect(first.attributes('transform')).toMatch(/^translate\(\d+(\.\d+)?, 0\)$/)
    expect(first.attributes('text-anchor')).toBe('middle')
    wrapper.unmount()
  })

  it('nudges an overflowing last x-axis label inward', () => {
    vi.spyOn(SVGElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: SVGElement) {
      if (this.tagName.toLowerCase() === 'svg') return new DOMRect(0, 0, 240, 120)
      const tickX = Number(this.parentElement?.getAttribute('transform')?.match(/translate\(([-\d.]+)/)?.[1] ?? 0)
      return new DOMRect(tickX + 85, 0, 30, 14)
    })
    const axis = axisBottom(scaleBand().domain(['Jan', 'Feb']).range([0, 240]))
    const wrapper = mount(AxisHost, {
      props: { axis, innerWidth: 240, innerHeight: 100, orientation: 'x' },
    })

    const labels = wrapper.findAll('.tick text')
    expect(labels[1].attributes('transform')).toMatch(/^translate\(-\d+(\.\d+)?, 0\)$/)
    wrapper.unmount()
  })

  it('uses estimated character widths when SVG text measurement is unavailable', () => {
    Object.defineProperty(SVGElement.prototype, 'getComputedTextLength', {
      configurable: true,
      value: () => 0,
    })
    const axis = axisBottom(scaleBand().domain(xLabels).range([0, 240]))
    const wrapper = mount(AxisHost, {
      props: { axis, innerWidth: 100, innerHeight: 100, orientation: 'x' },
    })

    expect(wrapper.findAll('.tick:first-of-type tspan[data-wrap-x]').map((line) => line.text()))
      .toEqual(['North', 'Region'])
    wrapper.unmount()
  })

  it('wraps y-axis labels within the available width and replaces rather than duplicates lines on update', async () => {
    const axis = axisLeft(scaleBand().domain(yLabels).range([0, 100]))
    const wrapper = mount(AxisHost, {
      props: { axis, innerWidth: 200, innerHeight: 100, orientation: 'y', maxLabelWidth: 44 },
    })

    const firstTick = wrapper.find('.tick')
    expect(firstTick.find('text:not([data-wrap])').attributes('display')).toBe('none')
    expect(firstTick.findAll('text[data-wrap]').map((line) => line.text())).toEqual(['North', 'East'])
    expect(firstTick.findAll('text[data-wrap]').map((line) => line.attributes('font-size'))).toEqual(['14px', '14px'])

    await wrapper.setProps({ maxLabelWidth: 40 })
    expect(wrapper.find('.tick').findAll('text[data-wrap]').map((line) => line.text())).toEqual(['North', 'East'])
    wrapper.unmount()
  })

  it('keeps short y-axis labels on their original text elements', () => {
    const axis = axisLeft(scaleBand().domain(['Jan', 'Feb']).range([0, 100]))
    const wrapper = mount(AxisHost, {
      props: { axis, innerWidth: 200, innerHeight: 100, orientation: 'y' },
    })

    expect(wrapper.findAll('text[data-wrap]')).toHaveLength(0)
    expect(wrapper.findAll('.tick text').map((label) => label.text())).toEqual(['Jan', 'Feb'])
    wrapper.unmount()
  })

  it('reduces the y-axis label font size to fit multiple lines within each band', () => {
    const axis = axisLeft(scaleBand().domain(['North East West', 'South East West']).range([0, 100]))
    const wrapper = mount(AxisHost, {
      props: { axis, innerWidth: 200, innerHeight: 100, orientation: 'y', maxLabelWidth: 44 },
    })

    const lines = wrapper.find('.tick').findAll('text[data-wrap]')
    expect(lines.map((line) => line.text())).toEqual(['North', 'East', 'West'])
    expect(Number.parseFloat(lines[0].attributes('font-size'))).toBeLessThan(14)
    wrapper.unmount()
  })

  it('falls back to character-based wrapping for y-axis labels without SVG measurements', () => {
    Object.defineProperty(SVGElement.prototype, 'getComputedTextLength', {
      configurable: true,
      value: () => 0,
    })
    const axis = axisLeft(scaleBand().domain(yLabels).range([0, 100]))
    const wrapper = mount(AxisHost, {
      props: { axis, innerWidth: 200, innerHeight: 100, orientation: 'y', maxLabelWidth: 44 },
    })

    expect(wrapper.find('.tick').findAll('text[data-wrap]').map((line) => line.text())).toEqual(['North', 'East'])
    wrapper.unmount()
  })
})
