<template>
  <sds-layout-app-internal>
    <template #header>
      Header content
    </template>
    <template #sidebar>
      <p class="my-96">
        Sidebar content
      </p>
      <p class="my-96">
        Sidebar content
      </p>
      <p class="my-96">
        Sidebar content
      </p>
      <p class="my-96">
        Sidebar content
      </p>
      <p class="my-96">
        Sidebar content
      </p>
    </template>
    <template #page-top>
      Hello, world!
    </template>
    <components />
    <examples />
    <template #footer>
      Footer content
    </template>
  </sds-layout-app-internal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Components from './components/Components.vue'
import Examples from './components/Examples.vue'

export default defineComponent({
  name: "App",
  components: {
    Components,
    Examples,
  }
});
</script>
