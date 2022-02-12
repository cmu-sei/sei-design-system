<script lang="ts">
import { defineComponent } from 'vue'
import { createPopper } from '@popperjs/core';
import uuid from '../../helpers/uuid';

export default defineComponent({
  name: 'SdsPopperWrapper',
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
      triggerEl: null as HTMLElement | null,
      popperEl: null as HTMLElement | null,
      popper: null as any
    };
  },
  computed: {
    triggerId() {
      return `sds-popper-wrapper__trigger-${uuid()}`;
    },
    popperId() {
      return `sds-popper-wrapper__popper-${uuid()}`;
    },
  },
  watch: {
    config() {
      this.destroyPopper()
      this.setupPopper()
    }
  },
  mounted: function mounted() {
    this.triggerEl = document.querySelector(`#${this.triggerId}`);
    this.popperEl = document.querySelector(`#${this.popperId}`);
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
  render() {
    return this.$slots && this.$slots.default && this.$slots.default({
      isOpen: this.isOpen,
      open: this.open,
      close: this.close,
      triggerId: this.triggerId,
      popperId: this.popperId
    });
  },
});
</script>
