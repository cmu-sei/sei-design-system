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
        />
      </template>
      <template #default>
        <slot
          name="default"
          :step-update="updateStep"
        />
      </template>
      <template #footer>
        <slot
          name="footer"
        />
      </template>
    </SdsPanel>
  </nav>
</template>

<script lang="ts">
import { ITopLink } from '../MegaMenu/MegaMenu.vue';
/**
 * Right now, this is the same interface as Mega Menu's ITopLink
 */
interface IMobileMenu extends ITopLink {
  type?: 'expand' | 'slide'
}

export default {
  name: "SdsMobileMenu",
}
</script>

<script setup lang="ts">
import { computed, watch, onUnmounted, PropType } from "vue";

const props = defineProps({
  /**
   * The v-model that determines the show/hide state of the panel.
   */
  modelValue: {
    type: Array as PropType<IMobileMenu[]>,
    default: () => []
  },
  /**
   * Panel visibility
   */
  visible: {
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
  'update:visible',
  'update:mobileMenus'
]);

/**
 * The "step" ref keeps track of the Mobile Menu depth
 */
const step = ref(1);
/* Go one */
const updateStep = (value: number) => {
  if (step.value + value > 1) {
    step.value += value;
  }
  step.value += value;
  console.log(step.value);
}

/* Update showPanel to toggle panel visibility */
const showPanel = computed({
  get() {
    return props.visible;
  },
  set(value: Boolean) {
    /**
     * Emmitted when modelValue changes.
     */
    emits("update:visible", value);
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
