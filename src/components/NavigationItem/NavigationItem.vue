<template>
  <button
    v-if="type === 'back'"
    class="flex flex-row text-gray-700 dark:text-gray-300 text-xl cursor-pointer mb-4 w-full"
    @click="(e: Event) => { onClick(e) }"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="mr-2 my-auto pt-0.5 relative w-6 h-6 self-center flex flex-col"
      viewBox="0 0 256 256"
    >
      <path
        fill="currentColor"
        d="M222 128a6 6 0 0 1-6 6H54.49l61.75 61.76a6 6 0 1 1-8.48 8.48l-72-72a6 6 0 0 1 0-8.48l72-72a6 6 0 0 1 8.48 8.48L54.49 122H216a6 6 0 0 1 6 6"
      />
    </svg>
    <h3 class="text-2xl font-thin">
      Go Back
    </h3>
  </button>
  <component
    :is="href ? 'a' : 'button'"
    v-if="type !== 'back'"
    :id="key ? `sds-navigationitem__${key.toString()}` : 'sds-navigationitem'"
    data-id="sds-navigationitem"
    :data-type="type"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :href="href ? href : undefined"
    class="group flex flex-row gap-4 text-sm transition-all border-l-8 w-[calc(100%+3rem)] -mx-6 py-3 pl-4 pr-6"
    :class="{
      disabledClass: disabled,
      'cursor-pointer': props.type !== 'title',
      'text-gray-700 bg-white dark:text-gray-400 dark:bg-gray-900 hover:text-red-700 hover:bg-gray-50 hover:dark:text-red-100 hover:dark:bg-gray-850 border-l-transparent': !props.selected && props.type !== 'title',
      'border-l-red-700 dark:border-l-red-400 text-gray-900 dark:text-gray-100 hover:text-red-700 hover:dark:text-red-100 hover:bg-gray-50 hover:dark:bg-gray-850': props.selected,
      'border-l-red-700 dark:border-l-red-400 text-gray-900 dark:text-gray-100 cursor-default': props.type === 'title',
    }"
    :tabindex="disabled || type === 'title' ? -1 : href ? undefined : 0"
    role="menuitem"
    @click="onClick"
  >
    <div
      v-if="$slots.left"
      class="my-auto"
    >
      <slot name="left" />
    </div>
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
    <div
      class="my-auto ml-auto text-gray-500 dark:text-gray-400 group-hover:text-red-700 group-hover:dark:text-gray-100"
    >
      <svg
        v-if="!props.href && props.type !== 'title'"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 512 512"
        class="ml-auto -mr-1 shrink-0"
        :class="{
          'transition-transform mr-0': type === 'expand' && $slots.children,
          'rotate-90': !props.selected && (type === 'expand' && $slots.children),
          '-rotate-90': props.selected && (type === 'expand' && $slots.children)
        }"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="48"
          d="m184 112l144 144l-144 144"
        />
      </svg>
    </div>
  </component>
  <div
    v-if="$slots.children && type !== 'back'"
    class="-mx-6 px-6 bg-white dark:bg-gray-900 relative top-0 transition-all ease-in-out duration-200 origin-top"
    :class="{
      'z-10 opacity-1 max-h-screen': props.selected && (type === 'expand' && $slots.children),
      '-z-10 opacity-0 max-h-0 select-none': !props.selected || type !== 'expand' || !$slots.children
    }"
  >
    <hr class="border-gray-200 dark:border-gray-700">
    <slot name="children" />
  </div>
  <hr
    v-if="props.type === 'title'"
    class="mt-4 mb-2 border-gray-200 dark:border-gray-700"
  >
</template>

<script lang="ts">
export default {
  name: "SdsNavigationItem",
}
</script>

<script setup lang="ts">
import { computed, getCurrentInstance } from "vue"

/**
 * Get the navigation item's key
 */
const key = getCurrentInstance()?.vnode.key ?? null;

const props = defineProps({
  /**
   * Determines show/hide state of the panel or the open/closed state of the 'expand'-able navigation item.
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
    type: String as PropType<'back' | 'expand' | 'slide' | 'title'>,
    default: 'slide'
  },
  /**
   * Override the default event handler.
   */
  onClick: {
    type: Function,
    default: null
  }
});

const disabledClass = computed(() => {
  return props.disabled ? "disabled" : ""
})
</script>
