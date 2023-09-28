<template>
  <nav
    ref="root"
    data-id="sds-megamenu"
    class="w-full flex flex-col"
    :class="{
      'relative': width === 'auto'
    }"
    @keydown="checkKeyEvent"
  >
    <div
      class="z-30 w-full border-b-2 text-black dark:text-white bg-white dark:bg-gray-900 dark:border-gray-800"
    >
      <div
        class="flex flex-row px-8 mx-auto container"
        :class="{
          'gap-x-8': kind === 'underline',
        }"
        role="menu"
      >
        <component
          :is="topLink.tag ? topLink.tag : 'button'"
          v-for="topLink in topLinks"
          :id="`sds-megamenu__top-link_${topLink.key}`"
          :key="topLink.key"
          :href="topLink.href ? topLink.href : undefined"
          :kind="!topLink.tag || topLink.tag === 'button' ? 'button' : undefined"
          :aria-haspopup="topLink.tag === 'button' ? true : undefined"
          :aria-expanded="topLink.tag === 'button' ? topLink.selected : undefined"
          :data-id="`sds-megamenu_${topLink.key}`"
          :data-selected="topLink.selected"
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
          role="menuitem"
          class="flex items-center gap-1 my-auto py-2 space-x border-b-2 group -mb-0.5 overflow-y-visible select-none shrink-0"
          @click="changeMenuPanel(topLink, $event); topLink.onClick && topLink?.onClick(topLink, $event)"
        >
          <!-- @slot Dynamic "link" slot. Used to supply custom HTML (such as an SVG icon) within a top-level menu link. I.e.: `<template #link(home)><svg>...</svg></template>` -->
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
                'rotate-0': topLink.selected,
                'rotate-180': !topLink.selected
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
    <transition
      enter-active-class="transition-transform ease-in-out"
      enter-from-class="scale-y-0"
      enter-to-class="scale-y-100"
      leave-active-class="transition-transform ease-in-out"
      leave-from-class="scale-y-100"
      leave-to-class="scale-y-0"
    >
      <div
        v-if="selectedTopLink"
        :class="{
          'absolute top-10': width === 'auto',
        }"
        class="w-full h-0 z-20"
      >
        <div
          role="menu"
          :class="{
            'container px-8 relative mx-auto flex flex-row': width === 'auto',
            'h-fit': width === 'full',
            'justify-end': width === 'auto' && panelOverflow
          }"
          @click.self="onClose(false)"
        >
          <!-- Use anchor tag for links and "button" tag for top-level menu links that trigger panel toggling -->
          <div
            v-if="selectedTopLink?.tag !== 'a'"
            ref="panel"
            :key="selectedTopLink?.key"
            :style="{
              marginLeft: width === 'auto' && !panelOverflow ? `${getLeftPos}px` : 'unset'
            }"
            :class="{
              'shadow-lg border-b border-gray-200 dark:border-gray-800': selectedTopLink?.selected,
              'w-fit border-x rounded-b-lg': width === 'auto',
              'w-full top-0 left-0': width === 'full',
              'ml-0': panelOverflow
            }"
            class="relative text-black dark:text-white bg-white dark:bg-gray-900"
          >
            <div class="mx-auto container">
              <!-- @slot Dynamic "panel" slot. Use this slot to supply custom HTML that will display in a floating panel below the main navigation bar. I.e.: `<template #panel(about)>...</template>` -->
              <slot
                v-if="selectedTopLink?.selected"
                :name="`panel(${selectedTopLink.key})`"
                :close="onClose"
                :item="selectedTopLink"
                :content="selectedTopLink.content"
              >
                <!-- @slot Default "panel" slot. Use this slot to supply custom HTML that will display in a floating panel below the main navigation bar across all menus. I.e.: `<template #default>...</template>` -->
                <slot
                  v-if="selectedTopLink?.selected"
                  :close="onClose"
                  :item="selectedTopLink"
                  :content="selectedTopLink.content"
                />
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
  <!-- Overlay used to dim background when "width" property set to full. -->
  <transition
    enter-active-class="transition-opacity ease-in-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity ease-in-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="width === 'full' && isOpen"
      class="z-10 mt-auto fixed inset-x-0 bottom-0 bg-black/50"
      :style="{
        top: `${bottom}px`
      }"
    />
  </transition>
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
}

export default {
  name: 'SdsMegaMenu',
}
</script>

<script setup lang="ts">
import { PropType, computed, ref, watchEffect } from 'vue'
import { onClickOutside, onKeyStroke, useElementBounding } from '@vueuse/core'

const props = defineProps({
  /**
   * An array of top-level navigation items ("top links").
   * Each navigation item is defined by a "topLink" object.
   * A navigation label is applied with the "title" key.
   * It also supplies the "content" object to retrieve data
   * from within a Mega Menu panel. I.e.:
   * `<template #panel(key)={ content }>{{ content.item }}</template>`
   *
   * Instead of an accordion-like function, the top link can
   * also be setup as an anchor tag with the "tag" setting.
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
   * }
   *
   * ```
   */
  modelValue: { type: Array as PropType<ITopLink[]>, default: () => [] },
  /**
   * Overall look and feel of the component (two options)
   */
  kind: { type: String as PropType<'block' | 'underline'>, default: 'underline' },
  /**
   * Sets the panel width. Full width stretches to fill the width of the screen.
   * Auto width will fit the width of the content inside the panel.
   */
  width: { type: String as PropType<'auto' | 'full'>, default: 'full' },
})

const emits = defineEmits(
  [
    /**
     * When data supplied to the Mega Menu component
     * changes, emit an event. This lets developers
     * trigger other actions off the Mega Menu's modelValue
     * when it changes.
     */
    'update:model-value'
  ]
)
const topLinks = computed({
  /* Get SdsMegaMenu modelValue property */
  get(): ITopLink[] {
    return props.modelValue
  },
  /* Set SdsMegaMenu modelValue property */
  set(value: ITopLink[]) {
    /**
     * Emmitted when the v-model (Mega Menu's data source)
     * has changed.
     */
    emits('update:model-value', value)
  }
})

/* Used to track mega menu open/closed */
const isOpen = ref(false)

const root = ref()
const panel = ref()

const { bottom } = useElementBounding(root)

const selectedTopLink = computed(() => {
  const selected = props.modelValue.find(i => i.selected)
  return selected || null
})
const focusableList = ref<HTMLElement[]>([])

const topLinkEl = computed(() => {
  if (typeof document === "undefined") return null
  return selectedTopLink.value ? document.querySelector(`#sds-megamenu__top-link_${selectedTopLink.value.key}`) as HTMLElement : null
})

const onClose = (focusTopLink = true) => {
  if (focusTopLink) topLinkEl.value?.focus()
  /* Deselect all mega menu panels */
  topLinks.value = topLinks.value.map(i => {
    i.selected = false
    return i
  })
  setOpenValues('close')
}

/* Close the mega menu when clicking somewhere on the document
 * outside the mega menu component */
onClickOutside(root, () => {
  onClose(false)
})

/* Close the mega menu when pressing Escape */
onKeyStroke('Escape', (e) => {
  if (!isOpen.value) return
  e.preventDefault()
  onClose()
})

watchEffect(() => {
  focusableList.value = []

  if (panel.value) {
    const focusable: Array<HTMLElement> = Array.prototype.slice.call(panel.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ));
    focusableList.value = focusable
  }
})

const checkKeyEvent = (event: KeyboardEvent) => {
  if (!panel.value) return;

  // escape early if only 1 or no elements to focus
  if (focusableList.value.length < 2 && event.key === "Tab") {
    event.preventDefault();
    return;
  }

  const last = focusableList.value.length - 1;

  if (
    event.key === "Tab" &&
    event.shiftKey === false &&
    event.target === focusableList.value[last]
  ) {
    event.preventDefault();
    topLinkEl.value?.focus()
  } else if (
    event.key === "Tab" &&
    event.shiftKey === true &&
    event.target === focusableList.value[0]
  ) {
    event.preventDefault();
    topLinkEl.value?.focus()
  } else if (
    event.key === "Tab" &&
    event.shiftKey === false &&
    event.target === topLinkEl.value
  ) {
    event.preventDefault();
    focusableList.value[0].focus()
  } else if (
    event.key === "Tab" &&
    event.shiftKey === true &&
    event.target === topLinkEl.value
  ) {
    event.preventDefault();
    focusableList.value[last].focus()
  }
}

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

const setOpenValues = (toggle: 'close' | null = null) => {
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
}

/* Get the left margin for mega menu panels when the width option is set to 'auto' */
const getLeftPos = computed(() => {
  /* If not client-side, return */
  if (typeof document === "undefined") return null

  let left: number = 0
  if (selectedTopLink.value) {
    /* Measure panel left distance off of topLink nav button */
    const selected: HTMLElement = document.querySelector(`#sds-megamenu__top-link_${selectedTopLink.value.key}`) as HTMLElement
    /* Using .getBoundingClientRect method gets absolute left,
     * keeps correct panel positioning even when side panels might open to the left */
    left = selected.getBoundingClientRect().left - 64
    /* Use the parent element to define left-most boundary */
    const parent: HTMLElement = selected?.parentElement!
    const parentLeftPos = parent.getBoundingClientRect().left
    left = left - parentLeftPos
    /* Set the first nav item to "0" left position */
    if (left < 0) {
      left = 0
    }
  }

  return left
})

/* Detect when a panel is too large to display across the available screen width */
const panelOverflow = computed(() => {
  // Right edge of the menu is at or past the right edge of the top nav container ?
  return (
    Math.round(panel.value?.getBoundingClientRect().right) >=
    Math.round((panel.value?.parentElement.getBoundingClientRect().right - 32))
  ) ? true : false
})
</script>
