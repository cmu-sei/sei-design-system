<template>
  <div>
    <div class="overflow-x-auto">
      <ul
        class="flex whitespace-nowrap"
        :class="{
          'border-b dark:border-gray-500': type === 'folder'
        }"
      >
        <li
          v-for="tab in tabs"
          :key="tab.key"
          :class="{ '-mb-px': type === 'folder' && tab.active }"
        >
          <component
            :is="tab.tag || 'button'"
            :class="{
              'opacity-50': tab.disabled,
              'pointer-events-none': tab.disabled || tab.active,
              'text-sm inline-block rounded-t py-2 px-4 font-bold': type === 'folder',
              'bg-white dark:bg-gray-800 border-l border-t border-r text-gray-700 dark:border-gray-500 dark:text-gray-100': type === 'folder' && tab.active,
              'text-blue-500 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-100':
                type === 'folder' && !tab.active,
              'tab tab-underline tab-red': type === 'underline',
              'active': type === 'underline' && tab.active,
              'disabled': type === 'underline' && tab.disabled,
            }"
            :href="tab.tag === 'a' && tab.href || undefined"
            :target="tab.tag === 'a' && tab.href && tab.external ? '_blank' : undefined"
            :rel="tab.tag === 'a' && tab.href && tab.external ? 'noopener noreferrer' : undefined"
            :type="tab.tag === 'button' ? 'button' : undefined"
            :disabled="tab.disabled"
            @click="changeTab(tab)"
          >
            <!-- @slot Dynamic tab. Used to for custom HTML within a tab. -->
            <slot :name="`tab(${tab.key})`">
              {{ tab.title }}
            </slot>
          </component>
        </li>
      </ul>
    </div>
    <template v-for="tab in tabs">
      <!-- @slot Dynamic tab content. Used to inject content into page for an active tab. -->
      <slot
        v-if="tab.active"
        :name="`content(${tab.key})`"
      />
    </template>
  </div>
</template>

<script lang="ts">
interface ITab {
  key: string
  tag?: 'button' | 'a'
  title?: string
  href?: string
  external?: boolean
  active?: boolean
  disabled?: boolean
}

export default {
  name: 'SdsTabs'
}
</script>

<script setup lang="ts">
import { PropType, computed } from 'vue'

const props = defineProps({
  /**
   * Determines the array of tab objects.
   * 
   * Format of tab object:
   * 
   * ```
   * {
   *   id,
   *   tag?,
   *   title?,
   *   href?,
   *   external?,
   *   active?,
   *   disabled?
   * }
   * ```
   */
  modelValue: { type: Array as PropType<ITab[]>, default: () => [] },
  /**
   * The overall look and feel of the component.
   */
  type: { type: String as PropType<'folder' | 'underline'>, default: 'folder' },
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

const tabs = computed({
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

const willChangeTabStateDelay = (tab: ITab, fn: Function) => new Promise<void>(async (res, rej) => {
  return fn ? await fn(tab, res, rej) : res()
})

const changeTab = async (tab: ITab) => {
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