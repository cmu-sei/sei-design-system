import { createApp } from 'vue'
import App from './docs/App.vue';

// SEI Design System
import "@sds/tailwindcss-2/open-sans/index.css";
import "./index.css";
import SdsComponents from "./components";

createApp(App).use(SdsComponents).mount('#app')
