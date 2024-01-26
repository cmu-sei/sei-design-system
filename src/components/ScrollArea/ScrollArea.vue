<template>
  <div
    data-id="sds-scroll-area"
    class="scroll-area"
  >
    <!-- @slot Scroll area content. -->
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsScrollArea'
})
</script>