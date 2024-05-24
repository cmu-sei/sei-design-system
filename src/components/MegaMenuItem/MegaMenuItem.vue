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
          <p class="group-hover:text-red-600 dark:group-hover:text-red-300 w-fit inline-block">
            <span class="my-auto">{{ label }}</span>
            <span
              v-if="cta || type === 'landing-page' || external"
              class="inline-block w-fit my-auto h-full"
            >
              <svg
                v-if="(cta || type === 'landing-page') && !external"
                class="inline-block w-4 mb-1 h-4 ml-2 transition-all text-red-600 dark:text-red-300 group-hover:ml-4"
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
                v-if="external"
                class="ml-2 relative inline-block fill-red-600 dark:fill-red-300 transition-all"
                :class="{
                  'mb-0.5 w-4 h-4 group-hover:ml-4': type === 'landing-page',
                  'w-3.5 h-3.5 mb-1 opacity-0 group-hover:opacity-100': type === 'simple' || type === 'descriptive',
                }"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14 5a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V6.414l-9.293 9.293a1 1 0 0 1-1.414-1.414L17.586 5zM3 7a2 2 0 0 1 2-2h5a1 1 0 1 1 0 2H5v12h12v-5a1 1 0 1 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
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
  let classes = props.type || props.cta
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
      return "p-4 transition-all rounded-lg hover:no-underline hover:bg-gray-25 hover:dark:bg-gray-850"
    case "simple":
      return "p-4 text-sm transition-all rounded-lg hover:bg-gray-25 hover:dark:bg-gray-850 hover:text-red-600 dark:hover:text-red-300"
    default:
      return ""
  }
})

const disabledClass = computed(() => {
  return props.disabled ? "disabled" : ""
})
</script>
