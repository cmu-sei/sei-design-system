<template>
  <dropdown
    v-model="showDropdown"
    class="w-full"
    btn-class="w-full"
    menu-class="p-2 my-1 bg-white border rounded-md shadow-lg w-72 dark:border-gray-500 dark:bg-gray-700"
    hide-caret
    :right="right"
    :drop-up="dropUp"
  >
    <template #title>
      <div
        class="w-full input-group"
        :class="{ 'input-group-sm': size === 'sm' }"
      >
        <input
          v-model="inputDate"
          type="text"
          class="form-control"
          :title="`${format}`"
          :pattern="pattern"
          :placeholder="placeholder"
          :required="required"
          @keyup.up="showDropdown = false"
          @keyup.down="showDropdown = true"
          @keydown.enter.prevent="showDropdown = !showDropdown"
        >
        <button
          type="button"
          class="bg-gray-100 fill-current text-secondary btn btn-default dark:text-light dark:bg-gray-800"
        >
          <span class="sr-only">Toggle calendar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="w-4 h-4"
          >
            <path d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z" />
          </svg>
        </button>
      </div>
    </template>
    <calendar
      v-model:date="localDate"
      v-model:min="localMin"
      v-model:max="localMax"
      :variant="variant"
    />
  </dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { parse, format, isValid, isSameDay } from 'date-fns'
import Dropdown from '../Dropdown/Dropdown.vue';
import Calendar from '../Calendar/Calendar.vue';

export default defineComponent({
  name: 'SdsDatepicker',
  components: {
    Dropdown,
    Calendar
  },
  props: {
    variant: { type: String, default: 'primary' },
    size: { type: String, default: 'md' },
    format: { type: String, default: 'MM/dd/yyyy' },
    pattern: { type: String, default: '^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$' },
    dateRegex: { type: RegExp, default: () => /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/ },
    placeholder: { type: String, default: 'mm/dd/yyyy' },
    modelValue: { type: Date || null, default: null },
    max: { type: Date || null, default: null },
    min: { type: Date || null, default: null },
    right: { type: Boolean, default: false },
    dropUp: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'update:max', 'update:min'],
  data() {
    return {
      showDropdown: false,
      inputDate: '',
    }
  },
  computed: {
    localDate: {
      get(): any {
        return this.modelValue
      },
      set(value: any) {
        this.$emit('update:modelValue', value)
      }
    },
    localMax: {
      get(): any {
        return this.max
      },
      set(value: any) {
        this.$emit('update:max', value)
      }
    },
    localMin: {
      get(): any {
        return this.min
      },
      set(value: any) {
        this.$emit('update:min', value)
      }
    },
  },
  watch: {
    inputDate: {
      handler(value) {
        const dateMatchesRegex = value === null ? false : this.dateRegex.test(value)
        if (!dateMatchesRegex) return
        const date = parse(value, this.format, new Date)
        if (!isValid(date) && value !== '') return
        if (value === '') {
          this.localDate = null
        } else {
          this.localDate = date
        }
      },
      immediate: true
    },
    localDate: {
      handler(value, oldValue) {
        if (isSameDay(value, oldValue)) return
        if (value === null) {
          this.inputDate = ''
        } else {
          this.inputDate = format(value, this.format)
        }
        this.showDropdown = false
      },
      immediate: false
    },
  },
})
</script>