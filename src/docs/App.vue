<template>
  <sds-layout-app-internal v-model="collapsed">
    <template #header>
      Header content
    </template>
    <template #sidebar>
      <div class="p-4">
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
      </div>
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
  },
  data() {
    return {
      collapsed: false
    }
  }
});
</script>
