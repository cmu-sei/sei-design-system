import { shallowMount } from '@vue/test-utils'
import Component from "./PopperWrapper.vue";


describe("PopperWrapper.vue", () => {
  it("is a Vue instance", () => {
    const wrapper = shallowMount(Component);
    expect(wrapper.vm).toBeTruthy();
  });
  it("matches snapshot", () => {
    const wrapper = shallowMount(Component);
    expect(wrapper.element).toMatchSnapshot();
  });
});
