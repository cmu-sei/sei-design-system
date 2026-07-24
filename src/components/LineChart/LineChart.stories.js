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

const formatUtcDateLabel = (value) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(
    value instanceof Date ? value : new Date(value),
  )

const formatLocalDateLabel = (value) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(
    value instanceof Date ? value : new Date(value),
  )

const formatUtcHourLabel = (value) =>
  new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' }).format(
    value instanceof Date ? value : new Date(value),
  )

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

const onboardingProgressCategorySeries = [
  {
    label: 'Q1 Cohort',
    data: [
      { x: 'Account Created', y: 18 },
      { x: 'Email Verified', y: 36 },
      { x: 'Profile Completed', y: 58 },
      { x: 'First Project Created', y: 79 },
      { x: 'Workspace Activated', y: 100 },
    ],
  },
  {
    label: 'Q2 Cohort',
    data: [
      { x: 'Account Created', y: 22 },
      { x: 'Email Verified', y: 43 },
      { x: 'Profile Completed', y: 67 },
      { x: 'First Project Created', y: 85 },
      { x: 'Workspace Activated', y: 100 },
    ],
  },
]

const localReleaseTimeline = [
  new Date(2026, 0, 6, 9),
  new Date(2026, 0, 13, 9),
  new Date(2026, 0, 20, 9),
  new Date(2026, 0, 27, 9),
  new Date(2026, 1, 3, 9),
  new Date(2026, 1, 10, 9),
  new Date(2026, 1, 17, 9),
  new Date(2026, 1, 24, 9),
]

const utcTrafficTimeline = [
  new Date(Date.UTC(2026, 3, 8, 0)),
  new Date(Date.UTC(2026, 3, 8, 4)),
  new Date(Date.UTC(2026, 3, 8, 8)),
  new Date(Date.UTC(2026, 3, 8, 12)),
  new Date(Date.UTC(2026, 3, 8, 16)),
  new Date(Date.UTC(2026, 3, 8, 20)),
]

const linearScaleSeries = [
  {
    label: 'Projected Throughput (req/s)',
    data: [
      { x: 0, y: 120 },
      { x: 20, y: 210 },
      { x: 40, y: 320 },
      { x: 60, y: 430 },
      { x: 80, y: 540 },
      { x: 100, y: 620 },
    ],
  },
  {
    label: 'Observed Throughput (req/s)',
    data: [
      { x: 0, y: 115 },
      { x: 20, y: 198 },
      { x: 40, y: 298 },
      { x: 60, y: 395 },
      { x: 80, y: 485 },
      { x: 100, y: 555 },
    ],
  },
]

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
  yTickFormatter: formatPercent,
  tooltipValueFormat: formatPercent,
  legendOrientation: 'horizontal',
  legendPosition: 'bottom-right',
}

export const CategoryScale = Template.bind({})
CategoryScale.args = {
  ...Default.args,
  data: onboardingProgressCategorySeries,
  xScaleType: 'category',
  title: 'Cumulative Onboarding Completion by Cohort (Category x-axis)',
  yTickFormatter: formatPercent,
  tooltipValueFormat: formatPercent,
}
CategoryScale.parameters = {
  docs: {
    description: {
      story: 'Use xScaleType="category" for named stages where spacing should stay equal. This example uses cumulative completion percentages, so lines trend upward toward 100%.',
    },
  },
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

export const TimeScale = Template.bind({})
TimeScale.args = {
  data: [
    {
      label: 'Planned Scope (points)',
      data: localReleaseTimeline.map((date, index) => ({ x: date, y: [82, 86, 84, 90, 88, 92, 95, 97][index] })),
    },
    {
      label: 'Delivered Scope (points)',
      data: localReleaseTimeline.map((date, index) => ({ x: date, y: [74, 79, 77, 83, 82, 86, 90, 93][index] })),
    },
  ],
  title: 'Release Burndown Trend by Sprint Date (Local Time)',
  xScaleType: 'time',
  showTooltip: true,
  showPoints: true,
  showLegend: true,
  yTickFormatter: ',.0f',
  tooltipValueFormat: ',.0f',
  legendOrientation: 'horizontal',
  legendPosition: 'bottom-right',
  xTickValues: localReleaseTimeline,
  xTickFormatter: formatLocalDateLabel,
}
TimeScale.parameters = {
  docs: {
    description: {
      story: 'Use xScaleType="time" when dates should follow local timezone behavior (for example, sprint or business-calendar reporting).',
    },
  },
}

export const UtcScale = Template.bind({})
UtcScale.args = {
  ...TimeScale.args,
  data: [
    {
      label: 'EU Requests/min',
      data: utcTrafficTimeline.map((date, index) => ({ x: date, y: [540, 620, 710, 760, 700, 590][index] })),
    },
    {
      label: 'US Requests/min',
      data: utcTrafficTimeline.map((date, index) => ({ x: date, y: [430, 410, 460, 580, 720, 770][index] })),
    },
  ],
  title: 'Global API Traffic by UTC Hour',
  xScaleType: 'utc',
  xTickValues: utcTrafficTimeline,
  xTickFormatter: formatUtcHourLabel,
}
UtcScale.parameters = {
  docs: {
    description: {
      story: 'Use xScaleType="utc" for globally normalized timestamps where labels must remain stable across local timezones.',
    },
  },
}
UtcScale.storyName = 'UTC Scale'

export const LinearScale = Template.bind({})
LinearScale.args = {
  ...Default.args,
  data: linearScaleSeries,
  title: 'Throughput vs CPU Utilization (Linear x-axis)',
  xScaleType: 'linear',
  yTickFormatter: ',.0f',
  tooltipValueFormat: ',.0f',
}
LinearScale.parameters = {
  docs: {
    description: {
      story: 'Use xScaleType="linear" when x is a numeric variable (here: CPU utilization %) and spacing should match numeric distance.',
    },
  },
}
