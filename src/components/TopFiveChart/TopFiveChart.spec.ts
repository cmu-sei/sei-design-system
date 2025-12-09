import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { TopFiveChartResult } from './TopFiveChart.vue'
import Component from './TopFiveChart.vue'

type Variant = 'gray' | 'tan' | 'red' | 'green' | 'yellow' | 'orange' | 'blue' | 'teal' | 'purple' | 'indigo'

const createWrapper = (props = {}) => mount(Component, { props })

const testEntries: TopFiveChartResult[] = [
  { id: 1, title: 'Test 1', count: 40 },
  { id: 2, title: 'Test 2', count: 30 },
  { id: 3, title: 'Test 3', count: 15 },
  { id: 4, title: 'Test 4', count: 10 },
  { id: 5, title: 'Test 5', count: 3 },
  { id: 6, title: 'Test 6', count: 2 }
]

describe('TopFiveChart.vue', () => {
  describe('Basic Rendering', () => {
    it('is a Vue instance', () => {
      const wrapper = createWrapper()
      expect(wrapper.vm).toBeTruthy()
    })

    it('matches snapshot with no props assigned', () => {
      const wrapper = createWrapper()
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders title with default and small heading sizes', () => {
      const defaultWrapper = createWrapper({ title: 'Test Title', entries: [] })
      const defaultHeading = defaultWrapper.find('h3')
      expect(defaultHeading.text()).toBe('Test Title')
      expect(defaultHeading.classes()).toContain('text-2xl')

      const smallWrapper = createWrapper({ title: 'Small Title', entries: [], smallHeading: true })
      const smallHeading = smallWrapper.find('h3')
      expect(smallHeading.classes()).toContain('text-lg')
    })
  })

  describe('Entry Rendering', () => {
    it('matches snapshot with urls, viewAllUrl, and showPercent', () => {
      const wrapper = createWrapper({
        title: 'Top Five Chart (with urls, view all url, showPercent)',
        viewAllUrl: 'https://seinet.sei.cmu.edu',
        entries: testEntries,
        showPercent: true
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('matches snapshot with doNotLinkEntries', () => {
      const wrapper = createWrapper({
        title: 'Top Five Chart (with urls, doNotLinkEntries)',
        entries: testEntries,
        doNotLinkEntries: true
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('matches snapshot without urls', () => {
      const wrapper = createWrapper({
        title: 'Top Five Chart (no urls)',
        entries: [
          { id: 1, title: 'Test 1', count: 40 },
          { id: 2, title: 'Test 2', count: 30 }
        ]
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders only first 5 entries when more than 5 provided', () => {
      const wrapper = createWrapper({
        title: 'Test Chart',
        entries: testEntries
      })

      expect(wrapper.findAll('li').length).toBe(5)
      expect(wrapper.text()).toContain('Test 1')
      expect(wrapper.text()).toContain('Test 5')
      expect(wrapper.text()).not.toContain('Test 6')
    })

    it('renders single entry and zero count correctly', () => {
      const wrapper = createWrapper({
        title: 'Test Chart',
        entries: [
          { id: 1, title: 'Only Item', count: 100 },
          { id: 2, title: 'Zero Item', count: 0 }
        ]
      })

      expect(wrapper.findAll('li').length).toBe(2)
      expect(wrapper.text()).toContain('Only Item')
      expect(wrapper.text()).toContain('100')
      expect(wrapper.text()).toContain('Zero Item')
      expect(wrapper.text()).toContain('0')
    })

    it('renders entries with and without urls correctly', () => {
      const wrapperWithUrl = createWrapper({
        title: 'Test Chart',
        entries: [{ id: 1, title: 'Item 1', count: 100, url: 'https://example.com' }]
      })
      const linkWithUrl = wrapperWithUrl.find('a')
      expect(linkWithUrl.attributes('href')).toBe('https://example.com')
      expect(linkWithUrl.text()).toBe('Item 1')

      const wrapperWithoutUrl = createWrapper({
        title: 'Test Chart',
        entries: [{ id: 1, title: 'Item 1', count: 100 }]
      })
      const linkWithoutUrl = wrapperWithoutUrl.find('.chart-label-section a')
      expect(linkWithoutUrl.attributes('href')).toBe('#')
    })

    it('renders plain text when doNotLinkEntries is true', () => {
      const wrapper = createWrapper({
        title: 'Test Chart',
        entries: [{ id: 1, title: 'Item 1', count: 100, url: 'https://example.com' }],
        doNotLinkEntries: true
      })

      const labelSection = wrapper.find('.chart-label-section')
      expect(labelSection.text()).toContain('Item 1')
      expect(labelSection.find('a').exists()).toBe(false)
      expect(labelSection.find('span').text()).toBe('Item 1')
    })

    it('displays count with and without percent symbol', () => {
      const withPercent = createWrapper({
        title: 'Percent Chart',
        entries: [{ id: 1, title: 'Item 1', count: 75 }],
        showPercent: true
      })
      expect(withPercent.text()).toContain('75%')

      const withoutPercent = createWrapper({
        title: 'Number Chart',
        entries: [{ id: 1, title: 'Item 1', count: 75 }],
        showPercent: false
      })
      expect(withoutPercent.text()).toContain('75')
      expect(withoutPercent.text()).not.toContain('75%')
    })

    it('renders "View All" link when viewAllUrl is provided', () => {
      const wrapper = createWrapper({
        title: 'Test Chart',
        entries: [{ id: 1, title: 'Item 1', count: 100 }],
        viewAllUrl: 'https://example.com/view-all'
      })

      const viewAllLink = wrapper.findAll('a').find(a => a.text() === 'View All')
      expect(viewAllLink).toBeDefined()
      expect(viewAllLink?.attributes('href')).toBe('https://example.com/view-all')
      expect(viewAllLink?.classes()).toContain('link-primary')
    })

    it('does not render "View All" link when viewAllUrl is null', () => {
      const wrapper = createWrapper({
        title: 'Test Chart',
        entries: [{ id: 1, title: 'Item 1', count: 100 }],
        viewAllUrl: null
      })

      const viewAllLink = wrapper.findAll('a').find(a => a.text() === 'View All')
      expect(viewAllLink).toBeUndefined()
    })
  })

  describe('No Data and Error States', () => {
    it('matches snapshot with no data', () => {
      const wrapper = createWrapper({ title: 'Top Five Chart (no data)', entries: [] })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('matches snapshot with malformed data', () => {
      const wrapper = createWrapper({
        title: 'Top Five Chart (malformed data)',
        entries: [
          { id: 1, title: 'Test 1', count: 40 },
          { id: 2, title: 'Test 2' }
        ] as TopFiveChartResult[]
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('displays default and custom no data messages', () => {
      const defaultWrapper = createWrapper({ title: 'Empty Chart', entries: [] })
      expect(defaultWrapper.text()).toContain('There is no chart data to display at this time.')

      const customWrapper = createWrapper({
        title: 'Empty Chart',
        entries: [],
        noDataMsg: 'No results found for your query.'
      })
      expect(customWrapper.text()).toContain('No results found for your query.')
    })

    it('displays default and custom malformed data messages', () => {
      const defaultWrapper = createWrapper({
        title: 'Malformed Chart',
        entries: [{ id: 1, title: 'Item 1' } as TopFiveChartResult]
      })
      expect(defaultWrapper.text()).toContain('The chart data is malformed and cannot be displayed at this time.')

      const customWrapper = createWrapper({
        title: 'Malformed Chart',
        entries: [{ id: 1, count: 50 } as TopFiveChartResult],
        missingPropsMsg: 'Invalid data format detected.'
      })
      expect(customWrapper.text()).toContain('Invalid data format detected.')
    })
  })

  describe('Event Emissions', () => {
    it('renders clickable link when entry has no url (event emission cannot be tested)', () => {
      const wrapper = createWrapper({
        title: 'Test Chart',
        entries: [{ id: 1, title: 'Item 1', count: 100 }]
      })

      const link = wrapper.find('a[href="#"]')
      expect(link.exists()).toBe(true)
      expect(link.text()).toBe('Item 1')
      expect(link.attributes('href')).toBe('#')
      expect(link.classes()).toContain('hover:underline')
      expect(link.classes()).toContain('focus:underline')
    })

    it('does not emit result-click when entry has url or doNotLinkEntries is true', async () => {
      const wrapperWithUrl = createWrapper({
        title: 'Test Chart',
        entries: [{ id: 1, title: 'Item 1', count: 100, url: 'https://example.com' }]
      })
      await wrapperWithUrl.find('.chart-label-section a').trigger('click')
      expect(wrapperWithUrl.emitted('result-click')).toBeFalsy()

      const wrapperNoLink = createWrapper({
        title: 'Test Chart',
        entries: [{ id: 1, title: 'Item 1', count: 100 }],
        doNotLinkEntries: true
      })
      expect(wrapperNoLink.find('.chart-label-section a').exists()).toBe(false)
      expect(wrapperNoLink.emitted('result-click')).toBeFalsy()
    })
  })

  describe('Color Variants', () => {
    const variants: Array<[Variant, string]> = [
      ['blue', 'bg-blue'],
      ['teal', 'bg-teal'],
      ['red', 'bg-red'],
      ['gray', 'bg-gray'],
      ['tan', 'bg-tan'],
      ['green', 'bg-green'],
      ['yellow', 'bg-yellow'],
      ['orange', 'bg-orange'],
      ['indigo', 'bg-indigo'],
      ['purple', 'bg-purple']
    ]

    const entries: TopFiveChartResult[] = [
      { id: 1, title: 'Item 1', count: 100 },
      { id: 2, title: 'Item 2', count: 80 },
      { id: 3, title: 'Item 3', count: 60 },
      { id: 4, title: 'Item 4', count: 40 },
      { id: 5, title: 'Item 5', count: 20 }
    ]

    it.each(variants)('applies correct %s colors for all 5 positions', (variant, colorPrefix) => {
      const wrapper = createWrapper({ title: `${variant} Chart`, variant, entries })
      const progressBars = wrapper.findAll('[role="progressbar"]')

      expect(progressBars[0].classes()).toContain(`${colorPrefix}-800`)
      expect(progressBars[1].classes()).toContain(`${colorPrefix}-700`)
      expect(progressBars[2].classes()).toContain(`${colorPrefix}-600`)
      expect(progressBars[3].classes()).toContain(`${colorPrefix}-500`)
      expect(progressBars[4].classes()).toContain(`${colorPrefix}-400`)
    })

    it('applies blue colors when variant is null', () => {
      const wrapper = createWrapper({
        title: 'Default Chart',
        variant: null,
        entries: entries.slice(0, 2)
      })

      const progressBars = wrapper.findAll('[role="progressbar"]')
      expect(progressBars[0].classes()).toContain('bg-blue-800')
      expect(progressBars[1].classes()).toContain('bg-blue-700')
    })
  })

  describe('Accessibility', () => {
    it('includes data-id attribute on container', () => {
      const wrapper = createWrapper({ title: 'Test Chart', entries: [] })
      expect(wrapper.find('[data-id="sds-top-five-chart"]').exists()).toBe(true)
    })

    it('includes progressbar role on progress bars', () => {
      const wrapper = createWrapper({
        title: 'Test Chart',
        entries: [{ id: 1, title: 'Item 1', count: 100 }]
      })
      expect(wrapper.find('[role="progressbar"]').exists()).toBe(true)
    })

    it('includes correct ARIA attributes on progress bars', () => {
      const wrapper = createWrapper({
        title: 'Test Chart',
        entries: [
          { id: 1, title: 'Item 1', count: 80 },
          { id: 2, title: 'Item 2', count: 100 }
        ]
      })

      const progressBars = wrapper.findAll('[role="progressbar"]')

      expect(progressBars[0].attributes('aria-valuenow')).toBe('80')
      expect(progressBars[0].attributes('aria-valuemin')).toBe('0')
      expect(progressBars[0].attributes('aria-valuemax')).toBe('100')
      expect(progressBars[0].attributes('title')).toBe('80')

      expect(progressBars[1].attributes('aria-valuenow')).toBe('100')
      expect(progressBars[1].attributes('aria-valuemin')).toBe('0')
      expect(progressBars[1].attributes('aria-valuemax')).toBe('100')
      expect(progressBars[1].attributes('title')).toBe('100')
    })

    it('includes screen reader text for each progress bar', () => {
      const wrapper = createWrapper({
        title: 'Test Chart',
        entries: [{ id: 1, title: 'Test Item', count: 75 }],
        showPercent: true
      })

      const srText = wrapper.find('.sr-only')
      expect(srText.exists()).toBe(true)
      expect(srText.text()).toBe('75% Test Item')
    })

    it('includes appropriate link classes for accessibility', () => {
      const wrapper = createWrapper({
        title: 'Test Chart',
        entries: [{ id: 1, title: 'Item 1', count: 100, url: 'https://example.com' }]
      })

      const link = wrapper.find('.chart-label-section a')
      expect(link.classes()).toContain('hover:underline')
      expect(link.classes()).toContain('focus:underline')
      expect(link.classes()).toContain('focus:outline-hidden')
    })
  })

  describe('Progress Bar Calculations', () => {
    it('calculates correct width percentage based on max value', () => {
      const wrapper = createWrapper({
        title: 'Test Chart',
        entries: [
          { id: 1, title: 'Item 1', count: 100 },
          { id: 2, title: 'Item 2', count: 50 },
          { id: 3, title: 'Item 3', count: 25 }
        ]
      })

      const progressBars = wrapper.findAll('[role="progressbar"]')
      expect(progressBars[0].attributes('style')).toContain('width: 100%')
      expect(progressBars[1].attributes('style')).toContain('width: 50%')
      expect(progressBars[2].attributes('style')).toContain('width: 25%')
    })

    it('handles entries with same count values', () => {
      const wrapper = createWrapper({
        title: 'Test Chart',
        entries: [
          { id: 1, title: 'Item 1', count: 50 },
          { id: 2, title: 'Item 2', count: 50 },
          { id: 3, title: 'Item 3', count: 50 }
        ]
      })

      const progressBars = wrapper.findAll('[role="progressbar"]')
      expect(progressBars[0].attributes('style')).toContain('width: 100%')
      expect(progressBars[1].attributes('style')).toContain('width: 100%')
      expect(progressBars[2].attributes('style')).toContain('width: 100%')
    })

    it('handles entries with decimal values', () => {
      const wrapper = createWrapper({
        title: 'Test Chart',
        entries: [
          { id: 1, title: 'Item 1', count: 100 },
          { id: 2, title: 'Item 2', count: 33.33 }
        ]
      })

      const progressBars = wrapper.findAll('[role="progressbar"]')
      expect(progressBars[0].attributes('style')).toContain('width: 100%')
      expect(progressBars[1].attributes('style')).toContain('width: 33.33%')
    })
  })
})
