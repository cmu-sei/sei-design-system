import { createApp } from 'vue'
import App from './docs/App.vue';
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import { routes } from 'vue-router/auto-routes'

// Font Awesome - tree-shakeable (import specific icons as needed in components)
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const router = createRouter({
  history: createWebHistory(),
  routes
})
const head = createHead()

// SEI Design System
import '../open-sans/index.css'
import '../source-serif/index.css'
import '../tailwindcss/tailwind.css'
import SdsComponents from './components'

createApp(App)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .use(SdsComponents)
  .use(router)
  .use(head)
  .mount('#app')
