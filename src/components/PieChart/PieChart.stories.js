import SdsPieChart from './PieChart.vue';
import { useDarkMode } from '../../composables/useDarkMode';
import { formatPercent, resolveItemColor } from '../../helpers/charts';

export default {
  title: 'Components/Data Visualization/Pie Chart',
  parameters: {
    docs: {
      description: {
        component: 'A pie chart visualizes proportional data as slices of a circle. Use it to show part-to-whole relationships across a small number of categories.',
      },
    },
  },
  component: SdsPieChart,
  argTypes: {
    labelType: {
      options: ['value', 'label', 'both'],
      control: { type: 'select' },
    },
    legendOrientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'select' },
    },
    legendPosition: {
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
      control: { type: 'select' },
    },
  },
};

const slices = [
  { label: 'Chrome', value: 65.8 },
  { label: 'Safari', value: 18.2 },
  { label: 'Edge', value: 5.0 },
  { label: 'Firefox', value: 2.7 },
  { label: 'Samsung Internet', value: 2.5 },
  { label: 'Opera', value: 2.2 },
  { label: 'Brave', value: 1.5 },
  { label: 'Others', value: 2.1 },
];

const Template = (args) => ({
  components: { SdsPieChart },
  setup() {
    return { args };
  },
  template: `
    <sds-pie-chart v-bind="args" />
  `,
});

export const Default = Template.bind({});
Default.args = {
  slices,
  title: 'Browser Market Share',
  showTooltip: true,
  tooltipValueFormat: formatPercent,
  showLegend: true,
  showLabels: true,
  labelType: 'both',
  innerRadius: 0,
  height: 360,
  legendOrientation: 'horizontal',
  legendPosition: 'bottom-left',
};

export const Donut = Template.bind({});
Donut.args = {
  ...Default.args,
  innerRadius: 80,
};
Donut.parameters = {
  docs: {
    description: {
      story: 'Setting innerRadius creates a donut chart by cutting a hole in the center of the pie.',
    },
  },
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  ...Default.args,
  slices: [
    { label: 'Chrome', value: 65.8, color: { light: '#4e79a7', dark: '#7fb3d3' } },
    { label: 'Safari', value: 18.2, color: { light: '#f28e2b', dark: '#f7b97e' } },
    { label: 'Edge', value: 5.0, color: { light: '#e15759', dark: '#f0a0a1' } },
    { label: 'Firefox', value: 2.7, color: { light: '#76b7b2', dark: '#aad5d2' } },
    { label: 'Samsung Internet', value: 2.5, color: { light: '#59a14f', dark: '#96c990' } },
    { label: 'Opera', value: 2.2, color: { light: '#edc948', dark: '#f5df8e' } },
    { label: 'Brave', value: 1.5, color: { light: '#b07aa1', dark: '#d0afc6' } },
    { label: 'Others', value: 2.1, color: { light: '#ff9da7', dark: '#ffc8cd' } },
  ],
};
CustomColors.parameters = {
  docs: {
    description: {
      story: 'Override individual slice colors with explicit light/dark values using the color property on each slice.',
    },
  },
};

export const AspectRatio = Template.bind({});
AspectRatio.args = {
  ...Default.args,
  aspectRatio: 2,
  height: undefined,
};
AspectRatio.parameters = {
  docs: {
    description: {
      story: 'Use aspectRatio to derive height from the container width instead of a fixed pixel height.',
    },
  },
};

const CustomLegendTemplate = (args) => ({
  components: { SdsPieChart },
  setup() {
    return { args };
  },
  template: `
    <sds-pie-chart v-bind="args">
      <template #legend="{ items: legendItems, hoveredIndex, updateHoveredIndex }">
        <table class="w-full text-sm border-collapse text-gray-900 dark:text-gray-100">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="py-1 text-left font-semibold">Browser</th>
              <th class="py-1 text-right font-semibold">Share</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) in legendItems"
              :key="item.label"
              :class="hoveredIndex !== null && hoveredIndex !== i ? 'opacity-40' : 'opacity-100'"
              class="border-b border-gray-100 dark:border-gray-800 cursor-pointer"
              @mouseenter="updateHoveredIndex(i)"
              @mouseleave="updateHoveredIndex(null)"
            >
              <td class="py-1 flex items-center gap-2">
                <span
                  class="inline-block h-3 w-3 rounded-md shrink-0"
                  :style="{ backgroundColor: item.color }"
                  aria-hidden="true"
                />
                {{ item.label }}
              </td>
              <td class="py-1 text-right tabular-nums">
                {{ item.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </sds-pie-chart>
  `,
});

export const CustomLegendSlot = CustomLegendTemplate.bind({});
CustomLegendSlot.args = {
  ...Default.args,
  slices: [
    { label: 'Chrome', value: 65.8, color: { light: '#4e79a7', dark: '#7fb3d3' } },
    { label: 'Safari', value: 18.2, color: { light: '#f28e2b', dark: '#f7b97e' } },
    { label: 'Edge', value: 5.0, color: { light: '#e15759', dark: '#f0a0a1' } },
    { label: 'Firefox', value: 2.7, color: { light: '#76b7b2', dark: '#aad5d2' } },
    { label: 'Samsung Internet', value: 2.5, color: { light: '#59a14f', dark: '#96c990' } },
    { label: 'Opera', value: 2.2, color: { light: '#edc948', dark: '#f5df8e' } },
    { label: 'Brave', value: 1.5, color: { light: '#b07aa1', dark: '#d0afc6' } },
    { label: 'Others', value: 2.1, color: { light: '#ff9da7', dark: '#ffc8cd' } },
  ],
};
CustomLegendSlot.parameters = {
  docs: {
    description: {
      story: 'Override the #legend slot to provide a fully custom legend layout. The slot exposes items, hoveredIndex, and updateHoveredIndex for interactive hover sync.',
    },
  },
};

const CustomTooltipTemplate = (args) => ({
  components: { SdsPieChart },
  setup() {
    const isDark = useDarkMode();
    return { args, isDark, resolveItemColor };
  },
  template: `
    <sds-pie-chart v-bind="args">
      <template #tooltip="{ data }">
        <div v-if="data" class="flex items-center gap-2">
          <span
            class="inline-block h-2.5 w-2.5 rounded-full shrink-0"
            :style="{ backgroundColor: resolveItemColor(data.color, isDark) }"
          />
          <span class="font-semibold">{{ data.label }}</span>
          <span class="text-gray-600">{{ data.value }}%</span>
        </div>
      </template>
    </sds-pie-chart>
  `,
});

export const CustomTooltipSlot = CustomTooltipTemplate.bind({});
CustomTooltipSlot.args = {
  ...Default.args,
  slices: [
    { label: 'Chrome', value: 65.8, color: { light: '#4e79a7', dark: '#7fb3d3' } },
    { label: 'Safari', value: 18.2, color: { light: '#f28e2b', dark: '#f7b97e' } },
    { label: 'Edge', value: 5.0, color: { light: '#e15759', dark: '#f0a0a1' } },
    { label: 'Firefox', value: 2.7, color: { light: '#76b7b2', dark: '#aad5d2' } },
    { label: 'Samsung Internet', value: 2.5, color: { light: '#59a14f', dark: '#96c990' } },
    { label: 'Opera', value: 2.2, color: { light: '#edc948', dark: '#f5df8e' } },
    { label: 'Brave', value: 1.5, color: { light: '#b07aa1', dark: '#d0afc6' } },
    { label: 'Others', value: 2.1, color: { light: '#ff9da7', dark: '#ffc8cd' } },
  ],
};
CustomTooltipSlot.parameters = {
  docs: {
    description: {
      story: 'Override the #tooltip slot to customize what appears on hover. The slot receives the hovered slice\'s data object and a formatValue function.',
    },
  },
};
