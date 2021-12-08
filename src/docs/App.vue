<template>
  <sds-layout-app-internal
    v-model="collapsed"
    :app-suite="appSuite"
    :app-name="appName"
    :app-icon-url="appIconUrl"
    :page-title="pageTitle"
    :page-navigation="pageNavigation"
    enable-collapsible-sidebar
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
      appIconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png',
      pageTitle: 'Dashboard',
      pageNavigation: [
        { id: 1, title: 'Dashboard', active: true, href: '#', iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
        { id: 2, title: 'About SEI', active: false, href: '#', iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
        { id: 3, title: 'News & Events', active: false, href: '#', iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
        { id: 4, title: 'Divisions', active: false, href: '#', badgeCount: 9, iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
        { id: 5, title: 'Research & Projects', active: false, href: '#', badgeCount: 999, iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
        { id: 6, title: 'HR & Benefits', active: false, href: '#', iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
        { id: 7, title: 'Policies', active: false, href: '#', iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
        { id: 8, title: 'Workplace Services', active: false, href: '#', iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
        { id: 9, title: 'Help & FAQ', active: false, href: '#', iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
      ]
    }
  },
  methods: {
    navigate({ item, event }: any) {
      event.preventDefault()
      this.pageNavigation = this.pageNavigation.map((i) => {
        i.active = i.id === item.id
        return i
      })
    }
  }
});
</script>
