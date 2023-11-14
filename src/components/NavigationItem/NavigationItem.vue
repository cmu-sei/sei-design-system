<template>
  <a
    data-id="sds-navigationitem"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="py-4 cursor-pointer text-sm transition-all hover:bg-gray-50 hover:dark:bg-gray-850 hover:text-red-500 dark:hover:text-red-300 border-l-8 border-l-transparent active:border-l-red-400 -mx-6 pl-4 pr-6"
    :tabindex="disabled ? -1 : undefined"
    role="menuitem"
  >
    <div class="flex flex-row gap-4 text-gray-600 dark:text-gray-400 hover:text-red-500">
      <div v-if="$slots.left">
        <slot name="left" />
      </div>
      <div class="inline-flex group">
        <p class="select-none text-lg">{{ label }}</p>
      </div>
      <p class=""><slot /></p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="24"
        viewBox="0 0 320 512"
        class="ml-auto"
      >
        <path
          fill="currentColor"
          d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256L73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
        />
      </svg>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

export default defineComponent({
  name: "SdsNavigationItem",
  props: {
    /**
     * Main NavigationItem text content
     */
    label: { type: String, default: "" },
    /**
     * Applies the appropriate attributes for external links and opens them in a new tab. It also creates a REL attribute that prevents browser sniffing.
     */
    external: { type: Boolean, default: false },
    /**
     * Disables the component to prevent user interaction.
     */
    disabled: { type: Boolean, default: false },
  },
  setup(props) {
    const disabledClass = computed(() => {
      return props.disabled ? "disabled" : ""
    })

    return { disabledClass }
  },
})
</script>
