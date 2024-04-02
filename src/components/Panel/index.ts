import { App } from "vue";
import Component from "./Panel.vue";

Component.install = (Vue: App) => {
  Vue.component(Component.name!, Component);
}

export default Component;
