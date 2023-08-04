<template>
  <nav
    data-id="sds-megamenu"
    class="flex whitespace-nowrap"
  >
    <floating-ui
      v-for="topLink in topLinks"
      :key="topLink.key"
      :offset="0"
      :overflow-padding="0"
      placement="bottom"
      popper-class="absolute w-full z-40 shadow-lg border-t-2 border-gray-200 bg-white dark:bg-gray-850"
      hide-arrow
      shift
    >
      <template #trigger="{ isOpen, toggle }">
        <component
          :is="topLink.tag ? topLink.tag : 'button'"
          :href="topLink.href ? topLink.href : undefined"
          :type="!topLink.tag || topLink.tag === 'button' ? 'button' : undefined"
          class="py-2 space-x border-b-2 group z-30 -mb-0.5 overflow-y-visible"
          aria-haspopup="true"
          :aria-expanded="isOpen"
          :class="[
            isOpen || topLink.selected
              ? 'text-red-500 border-red-500 dark:text-red-200 dark:border-red-200'
              : 'border-transparent hover:text-red-500 hover:border-red-500 hover:dark:text-red-200 hover:dark:border-red-200'
          ]"
          @click="changeMenuPanel(topLink, toggle, $event)"
        >
          {{ topLink.title }}
          <svg
            :class="[
              isOpen || topLink.selected
                ? ''
                : 'rotate-180',
              'relative inline-block -mr-1 mb-0.5 self-center w-5 h-5 transition-all'
            ]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 500"
            fill="currentColor"
          >
            <path
              d="M256 217.9L383 345c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.3-24.6 0-34L273 167c-9.1-9.1-23.7-9.3-33.1-.7L95 310.9c-4.7 4.7-7 10.9-7 17s2.3 12.3 7 17c9.4 9.4 24.6 9.4 33.9 0l127.1-127z"
            />
          </svg>
        </component>
      </template>
      <template #default>
        <div class="w-full text-black dark:text-white bg-white dark:bg-gray-950">
          <div class="container mx-auto">
            <slot
              v-if="topLink.selected"
              :name="`panel(${topLink.key})`"
            />
          </div>
        </div>
      </template>
    </floating-ui>
  </nav>
</template>

<script lang="ts">
/* Top Link navigation label type interface */
interface ITopLink {
  key: string
  tag?: 'button' | 'a'
  title?: string
  href?: string
  align?: 'left' | 'right' | 'center'
  external?: boolean
  active?: boolean
  selected?: boolean
  disabled?: boolean
}

export default {
  name: 'SdsMegaMenu',
}
</script>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import FloatingUi from "../FloatingUi/FloatingUi.vue";

const props = defineProps({
  /**
   * Determines the array of "topLink" objects.
   *
   * Format of "topLink" object:
   *
   * ```
   * {
   *   key: string
   *   tag?: 'button' | 'a'
   *   title?: string
   *   href?: string
   *   align?: 'left' | 'right' | 'center'
   *   external?: boolean
   *   active?: boolean
   *   selected?: boolean
   *   disabled?: boolean
   * }
   * ```
   */
  modelValue: { type: Array as PropType<ITopLink[]>, default: () => [] },
})

const emit = defineEmits(['update:model-value', 'change'])

const topLinks = computed({
  /* Get SdsMegaMenu modelValue property */
  get(): ITopLink[] {
    return props.modelValue
  },
  /* Set SdsMegaMenu modelValue property */
  set(value: ITopLink[]) {
    /**
     * Emmitted when the v-model has changed.
     */
    emit('update:model-value', value)
  }
})

const changeMenuPanel = async (topLink: ITopLink, toggle: Function, event: Event) => {
  if (topLink.tag === 'a' && topLink.href) {
    /* Treat anchor tags as normal links */
    return true
  } else {
    /* Prevent default and change the active top-level navigation link */
    event.preventDefault()
    topLinks.value = topLinks.value.map((i) => {
      i.selected = topLink.key === i.key
      return i
    })
    /* Toggle visibility */
    toggle()
  }
}
</script>
