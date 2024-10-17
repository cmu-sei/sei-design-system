import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from "./FloatingUi.vue";

describe("FloatingUi.vue", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(Component);
    expect(wrapper.vm).toBeTruthy();
  });

  it("matches snapshot with no props assigned", async () => {
    const props = {};
    const wrapper = mount(Component, { props });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
