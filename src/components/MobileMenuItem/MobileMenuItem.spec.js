import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Component from "./MobileMenuItem.vue";


describe("MobileMenuItem.vue", () => {
  it("is a Vue instance", () => {
    const wrapper = shallowMount(Component);
    expect(wrapper.vm).toBeTruthy();
  });
  it("matches snapshot", () => {
    const wrapper = shallowMount(Component);
    expect(wrapper.element).toMatchSnapshot();
  });
  it("matches snapshot with no props assigned", () => {
    const propsData = {};
    const wrapper = shallowMount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('matches snapshot with link kind "simple" prop assigned', () => {
    const propsData = {
      kind: 'simple',
    };
    const wrapper = shallowMount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('matches snapshot with link kind "descriptive" prop assigned', () => {
    const propsData = {
      kind: 'descriptive',
    };
    const wrapper = shallowMount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('matches snapshot with link kind "landing-page" prop assigned', () => {
    const propsData = {
      kind: 'landing-page',
    };
    const wrapper = shallowMount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
