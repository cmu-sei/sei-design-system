import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import List from './List.vue'
import ListItem from './ListItem.vue'
import Timeline from '../Timeline/Timeline.vue'
import TimelineItem from '../Timeline/TimelineItem.vue'

describe('List', () => {
  it('renders list items with custom content such as an embedded timeline', () => {
    const wrapper = mount(List, {
      global: {
        components: { ListItem, Timeline, TimelineItem }
      },
      slots: {
        default: `
          <ListItem title="Application review" content-layout="full">
            <template #description>Track the review work as it moves forward.</template>
            <Timeline>
              <TimelineItem title="Submitted" timestamp="09:00" />
              <TimelineItem title="Approved" timestamp="13:30" />
            </Timeline>
          </ListItem>
        `
      }
    })

    expect(wrapper.find('[data-id="sds-list"]').attributes('role')).toBe('list')
    expect(wrapper.find('[data-id="sds-list-item"]').attributes('role')).toBe('listitem')
    expect(wrapper.text()).toContain('Application review')
    expect(wrapper.text()).toContain('Track the review work as it moves forward.')
    expect(wrapper.find('[data-id="sds-timeline"]').exists()).toBe(true)
    expect(wrapper.findAll('[data-id="sds-timeline-item"]')).toHaveLength(2)
  })

  it('renders list item markers while letting nested timelines align with the list edge', () => {
    const wrapper = mount(List, {
      global: {
        components: { ListItem, Timeline, TimelineItem }
      },
      slots: {
        default: `
          <ListItem title="Application review" content-layout="full">
            <template #marker>
              <span data-test="list-marker">AR</span>
            </template>
            <template #description>Track the review work as it moves forward.</template>
            <Timeline>
              <TimelineItem title="Submitted" timestamp="09:00" />
              <TimelineItem title="Approved" timestamp="13:30" />
            </Timeline>
          </ListItem>
        `
      }
    })

    expect(wrapper.find('[data-id="sds-list-item-marker"]').text()).toBe('AR')
    expect(wrapper.find('[data-id="sds-list-item-body"]').text()).toContain('Application review')
    expect(wrapper.find('[data-id="sds-list-item-body"]').classes()).not.toContain('self-center')
    expect(wrapper.find('[data-id="sds-list-item-content"]').find('[data-id="sds-timeline"]').exists()).toBe(true)
    expect(wrapper.find('[data-id="sds-list-item-content"]').classes()).toContain('col-span-2')
    expect(wrapper.find('[data-id="sds-list-item-content"]').classes()).toContain('mt-3')
  })

  it('aligns custom content with the body column by default when a marker is present', () => {
    const wrapper = mount(List, {
      global: {
        components: { ListItem }
      },
      slots: {
        default: `
          <ListItem title="Symantec">
            <template #marker>
              <span data-test="list-marker">SY</span>
            </template>
            <div>Steering Committee Member</div>
          </ListItem>
        `
      }
    })

    expect(wrapper.find('[data-id="sds-list-item-body"]').classes()).toContain('self-center')
    expect(wrapper.find('[data-id="sds-list-item-content"]').classes()).toContain('col-start-2')
    expect(wrapper.find('[data-id="sds-list-item-content"]').classes()).not.toContain('col-span-2')
    expect(wrapper.find('[data-id="sds-list-item-content"]').classes()).toContain('mt-3')
  })

  it('does not render an empty content row when a list item only has marker and body content', () => {
    const wrapper = mount(List, {
      global: {
        components: { ListItem }
      },
      slots: {
        default: `
          <ListItem title="Supporting material">
            <template #marker>
              <span data-test="list-marker">QA</span>
            </template>
            <template #description>Collect final documentation and decision notes.</template>
          </ListItem>
        `
      }
    })

    expect(wrapper.find('[data-id="sds-list-item-content"]').exists()).toBe(false)
    expect(wrapper.find('[data-id="sds-list-item-body"]').classes()).not.toContain('mb-3')
  })
})