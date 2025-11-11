import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from "./SortByDropdown.vue";

describe("SortByDropdown.vue", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      }
    })
    expect(wrapper.vm).toBeTruthy();
  });
})