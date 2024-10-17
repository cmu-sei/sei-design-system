import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Tabs.vue'

describe('Tabs', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      directives: {
        'uid': {
          created(el) {
            el.setAttribute('id', 'unique-id')
          }
        }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

it("matches disabled prop", () => {
  const props = { disabled: true };
  const wrapper = mount(Component, { props });
  expect(wrapper.html()).toContain('disabled="true"');
});
