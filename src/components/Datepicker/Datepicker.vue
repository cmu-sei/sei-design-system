<template>
  <SdsFloatingUi
    data-id="sds-datepicker"
    class="w-full"
    :placement="placement"
    :disabled="disabled"
    :popper-class="`absolute bg-white border dark:text-gray-50 dark:bg-gray-850 dark:border-gray-700 shadow-lg rounded-theme-md w-auto ${zIndexClass}`"
    arrow-class="absolute bg-white border dark:bg-gray-850 dark:border-gray-700 w-3 h-3 rotate-45"
    placement-top-arrow-class="-bottom-1.5 border-t-0 border-l-0"
    placement-right-arrow-class="-left-1.5 border-t-0 border-r-0"
    placement-bottom-arrow-class="-top-1.5 border-b-0 border-r-0"
    placement-left-arrow-class="-right-1.5 border-b-0 border-l-0"
  >
    <template #trigger="{ open, close, toggle }">
      <div
        class="flex w-full"
        :class="{ 'gap-1': size === 'sm', 'gap-2': size !== 'sm' }"
      >
        <div
          class="w-full input-group"
          :class="{
            'input-group-sm': size === 'sm',
            ...validationClasses
          }"
        >
          <button
            type="button"
            tabindex="-1"
            class="input-group-addon fill-current"
            :class="{
              'pointer-events-none text-gray-300 border-gray-200': disabled || readonly,
              'border-none': disabled,
            }"
            :disabled="disabled || readonly || undefined"
            @click="toggle(); ($refs.startDateInput as HTMLElement).focus()"
          >
            <IconFa7RegularClock
              v-if="mode === 'time'"
              :class="{ 'w-5 h-5': size !== 'sm', 'w-4 h-4': size === 'sm' }"
            />
            <IconFa7RegularCalendar
              v-else
              :class="{ 'w-5 h-5': size !== 'sm', 'w-4 h-4': size === 'sm' }"
            />
            <span class="sr-only">Select a date</span>
          </button>
          <input
            ref="startDateInput"
            v-model="inputDate.start"
            aria-label="Start date"
            type="text"
            class="form-control"
            :title="`${placeholder}`"
            :placeholder="placeholder || undefined"
            :readonly="readonly || undefined"
            :disabled="disabled || undefined"
            :required="required || undefined"
            :pattern="inputPattern"
            @focusin="!readonly ? open() : undefined"
            @mouseup="inputToChange = 'start'"
            @keyup="inputToChange = 'start'"
            @keydown.tab="updateDatesFromInput(close)"
            @mousedown.stop="!readonly ? toggle() : undefined"
            @keyup.up="close()"
            @keyup.down="!readonly ? open() : undefined"
            @keydown.enter.prevent="updateDatesFromInput(toggle)"
            @change="updateDatesFromInput()"
          >
        </div>
        <template v-if="isRange">
          <div
            v-if="!hideArrow"
            class="flex my-auto shrink-0"
            :class="{
              'opacity-50': disabled || readonly
            }"
          >
            <IconFa7SolidArrowRight
              class="text-gray-700"
              :class="{ 'w-5 h-5': size !== 'sm', 'w-4 h-4': size === 'sm' }"
            />
          </div>
          <div
            class="w-full input-group"
            :class="{
              'input-group-sm': size === 'sm',
              disabled,
              readonly,
              valid,
              invalid
            }"
          >
            <button
              type="button"
              tabindex="-1"
              class="input-group-addon fill-current"
              :class="{
                'pointer-events-none opacity-50': disabled || readonly
              }"
              :disabled="disabled || readonly || undefined"
              @click="toggle(); ($refs.endDateInput as HTMLElement).focus()"
            >
              <IconFa7RegularClock
                v-if="mode === 'time'"
                :class="{ 'w-5 h-5': size !== 'sm', 'w-4 h-4': size === 'sm' }"
              />
              <IconFa7RegularCalendar
                v-else
                :class="{ 'w-5 h-5': size !== 'sm', 'w-4 h-4': size === 'sm' }"
              />
              <span class="sr-only">Select a date</span>
            </button>
            <input
              ref="endDateInput"
              v-model="inputDate.end"
              aria-label="End date"
              type="text"
              class="form-control"
              :title="`${placeholder}`"
              :placeholder="placeholder || undefined"
              :readonly="readonly || undefined"
              :disabled="disabled || undefined"
              :required="required || undefined"
              :pattern="inputPattern"
              @focusin="!readonly ? open() : undefined"
              @mouseup="inputToChange = 'end'"
              @keyup="inputToChange = 'end'"
              @keydown.tab="updateDatesFromInput(close)"
              @mousedown.stop="!readonly ? toggle() : undefined"
              @keyup.up="close()"
              @keyup.down="!readonly ? open() : undefined"
              @keydown.enter.prevent="updateDatesFromInput(toggle)"
              @change="updateDatesFromInput()"
            >
          </div>
        </template>
      </div>
    </template>
    <template #default="{ close }">
      <div class="p-4">
        <SdsCalendar
          v-model="localDate"
          :min="min"
          :max="max"
          :mode="mode"
          :use-current-time-for-today="useCurrentTimeForToday"
          :input-to-change="inputToChange"
          @update:model-value="($event: CalendarDate | CalendarRange) => focusCorrectInput(close)"
        />
      </div>
    </template>
  </SdsFloatingUi>
</template>

<script setup lang="ts">
import { useFormField} from '@/composables'
import SdsFloatingUi from '../FloatingUi/FloatingUi.vue'
import SdsCalendar from '../Calendar/Calendar.vue'

import { parse } from 'date-fns/parse'
import { format } from 'date-fns/format'
import { isValid } from 'date-fns/isValid'
import { min as dateFnsMin } from 'date-fns/min'
import { max as dateFnsMax } from 'date-fns/max'
import { isBefore } from 'date-fns/isBefore'
import { isAfter } from 'date-fns/isAfter'
import { isEqual } from 'date-fns/isEqual'
import { setHours } from 'date-fns/setHours'
import { setMinutes } from 'date-fns/setMinutes'
import { setMilliseconds } from 'date-fns/setMilliseconds'
import { setSeconds } from 'date-fns/setSeconds'
import { addDays } from 'date-fns/addDays'
import { subDays } from 'date-fns/subDays'
import { addYears } from 'date-fns/addYears'

import type { Placement as BasePlacement } from '@floating-ui/dom'
import type { CalendarDate, CalendarMode, CalendarRange } from '../Calendar/Calendar.vue'

export type DatepickerPlacement = BasePlacement | 'auto' | 'auto-start' | 'auto-end'

interface DatepickerProps {
  /**
   * The z-index for the popover.
   */
  zIndex?: '0' | '10' | '20' | '30' | '40' | '50' | 'auto';
  /**
   * Determines whether to display or hide the arrow for range selection.
   */
  hideArrow?: boolean;
  /**
   * Determines the sizing of the component.
   */
  size?: 'md' | 'sm';
  /**
   * Determines the mode of the component.
   */
  mode?: CalendarMode;
  /**
   * The placement of the popover on the screen.
   */
  placement?: DatepickerPlacement;
  /**
   * The max date allowed for the datepicker.
   */
  max?: Date | null;
  /**
   * The min date allowed for the datepicker.  */
  min?: Date | null;
  /**
   * Determines whether to use the current time when selecting a date that is equal to today.
   *
   * If false, this sets the time to the start of the date.
   */
  useCurrentTimeForToday?: boolean;
  /**
   * Disabled state for the form field.
   */
  disabled?: boolean;
  /**
   * Readonly state for the form field.
   */
  readonly?: boolean;
  /**
   * Required state for the form field.
   */
  required?: boolean;
  /**
   * Valid state for the form field.
   */
  valid?: boolean;
  /**
   * Invalid state for the form field.
   */
  invalid?: boolean;
}

defineOptions({
  name: 'SdsDatepicker'
})

const props = withDefaults(defineProps<DatepickerProps>(), {
  zIndex: '50',
  hideArrow: false,
  size: 'md',
  mode: 'date',
  placement: 'bottom',
  max: null,
  min: null,
  useCurrentTimeForToday: false,
  disabled: false,
  readonly: false,
  required: false,
  valid: false,
  invalid: false
})

/**
 * The v-model for the component.
 *
 * For single selections, this value can be null or a date object.
 *
 * For range selections, this is an object with start and end keys
 * that can either be null or a date object.
 *
 * Range example:
 *
 * **{ start: new Date(), end: null }**
 */
const model = defineModel<CalendarRange | CalendarDate>({
  type: [Object, Date] as PropType<CalendarRange | CalendarDate>,
  default: null
})

const emit = defineEmits(['update:modelValue'])

const { validationClasses } = useFormField(props)

const inputDate = ref({ start: '', end: '' })
const startDateInput = ref()
const endDateInput = ref()

const zIndexClass = computed(() => {
  switch (props.zIndex) {
    case '0':
      return 'z-0'
    case '10':
      return 'z-10'
    case '20':
      return 'z-20'
    case '30':
      return 'z-30'
    case '40':
      return 'z-40'
    case '50':
      return 'z-50'
    case 'auto':
      return 'z-auto'
    default:
      return 'z-50'
  }
})

const isRange = computed(() => {
  return model.value && !(model.value instanceof Date)
})

const placeholder = computed(() => {
  switch (props.mode) {
    case 'date':
      return 'mm/dd/yyyy'
    case 'time':
      return 'hh:mm am/pm'
    case 'dateTime':
      return 'mm/dd/yyyy hh:mm am/pm'
    default:
      return 'mm/dd/yyyy'
  }
})

const inputFormat = computed(() => {
  switch (props.mode) {
    case 'date':
      return 'MM/dd/yyyy'
    case 'time':
      return 'hh:mm aaa'
    case 'dateTime':
      return 'MM/dd/yyyy hh:mm aaa'
    default:
      return 'MM/dd/yyyy'
  }
})

const inputPattern = computed(() => {
  switch (props.mode) {
    case 'date':
      return '[0-9]{2}/[0-9]{2}/[0-9]{4}'
    case 'time':
      return '[0-9]{2}:[0-9]{2} [am|pm]'
    case 'dateTime':
      return '[0-9]{2}/[0-9]{2}/[0-9]{4} [0-9]{2}:[0-9]{2} [am|pm]'
    default:
      return '[0-9]{2}/[0-9]{2}/[0-9]{4}'
  }
})

const localDate = computed({
  get(): CalendarRange | CalendarDate {
    return model.value
  },
  set(value: CalendarRange | CalendarDate) {
    /**
     * Emmitted when modelValue changes.
     */
    emit('update:modelValue', value)
  }
})

const inputToChange = ref<'start' | 'end'>()

const previousDateValues = ref<CalendarDate | CalendarRange>()

const formatDate = (dateString: string) => {
  if (dateString === 'now') {
    const date = new Date()
    return { date, text: format(date, inputFormat.value) }
  } else if (dateString === 'today') {
    const date = setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 0)
    return { date, text: format(date, inputFormat.value) }
  } else if (dateString === 'tomorrow') {
    const date = addDays(setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 0), 1)
    return { date, text: format(date, inputFormat.value) }
  } else if (dateString === 'yesterday') {
    const date = subDays(setHours(setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0), 0), 1)
    return { date, text: format(date, inputFormat.value) }
  }

  const formats = [
    'MM/dd/yyyy hh:mm aaa',
    'MM/dd/yyyy hh:mm a',
    'MM/dd/yyyy h:mm aaa',
    'MM/dd/yyyy h:mm a',
    'MM/dd/yyyy hh:mmaaa',
    'MM/dd/yyyy hh:mma',
    'MM/dd/yyyy h:mmaaa',
    'MM/dd/yyyy h:mma',
    'MM/dd/yyyy H:mm',
    'MM/dd/yyyy HH:mm',
    'MM/dd/yyyy HH:mm:ss',
    'MM-dd-yyyy hh:mm aaa',
    'MM-dd-yyyy hh:mm a',
    'MM-dd-yyyy h:mm aaa',
    'MM-dd-yyyy h:mm a',
    'MM-dd-yyyy ha',
    'MM-dd-yyyy haaa',
    'MM-dd-yyyy hh:mmaaa',
    'MM-dd-yyyy hh:mma',
    'MM-dd-yyyy h:mmaaa',
    'MM-dd-yyyy h:mma',
    'MM-dd-yyyy H:mm',
    'MM-dd-yyyy HH:mm',
    'MM-dd-yyyy HH:mm:ss',
    'yyyy-MM-dd hh:mm aaa',
    'yyyy-MM-dd hh:mm a',
    'yyyy-MM-dd h:mm aaa',
    'yyyy-MM-dd h:mm a',
    'yyyy-MM-dd hh:mma',
    'yyyy-MM-dd h:mmaaa',
    'yyyy-MM-dd h:mma',
    'yyyy-MM-dd H:mm',
    'yyyy-MM-dd HH:mm',
    'yyyy-MM-dd HH:mm:ss',
    'MM/dd/yyyy',
    'MM-dd-yyyy',
    'MMddyyyy',
    'yyyy-MM-dd',
    'M/d',
    'MM/dd',
    'MM/yyyy',
    'M-d',
    'MM-dd',
    'MM-yyyy',
    'yyyy/MM',
    'yyyy-MM',
    'M/dd/yyyy hh:mm aaa',
    'M/dd/yyyy hh:mm a',
    'M/dd/yyyy h:mm aaa',
    'M/dd/yyyy h:mm a',
    'M/dd/yyyy ha',
    'M/dd/yyyy haaa',
    'M/dd/yyyy hh:mmaaa',
    'M/dd/yyyy hh:mma',
    'M/dd/yyyy h:mmaaa',
    'M/dd/yyyy h:mma',
    'M/dd/yyyy H:mm',
    'M/dd/yyyy HH:mm',
    'M/dd/yyyy HH:mm:ss',
    'M-dd-yyyy hh:mm aaa',
    'M-dd-yyyy hh:mm a',
    'M-dd-yyyy h:mm aaa',
    'M-dd-yyyy h:mm a',
    'M-dd-yyyy hh:mmaaa',
    'M-dd-yyyy hh:mma',
    'M-dd-yyyy h:mmaaa',
    'M-dd-yyyy h:mma',
    'M-dd-yyyy H:mm',
    'M-dd-yyyy HH:mm',
    'M-dd-yyyy HH:mm:ss',
    'yyyy-M-dd hh:mm aaa',
    'yyyy-M-dd hh:mm a',
    'yyyy-M-dd h:mm aaa',
    'yyyy-M-dd h:mm a',
    'yyyy-M-dd hh:mma',
    'yyyy-M-dd h:mmaaa',
    'yyyy-M-dd h:mma',
    'yyyy-M-dd H:mm',
    'yyyy-M-dd HH:mm',
    'yyyy-M-dd HH:mm:ss',
    'yyyy-M-dd',
    'M/yyyy',
    'M-yyyy',
    'M/yyyy haaa',
    'M-yyyy haaa',
    'M/yyyy ha',
    'M/yyyy HH:mm:ss',
    'M-yyyy HH:mm:ss',
    'M.yyyy HH:mm:ss',
    'M-yyyy ha',
    'M/yyyy h:mmaaa',
    'M-yyyy h:mmaaa',
    'M/yyyy h:mma',
    'M-yyyy h:mma',
    'M/yyyy h:mm aaa',
    'M-yyyy h:mm aaa',
    'M/yyyy h:mm a',
    'M-yyyy h:mm a',
    'yyyy/M',
    'yyyy-M',
    'yyyy',
    'EEE',
    'EEEE',
    'LLL',
    'LLLL',
    'LLL yyyy',
    'LLLL yyyy',
    'LLL dd yyyy',
    'LLLL dd yyyy',
    'hh:mm aaa',
    'hh:mm a',
    'h:mm aaa',
    'h:mm a',
    'hh:mmaaa',
    'hh:mma',
    'h:mmaaa',
    'h:mma',
    'HH:mm:ss',
    'H:mm',
    'HH:mm',
    'QQQ',
    'QQQQ',
    'QQQ yyyy',
    'QQQQ yyyy',
    'PP',
    'PPP',
    'PPPP',
    'bbb',
    'h BBB',
    'h:mm BBB',
    'hh BBB',
    'hh:mm BBB',
    'hBBB',
    'h:mmBBB',
    'hhBBB',
    'hh:mmBBB'
  ]

  // validate the format and store the found format for later processing
  const validDates = formats.filter((format) => {
    return isValid(parse(dateString, format, new Date()))
  })

  if (validDates.length > 0) {
    let date = parse(dateString, validDates[0], new Date())
    if (props.mode === 'date') {
      date = setHours(setMinutes(setSeconds(setMilliseconds(date, 0), 0), 0), 0)
    } else if (props.mode === 'time') {
      date = parse(format(date, 'yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss', new Date())
    }

    // Force at least year 2000 when it is less than year 1000
    const fullYear = date.getFullYear()
    if (fullYear < 41) {
      date = addYears(date, 2000)
    } else if (fullYear >= 41 && fullYear < 99) {
      date = addYears(date, 1900)
    }

    const dateIsBeforeMin = props.min ? isBefore(date, props.min) : false
    const dateIsAfterMax = props.max ? isAfter(subDays(date, 1), props.max) : false
    const dateEqualsMax = props.max ? isEqual(subDays(date, 1), props.max) : false
    if (!dateIsBeforeMin && !dateIsAfterMax && !dateEqualsMax) {
      return { date, text: format(date, inputFormat.value) }
    }
  }
  return { date: null, text: '' }
}

watch(localDate, (value: CalendarRange | CalendarDate, oldValue) => {
  previousDateValues.value = oldValue
  if (isRange.value) {
    const formattedStartDate = value && (value as CalendarRange).start && formatDate(format((value as CalendarRange).start as Date, 'yyyy-MM-dd HH:mm:ss')) || { date: null, text: '' }
    const formattedEndDate = (value as CalendarRange).end && formatDate(format((value as CalendarRange).end as Date, 'yyyy-MM-dd HH:mm:ss')) || { date: null, text: '' }
    if (formattedStartDate.date && formattedEndDate.date && isAfter(formattedStartDate.date, formattedEndDate.date)) {
      inputDate.value = {
        start: formattedEndDate.text,
        end: formattedStartDate.text
      }
    } else {
      inputDate.value = {
        start: formattedStartDate.text,
        end: formattedEndDate.text
      }
    }
  } else {
    const formattedStartDate = value && formatDate(format(value as Date, 'yyyy-MM-dd HH:mm:ss')) || { date: null, text: '' }
    inputDate.value = {
      start: formattedStartDate.text,
      end: ''
    }
  }
}, { deep: true, immediate: true })

const focusCorrectInput = async (close: GenericFunctionType) => {
  await nextTick()

  /**
   * Single mode
   */

  if (localDate.value instanceof Date || !localDate.value) {
    startDateInput.value.focus()
  }
  
  /**
   * Range mode
   */

  else if (
    typeof localDate.value === 'object' && 
    typeof previousDateValues.value === 'object' && 
    !(previousDateValues.value instanceof Date)
  ) {
    if (inputToChange.value === 'start') {
      startDateInput.value.focus()
    } else if (inputToChange.value === 'end') {
      endDateInput.value.focus()
    } else {
      if (localDate.value?.start !== previousDateValues.value?.start && localDate.value?.end !== previousDateValues.value?.end) {
        endDateInput.value.focus()
      } else {
        if (localDate.value?.start !== previousDateValues.value?.start) {
          startDateInput.value.focus()
        } else {
          endDateInput.value.focus()
        }
      }
    }
  }

  if (props.mode === 'date') {
    if (isRange.value && inputDate.value.start && inputDate.value.end) {
      close()
    } else if (!isRange.value && inputDate.value.start) {
      close()
    }
  }
}

const updateDatesFromInput = (dropdownFn: null | GenericFunctionType = null) => {
  if (isRange.value) {
    const formattedStartDate = formatDate(inputDate.value.start)
    const formattedEndDate = formatDate(inputDate.value.end)
    localDate.value = {
      start: formattedStartDate.date && formattedEndDate.date && dateFnsMin([formattedStartDate.date, formattedEndDate.date]) || formattedStartDate.date,
      end: formattedStartDate.date && formattedEndDate.date && dateFnsMax([formattedStartDate.date, formattedEndDate.date]) || formattedEndDate.date
    }
    if (formattedStartDate.date && formattedEndDate.date && isAfter(formattedStartDate.date, formattedEndDate.date)) {
      inputDate.value = {
        start: formattedEndDate.text,
        end: formattedStartDate.text
      }
    } else {
      inputDate.value = {
        start: formattedStartDate.text,
        end: formattedEndDate.text
      }
    }
  } else {
    const formattedStartDate = formatDate(inputDate.value.start)
    localDate.value = formattedStartDate.date
    inputDate.value = {
      start: formattedStartDate.text,
      end: ''
    }
  }

  if (!props.readonly && dropdownFn) {
    dropdownFn()
  }
}
</script>
