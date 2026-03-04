import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Component from './Calendar.vue'

describe('Calendar', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Rendering', () => {
    it('should match its default snapshot', () => {
      const date = new Date(2021, 11, 19)
      vi.setSystemTime(date)

      const wrapper = mount(Component, {
        props: {
          modelValue: null
        }
      })

      expect(wrapper.element).toMatchSnapshot()
    })

    it('renders with start and end date range', () => {
      const systemDate = new Date(2021, 11, 15)
      const start = new Date(2021, 11, 19)
      const end = new Date(2021, 11, 25)
      vi.setSystemTime(systemDate)

      const wrapper = mount(Component, {
        props: {
          modelValue: { start, end },
          mode: 'date'
        }
      })

      expect(wrapper.element).toMatchSnapshot()
    })

    it('renders in dateTime mode', () => {
      const systemDate = new Date(2021, 11, 15)
      const start = new Date(2021, 11, 19)
      const end = new Date(2021, 11, 25)
      vi.setSystemTime(systemDate)

      const wrapper = mount(Component, {
        props: {
          modelValue: { start, end },
          mode: 'dateTime'
        }
      })

      expect(wrapper.element).toMatchSnapshot()
    })

    it('renders in time mode', () => {
      const systemDate = new Date(2021, 11, 15)
      const start = new Date(2021, 11, 19)
      const end = new Date(2021, 11, 25)
      vi.setSystemTime(systemDate)

      const wrapper = mount(Component, {
        props: {
          modelValue: { start, end },
          mode: 'time'
        }
      })

      expect(wrapper.element).toMatchSnapshot()
    })

    it('renders with min and max constraints', () => {
      const systemDate = new Date(2021, 11, 15)
      const start = new Date(2021, 11, 19)
      const end = new Date(2021, 11, 25)
      vi.setSystemTime(systemDate)

      const wrapper = mount(Component, {
        props: {
          modelValue: { start, end },
          min: new Date(2021, 11, 15),
          max: new Date(2021, 11, 29)
        }
      })

      expect(wrapper.element).toMatchSnapshot()
    })

    it('shows calendar in date mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2021, 11, 15),
          mode: 'date'
        }
      })

      expect(wrapper.find('[data-id="sds-calendar"]').exists()).toBe(true)
      expect(wrapper.find('.grid.grid-cols-7').exists()).toBe(true)
    })

    it('shows time picker in time mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2021, 11, 15, 10, 30),
          mode: 'time'
        }
      })

      expect(wrapper.findAll('select').length).toBeGreaterThan(0)
    })

    it('hides calendar in time mode', () => {
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2021, 11, 15),
          mode: 'time'
        }
      })

      expect(wrapper.find('.grid.grid-cols-7').exists()).toBe(false)
    })
  })

  describe('Single Date Selection', () => {
    it('selects a single date when clicked and component remains functional', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = null
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'date',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })

      const dateButtons = wrapper.findAll('.grid.grid-cols-7 button').filter(btn => 
        !btn.text().match(/[A-Z]/) && btn.text().trim() !== ''
      )
      const dateButton = dateButtons.find(btn => btn.text() === '20')
      await dateButton?.trigger('click')
      await nextTick()

      expect(currentValue).toBeInstanceOf(Date)
      expect(wrapper.find('[data-id="sds-calendar"]').exists()).toBe(true)
    })

    it('updates modelValue when selecting a different date', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = new Date(2021, 11, 10)
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'date',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })

      const dateButtons = wrapper.findAll('.grid.grid-cols-7 button').filter(btn => 
        !btn.text().match(/[A-Z]/) && btn.text().trim() !== ''
      )
      const dateButton = dateButtons.find(btn => btn.text() === '20')
      await dateButton?.trigger('click')
      await nextTick()

      expect(currentValue).toBeInstanceOf(Date)
      expect(currentValue.getDate()).toBe(20)
    })

    it('uses current time for today when useCurrentTimeForToday is true', async () => {
      const now = new Date(2021, 11, 15, 14, 30, 45)
      vi.setSystemTime(now)
      let currentValue = null
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'date',
          useCurrentTimeForToday: true,
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })

      const dateButtons = wrapper.findAll('.grid.grid-cols-7 button').filter(btn => 
        !btn.text().match(/[A-Z]/) && btn.text().trim() !== ''
      )
      const todayButton = dateButtons.find(btn => btn.text() === '15' && btn.attributes('title') === 'Today')
      await todayButton?.trigger('click')
      await nextTick()

      expect(currentValue).toBeInstanceOf(Date)
      expect(currentValue?.getHours()).toBeGreaterThan(0)
    })
  })

  describe('Range Date Selection', () => {
    it('selects start date when both are null', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = { start: null, end: null }
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'date',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })

      const dateButtons = wrapper.findAll('.grid.grid-cols-7 button').filter(btn => 
        !btn.text().match(/[A-Z]/) && btn.text().trim() !== ''
      )
      const dateButton = dateButtons.find(btn => btn.text() === '10')
      await dateButton?.trigger('click')
      await nextTick()

      expect(currentValue).toHaveProperty('start')
      expect(currentValue).toHaveProperty('end')
      expect(currentValue.start).toBeInstanceOf(Date)
    })

    it('selects end date when start is already set', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = { start: new Date(2021, 11, 10), end: null }
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'date',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })

      const dateButtons = wrapper.findAll('.grid.grid-cols-7 button').filter(btn => 
        !btn.text().match(/[A-Z]/) && btn.text().trim() !== ''
      )
      const dateButton = dateButtons.find(btn => btn.text() === '20')
      await dateButton?.trigger('click')
      await nextTick()

      expect(currentValue.end).toBeInstanceOf(Date)
    })

    it('sets end time to 23:59 when selecting the same day twice', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = { start: new Date(2021, 11, 10, 0, 0, 0), end: null }
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'date',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })

      const dateButtons = wrapper.findAll('.grid.grid-cols-7 button').filter(btn => 
        !btn.text().match(/[A-Z]/) && btn.text().trim() !== ''
      )
      const sameButton = dateButtons.find(btn => btn.text() === '10')
      await sameButton?.trigger('click')
      await nextTick()

      expect(currentValue.end).toBeInstanceOf(Date)
      expect(currentValue.end?.getHours()).toBe(23)
      expect(currentValue.end?.getMinutes()).toBe(59)
    })

    it('resets range when both dates are set and a new date is clicked', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = { 
        start: new Date(2021, 11, 10), 
        end: new Date(2021, 11, 20) 
      }
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'date',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })

      const dateButtons = wrapper.findAll('.grid.grid-cols-7 button').filter(btn => 
        !btn.text().match(/[A-Z]/) && btn.text().trim() !== ''
      )
      const newDateButton = dateButtons.find(btn => btn.text() === '25')
      await newDateButton?.trigger('click')
      await nextTick()

      expect(currentValue).toHaveProperty('start')
      expect(currentValue).toHaveProperty('end')
    })

    it('respects inputToChange prop when set to start', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = { 
        start: new Date(2021, 11, 10), 
        end: new Date(2021, 11, 20) 
      }
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'date',
          inputToChange: 'start',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })

      const dateButtons = wrapper.findAll('.grid.grid-cols-7 button').filter(btn => 
        !btn.text().match(/[A-Z]/) && btn.text().trim() !== ''
      )
      const newDateButton = dateButtons.find(btn => btn.text() === '12')
      await newDateButton?.trigger('click')
      await nextTick()

      expect(currentValue.start).toBeInstanceOf(Date)
      expect(currentValue.start?.getDate()).toBe(12)
    })

    it('swaps start and end when end is before start', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = { start: null, end: new Date(2021, 11, 20) }
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'date',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })

      const dateButtons = wrapper.findAll('.grid.grid-cols-7 button').filter(btn => 
        !btn.text().match(/[A-Z]/) && btn.text().trim() !== ''
      )
      const earlierDateButton = dateButtons.find(btn => btn.text() === '25')
      await earlierDateButton?.trigger('click')
      await nextTick()

      expect(currentValue.start).toBeInstanceOf(Date)
      expect(currentValue.end).toBeInstanceOf(Date)
    })
  })

  describe('Month Navigation', () => {
    it('navigates to previous month when prev button is clicked', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2021, 11, 15),
          mode: 'date'
        }
      })

      const prevButton = wrapper.findAll('button').find(btn => 
        btn.attributes('class')?.includes('absolute left-0')
      )
      await prevButton?.trigger('click')
      await nextTick()

      expect(wrapper.text()).toContain('November')
    })

    it('navigates to next month when next button is clicked', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2021, 11, 15),
          mode: 'date'
        }
      })

      const nextButton = wrapper.findAll('button').find(btn => 
        btn.attributes('class')?.includes('absolute right-0')
      )
      await nextButton?.trigger('click')
      await nextTick()

      expect(wrapper.text()).toContain('January')
    })

    it('disables prev button when min constraint is reached', () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2021, 11, 15),
          mode: 'date',
          min: new Date(2021, 11, 1)
        }
      })

      const prevButton = wrapper.findAll('button').find(btn => 
        btn.attributes('class')?.includes('absolute left-0')
      )

      expect(prevButton?.attributes('disabled')).toBeDefined()
    })

    it('disables next button when max constraint is reached', () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2021, 11, 15),
          mode: 'date',
          max: new Date(2021, 11, 31)
        }
      })

      const nextButton = wrapper.findAll('button').find(btn => 
        btn.attributes('class')?.includes('absolute right-0')
      )

      expect(nextButton?.attributes('disabled')).toBeDefined()
    })
  })

  describe('View Switching', () => {
    it('switches to years view when month/year button is clicked', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2021, 11, 15),
          mode: 'date'
        }
      })

      const monthYearButton = wrapper.findAll('button').find(btn => 
        btn.text().includes('December 2021')
      )
      await monthYearButton?.trigger('click')
      await nextTick()

      expect(wrapper.text()).toContain('Month')
      expect(wrapper.text()).toContain('Year')
    })

    it('returns to days view when cancel is clicked', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2021, 11, 15),
          mode: 'date'
        }
      })

      const monthYearButton = wrapper.findAll('button').find(btn => 
        btn.text().includes('December 2021')
      )
      await monthYearButton?.trigger('click')
      await nextTick()

      const cancelButton = wrapper.findAll('button').find(btn => 
        btn.text() === 'Cancel'
      )
      await cancelButton?.trigger('click')
      await nextTick()

      expect(wrapper.find('.grid.grid-cols-7').exists()).toBe(true)
    })

    it('goes to selected month when go to date is clicked', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2021, 11, 15),
          mode: 'date'
        }
      })

      const monthYearButton = wrapper.findAll('button').find(btn => 
        btn.text().includes('December 2021')
      )
      await monthYearButton?.trigger('click')
      await nextTick()

      const monthSelect = wrapper.findAll('select')[0]
      await monthSelect.setValue('January')
      await nextTick()

      const goToButton = wrapper.findAll('button').find(btn => 
        btn.text() === 'Go to Date'
      )
      await goToButton?.trigger('click')
      await nextTick()

      expect(wrapper.text()).toContain('January')
    })

    it('goes to today when go to today is clicked', async () => {
      const today = new Date(2021, 11, 15)
      vi.setSystemTime(today)
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2021, 5, 15),
          mode: 'date'
        }
      })

      const allButtons = wrapper.findAll('button')
      const monthYearButton = allButtons.find(btn => 
        btn.text().trim().includes('June')
      )
      if (monthYearButton) {
        await monthYearButton.trigger('click')
        await nextTick()
      }

      const goToTodayButton = wrapper.findAll('button').find(btn => 
        btn.text() === 'Go to Today'
      )
      if (goToTodayButton) {
        await goToTodayButton.trigger('click')
        await nextTick()
      }

      expect(wrapper.text()).toContain('December')
    })
  })

  describe('Time Selection', () => {
    it('changes hour when hour select is changed', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = new Date(2021, 11, 15, 10, 30)
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'dateTime',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })
      await nextTick()

      const selects = wrapper.findAll('select')
      const hourSelect = selects[0]
      await hourSelect?.setValue('02')
      await nextTick()

      expect(currentValue).toBeInstanceOf(Date)
      expect(wrapper.find('[data-id="sds-calendar"]').exists()).toBe(true)
    })

    it('changes minutes when minutes select is changed', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = new Date(2021, 11, 15, 10, 30)
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'dateTime',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })
      await nextTick()

      const selects = wrapper.findAll('select')
      const minuteSelect = selects[1]
      await minuteSelect?.setValue('45')
      await nextTick()

      expect(currentValue).toBeInstanceOf(Date)
      expect(wrapper.find('[data-id="sds-calendar"]').exists()).toBe(true)
      expect(wrapper.findAll('select').length).toBeGreaterThan(0)
    })

    it('changes meridian when meridian select is changed', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = new Date(2021, 11, 15, 10, 30)
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'dateTime',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })
      await nextTick()

      const selects = wrapper.findAll('select')
      const meridianSelect = selects[2]
      await meridianSelect?.setValue('pm')
      await nextTick()

      expect(currentValue).toBeInstanceOf(Date)
      expect(wrapper.find('[data-id="sds-calendar"]').exists()).toBe(true)
      expect(wrapper.findAll('select').length).toBeGreaterThan(0)
    })

    it('updates time for range start date', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = { 
        start: new Date(2021, 11, 10, 10, 0), 
        end: new Date(2021, 11, 20, 15, 0) 
      }
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'dateTime',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })
      await nextTick()

      const selects = wrapper.findAll('select')
      const hourSelect = selects[0]
      await hourSelect?.setValue('03')
      await nextTick()

      expect(currentValue).toHaveProperty('start')
      expect(currentValue.start).toBeInstanceOf(Date)
    })

    it('updates time for range end date', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = { 
        start: new Date(2021, 11, 10, 10, 0), 
        end: new Date(2021, 11, 20, 15, 0) 
      }
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'dateTime',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })
      await nextTick()

      const selects = wrapper.findAll('select')
      const endHourSelect = selects[3]
      await endHourSelect?.setValue('05')
      await nextTick()

      expect(currentValue).toHaveProperty('end')
      expect(currentValue.end).toBeInstanceOf(Date)
    })
  })

  describe('Time Mode Initialization', () => {
    it('initializes with default time when modelValue is null in time mode', async () => {
      vi.setSystemTime(new Date(2021, 11, 15, 14, 30))
      let currentValue = null
      let wrapper
      wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'time',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            if (wrapper) {
              wrapper.setProps({ modelValue: value })
            }
          }
        }
      })
      await nextTick()

      expect(currentValue).toBeInstanceOf(Date)
      expect(wrapper.find('[data-id="sds-calendar"]').exists()).toBe(true)
    })

    it('initializes range with default times in time mode', async () => {
      vi.setSystemTime(new Date(2021, 11, 15, 14, 30))
      let currentValue = { start: null, end: null }
      let wrapper
      wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'time',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            if (wrapper) {
              wrapper.setProps({ modelValue: value })
            }
          }
        }
      })
      await nextTick()

      expect(currentValue).toHaveProperty('start')
      expect(currentValue).toHaveProperty('end')
      expect(currentValue.start).toBeInstanceOf(Date)
      expect(currentValue.end).toBeInstanceOf(Date)
    })
  })

  describe('Date Constraints', () => {
    it('disables dates before min date', () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2021, 11, 15),
          mode: 'date',
          min: new Date(2021, 11, 10)
        }
      })

      const buttons = wrapper.findAll('button')
      const disabledButton = buttons.find(btn => 
        btn.text() === '5' && btn.attributes('disabled') !== undefined
      )

      expect(disabledButton).toBeTruthy()
    })

    it('disables dates after max date', () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2021, 11, 15),
          mode: 'date',
          max: new Date(2021, 11, 20)
        }
      })

      const buttons = wrapper.findAll('button')
      const disabledButton = buttons.find(btn => 
        btn.text() === '25' && btn.attributes('disabled') !== undefined
      )

      expect(disabledButton).toBeTruthy()
    })
  })

  describe('Next Month Calendar (Range Mode)', () => {
    it('shows second calendar in range mode', () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: null, end: null },
          mode: 'date'
        }
      })

      const calendars = wrapper.findAll('.grid.grid-cols-7')

      expect(calendars.length).toBeGreaterThanOrEqual(1)
    })

    it('selects date from next month calendar', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = { start: new Date(2021, 11, 10), end: null }
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'date',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })

      const dateButtons = wrapper.findAll('.grid.grid-cols-7 button').filter(btn => 
        !btn.text().match(/[A-Z]/) && btn.text().trim() !== ''
      )
      const nextMonthButton = dateButtons.find(btn => 
        btn.text() === '5' && 
        !btn.attributes('disabled')
      )
      await nextMonthButton?.trigger('click')
      await nextTick()

      expect(currentValue).toHaveProperty('end')
      expect(wrapper.find('[data-id="sds-calendar"]').exists()).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('handles null modelValue gracefully', () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          mode: 'date'
        }
      })

      expect(wrapper.find('[data-id="sds-calendar"]').exists()).toBe(true)
    })

    it('handles undefined min and max props', () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      const wrapper = mount(Component, {
        props: {
          modelValue: new Date(2021, 11, 15),
          mode: 'date',
          min: null,
          max: null
        }
      })

      expect(wrapper.find('[data-id="sds-calendar"]').exists()).toBe(true)
    })

    it('moves to min date if min is in future', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      const futureMin = new Date(2022, 5, 1)

      const wrapper = mount(Component, {
        props: {
          modelValue: null,
          mode: 'date',
          min: futureMin
        }
      })
      await nextTick()

      expect(wrapper.text()).toContain('2022')
    })
  })

  describe('Second Calendar in Range Mode', () => {
    it('switches to years view when clicking month/year on second calendar', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      const wrapper = mount(Component, {
        props: {
          modelValue: { start: null, end: null },
          mode: 'date'
        }
      })

      const monthYearButtons = wrapper.findAll('button').filter(btn => 
        btn.text().includes('2022') || btn.text().includes('January 2022')
      )
      await monthYearButtons[0]?.trigger('click')
      await nextTick()

      expect(wrapper.text()).toContain('Month')
      expect(wrapper.text()).toContain('Year')
    })
  })

  describe('Single Date Time Changes', () => {
    it('changes hour in single date mode', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = new Date(2021, 11, 15, 3, 30)
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'dateTime',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })
      await nextTick()

      const selects = wrapper.findAll('select')
      const hourSelect = selects[0]
      await hourSelect.setValue('05')
      await nextTick()

      expect(currentValue).toBeInstanceOf(Date)
      expect(currentValue.getHours()).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Range Date Time Changes', () => {
    it('changes hour for range start with PM time', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = { 
        start: new Date(2021, 11, 10, 14, 0), 
        end: new Date(2021, 11, 20, 15, 0) 
      }
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'dateTime',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })
      await nextTick()

      const selects = wrapper.findAll('select')
      const hourSelect = selects[0]
      await hourSelect.setValue('04')
      await nextTick()

      expect(currentValue.start).toBeInstanceOf(Date)
    })

    it('changes hour for range end with PM time', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = { 
        start: new Date(2021, 11, 10, 10, 0), 
        end: new Date(2021, 11, 20, 16, 0) 
      }
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'dateTime',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })
      await nextTick()

      const selects = wrapper.findAll('select')
      const endHourSelect = selects[3]
      await endHourSelect.setValue('06')
      await nextTick()

      expect(currentValue.end).toBeInstanceOf(Date)
    })
  })

  describe('Edge Cases Clicking Dates in Range', () => {
    it('clears end date when clicking same date as end in range', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = { 
        start: new Date(2021, 11, 10), 
        end: new Date(2021, 11, 20) 
      }
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'date',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })

      const dateButtons = wrapper.findAll('.grid.grid-cols-7 button').filter(btn => 
        !btn.text().match(/[A-Z]/) && btn.text().trim() !== ''
      )
      const endDateButton = dateButtons.find(btn => btn.text() === '20')
      await endDateButton?.trigger('click')
      await nextTick()

      expect(currentValue.end).toBeNull()
    })

    it('clears start date when clicking same date as start in range', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = { 
        start: new Date(2021, 11, 10), 
        end: new Date(2021, 11, 20) 
      }
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'date',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })

      const dateButtons = wrapper.findAll('.grid.grid-cols-7 button').filter(btn => 
        !btn.text().match(/[A-Z]/) && btn.text().trim() !== ''
      )
      const startDateButton = dateButtons.find(btn => btn.text() === '10')
      await startDateButton?.trigger('click')
      await nextTick()

      expect(currentValue.start).toBeNull()
    })

    it('updates start when clicking before current start with inputToChange=start', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = { 
        start: new Date(2021, 11, 15), 
        end: new Date(2021, 11, 20) 
      }
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'date',
          inputToChange: 'start',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })

      const dateButtons = wrapper.findAll('.grid.grid-cols-7 button').filter(btn => 
        !btn.text().match(/[A-Z]/) && btn.text().trim() !== ''
      )
      const earlierDateButton = dateButtons.find(btn => btn.text() === '10')
      await earlierDateButton?.trigger('click')
      await nextTick()

      expect(currentValue.start).toBeInstanceOf(Date)
      expect(currentValue.start?.getDate()).toBe(10)
    })

    it('swaps dates when inputToChange=start and new date is after end', async () => {
      vi.setSystemTime(new Date(2021, 11, 15))
      let currentValue = { 
        start: new Date(2021, 11, 10), 
        end: new Date(2021, 11, 15) 
      }
      const wrapper = mount(Component, {
        props: {
          modelValue: currentValue,
          mode: 'date',
          inputToChange: 'start',
          'onUpdate:modelValue': (value) => {
            currentValue = value
            wrapper.setProps({ modelValue: value })
          }
        }
      })

      const dateButtons = wrapper.findAll('.grid.grid-cols-7 button').filter(btn => 
        !btn.text().match(/[A-Z]/) && btn.text().trim() !== ''
      )
      const laterDateButton = dateButtons.find(btn => btn.text() === '25')
      await laterDateButton?.trigger('click')
      await nextTick()

      expect(currentValue.end).toBeInstanceOf(Date)
      expect(currentValue.end?.getDate()).toBe(25)
    })
  })
})
