<template>
  <sds-layout-app-internal
    v-model="collapsed"
    :app-suite="appSuite"
    :app-name="appName"
    :page-title="pageTitle"
    :page-nav="pageNav"
    @navigate="navigate"
  >
    <template #suite-header>
      Suite header content
    </template>
    <template #page-header>
      Page header content
    </template>
    <components />
    <examples />
    <template #footer-middle>
      Footer middle content
    </template>
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
      appSuite: 'Net',
      appName: 'Accomplishments',
      pageTitle: 'Dashboard',
      pageNav: [
        { id: 1, title: 'Dashboard', active: true, href: '#' },
        { id: 2, title: 'About SEI', active: false, href: '#' },
        { id: 3, title: 'News &amp; Events', active: false, href: '#' },
        { id: 4, title: 'Divisions', active: false, href: '#', badgeCount: 9 },
        { id: 5, title: 'Research &amp; Projects', active: false, href: '#' },
        { id: 6, title: 'HR &amp; Benefits', active: false, href: '#' },
        { id: 7, title: 'Policies', active: false, href: '#' },
        { id: 8, title: 'Workplace Services', active: false, href: '#' },
        { id: 9, title: 'Help &amp; FAQ', active: false, href: '#' },
      ]
    }
  },
  methods: {
    navigate(item: any, event: any) {
      event.preventDefault()
      this.pageNav = this.pageNav.map((i) => {
        i.active = i.id === item.id
        return i
      })
    }
  }
});
</script>
