import { App } from "vue";
import Component from "./Indicator.vue";

Component.install = (Vue: App) => {
  Vue.component(Component.name, Component);
}

export default Component;
