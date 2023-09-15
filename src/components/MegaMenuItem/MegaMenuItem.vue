<template>
  <a
    data-id="sds-megamenuitem"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="[linkClass, kindClass, disabledClass]"
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
      <div class="flex flex-col gap-1">
        <div class="inline-flex group">
          <p class="group-hover:text-red-500">{{ label }}</p>
          <svg
            v-if="cta || kind === 'landing-page'"
            class="w-4 h-4 ml-2 my-auto transition-all text-red-500 dark:text-red-300 group-hover:ml-4"
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="32"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h306.7L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
            />
          </svg>
        </div>
        <p><slot /></p>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue"

export default defineComponent({
  name: "SdsMegaMenuItem",
  props: {
    /**
     * Main MegaMenuItem text content
     */
    label: { type: String, default: "" },
    /**
     * Determines the MegaMenuItem component kind to use.
     */
    kind: {
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
  },
  setup(props) {
    const linkClass = computed(() => {
      /* If the kind is set, or if `cta` prop is set, apply styles */
      let classes = props.kind || props.cta
        ? 'link group w-full px-4 no-underline'
        : ''
      return classes
    })

    const kindClass = computed(() => {
      /* Apply styles based on kind class */
      const kind = props.kind as
        | "landing-page"
        | "descriptive"
        | "simple"
      switch (kind) {
        case "landing-page":
          return "text-lg mb-8 hover:no-underline hover:text-red-500"
        case "descriptive":
          return "p-4 transition-all rounded-lg hover:no-underline hover:bg-gray-50 hover:dark:bg-gray-850"
        case "simple":
          return "mb-2 p-4 text-sm transition-all rounded-lg hover:bg-gray-50 hover:dark:bg-gray-850 hover:text-red-500"
        default:
          return ""
      }
    })

    const disabledClass = computed(() => {
      return props.disabled ? "disabled" : ""
    })

    return { linkClass, kindClass, disabledClass }
  },
})
</script>
