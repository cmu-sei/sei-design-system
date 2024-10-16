import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from "./LoadingSpinner.vue";


describe("LoadingSpinner.vue", () => {
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
  it("matches snapshot with size sm prop assigned", () => {
    const propsData = {
      size: 'sm',
    };
    const wrapper = mount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("matches snapshot with size lg prop assigned", () => {
    const propsData = {
      size: 'lg',
    };
    const wrapper = mount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("matches snapshot with size auto prop assigned", () => {
    const propsData = {
      size: 'auto',
    };
    const wrapper = mount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
