<template>
  <div
    ref="root"
    class="relative inline-block text-left"
  >
    <button
      :id="id"
      type="button"
      class="inline-flex"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      :class="[btnClass]"
      @click="handleClick"
    >
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
        class="absolute z-10"
        :class="{
          'right-0': right,
          'bottom-full': dropUp,
        }"
      >
        <div
          :class="menuClass"
          role="menu"
          aria-orientation="vertical"
          :aria-labelledby="id"
        >
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, onMounted, onUnmounted, nextTick, watch } from "vue";
import debounce from "../../helpers/debounce";
import uuid from '../../helpers/uuid';
import mitt from 'mitt';

export default defineComponent({
  name: "SdsDropdown",
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: "" },
    right: { type: Boolean, default: false },
    dropUp: { type: Boolean, default: false },
    btnClass: { type: String, default: "" },
    menuClass: {
      type: String,
      default:
        "py-2 border shadow-lg my-1 w-56 rounded-md bg-white dark:border-gray-500 dark:bg-gray-700",
    },
    hideCaret: { type: Boolean, default: false },
    hover: { type: Boolean, default: false },
    hoverDelay: { type: Number, default: 100 },
    animated: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'btn-click'],
  setup(props, { emit }) {
    const id = `sds-dropdown__${uuid()}`;
    const root = ref(null)
    const isOpen = ref(false)

    const emitter = mitt();
    provide('emitter', emitter);
    emitter.on("dropdown-close", () => {
      close()
    });

    onMounted(() => {
      document.addEventListener("mousedown", handleOutsideMouseDown);
      document.addEventListener("keyup", handleOutsideKeyUp);
      document.addEventListener("mouseover", debounceHandleOutsideMouseOver);
    })

    onUnmounted(() => {
      document.removeEventListener("mousedown", handleOutsideMouseDown);
      document.removeEventListener("keyup", handleOutsideKeyUp);
      document.removeEventListener(
        "mouseover",
        debounceHandleOutsideMouseOver
      );
    })

    watch(() => props.modelValue, (value: boolean) => {
      if (value === isOpen.value) return;
      isOpen.value = value;
    })

    watch(isOpen, (value: boolean) => {
      if (value === props.modelValue) return;
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

    return {
      root,
      id,
      isOpen,
      open,
      close,
      handleClick,
      handleOutsideMouseDown,
      handleOutsideKeyUp,
      handleOutsideMouseOver,
      debounceHandleOutsideMouseOver
    }
  },
});
</script>
