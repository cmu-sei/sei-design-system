<template>
  <div>
    <!-- @slot Popper wrapper content. @binding isOpen, open, close -->
    <slot
      :is-open="isOpen"
      :open="open"
      :close="close"
    />
  </div>
</template>

<script>
import {createPopper} from '@popperjs/core';

export default {
  name: 'SdsPopperWrapper',
  props: {
    /**
     * The popper.js configuration to pass into the component.
     */
    config: {
      type: Object,
      default: () => ({ placement: 'bottom' }),
    }
  },
  data() {
    return {
      isOpen: false,
      triggerEl: null,
      popperEl: null,
      popper: null,
    };
  },
  watch: {
    config() {
      this.destroyPopper()
      this.setupPopper()
    }
  },
  mounted: function mounted() {
    this.triggerEl = document.querySelector('[data-trigger]');
    this.popperEl = document.querySelector('[data-popper]');
  },
  beforeUnmount() {
    this.destroyPopper()
  },
  methods: {
    open() {
      if (this.isOpen) {
        return;
      }
      this.isOpen = true;
      this.$nextTick(() => {
        this.setupPopper();
      });
    },
    close() {
      if (!this.isOpen) {
        return;
      }
      this.isOpen = false;
    },
    setupPopper() {
      if (!this.popper) {
        this.popper = new createPopper(this.triggerEl, this.popperEl, this.config);
      } else {
        this.popper.update();
      }
    },
    destroyPopper() {
      if (!this.popper) {
        return;
      }
      this.popper.destroy();
      this.popper = null;
    }
  }
};
</script>
