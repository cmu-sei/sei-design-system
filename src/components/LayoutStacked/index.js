import Component from "./LayoutStacked.vue";

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
}

export default Component;
