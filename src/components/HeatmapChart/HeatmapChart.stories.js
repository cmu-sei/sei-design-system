import SdsHeatmapChart from './HeatmapChart.vue';
import { heatmapColors, heatmapColorsDark } from '../../helpers/charts/colors';

export default {
  title: 'Components/Data Visualization/Heatmap Chart',
  parameters: {
    docs: {
      description: {
        component: 'A heatmap chart visualizes values across two discrete dimensions using color intensity. Use it to compare distribution patterns by category and time.',
      },
    },
  },
  component: SdsHeatmapChart,
};

const taxiWeekdayShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const taxiWeekdayFull = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const taxiHourKeys = Array.from({ length: 24 }, (_, hour) => `H${String(hour).padStart(2, '0')}`);

const taxiPickupsByDayHour = {
  Mon: [
    70543, 40644, 27867, 22892, 29513, 42540, 71105, 106138, 129753, 111151, 96493, 91438,
    93572, 97182, 106882, 110252, 113306, 125956, 134117, 123662, 113840, 107291, 96915,
    77738,
  ],
  Tue: [
    51085, 27922, 19257, 16924, 24463, 40877, 75202, 120084, 150780, 128400, 104595, 96331,
    96530, 100883, 111484, 116738, 123546, 142042, 153740, 144662, 135578, 128582, 119990,
    95559,
  ],
  Wed: [
    60553, 34396, 22475, 18922, 25887, 41196, 73467, 118935, 149330, 127547, 103596, 95445,
    96557, 97428, 112647, 122064, 126028, 142178, 152460, 143836, 134547, 130878, 120068,
    96137,
  ],
  Thu: [
    61596, 35868, 24016, 20662, 28281, 42957, 76638, 123253, 150338, 126613, 105522, 99363,
    100603, 105119, 118755, 129294, 134656, 150818, 163258, 156809, 144673, 140861, 135843,
    114820,
  ],
  Fri: [
    80609, 51787, 35413, 28169, 33432, 45512, 76487, 122314, 148040, 131344, 113509, 109038,
    115446, 126602, 134762, 140197, 150725, 175077, 196472, 205223, 188444, 177906, 185364,
    183246,
  ],
  Sat: [
    157361, 121231, 92575, 69131, 52644, 41522, 52871, 66786, 86336, 106639, 119921, 129927,
    136351, 140859, 140692, 142199, 149527, 167530, 192005, 201746, 186515, 178861, 190049,
    192768,
  ],
  Sun: [
    171340, 138066, 106739, 80775, 60858, 42710, 48657, 56534, 66360, 84715, 105393, 116021,
    120204, 123957, 125732, 125045, 128832, 137898, 148851, 130575, 117127, 119998, 123186,
    106997,
  ],
};

const formatHourLabel = (hour) => {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const normalizedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${normalizedHour}:00 ${suffix}`;
};

const buildTaxiPickupDatasetFromRealData = () => {
  const cells = [];

  for (let dayIndex = 0; dayIndex < taxiWeekdayShort.length; dayIndex += 1) {
    const dayKey = taxiWeekdayShort[dayIndex] ?? 'Mon';
    const dayValues = taxiPickupsByDayHour[dayKey] ?? [];
    for (let hour = 0; hour < 24; hour += 1) {
      cells.push({
        x: taxiHourKeys[hour] ?? 'H00',
        y: dayKey,
        value: dayValues[hour] ?? 0,
        hourLabel: formatHourLabel(hour),
        weekdayFull: taxiWeekdayFull[dayIndex] ?? 'Monday',
      });
    }
  }

  return cells;
};

const taxiPickupsHeatmap = buildTaxiPickupDatasetFromRealData();
const taxiPickupsBins = {
  light: heatmapColors.slice(0, 5),
  dark: heatmapColorsDark.slice(0, 5),
};
const customBins = {
  light: ['#fff7ec', '#fee8c8', '#fdbb84', '#fc8d59', '#d7301f'],
  dark: ['#4a2a17', '#72401f', '#a45a22', '#d7782e', '#f39b54'],
};

const hourTickValues = taxiHourKeys.filter((_, index) => index % 2 === 0);
const hourTickFormatter = (value) => `${String(value).slice(1)}:00`;
const taxiYTickFormatter = (value) => String(value);
const formatTaxiPickupTooltip = (data) => {
  if (!data) return '';
  return `${data.value.toLocaleString()} pickups on ${data.weekdayFull} at ${data.hourLabel} (Feb 2023)`;
};

function formatRangeValue(value) {
  if (Number.isInteger(value)) {
    // Format integers with commas (e.g., 1234567 → "1,234,567")
    return new Intl.NumberFormat('en-US').format(value);
  }

  const abs = Math.abs(value);
  const fractionDigits = abs >= 10 ? 1 : 2;

  // Format with the calculated precision, using fixed notation (no scientific)
  const formatted = value.toFixed(fractionDigits);
  
  // Remove trailing zeros in decimal part (your original logic preserved)
  const cleaned = formatted
    .replace(/\.0+$/, '')      // e.g., "12.00" → "12"
    .replace(/(\.\d*[1-9])0+$/, '$1'); // e.g., "12.30" → "12.3"

  // If it's now an integer (no decimal), format with commas
  if (!cleaned.includes('.')) {
    return new Intl.NumberFormat('en-US').format(Number(cleaned));
  }

  // Otherwise, split integer & fractional parts, format integer, recombine
  const [integerPart, fractionalPart] = cleaned.split('.');
  const formattedInteger = new Intl.NumberFormat('en-US').format(Number(integerPart));
  return `${formattedInteger}.${fractionalPart}`;
}

function getRangeStart(item) {
  return item.range ? formatRangeValue(item.range[0]) : item.label.split(' - ')[0] ?? item.label;
}

const Template = (args) => ({
  components: { SdsHeatmapChart },
  setup() {
    return { args, formatTaxiPickupTooltip };
  },
  template: `
    <div class="overflow-x-auto">
      <sds-heatmap-chart v-bind="args" class="min-w-5xl">
        <template #tooltip="{ data }">
          <p v-if="data" class="text-xs whitespace-nowrap font-semibold">
            {{ formatTaxiPickupTooltip(data) }}
          </p>
        </template>
      </sds-heatmap-chart>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  data: taxiPickupsHeatmap,
  colors: taxiPickupsBins,
  title: 'NYC Ride-Share Pickups by Hour and Day',
  xTickValues: hourTickValues,
  xTickFormatter: hourTickFormatter,
  yTickValues: taxiWeekdayShort,
  yTickFormatter: taxiYTickFormatter,
  squareCells: false,
  showTooltip: true,
  showLegend: true,
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  ...Default.args,
  colors: customBins,
  title: 'NYC Ride-Share Pickups with Custom Bins',
};
CustomColors.parameters = {
  docs: {
    description: {
      story: 'Use the colors prop to override low-to-high bins with explicit light and dark palettes.',
    },
  },
};

const CustomLegendTemplate = (args) => ({
  components: { SdsHeatmapChart },
  setup() {
    return { args, formatTaxiPickupTooltip, getRangeStart };
  },
  template: `
    <div class="overflow-x-auto">
      <sds-heatmap-chart v-bind="args" class="min-w-5xl">
        <template #tooltip="{ data }">
          <p v-if="data" class="text-xs whitespace-nowrap font-semibold">
            {{ formatTaxiPickupTooltip(data) }}
          </p>
        </template>
        <template #legend="{ items: legendItems, hoveredIndex, updateHoveredIndex }">
          <div class="flex flex-col items-center w-full select-none">
            <div class="flex flex-row items-end justify-center gap-1">
              <SdsTooltip
                v-for="(item, i) in legendItems"
                :key="'tooltip-' + i"
                size="auto"
                type="light"
              >
                <template #trigger>
                  <button
                    type="button"
                    class="h-4 w-10 p-0 transition-opacity border border-gray-300 dark:border-gray-600"
                    :class="hoveredIndex !== null && hoveredIndex !== i ? 'opacity-40' : 'opacity-100'"
                    :style="{ backgroundColor: item.color }"
                    :aria-label="'Range ' + item.label"
                    @mouseenter="updateHoveredIndex(i)"
                    @mouseleave="updateHoveredIndex(null)"
                  />
                </template>
                <span>>= {{ getRangeStart(item) }}</span>
              </sdsTooltip>
            </div>
          </div>
        </template>
      </sds-heatmap-chart>
    </div>
  `,
});

export const CustomLegendSlot = CustomLegendTemplate.bind({});
CustomLegendSlot.args = {
  ...Default.args,
  title: 'NYC Ride-Share Pickups with Custom Legend Slot',
};
CustomLegendSlot.parameters = {
  docs: {
    description: {
      story: 'Override the #legend slot to provide a custom legend layout while preserving hover synchronization.',
    },
  },
};

const CustomTooltipTemplate = (args) => ({
  components: { SdsHeatmapChart },
  setup() {
    return { args, formatTaxiPickupTooltip };
  },
  template: `
    <div class="overflow-x-auto">
      <sds-heatmap-chart v-bind="args" class="min-w-5xl">
        <template #tooltip="{ data }">
          <div v-if="data" class="flex items-center gap-2">
            <span
              class="inline-block h-3.5 w-3.5 shrink-0"
              :style="{ backgroundColor: data.color }"
            />
            <span class="text-xs whitespace-nowrap font-semibold">
              {{ formatTaxiPickupTooltip(data) }}
            </span>
          </div>
        </template>
      </sds-heatmap-chart>
    </div>
  `,
});

export const CustomTooltipSlot = CustomTooltipTemplate.bind({});
CustomTooltipSlot.args = {
  ...Default.args,
  title: 'NYC Ride-Share Pickups with Custom Tooltip Slot',
};
CustomTooltipSlot.parameters = {
  docs: {
    description: {
      story: 'Override the #tooltip slot to control tooltip content using the hovered data payload.',
    },
  },
};