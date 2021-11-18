import Component from "./PopperWrapper.vue";

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
}

export default Component;
