<template>
  <div
    :id="id"
    ref="root"
    data-id="sds-tabs"
    class="tabs"
  >
    <div
      class="overflow-x-auto"
      :class="{
        'relative': props.type === 'underline'
      }"
    >
      <ul
        role="tablist"
        class="flex whitespace-nowrap z-10"
      >
        <li
          v-for="tab in tabs"
          :key="tab.key"
          role="presentation"
          :class="{
            'mr-auto': tab.align === 'left',
            'ml-auto': tab.align === 'right',
            'mx-auto': tab.align === 'center'
          }"
        >
          <component
            :is="tab.tag || ('button' as unknown)"
            :id="`sds-tabs-${root?.id}__${tab.key}__tab`"
            class="tab"
            :class="[
              textSizeClass,
              typeClass,
              (props.type === 'underline' ? 'tab-underline-no-rule' : ''),
              variantClass,
              (!!tab.active ? 'active' : ''),
              (!!tab.disabled ? 'disabled': '')
            ]"
            :href="tab.tag === 'a' && tab.href || undefined"
            :target="tab.tag === 'a' && tab.href && tab.external ? '_blank' : undefined"
            :rel="tab.tag === 'a' && tab.href && tab.external ? 'noopener noreferrer' : undefined"
            :type="tab.tag === 'button' ? 'button' : undefined"
            :disabled="tab.disabled"
            :aria-disabled="tab.disabled"
            :tabindex="tab.disabled || !tab.active ? -1 : 0"
            :aria-selected="tab.active ? 'true' : 'false'"
            :aria-controls="`sds-tabs-${root?.id}__${tab.key}__tab-content`"
            :data-active="tab.active ? true : undefined"
            role="tab"
            @click="changeTab(tab)"
            @keydown="onTabKeydown($event, tab)"
          >
            <!-- @slot Custom left-icon slot content. -->
            <slot :name="`tabIconLeft(${tab.key})`" />
            <!-- @slot Dynamic tab. Used for custom HTML within a tab. -->
            <slot :name="`tab(${tab.key})`">
              {{ tab.title }}
            </slot>
            <!-- @slot Custom right-icon slot content. -->
            <slot :name="`tabIconRight(${tab.key})`" />
            <span
              v-if="typeof tab.count !== 'undefined' && tab.count >= 0"
              class="tab-count"
            >
              {{ tab.count }}
            </span>
          </component>
        </li>
      </ul>

      <Transition>
        <div
          v-if="props.type === 'underline'"
          class="tab-indicator"
          :class="[
            tabIndicatorClass,
            (props.size === 'lg' ? 'tab-indicator-lg' : 'tab-indicator-sm')
          ]"
          :style="`left: ${pxToRem(activeTabCalcPosition?.left ?? 0, undefined, 4)}rem; width: ${pxToRem(activeTabCalcPosition?.width ?? 0, undefined, 4)}rem;`"
          role="presentation"
        />
      </Transition>
    </div>
    <template v-for="tab in tabs">
      <div
        v-if="tab.active"
        :id="`sds-tabs-${root?.id}__${tab.key}__tab-content`"
        :key="tab.key"
        :aria-labelledby="`sds-tabs-${root?.id}__${tab.key}__tab`"
        role="tabpanel"
        tabindex="0"
      >
        <!-- @slot Dynamic tab panel content. Used to inject content into the panel for a specified active tab. -->
        <slot
          v-if="tab.active"
          :name="`panel(${tab.key})`"
        >
          <!-- @slot Default tab panel content. Used to inject content into the panel for any active tab. -->
          <slot
            name="panel"
            :item="tab"
          />
        </slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import pxToRem from '../../helpers/pxToRem'
import { useVariantClasses } from '@/composables'

export interface TabItem {
  count?: number
  key: string
  tag?: 'button' | 'a'
  title?: string
  href?: string
  align?: 'left' | 'right' | 'center'
  external?: boolean
  active?: boolean
  disabled?: boolean
}

defineOptions({
  name: 'SdsTabs'
})

const props = defineProps({
  /**
   * Determines the size of the tab(s).
   */
  size: { type: String as PropType<'sm' | 'lg'>, default: 'sm' },
  /**
   * The overall look and feel of the component.
   */
  type: { type: String as PropType<'folder' | 'underline' | 'block'>, default: 'folder' },
  /**
   * Determines the color of the tab(s).
   */
  variant: { type: String as PropType<'red' | 'blue' | 'gray'>, default: 'red' },
  /**
   * Allows for code execution prior to changing tabs.
   *
   * Provides the selected `tab` for general use.
   *
   * Must call an `open()` callback to complete the process.
   *
   * A `cancel()` callback can be called to cancel
   * the process.
   *
   * Example definition in parent component:
   *
   * ```
   * async willChangeTab(tab, open, cancel) {
   *  try {
   *    await SOME_API_CALL_RESPONSE()
   *    console.log(tab)
   *    // let the open process continue
   *    open()
   *  } catch (e) {
   *    // cancel the open process
   *    cancel()
   *  }
   * }
   * ```
   */
  willChangeTab: { type: Function as PropType<GenericFunctionType>, default: null },
})

/**
 * Determines the array of tab objects.
 *
 * Format of tab object:
 *
 * ```
 * {
 *   count?: number
 *   key: string
 *   tag?: 'button' | 'a'
 *   title?: string
 *   href?: string
 *   align?: 'left' | 'right' | 'center'
 *   external?: boolean
 *   active?: boolean
 *   disabled?: boolean
 * }
 * ```
 */
const model = defineModel<TabItem[]>({ type: Array as PropType<TabItem[]>, default: [] })

const emit = defineEmits(['update:modelValue', 'change'])

/**
 * Defines the set of keyboard keys used for navigating between tabs.
 * These keys are limited to 'ArrowLeft', 'ArrowRight', 'Home', and 'End'
 * to ensure accessibility and consistency with common tab navigation patterns.
 * Documenting these keys clarifies which keyboard interactions are supported
 * for users and developers, and helps maintain predictable tab behavior.
 */
const TAB_KEYBOARD_NAV_KEYS = ['ArrowLeft', 'ArrowRight', 'Home', 'End'] as const

const id = useId()

/**
 * Reference to the root HTML element of the Tabs component.
 * Useful for direct DOM manipulation or accessing component-level attributes.
 */
const root = ref<HTMLElement>()

const tabs = computed({
  get(): TabItem[] {
    return model.value
  },
  set(value: TabItem[]) {
    /**
     * Emmitted when the v-model has changed.
     */
    emit('update:modelValue', value)
  }
})

const activeTab = computed(() => {
  return tabs.value.find(({ active }) => active) ?? tabs.value[0]
})

const activeTabElement = computed(() => {
  if (!root.value) return undefined
  if (!document || !document?.querySelector) return undefined
  return (
    document.querySelector(`#sds-tabs-${root.value.id}__${activeTab.value.key}__tab`) as HTMLAnchorElement | HTMLButtonElement
  )
})

const activeTabCalcPosition = computed(() => {
  if (!activeTabElement.value) return
  const left = activeTabElement.value.offsetLeft
  const width = activeTabElement.value.getBoundingClientRect().width
  return { left, width }
})

const tabIndicatorClass = useVariantClasses(() => props.variant, {
  blue: 'tab-indicator-blue',
  gray: 'tab-indicator-gray',
  red: 'tab-indicator-red'
}, 'tab-indicator-red')

const textSizeClass = useVariantClasses(() => props.size, {
  lg: 'tab-lg',
  sm: 'tab-sm'
}, 'tab-sm')

const typeClass = useVariantClasses(() => props.type, {
  block: 'tab-block',
  underline: 'tab-underline',
  folder: 'tab-folder'
}, 'tab-folder')

const variantClass = useVariantClasses(() => props.variant, {
  blue: 'tab-blue',
  gray: 'tab-gray',
  red: 'tab-red'
}, 'tab-red')

const willChangeTabStateDelay = async (tab: TabItem, fn: GenericFunctionType) => {
  if (typeof fn !== 'function') return
  return new Promise<void>((resolve, reject) => {
    try {
      fn(tab, resolve, reject)
    } catch (error) {
      reject(error)
    }
  })
}

const changeTab = async (tab: TabItem) => {
  if (tab.tag === 'a' && tab.href) {
    return true
  } else {
    await willChangeTabStateDelay(tab, props.willChangeTab)
    tabs.value = tabs.value.map((i) => {
      i.active = tab.key === i.key
      return i
    })
    /**
     * Emmitted when a tab has been successfully made active.
     *
     * Provides the active `tab` object.
     */
    emit('change', tab)
  }
}

/**
 * Handles keyboard navigation for tab items.
 *
 * Supports navigation using ArrowLeft, ArrowRight, Home, and End keys.
 * - ArrowLeft: Moves focus to the previous enabled tab (wraps to last if at first).
 * - ArrowRight: Moves focus to the next enabled tab (wraps to first if at last).
 * - Home: Moves focus to the first enabled tab.
 * - End: Moves focus to the last enabled tab.
 *
 * Disabled tabs are skipped during navigation.
 * After changing the tab, focuses the corresponding tab element in the DOM.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered by user interaction.
 * @param {TabItem} tab - The currently focused tab item.
 * @returns {Promise<void>}
 *
 * @remarks
 * - Assumes `tabs` is a reactive array of tab items.
 * - Assumes `changeTab` updates the active tab.
 * - Assumes tab elements have IDs in the format: `sds-tabs-{root.id}__{tab.key}__tab`.
 * - Uses Vue's `nextTick` to ensure DOM updates before focusing.
 */
const onTabKeydown = async (event: KeyboardEvent, tab: TabItem): Promise<void> => {
  const key = event.key as typeof TAB_KEYBOARD_NAV_KEYS[number]
  if (!TAB_KEYBOARD_NAV_KEYS.includes(key)) return

  event.preventDefault()

  const enabledTabs = tabs.value.filter((t) => !t.disabled)
  const currentIndex = enabledTabs.findIndex((t) => t.key === tab.key)
  if (currentIndex === -1) return

  let nextIndex: number = currentIndex
  switch (key) {
    case 'ArrowLeft':
      nextIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length
      break
    case 'ArrowRight':
      nextIndex = (currentIndex + 1) % enabledTabs.length
      break
    case 'Home':
      nextIndex = 0
      break
    case 'End':
      nextIndex = enabledTabs.length - 1
      break
  }

  const nextTab = enabledTabs[nextIndex]
  changeTab(nextTab)

  // Focus the next tab element
  await nextTick(() => {
    const nextTabElement = document.querySelector(`#sds-tabs-${root.value?.id}__${nextTab.key}__tab`) as HTMLButtonElement | HTMLAnchorElement | null
    if (nextTabElement) nextTabElement.focus()
  })
}
</script>
