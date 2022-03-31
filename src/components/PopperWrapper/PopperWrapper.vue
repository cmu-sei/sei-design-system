<script lang="ts">
import { defineComponent } from 'vue'
import { createPopper } from '@popperjs/core';
import { Uid } from '@shimyshack/uid'

export default defineComponent({
  name: 'SdsPopperWrapper',
  directives: {
    uid: Uid
  },
  props: {
    /**
     * The popper.js configuration to pass into the component.
     */
    config: {
      type: Object,
      default: () => ({
        placement: 'bottom'
      }),
    },
  },
  emits: ['open', 'close'],
  data() {
    return {
      isOpen: false,
      triggerId: undefined as string | undefined,
      popperId: undefined as string | undefined,
      triggerEl: null as HTMLElement | null,
      popperEl: null as HTMLElement | null,
      popper: null as any
    };
  },
  watch: {
    config() {
      this.destroyPopper()
      this.setupPopper()
    }
  },
  mounted() {
    this.triggerId = `sds-popper-wrapper__trigger-${this.$el.id}`
    this.popperId = `sds-popper-wrapper__popper-${this.$el.id}`
  },
  beforeUnmount() {
    this.destroyPopper()
  },
  methods: {
    open() {
      if (this.isOpen) return;
      this.isOpen = true;
      this.$nextTick(() => {
        this.setupPopper();
        /**
         * Emitted when the popper wrapper opens.
         */
        this.$emit('open');
      });
    },
    close() {
      if (!this.isOpen) return;
      this.isOpen = false;
      /**
       * Emitted when the popper wrapper closes.
       */
      this.$emit('close');
    },
    setupPopper() {
      this.triggerEl = document.querySelector(`#${this.triggerId}`);
      this.popperEl = document.querySelector(`#${this.popperId}`);
      if (this.triggerEl && this.popperEl) {
        if (!this.popper) {
          this.popper = createPopper(this.triggerEl, this.popperEl, this.config);
        } else {
          this.popper.update();
        }
      }
    },
    destroyPopper() {
      if (!this.popper) {
        return;
      }
      this.popper.destroy();
      this.popper = null;
    }
  },
});
</script>

<template>
  <div
    v-uid
    class="inline-block"
  >
    <slot
      :is-open="isOpen"
      :open="open"
      :close="close"
      :trigger-id="triggerId"
      :popper-id="popperId"
    />
  </div>
</template>
