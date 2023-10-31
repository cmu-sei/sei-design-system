<template>
  <SdsPanel
    v-model="showPanel"
    :side="side"
  >
    <slot />
  </SdsPanel>
</template>

<script lang="ts">
import { defineComponent, computed, watch, onUnmounted, PropType } from "vue";

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
     * The z-index for the popover.
     */
    zIndex: { type: String as PropType<'0' | '10' | '20' | '30' | '40' | '50' | 'auto' | ''>, required: false, default: '50' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {

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

    return {
      showPanel,
      makeDomChanges,
      removeDomChanges,
      close,
    }
  }
});
</script>

<style>
.panel-prevent-scroll {
  overflow: hidden;
}
</style>
