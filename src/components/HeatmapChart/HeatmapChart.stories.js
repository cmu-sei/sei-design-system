import SdsHeatmapChart from './HeatmapChart.vue';
import SdsChartTooltipContent from '../ChartTooltip/ChartTooltipContent.vue';

export default {
  title: 'Components/Data Visualization/Heatmap Chart',
  parameters: {
    docs: {
      description: {
        component: 'A heatmap chart visualizes values across two discrete dimensions using color intensity. Its height grows with the number of rows, and optional x- and y-axis labels clarify the dimensions.',
      },
    },
  },
  component: SdsHeatmapChart,
  argTypes: {
    legendOrientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'select' },
      description: 'Legend layout direction.',
    },
    legendPosition: {
      options: ['top-center', 'bottom-right'],
      control: { type: 'select' },
      description: 'Legend position relative to the chart. Defaults to top-center.',
    },
    xAxisLabel: {
      control: { type: 'text' },
      description: 'Optional horizontal label above the heatmap cells.',
    },
    yAxisLabel: {
      control: { type: 'text' },
      description: 'Optional vertical label beside the y-axis.',
    },
  },
};

const commitYears = Array.from({ length: 6 }, (_, index) => String(2021 + index));
const commitMonths = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const monthlyCommitsHeatmap = commitYears.flatMap((year) =>
  commitMonths.map((month) => ({
    x: month,
    y: year,
    value: Math.floor(Math.random() * 251),
  })),
);
const commitMonthTickFormatter = (value) => String(value).slice(0, 3);

const Template = (args) => ({
  components: { SdsHeatmapChart, SdsChartTooltipContent },
  setup() {
    return { args };
  },
  template: `
    <div class="overflow-x-auto">
      <sds-heatmap-chart v-bind="args">
        <template #tooltip="{ data }">
          <sds-chart-tooltip-content
            v-if="data"
            :title="data.x + ', ' + data.y"
            label="commits"
            :datapoint="data.value"
            :color="data.color"
          />
        </template>
      </sds-heatmap-chart>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  data: monthlyCommitsHeatmap,
  title: 'Monthly Commits by Year, 2021-2026',
  xAxisLabel: 'Month',
  yAxisLabel: 'Year',
  xTickValues: commitMonths,
  xTickFormatter: commitMonthTickFormatter,
  yTickValues: commitYears,
  legendPosition: 'bottom-right',
  showTooltip: true,
  showLegend: true,
};
Default.parameters = {
  docs: {
    description: {
      story: 'Generated monthly commit counts for 2021-2026, matching the reference guide. Month ticks use abbreviations; tooltips show the full month and year, a matching color swatch labelled commits, and the count. Sample values are regenerated when the story module loads.',
    },
  },
};