<template>
  <sds-layout-app-internal
    v-model="collapsed"
    :app-suite="appSuite"
    :app-name="appName"
    :page-title="pageTitle"
    :page-nav="pageNav"
    enable-collapsible-sidebar
  >
    <components />
    <examples />
  </sds-layout-app-internal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Components from './components/Components.vue'
import Examples from './components/Examples.vue'

export default defineComponent({
  name: "AppPage",
  components: {
    Components,
    Examples,
  },
  data() {
    return {
      collapsed: false,
      appSuite: '<span class="text-red-400 font-bold">SEI</span>Net',
      appName: 'Accomplishments',
      pageTitle: 'Dashboard',
      pageNav: [
        { id: 1, title: 'Dashboard', active: true, href: '#' },
        { id: 2, title: 'About SEI', active: false, href: '#' },
        { id: 3, title: 'News &amp; Events', active: false, href: '#' },
        { id: 4, title: 'Divisions', active: false, href: '#', badgeCount: 4 },
        { id: 5, title: 'Research &amp; Projects', active: false, href: '#' },
        { id: 6, title: 'HR &amp; Benefits', active: false, href: '#' },
        { id: 7, title: 'Policies', active: false, href: '#' },
        { id: 8, title: 'Workplace Services', active: false, href: '#' },
        { id: 9, title: 'Help &amp; FAQ', active: false, href: '#' },
      ]
    }
  }
});
</script>
