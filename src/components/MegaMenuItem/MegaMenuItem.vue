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
              <svg
                v-if="external && type === 'landing-page'"
                class="-ml-1 relative inline-block mb-0.5 w-6 h-6 group-hover:ml-1 group-hover:-mr-1 text-red-600 dark:text-red-300 transition-all"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  class="transition-transform group-hover:-rotate-45 group-hover:translate-y-[7px] group-hover:-translate-x-[0.5px] group-hover:scale-y-90 group-hover:scale-x-95"
                  stroke-width="0.5"
                  d="M18.7063 12.7086C19.0969 12.318 19.0969 11.6836 18.7063 11.293L13.7063 6.29297C13.3156 5.90234 12.6813 5.90234 12.2906 6.29297C11.9 6.68359 11.9 7.31797 12.2906 7.70859L15.5875 11.0023H6C5.44687 11.0023 5 11.4492 5 12.0023C5 12.5555 5.44687 13.0023 6 13.0023H15.5844L12.2937 16.2961C11.9031 16.6867 11.9031 17.3211 12.2937 17.7117C12.6844 18.1023 13.3188 18.1023 13.7094 17.7117L18.7094 12.7117L18.7063 12.7086Z"
                  fill="currentColor"
                />
                <path
                  d="M11 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H17C18.1046 19 19 18.1046 19 17V13"
                  class="opacity-0 group-hover:opacity-100 transition-opacity scale-90"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <svg
                v-if="(cta || type === 'landing-page') && !external"
                class="inline-block w-4 mb-1 h-4 transition-all text-red-600 dark:text-red-300 group-hover:ml-2 group-hover:-mr-2"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h306.7L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                />
              </svg>
              <svg
                v-if="external && (type === 'simple' || type === 'descriptive')"
                class="w-4 h-4 mb-[1px] -ml-0.5 opacity-0 group-hover:opacity-100 relative inline-block transition-all"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  class="transition-transform -rotate-45 translate-y-[7px] -translate-x-[0.5px] scale-y-90 scale-x-95"
                  stroke-width="0.5"
                  d="M18.7063 12.7086C19.0969 12.318 19.0969 11.6836 18.7063 11.293L13.7063 6.29297C13.3156 5.90234 12.6813 5.90234 12.2906 6.29297C11.9 6.68359 11.9 7.31797 12.2906 7.70859L15.5875 11.0023H6C5.44687 11.0023 5 11.4492 5 12.0023C5 12.5555 5.44687 13.0023 6 13.0023H15.5844L12.2937 16.2961C11.9031 16.6867 11.9031 17.3211 12.2937 17.7117C12.6844 18.1023 13.3188 18.1023 13.7094 17.7117L18.7094 12.7117L18.7063 12.7086Z"
                  fill="currentColor"
                />
                <path
                  d="M11 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H17C18.1046 19 19 18.1046 19 17V13"
                  class="opacity-100 scale-90"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
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
