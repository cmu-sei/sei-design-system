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
        class="flex whitespace-nowrap z-10 border-b-2 dark:border-b-gray-800"
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
          <floating-ui
            :offset="0"
            :overflow-padding="0"
            placement="bottom"
            :popper-class="`absolute border shadow-lg bg-white dark:border-gray-700 dark:bg-gray-850 w-full z-50`"
            hide-arrow
            shift
          >
            <template #trigger="{ isOpen, toggle }">
              <button
                type="button"
                class="p-2 space-x border-b-2"
                aria-haspopup="true"
                :aria-expanded="isOpen"
                :class="[isOpen ? 'text-red-500 border-red-500' : 'border-transparent']"
                @click="changeTab(topLink, toggle)"
              >
                {{ topLink.title }}
                <svg
                  class="inline-block self-center w-5 h-5 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </template>
            <template #default>
              <div class="w-full">
                <div class="container mx-auto">
                  <slot
                    v-if="topLink.active"
                    :name="`panel(${topLink.key})`"
                  />
                </div>
              </div>
            </template>
          </floating-ui>
        </li>
      </ul>
    </div>
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
import FloatingUi from "../FloatingUi/FloatingUi.vue";

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

const changeTab = async (topLink: ITab, toggle) => {
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
    toggle()
  }
}
</script>
