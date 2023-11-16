<template>
  <SdsPanel
    v-for="menu in content"
    :key="menu.key"
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
      />
    </template>
    <template #footer>
      <slot
        name="footer"
      />
    </template>
  </SdsPanel>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onUnmounted, PropType } from "vue";

interface INavLink {
  key: string
  tag?: 'button' | 'a'
  title?: string
  href?: string
  alignment?: 'left' | 'right' | 'center'
  children?: INavLink[]
  external?: boolean
  active?: boolean
  selected?: boolean
  disabled?: boolean
  onClick?: Function
}

export default defineComponent({
  name: "SdsMobileMenu",
  props: {
    /**
     * The v-model that determines the show/hide state of the panel.
     */
    modelValue: {
      type: Boolean,
      default: false,
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
     * Provides an alias for handling data within the Mobile Menu.
     */
    mobileMenus:  {
      type: Array as PropType<INavLink[]>,
      default: () => []
    },
    /**
     * The z-index for the popover.
     */
    zIndex: { type: String as PropType<'0' | '10' | '20' | '30' | '40' | '50' | 'auto' | ''>, required: false, default: '50' },
  },
  emits: ['update:modelValue', 'update:mobileMenus'],
  setup(props, { emit }) {
    /**
     * Step is used to reference the depth of the Mobile Menu.
     * This lets a developer manage a multi-view workflow within the Panel.
     */
    const step = ref(1);
    /* Update showPanel to toggle panel visibility */
    const showPanel = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        /**
         * Emmitted when modelValue changes.
         */
        emit("update:modelValue", value);
      },
    })

    const content = computed({
      /* Get SdsMegaMenu modelValue property */
      get(): INavLink[] {
        return props.mobileMenus
      },
      /* Set SdsMegaMenu modelValue property */
      set(value: INavLink[]) {
        /**
         * Emmitted when the v-model (Mega Menu's data source)
         * has changed.
         */
        emit('update:mobileMenus', value)
      }
    })

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
        step.value = 1; // Reset menu depth to 0 on next open
      } else {
        removeDomChanges();
      }
    }, { immediate: true })

    return {
      showPanel,
      content,
      makeDomChanges,
      removeDomChanges,
      close,
      step
    }
  }
});
</script>

<style>
.panel-prevent-scroll {
  overflow: hidden;
}
</style>
