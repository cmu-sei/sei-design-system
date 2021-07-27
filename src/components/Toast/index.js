import Component from "./Toast.vue";

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
}

export default Component;
