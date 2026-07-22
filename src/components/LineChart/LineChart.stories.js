import SdsLineChart from './LineChart.vue'

export default {
  title: 'Components/Data Visualization/Line Chart',
  parameters: {
    docs: {
      description: {
        component: 'A line chart for trend comparisons across ordered categories. It supports optional point markers, missing-data gaps, and an adjustable monochrome threshold for dense multi-series charts.',
      },
    },
  },
  component: SdsLineChart,
  argTypes: {
    legendOrientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'select' },
    },
    legendPosition: {
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
      control: { type: 'select' },
    },
    lineCountThreshold: {
      control: { type: 'number' },
    },
  },
}

const years = ['2019', '2020', '2021', '2022', '2023', '2024', '2025']

const browserTrendSeries = [
  {
    label: 'Chrome',
    data: years.map((year, index) => ({ x: year, y: [67.2, 68.1, 66.7, 65.5, 64.1, 65.1, 65.8][index] })),
  },
  {
    label: 'Safari',
    data: years.map((year, index) => ({ x: year, y: [16.1, 16.8, 17.4, 18.8, 19.6, 18.7, 18.2][index] })),
  },
  {
    label: 'Edge',
    data: years.map((year, index) => ({ x: year, y: [2.8, 3.1, 3.4, 3.9, 4.6, 5.1, 5.0][index] })),
  },
  {
    label: 'Firefox',
    data: years.map((year, index) => ({ x: year, y: [4.4, 4.1, 3.8, 3.2, 2.9, 2.8, 2.7][index] })),
  },
  {
    label: 'Others',
    data: years.map((year, index) => ({ x: year, y: [9.5, 7.9, 8.7, 8.6, 8.8, 8.3, 8.3][index] })),
  },
]

const browserTrendWithGaps = [
  {
    label: 'Chrome',
    data: [
      { x: '2019', y: 67.2 },
      { x: '2020', y: 68.1 },
      { x: '2021', y: null },
      { x: '2022', y: null },
      { x: '2023', y: 64.1 },
      { x: '2024', y: 65.1 },
      { x: '2025', y: 65.8 },
    ],
  },
  {
    label: 'Safari',
    data: [
      { x: '2019', y: 16.1 },
      { x: '2020', y: 16.8 },
      { x: '2021', y: 17.4 },
      { x: '2022', y: null },
      { x: '2023', y: 19.6 },
      { x: '2024', y: null },
      { x: '2025', y: 18.2 },
    ],
  },
  {
    label: 'Edge',
    data: [
      { x: '2019', y: 2.8 },
      { x: '2020', y: 3.1 },
      { x: '2021', y: 3.4 },
      { x: '2022', y: null },
      { x: '2023', y: 4.6 },
      { x: '2024', y: 5.1 },
      { x: '2025', y: 5.0 },
    ],
  },
]

const manySeries = ['Chrome', 'Safari', 'Edge', 'Firefox', 'Opera', 'Brave', 'Vivaldi', 'Arc'].map((label, index) => ({
  label,
  data: years.map((year, yearIndex) => ({
    x: year,
    y: Math.max(1, 70 - (index * 7) - yearIndex),
  })),
}))

const Template = (args) => ({
  components: { SdsLineChart },
  setup() {
    return { args }
  },
  template: `
    <sds-line-chart v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {
  data: browserTrendSeries,
  title: 'Browser Market Share Trend (2019-2025)',
  showTooltip: true,
  showPoints: true,
  showLegend: true,
  legendOrientation: 'horizontal',
  legendPosition: 'bottom-right',
}

export const MissingDataGaps = Template.bind({})
MissingDataGaps.args = {
  ...Default.args,
  data: browserTrendWithGaps,
  title: 'Browser Market Share Trend with Missing Data',
}
MissingDataGaps.parameters = {
  docs: {
    description: {
      story: 'Null values create visible line breaks, while dashed connectors indicate missing intervals between known points.',
    },
  },
}

export const MonochromeWhenMoreThanSixLines = Template.bind({})
MonochromeWhenMoreThanSixLines.args = {
  ...Default.args,
  data: manySeries,
  title: 'Monochrome Mode for Dense Multi-Series Trends',
  lineCountThreshold: 6,
}
MonochromeWhenMoreThanSixLines.parameters = {
  docs: {
    description: {
      story: 'When the chart has more than six series, lines are rendered in gray and the hovered line highlights in blue.',
    },
  },
}

export const CustomMonochromeThreshold = Template.bind({})
CustomMonochromeThreshold.args = {
  ...Default.args,
  data: browserTrendSeries,
  lineCountThreshold: 3,
  title: 'Custom Monochrome Threshold (3)',
}
CustomMonochromeThreshold.parameters = {
  docs: {
    description: {
      story: 'Use lineCountThreshold to control when dense-mode grayscale behavior starts.',
    },
  },
}
