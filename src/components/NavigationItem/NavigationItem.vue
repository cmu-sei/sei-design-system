<template>
  <button
    v-if="type === 'back'"
    class="flex flex-row text-gray-700 dark:text-gray-300 text-xl cursor-pointer mb-4 w-full"
    @click="(e: Event) => { onClick?.(e) }"
  >
    <IconFa7SolidArrowLeft
      class="mr-2 my-auto pt-0.5 relative w-6 h-6 self-center flex flex-col pointer-events-none"
    />
    <h3 class="text-2xl font-thin pointer-events-none">
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
      'cursor-pointer': type !== 'title' && !disabled,
      'text-gray-400 bg-white dark:text-gray-700 dark:bg-gray-900 hover:text-gray-400 hover:bg-white dark:hover:text-gray-600 dark:hover:bg-gray-900 select-none pointer-events-none cursor-default border-l-transparent': disabled,
      'text-gray-700 bg-white dark:text-gray-400 dark:bg-gray-900 hover:text-red-700 hover:bg-gray-50 dark:hover:text-red-100 dark:hover:bg-gray-850 border-l-transparent': !disabled && !selected && type !== 'title',
      'border-l-red-700 dark:border-l-red-400 text-gray-900 dark:text-gray-100 hover:text-red-700 dark:hover:text-red-100 hover:bg-gray-50 dark:hover:bg-gray-850': selected,
      'border-l-red-700 dark:border-l-red-400 text-gray-900 dark:text-gray-100 cursor-default': type === 'title',
    }"
    :tabindex="disabled || type === 'title' ? -1 : href ? undefined : 0"
    role="menuitem"
    @click="(e: Event) => { onClick?.(e) }"
  >
    <div
      v-if="$slots.left"
      class="my-auto pointer-events-none"
    >
      <slot name="left" />
    </div>
    <slot
      name="default"
    >
      <span
        v-if="label"
        class="select-none text-lg pointer-events-none"
      >
        {{ label }}
      </span>
    </slot>
    <div
      v-if="(type === 'expand' && $slots.children) || type === 'slide'"
      class="my-auto ml-auto text-gray-500 dark:text-gray-400 group-hover:text-red-700 dark:group-hover:text-gray-100 pointer-events-none"
    >
      <IconFa7SolidChevronRight
        class="ml-auto -mr-1 shrink-0"
        :class="{
          'transition-transform mr-0': type === 'expand',
          'rotate-90': !selected && type === 'expand',
          '-rotate-90': selected && type === 'expand'
        }"
      />
    </div>
  </component>
  <div
    v-if="$slots.children && type === 'expand'"
    class="-mx-6 px-6 bg-white dark:bg-gray-900 relative top-0 transition-all ease-in-out duration-200 origin-top pointer-events-none"
    :class="{
      'z-10 opacity-100 max-h-screen': selected,
      '-z-10 opacity-0 max-h-0 select-none': !selected
    }"
  >
    <hr class="border-gray-200 dark:border-gray-700">
    <slot name="children" />
  </div>
  <hr
    v-if="type === 'title'"
    class="mt-4 mb-2 border-gray-200 dark:border-gray-700"
  >
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue"

interface NavigationItemProps {
  /**
   * Determines show/hide state of the panel or the open/closed state of the 'expand'-able navigation item.
   */
  selected?: boolean;
  /**
   * This is the main navigation item text.
   */
  label?: string;
  /**
   * Provides the "href" link to the Navigation Item
   */
  href?: string | null;
  /**
   * Applies the appropriate attributes for external links and opens them in a new tab. It also creates a REL attribute that prevents browser sniffing.
   */
  external?: boolean;
  /**
   * Disables the component to prevent user interaction.
   */
  disabled?: boolean;
  /**
   * The "type" prop determines the interaction for navigating to menu item's children.
   */
  type?: 'back' | 'expand' | 'simple' | 'slide' | 'title';
  /**
   * Override the default event handler.
   */
  onClick?: ((event: Event) => void) | null;
}

defineOptions({
  name: "SdsNavigationItem",
})

/**
 * Get the navigation item's key
 */
const key = getCurrentInstance()?.vnode.key ?? null;

withDefaults(defineProps<NavigationItemProps>(), {
  selected: false,
  label: "",
  href: null,
  external: false,
  disabled: false,
  type: 'simple',
  onClick: null
});
</script>
