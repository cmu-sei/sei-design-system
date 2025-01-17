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
      font-semibold
      text-gray-600
      dark:text-gray-400
      has-[a:hover]:bg-gray-25
      has-[a:hover]:dark:bg-gray-850
      has-[a:hover]:shadow-sm
      has-[a:hover]:border-gray-600
      has-[a:hover]:dark:border-gray-400
      has-[a:hover:active]:bg-gray-50
      has-[a:hover:active]:dark:bg-gray-800
      has-[a:hover:active]:shadow-sm
      has-[a:hover:active]:border-gray-900
      has-[a:hover:active]:dark:border-gray-100
    "
    :data-link="href && !readonly ? true : undefined"
    :data-readonly="readonly"
    :class="[textSizeClass, sizeClass, paddingClass]"
  >
    <div 
      class="flex flex-row flex-nowrap items-center"
      :class="{
        'gap-1': size === 'sm',
        'gap-1.5': size === 'md'
      }"
    >
      <span 
        v-if="$slots.leftSlot"
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
          hover:dark:text-gray-100
          active:underline
          active:text-black
          active:dark:text-white
        "
        :href="href"
        :rel="external ? 'noopener noreferrer' : undefined"
        :target="external ? '_blank' : undefined"
      >
        <!-- @slot Label content. -->
        <slot name="label">
          {{ label }}
        </slot>
      </a>
      <span v-else>
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
            class="text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-full w-4 h-4"
            @click.stop="increment"
          >
            <SdsSvgIcon
              aria-hidden="true"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              :height="icons.increment.height"
              :path="icons.increment.path"
              :width="icons.increment.width"
              :view-box="icons.increment.viewBox"
            />
            <span class="sr-only">Increment</span>
          </button>
        </template>
        <template v-else-if="action === 'decrement'">
          <button 
            ref="button" 
            type="button"
            class="text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full w-4 h-4"
            @click.stop="decrement"
          >
            <SdsSvgIcon
              aria-hidden="true"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              :height="icons.decrement.height"
              :path="icons.decrement.path"
              :width="icons.decrement.width"
              :view-box="icons.decrement.viewBox"
            />
            <span class="sr-only">Decrement</span>
          </button>
        </template>
        <template v-else-if="action === 'remove'">
          <button 
            ref="button" 
            type="button"
            class="text-red-600 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900 rounded-full w-4 h-4"
            @click.stop="remove"
          >
            <SdsSvgIcon
              aria-hidden="true"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              :height="icons.remove.height"
              :path="icons.remove.path"
              :width="icons.remove.width"
              :view-box="icons.remove.viewBox"
            />
            <span class="sr-only">Remove</span>
          </button>
        </template>
      </template>
      <span v-else-if="$slots.action">
        <!-- @slot Action slot content -->
        <slot name="action" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
import SdsSvgIcon from '../SvgIcon'

export type ActionType = typeof actions[number]

defineOptions({
  name: 'SdsTag'
})

const slots = useSlots()

const actions = ['increment', 'decrement', 'remove'] as const
const isAction = (action: ActionType): action is ActionType => actions.includes(action)

const props = defineProps({
  /**
   * Determines the type of action or button.
   */
  action: { type: String as PropType<ActionType>, default: null },
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
   * Determines whether or not the tag is read-only.
   */
  readonly: { type: Boolean, default: false },
  /**
   * Determines the size of the tag.
   */
  size: { type: String as PropType<'sm' | 'md'>, default: 'sm' },
})

const emit = defineEmits(['increment', 'decrement', 'remove'])

const count = ref(props.counter ? props.counter : 0)

const icons = ref<Record<string, { height: number; path: string; viewBox: string; width: number; }>>({
  increment: {
    height: 16,
    path: 'M12.0625 8.25C12.0625 8.60156 11.7695 8.89453 11.4375 8.89453H8.625V11.707C8.625 12.0391 8.33203 12.3125 8 12.3125C7.64844 12.3125 7.375 12.0391 7.375 11.707V8.89453H4.5625C4.21094 8.89453 3.9375 8.60156 3.9375 8.25C3.9375 7.91797 4.21094 7.64453 4.5625 7.64453H7.375V4.83203C7.375 4.48047 7.64844 4.1875 8 4.1875C8.33203 4.1875 8.625 4.48047 8.625 4.83203V7.64453H11.4375C11.7695 7.625 12.0625 7.91797 12.0625 8.25Z',
    viewBox: '0 0 16 16',
    width: 16
  },
  decrement: {
    height: 16,
    path: 'M11.4375 8.875H4.5625C4.21094 8.875 3.9375 8.60156 3.9375 8.25C3.9375 7.91797 4.21094 7.625 4.5625 7.625H11.4375C11.7695 7.625 12.0625 7.91797 12.0625 8.25C12.0625 8.60156 11.7695 8.875 11.4375 8.875Z',
    viewBox: '0 0 16 16',
    width: 16
  },
  remove: {
    height: 16,
    path: 'M10.9297 10.3203C11.1836 10.5547 11.1836 10.9648 10.9297 11.1992C10.8125 11.3164 10.6562 11.375 10.5 11.375C10.3242 11.375 10.168 11.3164 10.0508 11.1992L8 9.14844L5.92969 11.1992C5.8125 11.3164 5.65625 11.375 5.5 11.375C5.32422 11.375 5.16797 11.3164 5.05078 11.1992C4.79688 10.9648 4.79688 10.5547 5.05078 10.3203L7.10156 8.25L5.05078 6.19922C4.79688 5.96484 4.79688 5.55469 5.05078 5.32031C5.28516 5.06641 5.69531 5.06641 5.92969 5.32031L8 7.37109L10.0508 5.32031C10.2852 5.06641 10.6953 5.06641 10.9297 5.32031C11.1836 5.55469 11.1836 5.96484 10.9297 6.19922L8.87891 8.26953L10.9297 10.3203Z',
    viewBox: '0 0 16 16',
    width: 16
  }
})

const renderLeftSlot = computed(() => !!slots.leftSlot)

const paddingClass = computed(() => {
  const { action, readonly, size } = props
  switch (size) {
    case 'sm':
      return isAction(action) && !readonly ? renderLeftSlot.value ? 'px-1' : 'pl-2 pr-1' : 'px-2'
    case 'md':
      return isAction(action) && !readonly ? renderLeftSlot.value ? 'px-1.5' : 'pl-3 pr-1.5' : 'px-3'
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