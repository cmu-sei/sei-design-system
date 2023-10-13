<template>
  <div class="grid gap-12">
    <div class="grid gap-4">
      <h2 class="text-xl">
        Components
      </h2>
      <nav class="grid gap-2 ml-4">
        <RouterLink
          to="/components/buttons"
          class="link link-secondary w-fit"
        >
          Buttons
        </RouterLink>
        <RouterLink
          to="/components/containers"
          class="link link-secondary w-fit"
        >
          Containers
        </RouterLink>
        <RouterLink
          to="/components/data-visualization"
          class="link link-secondary w-fit"
        >
          Data Visualization
        </RouterLink>
        <RouterLink
          to="/components/date-and-time"
          class="link link-secondary w-fit"
        >
          Date &amp; Time
        </RouterLink>
        <RouterLink
          to="/components/feedback"
          class="link link-secondary w-fit"
        >
          Feedback
        </RouterLink>
        <RouterLink
          to="/components/inputs"
          class="link link-secondary w-fit"
        >
          Inputs
        </RouterLink>
        <RouterLink
          to="/components/navigation"
          class="link link-secondary w-fit"
        >
          Navigation
        </RouterLink>
        <RouterLink
          to="/components/utility"
          class="link link-secondary w-fit"
        >
          Utility
        </RouterLink>
      </nav>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        Patterns
      </h2>
      <nav class="grid gap-2 ml-4">
        <RouterLink
          to="/patterns/form-group"
          class="link link-secondary w-fit"
        >
          Form Group
        </RouterLink>
      </nav>
    </div>
    <div class="grid gap-4">
      <h2 class="text-xl">
        CSS
      </h2>
      <nav class="grid gap-2 ml-4">
        <RouterLink
          to="/css/css-components"
          class="link link-secondary w-fit"
        >
          CSS Components
        </RouterLink>
      </nav>
    </div>
    <hr class="dark:border-gray-700">
    <div class="grid gap-12">
      <h2 class="text-xl">
        Old Example Page
      </h2>
      <ComponentsExamples />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'IndexPage'
})

definePage({
  meta: {
    title: 'Home'
  }
})

useHead({
  title: 'Home'
})
</script>