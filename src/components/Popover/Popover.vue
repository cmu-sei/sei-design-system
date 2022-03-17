<template>
  <PopperWrapper
    v-slot="{ isOpen, open, close, triggerId, popperId }"
    :config="config"
    @open="handlePopperWrapperOpen"
    @close="handlePopperWrapperClose"
  >
    <div class="inline-block w-full">
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
        :class="['popover rounded-lg p-4 text-xs absolute text-left font-normal bg-white border border-gray-300 text-dark', zIndexClass, sizeClass, popoverClass ? popoverClass : '']"
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

<script lang="ts">
import { defineComponent } from "vue";
import PopperWrapper from "../PopperWrapper/PopperWrapper.vue";

export default defineComponent({
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
    },
    /**
     * Allows for code execution prior to opening the popover.
     * 
     * Unlike the `before-open` event, this prop prevents
     * the popover from opening until its `open()` callback is called.
     * 
     * A `cancel()` callback can be called as well to cancel
     * the opening process.
     * 
     * For example, this can prevent the popover from opening
     * until a call to a backend API completes.
     * 
     * Example definition in parent component:
     * 
     * ```
     * async willOpen(open, cancel) {
     *  try {
     *    await SOME_API_CALL_RESPONSE()
     *    // let the open process continue
     *    open()
     *  } catch (e) {
     *    // cancel the open process
     *    cancel()
     *  }
     * }
     * ```
     */
    willOpen: {
      type: Function,
      default: null
    },
    /**
     * Allows for code execution prior to closing the popover.
     * 
     * Unlike the `before-close` event, this prop prevents
     * the popover from closing until its `close()` callback is called.
     * 
     * A `cancel()` callback can be called as well to cancel
     * the opening process.
     * 
     * For example, this can prevent the popover from closing
     * until a call to a backend API completes.
     * 
     * Example definition in parent component:
     * 
     * ```
     * async willClose(close, cancel) {
     *  try {
     *    await SOME_API_CALL_RESPONSE()
     *    // let the close process continue
     *    close()
     *  } catch (e) {
     *    // cancel the close process
     *    cancel()
     *  }
     * }
     * ```
     */
    willClose: {
      type: Function,
      default: null
    }
  },
  emits: ['open', 'close', 'before-open', 'before-close'],
  data () {
    return {
      timer: null as null | ReturnType<typeof setTimeout>,
      hovered: false,
      isOpening: false,
      isClosing: false
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
        case 'auto':
          return 'w-auto'
        default:
          return 'w-80'
      }
    }
  },
  methods: {
    handlePopperWrapperOpen() {
      this.hovered = true
      /**
       * Emitted when the popover opens.
       */
      this.$emit('open')
    },
    handlePopperWrapperClose() {
      this.hovered = false
      /**
       * Emitted when the popover opens.
       */
      this.$emit('close')
    },
    async fireOpen(open: Function) {
      if (this.willOpen) {
        this.isOpening = true
        this.willOpen(() => {
          if (this.isOpening) {
            open()
            this.isOpening = false
          }
        }, () => {
          this.isOpening = false
          clearTimeout(this.timer as ReturnType<typeof setTimeout>)
        })
      } else {
        open()
      }
    },
    async fireClose(close: Function) {
      if (this.willClose) {
        this.isClosing = true
        this.willClose(() => {
          if (this.isClosing) {
            close()
            this.isClosing = false
          }
        }, () => {
          this.isClosing = false
          clearTimeout(this.timer as ReturnType<typeof setTimeout>)
        })
      } else {
        close()
      }
    },
    handleOpen(open: Function) {
      if (this.disabled) return
      this.isClosing = false
      clearTimeout(this.timer as ReturnType<typeof setTimeout>)
      if (!this.hovered) {
        /**
         * Emitted before openDelay triggers the popover to open.
         */
        this.$emit('before-open')
        this.timer = setTimeout(() => this.fireOpen(open), this.openDelay)
      }
    },
    async handleClose(close: Function) {
      this.isOpening = false
      clearTimeout(this.timer as ReturnType<typeof setTimeout>)
      if (this.hovered) {
        /**
         * Emitted before closeDelay triggers the popover to close.
         */
        this.$emit('before-close')
        this.timer = setTimeout(() => this.fireClose(close), this.closeDelay)
      }
    }
  }
})
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
