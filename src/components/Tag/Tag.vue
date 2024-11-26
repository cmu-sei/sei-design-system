<template>
  <div 
    v-uid
    data-id="sds-tag"
  >
    <!-- @slot Tag content. -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Uid } from '@shimyshack/uid'

defineOptions({
  name: 'SdsTag',
  directives: {
    uid: Uid
  }
})
</script>