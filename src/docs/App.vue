<template>
  <sds-layout-sei-external :page="{ organization: 'SEI Design System' }">
    <div class="p-8">
      <components />
      <examples />
    </div>
    <template #footer>
      <div class="py-8 text-center border-t">
        <p class="text-sm">
          SEI Design System
        </p>
      </div>
    </template>
  </sds-layout-sei-external>
</template>

<script>
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
