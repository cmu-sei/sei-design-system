import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from "./LoadingSkeleton.vue";


describe("LoadingSkeleton.vue", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(Component);
    expect(wrapper.vm).toBeTruthy();
  });
  it("matches snapshot", () => {
    const wrapper = mount(Component);
    expect(wrapper.element).toMatchSnapshot();
  });
  it("matches snapshot with no props assigned", () => {
    const propsData = {};
    const wrapper = mount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("matches snapshot with width prop assigned", () => {
    const propsData = {
      width: 'w-1/2',
    };
    const wrapper = mount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("matches snapshot with width and height prop assigned", () => {
    const propsData = {
      width: 'w-1/2',
      height: 'h-32'
    };
    const wrapper = mount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
