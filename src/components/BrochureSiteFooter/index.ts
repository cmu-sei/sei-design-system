import { App } from "vue";
import Component from "./BrochureSiteFooter.vue";

Component.install = (Vue: App) => {
  Vue.component(Component.name!, Component);
}

export default Component;
