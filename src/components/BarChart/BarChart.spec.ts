import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import Component from './BarChart.vue'

const BaseChartStub = {
  name: 'BaseChart',
  props: ['xAxis', 'yAxis'],
  template: `
    <svg>
      <slot :inner-width="400" :inner-height="300" :container-width="480" />
    </svg>
  `,
}

describe('BarChart', () => {
  it.each(['vertical', 'horizontal'] as const)(
    'renders %s bars and axes without grid lines',
    async (orientation) => {
      const wrapper = mount(Component, {
        props: {
          data: [{ label: 'First', value: 20 }, { label: 'Second', value: 80 }],
          orientation,
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
})
