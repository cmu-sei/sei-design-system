<template>
  <PopperWrapper
    v-slot="{ isOpen, open, close }"
    :config="config"
  >
    <div
      v-on="{
        mouseover: open ? open : {},
        mouseleave: close ? close : {}
      }"
    >
      <span
        data-trigger
        :class="[triggerClass ? triggerClass : 'cursor-pointer tooltip']"
      >
        <!-- @slot Trigger content. -->
        <slot name="trigger" />
      </span>
      <div
        v-show="isOpen"
        id="tooltip"
        data-popper
        :class="[sizeClass, tooltipClass ? tooltipClass : 'popper']"
      >
        <!-- @slot Tooltip content. -->
        <slot />
        <div
          id="arrow"
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
     * The width of the tooltip.
     */
    size: {
      type: String,
      required: false,
      default: 'lg'
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
  }
}
</script>

<style>

#tooltip {
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

#arrow,
#arrow::before {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #111;
}

#arrow {
  visibility: hidden;
}

#arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

#tooltip[data-popper-placement^='top'] > #arrow {
  bottom: -4px;
}

#tooltip[data-popper-placement^='bottom'] > #arrow {
  top: -4px;
}

#tooltip[data-popper-placement^='left'] > #arrow {
  right: -0px;
}

#tooltip[data-popper-placement^='right'] > #arrow {
  left: -8px;
}
</style>
