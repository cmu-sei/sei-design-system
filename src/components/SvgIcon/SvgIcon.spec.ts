import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from './SvgIcon.vue'

describe('SvgIcon', () => {
  it('should match its default snapshot', () => {
    const wrapper = mount(Component, {
      props: {
        height: 21,
        path: 'M0.5 3C0.5 1.63281 1.59375 0.5 3 0.5L9.09375 0.5C9.5625 0.5 10.0703 0.734375 10.4219 1.08594L14.9141 5.57812C15.2656 5.92969 15.5 6.4375 15.5 6.90625V18C15.5 19.4062 14.3672 20.5 13 20.5H3C1.59375 20.5 0.5 19.4062 0.5 18L0.5 3ZM14.25 8H9.875C8.82031 8 8 7.17969 8 6.125V1.75L3 1.75C2.29688 1.75 1.75 2.33594 1.75 3L1.75 18C1.75 18.7031 2.29688 19.25 3 19.25H13C13.6641 19.25 14.25 18.7031 14.25 18V8ZM14.0547 6.47656L9.52344 1.94531C9.44531 1.86719 9.32812 1.82812 9.25 1.78906V6.125C9.25 6.47656 9.52344 6.75 9.875 6.75H14.2109C14.1719 6.67188 14.1328 6.55469 14.0547 6.47656Z',
        viewBox: '0 0 16 21',
        width: 16
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
