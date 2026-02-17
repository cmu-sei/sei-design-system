<template>
  <a
    data-id="sds-megamenuitem"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="[linkClass, typeClass, disabledClass]"
    :tabindex="disabled ? -1 : undefined"
    role="menuitem"
  >
    <div v-if="$slots.top">
      <slot name="top" />
    </div>
    <div class="flex flex-row gap-4">
      <div v-if="$slots.left">
        <slot name="left" />
      </div>
      <div
        :class="[
          type === 'descriptive'
            ? 'gap-1'
            : '',
          'flex flex-col'
        ]"
      >
        <div class="flex flex-row justify-start w-full group">
          <p class="group-hover:text-red-600 dark:group-hover:text-red-300 w-fit inline-block my-auto">
            <span>{{ label }}</span>
            <span
              v-if="cta || type === 'landing-page' || external"
              class="w-fit my-auto h-full whitespace-nowrap"
            >
              {{ '\u00a0' /* This is a whitespace character, it will prevent the trailing icon from wrapping */ }}
              <IconFa7SolidArrowUpRightFromSquare
                v-if="external && type === 'landing-page'"
                class="-mt-1 -ml-1 relative inline-block mb-0.5 w-5 h-5 group-hover:ml-1 group-hover:-mr-1 text-red-600 dark:text-red-300 transition-all"
              />
              <IconFa7SolidArrowRight
                v-if="(cta || type === 'landing-page') && !external"
                class="-mt-1 inline-block w-5 h-5 transition-all text-red-600 dark:text-red-300 group-hover:ml-2 group-hover:-mr-2"
              />
              <IconFa7SolidArrowUpRightFromSquare
                v-if="external && (type === 'simple' || type === 'descriptive')"
                class="-mt-1 w-4 h-4 -ml-0.5 opacity-0 group-hover:opacity-100 relative inline-block transition-all"
              />
            </span>
          </p>
        </div>
        <p class="text-gray-600 dark:text-gray-400"><slot /></p>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsMegaMenuItem'
})

const props = defineProps({
  /**
   * Main MegaMenuItem text content
   */
  label: { type: String, default: "" },
  /**
   * Determines the MegaMenuItem component type to use.
   */
  type: {
    type: String as PropType<"landing-page" | "descriptive" | "simple">,
    default: "simple",
  },
  /**
   * Applies the appropriate attributes for external links and opens them in a new tab. It also creates a REL attribute that prevents browser sniffing.
   */
  external: { type: Boolean, default: false },
  /**
   * Gives the link a "Call to Action" styling.
   */
  cta: { type: Boolean, default: false },
  /**
   * Disables the component to prevent user interaction.
   */
  disabled: { type: Boolean, default: false },
})

const linkClass = computed(() => {
  /* If the type is set, or if `cta` prop is set, apply styles */
  const classes = props.type || props.cta
    ? 'link group w-full no-underline'
    : ''
  return classes
})

const typeClass = computed(() => {
  /* Apply styles based on type class */
  const type = props.type as
    | "landing-page"
    | "descriptive"
    | "simple"
  switch (type) {
    case "landing-page":
      return "p-4 text-lg hover:no-underline hover:text-red-600 dark:hover:text-red-300"
    case "descriptive":
      return "p-4 transition-all rounded-theme-lg hover:no-underline hover:bg-gray-25 dark:hover:bg-gray-850"
    case "simple":
      return "p-4 text-sm transition-all rounded-theme-lg hover:bg-gray-25 dark:hover:bg-gray-850 hover:text-red-600 dark:hover:text-red-300"
    default:
      return ""
  }
})

const disabledClass = computed(() => {
  return props.disabled ? "disabled" : ""
})
</script>
