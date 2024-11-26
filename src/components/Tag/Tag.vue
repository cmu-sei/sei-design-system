<template>
  <div 
    v-uid
    data-id="sds-tag"
    :class="[sizeClass]"
  >
    <div class="flex flex-row">
      <span>
        <!-- @slot default/Label context. -->
        <slot name="default">
          {{ label }}
        </slot>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Uid } from '@shimyshack/uid'

defineOptions({
  name: 'SdsTag',
  directives: {
    uid: Uid
  }
})

const props = defineProps({
  /**
   * Determines the type of content of the left slot.
   */
  content: { type: String as PropType<'avatar' | 'chip' | 'icon' | 'indicator'>, default: null },
  /**
   * Disables the component to prevent user interaction.
   */
  disabled: { type: Boolean, default: false },
  /**
   * Provides the "href" link for the tag or label.
   */
  href: { type: String, default: null },
  /**
   * Determines the purpose and particular function of the button or right slot.
   */
  kind: { type: String as PropType<'blue' | 'red' | 'gray'>, default: null },
  /**
   * Determines the text of the label.
   */
  label: { type: String as PropType<string | null>, default: null },
  /**
   * Determines the shape of the chip.
   */
  shape: { type: String as PropType<'circle' | 'square'>, default: 'square' },
  /**
   * Determines the size of the tag.
   */
  size: { type: String as PropType<'sm' | 'md'>, default: 'sm' },
  /**
   * Determines the color of the chip.
   */
  variant: { type: String as PropType<'gray' | 'tan' | 'yellow' | 'orange' | 'red' | 'purple' | 'indigo' | 'blue' | 'teal' | 'green'>, default: 'gray' }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm'
    case 'md':
      return 'text-base'
    default:
      return ''
  }
})
</script>