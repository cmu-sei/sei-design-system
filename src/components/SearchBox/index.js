import Component from "./SearchBox.vue";

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
}

export default Component;
