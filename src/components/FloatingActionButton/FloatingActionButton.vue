<template>
  <client-only>
    <teleport to="body">
      <div
        ref="container"
        data-id="sds-floating-action-button"
        class="hidden sm:block fixed inset-0 h-screen w-screen pointer-events-none z-50"
        @keydown="checkKeyEvent"
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
                <div class="w-6 h-6">
                  <svg
                    v-if="open"
                    class="inline-block h-6 w-6"
                    aria-hidden="true"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
                  </svg>
                  <!-- @slot Icon replacement for the unopened trigger button. -->
                  <slot
                    v-if="!open"
                    name="trigger-icon"
                  >
                    <svg
                      class="inline-block h-6 w-6"
                      aria-hidden="true"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M544 32c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V64c0-17.7 14.3-32 32-32zM64 190.3L480 64V448L348.9 408.2C338.2 449.5 300.7 480 256 480c-53 0-96-43-96-96c0-11 1.9-21.7 5.3-31.5L64 321.7C63.1 338.6 49.1 352 32 352c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32c17.1 0 31.1 13.4 32 30.3zm239 203.9l-91.6-27.8c-2.1 5.4-3.3 11.4-3.3 17.6c0 26.5 21.5 48 48 48c23 0 42.2-16.2 46.9-37.8z"
                      />
                    </svg>
                  </slot>
                </div>
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
                class="absolute flex flex-col bottom-20 right-0 pointer-events-auto border border-gray-100 dark:border-gray-700 rounded-theme-lg h-144 max-w-[32rem] w-[calc(100vw-2rem)] sm:w-[32rem] bg-white dark:bg-gray-950 shadow-lg"
                aria-orientation="vertical"
                :aria-labelledby="button && (button as HTMLElement).id || undefined"
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
                    <svg
                      class="inline-block h-4 w-4"
                      aria-hidden="true"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                      />
                    </svg>
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
import { onClickOutside, onKeyStroke } from '@vueuse/core';
import ClientOnly from '../ClientOnly/ClientOnly.vue'
import SdsIndicator from '../Indicator/Indicator.vue'
import ActionButton from '../ActionButton/ActionButton.vue';

const id = useId()

defineOptions({
  name: 'SdsFloatingActionButton'
})

const props = defineProps({
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
  modelValue: {
    type: Array as PropType<{ key: string | number, title: string, tabName: string, active: boolean, iconSrc?: string }[]>,
    required: true
  },
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

const emit = defineEmits(['update:model-value', 'open', 'close'])

const localVariant = computed<'blue' | 'red'>(() => {
  return props.variant
})

const tabs = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    /**
     * Emmitted when modelValue changes.
     */
    emit('update:model-value', value)
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

onKeyStroke('Escape', (e) => {
  if (open.value) {
    e.preventDefault()
    open.value = false
  }
})

const checkKeyEvent = (event: KeyboardEvent) => {
  if (container.value === null) return;

  const focusableList: NodeListOf<HTMLElement> = (container.value as unknown as HTMLElement).querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  // escape early if only 1 or no elements to focus
  if (focusableList.length < 2 && event.key === "Tab") {
    event.preventDefault();
    return;
  }

  const last = focusableList.length - 1;

  if (
    event.key === "Tab" &&
    event.shiftKey === false &&
    event.target === focusableList[last]
  ) {
    event.preventDefault();
    focusableList[0].focus();
  } else if (
    event.key === "Tab" &&
    event.shiftKey === true &&
    event.target === focusableList[0]
  ) {
    event.preventDefault();
    focusableList[last].focus();
  }
}

const setActiveTab = (tab: { key: string | number, title: string, tabName: string, active: boolean, iconSrc?: string }) => {
  tabs.value.map(i => i.active = tab.key === i.key)
}
</script>
