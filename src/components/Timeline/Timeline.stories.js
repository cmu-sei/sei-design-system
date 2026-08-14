import SdsTimeline from './Timeline.vue'
import SdsTimelineItem from './TimelineItem.vue'

export default {
  title: 'Components/Data Visualization/Timeline',
  parameters: {
    docs: {
      description: {
        component: 'A timeline displays ordered events along a vertical path with markers, timestamps, and flexible item content.',
      },
    },
  },
  component: SdsTimeline,
  argTypes: {
    orientation: {
      options: ['vertical', 'horizontal'],
      control: { type: 'select' },
    },
    markerColumnWidth: {
      control: 'text',
      description: 'Width reserved for the timeline marker column.',
    },
  },
}

const Template = (args) => ({
  components: { SdsTimeline, SdsTimelineItem },
  setup() {
    return { args }
  },
  template: `
    <sds-timeline v-bind="args">
      <sds-timeline-item title="Record status changed to Approved" timestamp="A moment ago" />
      <sds-timeline-item title="Final approval assigned to Maya Jankowski" timestamp="A moment ago" />
      <sds-timeline-item title="Documents uploaded by Daniel Lee" timestamp="A moment ago" />
    </sds-timeline>
  `
})

export const Default = Template.bind({})
Default.args = {
  markerColumnWidth: '1.5rem'
}

export const Collapsed = Template.bind({})
Collapsed.args = {
  collapseAfter: 2,
  markerColumnWidth: '1.5rem'
}

export const Horizontal = Template.bind({})
Horizontal.args = {
  orientation: 'horizontal'
}

export const CurrentEvent = () => ({
  components: { SdsTimeline, SdsTimelineItem },
  template: `
    <sds-timeline>
      <sds-timeline-item
        current
        subtitle="Final review"
        description="The final review is complete."
        datetime="2026-08-13T09:00:00Z"
      >
        <template #title>
          <a href="/records/approved" class="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200">
            Record status changed to Approved
          </a>
        </template>
        <template #timestamp>A moment ago</template>
      </sds-timeline-item>
    </sds-timeline>
  `
})