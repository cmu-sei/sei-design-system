import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from "./Multiselect.vue";

describe("Multiselect.vue", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(Component);
    expect(wrapper.vm).toBeTruthy();
  });

  it("applies disabled and readonly states to the root and input", () => {
    const wrapper = mount(Component, {
      props: {
        disabled: true,
        readonly: true,
      },
    });

    expect(wrapper.classes()).toContain("disabled");
    expect(wrapper.classes()).toContain("readonly");
    expect(wrapper.find('input[type="text"]').attributes("readonly")).toBe("");
    expect(wrapper.find('input[type="text"]').attributes("disabled")).toBe("");
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
