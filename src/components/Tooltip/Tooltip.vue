<template>
  <PopperWrapper
    v-slot="{ isOpen, open, close, triggerId, popperId }"
    :config="config"
  >
    <div class="inline-block">
      <div
        :id="triggerId"
        :class="[triggerClass ? triggerClass : 'cursor-pointer']"
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
        :class="['tooltip', sizeClass, tooltipClass ? tooltipClass : '']"
      >
        <!-- @slot Tooltip content. -->
        <slot />
        <div
          class="arrow"
          data-popper-arrow
        />
      </div>
    </div>
  </PopperWrapper>
</template>

<script>
import PopperWrapper from "../PopperWrapper/PopperWrapper.vue";

export default {
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
     * The styling for the trigger.
     */
    triggerClass: {
      type: String,
      required: false,
      default: ""
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
     * The width of the tooltip
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
              offset: [0,8]
            },
          },
        ],
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
        default:
          return 'w-56'
      }
    }
  },
  methods: {
    handleOpen(open) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        /**
         * Emitted when the tooltip opens.
         */
        this.$emit('open')
        open()
      }, this.openDelay)
    },
    handleClose(close) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        /**
         * Emitted when the tooltip closes.
         */
        this.$emit('close')
        close()
      }, this.closeDelay)
    }
  }
}
</script>

<style scoped>
.tooltip {
  width: auto;
  background-color: #111;
  color: #fff;
  text-align: center;
  padding: 12px;
  display: inline-block;
  border-radius: 3px;
  position: absolute;
  font-size: 13px;
  font-weight: normal;
  border: none;
  z-index: 200000;
  box-shadow: rgb(58, 58, 58) 0 0 6px 0;
}

.arrow,
.arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #111;
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
  bottom: -4px;
}

.tooltip[data-popper-placement^='bottom'] > .arrow {
  top: -4px;
}

.tooltip[data-popper-placement^='left'] > .arrow {
  right: -0px;
}

.tooltip[data-popper-placement^='right'] > .arrow {
  left: -8px;
}
</style>
