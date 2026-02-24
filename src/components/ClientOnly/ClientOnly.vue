<script lang="ts" setup>
defineOptions({
  name: 'SdsClientOnly'
})

const show = ref(false)

onMounted(() => {
  show.value = true
})
</script>

<template>
  <template v-if="show">
    <slot />
  </template>
</template>