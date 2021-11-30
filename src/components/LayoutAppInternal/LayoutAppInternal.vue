<template>
  <div class="flex flex-col h-screen">
    <header class="bg-gray-900 text-white py-2 px-4 flex-shrink-0">
      <!-- @slot Header content. -->
      <slot name="header" />
    </header>
    <div class="flex flex-grow flex-shrink-0">
      <aside class="bg-gray-900 text-white border-r sticky top-0 h-screen flex flex-col">
        <div class="overflow-y-auto flex-grow p-4">
          <!-- @slot Sidebar content. -->
          <slot name="sidebar" />
        </div>
        <div class="flex-shrink-0">
          Testing
        </div>
      </aside>
      <section class="flex flex-col items-stretch flex-grow min-w-0">
        <main class="flex-grow pb-4 bg-gray-100">
          <div class="bg-white shadow p-4 sticky top-0 z-50">
            <!-- @slot Page top content. -->
            <slot name="page-top" />
          </div>
          <div class="p-4">
            <!-- @slot Page content. -->
            <slot />
          </div>
        </main>
        <footer class="bg-gray-900 text-white">
          <!-- @slot Footer content. -->
          <slot name="footer" />
        </footer>
      </section>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SdsLayoutAppInternal'
})
</script>

<style scoped>
.h-sidebar {
  height: calc(100vh - 2.5rem);
}
</style>