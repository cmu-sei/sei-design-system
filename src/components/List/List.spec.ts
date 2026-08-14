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
          <ListItem title="Application review">
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

  it('lets nested timelines inherit the list item marker column width', () => {
    const wrapper = mount(List, {
      global: {
        components: { ListItem, Timeline, TimelineItem }
      },
      slots: {
        default: `
          <ListItem title="Application review" marker-column-width="3rem">
            <template #marker>
              <span data-test="list-marker">AR</span>
            </template>
            <template #description>Track the review work as it moves forward.</template>
            <Timeline>
              <TimelineItem title="Submitted" timestamp="09:00">
                <template #marker><span>SU</span></template>
              </TimelineItem>
              <TimelineItem title="Approved" timestamp="13:30" />
            </Timeline>
          </ListItem>
        `
      }
    })

    expect(wrapper.find('[data-id="sds-list-item-marker"]').text()).toBe('AR')
    expect(wrapper.find('[data-id="sds-list-item"]').attributes('style')).toBe('--sds-list-item-marker-column-width: 3rem;')
    expect(wrapper.find('[data-id="sds-list-item-body"]').text()).toContain('Application review')
    expect(wrapper.find('[data-id="sds-list-item-body"]').classes()).not.toContain('self-center')
    expect(wrapper.find('[data-id="sds-list-item-content"]').find('[data-id="sds-timeline"]').attributes('style')).toBe('--sds-timeline-marker-column-width: 3rem;')
    expect(wrapper.find('[data-id="sds-list-item-content"]').classes()).toContain('col-span-2')
    expect(wrapper.find('[data-id="sds-list-item-content"]').classes()).toContain('mt-3')
  })

  it('spans custom content across the full item width when a marker is present', () => {
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
    expect(wrapper.find('[data-id="sds-list-item-content"]').classes()).toContain('col-span-2')
    expect(wrapper.find('[data-id="sds-list-item-content"]').classes()).not.toContain('col-start-2')
    expect(wrapper.find('[data-id="sds-list-item-content"]').classes()).toContain('mt-3')
  })

  it('automatically sizes the marker column when no width is provided', () => {
    const wrapper = mount(List, {
      global: {
        components: { ListItem }
      },
      slots: {
        default: {
          template: `
            <div style="--sds-list-item-marker-column-width: 4rem">
              <ListItem title="Supporting material">
                <template #marker><span data-test="list-marker">QA</span></template>
              </ListItem>
            </div>
          `,
          components: { ListItem }
        }
      }
    })

    const item = wrapper.find('[data-id="sds-list-item"]')

    expect(item.attributes('style')).toBe('--sds-list-item-marker-column-width: auto;')
    expect(item.classes()).toContain('grid-cols-[var(--sds-list-item-marker-column-width,auto)_1fr]')
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

  it('uses one marker and title treatment even when old styling props are present', () => {
    const wrapper = mount(List, {
      attrs: {
        markerSize: 'xl',
        titleSize: 'md'
      },
      global: {
        components: { ListItem }
      },
      slots: {
        default: `
          <ListItem title="Supporting material" marker-variant="gray">
            <template #marker>
              <span data-test="list-marker">QA</span>
            </template>
          </ListItem>
        `
      }
    })

    expect(wrapper.find('[data-id="sds-list-item-marker"]').classes()).not.toContain('h-12')
    expect(wrapper.find('[data-id="sds-list-item-marker"]').classes()).not.toContain('rounded-theme-sm')
    expect(wrapper.find('h3').classes()).toContain('text-sm')
    expect(wrapper.find('h3').classes()).toContain('font-semibold')
    expect(wrapper.find('h3').classes()).not.toContain('text-base')
  })

  it('uses slots instead of content shortcut props for additional item content', () => {
    const wrapper = mount(ListItem, {
      props: {
        contentTitle: 'Steering Committee Member',
        contentDescription: 'Since May 19, 2018',
        title: 'Symantec'
      }
    })

    expect(wrapper.text()).toContain('Symantec')
    expect(wrapper.text()).not.toContain('Steering Committee Member')
    expect(wrapper.text()).not.toContain('Since May 19, 2018')
    expect(wrapper.find('[data-id="sds-list-item-content"]').exists()).toBe(false)
  })
})