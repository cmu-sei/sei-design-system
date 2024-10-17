import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from "./MegaMenuItem.vue";


describe("MegaMenuItem.vue", () => {
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
  it('matches snapshot with link kind "simple" prop assigned', () => {
    const propsData = {
      kind: 'simple',
    };
    const wrapper = mount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('matches snapshot with link kind "descriptive" prop assigned', () => {
    const propsData = {
      kind: 'descriptive',
    };
    const wrapper = mount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('matches snapshot with link kind "landing-page" prop assigned', () => {
    const propsData = {
      kind: 'landing-page',
    };
    const wrapper = mount(Component, { propsData });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
