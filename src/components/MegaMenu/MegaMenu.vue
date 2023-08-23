<template>
  <nav
    ref="megaMenuNav"
    data-id="sds-megamenu"
    class="w-full flex flex-col"
  >
    <div class="w-full border-b-2 text-black dark:text-white bg-white dark:bg-gray-900 dark:border-gray-800">
      <div
        class="flex flex-row px-8 mx-auto container"
        :class="{
          'gap-x-8': kind === 'underline',
        }"
      >
        <component
          :is="topLink.tag ? topLink.tag : 'button'"
          v-for="topLink in topLinks"
          :ref="(thisTopLink: HTMLElement) => setFocusableElem(topLink.key, thisTopLink, 'topLink')"
          :key="topLink.key"
          :href="topLink.href ? topLink.href : undefined"
          :kind="!topLink.tag || topLink.tag === 'button' ? 'button' : undefined"
          aria-haspopup="true"
          :aria-expanded="isOpen"
          :data-id="`sds-megamenu_${topLink.key}`"
          :class="{
            'ml-auto': topLink.alignment === 'right',
            'mr-auto': topLink.alignment === 'left',
            'mx-auto': topLink.alignment === 'center',
            'px-4 dark:border-gray-800': kind === 'block',
            'hover:text-black hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-850': kind === 'block' && !topLink.selected,
            'hover:text-white hover:bg-red-500 dark:hover:text-white dark:hover:bg-red-700': kind === 'block' && topLink.active && topLinks.filter(i => i.key !== topLink.key && i.selected).length < 1,
            'text-white bg-red-500 dark:bg-red-700': kind === 'block' && (topLink.selected || (topLink.active && topLinks.filter(i => i.key !== topLink.key && i.selected).length < 1)),
            'hover:text-red-500 hover:border-red-500 dark:hover:text-red-300 dark:hover:border-red-300': kind === 'underline',
            'text-red-500 dark:text-red-300 border-red-500 dark:border-red-300': kind === 'underline' && topLink.selected,
            'border-red-500 dark:border-red-300': kind === 'underline' && topLink.active,
            'border-transparent dark:border-transparent': kind === 'underline' && (!topLink.selected && !topLink.active) || (topLink.active && topLinks.filter(i => i.key !== topLink.key && i.selected).length > 0)
          }"
          class="flex items-center gap-1 my-auto py-2 space-x border-b-2 group z-30 -mb-0.5 overflow-y-visible select-none"
          @click="changeMenuPanel(topLink, $event); topLink.onClick && topLink?.onClick(topLink, $event)"
          @keydown.down="topLink.selected ? setPanelFocus(topLink.key, $event) : changeMenuPanel(topLink, $event).then(() => { setPanelFocus(topLink.key, $event) }); topLink.onFocus && topLink?.onFocus(topLink, $event)"
        >
          <!-- @slot Dynamic link. Used to supply custom HTML within a top-level menu link. -->
          <slot
            :name="`link(${topLink.key})`"
            :item="topLink"
          >
            <span>{{ topLink.title }}</span>
            <!-- Below SVG is a caret to indicate Mega Menu opened/closed status -->
            <!-- If tag type is "a" (anchor tag), then the caret isn't rendered. -->
            <svg
              v-if="topLink.tag !== 'a'"
              :class="{
                'rotate-180': topLink.selected
              }"
              class="relative inline-block w-5 h-5 transition-transform"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 550 500"
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
      <template
        v-for="topLink in topLinks"
        :key="topLink.key"
      >
        <!-- Use anchor tag for links and "button" tag for top-level menu links that trigger panel toggling -->
        <div
          v-if="topLink.tag !== 'a'"
          :ref="thisPanel => setFocusableElem(topLink.key, thisPanel as HTMLElement, 'panel')"
          :class="[
            topLink.selected
              ? 'z-30 shadow-lg border-b dark:border-gray-800'
              : 'z-10',
            'absolute top-0 left-0 w-full text-black dark:text-white bg-white dark:bg-gray-950',
          ]"
          @keydown.up="setTopLinkFocus(topLink, $event); topLink.onFocus && topLink?.onFocus(topLink, $event)"
          @keydown.tab="panelRoundRobinIfLast(topLink.key, $event)"
        >
          <div class="mx-auto container">
            <transition
              enter-active-class="transition-[transform_400ms,colors_50ms] ease"
              :enter-from-class="isOpenDelay ? 'opacity-100' : 'max-h-0 opacity-25'"
              :enter-to-class="isOpenDelay ? 'opacity-100' : 'max-h-screen opacity-100'"
              leave-active-class="transition-[transform_400ms,colors_50ms] ease"
              leave-from-class="opacity-25 max-h-screen"
              leave-to-class="opacity-0 max-h-0"
            >
              <!-- @slot Dynamic "panel" slot. Use this slot to supply custom HTML that will display in a floating panel below the main navigation bar. -->
              <slot
                v-if="topLink.selected"
                :name="`panel(${topLink.key})`"
                :close="onClose"
                :item="topLink"
                :content="topLink.content"
              >
                <slot
                  v-if="topLink.selected"
                  :close="onClose"
                  :item="topLink"
                  :content="topLink.content"
                />
              </slot>
            </transition>
          </div>
        </div>
      </template>
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
  alignment?: 'left' | 'right' | 'center'
  content?: Object
  external?: boolean
  active?: boolean
  selected?: boolean
  disabled?: boolean
  onClick?: Function
  onFocus?: Function
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
   *   alignment?: 'left' | 'right' | 'center'
   *   content?: Object
   *   external?: boolean
   *   active?: boolean
   *   selected?: boolean
   *   disabled?: boolean
   *   onClick?: Function
   *   onFocus?: Function
   * }
   * ```
   */
  modelValue: { type: Array as PropType<ITopLink[]>, default: () => [] },
  /**
   * The overall look and feel of the component.
   */
  kind: { type: String as PropType<'underline' | 'block'>, default: 'underline' },
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

/* Dictionary of focusable panels (keys mapped to HTMLDivElement references) */
const focusablePanels = ref<HTMLElement[]>([])
const focusableTopLinks = ref<HTMLElement[]>([])

/* Needed for "onClickOutside" event */
const megaMenuNav = ref(null)

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
onClickOutside(megaMenuNav, (_event: Event) => {
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

/* Event listener callback to focus a main navigation link from a panel.
 * Used to jump back to the top navigation on "up" arrow keypress. */
const setTopLinkFocus = (topLink: ITopLink, event: Event) => {
  event?.preventDefault()
  focusableTopLinks.value[topLink.key as any].focus()
}

/* Event listener callback to focus a panel element (from a topLink) */
const setPanelFocus = async (key: string, event: Event) => {
  event?.preventDefault()
  focusablePanels.value[key as any].focus();
  /* Focus the first element in the panel */
  (focusablePanels.value[key as any].querySelectorAll('a, button, input, select')[0] as HTMLElement).focus()
}

/* Manage focusable panels as a ref with key: value pairs of
 * topLink.keys and HTML elements (of the panel areas) */
const setFocusableElem = (key: string, elem: HTMLElement, type: string = 'panel') => {
  /* Switch ref object based on type == 'topLink' versus 'panel' */
  let focusable = type === 'panel' ? focusablePanels : type === 'topLink' ? focusableTopLinks : null
  /* If panel or topLink hasn't been added to ref object,
   * do so here. Use the topLink.key as the object key
   * (use the HTMLElement as its mapped value). */
   if (focusable) {
    if (!Object.keys(focusable).includes(key)) {
      focusable.value[key as any] = elem
    }
  }
}

/* Setup ref object to hold:
 * 1. The panel/topLink key
 * 2. The first focusable element in the panel
 * 3. The last focusable element in the panel
 */
const panelFirstLast = ref<{ key: String, first: HTMLElement | null, last: HTMLElement | null }>({ key: '', first: null, last: null })
/* Loop through "focus-able" objects in a Mega Menu panel using tab key */
const panelRoundRobinIfLast = (key: string, e: Event) => {
  /* Only continue execution if we're switching to a new menu panel to save some computation */
  if (key && panelFirstLast.value.key !== key) {
    const selectedPanel = focusablePanels.value[key as any]
    if (selectedPanel) {
      panelFirstLast.value.key = key
      const panelFocusables = selectedPanel.querySelectorAll('a, button, input, select')
      panelFirstLast.value.first = panelFocusables[0] as HTMLElement
      panelFirstLast.value.last = panelFocusables[panelFocusables.length - 1] as HTMLElement
    }
  }
  /* If "Tab" was pressed on the last element in the selected panel, round-robin back to the first */
  if (document.activeElement === panelFirstLast.value.last) {
    e.preventDefault()
    panelFirstLast.value.first?.focus()
  }
}
</script>
