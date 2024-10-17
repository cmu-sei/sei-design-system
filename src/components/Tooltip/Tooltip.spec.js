import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from "./Tooltip.vue";

describe("Tooltip.vue", () => {
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
  it("matches snapshot with prop assigned", () => {
    const propsData = {
      placement: 'bottom',
      size: 'sm',
      tooltipClass: 'test',
      triggerClass: 'test'
    };
    const wrapper = mount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
