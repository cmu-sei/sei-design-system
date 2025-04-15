import { App } from "vue";
import Component from "./AvatarGroup.vue";

Component.install = (Vue: App) => {
  Vue.component(Component.name!, Component);
}

export default Component;
