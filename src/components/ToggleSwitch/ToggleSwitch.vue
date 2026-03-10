<template>
  <div
    data-id="sds-toggle-switch"
    class="flex items-center"
  >
    <button
      type="button"
      class="disabled:opacity-50 dark:disabled:opacity-100 hover:shadow-md relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-hidden disabled:cursor-default disabled:shadow-none"
      :class="[
        isToggled ? 'bg-green-500 disabled:bg-green-200 dark:disabled:bg-green-800' : 'bg-gray-700 disabled:bg-gray-200 dark:disabled:bg-gray-800'
      ]"
      :disabled="disabled || undefined"
      role="switch"
      :aria-checked="isToggled"
      @click="update"
    >
      <span
        aria-hidden="true"
        class="pointer-events-none inline-block h-4 w-4 my-0.5 rounded-full transform transition ease-in-out duration-200"
        :class="[
          isToggled ? 'translate-x-5.5' : 'translate-x-0.5',
          disabled ? 'bg-gray-50 dark:bg-gray-500' : 'bg-white drop-shadow-sm shadow-lg'
        ]"
      />
      <span class="sr-only">Toggle switch</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SdsToggleSwitch'
})

interface ToggleSwitchProps {
  /**
   * Disables the component to prevent user interaction.
   */
  disabled?: boolean
}

withDefaults(defineProps<ToggleSwitchProps>(), {
  disabled: false
})

/**
 * The v-model state of this component. Determines true or false value.
 */
const isToggled = defineModel<boolean>({ type: Boolean, default: false })

const update = () => {
  isToggled.value = !isToggled.value
}
</script>
