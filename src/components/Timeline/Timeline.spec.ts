import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Timeline from './Timeline.vue'
import TimelineItem from './TimelineItem.vue'

describe('Timeline', () => {
  it('renders timeline items in chronological order with their core content', () => {
    const wrapper = mount(Timeline, {
      global: {
        components: { TimelineItem }
      },
      slots: {
        default: `
          <TimelineItem title="Request received" timestamp="09:00" marker-label="Completed">
            <template #description>Application entered the review queue.</template>
          </TimelineItem>
          <TimelineItem title="Analyst assigned" timestamp="10:15" marker-label="Current">
            <template #description>Ownership moved to the intake analyst.</template>
          </TimelineItem>
        `
      }
    })

    const items = wrapper.findAll('[data-id="sds-timeline-item"]')

    expect(wrapper.find('[data-id="sds-timeline"]').attributes('role')).toBe('list')
    expect(items).toHaveLength(2)
    expect(items[0].text()).toContain('Request received')
    expect(items[0].text()).toContain('09:00')
    expect(items[0].text()).toContain('Application entered the review queue.')
    expect(items[0].find('[aria-label="Completed"]').exists()).toBe(true)
    expect(items[1].text()).toContain('Analyst assigned')
    expect(items[1].text()).toContain('10:15')
    expect(items[1].text()).toContain('Ownership moved to the intake analyst.')
    expect(items.map(item => item.find('[data-id="sds-timeline-item-title"]').text())).toEqual([
      'Request received',
      'Analyst assigned'
    ])
  })

  it('emits navigate when a navigable marker or title is activated', async () => {
    const wrapper = mount(TimelineItem, {
      props: {
        markerLabel: 'Open request event',
        navigable: true,
        title: 'Request received'
      },
      slots: {
        marker: '<span data-test="custom-marker">✓</span>'
      }
    })

    await wrapper.find('[data-id="sds-timeline-item-marker-button"]').trigger('click')
    await wrapper.find('[data-id="sds-timeline-item-title-button"]').trigger('click')

    expect(wrapper.find('[data-test="custom-marker"]').exists()).toBe(true)
    expect(wrapper.emitted('navigate')).toEqual([
      [{ source: 'marker' }],
      [{ source: 'title' }]
    ])
  })

  it('labels custom non-navigable markers without rendering an empty description', () => {
    const wrapper = mount(TimelineItem, {
      props: {
        markerLabel: 'Approved event',
        title: 'Approved'
      },
      slots: {
        marker: '<span data-test="custom-marker">✓</span>'
      }
    })

    expect(wrapper.find('[data-id="sds-timeline-item-marker"]').attributes('aria-label')).toBe('Approved event')
    expect(wrapper.find('[data-test="custom-marker"]').exists()).toBe(true)
    expect(wrapper.find('[data-id="sds-timeline-item"] .mt-1.text-sm.leading-5').exists()).toBe(false)
  })

  it.each([
    ['gray', 'bg-gray-200'],
    ['blue', 'bg-blue-600'],
    ['green', 'bg-green-500'],
    ['orange', 'bg-orange-500'],
    ['red', 'bg-red-600']
  ] as const)('renders the %s default marker variant', (variant, expectedClass) => {
    const wrapper = mount(TimelineItem, {
      props: {
        navigable: true,
        title: 'Request received',
        variant
      }
    })

    expect(wrapper.find('[data-id="sds-timeline-item-marker-dot"]').classes()).toContain(expectedClass)
  })

  it('collapses middle timeline items until the user expands the timeline', async () => {
    const wrapper = mount(Timeline, {
      props: {
        collapseAfter: 3
      },
      global: {
        components: { TimelineItem }
      },
      slots: {
        default: `
          <TimelineItem title="Created" />
          <TimelineItem title="Submitted" />
          <TimelineItem title="Reviewed" />
          <TimelineItem title="Approved" />
        `
      }
    })

    expect(wrapper.text()).toContain('Created')
    expect(wrapper.text()).toContain('Submitted')
    expect(wrapper.text()).not.toContain('Reviewed')
    expect(wrapper.text()).toContain('Approved')
    expect(wrapper.find('button').text()).toBe('Show 1 more')
    expect(wrapper.find('[data-id="sds-timeline-collapse"]').attributes('role')).toBe('listitem')

    const visibleItems = wrapper.findAll('[data-id="sds-timeline-item"]')
    const approvedMarkerColumn = visibleItems[2].element.children[0]
    expect([...approvedMarkerColumn.children].some(child => child.classList.contains('w-0.5'))).toBe(false)

    await wrapper.find('button').trigger('click')

    expect(wrapper.text()).toContain('Reviewed')
  })

  it('reserves a larger marker column when configured for larger markers', () => {
    const wrapper = mount(Timeline, {
      props: {
        markerSize: 'lg'
      },
      global: {
        components: { TimelineItem }
      },
      slots: {
        default: '<TimelineItem title="Maya Jankowski" />'
      }
    })

    expect(wrapper.find('[data-id="sds-timeline"]').classes()).toContain('grid-cols-[2.5rem_1fr]')
  })
})