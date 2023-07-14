<template>
  <div
    ref="root"
    v-uid
    data-id="sds-megamenu"
  >
    <div
      class="overflow-x-auto"
      :class="{
        'bg-gray-100 dark:bg-gray-850 rounded-t': type === 'folder'
      }"
    >
      <ul
        role="tablist"
        class="flex whitespace-nowrap z-10 border-b-4 border-b-gray-100/50"
      >
        <li
          v-for="topLink in topLinks"
          :key="topLink.key"
          role="presentation"
          :class="{
            'mr-auto': topLink.align === 'left',
            'ml-auto': topLink.align === 'right',
            'mx-auto': topLink.align === 'center'
          }"
        >
          <component
            :is="topLink.tag || 'button' as unknown"
            :id="`sds-megamenu-${root?.id}__${topLink.key}__tab`"
            :class="{
              'opacity-50': topLink.disabled,
              'pointer-events-none': topLink.disabled || topLink.active,
              'text-sm inline-block rounded-t py-2 px-4 font-bold': type === 'folder',
              'bg-white dark:bg-gray-900 border-l border-t border-r text-gray-700 dark:border-gray-700 dark:text-gray-100': type === 'folder' && topLink.active,
              'text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100':
                type === 'folder' && !topLink.active,
              'top-level-link top-level-link-underline top-level-link-red': type === 'underline',
              'top-level-link top-level-link-block top-level-link-red': type === 'block',
              'active': (type === 'underline' || type === 'block') && topLink.active,
              'disabled': (type === 'underline' || type === 'block') && topLink.disabled,
            }"
            :href="topLink.tag === 'a' && topLink.href || undefined"
            :target="topLink.tag === 'a' && topLink.href && topLink.external ? '_blank' : undefined"
            :rel="topLink.tag === 'a' && topLink.href && topLink.external ? 'noopener noreferrer' : undefined"
            :type="topLink.tag === 'button' ? 'button' : undefined"
            :disabled="topLink.disabled"
            :aria-disabled="topLink.disabled"
            :tabindex="topLink.disabled ? -1 : undefined"
            :aria-selected="topLink.active ? 'true' : 'false'"
            :aria-controls="`sds-megamenu-${root?.id}__${topLink.key}__tab-content`"
            :data-active="topLink.active ? true : undefined"
            role="tab"
            @click="changeTab(topLink)"
          >
            <!-- @slot Dynamic tab. Used to for custom HTML within a tab. -->
            <slot :name="`topLink(${topLink.key})`">
              {{ topLink.title }}
            </slot>
          </component>
        </li>
      </ul>
    </div>
    <template v-for="topLink in topLinks">
      <div
        v-if="topLink.active"
        :id="`sds-megamenu-${root?.id}__${topLink.key}__tab-content`"
        :key="topLink.key"
        :aria-labelledby="`sds-megamenu-${root?.id}__${topLink.key}__tab`"
        role="tabpanel"
        tabindex="0"
      >
        <!-- @slot Dynamic tab panel content. Used to inject content into the panel for an active tab. -->
        <slot
          v-if="topLink.active"
          :name="`panel(${topLink.key})`"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Uid } from '@shimyshack/uid'

interface ITab {
  key: string
  tag?: 'button' | 'a'
  title?: string
  href?: string
  align?: 'left' | 'right' | 'center'
  external?: boolean
  active?: boolean
  disabled?: boolean
}

export default {
  name: 'SdsMegaMenu',
  directives: {
    uid: Uid
  }
}
</script>

<script setup lang="ts">
import { PropType, ref, computed } from 'vue'

const props = defineProps({
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
  modelValue: { type: Array as PropType<ITab[]>, default: () => [] },
  /**
   * The overall look and feel of the component.
   */
  type: { type: String as PropType<'folder' | 'underline' | 'block'>, default: 'folder' },
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
  willChangeTab: { type: Function, default: null },
})

const emit = defineEmits(['update:model-value', 'change'])

const root = ref<HTMLElement>()

const topLinks = computed({
  get(): ITab[] {
    return props.modelValue
  },
  set(value: ITab[]) {
    /**
     * Emmitted when the v-model has changed.
     */
    emit('update:model-value', value)
  }
})

const willChangeTabStateDelay = (topLink: ITab, fn: Function) => new Promise<void>(async (res, rej) => {
  return fn ? await fn(topLink, res, rej) : res()
})

const changeTab = async (topLink: ITab) => {
  if (topLink.tag === 'a' && topLink.href) {
    return true
  } else {
    await willChangeTabStateDelay(topLink, props.willChangeTab)
    topLinks.value = topLinks.value.map((i) => {
      i.active = topLink.key === i.key
      return i
    })
    /**
     * Emmitted when a tab has been successfully made active.
     *
     * Provides the active `tab` object.
     */
    emit('change', topLink)
  }
}
</script>
