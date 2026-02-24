<template>
  <nav
    data-id="sds-mobilemenu"
    role="menu"
    :aria-label="ariaLabel"
  >
    <SdsPanel
      v-model="showPanel"
      :side="side"
      :size="size"
      :z-index="zIndex"
    >
      <template #title>
        <!-- @slot The "title" slot used to supply custom logo or panel title that will display in at the top of every panel. I.e.: `<template #title>...</template>` -->
        <slot
          name="title"
          :navigate="navigate"
          :active-panel="panel"
        />
      </template>
      <template #default>
        <transition
          :enter-active-class="activeClass"
          enter-from-class="opacity-0 -right-full ml-40"
          enter-to-class="opacity-100 right-0 ml-0"
          :leave-active-class="activeClass"
          leave-from-class="opacity-100 right-0 ml-0"
          leave-to-class="opacity-0 -right-full ml-40"
        >
          <div v-if="typeof activePanel !== 'undefined' && panel === activePanel.key">
            <!-- @slot Dynamic "panel" slot. Use this slot to supply custom HTML that will display in the named panel. I.e.: `<template #panel(name)>...</template>` -->
            <slot
              :name="`panel(${panel})`"
              :navigate="navigate"
              :active-panel="panel"
            />
          </div>
        </transition>
        <transition
          :enter-active-class="activeClass"
          enter-from-class="opacity-0 -left-full mr-40"
          enter-to-class="opacity-100 left-0 mr-0"
          :leave-active-class="activeClass"
          leave-from-class="opacity-100 left-0 mr-0"
          leave-to-class="opacity-0 -left-full mr-40"
        >
          <div v-if="typeof activePanel === 'undefined'">
            <!-- @slot Default "panel" slot. Use this slot to supply custom HTML that will display in "root" panel. I.e.: `<template #default>...</template>` -->
            <slot
              :navigate="navigate"
              :active-panel="panel"
            />
          </div>
        </transition>
      </template>
      <template #footer>
        <!-- @slot The "footer" slot used to supply custom links or text that will display in at the top of every panel. I.e.: `<template #footer>...</template>` -->
        <slot
          name="footer"
          :navigate="navigate"
          :active-panel="panel"
        />
      </template>
    </SdsPanel>
  </nav>
</template>

<script setup lang="ts">
import SdsPanel from '../Panel/Panel.vue';
import { computed, ref } from "vue";
import { MegaMenuItem } from '../MegaMenu/MegaMenu.vue';

/**
 * Right now, this is the same interface as Mega Menu's ITopLink, with the addition of "type"
 */
export interface MobileMenuItem<T = Record<string, unknown>> extends MegaMenuItem<T> {
  type?: 'back' | 'expand' | 'slide' | 'title'
  icon?: string
}

defineOptions({
  name: "SdsMobileMenu"
})

/**
 * Default Tailwind classes for transitioning panels
 */
interface MobileMenuProps {
  /**
   * Provides the navigation item values used to populate the mobile menu.
   */
  mobileMenus?: MobileMenuItem[];
  /**
   * Determines the size of the panel.
   */
  size?: 'xl' | 'lg' | 'md' | 'sm';
  /**
   * Determines the location of the panel.
   */
  side?: 'left' | 'right' | '';
  /**
   * The z-index for the popover.
   */
  zIndex?: '0' | '10' | '20' | '30' | '40' | '50' | 'auto' | '';
  /**
   * Sets the aria-label for the component
   */
  ariaLabel?: string;
}

const activeClass = ref('transition-all duration-200 ease-in-out relative overflow-visible top-0 h-0');

const props = withDefaults(defineProps<MobileMenuProps>(), {
  mobileMenus: () => [],
  size: "md",
  side: "right",
  zIndex: '50',
  ariaLabel: undefined
});

/**
 * The v-model that determines the show/hide state of the panel.
 */
const showPanel = defineModel<boolean>({ type: Boolean, default: false })

/**
 * The "panel" ref keeps track of the current Mobile Menu panel
 */
const panel = ref('root');

/**
 * This is a ref to mirror the "mobileMenus" prop.
 * It provides an interactive data model for selecting panels.
 */
const mobileMenus = ref(props.mobileMenus);

/**
 * The navigate callback changes the active menu panel.
 * Pass the menu key of the panel to switch to.
 * If no argument is given (or if the key doesn't exist),
 * the menu will switch to the root/default panel.
 */
const navigate = (value: string | null = null) => {
  if (typeof document === "undefined") return null  // Only accept client-side calls
  mobileMenus.value.map(i => {
    /**
     * If menu item is already selected (true), deselect it (false).
     * Otherwise, check if the panel key argument matches any of the panel keys in the mobile menu's data.
     * If it matches, set that item's "selected" value to "true".
     */
    i.selected = i.selected ? false : value === i.key;
    if (i.selected && value) {
      panel.value = value;
    }
  });
}

const activePanel = computed(() => {
  /* Don't change the activePanel for 'expand' type NavigationItem. */
  return mobileMenus.value.find(i => i.selected && i.type !== 'expand')
})

defineExpose({
  activePanel,
  mobileMenus,
  navigate,
  panel,
  showPanel
})
</script>
