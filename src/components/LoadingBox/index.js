import Component from "./LoadingBox.vue";

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
}

export default Component;
