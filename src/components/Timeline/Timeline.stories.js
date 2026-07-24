import { action } from 'storybook/actions'
import SdsTimeline from './Timeline.vue'
import SdsTimelineItem from './TimelineItem.vue'
import SdsAvatar from '../Avatar/Avatar.vue'

export default {
  title: 'Components/Containers/Timeline',
  parameters: {
    docs: {
      description: {
        component: 'A timeline displays ordered events along a vertical path with markers, timestamps, and flexible item content.',
      },
    },
  },
  component: SdsTimeline,
}

const Template = (args) => ({
  components: { SdsTimeline, SdsTimelineItem },
  setup() {
    return { args }
  },
  template: `
    <sds-timeline v-bind="args">
      <sds-timeline-item title="Record status changed to Approved" timestamp="A moment ago" marker-label="Approved">
        <template #marker>
          <span class="inline-flex h-6 w-6 items-center justify-center rounded-full text-green-600">
            <svg aria-hidden="true" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.86-9.88a.75.75 0 0 0-1.22-.87l-3.2 4.48-1.6-1.6a.75.75 0 1 0-1.06 1.06l2.23 2.23a.75.75 0 0 0 1.14-.1l3.71-5.2Z" clip-rule="evenodd" />
            </svg>
          </span>
        </template>
      </sds-timeline-item>
      <sds-timeline-item title="Final approval assigned to Maya Jankowski" timestamp="A moment ago" marker-label="Assigned">
        <template #marker>
          <span class="inline-flex h-6 w-6 items-center justify-center rounded-full text-pink-600">
            <svg aria-hidden="true" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3.75a.75.75 0 0 1 .75.75v4.75h4.75a.75.75 0 0 1 0 1.5h-4.75v4.75a.75.75 0 0 1-1.5 0v-4.75H4.5a.75.75 0 0 1 0-1.5h4.75V4.5a.75.75 0 0 1 .75-.75Z" />
            </svg>
          </span>
        </template>
      </sds-timeline-item>
      <sds-timeline-item title="Documents uploaded by Daniel Lee" timestamp="A moment ago" marker-label="Documents uploaded">
        <template #marker>
          <span class="inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-500">
            <svg aria-hidden="true" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4.75 3A1.75 1.75 0 0 0 3 4.75v10.5C3 16.22 3.78 17 4.75 17h10.5c.97 0 1.75-.78 1.75-1.75V7.06c0-.46-.18-.9-.51-1.23L14.17 3.5A1.75 1.75 0 0 0 12.94 3H4.75Zm8 1.5c.07 0 .13.03.18.07l2.5 2.5c.04.05.07.11.07.18V15.25c0 .14-.11.25-.25.25H4.75a.25.25 0 0 1-.25-.25V4.75c0-.14.11-.25.25-.25h8Z" />
            </svg>
          </span>
        </template>
      </sds-timeline-item>
    </sds-timeline>
  `
})

export const Default = Template.bind({})
Default.args = {}

export const CustomMarkers = (args) => ({
  components: { SdsTimeline, SdsTimelineItem, SdsAvatar },
  setup() {
    return { args }
  },
  template: `
    <sds-timeline v-bind="args">
      <sds-timeline-item title="Maya Jankowski" timestamp="A moment ago" marker-label="Maya Jankowski comment">
        <template #marker>
          <sds-avatar size="xs" shape="circle" name="Maya Jankowski" variant="orange" />
        </template>
        <template #description>I think we can close this out now that the missing attachment was added.</template>
      </sds-timeline-item>
      <sds-timeline-item title="Synergistic Software" timestamp="Engineering Team Lead" marker-label="Synergistic Software">
        <template #marker>
          <span class="inline-flex h-6 w-6 items-center justify-center rounded-theme-sm bg-gray-900 text-[10px] font-bold leading-none text-white">SS</span>
        </template>
        <template #description>Managing a team of 12 engineers.</template>
      </sds-timeline-item>
    </sds-timeline>
  `
})
CustomMarkers.args = {}

export const MarkerVariants = () => ({
  components: { SdsTimeline, SdsTimelineItem },
  template: `
    <sds-timeline>
      <sds-timeline-item title="Gray marker" variant="gray" />
      <sds-timeline-item title="Blue marker" variant="blue" />
      <sds-timeline-item title="Green marker" variant="green" />
      <sds-timeline-item title="Orange marker" variant="orange" />
      <sds-timeline-item title="Red marker" variant="red" />
    </sds-timeline>
  `
})

export const Navigable = (args) => ({
  components: { SdsTimeline, SdsTimelineItem },
  setup() {
    return { args }
  },
  template: `
    <sds-timeline v-bind="args">
      <sds-timeline-item navigable title="Open intake event" timestamp="09:00" marker-label="Open intake event" @navigate="onNavigate">
        <template #description>Activating the marker or title emits a navigate event.</template>
      </sds-timeline-item>
    </sds-timeline>
  `,
  methods: {
    onNavigate: action('navigate')
  }
})
Navigable.args = {}

export const Collapsed = Template.bind({})
Collapsed.args = {
  collapseAfter: 2
}