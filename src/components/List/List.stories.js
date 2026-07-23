import SdsList from './List.vue'
import SdsListItem from './ListItem.vue'
import SdsTimeline from '../Timeline/Timeline.vue'
import SdsTimelineItem from '../Timeline/TimelineItem.vue'

export default {
  title: 'Components/Data Display/List',
  parameters: {
    docs: {
      description: {
        component: 'A list groups related items and leaves each item open for rich nested content.',
      },
    },
  },
  component: SdsList,
}

const Template = (args) => ({
  components: { SdsList, SdsListItem, SdsTimeline, SdsTimelineItem },
  setup() {
    return { args }
  },
  template: `
    <sds-list v-bind="args">
      <sds-list-item title="Application review">
        <template #marker>
          <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-[10px] font-bold leading-none text-green-700">AR</span>
        </template>
        <template #description>Track review work as it moves forward.</template>
        <sds-timeline class="mt-4">
          <sds-timeline-item title="Submitted" timestamp="09:00" />
          <sds-timeline-item title="Approved" timestamp="13:30" />
        </sds-timeline>
      </sds-list-item>
      <sds-list-item title="Supporting material">
        <template #marker>
          <span class="inline-flex h-6 w-6 items-center justify-center rounded-theme-sm border border-blue-600 bg-blue-25 text-[10px] font-bold leading-none text-blue-700">QA</span>
        </template>
        <template #description>Collect final documentation and decision notes.</template>
      </sds-list-item>
    </sds-list>
  `
})

export const Default = Template.bind({})
Default.args = {}

export const MarkerVariants = (args) => ({
  components: { SdsList, SdsListItem },
  setup() {
    return { args }
  },
  template: `
    <sds-list v-bind="args">
      <sds-list-item title="Avatar marker">
        <template #marker>
          <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold leading-none text-blue-700">SE</span>
        </template>
        <template #description>Use an avatar-style marker for people.</template>
      </sds-list-item>
      <sds-list-item title="Image marker">
        <template #marker>
          <img src="https://picsum.photos/seed/list-story-marker/48/48" alt="" class="h-6 w-6 rounded-full object-cover" />
        </template>
        <template #description>Use an image marker for external entities.</template>
      </sds-list-item>
      <sds-list-item title="Icon marker">
        <template #marker>
          <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-green-700">
            <svg aria-hidden="true" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.31a1 1 0 0 1-1.42 0L3.29 9.225a1 1 0 1 1 1.42-1.408l4.04 4.073 6.54-6.594a1 1 0 0 1 1.414-.006Z" clip-rule="evenodd" />
            </svg>
          </span>
        </template>
        <template #description>Use an icon marker for statuses or actions.</template>
      </sds-list-item>
    </sds-list>
  `
})
MarkerVariants.args = {}