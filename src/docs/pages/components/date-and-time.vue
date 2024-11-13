<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Calendar
      </h2>
      <div>
        <SdsCalendar
          v-model="modelValue"
          :min="min"
          :max="max"
          mode="dateTime"
        />
      </div>
    </div>
    <div class="grid gap-4 w-1/2">
      <h2 class="text-xl">
        Datepicker
      </h2>
      <div class="space-y-4">
        <SdsDatepicker
          v-model="singleModelValue"
          :min="min"
          placement="right"
          mode="date"
          size="md"
        />
        <SdsDatepicker
          v-model="modelValue"
          :min="min"
          :max="max"
          placement="right"
          mode="time"
          size="md"
        />
        <SdsDatepicker
          v-model="modelValue"
          :min="min"
          :max="max"
          placement="right"
          mode="dateTime"
          size="md"
        />
        <SdsDatepicker
          v-model="modelValue"
          :min="min"
          :max="max"
          placement="right"
          mode="date"
          size="md"
        />
        <SdsDatepicker
          v-model="modelValue"
          :min="min"
          :max="max"
          placement="right"
          mode="dateTime"
          size="sm"
        />
        <SdsDatepicker
          v-model="modelValue"
          :min="min"
          :max="max"
          placement="right"
          mode="dateTime"
          size="sm"
          disabled
        />
        <SdsDatepicker
          v-model="modelValue"
          :min="min"
          :max="max"
          placement="right"
          mode="dateTime"
          size="md"
          readonly
        />

        <SdsDatepicker
          v-model="modelValue"
          :min="min"
          :max="max"
          placement="right"
          mode="time"
          size="md"
          readonly
        />

        <SdsDatepicker
          v-model="modelValue"
          :min="min"
          :max="max"
          placement="right"
          mode="date"
          size="md"
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const singleModelValue = ref(null)
const modelValue = ref({ start: new Date(2024, 1, 1), end: new Date(2024, 2, 2) })
const min = ref(new Date(2020, 1, 20))
const max = ref()

defineOptions({
  name: 'DateAndTimePage'
})

definePage({
  meta: {
    title: 'Date & Time'
  }
})

useHead({
  title: 'Date & Time'
})
</script>