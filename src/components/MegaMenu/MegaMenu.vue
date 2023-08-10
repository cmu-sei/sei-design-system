<template>
  <nav
    ref="target"
    data-id="sds-megamenu"
    class="w-full flex flex-col"
  >
    <div class="w-full border-b-2 text-black dark:text-white bg-white dark:bg-gray-900 dark:border-gray-800">
      <div class="flex flex-row gap-x-8 px-8 h-12 container mx-auto">
        <component
          :is="topLink.tag ? topLink.tag : 'button'"
          v-for="topLink in topLinks"
          :key="topLink.key"
          :href="topLink.href ? topLink.href : undefined"
          :type="!topLink.tag || topLink.tag === 'button' ? 'button' : undefined"
          aria-haspopup="true"
          :aria-expanded="isOpen"
          :data-id="`sds-megamenu_${topLink.key}`"
          :class="{
            'text-red-500 dark:text-red-300 border-red-500 dark:border-red-300': topLink.selected,
            'border-red-500 dark:border-red-300': topLink.active,
            'border-transparent dark:border-transparent': (!topLink.selected && !topLink.active) || (topLink.active && topLinks.filter(i => i.key !== topLink.key && i.selected).length > 0)
          }"
          class="flex items-center gap-1 my-auto py-2 space-x border-b-2 group z-30 -mb-0.5 overflow-y-visible select-none hover:text-red-500 hover:border-red-500 dark:hover:text-red-300 dark:hover:border-red-300"
          @click="changeMenuPanel(topLink, $event)"
        >
          <slot
            :name="`top-link(${topLink.key})`"
            :active="topLink.active"
            :selected="topLink.selected"
            :disabled="topLink.disabled"
          >
            <span>{{ topLink.title }}</span>
            <svg
              v-if="topLink.tag !== 'a'"
              :class="{
                'rotate-180': topLink.selected
              }"
              class="relative inline-block w-5 h-5 transition-transform"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 500"
              fill="currentColor"
            >
              <path
                d="M256 217.9L383 345c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.3-24.6 0-34L273 167c-9.1-9.1-23.7-9.3-33.1-.7L95 310.9c-4.7 4.7-7 10.9-7 17s2.3 12.3 7 17c9.4 9.4 24.6 9.4 33.9 0l127.1-127z"
              />
            </svg>
          </slot>
        </component>
      </div>
    </div>
    <div class="w-full relative">
      <div
        v-for="topLink in topLinks"
        :key="topLink.key"
        :class="[
          topLink.selected
            ? 'z-30 shadow-lg border-b dark:border-gray-800'
            : 'z-10',
          'absolute top-0 left-0 w-full text-black dark:text-white bg-white dark:bg-gray-950'
        ]"
      >
        <transition
          enter-active-class="transition-[transform_400ms,colors_50ms] ease"
          enter-from-class="max-h-0 opacity-25"
          enter-to-class="max-h-screen opacity-100"
          leave-active-class="transition-[transform_400ms,colors_50ms] ease"
          leave-from-class="opacity-25 max-h-screen"
          leave-to-class="opacity-0 max-h-0"
        >
          <slot
            v-if="topLink.selected"
            :name="`panel(${topLink.key})`"
          />
        </transition>
      </div>
    </div>
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
import { PropType, computed, ref } from 'vue'
import { onClickOutside, onKeyStroke } from '@vueuse/core'

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

/* Used to emit model update */
const emit = defineEmits(['update:model-value'])
const topLinks = computed({
  /* Get SdsMegaMenu modelValue property */
  get(): ITopLink[] {
    return props.modelValue
  },
  /* Set SdsMegaMenu modelValue property */
  set(value: ITopLink[]) {
    /* Emmitted when the v-model has changed. */
    emit('update:model-value', value)
  }
})

/* Used to track mega menu open/closed */
const isOpen = ref(false)
const isOpenDelay = ref(false)

/* Needed for "onClickOutside" event */
const target = ref(null)

const onClose = () => {
  /* Deselect all mega menu panels */
  topLinks.value = topLinks.value.map(i => {
    i.selected = false
    return i
  })
  setOpenValues('close')
}

/* Close the mega menu when clicking somewhere on the document
 * outside the mega menu component */
onClickOutside(target, (_event: Event) => {
  onClose()
})

/* Close the mega menu when pressing Escape */
onKeyStroke('Escape', (e) => {
  if (!isOpen.value) return
  e.preventDefault()
  onClose()
})

/* Callback run when a topLink of the mega menu is clicked */
const changeMenuPanel = async (topLink: ITopLink, event: Event) => {
  if (topLink.tag === 'a' && topLink.href) {
    /* Treat anchor tags as normal links */
    return true
  } else {
    /* Prevent default and change the active top-level navigation link */
    event.preventDefault()
    /* Set the selected menu item, or deselect if already selected */
    topLinks.value = topLinks.value.map((i) => {
      i.selected = i.selected ? false : topLink.key === i.key
      return i
    })

    setOpenValues()
  }
}

const setOpenValues = (toggle: string = '') => {
  if (toggle === 'close') {
    isOpen.value = false
  } else {
    let selected: number = 0
    topLinks.value.forEach((link) => {
      if (link.selected) {
        selected++
      }
    })

    if (selected) {
      isOpen.value = true
    } else {
      isOpen.value = false
    }
  }

  /* Get the "isOpen" value, but get it a moment later */
  setTimeout(() => {
    isOpenDelay.value = isOpen.value
  }, 300)
}
</script>
