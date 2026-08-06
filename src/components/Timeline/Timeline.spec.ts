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
          <TimelineItem title="Request received" timestamp="09:00">
            <template #description>Application entered the review queue.</template>
          </TimelineItem>
          <TimelineItem title="Analyst assigned" timestamp="10:15">
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
    expect(items[1].text()).toContain('Analyst assigned')
    expect(items[1].text()).toContain('10:15')
    expect(items[1].text()).toContain('Ownership moved to the intake analyst.')
    expect(items.map(item => item.find('[data-id="sds-timeline-item-title"]').text())).toEqual([
      'Request received',
      'Analyst assigned'
    ])
  })

  it('renders timeline items as static content even when old navigable attrs are present', () => {
    const wrapper = mount(TimelineItem, {
      attrs: {
        navigable: true
      },
      props: {
        title: 'Request received'
      },
      slots: {
        marker: '<span data-test="custom-marker">✓</span>'
      }
    })

    expect(wrapper.find('[data-test="custom-marker"]').exists()).toBe(true)
    expect(wrapper.find('[data-id="sds-timeline-item-marker-button"]').exists()).toBe(false)
    expect(wrapper.find('[data-id="sds-timeline-item-title-button"]').exists()).toBe(false)
    expect(wrapper.find('[data-id="sds-timeline-item-title"]').text()).toBe('Request received')
    expect(wrapper.emitted('navigate')).toBeUndefined()
  })

  it('renders custom markers without requiring marker labels', () => {
    const wrapper = mount(TimelineItem, {
      attrs: {
        markerLabel: 'Approved event'
      },
      props: {
        title: 'Approved'
      },
      slots: {
        marker: '<span data-test="custom-marker">✓</span>'
      }
    })

    expect(wrapper.find('[data-id="sds-timeline-item-marker"]').attributes('aria-label')).toBeUndefined()
    expect(wrapper.find('[data-test="custom-marker"]').exists()).toBe(true)
    expect(wrapper.find('[data-id="sds-timeline-item"] .mt-1.text-sm.leading-5').exists()).toBe(false)
  })

  it('uses one neutral marker treatment for default markers', () => {
    const wrapper = mount(TimelineItem, {
      attrs: {
        variant: 'green'
      },
      props: {
        title: 'Request received',
      }
    })

    expect(wrapper.find('[data-id="sds-timeline-item-marker-dot"]').classes()).toContain('bg-gray-200')
    expect(wrapper.find('[data-id="sds-timeline-item-marker-dot"]').classes()).not.toContain('bg-green-500')
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

  it('uses one title style for all timeline contexts', () => {
    const wrapper = mount(Timeline, {
      attrs: {
        variant: 'history'
      },
      global: {
        components: { TimelineItem }
      },
      slots: {
        default: '<TimelineItem title="Request received" />'
      }
    })

    expect(wrapper.find('[data-id="sds-timeline-item-title"]').classes()).toContain('text-sm')
    expect(wrapper.find('[data-id="sds-timeline-item-title"]').classes()).toContain('font-semibold')
    expect(wrapper.find('[data-id="sds-timeline-item-title"]').classes()).not.toContain('text-base')
    expect(wrapper.find('[data-id="sds-timeline-item-title"]').classes()).not.toContain('font-normal')
  })

  it('uses markerColumnWidth to align the marker track with surrounding layout', () => {
    const wrapper = mount(Timeline, {
      attrs: {
        markerSize: 'lg'
      },
      props: {
        markerColumnWidth: '3rem'
      },
      global: {
        components: { TimelineItem }
      },
      slots: {
        default: '<TimelineItem title="Maya Jankowski" />'
      }
    })

    expect(wrapper.find('[data-id="sds-timeline"]').classes()).toContain('grid-cols-[var(--sds-timeline-marker-column-width,1.5rem)_1fr]')
    expect(wrapper.find('[data-id="sds-timeline"]').attributes('style')).toBe('--sds-timeline-marker-column-width: 3rem;')
    expect(wrapper.find('[data-id="sds-timeline"]').classes()).not.toContain('grid-cols-[2.5rem_1fr]')
  })
})
