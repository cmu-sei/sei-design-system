import { describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
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
