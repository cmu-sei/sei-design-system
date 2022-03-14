import { shallowMount } from '@vue/test-utils'
import { vi } from 'vitest';
import Component from "./PopperWrapper.vue";

const Uid = vi.fn()
Component.directives.uid = Uid

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
