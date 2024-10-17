import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './Input.vue'

describe('Input', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {});
    expect(wrapper.element).toMatchSnapshot();
  })

  it('should match its snapshot with maxlength prop assigned', () => {
    const wrapper = mount(Component, {
      props: { maxlength: 200 }
    });
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('should match its snapshot with countCharacters prop assigned', () => {
    const wrapper = mount(Component, {
      props: {
        countCharacters: true,
        type: 'number'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('should match its snapshot with id prop assigned', () => {
    const wrapper = mount(Component, {
      props: { id: 'unique-identifier' }
    });
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('should match its snapshot with placeholder prop assigned', () => {
    const wrapper = mount(Component, {
      props: { placeholder: 'Firstname Lastname' }
    });
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('should match its snapshot with size prop assigned a value', async () => {
    const wrapper = mount(Component, {
      props: { size: 'md' }
    });
    expect(wrapper.html()).toMatchSnapshot();
    await wrapper.setProps({ size: 'sm' });
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('should match its snapshot with autofocus prop assigned', () => {
    const wrapper = mount(Component, {
      attachTo: document.body,
      props: { autofocus: true }
    });
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('should match its snapshot with disabled prop assigned', () => {
    const wrapper = mount(Component, {
      props: { disabled: true }
    });
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('should match its snapshot with required prop assigned', () => {
    const wrapper = mount(Component, {
      props: { required: true }
    });
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('should match its snapshot with pattern prop assigned a value', () => {
    const wrapper = mount(Component, {
      props: { 
        pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
        type: 'tel'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  })
  
  it('should match its snapshot with readonly prop assigned', () => {
    const wrapper = mount(Component, {
      props: { readonly: true }
    });
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('should match its snapshot with valid, invalid props assigned', async () => {
    const wrapper = mount(Component, {});
    await wrapper.setProps({ valid: true });
    expect(wrapper.html()).toMatchSnapshot();
    await wrapper.setProps({ invalid: true, valid: false });
    expect(wrapper.html()).toMatchSnapshot();
  })
})
