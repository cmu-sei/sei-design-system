import SdsLineChart from './LineChart.vue'

const formatPercent = (value) => `${value.toFixed(1).replace('.0', '')}%`

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

const quarters = [
  'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023',
  'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024',
  'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025',
]

const csatTrendSeries = [
  {
    label: 'Web',
    data: quarters.map((quarter, index) => ({ x: quarter, y: [62, 71, 69, 78, 74, 81, 77, 85, 80, 88, 83, 86][index] })),
  },
  {
    label: 'Mobile App',
    data: quarters.map((quarter, index) => ({ x: quarter, y: [88, 79, 83, 72, 76, 68, 74, 67, 73, 65, 70, 63][index] })),
  },
  {
    label: 'API',
    data: quarters.map((quarter, index) => ({ x: quarter, y: [54, 58, 73, 61, 79, 66, 82, 70, 76, 69, 84, 72][index] })),
  },
  {
    label: 'Support',
    data: quarters.map((quarter, index) => ({ x: quarter, y: [91, 85, 87, 80, 84, 77, 79, 73, 75, 69, 72, 66][index] })),
  },
]

const csatTrendWithGaps = [
  {
    label: 'Web',
    data: [
      { x: 'Q1 2023', y: 62 },
      { x: 'Q2 2023', y: 71 },
      { x: 'Q3 2023', y: null },
      { x: 'Q4 2023', y: 78 },
      { x: 'Q1 2024', y: 74 },
      { x: 'Q2 2024', y: null },
      { x: 'Q3 2024', y: 77 },
      { x: 'Q4 2024', y: 85 },
      { x: 'Q1 2025', y: 80 },
      { x: 'Q2 2025', y: null },
      { x: 'Q3 2025', y: 83 },
      { x: 'Q4 2025', y: 86 },
    ],
  },
  {
    label: 'Mobile App',
    data: [
      { x: 'Q1 2023', y: 88 },
      { x: 'Q2 2023', y: null },
      { x: 'Q3 2023', y: 83 },
      { x: 'Q4 2023', y: 72 },
      { x: 'Q1 2024', y: null },
      { x: 'Q2 2024', y: 68 },
      { x: 'Q3 2024', y: 74 },
      { x: 'Q4 2024', y: 67 },
      { x: 'Q1 2025', y: null },
      { x: 'Q2 2025', y: 65 },
      { x: 'Q3 2025', y: 70 },
      { x: 'Q4 2025', y: 63 },
    ],
  },
  {
    label: 'Support',
    data: [
      { x: 'Q1 2023', y: 91 },
      { x: 'Q2 2023', y: 85 },
      { x: 'Q3 2023', y: null },
      { x: 'Q4 2023', y: 80 },
      { x: 'Q1 2024', y: 84 },
      { x: 'Q2 2024', y: 77 },
      { x: 'Q3 2024', y: null },
      { x: 'Q4 2024', y: 73 },
      { x: 'Q1 2025', y: 75 },
      { x: 'Q2 2025', y: 69 },
      { x: 'Q3 2025', y: null },
      { x: 'Q4 2025', y: 66 },
    ],
  },
]

const denseSeriesProfiles = [
  [78, 66, 74, 61, 79, 68, 83, 70, 76, 64, 81, 69],
  [63, 72, 65, 76, 67, 74, 69, 78, 71, 75, 73, 80],
  [85, 82, 88, 80, 84, 79, 86, 77, 83, 76, 87, 74],
  [58, 64, 60, 69, 62, 67, 64, 71, 66, 70, 68, 73],
  [74, 70, 77, 68, 75, 66, 79, 69, 76, 67, 80, 70],
  [69, 75, 71, 78, 73, 76, 70, 79, 72, 77, 74, 81],
  [81, 73, 84, 71, 82, 70, 86, 72, 83, 69, 85, 73],
  [55, 61, 57, 64, 59, 66, 58, 68, 60, 65, 62, 69],
]

const manySeries = ['Web', 'Mobile App', 'API', 'Support', 'Store', 'Partner', 'Email', 'Chatbot'].map((label, index) => ({
  label,
  data: quarters.map((quarter, quarterIndex) => ({
    x: quarter,
    y: denseSeriesProfiles[index]?.[quarterIndex] ?? 0,
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
  data: csatTrendSeries,
  title: 'Customer Satisfaction by Channel (Quarterly)',
  showTooltip: true,
  showPoints: true,
  showLegend: true,
  valueFormat: formatPercent,
  tooltipValueFormat: formatPercent,
  legendOrientation: 'horizontal',
  legendPosition: 'bottom-right',
}

export const MissingDataGaps = Template.bind({})
MissingDataGaps.args = {
  ...Default.args,
  data: csatTrendWithGaps,
  title: 'Customer Satisfaction with Missing Quarters',
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
  title: 'Dense Multi-Series Customer Satisfaction Trends',
  lineCountThreshold: 6,
}
MonochromeWhenMoreThanSixLines.parameters = {
  docs: {
    description: {
      story: 'When the chart has more than six series, lines are rendered in gray and the hovered line highlights in blue.',
    },
  },
}
