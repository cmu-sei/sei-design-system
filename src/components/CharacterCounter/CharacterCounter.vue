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

interface CharacterCounterProps {
  /**
   * The current count value.
   */
  currentValue?: number
  /**
   * The minimum value allowed.
   */
  minValue?: number
  /**
   * The maximum value allowed.
   */
  maxValue?: number
}

const props = withDefaults(defineProps<CharacterCounterProps>(), {
  currentValue: 0,
  minValue: 0,
  maxValue: 0
})

const count = computed(() => {
  return props.maxValue - props.currentValue
})
</script>
