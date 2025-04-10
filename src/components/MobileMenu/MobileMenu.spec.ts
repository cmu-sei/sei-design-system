import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SdsMobileMenu, { type MobileMenuItem } from './MobileMenu.vue';
import SdsPanel from '../Panel/Panel.vue';

const testMenus: MobileMenuItem[] = [
  {
    key: "plants",
    title: "Plants",
    icon: "plant",
    type: "slide",
    selected: false,
    content: {
      children: [
        {
          key: "plants_title",
          title: "Plants",
          type: "title",
        },
        {
          key: "ferns",
          title: "Ferns",
          href: "/components/navigation",
          disabled: true
        },
        {
          key: "cacti",
          title: "Cacti",
          href: "/components/navigation",
        }
      ]
    }
  },
  {
    key: "trees",
    title: "Trees",
    icon: "tree",
    type: "slide",
    selected: false,
    content: {
      children_1: [
        {
          key: "deciduous",
          title: "Deciduous",
          href: "/components/navigation"
        },
        {
          key: "leafy",
          title: "Leafy",
          href: "/components/navigation"
        }
      ],
      children_2: [
        {
          key: "tree_anatomy",
          title: "Tree Anatomy",
          href: "/components/navigation"
        },
        {
          key: "available_saplings",
          title: "Available Saplings",
          href: "/components/navigation"
        }
      ]
    }
  },
  {
    key: "bugs",
    title: "Bugs",
    icon: "bug",
    type: "expand",
    selected: false,
    content: {
      children: [
        {
          key: "anthropods",
          title: "Anthropods",
          href: "/components/navigation",
          type: "simple",
          disabled: false
        },
        {
          key: "arachnids",
          title: "Arachnids",
          href: "/components/navigation",
          type: "simple",
          disabled: false
        }
      ]
    }
  }
]

const defaultProps = {
  mobileMenus: testMenus,
  ariaLabel: 'Mobile Menu',
};

describe('SdsMobileMenu', () => {
  it('renders correctly with default props', async () => {
    const wrapper = mount(SdsMobileMenu, {
      props: defaultProps
    });

    expect(wrapper.exists()).toBe(true); // Ensure the wrapper exists
    expect(wrapper.vm).toBeDefined(); // Check if it's a Vue instance

    /* Make sure the aria label works */
    expect(wrapper.find('nav').attributes('aria-label')).toBe('Mobile Menu');
  });

  it('renders slots correctly', async () => {
    const title = 'Custom Title';
    const defaultSlot = 'Custom Default';
    const footer = 'Custom Footer';

    const wrapper = mount(SdsMobileMenu, {
      props: { ...defaultProps, modelValue: true },
      slots: {
        title: `<div id="customTitle">${title}</div>`,
        default: `<div id="customDefault">${defaultSlot}</div>`,
        footer: `<div id="customFooter">${footer}</div>`,
      }
    });

    expect(wrapper.exists()).toBe(true); // Ensure the wrapper exists
    expect(wrapper.vm).toBeDefined(); // Check if it's a Vue instance

    /* Ensure the child Panel is active */
    expect(wrapper.findComponent(SdsPanel).props('modelValue')).toBe(true);

    await wrapper.vm.$nextTick();
    /* Ensure slot content works */
    expect(document.getElementById('customTitle')?.innerHTML).toContain(title);
    expect(document.getElementById('customDefault')?.innerHTML).toContain(defaultSlot);
    expect(document.getElementById('customFooter')?.innerHTML).toContain(footer);
  });

  it('toggles panel visibility based on modelValue prop', async () => {
    const wrapper = mount(SdsMobileMenu, {
      attachTo: document.body,
      props: { ...defaultProps, modelValue: true },
    });

    await wrapper.vm.$nextTick();

    /* Match snapshot of empty nav (panel gets teleported) */
    expect(document.body).toMatchSnapshot();
    const panelElement = wrapper.findComponent('[data-id="sds-panel"]');
    /* Mock changing elements for snapshot */
    (panelElement.element as HTMLElement).setAttribute('aria-labelledby', 'mocked');
    (panelElement.element as HTMLElement).setAttribute('id', 'mocked1');

    await wrapper.vm.$nextTick();

    expect(panelElement.element).toMatchSnapshot();
    expect(wrapper.findComponent(SdsPanel).props('modelValue')).toBe(true);

    await wrapper.setProps({ modelValue: false });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(SdsPanel).props('modelValue')).toBe(false);
  });

  it('handles activePanel correctly', async () => {
    const wrapper = mount(SdsMobileMenu, {
      props: { ...defaultProps, mobileMenus: [
        { key: 'home', label: 'Home', selected: true, type: 'expand' },
        { key: 'about', label: 'About', selected: false },
      ]}
    });

    const activePanel = wrapper.vm.activePanel;
    expect(activePanel).toBeUndefined();

    wrapper.vm.navigate('about');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.activePanel?.key).toBe('about');
  });

  it('navigates to the correct panel', async () => {
    const wrapper = mount(SdsMobileMenu, {
      props: { ...defaultProps, modelValue: true }
    });

    // Access the navigate function via the wrapper's component instance
    const navigate = wrapper.vm.navigate;
    // Access the current panel from the component's refs
    const panel = wrapper.vm.panel;
    // Starts as 'root'
    expect(panel).toBe('root');
    // Navigate to 'plants'
    await navigate('plants');
    // Next frame
    await wrapper.vm.$nextTick();
    // Expect to be 'plants'
    expect(wrapper.vm.panel).toBe('plants');
    // Expect menu data to show 'selected' for 'plants'
    expect(wrapper.vm.mobileMenus[0].selected).toBe(true);
  });

  it('adds and removes DOM changes correctly', async () => {
    const wrapper = mount(SdsMobileMenu, {
      props: { ...defaultProps, modelValue: true }
    });

    expect(document.documentElement.classList.contains('panel-prevent-scroll')).toBe(true);
    await wrapper.setProps({ modelValue: false });
    await wrapper.vm.$nextTick();
    expect(document.documentElement.classList.contains('panel-prevent-scroll')).toBe(false);
  });

  it.todo('closes the panel on Esc key press', async () => {
    /*
    const wrapper = mount(SdsMobileMenu, {
      props: { ...defaultProps, modelValue: true },
      attachTo: document.body,
      global: {
        stubs: {
          teleport: true
        }
      }
    });

    console.log(`document.body: ${document.body.innerHTML}`)
    console.log(`modelValue: ${wrapper.props().modelValue}`)

    await wrapper.vm.$nextTick();
    wrapper.setProps({ modelValue: true })
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showPanel).toBeTruthy()
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
    const event = new KeyboardEvent('keyup', { key: 'Escape' })
    wrapper.vm.handleEscKey(event)
    await wrapper.vm.$nextTick();

    console.log(`showPanel: ${wrapper.vm.showPanel}`)
    console.log(`modelValue: ${wrapper.props().modelValue}`)

    expect(wrapper.vm.showPanel).toBeFalsy()
    */
  });

  it.todo('emits update:model-value event when showPanel changes', async () => {
    /*
    const wrapper = mount(SdsMobileMenu, {
      props: { ...defaultProps, modelValue: true }
    });
    await wrapper.setProps({ modelValue: true });
    await wrapper.vm.$nextTick();
    wrapper.vm.$emit('update:model-value', false);
    await wrapper.vm.$nextTick();
    console.log(wrapper.emitted())
    expect(wrapper.emitted('update:model-value')).toBeTruthy();
    expect(wrapper.emitted('update:model-value')?.[0]).toEqual([false]);
    */
  });
});
