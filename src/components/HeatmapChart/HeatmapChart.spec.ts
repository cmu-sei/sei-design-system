import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HeatmapChart from './HeatmapChart.vue'

const BaseChartStub = {
  name: 'BaseChart',
  props: ['legend', 'hoveredIndex'],
  emits: ['update:hoveredIndex'],
  template: `
    <div>
      <svg><slot :inner-width="400" :inner-height="300" /></svg>
      <slot
        name="legend"
        :items="legend.items"
        :hovered-index="hoveredIndex"
        :update-hovered-index="(index) => $emit('update:hoveredIndex', index)"
      />
    </div>
  `,
}

describe('HeatmapChart legend', () => {
  it('renders wide, rectangular color bins that respond to hover', async () => {
    const wrapper = mount(HeatmapChart, {
      props: { data: [
        { x: 'Monday', y: 'Morning', value: 0 },
        { x: 'Tuesday', y: 'Morning', value: 100 },
      ] },
      global: { stubs: { SdsBaseChart: BaseChartStub } },
    })

    const bin = wrapper.find('.sds-heatmap-legend button')
    expect(bin.classes()).toEqual(expect.arrayContaining(['h-4', 'w-8']))
    expect(bin.attributes('style')).toContain('background-color:')
    expect(bin.find('span').exists()).toBe(false)

    await bin.trigger('mouseenter')
    expect(wrapper.findComponent(BaseChartStub).props('hoveredIndex')).toBe(0)
  })
})
