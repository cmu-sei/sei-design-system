import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import Component from './BarChart.vue'

const BaseChartStub = {
  name: 'BaseChart',
  props: ['xAxis', 'yAxis', 'xAxisLabel', 'yAxisLabel'],
  template: `
    <svg>
      <slot :inner-width="400" :inner-height="300" :container-width="480" />
    </svg>
  `,
}

describe('BarChart', () => {
  it.each(['vertical', 'horizontal'] as const)(
    'renders %s bars and axes without grid lines when showGrid is false',
    async (orientation) => {
      const wrapper = mount(Component, {
        props: {
          data: [{ label: 'First', value: 20 }, { label: 'Second', value: 80 }],
          orientation,
          showGrid: false,
          margin: { top: 20, right: 20, bottom: 40, left: 60 },
        },
        global: { stubs: { SdsBaseChart: BaseChartStub } },
      })
      await nextTick()

      const baseChart = wrapper.findComponent(BaseChartStub)
      expect(baseChart.props('xAxis')).toBeDefined()
      expect(baseChart.props('yAxis')).toBeDefined()
      expect(wrapper.findAll('rect[role="img"]')).toHaveLength(2)
      expect(wrapper.findAll('line')).toHaveLength(0)
      wrapper.unmount()
    },
  )

  it('renders horizontal grid lines at value ticks behind vertical bars', async () => {
    const wrapper = mount(Component, {
      props: {
        data: [{ label: 'First', value: 20 }, { label: 'Second', value: 80 }],
        orientation: 'vertical',
        margin: { top: 20, right: 20, bottom: 40, left: 60 },
      },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })
    await nextTick()

    const lines = wrapper.findAll('line[data-id="sds-grid-line-y"]')
    expect(lines.length).toBeGreaterThan(1)
    expect(wrapper.find('line[data-id="sds-grid-line-x"]').exists()).toBe(false)
    lines.forEach((line) => {
      expect(line.attributes()).toMatchObject({ x1: '0', x2: '400', role: 'none' })
      expect(line.attributes('y1')).toBe(line.attributes('y2'))
    })
    expect(lines.map((line) => Number(line.attributes('y1')))).toContain(300)
    expect(lines[0]!.classes()).toEqual(expect.arrayContaining(['text-gray-100', 'dark:text-gray-900']))

    const group = wrapper.find('g')
    expect(group.element.firstElementChild?.tagName.toLowerCase()).toBe('line')
    wrapper.unmount()
  })

  it('renders vertical grid lines at value ticks behind horizontal bars', async () => {
    const wrapper = mount(Component, {
      props: {
        data: [{ label: 'First', value: 20 }, { label: 'Second', value: 80 }],
        orientation: 'horizontal',
        margin: { top: 20, right: 20, bottom: 40, left: 60 },
      },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })
    await nextTick()

    const lines = wrapper.findAll('line[data-id="sds-grid-line-x"]')
    expect(lines.length).toBeGreaterThan(1)
    expect(wrapper.find('line[data-id="sds-grid-line-y"]').exists()).toBe(false)
    lines.forEach((line) => {
      expect(line.attributes()).toMatchObject({ y1: '0', y2: '300' })
      expect(line.attributes('x1')).toBe(line.attributes('x2'))
    })
    expect(lines.map((line) => Number(line.attributes('x1')))).toContain(0)
    wrapper.unmount()
  })

  it('forwards optional axis labels to BaseChart', () => {
    const wrapper = mount(Component, {
      props: {
        data: [{ label: 'First', value: 20 }],
        xAxisLabel: 'Year',
        yAxisLabel: 'Percentage',
      },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })

    expect(wrapper.findComponent(BaseChartStub).props()).toMatchObject({
      xAxisLabel: 'Year',
      yAxisLabel: 'Percentage',
    })
  })
})
