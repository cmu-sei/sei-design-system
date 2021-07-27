<template>
  <div :class="{ 'text-danger': count < 0 }">
    {{ count }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "SdsCharacterCounter",
  props: {
    currentValue: { type: Number, default: 0 },
    maxValue: { type: Number, default: 0 },
  },
  setup(props) {
    const count = computed(() => {
      return props.maxValue - props.currentValue
    })

    return {
      count,
    }
  }
});
</script>
