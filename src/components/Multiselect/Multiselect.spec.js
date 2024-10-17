import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from "./Multiselect.vue";

describe("Multiselect.vue", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(Component);
    expect(wrapper.vm).toBeTruthy();
  });

  it("matches snapshot with no props assigned", () => {
    const props = {};
    const wrapper = mount(Component, { props });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("matches invalid prop", () => {
    const props = { invalid: true };
    const wrapper = mount(Component, { props });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("matches valid prop", () => {
    const props = { valid: true };
    const wrapper = mount(Component, { props });
    expect(wrapper.html()).toMatchSnapshot();
  });
  
});
