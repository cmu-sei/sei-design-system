<template>
  <div
    data-id="sds-toggle-switch"
    class="flex items-center"
  >
    <button
      type="button"
      :class="[isToggled ? 'bg-green-500 disabled:bg-green-200' : 'bg-gray-600 disabled:bg-gray-200', styles.button]"
      :disabled="disabled"
      role="switch"
      :aria-checked="isToggled"
      @click="update"
    >
      <span
        aria-hidden="true"
        class="drop-shadow"
        :class="[isToggled ? 'translate-x-5' : 'translate-x-0', disabled ? 'bg-gray-50' : 'bg-white', styles.switch]"
      />
      <span class="sr-only">Toggle switch</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"

export default defineComponent({
  name: 'SdsToggleSwitch',
  props: {
    /**
     * The v-model state of this component. Determines true or false value.
     */
    modelValue: {
      type: Boolean,
      default: false
    },
    /**
     * Disables the component to prevent user interaction.
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      styles: {
        button:  'hover:shadow-md relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none disabled:bg-gray-700 disabled:bg-opacity-50 disabled:cursor-default disabled:shadow-none',
        switch:  'pointer-events-none inline-block h-5 w-5 rounded-full shadow-lg transform transition ease-in-out duration-200',
        offIcon: 'pointer-events-none absolute h-4 w-4 mt-0.5 ml-0.5 transform ring-0 transition ease-in-out duration-400 fill-current text-gray-700',
        onIcon: 'pointer-events-none absolute h-4 w-4 mt-0.5 ml-0.5 transform ring-0 transition ease-in-out duration-400'
      },
      icons: {
        off: 'M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z',
        on: 'M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z'
      }
    }
  },
  computed: {
    isToggled: {
      get() {
        return this.modelValue
      },
      set(value: boolean) {
        /**
         * Emitted when modelValue changes.
         */
        this.$emit('update:modelValue', value)
      }
    },
  },
  methods: {
    update () {
      this.isToggled = !this.isToggled
    }
  }
})
</script>
