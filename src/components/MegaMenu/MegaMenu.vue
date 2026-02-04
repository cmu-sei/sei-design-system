<template>
  <nav
    ref="root"
    data-id="sds-megamenu"
    class="relative w-full flex flex-col bg-white dark:bg-gray-900 border-b-2 border-gray-100 dark:border-gray-800"
    :aria-label="ariaLabel"
    :class="{
      'z-20': isOpen
    }"
    @keydown="checkKeyEvent"
    @click.self="onClose(false)"
  >
    <div
      class="w-full text-gray-900 dark:text-gray-100 container mx-auto px-4 max-w-full lg:px-8 lg:max-w-5xl xl:max-w-7xl 2xl:px-12 2xl:max-w-screen-2xl"
      @click.self="onClose(false)"
    >
      <div
        ref="menu"
        class="flex flex-row"
        :class="{
          'gap-4 xl:gap-8': type === 'underline',
        }"
        role="menu"
        @click.self="onClose(false)"
      >
        <component
          :is="topLink.tag ? topLink.tag : 'button'"
          v-for="topLink in topLinks"
          :id="`sds-megamenu__top-link_${topLink.key}`"
          :key="topLink.key"
          :type="!topLink.tag || topLink.tag === 'button' ? 'button' : undefined"
          :href="topLink.href ? topLink.href : undefined"
          :aria-haspopup="topLink.tag === 'button' ? true : undefined"
          :aria-expanded="topLink.tag === 'button' ? topLink.selected : undefined"
          :data-id="`sds-megamenu_${topLink.key}`"
          :data-selected="topLink.selected"
          :class="{
            'z-30': topLink.selected,
            'hover:z-30': !topLink.selected,
            'ml-auto': topLink.alignment === 'right',
            'mr-auto': topLink.alignment === 'left',
            'mx-auto': topLink.alignment === 'center',
            'px-2 xl:px-3 2xl:px-4 border-gray-100 dark:border-gray-800 font-semibold': type === 'block',
            'text-gray-700 dark:text-gray-100 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-gray-100 dark:hover:bg-gray-850': type === 'block' && !(topLink.selected || (topLink.active && topLinks.filter(i => i.key !== topLink.key && i.selected).length < 1)),
            'text-white bg-red-600 dark:text-gray-900 dark:bg-red-300': type === 'block' && (topLink.selected || (topLink.active && topLinks.filter(i => i.key !== topLink.key && i.selected).length < 1)),
            'hover:text-red-600 hover:border-red-600 dark:hover:text-red-300 dark:hover:border-red-300': type === 'underline',
            'text-red-600 dark:text-red-300 border-red-600 dark:border-red-300': type === 'underline' && topLink.selected,
            'border-red-600 dark:border-red-300': type === 'underline' && topLink.active,
            'border-transparent dark:border-transparent': type === 'underline' && ((!topLink.selected && !topLink.active) || (topLink.active && topLinks.filter(i => i.key !== topLink.key && i.selected).length > 0))
          }"
          role="menuitem"
          class="flex items-center gap-0.5 xl:gap-1 my-auto py-2 space-x border-b-2 group -mb-0.5 overflow-y-visible select-none shrink-0 text-sm xl:text-base focus-visible:outline-2 cursor-pointer"
          @click="changeMenuPanel(topLink, $event); topLink.onClick && topLink?.onClick(topLink, $event)"
        >
          <!-- @slot Dynamic "link" slot. Used to supply custom HTML (such as an SVG icon) within a top-level menu link. I.e.: `<template #link(home)><svg>...</svg></template>` -->
          <slot
            :name="`link(${topLink.key})`"
            :item="topLink"
          >
            <span
              class="pointer-events-none"
            >{{ topLink.title }}</span>
            <!-- Below SVG is a caret to indicate Mega Menu opened/closed status -->
            <!-- If tag type is "a" (anchor tag), then the caret isn't rendered. -->
            <svg
              v-if="topLink.tag !== 'a'"
              :class="{
                'rotate-0': topLink.selected,
                'rotate-180': !topLink.selected
              }"
              class="mt-0.5 relative inline-block w-4 h-4 transition-transform ease-in-out duration-300 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 550 500"
              fill="currentColor"
            >
              <path
                d="M256 217.9L383 345c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.3-24.6 0-34L273 167c-9.1-9.1-23.7-9.3-33.1-.7L95 310.9c-4.7 4.7-7 10.9-7 17s2.3 12.3 7 17c9.4 9.4 24.6 9.4 33.9 0l127.1-127z"
              />
            </svg>
            <!-- Show a box with an arrow exiting to the upper right to indicate an external link -->
            <svg
              v-if="topLink.tag === 'a' && topLink.external"
              class="ml-0 relative inline-block w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill="currentColor"
                d="M14 5a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V6.414l-9.293 9.293a1 1 0 0 1-1.414-1.414L17.586 5zM3 7a2 2 0 0 1 2-2h5a1 1 0 1 1 0 2H5v12h12v-5a1 1 0 1 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
              />
            </svg>
          </slot>
        </component>
      </div>
    </div>
    <transition
      enter-active-class="transition-transform ease-in-out origin-top duration-150"
      enter-from-class="scale-y-0"
      enter-to-class="scale-y-100"
      leave-active-class="transition-transform ease-in-out origin-top duration-200"
      leave-from-class="scale-y-100"
      leave-to-class="scale-y-0"
    >
      <div
        v-if="selectedTopLink"
        role="menu"
        class="z-20"
        @click.self="onClose(false)"
      >
        <!-- Use anchor tag for links and "button" tag for top-level menu links that trigger panel toggling -->
        <div
          v-if="selectedTopLink?.tag !== 'a'"
          ref="panel"
          :key="selectedTopLink?.key"
          :style="{
            left: getLeftPos,
            right: getRightPos
          }"
          :class="{
            'shadow-lg border-t-2 border-b border-gray-100 dark:border-gray-800 rounded-b-theme-lg': selectedTopLink?.selected,
            'border-x': width === 'auto',
            'w-full': width === 'full'
          }"
          class="absolute text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900"
        >
          <div
            :class="{
              'container mx-auto max-w-full lg:max-w-5xl xl:max-w-7xl 2xl:max-w-screen-2xl py-4 px-8 2xl:px-12': width === 'full',
              'p-4 xl:px-8': width === 'auto'
            }"
          >
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
    </transition>
    <!-- Overlay used to dim background when "width" property set to full. -->
    <transition
      enter-active-class="transition-opacity ease-in-out duration-150"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-in-out duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="width === 'full' && isOpen"
        class="z-10 mt-auto fixed inset-x-0 bottom-0 bg-black/50"
        :style="{
          top: `${rootBottom}px`
        }"
        @click="onClose(false)"
      />
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { onClickOutside, onKeyStroke, useElementBounding, useResizeObserver, breakpointsTailwind, useBreakpoints } from '@vueuse/core'

/* Top Link navigation label type interface */
export type MegaMenuItem<T = Record<string, unknown>> = {
  key: string
  tag?: 'button' | 'a'
  title?: string
  href?: string
  alignment?: 'left' | 'right' | 'center'
  content?: T
  external?: boolean
  active?: boolean
  selected?: boolean
  disabled?: boolean
  onClick?: GenericFunctionType
  [key: string]: unknown
}

defineOptions({
  name: 'SdsMegaMenu',
})

const props = defineProps({
  /**
   * Overall look and feel of the component (two options)
   */
  type: { type: String as PropType<'block' | 'underline'>, default: 'underline' },
  /**
   * Sets the panel width. Full width stretches to fill the width of the screen.
   * Auto width will fit the width of the content inside the panel.
   */
  width: { type: String as PropType<'auto' | 'full'>, default: 'full' },
  /**
   * Sets the aria-label for the component
   */
  ariaLabel: { type: String, default: undefined }
})

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
const model = defineModel<MegaMenuItem[]>({ type: Array as PropType<MegaMenuItem[]>, default: [] })

const emits = defineEmits(
  [
    /**
     * When data supplied to the Mega Menu component
     * changes, emit an event. This lets developers
     * trigger other actions off the Mega Menu's modelValue
     * when it changes.
     */
    'update:modelValue'
  ]
)

const topLinks = computed({
  /* Get SdsMegaMenu modelValue property */
  get(): MegaMenuItem[] {
    return model.value
  },
  /* Set SdsMegaMenu modelValue property */
  set(value: MegaMenuItem[]) {
    /**
     * Emmitted when the v-model (Mega Menu's data source)
     * has changed.
     */
    emits('update:modelValue', value)
  }
})

/* Used to track mega menu open/closed */
const isOpen = ref(false)

const root = ref()
const menu = ref()
const panel = ref()

const selectedTopLink = computed(() => {
  const selected = model.value.find(i => i.selected)
  return selected || null
})
const focusableList = ref<HTMLElement[]>([])

const topLinkEl = computed(() => {
  if (typeof document === "undefined") return null
  return selectedTopLink.value ? document.querySelector(`#sds-megamenu__top-link_${selectedTopLink.value.key}`) as HTMLElement : null
})

const { bottom: rootBottom } = useElementBounding(root)
const { right: menuRight } = useElementBounding(menu)
const { right: panelRight } = useElementBounding(panel)

const onClose = (focusTopLink = true) => {
  if (focusTopLink) topLinkEl.value?.focus()
  /* Deselect all mega menu panels */
  topLinks.value = topLinks.value.map(i => {
    i.selected = false
    return i
  })
  setOpenValues('close')
}

/**
 * Close the mega menu when clicking somewhere on the document
 * outside the mega menu component
 **/
onClickOutside(root, () => {
  onClose(false)
})

/**
 * Close the mega menu when resizing on the document
 **/
useResizeObserver(root, () => {
  onClose(false)
})

/**
 * Close the mega menu when pressing Escape
 **/
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

/**
 * Callback run when a topLink of the mega menu is clicked
 **/
const changeMenuPanel = async (topLink: MegaMenuItem, event: Event) => {
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

/**
 * Detect when a panel is too large to display across the available screen width
 **/
const panelOverflow = computed(() => {
  if (panel.value && menu.value) {
    // Right edge of the menu is at or past the right edge of the top nav container?
    return (
      panelRight.value >= menuRight.value
    ) ? true : false
  }
  return false
})

/**
 * Position the panel on the screen
 */
const breakpoints = useBreakpoints(breakpointsTailwind)
const getLeftPos = ref()
const getRightPos = ref()
const offset = computed(() => {
  if (breakpoints.smaller('xl').value) {
    return 16
  }
  return 32
})

watch(topLinkEl, (value) => {
  if (props.width === 'full') {
    getLeftPos.value = undefined
    getRightPos.value = undefined
  } else if (props.width === 'auto') {
    const left = value?.offsetLeft || 0
    const useOffset = (value?.offsetLeft || 0) - menu.value?.offsetLeft - offset.value > 0
    getLeftPos.value = `${useOffset ? left - offset.value : left}px`
    getRightPos.value = undefined
  }
}, { deep: true })

watch(panelOverflow, (value) => {
  if (props.width === 'full') return
  if (value) {
    getLeftPos.value = undefined
    getRightPos.value = `${menu.value?.offsetLeft || 0}px`
  }
})
</script>
