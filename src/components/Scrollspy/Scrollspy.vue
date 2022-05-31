<template>
  <div data-id="sds-scrollspy">
    <!-- @slot Scrollspy content. @binding href, active, scrollIntoView -->
    <slot
      :href="href"
      :active="active"
      :scroll-into-view="scrollIntoView"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'SdsScrollspy'
}
</script>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
} from "vue";
import throttle from "../../helpers/throttle";
import mitt from "mitt";

const props = defineProps({
  /**
   * The HTML selector that this scrollspy spies on.
   */
  href: {
    type: String,
    default: null,
  },
  /**
   * The HTML selector of the container for the element being spied upon.
   */
  parent: {
    type: String,
    default: null,
  },
  /**
   * The offset top for more precise control.
   */
  offset: {
    type: Number,
    default: 0,
  },
  /**
   * The throttle used to help with scroll performance.
   */
  throttle: {
    type: Number,
    default: 250,
  },
})

const emitter = mitt();
emitter.on("scrollspy-href", (value) => {
  active.value = value === props.href;
});

const active = ref(false);

const parentEl = computed(() => {
  if (!document || !window) return;
  return props.parent === null
    ? window
    : document.querySelector(props.parent);
});

const el = computed(() => {
  if (!document) return;
  return document.querySelector(props.href);
});

onMounted(() => {
  (
    parentEl.value as (Window & typeof globalThis) | HTMLElement
  ).addEventListener("scroll", throttleScroll);
  handleScroll();
});

onUnmounted(() => {
  (
    parentEl.value as (Window & typeof globalThis) | HTMLElement
  ).removeEventListener("scroll", throttleScroll);
});

const handleScroll = () => {
  if (el.value === null) return;

  const parentElTop =
    props.parent !== null
      ? (parentEl.value as HTMLElement).getBoundingClientRect().top
      : 0;
  const parentElHeight =
    props.parent !== null
      ? (parentEl.value as HTMLElement).getBoundingClientRect().height
      : 0;
  const parentElMiddle = parentElHeight / 2;

  const elTop =
    (el.value as HTMLElement).getBoundingClientRect().top -
    parentElTop -
    props.offset;

  if (elTop <= parentElMiddle) {
    emitter.emit("scrollspy-href", props.href);
  }
};

const throttleScroll = throttle(handleScroll, props.throttle);

const scrollIntoView = (e: MouseEvent) => {
  e.preventDefault();
  if (parentEl.value === null) return;
  if (el.value === null) return;
  (parentEl.value as (Window & typeof globalThis) | Element).scrollTo({
    top: (el.value as HTMLElement).offsetTop - props.offset,
    behavior: "smooth",
  });
};
</script>
