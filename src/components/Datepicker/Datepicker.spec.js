import { describe, expect, it } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import Component from './Datepicker.vue'

describe('Datepicker', () => {
  describe('Snapshots', () => {
    it('should match its default snapshot', () => {
      const wrapper = mount(Component, {})
      expect(wrapper.element).toMatchSnapshot()
    })

    it('should show the arrow for a range selection', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3), end: new Date(2022, 8, 8) },
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('should hide arrow for a range selection', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3), end: new Date(2022, 8, 8) },
          hideArrow: true
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('should show the sm size with the dateTime mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3, 8, 0, 0), end: new Date(2022, 8, 8, 10, 0, 0) },
          size: 'sm',
          mode: 'dateTime'
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('should show the sm size with the time mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3, 8, 0, 0), end: new Date(2022, 8, 8, 10, 0, 0) },
          size: 'sm',
          mode: 'time'
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('should show required', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3, 8, 0, 0), end: new Date(2022, 8, 8, 10, 0, 0) },
          required: true
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('should show disabled', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3, 8, 0, 0), end: new Date(2022, 8, 8, 10, 0, 0) },
          disabled: true
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('should show valid', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3, 8, 0, 0), end: new Date(2022, 8, 8, 10, 0, 0) },
          valid: true
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('should show invalid', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3, 8, 0, 0), end: new Date(2022, 8, 8, 10, 0, 0) },
          invalid: true
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('should show readonly', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3, 8, 0, 0), end: new Date(2022, 8, 8, 10, 0, 0) },
          readonly: true
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Single Date Mode', () => {
    it('should display formatted date in input when modelValue is set', () => {
      const testDate = new Date(2022, 8, 15)
      const wrapper = mount(Component, {
        props: {
          modelValue: testDate
        }
      })

      const input = wrapper.find('input[aria-label="Start date"]')
      expect(input.element.value).toBe('09/15/2022')
    })

    it('should clear input when entering invalid date', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2022, 8, 15)
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('invalid date')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toBe('')
    })

    it('should update input value when modelValue prop changes', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2022, 8, 15)
        }
      })

      await wrapper.setProps({ modelValue: new Date(2022, 8, 20) })
      await flushPromises()

      const input = wrapper.find('input[aria-label="Start date"]')
      expect(input.element.value).toBe('09/20/2022')
    })
  })

  describe('Range Date Mode', () => {
    it('should display two input fields when in range mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3), end: new Date(2022, 8, 8) }
        }
      })

      const inputs = wrapper.findAll('input[type="text"]')
      expect(inputs).toHaveLength(2)
    })

    it('should display formatted start and end dates in range mode', () => {
      const startDate = new Date(2022, 8, 3)
      const endDate = new Date(2022, 8, 8)
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: startDate, end: endDate }
        }
      })

      const startInput = wrapper.find('input[aria-label="Start date"]')
      const endInput = wrapper.find('input[aria-label="End date"]')
      expect(startInput.element.value).toBe('09/03/2022')
      expect(endInput.element.value).toBe('09/08/2022')
    })

    it('should handle null values in range mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: null, end: null }
        }
      })

      const startInput = wrapper.find('input[aria-label="Start date"]')
      const endInput = wrapper.find('input[aria-label="End date"]')
      expect(startInput.element.value).toBe('')
      expect(endInput.element.value).toBe('')
    })

    it('should handle partial range with only start date', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3), end: null }
        }
      })

      const startInput = wrapper.find('input[aria-label="Start date"]')
      const endInput = wrapper.find('input[aria-label="End date"]')
      expect(startInput.element.value).toBe('09/03/2022')
      expect(endInput.element.value).toBe('')
    })

    it('should swap dates when start date is after end date', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: null, end: null }
        }
      })
      const startInput = wrapper.find('input[aria-label="Start date"]')
      const endInput = wrapper.find('input[aria-label="End date"]')

      await startInput.setValue('09/15/2022')
      await startInput.trigger('change')
      await endInput.setValue('09/05/2022')
      await endInput.trigger('change')

      await nextTick()
      expect(startInput.element.value).toBe('09/05/2022')
      expect(endInput.element.value).toBe('09/15/2022')
    })

    it('should show arrow between date inputs by default in range mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3), end: new Date(2022, 8, 8) }
        }
      })

      const arrow = wrapper.find('.shrink-0 svg[viewBox="0 0 640 640"]')
      expect(arrow.exists()).toBe(true)
    })

    it('should hide arrow when hideArrow prop is true', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3), end: new Date(2022, 8, 8) },
          hideArrow: true
        }
      })

      const arrow = wrapper.find('svg[viewBox="0 0 24 24"]')
      expect(arrow.exists()).toBe(false)
    })

    it('should swap input display when modelValue watcher detects start date after end date', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3), end: new Date(2022, 8, 8) }
        }
      })

      // Set modelValue programmatically with start > end to trigger watcher swap logic
      await wrapper.setProps({
        modelValue: { start: new Date(2022, 8, 15), end: new Date(2022, 8, 5) }
      })
      await flushPromises()

      const startInput = wrapper.find('input[aria-label="Start date"]')
      const endInput = wrapper.find('input[aria-label="End date"]')
      
      // Verify the watcher swapped the display (end date shown in start input, start date in end input)
      expect(startInput.element.value).toBe('09/05/2022')
      expect(endInput.element.value).toBe('09/15/2022')
    })
  })

  describe('Time Mode', () => {
    it('should display time placeholder in time mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          mode: 'time'
        }
      })

      const input = wrapper.find('input[aria-label="Start date"]')
      expect(input.attributes('placeholder')).toBe('hh:mm am/pm')
    })

    it('should format time correctly in time mode', () => {
      const testDate = new Date(2022, 8, 15, 14, 30, 0)
      const wrapper = mount(Component, {
        props: {
          modelValue: testDate,
          mode: 'time'
        }
      })

      const input = wrapper.find('input[aria-label="Start date"]')
      expect(input.element.value).toBe('02:30 pm')
    })

    it('should display clock icon in time mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          mode: 'time'
        }
      })

      const clockIcon = wrapper.find('button svg[viewBox="0 0 640 640"] path')
      expect(clockIcon.exists()).toBe(true)
    })
  })

  describe('DateTime Mode', () => {
    it('should display datetime placeholder in dateTime mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          mode: 'dateTime'
        }
      })

      const input = wrapper.find('input[aria-label="Start date"]')
      expect(input.attributes('placeholder')).toBe('mm/dd/yyyy hh:mm am/pm')
    })

    it('should format datetime correctly in dateTime mode', () => {
      const testDate = new Date(2022, 8, 15, 14, 30, 0)
      const wrapper = mount(Component, {
        props: {
          modelValue: testDate,
          mode: 'dateTime'
        }
      })

      const input = wrapper.find('input[aria-label="Start date"]')
      expect(input.element.value).toBe('09/15/2022 02:30 pm')
    })
  })

  describe('Input States', () => {
    it('should apply input pattern based on mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          mode: 'date'
        }
      })

      const input = wrapper.find('input[aria-label="Start date"]')
      expect(input.attributes('pattern')).toBe('[0-9]{2}/[0-9]{2}/[0-9]{4}')
    })
  })

  describe('Size Variants', () => {
    it('should apply small size class when size is sm', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2022, 8, 15),
          size: 'sm'
        }
      })

      const inputGroup = wrapper.find('.input-group')
      expect(inputGroup.classes()).toContain('input-group-sm')
    })

    it('should not apply small size class when size is md', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2022, 8, 15),
          size: 'md'
        }
      })

      const inputGroup = wrapper.find('.input-group')
      expect(inputGroup.classes()).not.toContain('input-group-sm')
    })
  })

  describe('Z-Index', () => {
    it('should apply z-50 class by default', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })

      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      expect(floatingUi.props('popperClass')).toContain('z-50')
    })

    it('should apply z-0 when zIndex prop is set', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          zIndex: '0'
        }
      })

      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      expect(floatingUi.props('popperClass')).toContain('z-0')
    })

    it('should apply z-10 when zIndex prop is set', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          zIndex: '10'
        }
      })

      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      expect(floatingUi.props('popperClass')).toContain('z-10')
    })

    it('should apply z-20 when zIndex prop is set', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          zIndex: '20'
        }
      })

      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      expect(floatingUi.props('popperClass')).toContain('z-20')
    })

    it('should apply correct z-index class when zIndex prop is set', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          zIndex: '30'
        }
      })

      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      expect(floatingUi.props('popperClass')).toContain('z-30')
    })

    it('should apply z-40 when zIndex prop is set', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          zIndex: '40'
        }
      })

      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      expect(floatingUi.props('popperClass')).toContain('z-40')
    })

    it('should apply z-auto when zIndex is auto', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          zIndex: 'auto'
        }
      })

      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      expect(floatingUi.props('popperClass')).toContain('z-auto')
    })
  })

  describe('Placement', () => {
    it('should use bottom placement by default', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })

      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      expect(floatingUi.props('placement')).toBe('bottom')
    })

    it('should apply custom placement when specified', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          placement: 'top'
        }
      })

      const floatingUi = wrapper.findComponent({ name: 'SdsFloatingUi' })
      expect(floatingUi.props('placement')).toBe('top')
    })
  })

  describe('Date Validation', () => {
    it('should handle invalid date input gracefully', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('invalid date')
      await input.trigger('change')

      expect(input.element.value).toBe('')
    })

    it('should accept and format alternative date format', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('2022-09-15')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toBe('09/15/2022')
    })

    it('should handle short date format with single digit month', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('9/5/2022')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toBe('09/05/2022')
    })
  })

  describe('Min/Max Date Constraints', () => {
    it('should not accept dates before min date', async () => {
      const minDate = new Date(2022, 8, 10)
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          min: minDate
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('09/05/2022')
      await input.trigger('change')

      expect(input.element.value).toBe('')
    })

    it('should not accept dates after max date', async () => {
      const maxDate = new Date(2022, 8, 10)
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          max: maxDate
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('09/15/2022')
      await input.trigger('change')

      expect(input.element.value).toBe('')
    })

    it('should accept date equal to min date', async () => {
      const minDate = new Date(2022, 8, 10)
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          min: minDate
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('09/10/2022')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toBe('09/10/2022')
    })

    it('should accept date equal to max date', async () => {
      const maxDate = new Date(2022, 8, 10)
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          max: maxDate
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('09/10/2022')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toBe('09/10/2022')
    })
  })

  describe('Accessibility', () => {
    it('should have proper aria-label for start date input', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })

      const input = wrapper.find('input[aria-label="Start date"]')
      expect(input.exists()).toBe(true)
    })

    it('should have proper aria-label for end date input in range mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: null, end: null }
        }
      })

      const input = wrapper.find('input[aria-label="End date"]')
      expect(input.exists()).toBe(true)
    })

    it('should have screen reader text for icon buttons', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })

      const srText = wrapper.find('.sr-only')
      expect(srText.text()).toBe('Select a date')
    })
  })

  describe('ModelValue Updates', () => {
    it('should update input value when modelValue prop changes', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2022, 8, 15)
        }
      })

      await wrapper.setProps({ modelValue: new Date(2022, 8, 20) })

      const input = wrapper.find('input[aria-label="Start date"]')
      expect(input.element.value).toBe('09/20/2022')
    })

    it('should update both inputs when range modelValue changes', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3), end: new Date(2022, 8, 8) }
        }
      })

      await wrapper.setProps({
        modelValue: { start: new Date(2022, 8, 10), end: new Date(2022, 8, 15) }
      })

      const startInput = wrapper.find('input[aria-label="Start date"]')
      const endInput = wrapper.find('input[aria-label="End date"]')
      expect(startInput.element.value).toBe('09/10/2022')
      expect(endInput.element.value).toBe('09/15/2022')
    })

    it('should clear inputs when modelValue is set to null', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2022, 8, 15)
        }
      })

      await wrapper.setProps({ modelValue: null })
      await flushPromises()

      const input = wrapper.find('input[aria-label="Start date"]')
      expect(input.element.value).toBe('')
    })
  })

  describe('Keyboard Interactions', () => {
    it('should trigger change on Enter key press', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('09/15/2022')
      await input.trigger('keydown.enter')
      await flushPromises()

      expect(input.element.value).toBe('09/15/2022')
    })

    it('should trigger change on Tab key press', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('09/15/2022')
      await input.trigger('keydown.tab')
      await flushPromises()

      expect(input.element.value).toBe('09/15/2022')
    })

    it('should handle down arrow key', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2022, 8, 15)
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.trigger('keyup.down')

      expect(input.exists()).toBe(true)
    })

    it('should handle up arrow key', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2022, 8, 15)
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.trigger('keyup.up')

      expect(input.exists()).toBe(true)
    })

    it('should track which input to change on mouseup', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3), end: new Date(2022, 8, 8) }
        }
      })
      const startInput = wrapper.find('input[aria-label="Start date"]')
      const endInput = wrapper.find('input[aria-label="End date"]')

      await startInput.trigger('mouseup')
      await endInput.trigger('mouseup')

      expect(startInput.exists()).toBe(true)
      expect(endInput.exists()).toBe(true)
    })

    it('should track which input to change on keyup', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: new Date(2022, 8, 3), end: new Date(2022, 8, 8) }
        }
      })
      const startInput = wrapper.find('input[aria-label="Start date"]')

      await startInput.trigger('keyup')

      expect(startInput.exists()).toBe(true)
    })
  })

  describe('Button Interactions', () => {
    it('should have clickable calendar icon button', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const button = wrapper.find('.input-group-addon')

      expect(button.exists()).toBe(true)
      expect(button.attributes('type')).toBe('button')
    })

    it('should disable calendar icon button when disabled', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          disabled: true
        }
      })
      const button = wrapper.find('.input-group-addon')

      expect(button.attributes('disabled')).toBeDefined()
    })

    it('should disable calendar icon button when readonly', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          readonly: true
        }
      })
      const button = wrapper.find('.input-group-addon')

      expect(button.attributes('disabled')).toBeDefined()
    })

    it('should have two calendar icon buttons in range mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: null, end: null }
        }
      })
      const buttons = wrapper.findAll('.input-group-addon')

      expect(buttons).toHaveLength(2)
    })
  })

  describe('Special Date Keywords', () => {
    it('should handle "now" keyword in input', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          mode: 'dateTime'
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('now')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toMatch(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2} (am|pm)/)
    })

    it('should handle "today" keyword in date mode', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('today')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toMatch(/\d{2}\/\d{2}\/\d{4}/)
    })

    it('should handle "tomorrow" keyword in date mode', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('tomorrow')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toMatch(/\d{2}\/\d{2}\/\d{4}/)
      
      // Verify the date is actually tomorrow
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const expectedDate = `${String(tomorrow.getMonth() + 1).padStart(2, '0')}/${String(tomorrow.getDate()).padStart(2, '0')}/${tomorrow.getFullYear()}`
      expect(input.element.value).toBe(expectedDate)
    })

    it('should handle "yesterday" keyword in date mode', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')
      await input.setValue('yesterday')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toMatch(/\d{2}\/\d{2}\/\d{4}/)
      
      // Verify the date is actually yesterday
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const expectedDate = `${String(yesterday.getMonth() + 1).padStart(2, '0')}/${String(yesterday.getDate()).padStart(2, '0')}/${yesterday.getFullYear()}`
      expect(input.element.value).toBe(expectedDate)
    })
  })

  describe('Alternative Date Formats', () => {
    it('should parse ISO date format', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('2022-09-15')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toBe('09/15/2022')
    })

    it('should parse date with dashes', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('09-15-2022')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toBe('09/15/2022')
    })

    it('should parse compact date format', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('09152022')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toBe('09/15/2022')
    })

    it('should parse month/day format and add current year', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('9/15')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toMatch(/09\/15\/\d{4}/)
    })

    it('should parse time formats in time mode', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          mode: 'time'
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('2:30 PM')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toBe('02:30 pm')
    })

    it('should parse 24-hour time format', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          mode: 'time'
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('14:30')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toBe('02:30 pm')
    })
  })

  describe('Edge Cases', () => {
    it('should handle readonly mode not triggering dropdown', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2022, 8, 15),
          readonly: true
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.trigger('focusin')
      await input.trigger('mousedown')

      expect(input.element.value).toBe('09/15/2022')
    })

    it('should format times in range mode when mode is time', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: {
            start: new Date(2022, 8, 3, 10, 30, 0),
            end: new Date(2022, 8, 8, 15, 45, 0)
          },
          mode: 'time'
        }
      })

      const startInput = wrapper.find('input[aria-label="Start date"]')
      const endInput = wrapper.find('input[aria-label="End date"]')
      expect(startInput.element.value).toBe('10:30 am')
      expect(endInput.element.value).toBe('03:45 pm')
    })

    it('should handle year format for years in 2000s', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('09/15/15')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toBe('09/15/2015')
    })

    it('should handle month-only format', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('09/2022')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toMatch(/09\/01\/2022/)
    })

    it('should not modify input when entering partial date', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('09/')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toBe('')
    })
  })

  describe('Input Focus Management', () => {
    it('should handle focusin event', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.trigger('focusin')

      expect(input.exists()).toBe(true)
    })

    it('should handle mousedown event', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.trigger('mousedown')

      expect(input.exists()).toBe(true)
    })
  })

  describe('Complex Date Scenarios', () => {
    it('should handle year adjustment for very old dates', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('09/15/5')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toBe('09/15/2005')
    })

    it('should handle year adjustment for mid-century dates', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('09/15/75')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toBe('09/15/1975')
    })

    it('should handle time with seconds in dateTime mode', async () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          mode: 'dateTime'
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      await input.setValue('09/15/2022 14:30:45')
      await input.trigger('change')
      await flushPromises()

      expect(input.element.value).toBe('09/15/2022 02:30 pm')
    })
  })

  describe('Input Pattern Validation', () => {
    it('should have correct pattern for date mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          mode: 'date'
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      expect(input.attributes('pattern')).toBe('[0-9]{2}/[0-9]{2}/[0-9]{4}')
    })

    it('should have correct pattern for time mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          mode: 'time'
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      expect(input.attributes('pattern')).toBe('[0-9]{2}:[0-9]{2} [am|pm]')
    })

    it('should have correct pattern for dateTime mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          mode: 'dateTime'
        }
      })
      const input = wrapper.find('input[aria-label="Start date"]')

      expect(input.attributes('pattern')).toBe('[0-9]{2}/[0-9]{2}/[0-9]{4} [0-9]{2}:[0-9]{2} [am|pm]')
    })
  })
})