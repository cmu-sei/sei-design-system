<template>
  <div
    data-id="sds-avatargroup"
    :class="rightClasses"
  >
    <template
      v-for="(item, index) in srcset.slice(0, 4)"
    >
      <a
        v-if="item.href"
        :key="`${index}-link`"
        :href="item.href"
        :target="item.target ?? undefined"
        :rel="item.target === '_blank' ? 'noopener noreferrer' : undefined"
      >
        <SdsTooltip
          size="auto"
          type="dark"
          class="overflow-x-visible"
          :class="maxWidthClass(index, srcset.length-1)"
          :disabled="false"
        >
          <template #trigger>
            <SdsAvatar
              :key="index"
              :shape="shape"
              :size="size"
              :variant="item.variant ?? 'gray'"
              :src="item.src ?? ''"
              :name="item.name ?? ''"
              class="relative cursor-pointer [&>span]:cursor-pointer"
              :class="`${baseClasses} ${indentClass(index, srcset.length-1)}`"
            />
          </template>
          {{ item.name }}
        </SdsTooltip>
      </a>
      <SdsTooltip
        v-else
        :key="index"
        size="auto"
        type="dark"
        class="overflow-x-visible"
        :class="maxWidthClass(index, srcset.length-1)"
        :disabled="false"
      >
        <template #trigger>
          <SdsAvatar
            :shape="shape"
            :size="size"
            :variant="item.variant ?? 'gray'"
            :src="item.src ?? ''"
            :name="item.name ?? ''"
            class="relative"
            :class="`${baseClasses} ${indentClass(index, srcset.length-1)}`"
          />
        </template>
        {{ item.name }}
      </SdsTooltip>
    </template>
    <SdsDropdown
      v-if="srcset.length >= 5"
    >
      <template #trigger="{ toggle }">
        <button
          v-if="srcset.length >= 5"
          :class="[
            lastClasses,
            'bg-gray-100',
            'dark:bg-gray-900',
            'relative flex flex-col justify-center text-center',
            shape === 'circle' ? 'rounded-full' : '',
            size === 'md' && shape === 'square' ? 'rounded-md' : '',
            size === 'sm' && shape === 'square' ? 'rounded' : '',
            size === 'xs' && shape === 'square' ? 'rounded-sm' : '',
            size === 'md' ? 'text-md size-12' : '',
            size === 'sm' ? 'text-sm size-8' : '',
            size === 'xs' ? 'text-xs size-6' : '',
            'font-semibold',
            'text-gray-700 dark:text-gray-200'
          ]"
          @click="toggle"
        >
          +{{ srcset.length - 4 }}
        </button>
      </template>
      <SdsDropdownItem
        v-for="(item, index) in srcset.slice(4)"
        :key="index"
      >
        <a
          v-if="item.href"
          :href="item.href"
          :target="item.target ?? undefined"
          :rel="item.target === '_blank' ? 'noopener noreferrer' : undefined"
          class="flex flex-row gap-2"
        >
          <img
            v-if="item.src"
            :src="item.src"
            :alt="item.name ?? undefined"
            class="size-5 rounded-full"
          />
          {{ item.name }}
        </a>
        <div v-else class="flex flex-row gap-2">
          <img
            v-if="item.src"
            :src="item.src"
            :alt="item.name ?? undefined"
            class="size-5 rounded-full"
          />
          {{ item.name }}
        </div>
      </SdsDropdownItem>
    </SdsDropdown>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsAvatarGroup'
})

type AvatarType = {
  name: string | null,
  src: string | null,
  variant: 'random' | 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'purple' | null,
  href: string | null,
  target: string | null
}

const props = defineProps({
  /**
   * Determines the shape of the avatar.
   */
  shape: {
    type: String as PropType<'circle' | 'square'>,
    default: 'circle'
  },
  /**
   * Determines the size of the avatar.
   */
  size: {
    type: String as PropType<'xs' | 'sm' | 'md'>,
    default: 'md'
  },
  /**
   * Determines the spacing between avatar images.
   */
  density: {
    type: String as PropType<'default' | 'condensed'>,
    default: 'default'
  },
  /**
   * name: Determines the text name (ex. John Doe) will show "JD" initials as a placeholder when no image is present.
   *       The full name, "John Doe" will display on hover with or without an image present.
   *
   * src:  Set the image of the avatar.
   */
  srcset: {
    type: Array as PropType<AvatarType[]>,
    default: () => []
  }
})

const rightClasses = computed(() => {
  return [
    'flex flex-row',
    '[&_[data-id="sds-dropdown"]]:relative [&_[data-id="sds-dropdown"]_div]:right-0',
    props.size === 'md' ? '[&_[data-id="sds-dropdown"]]:size-12 h-12' : '',
    props.size === 'sm' ? '[&_[data-id="sds-dropdown"]]:size-8 h-8' : '',
    props.size === 'xs' ? '[&_[data-id="sds-dropdown"]]:size-6 h-6' : '',
  ].join(' ')
})

const baseClasses = computed(() => {
  return [
    'relative',
    'z-0',
    'left-0',
    'hover:z-20',
    'focus:z-20',
    props.size === 'md' ? 'size-12' : '',
    props.size === 'sm' ? 'size-8' : '',
    props.size === 'xs' ? 'size-6' : '',
  ].join(' ')
})

const lastClasses = computed(() => {
  return [
    'border-2',
    'border-transparent',
    'cursor-pointer',
    'mask-none',
    'hover:border-gray-200',
    'focus:border-gray-200',
    'active:bg-gray-200/50',
    'active:border-gray-300',
    'dark:hover:border-gray-800',
    'dark:focus:border-gray-800',
    'dark:active:bg-gray-700',
    'dark:active:border-gray-500',
    'active:shadow-inner',
  ].join(' ')
})

const indentClass = (index: number, length: number) => {
  if (index === length)
    return 'mask-none'
}

const maskSpec = computed(() => {
  const vbWidth = 1000
  const vbHeight = 1000

  let maskX = 0
  let maskY = 0

  let maskSize = 0
  let maskRadius = 0
  let offset = 0


  switch (props.shape) {
    case 'circle':
      switch (props.size) {
        case 'xs':
          maskRadius = 1
          maskSize = 13.5
          offset = props.density === 'condensed' ? -11 : -4
          break
        case 'sm':
          maskRadius = 1
          maskSize = 17
          offset = props.density === 'condensed' ? -8 : 0
          break
        case 'md':
          maskRadius = 1
          maskSize = 26
          offset = props.density === 'condensed' ? -12 : 0
          break
      }
      maskX = vbWidth + offset
      maskY = vbHeight/2
      break
    case 'square':
      switch (props.size) {
        case 'xs':
          maskRadius = 4
          maskSize = 26
          maskX = props.density === 'condensed' ? 976 : 983
          maskY = 487
          break
        case 'sm':
          maskRadius = 4
          maskSize = 34
          maskX = props.density === 'condensed' ? 975 : 983
          maskY = 483
          break
        case 'md':
          maskRadius = 6
          maskSize = 50
          maskX = props.density === 'condensed' ? 963 : 975
          maskY = 475
          break
      }
      break
  }

  const circleMask = `url('data:image/svg+xml,<svg viewBox="0 0 ${vbWidth} ${vbHeight}" xmlns="http://www.w3.org/2000/svg"><circle cx="${maskX}" cy="${maskY}" r="${maskSize}" /></svg>'), linear-gradient(#fff, #fff)`
  const squareMask = `url('data:image/svg+xml,<svg viewBox="0 0 ${vbWidth} ${vbHeight}" xmlns="http://www.w3.org/2000/svg"><rect x="${maskX}" y="${maskY}" width="${maskSize}" height="${maskSize}" rx="${maskRadius}" /></svg>'), linear-gradient(#fff, #fff)`

  return props.shape === 'circle' ? circleMask : squareMask
})

const maxWidthClass = (index: number, length: number) => {
  if (index === length)
    return 'max-w-fit'
  switch (props.size) {
    default:
    case 'md':
      return props.density === 'condensed' ? 'max-w-6' : 'max-w-9'
    case 'sm':
      return props.density === 'condensed' ? 'max-w-5' : 'max-w-7'
    case 'xs':
      return props.density === 'condensed' ? 'max-w-3' : 'max-w-5'
  }
}

const maskAlign = computed(() => {
  return '99% 50%'
})
</script>

<style lang="postcss" scoped>
div[data-id="sds-avatar"] {
  mask: v-bind('maskSpec');
  mask-clip: no-clip;
  mask-repeat: no-repeat;
  mask-composite: exclude;
  mask-position: v-bind('maskAlign');
  mask-origin: border-box;
  mask-size: 1000px 1000px;
}
</style>
