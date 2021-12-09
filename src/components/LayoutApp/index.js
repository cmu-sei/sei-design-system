import Component from "./LayoutApp.vue";

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
}

export default Component;
