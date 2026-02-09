<template>
  <client-only>
    <teleport to="body">
      <div
        ref="container"
        data-id="sds-floating-action-button"
        class="hidden sm:block fixed inset-0 h-screen w-screen pointer-events-none z-50"
        @keydown="trapFocus"
      >
        <div class="p-4 flex h-screen w-screen">
          <div class="ml-auto mt-auto relative">
            <SdsIndicator
              :hide-indicator="!showIndicator"
              :variant="indicatorVariant"
            >
              <button
                :id="id"
                ref="button"
                type="button"
                class="ml-auto mt-auto btn btn-primary rounded-theme-lg p-4 pointer-events-auto"
                aria-haspopup="true"
                :class="{
                  'btn-blue' : localVariant === 'blue',
                  'btn-red': localVariant === 'red'
                }"
                :aria-expanded="open"
                @click="open = !open"
              >
                <span class="block w-6 h-6">
                  <IconFa7SolidChevronDown
                    v-if="open"
                    class="inline-block h-6 w-6"
                  />
                  <!-- @slot Icon replacement for the unopened trigger button. -->
                  <slot
                    v-if="!open"
                    name="trigger-icon"
                  >
                    <IconFa7SolidBullhorn
                      class="inline-block h-6 w-6"
                    />
                  </slot>
                </span>
                <span class="sr-only">{{ open ? 'close' : 'open' }}</span>
              </button>
            </SdsIndicator>
            <transition
              enter-active-class="transition duration-75 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-50 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div
                v-if="open"
                ref="modal"
                class="absolute flex flex-col bottom-20 right-0 pointer-events-auto border border-gray-100 dark:border-gray-700 rounded-theme-lg h-144 max-w-lg w-[calc(100vw-2rem)] sm:w-lg bg-white dark:bg-gray-950 shadow-lg"
                aria-orientation="vertical"
                :aria-labelledby="button && (button as HTMLElement).id || undefined"
                role="dialog"
              >
                <div
                  class="p-6 rounded-t-theme-lg flex gap-4"
                  :class="{
                    'text-white bg-blue-600 dark:text-gray-950 dark:bg-blue-400': localVariant === 'blue',
                    'text-white bg-red-600 dark:text-gray-950 dark:bg-red-400': localVariant === 'red',
                  }"
                >
                  <h2 class="grow uppercase font-bold text-lg">
                    {{ activeTab.title }}
                  </h2>
                  <ActionButton
                    kind="ghost"
                    size="sm"
                    variant="white"
                    @click="open = false"
                  >
                    <IconFa7SolidChevronDown
                      class="inline-block h-5 w-5"
                    />
                    <span class="sr-only">Close</span>
                  </ActionButton>
                </div>
                <div class="grow mx-6 mt-4 mb-2 overflow-auto text-black dark:text-white">
                  <!-- @slot Content of the active tab. -->
                  <slot
                    v-if="activeTab"
                    :name="`tab(${activeTab.key})`"
                    :tab="activeTab"
                  />
                </div>
                <div
                  v-if="tabs.length > 1"
                  class="border-t border-gray-100 dark:border-gray-700 px-6"
                >
                  <nav class="grid grid-flow-col auto-cols-fr">
                    <button
                      v-for="tab in tabs"
                      :key="tab.key"
                      :class="{
                        'border-t-blue-600 hover:border-t-blue-600 text-blue-600 bg-white dark:border-t-blue-400 dark:hover:border-t-blue-400 dark:text-blue-400 dark:bg-gray-950': tab.active && localVariant === 'blue',
                        'border-t-red-600 hover:border-t-red-600 text-red-600 bg-white dark:border-t-red-400 dark:hover:border-t-red-400 dark:text-red-400 dark:bg-gray-950': tab.active && localVariant === 'red',
                        'border-t-transparent hover:border-t-gray-100 text-gray-600 bg-white hover:text-black dark:hover:border-t-gray-600 dark:text-gray-400 dark:bg-gray-950 dark:hover:text-white': !tab.active
                      }"
                      class="flex flex-col gap-2 p-6 pt-4 text-sm font-bold border-t-4 transition-colors duration-200"
                      @click="setActiveTab(tab)"
                    >
                      <div
                        v-if="$slots[`tab-icon(${tab.key})`] || tab.iconSrc"
                        class="h-4 w-4 mx-auto"
                      >
                        <!-- @slot Icon replacement for a tab based on its key. -->
                        <slot :name="`tab-icon(${tab.key})`">
                          <img
                            :src="tab.iconSrc"
                            :alt="tab.tabName"
                            class="h-4 w-4"
                            width="16"
                            height="16"
                          >
                        </slot>
                      </div>
                      <span class="mx-auto">{{ tab.tabName }}</span>
                    </button>
                  </nav>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </teleport>
  </client-only>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import ClientOnly from '../ClientOnly/ClientOnly.vue'
import SdsIndicator from '../Indicator/Indicator.vue'
import ActionButton from '../ActionButton/ActionButton.vue';
import { useFocusTrap } from '@/composables'

const id = useId()

defineOptions({
  name: 'SdsFloatingActionButton'
})

const props = defineProps({
  /**
   * Determines the color of the component.
   */
  variant: {
    type: String as PropType<'blue' | 'red'>,
    default: 'blue'
  },
  /**
   * Determines whether to display the indicator or not.
   */
  showIndicator: {
    type: Boolean, default: false
  },
  /**
   * Determines the color of the trigger button's indictor.
   */
  indicatorVariant: {
    type: String as PropType<'gray' | 'blue' | 'green' | 'orange' | 'red'>,
    default: 'blue'
  },
})

/**
 * An array of tab objects. Each object must have a unique "key".
 *
 * Example object:
 *
 * ```
 * {
 *    key: 'tab1',
 *    tabName: 'Tab 1',
 *    title: 'Active Tab 1',
 *    active: true,
 *    iconSrc: '/file.png'
 * }
 * ```
 */
const model = defineModel<{ key: string | number, title: string, tabName: string, active: boolean, iconSrc?: string }[]>({
  type: Array as PropType<{ key: string | number, title: string, tabName: string, active: boolean, iconSrc?: string }[]>,
  required: true
})

const emit = defineEmits(['update:modelValue', 'open', 'close'])

const localVariant = computed<'blue' | 'red'>(() => {
  return props.variant
})

const tabs = computed({
  get () {
    return model.value
  },
  set (value) {
    /**
     * Emmitted when modelValue changes.
     */
    emit('update:modelValue', value)
  }
})

const activeTab = computed(() => tabs.value.find(i => i.active) || { key: 0, title: '', tabName: '' })

const container = ref()
const modal = ref()
const button = ref()
const open = ref(false)

watch(open, (isOpen) => {
  if (isOpen) {
    /**
     * Emmitted when the Floating Action Button's modal opens.
     */
    emit('open')
  } else {
    /**
     * Emmitted when the Floating Action Button's modal closes.
     */
    emit('close')
  }
})

onClickOutside(modal, () => {
  if (open.value) {
    open.value = false
  }
}, { ignore: [button] })

const closeMenu = () => {
  open.value = false
}

const { trapFocus } = useFocusTrap(container, {
  enabled: open,
  handleEscape: true,
  onEscape: closeMenu
})

const setActiveTab = (tab: { key: string | number, title: string, tabName: string, active: boolean, iconSrc?: string }) => {
  tabs.value.map(i => i.active = tab.key === i.key)
}
</script>
