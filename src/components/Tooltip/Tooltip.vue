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
        :class="['tooltip rounded-lg p-2 text-xs absolute border-0 text-center font-normal', zIndexClass, variantClass, sizeClass, tooltipClass ? tooltipClass : '']"
      >
        <!-- @slot Tooltip content. -->
        <slot />
        <div
          :class="[variantArrowClass, 'arrow']"
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
  name: 'SdsTooltip',
  components: {
    PopperWrapper
  },
  props: {
    /**
     * The styling for the tooltip.
     */
    tooltipClass: {
      type: String,
      required: false,
      default: ""
    },
    /**
     * Determines the theme color of the component.
     */
    variant: {
      type: String,
      default: 'dark'
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
     * The z-index for the tooltip.
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
      default: 0
    },
    /**
     * Delays closing the toggle in ms.
     */
    closeDelay: {
      type: Number,
      required: false,
      default: 0
    },
    /**
     * The width of the tooltip.
     */
    size: {
      type: String,
      required: false,
      default: 'sm'
    },
    /**
     * The placement of the tooltip on the screen.
     */
    placement: {
      type: String,
      required: false,
      default: 'top'
    },
    /**
     * The strategy of the tooltip on the screen.
     */
    strategy: {
      type: String,
      required: false,
      default: 'absolute'
    },
    /**
     * Determines if the tooltip should display or not.
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Allows for code execution prior to opening the tooltip.
     * 
     * Unlike the `before-open` event, this prop prevents
     * the tooltip from opening until its `open()` callback is called.
     * 
     * A `cancel()` callback can be called as well to cancel
     * the opening process.
     * 
     * For example, this can prevent the tooltip from opening
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
     * Allows for code execution prior to closing the tooltip.
     * 
     * Unlike the `before-close` event, this prop prevents
     * the tooltip from closing until its `close()` callback is called.
     * 
     * A `cancel()` callback can be called as well to cancel
     * the opening process.
     * 
     * For example, this can prevent the tooltip from closing
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
              offset: [0,8]
            },
          },
        ],
        strategy: this.strategy,
      }
    },
    variantClass() {
      switch (this.variant) {
        case 'dark':
          return 'bg-dark text-light'
        case 'light':
          return 'bg-light text-dark'
        default:
          return 'bg-dark text-light'
      }
    },
    variantArrowClass() {
      switch (this.variant) {
        case 'dark':
          return 'before:bg-dark'
        case 'light':
          return 'before:bg-light'
        default:
          return 'before:bg-dark'
      }
    },
    sizeClass() {
      switch (this.size) {
        case 'sm':
          return 'w-32'
        case 'md':
          return 'w-48'
        case 'lg':
          return 'w-56'
        case 'xl':
          return 'w-72'
        case 'auto':
          return 'w-auto'
        default:
          return 'w-56'
      }
    }
  },
  methods: {
    handlePopperWrapperOpen() {
      this.hovered = true
      /**
       * Emitted when the tooltip opens.
       */
      this.$emit('open')
    },
    handlePopperWrapperClose() {
      this.hovered = false
      /**
       * Emitted when the tooltip opens.
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
         * Emitted before openDelay triggers the tooltip to open.
         *
         * This event is overridden by the beforeOpen prop.
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
         * Emitted before closeDelay triggers the tooltip to close.
         */
        this.$emit('before-close')
        this.timer = setTimeout(() => this.fireClose(close), this.closeDelay)
      }
    }
  }
})
</script>

<style scoped>
.arrow,
.arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
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

.tooltip[data-popper-placement^='top'] > .arrow {
  box-shadow: rgb(0 0 0 / 15%) 0 -4px 6px 0;
  bottom: -4px;
}

.tooltip[data-popper-placement^='bottom'] > .arrow {
  box-shadow: rgb(0 0 0 / 15%) 0 4px 6px 0;
  top: -4px;
}

.tooltip[data-popper-placement^='left'] > .arrow {
  box-shadow: rgb(0 0 0 / 15%) -4px 4px 6px 0;
  right: -0px;
}

.tooltip[data-popper-placement^='right'] > .arrow {
  box-shadow: rgb(0 0 0 / 15%) 4px 4px 6px 0;
  left: -8px;
}
</style>
