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

const quarters = [
  'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023',
  'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024',
  'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025',
]

const csatTrendSeries = [
  {
    label: 'Web',
    data: quarters.map((quarter, index) => ({ x: quarter, y: [78, 79, 80, 81, 82, 83, 84, 84, 85, 86, 87, 88][index] })),
  },
  {
    label: 'Mobile App',
    data: quarters.map((quarter, index) => ({ x: quarter, y: [72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83][index] })),
  },
  {
    label: 'API',
    data: quarters.map((quarter, index) => ({ x: quarter, y: [84, 84, 85, 86, 86, 87, 88, 88, 89, 90, 90, 91][index] })),
  },
  {
    label: 'Support',
    data: quarters.map((quarter, index) => ({ x: quarter, y: [70, 71, 72, 72, 73, 74, 75, 76, 77, 78, 79, 80][index] })),
  },
]

const csatTrendWithGaps = [
  {
    label: 'Web',
    data: [
      { x: 'Q1 2023', y: 78 },
      { x: 'Q2 2023', y: 79 },
      { x: 'Q3 2023', y: 80 },
      { x: 'Q4 2023', y: null },
      { x: 'Q1 2024', y: null },
      { x: 'Q2 2024', y: 83 },
      { x: 'Q3 2024', y: 84 },
      { x: 'Q4 2024', y: 84 },
      { x: 'Q1 2025', y: 85 },
      { x: 'Q2 2025', y: 86 },
      { x: 'Q3 2025', y: 87 },
      { x: 'Q4 2025', y: 88 },
    ],
  },
  {
    label: 'Mobile App',
    data: [
      { x: 'Q1 2023', y: 72 },
      { x: 'Q2 2023', y: 73 },
      { x: 'Q3 2023', y: 74 },
      { x: 'Q4 2023', y: 75 },
      { x: 'Q1 2024', y: 76 },
      { x: 'Q2 2024', y: null },
      { x: 'Q3 2024', y: null },
      { x: 'Q4 2024', y: 79 },
      { x: 'Q1 2025', y: 80 },
      { x: 'Q2 2025', y: 81 },
      { x: 'Q3 2025', y: 82 },
      { x: 'Q4 2025', y: 83 },
    ],
  },
  {
    label: 'Support',
    data: [
      { x: 'Q1 2023', y: 70 },
      { x: 'Q2 2023', y: 71 },
      { x: 'Q3 2023', y: null },
      { x: 'Q4 2023', y: 72 },
      { x: 'Q1 2024', y: 73 },
      { x: 'Q2 2024', y: 74 },
      { x: 'Q3 2024', y: 75 },
      { x: 'Q4 2024', y: null },
      { x: 'Q1 2025', y: 77 },
      { x: 'Q2 2025', y: 78 },
      { x: 'Q3 2025', y: 79 },
      { x: 'Q4 2025', y: 80 },
    ],
  },
]

const manySeries = ['Web', 'Mobile App', 'API', 'Support', 'Store', 'Partner', 'Email', 'Chatbot'].map((label, index) => ({
  label,
  data: quarters.map((quarter, quarterIndex) => ({
    x: quarter,
    y: Math.max(45, 91 - (index * 4) - Math.floor(quarterIndex / 2)),
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

export const CustomMonochromeThreshold = Template.bind({})
CustomMonochromeThreshold.args = {
  ...Default.args,
  data: csatTrendSeries,
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
