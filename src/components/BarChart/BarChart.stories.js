import SdsBarChart from './BarChart.vue'
import { formatPercent, sortByProperty } from '@/helpers/charts'

export default {
  title: 'Components/Data Visualization/Bar Chart',
  parameters: {
    docs: {
      description: {
        component: 'A flexible bar chart component that renders single-series or multi-series data in vertical or horizontal orientation, with support for grouped or stacked modes.',
      },
    },
  },
  component: SdsBarChart,
  argTypes: {
    orientation: {
      options: ['vertical', 'horizontal'],
      control: { type: 'select' },
      description: 'Bar orientation: "vertical" (bars grow upward) or "horizontal" (bars grow rightward).',
    },
    mode: {
      options: ['grouped', 'stacked'],
      control: { type: 'select' },
      description: 'Display mode for multi-series data: "grouped" (side-by-side) or "stacked" (layered).',
    },
    legendOrientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'select' },
      description: 'Legend layout direction.',
    },
    legendPosition: {
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      control: { type: 'select' },
      description: 'Legend position in the chart container.',
    },
    height: {
      control: { type: 'number' },
      description: 'Chart height in pixels. Ignored if aspectRatio is set.',
    },
    showTooltip: {
      control: { type: 'boolean' },
      description: 'Show tooltip on bar hover.',
    },
    showLegend: {
      control: { type: 'boolean' },
      description: 'Display the legend.',
    },
    animate: {
      control: { type: 'boolean' },
      description: 'Animate bars on mount and data changes.',
    },
    title: {
      control: { type: 'text' },
      description: 'Optional chart title.',
    },
    xTickFormatter: {
      control: { type: 'text' },
      description: 'D3 format specifier for x-axis numeric ticks.',
    },
    yTickFormatter: {
      control: { type: 'text' },
      description: 'D3 format specifier for y-axis numeric ticks.',
    },
  },
}

// ── Single-series: 2025 market share ─────────────────────────────────────────
// Source: StatCounter Global Stats – Desktop, worldwide, 2025
const browserShare2025 = [
  { label: 'Chrome', value: 65.8 },
  { label: 'Safari', value: 18.2 },
  { label: 'Edge', value: 5.0 },
  { label: 'Firefox', value: 2.7 },
  { label: 'Others', value: 8.3 },
]

// ── Single-series with long descriptive labels (for y-axis wrapping demo) ─────
const browserShare2025LongLabels = [
  { label: 'Google Chrome - Blink Rendering Engine', value: 65.8 },
  { label: 'Apple Safari - WebKit Rendering Engine', value: 18.2 },
  { label: 'Microsoft Edge - Chromium-based Browser', value: 5.0 },
  { label: 'Mozilla Firefox - Gecko Rendering Engine', value: 2.7 },
  { label: 'Opera, Samsung Internet & Other Browsers', value: 8.3 },
]

// ── Single-series with custom uniform color ──────────────────────────────────
const browserShare2025CustomColor = [
  { label: 'Chrome', value: 65.8, color: { light: '#e15759', dark: '#f0a0a1' } },
  { label: 'Safari', value: 18.2, color: { light: '#e15759', dark: '#f0a0a1' } },
  { label: 'Edge', value: 5.0, color: { light: '#e15759', dark: '#f0a0a1' } },
  { label: 'Firefox', value: 2.7, color: { light: '#e15759', dark: '#f0a0a1' } },
  { label: 'Others', value: 8.3, color: { light: '#e15759', dark: '#f0a0a1' } },
]

// ── Multi-series: per-browser share across 2020 – 2025 ────────────────────────
// Source: StatCounter Global Stats – Desktop, worldwide
// Series = browsers; x-axis = years
const browserShareBySeries = [
  {
    label: 'Chrome',
    data: [
      { label: '2020', value: 68.3 },
      { label: '2021', value: 66.9 },
      { label: '2022', value: 65.1 },
      { label: '2023', value: 63.5 },
      { label: '2024', value: 65.2 },
      { label: '2025', value: 65.8 },
    ],
  },
  {
    label: 'Safari',
    data: [
      { label: '2020', value: 16.9 },
      { label: '2021', value: 18.2 },
      { label: '2022', value: 18.8 },
      { label: '2023', value: 19.9 },
      { label: '2024', value: 18.5 },
      { label: '2025', value: 18.2 },
    ],
  },
  {
    label: 'Edge',
    data: [
      { label: '2020', value: 3.1 },
      { label: '2021', value: 3.4 },
      { label: '2022', value: 3.9 },
      { label: '2023', value: 4.6 },
      { label: '2024', value: 5.1 },
      { label: '2025', value: 5.0 },
    ],
  },
  {
    label: 'Firefox',
    data: [
      { label: '2020', value: 4.1 },
      { label: '2021', value: 3.7 },
      { label: '2022', value: 3.2 },
      { label: '2023', value: 2.9 },
      { label: '2024', value: 2.8 },
      { label: '2025', value: 2.7 },
    ],
  },
  {
    label: 'Others',
    data: [
      { label: '2020', value: 7.6 },
      { label: '2021', value: 7.8 },
      { label: '2022', value: 9.0 },
      { label: '2023', value: 9.1 },
      { label: '2024', value: 8.4 },
      { label: '2025', value: 8.3 },
    ],
  },
]

// ── Restructure: years as series, browsers as categories ─────────────────────
// X-axis: browsers, Grouped bars: years (2020-2025 for each browser)
const browserShareByYearSeries = (() => {
  const browsers = ['Chrome', 'Safari', 'Others', 'Edge', 'Firefox']
  const years = ['2020', '2021', '2022', '2023', '2024', '2025']

  return years.map((year) => ({
    label: year,
    data: browsers.map((browserName) => {
      const browserSeries = browserShareBySeries.find((s) => s.label === browserName)
      const dataPoint = browserSeries?.data.find((d) => d.label === year)
      return {
        label: browserName,
        value: dataPoint?.value ?? 0,
      }
    }),
  }))
})()

// ── Multi-series with per-series brand colors ─────────────────────────────────
const browserShareBySeriesBrandColors = [
  {
    label: 'Chrome',
    color: { light: '#4e79a7', dark: '#7fb3d3' },
    data: [
      { label: '2020', value: 68.3 },
      { label: '2021', value: 66.9 },
      { label: '2022', value: 65.1 },
      { label: '2023', value: 63.5 },
      { label: '2024', value: 65.2 },
      { label: '2025', value: 65.8 },
    ],
  },
  {
    label: 'Safari',
    color: { light: '#f28e2b', dark: '#f7b97e' },
    data: [
      { label: '2020', value: 16.9 },
      { label: '2021', value: 18.2 },
      { label: '2022', value: 18.8 },
      { label: '2023', value: 19.9 },
      { label: '2024', value: 18.5 },
      { label: '2025', value: 18.2 },
    ],
  },
  {
    label: 'Edge',
    color: { light: '#e15759', dark: '#f0a0a1' },
    data: [
      { label: '2020', value: 3.1 },
      { label: '2021', value: 3.4 },
      { label: '2022', value: 3.9 },
      { label: '2023', value: 4.6 },
      { label: '2024', value: 5.1 },
      { label: '2025', value: 5.0 },
    ],
  },
  {
    label: 'Firefox',
    color: { light: '#76b7b2', dark: '#aad5d2' },
    data: [
      { label: '2020', value: 4.1 },
      { label: '2021', value: 3.7 },
      { label: '2022', value: 3.2 },
      { label: '2023', value: 2.9 },
      { label: '2024', value: 2.8 },
      { label: '2025', value: 2.7 },
    ],
  },
  {
    label: 'Others',
    color: { light: '#59a14f', dark: '#96c990' },
    data: [
      { label: '2020', value: 7.6 },
      { label: '2021', value: 7.8 },
      { label: '2022', value: 9.0 },
      { label: '2023', value: 9.1 },
      { label: '2024', value: 8.4 },
      { label: '2025', value: 8.3 },
    ],
  },
]

const Template = (args) => ({
  components: { SdsBarChart },
  setup() {
    return { args }
  },
  template: `
    <sds-bar-chart v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {
  data: browserShare2025,
  orientation: 'vertical',
  mode: 'grouped',
  height: 360,
  showTooltip: true,
  showLegend: false,
  animate: true,
  title: 'Browser Market Share - Desktop, 2025 (Vertical)',
  yTickFormatter: formatPercent,
}

export const Horizontal = Template.bind({})
Horizontal.args = {
  data: sortByProperty(browserShare2025, 'value', 'desc'),
  orientation: 'horizontal',
  showTooltip: true,
  title: 'Browser Market Share - Desktop, 2025 (Horizontal)',
  xTickFormatter: formatPercent,
}

export const HorizontalLongLabels = Template.bind({})
HorizontalLongLabels.args = {
  data: sortByProperty(browserShare2025LongLabels, 'value', 'desc'),
  orientation: 'horizontal',
  showTooltip: true,
  title: 'Browser Market Share - Desktop, 2025 (Long Labels)',
  xTickFormatter: formatPercent,
}

export const VerticalMultiSeriesGrouped = Template.bind({})
VerticalMultiSeriesGrouped.args = {
  data: browserShareByYearSeries,
  orientation: 'vertical',
  mode: 'grouped',
  showLegend: true,
  legendPosition: 'top-right',
  showTooltip: true,
  title: 'Browser Market Share by Year - Vertical Multi-Series Grouped (Years as Series)',
  yTickFormatter: formatPercent,
}

export const VerticalMultiSeriesStacked = Template.bind({})
VerticalMultiSeriesStacked.args = {
  data: browserShareBySeries,
  orientation: 'vertical',
  mode: 'stacked',
  showLegend: true,
  legendPosition: 'top-right',
  showTooltip: true,
  title: 'Browser Market Share by Year - Vertical Multi-Series Stacked',
  yTickFormatter: formatPercent,
}

export const HorizontalMultiSeriesGrouped = Template.bind({})
HorizontalMultiSeriesGrouped.args = {
  data: browserShareBySeries,
  height: 720,
  orientation: 'horizontal',
  mode: 'grouped',
  showLegend: true,
  legendPosition: 'top-right',
  showTooltip: true,
  title: 'Browser Market Share by Year - Horizontal Multi-Series Grouped',
  xTickFormatter: formatPercent,
}

export const HorizontalMultiSeriesStacked = Template.bind({})
HorizontalMultiSeriesStacked.args = {
  data: browserShareBySeries,
  orientation: 'horizontal',
  mode: 'stacked',
  showLegend: true,
  legendPosition: 'top-right',
  showTooltip: true,
  title: 'Browser Market Share by Year - Horizontal Multi-Series Stacked',
  xTickFormatter: formatPercent,
}

export const SingleSeriesCustomColor = Template.bind({})
SingleSeriesCustomColor.args = {
  data: browserShare2025CustomColor,
  orientation: 'vertical',
  showTooltip: true,
  title: 'Browser Market Share 2025 - Custom Color',
  yTickFormatter: formatPercent,
}

export const MultiSeriesBrandColors = Template.bind({})
MultiSeriesBrandColors.args = {
  data: browserShareBySeriesBrandColors,
  orientation: 'vertical',
  mode: 'grouped',
  showLegend: true,
  legendPosition: 'top-right',
  showTooltip: true,
  title: 'Browser Market Share by Year - Per-Series Brand Colors',
  yTickFormatter: formatPercent,
}

export const ResponsiveAspectRatio = Template.bind({})
ResponsiveAspectRatio.args = {
  data: browserShare2025,
  aspectRatio: 16 / 9,
  showTooltip: true,
  title: 'Browser Market Share 2025 - 16:9 Aspect Ratio',
  yTickFormatter: formatPercent,
}