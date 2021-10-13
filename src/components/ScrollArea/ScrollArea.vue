<template>
  <div class="scroll-area">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SdsScrollArea'
})
</script>