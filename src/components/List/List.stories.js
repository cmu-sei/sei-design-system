import SdsList from './List.vue'
import SdsListItem from './ListItem.vue'
import SdsTimeline from '../Timeline/Timeline.vue'
import SdsTimelineItem from '../Timeline/TimelineItem.vue'
import SdsAvatar from '../Avatar/Avatar.vue'

export default {
  title: 'Components/Containers/List',
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
  components: { SdsList, SdsListItem, SdsTimeline, SdsTimelineItem, SdsAvatar },
  setup() {
    return { args }
  },
  template: `
    <sds-list v-bind="args">
      <sds-list-item
        title="Application review"
        marker-column-width="3rem"
      >
        <template #marker>
          <sds-avatar size="md" name="Application Review" />
        </template>
        <template #description>Track review work as it moves forward.</template>
        <sds-timeline>
          <sds-timeline-item title="Submitted" timestamp="09:00" />
          <sds-timeline-item title="Approved" timestamp="13:30" />
        </sds-timeline>
      </sds-list-item>
      <sds-list-item title="Supporting material">
        <template #marker>
          <sds-avatar size="xs" name="Quality Assurance" />
        </template>
        <template #description>Collect final documentation and decision notes.</template>
      </sds-list-item>
    </sds-list>
  `
})

export const Default = Template.bind({})
Default.args = {}