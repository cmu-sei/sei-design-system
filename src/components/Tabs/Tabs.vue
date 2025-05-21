<template>
  <div
    :id="id"
    ref="root"
    data-id="sds-tabs"
  >
    <div
      class="overflow-x-auto"
      :class="{
        'bg-gray-50 dark:bg-gray-850 rounded-t-theme-sm': type === 'folder'
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
            :is="tab.tag || 'button' as unknown"
            :id="`sds-tabs-${root?.id}__${tab.key}__tab`"
            :class="{
              'tab text-sm inline-block rounded-t-theme-sm py-2 px-4 font-semibold': type === 'folder',
              'bg-white dark:bg-gray-900 border-l border-t border-r text-blue-600 border-gray-200 dark:border-gray-800 dark:text-blue-300': type === 'folder' && tab.active,
              'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white':
                type === 'folder' && !tab.active,
              'tab tab-underline tab-red': type === 'underline',
              'tab tab-block tab-red': type === 'block',
              'active': (type === 'underline' || type === 'block') && tab.active,
              'disabled': (type === 'underline' || type === 'block') && tab.disabled,
            }"
            :href="tab.tag === 'a' && tab.href || undefined"
            :target="tab.tag === 'a' && tab.href && tab.external ? '_blank' : undefined"
            :rel="tab.tag === 'a' && tab.href && tab.external ? 'noopener noreferrer' : undefined"
            :type="tab.tag === 'button' ? 'button' : undefined"
            :disabled="tab.disabled"
            :aria-disabled="tab.disabled"
            :tabindex="tab.disabled ? -1 : undefined"
            :aria-selected="tab.active ? 'true' : 'false'"
            :aria-controls="`sds-tabs-${root?.id}__${tab.key}__tab-content`"
            :data-active="tab.active ? true : undefined"
            role="tab"
            @click="changeTab(tab)"
          >
            <!-- @slot Custom left-icon slot content. -->
            <slot :name="`tabIconLeft(${tab.key})`"></slot>
            <!-- @slot Dynamic tab. Used for custom HTML within a tab. -->
            <slot :name="`tab(${tab.key})`">
              {{ tab.title }}
            </slot>
            <!-- @slot Custom right-icon slot content. -->
            <slot :name="`tabIconRight(${tab.key})`"></slot>
          </component>
        </li>
      </ul>
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
export interface TabItem {
  key: string
  tag?: 'button' | 'a'
  title?: string
  href?: string
  align?: 'left' | 'right' | 'center'
  external?: boolean
  active?: boolean
  disabled?: boolean
}

const id = useId()

defineOptions({
  name: 'SdsTabs'
})

const props = defineProps({
  /**
   * Optional count to display, typically used to show the number of items or notifications associated with the tab.
   */
  count: { type: Number, default: null },
  /**
   * Determines the size of the tab(s).
   */
  size: { type: String as PropType<'sm' | 'md' | 'lg'>, default: 'sm' },
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

// TODO: Fix async promise executor ESLint error
// eslint-disable-next-line no-async-promise-executor
const willChangeTabStateDelay = (tab: TabItem, fn: GenericFunctionType) => new Promise<void>(async (res, rej) => {
  return fn ? await fn(tab, res, rej) : res()
})

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
</script>
