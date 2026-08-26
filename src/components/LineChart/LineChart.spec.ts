import type { LineDatum, LineSeries } from './LineChart.vue'
import { describe, expect, it } from 'vitest'
import { vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import Component from './LineChart.vue'

// BaseChart uses SVG APIs (getComputedTextLength) unavailable in jsdom.
// The stub renders the default slot with fixed dimensions so all inner chart
// rendering code (paths, circles, grid lines, gap segments) is exercised.
const INNER_WIDTH = 400
const INNER_HEIGHT = 300

const BaseChartStub = {
  name: 'BaseChart',
  props: ['showLegend', 'legend', 'title', 'hoveredIndex', 'tooltipVisible', 'tooltipX', 'tooltipY'],
  emits: ['update:hoveredIndex'],
  template: `
    <div data-id="sds-base-chart">
      <svg role="img" :aria-label="title">
        <title v-if="title">{{ title }}</title>
        <slot :inner-width="${INNER_WIDTH}" :inner-height="${INNER_HEIGHT}" />
      </svg>
      <slot name="tooltip" />
      <template v-if="showLegend">
        <slot
          name="legend"
          :items="legend?.items ?? []"
          :hovered-index="hoveredIndex"
          :update-hovered-index="(i) => $emit('update:hoveredIndex', i)"
        />
        <div data-id="sds-chart-legend" />
      </template>
    </div>
  `,
}

const singleSeries: LineDatum[] = [
  { x: 'Jan', y: 10 },
  { x: 'Feb', y: 20 },
  { x: 'Mar', y: 15 },
]

const multiSeries: LineSeries[] = [
  { id: 'a', label: 'Series A', data: [{ x: 'Jan', y: 10 }, { x: 'Feb', y: 20 }, { x: 'Mar', y: 15 }] },
  { id: 'b', label: 'Series B', data: [{ x: 'Jan', y: 5 }, { x: 'Feb', y: 15 }, { x: 'Mar', y: 8 }] },
]

const seriesWithGaps: LineSeries[] = [
  {
    id: 'a',
    label: 'Series A',
    data: [{ x: 'Jan', y: 10 }, { x: 'Feb', y: null }, { x: 'Mar', y: 20 }],
  },
]

const createWrapper = (props = {}, slots = {}) =>
  mount(Component, {
    props,
    slots,
    global: { stubs: { SdsBaseChart: BaseChartStub } },
  })

describe('LineChart.vue', () => {
  // ─── Basic Rendering ──────────────────────────────────────────────────────
  describe('Basic Rendering', () => {
    it('is a Vue instance', () => {
      expect(createWrapper().vm).toBeTruthy()
    })

    it('renders the root data-id element', () => {
      expect(createWrapper().find('[data-id="sds-line-chart"]').exists()).toBe(true)
    })

    it('matches snapshot with no props', () => {
      expect(createWrapper().html()).toMatchSnapshot()
    })

    it('matches snapshot with single series data', () => {
      expect(createWrapper({ data: singleSeries }).html()).toMatchSnapshot()
    })

    it('matches snapshot with multi-series data', () => {
      expect(createWrapper({ data: multiSeries }).html()).toMatchSnapshot()
    })
  })

  // ─── Props and Defaults ───────────────────────────────────────────────────
  describe('Props and Defaults', () => {
    it('renders a title in the SVG when title prop is provided', () => {
      expect(createWrapper({ title: 'My Chart' }).find('title').text()).toBe('My Chart')
    })

    it('does not render a title element when title prop is not provided', () => {
      expect(createWrapper().find('title').exists()).toBe(false)
    })
  })

  // ─── Line Paths ───────────────────────────────────────────────────────────
  describe('Line Paths', () => {
    it('renders one visible line path per series', () => {
      const wrapper = createWrapper({ data: multiSeries })
      // Each series gets one visible path (role="img") and one transparent hit-area path
      const visiblePaths = wrapper.findAll('path[role="img"]')
      expect(visiblePaths).toHaveLength(2)
    })

    it('renders no line paths when data is empty', () => {
      const wrapper = createWrapper({ data: [] })
      expect(wrapper.findAll('path[role="img"]').length).toBe(0)
    })

    it('renders a single line path for single-series data', () => {
      const wrapper = createWrapper({ data: singleSeries })
      expect(wrapper.findAll('path[role="img"]')).toHaveLength(1)
    })

    it('sets aria-label on each line path with series name', () => {
      const wrapper = createWrapper({ data: multiSeries })
      const paths = wrapper.findAll('path[role="img"]')
      expect(paths[0].attributes('aria-label')).toContain('Series A')
      expect(paths[1].attributes('aria-label')).toContain('Series B')
    })
  })

  // ─── Grid Lines ───────────────────────────────────────────────────────────
  describe('Grid Lines', () => {
    it('renders horizontal (y) grid lines when showGrid is true (default)', () => {
      const wrapper = createWrapper({ data: singleSeries })
      expect(wrapper.findAll('[data-id="sds-grid-line-y"]').length).toBeGreaterThan(0)
    })

    it('renders vertical (x) grid lines when showGrid is true (default)', () => {
      const wrapper = createWrapper({ data: singleSeries })
      expect(wrapper.findAll('[data-id="sds-grid-line-x"]').length).toBeGreaterThan(0)
    })

    it('does not render horizontal grid lines when showGrid is false', () => {
      const wrapper = createWrapper({ data: singleSeries, showGrid: false })
      expect(wrapper.findAll('[data-id="sds-grid-line-y"]').length).toBe(0)
    })

    it('does not render vertical grid lines when showGrid is false', () => {
      const wrapper = createWrapper({ data: singleSeries, showGrid: false })
      expect(wrapper.findAll('[data-id="sds-grid-line-x"]').length).toBe(0)
    })

    it('renders one vertical grid line per x-axis category', () => {
      // singleSeries has 3 categories: Jan, Feb, Mar
      const wrapper = createWrapper({ data: singleSeries })
      expect(wrapper.findAll('[data-id="sds-grid-line-x"]')).toHaveLength(3)
    })
  })

  // ─── Gap Segments ─────────────────────────────────────────────────────────
  describe('Gap Segments', () => {
    it('renders dashed gap connector lines for null data points', () => {
      const wrapper = createWrapper({ data: seriesWithGaps })
      // A dashed gap connector should appear for the null span
      const gapLines = wrapper.findAll('line[stroke-dasharray]')
      expect(gapLines.length).toBeGreaterThan(0)
    })

    it('renders no gap segments when there are no null values', () => {
      const wrapper = createWrapper({ data: singleSeries })
      expect(wrapper.findAll('line[stroke-dasharray]').length).toBe(0)
    })
  })

  // ─── Point Markers ────────────────────────────────────────────────────────
  describe('Point Markers', () => {
    it('does not render point markers by default', () => {
      const wrapper = createWrapper({ data: singleSeries })
      expect(wrapper.findAll('circle').length).toBe(0)
    })

    it('renders one circle per non-null data point when showPoints is true', () => {
      // singleSeries has 3 non-null points
      const wrapper = createWrapper({ data: singleSeries, showPoints: true })
      expect(wrapper.findAll('circle')).toHaveLength(3)
    })

    it('does not render circle markers for null data points', () => {
      // seriesWithGaps has 2 non-null and 1 null point
      const wrapper = createWrapper({ data: seriesWithGaps, showPoints: true })
      expect(wrapper.findAll('circle')).toHaveLength(2)
    })

    it('sets aria-label on point circles with series and x-axis info', () => {
      const wrapper = createWrapper({ data: singleSeries, showPoints: true })
      const circles = wrapper.findAll('circle')
      expect(circles[0].attributes('aria-label')).toContain('Jan')
    })
  })

  // ─── Line Color Classes ───────────────────────────────────────────────────
  describe('Line Color Classes (non-monochrome)', () => {
    it('applies a color class to the first series line path', () => {
      const wrapper = createWrapper({ data: multiSeries })
      const path = wrapper.findAll('path[role="img"]')[0]
      // Any non-empty text-* color class is expected
      expect(path.classes().some((c) => c.startsWith('text-'))).toBe(true)
    })

    it('applies different color classes to distinct series', () => {
      const wrapper = createWrapper({ data: multiSeries })
      const paths = wrapper.findAll('path[role="img"]')
      const class0 = paths[0].classes().find((c) => c.startsWith('text-'))
      const class1 = paths[1].classes().find((c) => c.startsWith('text-'))
      expect(class0).not.toBe(class1)
    })
  })

  // ─── Line Opacity on Hover ────────────────────────────────────────────────
  describe('Line Opacity on Hover', () => {
    it('applies no opacity class when no line is hovered', () => {
      const wrapper = createWrapper({ data: multiSeries })
      const paths = wrapper.findAll('path[role="img"]')
      expect(paths[0].classes()).not.toContain('opacity-40')
      expect(paths[1].classes()).not.toContain('opacity-40')
    })

    it('dims non-hovered lines with opacity-40 when a line is hovered', async () => {
      const wrapper = createWrapper({ data: multiSeries })
      // Trigger hover on the first series via the hit-area path
      const hitPaths = wrapper.findAll('path[role="none"]')
      await hitPaths[0].trigger('mouseenter')
      await nextTick()

      const visiblePaths = wrapper.findAll('path[role="img"]')
      expect(visiblePaths[0].classes()).not.toContain('opacity-40') // hovered — not dimmed
      expect(visiblePaths[1].classes()).toContain('opacity-40')     // not hovered — dimmed
    })

    it('removes opacity-40 from all lines after chart mouseleave', async () => {
      const wrapper = createWrapper({ data: multiSeries })
      const hitPaths = wrapper.findAll('path[role="none"]')
      await hitPaths[0].trigger('mouseenter')
      await nextTick()
      await wrapper.find('[data-id="sds-line-chart"]').trigger('mouseleave')
      await nextTick()

      const visiblePaths = wrapper.findAll('path[role="img"]')
      expect(visiblePaths[0].classes()).not.toContain('opacity-40')
      expect(visiblePaths[1].classes()).not.toContain('opacity-40')
    })

    it('does not apply opacity-40 in monochrome mode (uses color instead)', async () => {
      // 7 series exceeds default threshold of 6 → monochrome mode
      const manySeries: LineSeries[] = Array.from({ length: 7 }, (_, i) => ({
        id: `s${i}`,
        label: `S${i}`,
        data: [{ x: 'Jan', y: i + 1 }, { x: 'Feb', y: i + 2 }],
      }))
      const wrapper = createWrapper({ data: manySeries })
      const hitPaths = wrapper.findAll('path[role="none"]')
      await hitPaths[0].trigger('mouseenter')
      await nextTick()

      const visiblePaths = wrapper.findAll('path[role="img"]')
      // In monochrome mode opacity-40 is never applied — color classes change instead
      visiblePaths.forEach((p) => expect(p.classes()).not.toContain('opacity-40'))
    })
  })

  // ─── onLineEnter ─────────────────────────────────────────────────────────
  describe('onLineEnter', () => {
    it('sets hoveredIndex when mouseenter fires on a line hit-area', async () => {
      const wrapper = createWrapper({ data: multiSeries })
      const baseChart = wrapper.findComponent({ name: 'BaseChart' })
      const hitPaths = wrapper.findAll('path[role="none"]')
      await hitPaths[1].trigger('mouseenter')
      await nextTick()
      expect(baseChart.props('hoveredIndex')).toBe(1)
    })

    it('sets hoveredIndex when mousemove fires on a line hit-area', async () => {
      const wrapper = createWrapper({ data: multiSeries })
      const baseChart = wrapper.findComponent({ name: 'BaseChart' })
      const hitPaths = wrapper.findAll('path[role="none"]')
      await hitPaths[0].trigger('mousemove')
      await nextTick()
      expect(baseChart.props('hoveredIndex')).toBe(0)
    })

    it('clears hoveredPointKey when a line is entered', async () => {
      const wrapper = createWrapper({ data: singleSeries, showPoints: true })
      const circle = wrapper.find('circle')
      await circle.trigger('mouseenter', { clientX: 10, clientY: 10 })
      await nextTick()
      const hitPath = wrapper.find('path[role="none"]')
      await hitPath.trigger('mouseenter')
      await nextTick()
      // After entering a line the hovered point should be cleared (no point circle enlarged)
      expect(wrapper.find('circle[r="4.5"]').exists()).toBe(false)
    })
  })

  // ─── onPointEnter / onPointLeave ─────────────────────────────────────────
  describe('onPointEnter / onPointLeave', () => {
    it('enlarges the hovered circle radius', async () => {
      const wrapper = createWrapper({ data: singleSeries, showPoints: true })
      const circles = wrapper.findAll('circle')
      expect(circles[0].attributes('r')).toBe('3.5') // default radius
      await circles[0].trigger('mouseenter', { clientX: 5, clientY: 5 })
      await nextTick()
      expect(wrapper.findAll('circle')[0].attributes('r')).toBe('4.5') // hovered radius
    })

    it('restores radius after point mouseleave', async () => {
      const wrapper = createWrapper({ data: singleSeries, showPoints: true })
      const circles = wrapper.findAll('circle')
      await circles[0].trigger('mouseenter', { clientX: 5, clientY: 5 })
      await nextTick()
      await circles[0].trigger('mouseleave')
      await nextTick()
      expect(wrapper.findAll('circle')[0].attributes('r')).toBe('3.5')
    })

    it('fires onPointEnter via mousemove on circle', async () => {
      const wrapper = createWrapper({ data: singleSeries, showPoints: true })
      const baseChart = wrapper.findComponent({ name: 'BaseChart' })
      const circle = wrapper.findAll('circle')[0]
      await circle.trigger('mousemove', { clientX: 5, clientY: 5 })
      await nextTick()
      expect(baseChart.props('hoveredIndex')).toBe(0)
    })

    it('uses getBoundingClientRect for tooltip anchor when target is SVGCircleElement', async () => {
      const wrapper = createWrapper({ data: singleSeries, showPoints: true, showTooltip: true })
      const circle = wrapper.find('circle')

      // jsdom represents SVG circles as plain SVGElement; temporarily make SVGCircleElement
      // point to that constructor so the instanceof check in getTooltipAnchor passes.
      const OriginalSVGCircleElement = globalThis.SVGCircleElement
      globalThis.SVGCircleElement = circle.element.constructor as typeof SVGCircleElement

      vi.spyOn(circle.element, 'getBoundingClientRect').mockReturnValue({
        left: 100, top: 200, width: 10, height: 10,
        right: 110, bottom: 210, x: 100, y: 200,
        toJSON: () => ({}),
      } as DOMRect)

      await circle.trigger('mouseenter', { clientX: 0, clientY: 0 })
      await nextTick()

      const baseChart = wrapper.findComponent({ name: 'BaseChart' })
      // Tooltip anchor = rect center: left + width/2 = 105, top + height/2 = 205
      expect(baseChart.props('tooltipX')).toBe(105)
      expect(baseChart.props('tooltipY')).toBe(205)

      globalThis.SVGCircleElement = OriginalSVGCircleElement
      vi.restoreAllMocks()
    })

    it('sets hoveredIndex to the circle series index on point enter', async () => {
      const wrapper = createWrapper({ data: multiSeries, showPoints: true })
      const baseChart = wrapper.findComponent({ name: 'BaseChart' })
      // Circles are ordered: series 0 points first, then series 1
      const circles = wrapper.findAll('circle')
      // Enter the first circle of series 1 (index = multiSeries[0].data.length = 3)
      await circles[3].trigger('mouseenter', { clientX: 5, clientY: 5 })
      await nextTick()
      expect(baseChart.props('hoveredIndex')).toBe(1)
    })
  })

  // ─── onChartLeave ────────────────────────────────────────────────────────
  describe('onChartLeave', () => {
    it('resets hoveredIndex to null on chart mouseleave', async () => {
      const wrapper = createWrapper({ data: multiSeries })
      const baseChart = wrapper.findComponent({ name: 'BaseChart' })
      const hitPaths = wrapper.findAll('path[role="none"]')
      await hitPaths[0].trigger('mouseenter')
      await nextTick()
      expect(baseChart.props('hoveredIndex')).toBe(0)
      await wrapper.find('[data-id="sds-line-chart"]').trigger('mouseleave')
      await nextTick()
      expect(baseChart.props('hoveredIndex')).toBeNull()
    })
  })

  // ─── Hover ← BaseChart v-model ───────────────────────────────────────────
  describe('Hover ← BaseChart v-model', () => {
    it('updates hoveredIndex when BaseChart emits update:hoveredIndex', async () => {
      const wrapper = createWrapper({ data: multiSeries })
      const baseChart = wrapper.findComponent({ name: 'BaseChart' })
      await baseChart.vm.$emit('update:hoveredIndex', 1)
      await nextTick()
      expect(baseChart.props('hoveredIndex')).toBe(1)
    })

    it('passes null hoveredIndex to BaseChart by default', () => {
      const wrapper = createWrapper({ data: multiSeries })
      expect(wrapper.findComponent({ name: 'BaseChart' }).props('hoveredIndex')).toBeNull()
    })
  })

  // ─── resolvedFormatter ───────────────────────────────────────────────────
  describe('resolvedFormatter', () => {
    it('applies custom function yTickFormatter when provided', async () => {
      const wrapper = createWrapper({
        data: singleSeries,
        showPoints: true,
        yTickFormatter: (v: number) => `$${v}`,
      })
      // Formatter is reflected in aria-label on point circles: "Jan: $10"
      expect(wrapper.find('circle').attributes('aria-label')).toContain('$10')
    })

    it('applies tooltipValueFormat over yTickFormatter when both are provided', async () => {
      const wrapper = createWrapper({
        data: singleSeries,
        showPoints: true,
        yTickFormatter: (v: number) => `ignored-${v}`,
        tooltipValueFormat: (v: number) => `override-${v}`,
      })
      expect(wrapper.find('circle').attributes('aria-label')).toContain('override-10')
    })
  })

  // ─── Legend Visibility ───────────────────────────────────────────────────
  describe('Legend Visibility', () => {
    it('does not show the legend by default', () => {
      expect(createWrapper({ data: multiSeries }).find('[data-id="sds-chart-legend"]').exists()).toBe(false)
    })

    it('shows the legend when showLegend is true', () => {
      expect(createWrapper({ data: multiSeries, showLegend: true }).find('[data-id="sds-chart-legend"]').exists()).toBe(true)
    })

    it('does not show the legend when showLegend is false', () => {
      expect(createWrapper({ data: multiSeries, showLegend: false }).find('[data-id="sds-chart-legend"]').exists()).toBe(false)
    })

    it('shows the legend regardless of line count when showLegend is true', () => {
      const manySeries: LineSeries[] = Array.from({ length: 10 }, (_, i) => ({
        id: `s${i}`, label: `S${i}`, data: [{ x: 'Jan', y: i }],
      }))
      expect(createWrapper({ data: manySeries, showLegend: true }).find('[data-id="sds-chart-legend"]').exists()).toBe(true)
    })
  })

  // ─── Legend Items ─────────────────────────────────────────────────────────
  describe('Legend Items', () => {
    it('passes one legend item per series to BaseChart', () => {
      const baseChart = createWrapper({ data: multiSeries, showLegend: true }).findComponent({ name: 'BaseChart' })
      expect(baseChart.props('legend').items).toHaveLength(2)
    })

    it('legend items carry the correct series labels', () => {
      const baseChart = createWrapper({ data: multiSeries, showLegend: true }).findComponent({ name: 'BaseChart' })
      const labels = baseChart.props('legend').items.map((item: { label: string }) => item.label)
      expect(labels).toContain('Series A')
      expect(labels).toContain('Series B')
    })

    it('passes no legend items when data is empty', () => {
      const baseChart = createWrapper({ data: [], showLegend: true }).findComponent({ name: 'BaseChart' })
      expect(baseChart.props('legend').items).toHaveLength(0)
    })

    it('respects the legendOrientation prop', () => {
      const baseChart = createWrapper({ data: multiSeries, showLegend: true, legendOrientation: 'vertical' }).findComponent({ name: 'BaseChart' })
      expect(baseChart.props('legend').orientation).toBe('vertical')
    })
  })

  // ─── Legend Position Normalization ────────────────────────────────────────
  describe('Legend Position Normalization', () => {
    it('passes bottom-left position through unchanged', () => {
      const baseChart = createWrapper({ data: multiSeries, showLegend: true, legendPosition: 'bottom-left' }).findComponent({ name: 'BaseChart' })
      expect(baseChart.props('legend').position).toBe('bottom-left')
    })

    it('normalizes top-left to bottom-left', () => {
      const baseChart = createWrapper({ data: multiSeries, showLegend: true, legendPosition: 'top-left' }).findComponent({ name: 'BaseChart' })
      expect(baseChart.props('legend').position).toBe('bottom-left')
    })

    it('normalizes top-right to bottom-right', () => {
      const baseChart = createWrapper({ data: multiSeries, showLegend: true, legendPosition: 'top-right' }).findComponent({ name: 'BaseChart' })
      expect(baseChart.props('legend').position).toBe('bottom-right')
    })

    it('normalizes top-center to bottom-center', () => {
      const baseChart = createWrapper({ data: multiSeries, showLegend: true, legendPosition: 'top-center' }).findComponent({ name: 'BaseChart' })
      expect(baseChart.props('legend').position).toBe('bottom-center')
    })
  })

  // ─── Monochrome Mode ─────────────────────────────────────────────────────
  describe('Monochrome Mode', () => {
    it('does not enter monochrome mode when series count equals the threshold', () => {
      const series: LineSeries[] = Array.from({ length: 6 }, (_, i) => ({
        id: `s${i}`, label: `S${i}`, data: [{ x: 'Jan', y: i + 1 }],
      }))
      const wrapper = createWrapper({ data: series, lineCountThreshold: 6 })
      // Non-monochrome: paths should each have a distinct colored text class, not all gray
      const paths = wrapper.findAll('path[role="img"]')
      const grayPaths = paths.filter((p) => p.classes().includes('text-gray-200'))
      expect(grayPaths.length).toBe(0)
    })

    it('applies gray text class to non-hovered paths in monochrome mode', () => {
      const series: LineSeries[] = Array.from({ length: 7 }, (_, i) => ({
        id: `s${i}`, label: `S${i}`, data: [{ x: 'Jan', y: i + 1 }],
      }))
      const wrapper = createWrapper({ data: series, lineCountThreshold: 6 })
      const paths = wrapper.findAll('path[role="img"]')
      // All paths should use monochrome gray (no series-specific color) when nothing is hovered
      const grayPaths = paths.filter((p) => p.classes().includes('text-gray-200'))
      expect(grayPaths.length).toBe(paths.length)
    })
  })

  // ─── Tooltip Slot ─────────────────────────────────────────────────────────
  describe('Tooltip Slot', () => {
    it('renders a custom tooltip slot when provided', () => {
      const wrapper = createWrapper(
        { data: multiSeries, showTooltip: true },
        { tooltip: '<div data-testid="custom-tooltip">Custom</div>' },
      )
      expect(wrapper.find('[data-testid="custom-tooltip"]').exists()).toBe(true)
    })
  })

  // ─── Custom Legend Slot ───────────────────────────────────────────────────
  describe('Custom Legend Slot', () => {
    it('renders a custom legend slot when provided', () => {
      const wrapper = createWrapper(
        { data: multiSeries, showLegend: true },
        { legend: '<div data-testid="custom-legend">My Legend</div>' },
      )
      expect(wrapper.find('[data-testid="custom-legend"]').text()).toBe('My Legend')
    })
  })

  // ─── xScaleType ───────────────────────────────────────────────────────────
  describe('xScaleType', () => {
    it('renders paths for category scale (default)', () => {
      const wrapper = createWrapper({ data: singleSeries, xScaleType: 'category' })
      expect(wrapper.findAll('path[role="img"]').length).toBeGreaterThan(0)
    })

    it('renders paths for linear scale', () => {
      const linearData: LineDatum[] = [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 15 }]
      const wrapper = createWrapper({ data: linearData, xScaleType: 'linear' })
      expect(wrapper.findAll('path[role="img"]').length).toBeGreaterThan(0)
    })

    it('renders paths for time scale with Date x values', () => {
      const timeData: LineDatum[] = [
        { x: '2024-01-01', y: 10 },
        { x: '2024-02-01', y: 20 },
        { x: '2024-03-01', y: 15 },
      ]
      const wrapper = createWrapper({ data: timeData, xScaleType: 'time' })
      expect(wrapper.findAll('path[role="img"]').length).toBeGreaterThan(0)
    })
  })

  // ─── Edge Cases ───────────────────────────────────────────────────────────
  describe('Edge Cases', () => {
    it('renders without errors when data is an empty array', () => {
      expect(createWrapper({ data: [] }).find('[data-id="sds-line-chart"]').exists()).toBe(true)
    })

    it('renders without errors when data is undefined', () => {
      expect(createWrapper({ data: undefined }).find('[data-id="sds-line-chart"]').exists()).toBe(true)
    })

    it('renders without errors with a single data point', () => {
      expect(createWrapper({ data: [{ x: 'Jan', y: 42 }] }).find('[data-id="sds-line-chart"]').exists()).toBe(true)
    })

    it('renders without errors with all-null y values', () => {
      const allNull: LineDatum[] = [{ x: 'Jan', y: null }, { x: 'Feb', y: null }]
      expect(createWrapper({ data: allNull }).find('[data-id="sds-line-chart"]').exists()).toBe(true)
    })
  })

  // ─── Accessibility ────────────────────────────────────────────────────────
  describe('Accessibility', () => {
    it('renders an SVG with role="img"', () => {
      expect(createWrapper().find('svg[role="img"]').exists()).toBe(true)
    })

    it('sets aria-label on SVG when title is provided', () => {
      expect(createWrapper({ title: 'Accessible Chart' }).find('svg').attributes('aria-label')).toBe('Accessible Chart')
    })
  })
})