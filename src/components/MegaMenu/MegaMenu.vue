<template>
  <nav
    data-id="sds-megamenu"
    class="flex whitespace-nowrap"
  >
    <floating-ui
      v-for="topLink in topLinks"
      :key="topLink.key"
      :offset="0"
      :overflow-padding="0"
      placement="bottom"
      :popper-class="`absolute border shadow-lg bg-white dark:border-gray-700 dark:bg-gray-850 w-full z-50`"
      hide-arrow
      shift
    >
      <template #trigger="{ isOpen, toggle }">
        <component
          :is="topLink.tag ? topLink.tag : 'button'"
          :href="topLink.href ? topLink.href : undefined"
          :type="!topLink.tag || topLink.tag === 'button' ? 'button' : undefined"
          class="p-2 space-x border-b-2"
          aria-haspopup="true"
          :aria-expanded="isOpen"
          :class="[isOpen || topLink.active ? 'text-red-500 border-red-500' : 'border-transparent']"
          @click="changeTab(topLink, toggle, $event)"
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
        </component>
      </template>
      <template #default>
        <div class="w-full">
          <div class="container mx-auto">
            <slot
              v-if="topLink.selected"
              :name="`panel(${topLink.key})`"
            />
          </div>
        </div>
      </template>
    </floating-ui>
  </nav>
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
   *   selected?: boolean
   *   disabled?: boolean
   * }
   * ```
   */
  modelValue: { type: Array as PropType<ITab[]>, default: () => [] },
})

const emit = defineEmits(['update:model-value', 'change'])

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

const changeTab = async (topLink: ITab, toggle, event) => {
  if (topLink.tag === 'a' && topLink.href) {
    return true
  } else {
    event.preventDefault()
    topLinks.value = topLinks.value.map((i) => {
      i.selected = topLink.key === i.key
      return i
    })
    toggle()
  }
}
</script>
