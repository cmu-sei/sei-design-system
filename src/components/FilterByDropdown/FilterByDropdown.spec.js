import { shallowMount } from '@vue/test-utils'
import Component from "./FilterByDropdown.vue";

describe("FilterByDropdown.vue", () => {
  it("is a Vue instance", () => {
    const wrapper = shallowMount(Component);
    expect(wrapper.vm).toBeTruthy();
  });

  it("matches snapshot with no props assigned", async () => {
    const props = {};
    const wrapper = shallowMount(Component, { props });
    await wrapper.setData({ uuid: 'testing123' })
    expect(wrapper.html()).toMatchSnapshot();
  });
});
