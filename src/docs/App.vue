<template>
  <sds-layout-app
    v-model="collapsed"
    :app-suite="appSuite"
    :app-name="appName"
    :app-icon-url="appIconUrl"
    :page-title="pageTitle"
    :sidebar-navigation-items="sidebarNavigationItems"
    :enable-collapsible-sidebar="enableCollapsibleSidebar"
    @navigate="navigate"
  >
    <template #suite-header>
      Suite header content
    </template>
    <template #page-header>
      Page header content
      <!-- <sds-button variant="default">
        Export
      </sds-button>
      <sds-button variant="default">
        Save Search
      </sds-button> -->
      <!-- <div class="flex flex-col lg:flex-row gap-2">
        <sds-button variant="danger">
          Add accomplishment
        </sds-button>
        <sds-search-box variant="danger" />
      </div> -->
    </template>
    <components />
    <examples />
    <template #footer-middle>
      Footer middle content
    </template>
  </sds-layout-app>
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
      appSuite: 'MIS',
      appName: 'Travel Requests',
      pageTitle: 'Dashboard',
      // appIconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png',
      // enableCollapsibleSidebar: true,
      // sidebarNavigationItems: [
      //   { id: 1, title: 'Dashboard', active: true, href: '#', iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
      //   { id: 2, title: 'About SEI', active: false, href: '#', iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
      //   { id: 3, title: 'News & Events', active: false, href: '#', iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
      //   { id: 4, title: 'Divisions', active: false, href: '#', badgeCount: 9, iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
      //   { id: 5, title: 'Research & Projects asdf sdaf ', active: false, href: '#', badgeCount: 999, iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
      //   { id: 6, title: 'HR & Benefits', active: false, href: '#', iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
      //   { id: 7, title: 'Policies', active: false, href: '#', iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
      //   { id: 8, title: 'Workplace Services', active: false, href: '#', iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
      //   { id: 9, title: 'Help & FAQ', active: false, href: '#', iconUrl: 'https://www.shareicon.net/data/128x128/2017/01/17/872043_facebook_512x512.png' },
      // ],
      appIconUrl: null,
      enableCollapsibleSidebar: false,
      sidebarNavigationItems: [
        { id: 1, title: 'Dashboard', active: true, href: '#' },
        { id: 2, title: 'About SEI', active: false, href: '#' },
        { id: 3, title: 'News & Events', active: false, href: '#' },
        { id: 4, title: 'Divisions', active: false, href: '#', badgeCount: 9 },
        { id: 5, title: 'Research & Projects', active: false, href: '#', badgeCount: 999 },
        { id: 6, title: 'HR & Benefits', active: false, href: '#' },
        { id: 7, title: 'Policies', active: false, href: '#' },
        { id: 8, title: 'Workplace Services', active: false, href: '#' },
        { id: 9, title: 'Help & FAQ', active: false, href: '#' },
      ]
    }
  },
  methods: {
    navigate({ item, event }: any) {
      event.preventDefault()
      this.sidebarNavigationItems = this.sidebarNavigationItems.map((i) => {
        i.active = i.id === item.id
        return i
      })
    }
  }
});
</script>
