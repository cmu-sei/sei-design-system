import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Component from "./MegaMenuItem.vue";


describe("MegaMenuItem.vue", () => {
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
  it('matches snapshot with link variant "simple" prop assigned', () => {
    const propsData = {
      variant: 'simple',
    };
    const wrapper = shallowMount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('matches snapshot with link variant "descriptive" prop assigned', () => {
    const propsData = {
      variant: 'descriptive',
    };
    const wrapper = shallowMount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('matches snapshot with link variant "landing-page" prop assigned', () => {
    const propsData = {
      variant: 'landing-page',
    };
    const wrapper = shallowMount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
