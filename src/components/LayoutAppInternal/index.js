import Component from "./LayoutAppInternal.vue";

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
}

export default Component;
