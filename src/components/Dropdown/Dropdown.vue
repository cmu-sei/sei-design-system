<template>
  <div
    ref="root"
    class="relative inline-block text-left"
  >
    <!-- @slot Trigger content. Use if you want to override the default button trigger. Ensure to use the v-model to control open/close state. -->
    <slot name="trigger">
      <button
        ref="button"
        v-uid
        type="button"
        class="inline-flex"
        aria-haspopup="true"
        :aria-expanded="isOpen"
        :class="[btnClass]"
        @click="handleClick"
      >
        <!-- @slot Title content of trigger button. -->
        <slot name="title">
          {{ title }}
        </slot>
        <svg
          v-if="!hideCaret"
          class="self-center w-5 h-5 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </slot>
    <transition
      :css="animated"
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        ref="menu"
        class="absolute z-50"
        :class="{
          'right-0': right,
          'bottom-full': dropUp,
        }"
      >
        <div
          :class="menuClass"
          role="menu"
          aria-orientation="vertical"
          :aria-labelledby="button && (button as HTMLElement).id || undefined"
        >
          <!-- @slot Default slot content. This is the content of the dropdown menu. -->
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, onMounted, onUnmounted, nextTick, watch } from "vue";
import debounce from "../../helpers/debounce";
import { Uid } from '@shimyshack/uid'
import mitt from 'mitt';

export default defineComponent({
  name: "SdsDropdown",
  directives: {
    uid: Uid
  },
  props: {
    /**
     * The v-model for the component (determines if the menu is displayed or hidden).
     */
    modelValue: {
      type: Boolean,
      default: false,
    },
    /**
     * The content of the dropdown trigger.
     */
    title: {
      type: String,
      default: "",
    },
    /**
     * Styling for the button trigger.
     */
    btnClass: {
      type: String,
      default: "",
    },
    /**
     * Styling for the dropdown menu.
     */
    menuClass: {
      type: String,
      default:
        "py-2 border shadow-lg my-1 w-56 rounded-md bg-white dark:border-gray-500 dark:bg-gray-700",
    },
    /**
     * Determines whether to hide or show the caret.
     */
    hideCaret: {
      type: Boolean,
      default: false,
    },
    /**
     * Determines whether to activate the dropdown on hover instead of click.
     */
    hover: {
      type: Boolean,
      default: false,
    },
    /**
     * Determines the time to delay the hover trigger in milliseconds.
     */
    hoverDelay: {
      type: Number,
      default: 100,
    },
    /**
     * Determines whether the dropdown menu is animated when shown/hidden.
     */
    animated: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'btn-click'],
  setup(props, { emit }) {
    const root = ref(null)
    const button = ref(null)
    const menu = ref(null)
    const isOpen = ref(false)

    const dropUp = ref(false)
    const right = ref(false)

    const emitter = mitt();
    provide('emitter', emitter);
    emitter.on("dropdown-close", () => {
      close()
    });

    onMounted(() => {
      document.addEventListener("mousedown", handleOutsideMouseDown);
      document.addEventListener("keyup", handleOutsideKeyUp);
      document.addEventListener("mouseover", debounceHandleOutsideMouseOver);
      document.addEventListener("scroll", debounceHandleDocumentScroll);
      handleDocumentScroll();
      window.addEventListener("resize", debounceHandleWindowResize);
    })

    onUnmounted(() => {
      document.removeEventListener("mousedown", handleOutsideMouseDown);
      document.removeEventListener("keyup", handleOutsideKeyUp);
      document.removeEventListener(
        "mouseover",
        debounceHandleOutsideMouseOver
      );
      document.removeEventListener('scroll', debounceHandleDocumentScroll);
      window.removeEventListener('resize', debounceHandleWindowResize);
    })

    watch(() => props.modelValue, (value: boolean) => {
      if (value === isOpen.value) return;
      isOpen.value = value;
    })

    watch(isOpen, (value: boolean) => {
      if (value) {
        nextTick(() => {
          handleWindowResize()
        })
      }
      if (value === props.modelValue) return;
      /**
       * Emmitted when modelValue changes.
       */
      emit("update:modelValue", value);
    })

    const open = () => {
      if (isOpen.value) return;
      nextTick(() => {
        isOpen.value = true;
      });
    }

    const close = () => {
      if (!isOpen.value) return;
      nextTick(() => {
        isOpen.value = false;
      });
    }

    const handleClick = () => {
      /**
       * Emmitted on trigger button click.
       */
      emit("btn-click");
      if (props.hover) return;
      isOpen.value = !isOpen.value;
    }

    const handleOutsideMouseDown = ($event: MouseEvent) => {
      if (!isOpen.value) return;
      if ((root.value as any).contains($event.target)) return;
      close();
    }

    const handleOutsideKeyUp = ($event: KeyboardEvent) => {
      if (!isOpen.value) return;
      if ($event.key === 'Escape') close();
      if ((root.value as any).contains($event.target)) return;
    }

    const handleOutsideMouseOver = ($event: MouseEvent) => {
      if (!props.hover) return;
      const hoveringDropdown = (root.value as any).contains($event.target);
      if (!isOpen.value && hoveringDropdown) {
        open();
      } else if (isOpen.value && !hoveringDropdown) {
        close();
      }
    }

    const debounceHandleOutsideMouseOver = debounce(
      handleOutsideMouseOver,
      props.hoverDelay
    );

    const handleDocumentScroll = () => {
      if (typeof window === "undefined" || typeof document === "undefined" || !root.value) {
        return;
      }
      const { top } = (root.value as HTMLElement).getBoundingClientRect();
      const vHeight = (window.innerHeight || document.documentElement.clientHeight);
      dropUp.value = top > vHeight / 2;
    }

    const handleWindowResize = () => {
      if (typeof window === "undefined" || typeof document === "undefined" || !root.value || !menu.value) {
        return;
      }
      const { left } = (root.value as HTMLElement).getBoundingClientRect();
      const { width } = (menu.value as HTMLElement).getBoundingClientRect();
      const vWidth = (window.innerWidth || document.documentElement.clientWidth);
      right.value = left + width > vWidth;
    }

    const debounceHandleDocumentScroll = debounce(handleDocumentScroll, 100);
    const debounceHandleWindowResize = debounce(handleWindowResize, 250);

    return {
      root,
      button,
      isOpen,
      right,
      dropUp,
      open,
      close,
      handleClick,
      handleOutsideMouseDown,
      handleOutsideKeyUp,
      handleOutsideMouseOver,
      debounceHandleOutsideMouseOver,
      handleDocumentScroll,
      handleWindowResize,
      debounceHandleDocumentScroll,
      debounceHandleWindowResize
    }
  },
});
</script>
