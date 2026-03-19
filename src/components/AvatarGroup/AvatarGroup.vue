<template>
  <div
    data-id="sds-avatargroup"
    :class="rightClasses"
  >
    <template
      v-for="(item, index) in srcset.slice(0, 3)"
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
              :class="`${baseClasses} ${indentClass(index, srcset.length-1)} ${((srcset.length-1 === index) && (srcset.length < 5)) ? 'mask-none!' : ''}`"
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
            :class="`${baseClasses} ${indentClass(index, srcset.length-1)} ${((srcset.length-1 === index) && (srcset.length < 5)) ? 'mask-none!' : ''}`"
          />
        </template>
        {{ item.name }}
      </SdsTooltip>
    </template>
    <SdsDropdown
      v-if="srcset.length >= 4"
    >
      <template #trigger="{ toggle }">
        <button
          :class="[
            lastClasses,
            'bg-gray-100',
            'dark:bg-gray-900',
            'relative flex flex-col justify-center text-center',
            shape === 'circle' ? 'rounded-full' : '',
            size === 'md' && shape === 'square' ? 'sds-theme-plaid:rounded-none rounded-md' : '',
            size === 'sm' && shape === 'square' ? 'sds-theme-plaid:rounded-none rounded' : '',
            size === 'xs' && shape === 'square' ? 'sds-theme-plaid:rounded-none rounded-sm' : '',
            size === 'md' ? 'text-md size-12' : '',
            size === 'sm' ? 'text-sm size-8' : '',
            size === 'xs' ? 'text-xs size-6' : '',
            'font-semibold',
            'text-gray-700 dark:text-gray-200'
          ]"
          @click="toggle()"
        >
          +{{ srcset.length - 3 }}
        </button>
      </template>
      <SdsDropdownItem
        v-for="(item, index) in srcset.slice(3)"
        :key="index"
        :href="item.href ?? undefined"
        :target="item.target ?? undefined"
        :rel="item.target === '_blank' ? 'noopener noreferrer' : undefined"
      >
        <div class="flex flex-row gap-2">
          <SdsAvatar
            :shape="shape"
            size="xs"
            :variant="item.variant ?? 'gray'"
            :src="item.src ?? ''"
            :name="item.name ?? ''"
          />
          <span class="leading-6">
            {{ item.name }}
          </span>
        </div>
      </SdsDropdownItem>
    </SdsDropdown>
  </div>
</template>

<script setup lang="ts">
import SdsAvatar from '../Avatar/Avatar.vue'
import SdsTooltip from '../Tooltip/Tooltip.vue'
import SdsDropdown from '../Dropdown/Dropdown.vue'
import SdsDropdownItem from '../DropdownItem/DropdownItem.vue'
import { getAvatarGroupMaskAlign, getAvatarGroupMaskSpec } from '@/helpers/avatarGroupMask'

defineOptions({
  name: 'SdsAvatarGroup'
})

export interface AvatarGroupItem {
  name: string | null,
  src?: string | null,
  variant?: 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'purple' | null,
  href?: string | null,
  target?: string | null
}

interface AvatarGroupProps {
  /**
   * Determines the shape of the avatar.
   */
  shape?: 'circle' | 'square';
  /**
   * Determines the size of the avatar.
   */
  size?: 'xs' | 'sm' | 'md';
  /**
   * Determines the spacing between avatar images.
   */
  density?: 'default' | 'condensed';
  /**
   * **name** (required) — Determines the text name (e.g. John Doe will show "JD" initials as a placeholder when no image is present)
   * The full name, "John Doe" will display on hover with or without an image present.
   *
   * **src** (optional) — URL for avatar image
   *
   * **variant** (optional) — Determines the background color of the avatar when no image is present.
   *
   * **href** (optional) — Link for avatar
   *
   * **target** (optional) — Sets the `target` attribute for avatar links (e.g. `_blank`, `_self`, etc.)
   */
  srcset?: AvatarGroupItem[];
}

const props = withDefaults(defineProps<AvatarGroupProps>(), {
  shape: 'circle',
  size: 'md',
  density: 'default',
  srcset: () => []
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
    'mask-none!',
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

const maskAlign = computed(() => getAvatarGroupMaskAlign())

const maskSpecForge = computed(() => getAvatarGroupMaskSpec(props.shape, props.size, props.density, 'forge'))

const maskSpecPlaid = computed(() => getAvatarGroupMaskSpec(props.shape, props.size, props.density, 'plaid'))
</script>

<style lang="postcss" scoped>
[data-id="sds-avatar"] {
  mask: v-bind('maskSpecForge');
  mask-position: v-bind('maskAlign');
  mask-clip: no-clip;
  mask-repeat: no-repeat;
  mask-composite: exclude;
  mask-origin: border-box;
  mask-size: 1000px 1000px;
}
.sds-theme-plaid [data-id="sds-avatar"] {
  mask: v-bind('maskSpecPlaid');
  mask-position: v-bind('maskAlign');
  mask-clip: no-clip;
  mask-repeat: no-repeat;
  mask-composite: exclude;
  mask-origin: border-box;
  mask-size: 1000px 1000px;
}
</style>
