<template>
  <PopperWrapper
    v-slot="{ isOpen, open, close, triggerId, popperId }"
    :config="config"
  >
    <div class="inline-block">
      <div
        :id="triggerId"
        :class="[triggerClass]"
        :aria-describedby="popperId"
        @mouseover="handleOpen(open)"
        @mouseleave="handleClose(close)"
      >
        <!-- @slot Trigger content. -->
        <slot name="trigger" />
      </div>
      <div
        v-show="isOpen"
        :id="popperId"
        role="tooltip"
        :class="['popover rounded-lg p-4 text-xs absolute text-left font-normal w-auto bg-white border border-gray-300 text-dark', zIndexClass, sizeClass, popoverClass ? popoverClass : '']"
        @mouseover="handleOpen(open)"
        @mouseleave="handleClose(close)"
      >
        <!-- @slot Popover content. @binding close, open, isOpen -->
        <slot
          :close="close"
          :open="open"
          :is-open="isOpen"
        />
        <div
          class="arrow before:bg-white before:border-gray-300"
          data-popper-arrow
        />
      </div>
    </div>
  </PopperWrapper>
</template>

<script>
import PopperWrapper from "../PopperWrapper/PopperWrapper.vue";

export default {
  name: 'SdsPopover',
  components: {
    PopperWrapper
  },
  props: {
    /**
     * The styling for the popover.
     */
    popoverClass: {
      type: String,
      required: false,
      default: ""
    },
    /**
     * The styling for the trigger.
     */
    triggerClass: {
      type: String,
      required: false,
      default: ""
    },
    /**
     * The z-index for the popover.
     */
    zIndexClass: {
      type: String,
      required: false,
      default: "z-50"
    },
    /**
     * Delays opening the toggle in ms.
     */
    openDelay: {
      type: Number,
      required: false,
      default: 500
    },
    /**
     * Delays closing the toggle in ms.
     */
    closeDelay: {
      type: Number,
      required: false,
      default: 250
    },
    /**
     * The width of the popover.
     */
    size: {
      type: String,
      required: false,
      default: 'lg'
    },
    /**
     * The placement of the popover on the screen.
     */
    placement: {
      type: String,
      required: false,
      default: 'auto'
    },
    /**
     * The strategy of the popover on the screen.
     */
    strategy: {
      type: String,
      required: false,
      default: 'absolute'
    },
    /**
     * Determines if the popover should display or not.
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['open', 'close'],
  data () {
    return {
      timer: null
    }
  },
  computed: {
    config() {
      return {
        placement: this.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0,12]
            },
          },
        ],
        strategy: this.strategy,
      }
    },
    sizeClass() {
      switch (this.size) {
        case 'sm':
          return 'w-80'
        case 'lg':
          return 'w-96'
        default:
          return 'w-80'
      }
    }
  },
  methods: {
    handleOpen(open) {
      clearTimeout(this.timer)
      if (this.disabled) return
      this.timer = setTimeout(() => {
        /**
         * Emitted when the popover will open.
         */
        this.$emit('open')
        open()
      }, this.openDelay)
    },
    handleClose(close) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        /**
         * Emitted when the popover will close.
         */
        this.$emit('close')
        close()
      }, this.closeDelay)
    }
  }
}
</script>

<style lang="postcss" scoped>
.arrow,
.arrow::before {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 0 0 0 2px;
}

.arrow {
  visibility: hidden;
}

.arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

.popover[data-popper-placement^='top'] > .arrow {
  @apply before:border-r before:border-b;
  box-shadow: rgb(0 0 0 / 10%) 0 -4px 6px 0;
  bottom: -7px;
}

.popover[data-popper-placement^='bottom'] > .arrow {
  @apply before:border-l before:border-t;
  box-shadow: rgb(0 0 0 / 10%) 0 4px 6px 0;
  top: -7px;
}

.popover[data-popper-placement^='left'] > .arrow {
  @apply before:border-r before:border-t;
  box-shadow: rgb(0 0 0 / 10%) -4px 4px 6px 0;
  right: -7px;
}

.popover[data-popper-placement^='right'] > .arrow {
  @apply before:border-l before:border-b;
  box-shadow: rgb(0 0 0 / 10%) 4px 4px 6px 0;
  left: -7px;
}
</style>
