import Component from "./Link.vue";

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
}

export default Component;
