<template>
  <div
    data-id="sds-character-counter"
    :class="{ 'text-red-700 dark:text-red-300': count < 0 || (currentValue < minValue && currentValue > 0) }"
  >
    {{ count.toLocaleString() }}
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "SdsCharacterCounter"
})

const props = defineProps({
  /**
   * The current count value.
   */
  currentValue: { type: Number, default: 0 },
  /**
   * The minimum value allowed.
   */
  minValue: { type: Number, default: 0 },
  /**
   * The maximum value allowed.
   */
  maxValue: { type: Number, default: 0 },
})

const count = computed(() => {
  return props.maxValue - props.currentValue
})
</script>
