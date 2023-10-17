import { createApp } from 'vue'
import App from './docs/App.vue';
import { createRouter, createWebHistory } from 'vue-router/auto'
import { createHead } from '@unhead/vue'

const router = createRouter({
  history: createWebHistory()
})
const head = createHead()

// SEI Design System
import "@sds/tailwindcss-3/open-sans/index.css";
import "./index.css";
import SdsComponents from "./components";

createApp(App)
  .use(SdsComponents)
  .use(router)
  .use(head)
  .mount('#app')
