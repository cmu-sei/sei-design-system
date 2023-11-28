<template>
  <div
    data-id="sds-top-five-chart"
    class="space-y-4 chart"
  >
    <h3
      :class="{
        'text-lg font-light': smallHeading,
        'text-2xl font-light': !smallHeading,
      }"
    >
      {{ title }}
    </h3>
    <div v-if="results.length > 0">
      <ul class="space-y-6">
        <li
          v-for="(result, index) in results"
          :key="result.id"
        >
          <div class="flex">
            <div class="flex-grow">
              <div class="mb-2">
                <div
                  class="h-6 mr-2 rounded"
                  role="progressbar"
                  :title="`${result.count}`"
                  :aria-valuenow="result.count"
                  aria-valuemin="0"
                  :aria-valuemax="maxResultValue"
                  :style="{ width: `${resultValue(result.count)}%` }"
                  :class="[getProgressColor(index)]"
                >
                  <span
                    class="sr-only"
                  >{{ resultCountDisplay(result.count) }}
                    {{ result.title }}</span>
                </div>
              </div>
              <div class="text-sm font-semibold chart-label-section">
                {{ resultCountDisplay(result.count) }}
                &middot;
                <template v-if="!doNotLinkEntries">
                  <template v-if="resultHasUrl(result)">
                    <a
                      :href="result.url"
                      class="hover:underline focus:underline focus:outline-none"
                    >{{ result.title }}</a>
                  </template>
                  <template v-else>
                    <a
                      href="#"
                      class="hover:underline focus:underline focus:outline-none"
                      @click.prevent="resultClick(result)"
                    >{{ result.title }}</a>
                  </template>
                </template>
                <span v-else>{{ result.title }}</span>
              </div>
            </div>
          </div>
        </li>
        <li
          v-if="viewAllUrl !== null"
          class="mt-4"
        >
          <a
            :href="viewAllUrl"
            class="link link-primary link-cta"
          >
            View All
          </a>
        </li>
      </ul>
    </div>
    <div v-else>
      <p v-if="entriesHaveAllRequiredProps">
        {{ noDataMsg }}
      </p>
      <p v-else>
        {{ missingPropsMsg }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TopFiveChartResult {
  id: string | number
  count: number
  title: string
  url?: string
}

defineOptions({
  name: 'SdsTopFiveChart'
})

const props = defineProps({
  /**
   * The title of the chart.
   */
  title: {
    type: String,
    default: null,
  },
  /**
   * An array of objects. Each object must contain a unique "id" param and a "title" and "count" param. The "url" param is optional.
   *
   * If the "url" param is present, the entries display a regular clickable link. If the "url" param is not present,
   * and doNotLinkEntries is false, then the resultClick event is fired when an entry's clickable link is triggered.
   *
   * Example object: { id: 1, title: "Entry title", url: "https://seinet.sei.cmu.edu", count: 20 }
   */
  entries: {
    type: Array as PropType<TopFiveChartResult[]>,
    default: () => [],
  },
  /**
   * This prevents all entries from having a clickable link if set to true.
   */
  doNotLinkEntries: {
    type: Boolean,
    default: false,
  },
  /**
   * The url for the "View All" link. Hides the link if null or omitted.
   */
  viewAllUrl: {
    type: String,
    default: null,
  },
  /**
   * Determines the color of the progress bars.
   */
  variant: {
    type: String as PropType<'gray' | 'red' | 'green' | 'orange' | 'blue' | 'teal' | 'purple' | 'indigo' | 'pink'>,
    default: null,
  },
  /**
   * Displays a "%" character if true.
   */
  showPercent: {
    type: Boolean,
    default: false,
  },
  /**
   * Decreases the size of the chart title and makes it bold if true.
   */
  smallHeading: {
    type: Boolean,
    default: false,
  },
  /**
   * The message displayed when no entries data is available.
   */
  noDataMsg: {
    type: String,
    default: "There is no chart data to display at this time.",
  },
  /**
   * The message displayed when the entries data is missing the required "id", "title", or "count" params.
   */
  missingPropsMsg: {
    type: String,
    default:
      "The chart data is malformed and cannot be displayed at this time.",
  },
})

const emit = defineEmits(['result-click'])

const results = computed<TopFiveChartResult[]>(() => {
  // if entries are okay, only use at most 5 of them
  // otherwise, set the results to empty
  return entriesHaveAllRequiredProps.value ? props.entries.slice(0, 5) : [];
})

const entriesHaveAllRequiredProps = computed(() => {
  // ensure entries have id, title, and count
  if (props.entries.length < 1) return true;
  return props.entries.every((i) => {
    return (
      Object.prototype.hasOwnProperty.call(i, "id") &&
      Object.prototype.hasOwnProperty.call(i, "title") &&
      Object.prototype.hasOwnProperty.call(i, "count")
    );
  });
})

const maxResultValue = computed(() => {
  return Math.max.apply(
    Math,
    results.value.map((o: TopFiveChartResult) => o.count)
  );
})

const resultValue = (value: number) => {
  return (value * 100) / maxResultValue.value;
}

const resultCountDisplay = (count: number) => {
  return props.showPercent ? `${count}%` : count;
}

const resultHasUrl = (result: TopFiveChartResult) => {
  return typeof result.url !== "undefined";
}

const resultClick = (result: TopFiveChartResult) => {
  /**
   * Sends the object of the clicked result to the parent component.
   *
   * This only occurs when doNotLinkEntries is false and a clicked entry does not have a "url" param.
   */
  emit("result-click", result)
}

const getProgressColor = (index: number) => {
  switch (props.variant) {
    case "teal":
      if (index === 0) {
        return "bg-teal-900 dark:bg-teal-500"
      } else if (index === 1) {
        return "bg-teal-800 dark:bg-teal-400"
      } else if (index === 2) {
        return "bg-teal-700 dark:bg-teal-300"
      } else if (index === 3) {
        return "bg-teal-600 dark:bg-teal-200"
      } else if (index === 4) {
        return "bg-teal-500 dark:bg-teal-100"
      }
      break;
    case "red":
      if (index === 0) {
        return "bg-red-900 dark:bg-red-500"
      } else if (index === 1) {
        return "bg-red-800 dark:bg-red-400"
      } else if (index === 2) {
        return "bg-red-700 dark:bg-red-300"
      } else if (index === 3) {
        return "bg-red-600 dark:bg-red-200"
      } else if (index === 4) {
        return "bg-red-500 dark:bg-red-100"
      }
      break;
    case "gray":
      if (index === 0) {
        return "bg-gray-900 dark:bg-gray-500"
      } else if (index === 1) {
        return "bg-gray-800 dark:bg-gray-400"
      } else if (index === 2) {
        return "bg-gray-700 dark:bg-gray-300"
      } else if (index === 3) {
        return "bg-gray-600 dark:bg-gray-200"
      } else if (index === 4) {
        return "bg-gray-500 dark:bg-gray-100"
      }
      break;
    case "green":
      if (index === 0) {
        return "bg-green-900 dark:bg-green-500"
      } else if (index === 1) {
        return "bg-green-800 dark:bg-green-400"
      } else if (index === 2) {
        return "bg-green-700 dark:bg-green-300"
      } else if (index === 3) {
        return "bg-green-600 dark:bg-green-200"
      } else if (index === 4) {
        return "bg-green-500 dark:bg-green-100"
      }
      break;
    case "orange":
      if (index === 0) {
        return "bg-orange-900 dark:bg-orange-500"
      } else if (index === 1) {
        return "bg-orange-800 dark:bg-orange-400"
      } else if (index === 2) {
        return "bg-orange-700 dark:bg-orange-300"
      } else if (index === 3) {
        return "bg-orange-600 dark:bg-orange-200"
      } else if (index === 4) {
        return "bg-orange-500 dark:bg-orange-100"
      }
      break;
    case "pink":
      if (index === 0) {
        return "bg-pink-900 dark:bg-pink-500"
      } else if (index === 1) {
        return "bg-pink-800 dark:bg-pink-400"
      } else if (index === 2) {
        return "bg-pink-700 dark:bg-pink-300"
      } else if (index === 3) {
        return "bg-pink-600 dark:bg-pink-200"
      } else if (index === 4) {
        return "bg-pink-500 dark:bg-pink-100"
      }
      break;
    case "indigo":
      if (index === 0) {
        return "bg-indigo-900 dark:bg-indigo-500"
      } else if (index === 1) {
        return "bg-indigo-800 dark:bg-indigo-400"
      } else if (index === 2) {
        return "bg-indigo-700 dark:bg-indigo-300"
      } else if (index === 3) {
        return "bg-indigo-600 dark:bg-indigo-200"
      } else if (index === 4) {
        return "bg-indigo-500 dark:bg-indigo-100"
      }
      break;
    case "purple":
      if (index === 0) {
        return "bg-purple-900 dark:bg-purple-500"
      } else if (index === 1) {
        return "bg-purple-800 dark:bg-purple-400"
      } else if (index === 2) {
        return "bg-purple-700 dark:bg-purple-300"
      } else if (index === 3) {
        return "bg-purple-600 dark:bg-purple-200"
      } else if (index === 4) {
        return "bg-purple-500 dark:bg-purple-100"
      }
      break;
    case "blue":
    default:
      if (index === 0) {
        return "bg-blue-900 dark:bg-blue-500"
      } else if (index === 1) {
        return "bg-blue-800 dark:bg-blue-400"
      } else if (index === 2) {
        return "bg-blue-700 dark:bg-blue-300"
      } else if (index === 3) {
        return "bg-blue-600 dark:bg-blue-200"
      } else if (index === 4) {
        return "bg-blue-500 dark:bg-blue-100"
      }
      break;
  }
}
</script>
