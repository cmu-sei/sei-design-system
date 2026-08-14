import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick, ref } from 'vue'
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

  it('stacks item information in title, subtitle, description, timestamp order', () => {
    const wrapper = mount(TimelineItem, {
      props: {
        title: 'Security review',
        subtitle: 'Review package 42',
        description: 'The security team is reviewing the submitted package.',
        timestamp: 'Today, 10:30 AM'
      }
    })

    const content = wrapper.find('[data-id="sds-timeline-item-content"]')
    const information = content.element.children

    expect(content.classes()).toContain('flex-col')
    expect([...information].map(element => element.getAttribute('data-id'))).toEqual([
      'sds-timeline-item-title',
      'sds-timeline-item-subtitle',
      'sds-timeline-item-description',
      'sds-timeline-item-timestamp'
    ])
  })

  it('lets named slots override each item information prop', () => {
    const wrapper = mount(TimelineItem, {
      props: {
        title: 'Prop title',
        subtitle: 'Prop subtitle',
        description: 'Prop description',
        timestamp: 'Prop timestamp',
        datetime: '2026-08-13T10:30:00Z'
      },
      slots: {
        title: '<a href="/reviews/42">Slotted title</a>',
        subtitle: '<strong>Slotted subtitle</strong>',
        description: '<span>Slotted description</span>',
        timestamp: 'Slotted timestamp'
      }
    })

    const content = wrapper.find('[data-id="sds-timeline-item-content"]')

    expect(content.text()).not.toContain('Prop')
    expect(content.element.children[0].textContent).toContain('Slotted title')
    expect(content.element.children[1].textContent).toContain('Slotted subtitle')
    expect(content.element.children[2].textContent).toContain('Slotted description')
    expect(content.element.children[3].textContent).toContain('Slotted timestamp')
    expect(content.find('time').attributes('datetime')).toBe('2026-08-13T10:30:00Z')
  })

  it('lets the default slot replace the entire item information body', () => {
    const wrapper = mount(TimelineItem, {
      props: {
        title: 'Prop title',
        subtitle: 'Prop subtitle',
        description: 'Prop description',
        timestamp: 'Prop timestamp'
      },
      slots: {
        title: 'Slotted title',
        subtitle: 'Slotted subtitle',
        description: 'Slotted description',
        timestamp: 'Slotted timestamp',
        default: '<article data-test="custom-content">Completely custom content</article>'
      }
    })

    const content = wrapper.find('[data-id="sds-timeline-item-content"]')

    expect(content.text()).toBe('Completely custom content')
    expect(content.find('[data-test="custom-content"]').exists()).toBe(true)
    expect(content.find('[data-id="sds-timeline-item-title"]').exists()).toBe(false)
    expect(content.find('[data-id="sds-timeline-item-subtitle"]').exists()).toBe(false)
    expect(content.find('[data-id="sds-timeline-item-description"]').exists()).toBe(false)
    expect(content.find('[data-id="sds-timeline-item-timestamp"]').exists()).toBe(false)
  })

  it('lays out events left-to-right with a horizontal marker track', () => {
    const wrapper = mount(Timeline, {
      props: {
        orientation: 'horizontal'
      },
      global: {
        components: { TimelineItem }
      },
      slots: {
        default: `
          <TimelineItem title="Request received" />
          <TimelineItem title="Approved" />
        `
      }
    })

    const timeline = wrapper.find('[data-id="sds-timeline"]')
    const markerTracks = wrapper.findAll('[data-id="sds-timeline-item-marker-track"]')

    expect(timeline.attributes('data-orientation')).toBe('horizontal')
    expect(timeline.classes()).toContain('grid-flow-col')
    expect(timeline.classes()).toContain('overflow-x-auto')
    expect(markerTracks).toHaveLength(2)
    expect(markerTracks.every(track => track.classes().includes('flex-row'))).toBe(true)
    expect(markerTracks.every(track => !track.classes().includes('translate-y-1.5'))).toBe(true)
    expect(wrapper.find('[data-id="sds-timeline-item-connector"]').classes()).toContain('h-0.5')
    expect(wrapper.find('[data-id="sds-timeline-item-connector"]').classes()).toContain('mx-1')
    expect(wrapper.find('[data-id="sds-timeline-item-marker"]').classes()).not.toContain('mx-1')
  })

  it('uses a vertical marker track by default', () => {
    const wrapper = mount(Timeline, {
      global: {
        components: { TimelineItem }
      },
      slots: {
        default: `
          <TimelineItem title="Request received" />
          <TimelineItem title="Approved" />
        `
      }
    })

    const timeline = wrapper.find('[data-id="sds-timeline"]')

    expect(timeline.attributes('data-orientation')).toBe('vertical')
    expect(timeline.classes()).toContain('grid-cols-[var(--sds-timeline-marker-column-width,1.5rem)_1fr]')
    expect(wrapper.find('[data-id="sds-timeline-item-marker-track"]').classes()).toContain('flex-col')
    expect(wrapper.find('[data-id="sds-timeline-item-marker-track"]').classes()).toContain('translate-y-1.5')
    expect(wrapper.find('[data-id="sds-timeline-item-connector"]').classes()).toContain('w-0.5')
    expect(wrapper.find('[data-id="sds-timeline-item-connector"]').classes()).toContain('my-1')
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
    expect(wrapper.find('[data-id="sds-timeline-item-marker"]').classes()).not.toContain('my-1')
    expect(wrapper.find('[data-id="sds-timeline-item-marker"]').classes()).not.toContain('translate-y-0.5')
    expect(wrapper.find('[data-id="sds-timeline-item-marker-track"]').classes()).not.toContain('translate-y-1.5')
    expect(wrapper.find('[data-test="custom-marker"]').exists()).toBe(true)
    expect(wrapper.find('[data-id="sds-timeline-item"] .mt-1.text-sm.leading-5').exists()).toBe(false)
  })

  it('spaces connectors evenly between custom indicators', () => {
    const wrapper = mount(Timeline, {
      global: {
        components: { TimelineItem }
      },
      slots: {
        default: `
          <TimelineItem title="Review package updated">
            <template #marker><span data-test="custom-marker">RP</span></template>
          </TimelineItem>
          <TimelineItem title="Approval history verified">
            <template #marker><span data-test="custom-marker">AH</span></template>
          </TimelineItem>
        `
      }
    })

    expect(wrapper.findAll('[data-test="custom-marker"]')).toHaveLength(2)
    expect(wrapper.find('[data-id="sds-timeline-item-connector"]').classes()).toContain('my-1')
  })

  it('renders a current event with a rich title and machine-readable timestamp', () => {
    const wrapper = mount(TimelineItem, {
      props: {
        current: true,
        datetime: '2026-08-13T09:00:00Z',
        timestamp: 'A moment ago'
      },
      slots: {
        title: '<a href="/events/approved">Record approved</a>'
      }
    })

    expect(wrapper.find('[data-id="sds-timeline-item"]').attributes('aria-current')).toBe('step')
    expect(wrapper.find('[data-id="sds-timeline-item-title"] a').attributes('href')).toBe('/events/approved')
    expect(wrapper.find('time').attributes('datetime')).toBe('2026-08-13T09:00:00Z')
    expect(wrapper.find('[data-id="sds-timeline-item-marker-dot"]').classes()).toContain('bg-green-500')
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

    expect(wrapper.find('[data-id="sds-timeline-item-marker"]').classes()).not.toContain('h-5')
    expect(wrapper.find('[data-id="sds-timeline-item-marker"]').classes()).not.toContain('translate-y-0.5')
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

    await nextTick()

    expect(wrapper.text()).toContain('Created')
    expect(wrapper.text()).toContain('Submitted')
    expect(wrapper.text()).not.toContain('Reviewed')
    expect(wrapper.text()).toContain('Approved')
    expect(wrapper.find('button').text()).toBe('Show 1 more')
    expect(wrapper.find('[data-id="sds-timeline-collapse"]').attributes('role')).toBe('listitem')
    expect(wrapper.find('[data-id="sds-timeline-collapse-connector"]').classes()).toContain('mt-0.5')
    expect(wrapper.find('[data-id="sds-timeline-collapse-connector"]').classes()).toContain('-mb-1.5')

    const visibleItems = wrapper.findAll('[data-id="sds-timeline-item"]')
    const approvedMarkerColumn = visibleItems[2].element.children[0]
    expect([...approvedMarkerColumn.children].some(child => child.classList.contains('w-0.5'))).toBe(false)

    await wrapper.find('button').trigger('click')

    expect(wrapper.text()).toContain('Reviewed')
  })

  it('collapses and expands events along the horizontal marker track', async () => {
    const wrapper = mount(Timeline, {
      props: {
        collapseAfter: 2,
        orientation: 'horizontal'
      },
      global: {
        components: { TimelineItem }
      },
      slots: {
        default: `
          <TimelineItem title="Created" />
          <TimelineItem title="Reviewed" />
          <TimelineItem title="Approved" />
        `
      }
    })

    await nextTick()

    expect(wrapper.findAll('[data-id="sds-timeline-item-title"]').map(title => title.text())).toEqual([
      'Created',
      'Approved'
    ])
    expect(wrapper.find('[data-id="sds-timeline-collapse-marker-track"]').classes()).toContain('flex-row')
    expect(wrapper.find('[data-id="sds-timeline-collapse-connector"]').classes()).toContain('h-0.5')
    expect(wrapper.find('[data-id="sds-timeline-collapse-connector"]').classes()).toContain('-ml-1')

    await wrapper.find('[data-id="sds-timeline-collapse"] button').trigger('click')

    expect(wrapper.findAll('[data-id="sds-timeline-item-title"]').map(title => title.text())).toEqual([
      'Created',
      'Reviewed',
      'Approved'
    ])
  })

  it('renders events and the expansion control as an ordered list', async () => {
    const wrapper = mount(Timeline, {
      props: {
        collapseAfter: 2
      },
      global: {
        components: { TimelineItem }
      },
      slots: {
        default: `
          <TimelineItem title="Created" />
          <TimelineItem title="Reviewed" />
          <TimelineItem title="Approved" />
        `
      }
    })

    await nextTick()

    expect(wrapper.find('[data-id="sds-timeline"]').element.tagName).toBe('OL')
    expect(wrapper.findAll('[data-id="sds-timeline-item"]')).toHaveLength(2)
    expect(wrapper.findAll('[data-id="sds-timeline-item"]').every(item => item.element.tagName === 'LI')).toBe(true)
    expect(wrapper.find('[data-id="sds-timeline-collapse"]').element.tagName).toBe('LI')
  })

  it('normalizes fractional collapse counts to whole visible items', async () => {
    const wrapper = mount(Timeline, {
      props: {
        collapseAfter: 2.5
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

    await nextTick()

    expect(wrapper.findAll('[data-id="sds-timeline-item-title"]').map(title => title.text())).toEqual([
      'Created',
      'Approved'
    ])
    expect(wrapper.find('button').text()).toBe('Show 2 more')
  })

  it('keeps the correct items visible when collapsed items are reordered', async () => {
    const items = ref(['Created', 'Submitted', 'Reviewed', 'Approved'])
    const wrapper = mount(Timeline, {
      props: {
        collapseAfter: 3
      },
      slots: {
        default: () => items.value.map(title => h(TimelineItem, { key: title, title }))
      }
    })

    items.value = ['Approved', 'Reviewed', 'Submitted', 'Created']
    await nextTick()

    expect(wrapper.findAll('[data-id="sds-timeline-item-title"]').map(title => title.text())).toEqual([
      'Approved',
      'Reviewed',
      'Created'
    ])
  })

  it('keeps the correct items visible when collapsed items are removed and inserted', async () => {
    const items = ref(['Created', 'Submitted', 'Reviewed', 'Approved'])
    const wrapper = mount(Timeline, {
      props: {
        collapseAfter: 3
      },
      slots: {
        default: () => items.value.map(title => h(TimelineItem, { key: title, title }))
      }
    })

    items.value = ['Created', 'Reviewed', 'Escalated', 'Approved']
    await nextTick()

    expect(wrapper.findAll('[data-id="sds-timeline-item-title"]').map(title => title.text())).toEqual([
      'Created',
      'Reviewed',
      'Approved'
    ])
    expect(wrapper.find('button').text()).toBe('Show 1 more')
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
