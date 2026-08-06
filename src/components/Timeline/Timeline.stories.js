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