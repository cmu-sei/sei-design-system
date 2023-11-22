<template>
  <component
    :is="tag ? tag : 'button'"
    data-id="sds-navigationitem"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :href="href ? href : undefined"
    :class="{
      disabledClass: disabled,
      'group flex flex-row gap-4 cursor-pointer text-sm transition-all border-l-8 -mx-6 py-4 pl-4 pr-6': true,
      'text-gray-700 bg-white dark:text-gray-400 dark:bg-gray-900 hover:text-red-700 hover:bg-gray-50 hover:dark:text-red-100 hover:dark:bg-gray-850 border-l-transparent': !selected,
      'border-l-red-700 dark:border-l-red-400 text-gray-900 dark:text-gray-100 hover:text-red-700 hover:dark:text-red-100 hover:bg-gray-50 hover:dark:bg-gray-850': selected && (type === 'expand' && $slots.children),
    }"
    :tabindex="disabled ? -1 : href ? undefined : 0"
    role="menuitem"
    @click="handleEvent"
    @keydown="checkKeyEvent"
  >
    <slot
      v-if="$slots.left"
      name="left"
    />
    <slot
      name="default"
    >
      <span
        v-if="label"
        class="select-none text-lg"
      >
        {{ label }}
      </span>
    </slot>
    <svg
      v-if="$slots.children"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="24"
      viewBox="0 0 320 512"
      class="ml-auto group-hover:text-red-700 dark:text-gray-400 group-hover:dark:text-gray-100"
      :class="{
        'text-gray-700': true,
        'transition-transform': type === 'expand' && $slots.children,
        'rotate-90': selected && (type === 'expand' && $slots.children)
      }"
    >
      <path
        fill="currentColor"
        d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256L73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
      />
    </svg>
  </component>
  <div
    v-if="$slots.children"
    class="-mx-6 px-6 bg-white dark:bg-gray-900 relative top-0 transition-all ease-in-out duration-200 origin-top"
    :class="{
      'z-10 opacity-1 max-h-screen': selected && (type === 'expand' && $slots.children),
      '-z-10 opacity-0 max-h-0 select-none': !selected || type !== 'expand' || !$slots.children
    }"
  >
    <hr>
    <slot name="children" />
  </div>
</template>

<script lang="ts">
export default {
  name: "SdsNavigationItem",
}
</script>

<script setup lang="ts">
import { ref, computed } from "vue"

const props = defineProps({
  /**
   * Determines show/hide state of the panel
   */
  selected: {
    type: Boolean,
    default: false,
  },
  /**
   * This is the main navigation item text.
   */
  label: {
    type: String,
    default: ""
  },
  /**
   * Provides the "href" link to the Navigation Item
   */
  href: {
    type: String,
    default: null
  },
  /**
   * Determines the HTML tag to use.
   */
  tag: {
    type: String as PropType<'a' | 'button'>,
    default: 'a'
  },
  /**
   * Applies the appropriate attributes for external links and opens them in a new tab. It also creates a REL attribute that prevents browser sniffing.
   */
  external: {
    type: Boolean,
    default: false
  },
  /**
   * Disables the component to prevent user interaction.
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * The "type" prop determines the interaction for navigating to menu item's children.
   */
  type: {
    type: String as PropType<'expand' | 'slide'>,
    default: 'slide'
  }
});

/**
 * True/False value to keep track of selected menu
 */
const selected = ref(props.selected);
/**
 * Expand if it's a drawer (expand) type,
 * toggle into the next menu panel if it's
 * a sliding panel type.
 */
const handleEvent = (e: Event) => {
  if (!props.href) { // Not a link, prevent default action
    e.preventDefault();
    if (props.type === 'expand') { // Toggle, it's a drawer
      selected.value = !selected.value;
    } else { // Emit a step update to move to another menu panel
      console.log('Click event tried to emit "step-changed"');
      /* Set the selected menu item, or deselect if already selected */
    }
  } else {
    return true
  }
}

const disabledClass = computed(() => {
  return props.disabled ? "disabled" : ""
})

/**
 * Use spacebar and carriage return to toggle drawer-type menu,
 * or to navigate forward in a sliding-type menu.
 */
const checkKeyEvent = (event: KeyboardEvent) => {
  if (
    event.key === "Enter" ||
    event.key === " " // Spacebar
  ) {
    handleEvent(event);
  }
}
</script>
