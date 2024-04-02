<template>
  <nav
    data-id="sds-mobilemenu"
    role="menu"
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
          enter-to-class="opacity-1 right-0 ml-0"
          :leave-active-class="activeClass"
          leave-from-class="opacity-1 right-0 ml-0"
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
          enter-to-class="opacity-1 left-0 mr-0"
          :leave-active-class="activeClass"
          leave-from-class="opacity-1 left-0 mr-0"
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

<script lang="ts">
import { MegaMenuItem } from '../MegaMenu/MegaMenu.vue';
/**
 * Right now, this is the same interface as Mega Menu's ITopLink, with the addition of "type"
 */
export interface MobileMenuItem<T = Record<string, unknown>> extends MegaMenuItem<T> {
  type?: 'back' | 'expand' | 'slide' | 'title'
  icon?: string
}

export default {
  name: "SdsMobileMenu",
}
</script>

<script setup lang="ts">
import SdsPanel from '../Panel/Panel.vue';
import { computed, ref, watch, onUnmounted, PropType } from "vue";

/**
 * Default Tailwind classes for transitioning panels
 */
const activeClass = ref('transition-all duration-200 ease-in-out relative overflow-visible top-0 h-0');

const props = defineProps({
  /**
   * Provides the navigation item values used to populate the mobile menu.
   */
  mobileMenus: {
    type: Array as PropType<MobileMenuItem[]>,
    default: () => []
  },
  /**
   * The v-model that determines the show/hide state of the panel.
   */
  modelValue: {
    type: Boolean,
    default: false
  },
  /**
   * Determines the size of the panel.
   */
  size: {
    type: String as PropType<'xl' | 'lg' | 'md' | 'sm'>,
    default: "md",
  },
  /**
   * Determines the location of the panel.
   */
  side: {
    type: String as PropType<'left' | 'right' | ''>,
    default: "right",
  },
  /**
   * The z-index for the popover.
   */
  zIndex: { type: String as PropType<'0' | '10' | '20' | '30' | '40' | '50' | 'auto' | ''>, required: false, default: '50' },
});

const emits = defineEmits([
  /**
   * When data supplied to the Mobile Menu component
   * changes, emit an event. This lets developers
   * trigger other actions off the Mobile Menu's modelValue
   * when it changes.
   */
  'update:model-value',
]);

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

/* Update showPanel to toggle panel visibility */
const showPanel = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    /**
     * Emmitted when mobileMenus changes.
     */
    emits("update:model-value", value);
  }
});

onUnmounted(() => {
  removeDomChanges();
})

/* Helper function for exiting mobile menu on "Esc" */
const makeDomChanges = () => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.add("panel-prevent-scroll");
  setTimeout(() => {
    document.addEventListener("keyup", handleEscKey);
  }, 0);
}

/* Helper function for exiting mobile menu on "Esc" */
const removeDomChanges = () => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove("panel-prevent-scroll");
  document.removeEventListener("keyup", handleEscKey);
}

const close = () => {
  showPanel.value = false;
}

/* Helper function for exiting mobile menu on "Esc" */
const handleEscKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    close();
  }
}

watch(showPanel, (value) => {
  showPanel.value = (value as boolean);
  if (typeof document === "undefined") return;
  if (value) {
    makeDomChanges();
  } else {
    removeDomChanges();
  }
}, { immediate: true })
</script>

<style>
.panel-prevent-scroll {
  overflow: hidden;
}
</style>
