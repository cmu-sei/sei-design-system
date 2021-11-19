<script>
import { createPopper } from '@popperjs/core';
import uuid from '../../helpers/uuid';

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
};
</script>
