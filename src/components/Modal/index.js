import Component from "./Modal.vue";

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
}

export default Component;
