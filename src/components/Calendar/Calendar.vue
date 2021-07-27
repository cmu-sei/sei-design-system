<template>
  <div class="select-none">
    <header class="flex mb-1">
      <div class="flex-grow my-auto">
        <button
          type="button"
          class="
            flex
            p-1
            space-x-1
            text-xl
            font-semibold
            text-left text-gray-900
            bg-transparent
            border-0
            rounded
            cursor-pointer
            whitespace-nowrap
            hover:underline
            focus:underline focus:outline-none
          "
          title="Toggle go to date view"
          @click="switchView"
        >
          <span class="month">{{ format(visibleDay, "MMM") }}</span>
          <span
            class="year"
            :class="{
              'text-blue-500': variant === 'primary',
              'text-gray-700': variant === 'secondary',
              'text-gray-500': variant === 'tertiary',
              'text-green-500': variant === 'success',
              'text-teal-500': variant === 'info',
              'text-orange-500': variant === 'warning',
              'text-red-500': variant === 'danger',
            }"
          >{{ format(visibleDay, " yyyy") }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-3 h-3 my-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              v-if="view === 'calendar'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M9 5l7 7-7 7"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      <div
        v-if="view === 'calendar'"
        class="my-auto"
      >
        <button
          v-if="
            (!isSameMonth(visibleDay, date) && date !== null) ||
              (!isSameMonth(visibleDay, endDate) && endDate !== null)
          "
          type="button"
          class="
            p-1
            mr-1
            text-base text-gray-900
            bg-transparent
            border-0
            rounded
            cursor-pointer
            hover:bg-gray-200
            focus:bg-gray-200 focus:outline-none focus:ring
          "
          title="Go to selected date(s)"
          @click="goToSelectedMonth"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              v-if="!isSameMonth(visibleDay, date) && date !== null"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 11l5-5m0 0l5 5m-5-5v12"
            />
            <path
              v-else-if="!isSameMonth(visibleDay, endDate) && endDate !== null"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 13l-5 5m0 0l-5-5m5 5V6"
            />
          </svg>
        </button>
        <button
          type="button"
          class="
            p-1
            mr-1
            text-base text-gray-900
            bg-transparent
            border-0
            rounded
            cursor-pointer
            hover:bg-gray-200
            focus:bg-gray-200 focus:outline-none focus:ring
          "
          title="Go to previous month"
          @click="goToPrevMonth"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          class="
            p-1
            text-base text-gray-900
            bg-transparent
            border-0
            rounded
            cursor-pointer
            hover:bg-gray-200
            focus:bg-gray-200 focus:outline-none focus:ring
          "
          title="Go to this month"
          :disabled="isSameMonth(visibleDay, today)"
          :class="{
            'opacity-50 pointer-events-none': isSameMonth(visibleDay, today),
          }"
          @click="goToThisMonth"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
        <button
          type="button"
          class="
            p-1
            mr-1
            text-base text-gray-900
            bg-transparent
            border-0
            rounded
            cursor-pointer
            hover:bg-gray-200
            focus:bg-gray-200 focus:outline-none focus:ring
          "
          title="Go to next month"
          @click="goToNextMonth"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </header>
    <div
      v-if="view === 'calendar'"
      class="calendar"
    >
      <table class="w-full border-0">
        <thead>
          <tr>
            <th class="text-xs font-light text-center text-gray-500 uppercase">
              Sun
            </th>
            <th class="text-xs font-light text-center text-gray-500 uppercase">
              Mon
            </th>
            <th class="text-xs font-light text-center text-gray-500 uppercase">
              Tue
            </th>
            <th class="text-xs font-light text-center text-gray-500 uppercase">
              Wed
            </th>
            <th class="text-xs font-light text-center text-gray-500 uppercase">
              Thu
            </th>
            <th class="text-xs font-light text-center text-gray-500 uppercase">
              Fri
            </th>
            <th class="text-xs font-light text-center text-gray-500 uppercase">
              Sat
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(week, index) in calendarMatrix"
            :key="index"
          >
            <td
              v-for="(day, i) in week"
              :key="i"
              :class="{
                'text-center': true,
                'bg-gray-100': isInsideRange(day),
                'font-bold': isSameDay(day),
              }"
            >
              <button
                type="button"
                class="
                  flex
                  items-center
                  justify-center
                  w-8
                  h-8
                  mx-auto
                  text-sm text-center text-gray-900
                  bg-transparent
                  border-0
                  rounded
                  cursor-pointer
                  focus:outline-none focus:ring
                "
                :class="{
                  'text-gray-400': !isSameMonth(day, visibleDay),
                  'font-extrabold': isSameDay(day) || isToday(day),
                  'hover:font-extrabold hover:text-white hover:bg-gray-500':
                    !isSameDay(day) && !isToday(day),
                  'text-blue-500 hover:text-white hover:bg-blue-500':
                    variant === 'primary' && !isSameDay(day) && isToday(day),
                  'text-gray-700 hover:text-white hover:bg-gray-700':
                    variant === 'secondary' && !isSameDay(day) && isToday(day),
                  'text-gray-500 hover:text-white hover:bg-gray-500':
                    variant === 'tertiary' && !isSameDay(day) && isToday(day),
                  'text-green-500 hover:text-white hover:bg-green-500':
                    variant === 'success' && !isSameDay(day) && isToday(day),
                  'text-teal-500 hover:text-white hover:bg-teal-500':
                    variant === 'info' && !isSameDay(day) && isToday(day),
                  'text-orange-500 hover:text-white hover:bg-orange-500':
                    variant === 'warning' && !isSameDay(day) && isToday(day),
                  'text-red-500 hover:text-white hover:bg-red-500':
                    variant === 'danger' && !isSameDay(day) && isToday(day),
                  'opacity-50 pointer-events-none':
                    isBeforeMin(day) || isAfterMax(day),
                  'bg-gray-500 text-gray-100': isSameDay(day) && !isToday(day),
                  'bg-blue-500 text-white':
                    variant === 'primary' && isSameDay(day) && isToday(day),
                  'bg-gray-700 text-white':
                    variant === 'secondary' && isSameDay(day) && isToday(day),
                  'bg-gray-500 text-white':
                    variant === 'tertiary' && isSameDay(day) && isToday(day),
                  'bg-green-500 text-white':
                    variant === 'success' && isSameDay(day) && isToday(day),
                  'bg-teal-500 text-white':
                    variant === 'info' && isSameDay(day) && isToday(day),
                  'bg-orange-500 text-white':
                    variant === 'warning' && isSameDay(day) && isToday(day),
                  'bg-red-500 text-white':
                    variant === 'danger' && isSameDay(day) && isToday(day),
                }"
                :disabled="isBeforeMin(day) || isAfterMax(day)"
                @click="changeDate(day, $event)"
              >
                <span>{{ format(day, "d") }}</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-else
      class="grid gap-2"
    >
      <label>
        <span class="block mb-1 font-bold text-secondary">Month</span>
        <select
          v-model="selectViewMonth"
          class="form-control form-control-sm"
        >
          <option
            v-for="month in dateSelectionMonths"
            :key="month.title"
            :value="month.value"
          >
            {{ month.title }}
          </option>
        </select>
      </label>
      <label>
        <span class="block mb-1 font-bold text-secondary">Year</span>
        <select
          v-model="selectViewYear"
          class="form-control form-control-sm"
        >
          <option
            v-for="year in dateSelectionYears"
            :key="year"
            :value="year"
          >
            {{ year }}
          </option>
        </select>
      </label>
      <div class="my-1">
        <button
          type="button"
          class="btn btn-primary btn-block btn-sm"
          @click="goToDateSelection"
        >
          Go to date
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  addDays,
  startOfWeek,
  startOfMonth,
  format,
  getYear,
  getMonth,
  isSameDay,
  isToday,
  isSameWeek,
  isSameMonth,
  isBefore,
  isAfter,
  subMonths,
  addMonths,
  closestTo,
} from "date-fns";

export default defineComponent({
  name: "SdsCalendar",
  props: {
    variant: { type: String, default: "primary" },
    date: { type: Date, default: null },
    endDate: { type: Date, default: null },
    min: { type: Date, default: null },
    max: { type: Date, default: null },
    minYear: { type: Number, default: 1900 },
    maxYear: { type: Number, default: 2100 },
    multiple: { type: Boolean, default: false },
  },
  emits: ['update:date', 'update:endDate', 'update:min', 'update:max'],
  data() {
    const visibleDay = this.date !== null ? this.date : new Date();
    const today = new Date();
    const selectViewMonth = format(visibleDay, "MM");
    const selectViewYear = format(visibleDay, "yyyy");
    return {
      today,
      visibleDay,
      selectViewMonth,
      selectViewYear,
      view: "calendar",
    };
  },
  computed: {
    dateSelectionMonths() {
      return [
        { title: "January", value: 0 },
        { title: "February", value: 1 },
        { title: "March", value: 2 },
        { title: "April", value: 3 },
        { title: "May", value: 4 },
        { title: "June", value: 5 },
        { title: "July", value: 6 },
        { title: "August", value: 7 },
        { title: "September", value: 8 },
        { title: "October", value: 9 },
        { title: "November", value: 10 },
        { title: "December", value: 11 },
      ];
    },
    dateSelectionYears(): Date[] {
      const rangeOfYears = (start: any, end: any) =>
        Array(end - start + 1)
          .fill(start)
          .map((year, index) => year + index);
      return rangeOfYears(this.minYear, this.maxYear);
    },
    localDate: {
      get(): null|Date {
        if (this.date === null) return null;
        return this.date;
      },
      set(value: null|Date) {
        this.$emit("update:date", value);
      },
    },
    localEndDate: {
      get(): null|Date {
        if (this.endDate === null) return null;
        return this.endDate;
      },
      set(value: null|Date) {
        this.$emit("update:endDate", value);
      },
    },
    localMin: {
      get(): null|Date {
        if (this.min === null) return null;
        return this.min;
      },
      set(value: null|Date) {
        this.$emit("update:min", value);
      },
    },
    localMax: {
      get(): null|Date {
        if (this.max === null) return null;
        return this.max;
      },
      set(value: null|Date) {
        this.$emit("update:max", value);
      },
    },
    selectedDate(): null|Date {
      if (this.localDate === null) return null;
      return this.localDate;
    },
    selectedEndDate(): null|Date {
      if (this.localEndDate === null) return null;
      return this.localEndDate;
    },
    minDate(): null|Date {
      if (this.localMin === null) return null;
      return this.localMin;
    },
    maxDate(): null|Date {
      if (this.localMax === null) return null;
      return this.localMax;
    },
    calendarMatrix() {
      // 0 = Sunday
      const weekStartsOn = 0;
      const year = getYear(this.visibleDay);
      const month = getMonth(this.visibleDay);
      //  1. Generate the date from params, then get the firstDay and lastDay in the month
      const date = new Date(year, month);
      // const firstDay = startOfMonth(date);
      // const lastDay = endOfMonth(date);
      //  2. Get the start date for our matrix
      const startDate = startOfWeek(date, { weekStartsOn });
      //  3. Get the differences in weeks from lastDay to firstDay
      //  Add (+1) to get total row we need for the matrix to cover all the days in the month
      //  It'll be used as total rows needed for our matrix
      // const matrixRows =
      //   differenceInCalendarWeeks(lastDay, firstDay, { weekStartsOn }) + 1;
      // **************************
      // Instead of all that... we just always use 6 rows since
      // it is the smallest number of rows that fits all months
      const matrixRows = 6;
      //  4. Set the number of days in a week.
      //  It'll be used as total columns needed for our matrix
      const matrixColumns = 7;
      //  5. Get the total days that we are going to generate.
      const totalDays = matrixRows * matrixColumns;
      //  Preparations complete! Let's generate the calendar matrix
      const calendar =
        //  6. Generate an empty Array from the totalDays
        Array.from({ length: totalDays })
          //  7. Assign a Date value to each value of the array
          //  We'll get an array with each value is a Date value
          .map((_, index) => addDays(startDate, index))
          //  8. use Array.reduce to transform our array for each week
          //  We want to cut the array at the beginning of each week
          .reduce(
            (matrix, current, index, days) =>
              index % matrixColumns === 0
                ? [...matrix, days.slice(index, index + matrixColumns)]
                : (matrix as any),
            []
          );
      return calendar;
    },
  },
  watch: {
    localDate(value) {
      if (value !== null) this.visibleDay = value;
      this.correctStartDate();
    },
    localEndDate(value) {
      if (this.multiple && value !== null) this.visibleDay = value;
      this.correctEndDate();
    },
  },
  methods: {
    format,
    isToday,
    isSameMonth,
    correctStartDate() {
      if (this.localDate === null || this.localEndDate === null) return;
      if (isAfter(this.localDate, this.localEndDate)) {
        this.localEndDate = null;
      }
    },
    correctEndDate() {
      if (this.localDate === null || this.localEndDate === null) return;
      if (isBefore(this.localEndDate, this.localDate)) {
        this.localDate = this.localEndDate;
        this.localEndDate = null;
      }
    },
    changeDate(day: Date | null, e: { stopPropagation: () => void }) {
      if (day === null) return;
      this.setSelectedDates(day);
      this.$nextTick(() => {
        if (
          this.multiple &&
          (this.localDate === null || this.localEndDate === null)
        ) {
          e.stopPropagation();
        }
      });
    },
    goToSelectedMonth(e: { stopPropagation: () => void }) {
      e.stopPropagation();
      if (this.selectedDate === null) return;
      if (!isSameDay(this.visibleDay, this.selectedDate)) {
        this.visibleDay = this.selectedDate;
      } else if (this.multiple && this.selectedEndDate !== null) {
        this.visibleDay = this.selectedEndDate;
      }
    },
    goToThisMonth(e: { stopPropagation: () => void }) {
      e.stopPropagation();
      this.visibleDay = this.today;
    },
    goToPrevMonth(e: { stopPropagation: () => void }) {
      e.stopPropagation();
      this.visibleDay = startOfMonth(subMonths(this.visibleDay, 1));
    },
    goToNextMonth(e: { stopPropagation: () => void }) {
      e.stopPropagation();
      this.visibleDay = startOfMonth(addMonths(this.visibleDay, 1));
    },
    isChangingTheStartDate(val: Date | null) {
      if (!this.multiple) return true;
      if (this.selectedDate === null) return true;
      if (this.selectedEndDate === null) return false;
      const date = val;
      if (date == null) return true;
      const closest = closestTo(date, [
        this.selectedDate,
        this.selectedEndDate,
      ]);
      return isSameDay(closest, this.selectedDate);
    },
    clampSelectedDates() {
      // clamp max to min and reset date/endDate
      if (this.isBeforeMin(this.maxDate)) {
        this.localDate = null;
        this.localEndDate = null;
        this.localMax = this.localMin;
        return;
      }
      // clamp min to max and reset date/endDate
      if (this.isAfterMax(this.minDate)) {
        this.localDate = null;
        this.localEndDate = null;
        this.localMin = this.localMax;
        return;
      }
      // clamp date to min and max
      if (this.localDate !== null) {
        if (this.isBeforeMin(this.selectedDate)) {
          this.localDate = this.localMin;
        } else if (this.isAfterMax(this.selectedDate)) {
          this.localDate = this.localMax;
          this.localEndDate = null;
        }
      }
      // clamp endDate to min and max
      if (this.localEndDate !== null) {
        if (this.isBeforeMin(this.selectedEndDate)) {
          this.localDate = this.localMin;
          this.localEndDate = null;
        } else if (this.isAfterMax(this.selectedEndDate)) {
          this.localEndDate = this.localMax;
        }
      }
    },
    setSelectedDates(val: Date | null) {
      const isStartDate = this.isChangingTheStartDate(val);
      if (isStartDate) {
        if (
          val !== null &&
          isSameDay((this.localDate as Date), val) &&
          this.localEndDate !== null
        ) {
          this.localDate = this.localEndDate;
          this.localEndDate = null;
        } else if (val !== null && isSameDay((this.localDate as Date), val)) {
          this.localDate = null;
        } else {
          this.localDate = val;
        }
      } else {
        if (
          (val !== null && isSameDay((this.localDate as Date), val)) ||
          this.localDate === null
        ) {
          this.localDate = null;
          this.localEndDate = null;
        } else if (val !== null && isSameDay((this.localEndDate as Date), val)) {
          this.localEndDate = null;
        } else {
          const date = val;
          if (
            date !== null &&
            this.selectedDate !== null &&
            isBefore(date, this.selectedDate)
          ) {
            this.localEndDate = this.localDate;
            this.localDate = val;
          } else {
            this.localEndDate = val;
          }
        }
      }
    },
    isBeforeMin(date: Date | null): boolean {
      if (date === null || this.minDate === null) return false;
      return isBefore(date, this.minDate);
    },
    isAfterMax(date: Date | null): boolean {
      if (date === null || this.maxDate === null) return false;
      return isAfter(date, this.maxDate);
    },
    isInsideRange(day: Date | null): boolean {
      if (day === null) return false;
      return (
        this.selectedDate !== null &&
        (isAfter(day, this.selectedDate) ||
          isSameDay(day, this.selectedDate)) &&
        this.selectedEndDate !== null &&
        (isBefore(day, this.selectedEndDate) ||
          isSameDay(day, this.selectedEndDate))
      );
    },
    isSameWeek(day: Date | null): boolean {
      if (day === null) return false;
      return (
        this.selectedDate !== null &&
        isSameWeek(day, this.selectedDate) &&
        this.selectedEndDate === null
      );
    },
    isSameDay(day: Date | null): boolean {
      if (day === null) return false;
      return (
        (this.selectedDate !== null && isSameDay(day, this.selectedDate)) ||
        (this.selectedEndDate !== null && isSameDay(day, this.selectedEndDate))
      );
    },
    switchView() {
      switch (this.view) {
        case "calendar":
          this.selectViewMonth = `${this.visibleDay.getMonth()}`;
          this.selectViewYear = `${this.visibleDay.getFullYear()}`;
          this.view = "select";
          break;
        case "select":
        default:
          this.view = "calendar";
          break;
      }
    },
    goToDateSelection() {
      this.visibleDay = new Date((this.selectViewYear as any), (this.selectViewMonth as any));
      this.view = "calendar";
    },
  },
});
</script>
