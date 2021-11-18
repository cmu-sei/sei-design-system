<template>
  <span
    :class="['loadingBox rounded flex flex-row relative overflow-hidden bg-gray-200', width, height]"
  />
</template>

<script>
export default {
  name: 'SdsLoadingBox',
  props: {
    /**
     * Set the height of the box. Accepts tailwind height classes.
     */
    height: {
      default: 'h-48',
      type: String
    },
    /**
     * Set the width of the box. Accepts tailwind width classes.
     */
    width: {
      default: 'w-1/2',
      type: String
    }
  }
}
</script>

<style scoped>
  .loadingBox::after {
     position: absolute;
     top: 0;
     right: 0;
     bottom: 0;
     left: 0;
     transform: translateX(-100%);
     background: rgb(255,255,255);
     background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2007177871148459) 20%, rgba(255,255,255,0.6432948179271709) 61%, rgba(255,255,255,0) 100%);
     animation: shimmer 5s infinite;
     content: '';
   }
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
</style>
