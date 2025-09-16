<template>
  <div 
    :id="id"
    data-id="sds-tag"
    class="
      inline-flex
      items-center
      bg-white
      dark:bg-gray-850
      shadow-none
      border
      border-gray-200
      dark:border-gray-700
      rounded-full
      sds-theme-plaid:rounded-md
      overflow-clip
      font-semibold
      text-gray-600
      dark:text-gray-400
      has-[a:hover]:bg-gray-25
      dark:has-[a:hover]:bg-gray-850
      has-[a:hover]:shadow-sm
      has-[a:hover]:border-gray-600
      dark:has-[a:hover]:border-gray-400
      has-[a:hover:active]:bg-gray-50
      dark:has-[a:hover:active]:bg-gray-800
      has-[a:hover:active]:shadow-sm
      has-[a:hover:active]:border-gray-900
      dark:has-[a:hover:active]:border-gray-100
    "
    :data-link="href && !readonly ? true : undefined"
    :data-readonly="readonly"
    :class="[textSizeClass, sizeClass, paddingClass, disabledClass]"
  >
    <div 
      class="flex flex-row flex-nowrap items-center"
      :class="{
        'gap-x-0.5': size === 'sm',
        'gap-x-1': size === 'md',
      }"
    >
      <span
        v-if="counter"
        class="bg-blue-600 text-white text-center"
        :class="size === 'sm' ? 'min-h-6 min-w-6 px-1.5 leading-6' : 'min-h-8 min-w-8 px-1.5 leading-8'"
      >{{ counter.toLocaleString() }}</span>
      <span 
        v-if="!!$slots.leftSlot"
        class="leading-none"
      >
        <!-- @slot Left slot content. -->
        <slot name="leftSlot" />
      </span>
      <a
        v-if="href && !readonly"
        class="
          hover:underline
          hover:text-gray-900
          dark:hover:text-gray-100
          active:underline
          active:text-black
          dark:active:text-white
        "
        :class="counter ? 'pl-1' : ''"
        :href="href"
        :rel="external ? 'noopener noreferrer' : undefined"
        :target="external ? '_blank' : undefined"
      >
        <!-- @slot Label content. -->
        <slot name="label">
          {{ label }}
        </slot>
      </a>
      <span
        v-else
        :class="counter ? 'pl-1' : ''"
      >
        <!-- @slot Label content. -->
        <slot name="label">
          {{ label }}
        </slot>
      </span>
      <template v-if="isAction(action) && !readonly">
        <template v-if="action === 'increment'">
          <button 
            ref="button" 
            type="button"
            class="flex flex-col items-center justify-center text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 focus:outline-none focus-visible:bg-blue-50"
            :class="[buttonSizeClass]"
            @click.stop="increment"
          >
            <SdsSvgIcon
              aria-hidden="true"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              :height="icons.increment[size].height"
              :path="icons.increment[size].path"
              :width="icons.increment[size].width"
              :view-box="icons.increment[size].viewBox"
            />
            <span class="sr-only">Increment</span>
          </button>
        </template>
        <template v-else-if="action === 'decrement'">
          <button 
            ref="button" 
            type="button"
            class="flex flex-col items-center justify-center text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 focus:outline-none focus-visible:bg-blue-50"
            :class="[buttonSizeClass]"
            @click.stop="decrement"
          >
            <SdsSvgIcon
              aria-hidden="true"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              :height="icons.decrement[size].height"
              :path="icons.decrement[size].path"
              :width="icons.decrement[size].width"
              :view-box="icons.decrement[size].viewBox"
            />
            <span class="sr-only">Decrement</span>
          </button>
        </template>
        <template v-else-if="action === 'remove'">
          <button 
            ref="button" 
            type="button"
            class="flex flex-col items-center justify-center text-red-600 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900 focus:outline-none focus-visible:bg-red-50"
            :class="[buttonSizeClass]"
            @click.stop="remove"
          >
            <SdsSvgIcon
              aria-hidden="true"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              :height="icons.remove[size].height"
              :path="icons.remove[size].path"
              :width="icons.remove[size].width"
              :view-box="icons.remove[size].viewBox"
            />
            <span class="sr-only">Remove</span>
          </button>
        </template>
      </template>
      <span v-else-if="!!$slots.action">
        <!-- @slot Action slot content -->
        <slot name="action" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import SdsSvgIcon from '../SvgIcon'

export type TagActionType = typeof actions[number]
export type TagIconAttrs = { height: number; path: string; viewBox: string; width: number; }
export type TagIconSize = 'sm' | 'md'
export type TagIconTypes = Record<TagActionType, Record<TagIconSize, TagIconAttrs>>

defineOptions({
  name: 'SdsTag'
})

const slots = defineSlots<{
  default: () => unknown
  leftSlot: () => unknown
  label: () => unknown
  action: () => unknown
}>()

const actions = ['increment', 'decrement', 'remove'] as const
const isAction = (action: TagActionType): action is TagActionType => actions.includes(action)

const props = defineProps({
  /**
   * Determines the type of action or button.
   */
  action: { type: String as PropType<TagActionType>, default: null },
  /**
   * Determines the default count(er).
   */
  counter: { type: Number, default: null },
  /**
   * Applies the appropriate attributes for external links and opens them in a new tab. It also creates a REL attribute that prevents browser sniffing.
   */
  external: { type: Boolean, default: false },
  /**
   * Provides the "href" link for the tag or label.
   */
  href: { type: String, default: null },
  /**
   * Determines the id of the component.
   */
  id: { type: String, default: undefined },
  /**
   * Determines the text of the label.
   */
  label: { type: String, default: '' },
  /**
   * Determines whether or not the tag is readonly.
   */
  readonly: { type: Boolean, default: false },
  /**
   * Determines the size of the tag.
   */
  size: { type: String as PropType<TagIconSize>, default: 'sm' },
  /**
   * Determines if the tag is disabled.
   */
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['increment', 'decrement', 'remove'])

const count = ref(props.counter ? props.counter : 0)

const icons = ref<TagIconTypes>({
  increment: {
    sm: {
      height: 16,
      path: 'M12.875 8.5C12.875 8.92188 12.5234 9.27344 12.125 9.27344H8.75V12.6484C8.75 13.0469 8.39844 13.375 8 13.375C7.57812 13.375 7.25 13.0469 7.25 12.6484V9.27344H3.875C3.45312 9.27344 3.125 8.92188 3.125 8.5C3.125 8.10156 3.45312 7.77344 3.875 7.77344H7.25V4.39844C7.25 3.97656 7.57812 3.625 8 3.625C8.39844 3.625 8.75 3.97656 8.75 4.39844V7.77344H12.125C12.5234 7.75 12.875 8.10156 12.875 8.5Z',
      viewBox: '0 0 16 16',
      width: 16
    },
    md: {
      height: 18,
      path: 'M14.6875 8.75C14.6875 9.24219 14.2773 9.65234 13.8125 9.65234H9.875V13.5898C9.875 14.0547 9.46484 14.4375 9 14.4375C8.50781 14.4375 8.125 14.0547 8.125 13.5898V9.65234H4.1875C3.69531 9.65234 3.3125 9.24219 3.3125 8.75C3.3125 8.28516 3.69531 7.90234 4.1875 7.90234H8.125V3.96484C8.125 3.47266 8.50781 3.0625 9 3.0625C9.46484 3.0625 9.875 3.47266 9.875 3.96484V7.90234H13.8125C14.2773 7.875 14.6875 8.28516 14.6875 8.75Z',
      viewBox: '0 0 18 18',
      width: 18
    }
  },
  decrement: {
    sm: {
      height: 16,
      path: 'M12.125 9.25H3.875C3.45312 9.25 3.125 8.92188 3.125 8.5C3.125 8.10156 3.45312 7.75 3.875 7.75H12.125C12.5234 7.75 12.875 8.10156 12.875 8.5C12.875 8.92188 12.5234 9.25 12.125 9.25Z',
      viewBox: '0 0 16 16',
      width: 16
    },
    md: {
      height: 18,
      path: 'M13.8125 9.625H4.1875C3.69531 9.625 3.3125 9.24219 3.3125 8.75C3.3125 8.28516 3.69531 7.875 4.1875 7.875H13.8125C14.2773 7.875 14.6875 8.28516 14.6875 8.75C14.6875 9.24219 14.2773 9.625 13.8125 9.625Z',
      viewBox: '0 0 18 18',
      width: 18
    }
  },
  remove: {
    sm: {
      height: 16,
      path: 'M11.5156 10.9844C11.8203 11.2656 11.8203 11.7578 11.5156 12.0391C11.375 12.1797 11.1875 12.25 11 12.25C10.7891 12.25 10.6016 12.1797 10.4609 12.0391L8 9.57812L5.51562 12.0391C5.375 12.1797 5.1875 12.25 5 12.25C4.78906 12.25 4.60156 12.1797 4.46094 12.0391C4.15625 11.7578 4.15625 11.2656 4.46094 10.9844L6.92188 8.5L4.46094 6.03906C4.15625 5.75781 4.15625 5.26562 4.46094 4.98438C4.74219 4.67969 5.23438 4.67969 5.51562 4.98438L8 7.44531L10.4609 4.98438C10.7422 4.67969 11.2344 4.67969 11.5156 4.98438C11.8203 5.26562 11.8203 5.75781 11.5156 6.03906L9.05469 8.52344L11.5156 10.9844Z',
      viewBox: '0 0 16 16',
      width: 16
    },
    md: {
      height: 18,
      path: 'M13.1016 11.6484C13.457 11.9766 13.457 12.5508 13.1016 12.8789C12.9375 13.043 12.7188 13.125 12.5 13.125C12.2539 13.125 12.0352 13.043 11.8711 12.8789L9 10.0078L6.10156 12.8789C5.9375 13.043 5.71875 13.125 5.5 13.125C5.25391 13.125 5.03516 13.043 4.87109 12.8789C4.51562 12.5508 4.51562 11.9766 4.87109 11.6484L7.74219 8.75L4.87109 5.87891C4.51562 5.55078 4.51562 4.97656 4.87109 4.64844C5.19922 4.29297 5.77344 4.29297 6.10156 4.64844L9 7.51953L11.8711 4.64844C12.1992 4.29297 12.7734 4.29297 13.1016 4.64844C13.457 4.97656 13.457 5.55078 13.1016 5.87891L10.2305 8.77734L13.1016 11.6484Z',
      viewBox: '0 0 18 18',
      width: 18
    }
  }
})

const renderLeftSlot = computed(() => !!slots.leftSlot)

const paddingClass = computed(() => {
  const { action, readonly, size } = props
  switch (size) {
  case 'sm':
    if(props.counter) {
      return isAction(action) && !readonly ? '' : 'pr-2'
    }
    return isAction(action) && !readonly ? renderLeftSlot.value ? 'pl-1 pr-0' : 'pl-2 pr-0' : 'px-2'
  case 'md':
    if(props.counter) {
      return isAction(action) && !readonly ? '' : 'pr-2.5'
    }
    return isAction(action) && !readonly ? renderLeftSlot.value ? 'pl-1.5 pr-0' : 'pl-3 pr-0' : 'px-3'
  default:
    return ''
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
  case 'sm':
    return 'h-6'
  case 'md':
    return 'h-8'
  default:
    return ''
  }
})

const textSizeClass = computed(() => {
  switch (props.size) {
  case 'sm':
    return 'text-xs leading-4'
  case 'md':
    return 'text-base leading-6'
  default:
    return ''
  }
})

const buttonSizeClass = computed(() => {
  switch (props.size) {
  case 'sm':
    return 'h-[1.375rem] w-6'
  case 'md':
    return 'h-[1.875rem] w-8'
  default:
    return ''
  }
})

const disabledClass = computed(() => props.disabled ? 'opacity-50 pointer-events-none' : '')

const increment = () => {
  count.value += 1
  emit('increment', { id: props.id, count: count.value })
}

const decrement = () => {
  count.value -= 1
  emit('decrement', { id: props.id, count: count.value })
}

const remove = () => emit('remove', props.id)
</script>
