import { createApp } from 'vue';
import App from './docs/App.vue';
import { createRouter, createWebHistory } from 'vue-router/auto';
import { createHead } from '@unhead/vue/client';
import { routes } from 'vue-router/auto-routes';
const router = createRouter({
    history: createWebHistory(),
    routes
});
const head = createHead();
// SEI Design System
import '../open-sans/index.css';
import '../tailwindcss/tailwind.css';
import SdsComponents from './components';
createApp(App)
    .use(SdsComponents)
    .use(router)
    .use(head)
    .mount('#app');
//# sourceMappingURL=main.js.map