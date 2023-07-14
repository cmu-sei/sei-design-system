<template>
  <a
    data-id="sds-megamenulink"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="[linkClass, variantClass, disabledClass]"
    :tabindex="disabled ? -1 : undefined"
  >
    <p class="mb-2 inline-block">
      {{ label }}
      <svg
        v-if="cta || variant === 'landing-page'"
        class="inline-block w-4 h-4 text-red-500 ml-1 mb-1"
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
    </p>
    <p class="text-sm">
      <slot />
    </p>
  </a>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

export default defineComponent({
  name: 'SdsMegaMenuLink',
  props: {
    label: { type: String, default: '' },
    /**
     * Determines the component variant to use.
     *
     */
    variant: { type: String as PropType<'landing-page' | 'descriptive' | 'simple'>, default: '' },
    /**
     * Applies the appropriate attributes for external links and opens them in a new tab. It also creates a REL attribute that prevents browser sniffing.
     */
    external: { type: Boolean, default: false },
    /**
     * Gives the link a "Call to Action" styling.
     */
    cta: { type: [Boolean, String] as PropType<'up' | 'right' | 'down' | 'left' | boolean> , default: false },
    /**
     * Disables the component to prevent user interaction.
     */
    disabled: { type: Boolean, default: false }
  },
  setup (props) {
    const linkClass = computed(() => {
      // @deprecated remove variant prop
      return props.variant !== '' || props.cta ? 'link w-full mb-4' : ''
    })

    const variantClass = computed(() => {
      // @deprecated remove extraneous variant types
      const variant = (props.variant as 'landing-page' | 'descriptive' | 'simple')
      switch (variant) {
        case 'landing-page':
          return 'mb-8'
        case 'descriptive':
          return 'mb-8'
        case 'simple':
          return 'text-sm'
        default:
          return ''
      }
    })

    const ctaClass = computed(() => {
      switch (props.cta) {
        case 'right':
          return 'link-cta link-cta-right'
        case 'left':
          return 'link-cta link-cta-left'
        case 'up':
          return 'link-cta link-cta-up'
        case 'down':
          return 'link-cta link-cta-down'
        case true:
          return 'link-cta'
        default:
          return ''
      }
    })

    const disabledClass = computed(() => {
      return props.disabled ? 'disabled' : ''
    })

    return { linkClass, variantClass, disabledClass }
  }
})
</script>
