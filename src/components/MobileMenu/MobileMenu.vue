<template>
  <nav
    data-id="sds-mobilemenu"
    role="menu"
  >
    <SdsPanel
      v-model="showPanel"
      :side="side"
    >
      <template #title>
        <slot
          name="title"
          :panel-update="panelUpdate"
          :active-panel="panel"
        />
      </template>
      <template #default>
        <slot
          name="default"
          :panel-update="panelUpdate"
          :active-panel="panel"
        />
      </template>
      <template #footer>
        <slot
          name="footer"
          :panel-update="panelUpdate"
          :active-panel="panel"
        />
      </template>
    </SdsPanel>
  </nav>
</template>

<script lang="ts">
import { ITopLink } from '../MegaMenu/MegaMenu.vue';
/**
 * Right now, this is the same interface as Mega Menu's ITopLink, with the addition of "type"
 */
interface IMobileMenu extends ITopLink {
  type?: 'back' | 'expand' | 'slide' | 'title'
}

export default {
  name: "SdsMobileMenu",
}
</script>

<script setup lang="ts">
import { computed, ref, watch, onUnmounted, PropType } from "vue";

const props = defineProps({
  /**
   * Provides the navigation item values used to populate the mobile menu.
   */
  mobileMenus: {
    type: Array as PropType<IMobileMenu[]>,
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
  'update:model-value',
]);

/**
 * The "panel" ref keeps track of the current Mobile Menu panel
 */
const panel = ref('root');

/**
 * This is a ref to mirror the "mobileMenus" prop. This provides an interactive data model for selecting panels.
 */
const mobileMenus = ref(props.mobileMenus);

/**
 * Callback to interactive with active menu panel state
 */
const panelUpdate = (e: Event, value: string) => {
  if (typeof document === "undefined") return null  // Only accept client-side calls
  // console.log(panel.value); // Which panel is selected?
  if (e.target !== null) {
    e.preventDefault();
    if ((e.currentTarget as HTMLElement).dataset.type === 'expand') {
      // Toggle selected, it's a "drawer" interaction
      mobileMenus.value.map(i => {
        i.selected = i.selected ? false : value === i.key;
      });
    } else {
      // Select a specific panel
      panel.value = value;
    }
  }
}

/* Update showPanel to toggle panel visibility */
const showPanel = computed({
  get() {
    return props.modelValue;
  },
  set(value: Boolean) {
    /**
     * Emmitted when mobileMenus changes.
     */
    emits("update:model-value", value);
  }
});

onUnmounted(() => {
  removeDomChanges();
})

const makeDomChanges = () => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.add("panel-prevent-scroll");
  setTimeout(() => {
    document.addEventListener("keyup", handleEscKey);
  }, 0);
}

const removeDomChanges = () => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove("panel-prevent-scroll");
  document.removeEventListener("keyup", handleEscKey);
}

const close = () => {
  showPanel.value = false;
}

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
