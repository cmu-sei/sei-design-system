<template>
  <nav>
    <a
      v-for="i in items"
      :key="i.id"
      :href="`#${i.id}`"
      data-id="sds-scrollspy"
      :class="{
        [itemClass]: true,
        [activeClass]: activeId === i.id,
        [inactiveClass]: activeId !== i.id
      }"
      @click="parent ? scrollToIdTarget(i.id, $event) : undefined"
    >
      <!-- @slot Default content. Determines the content of the item link. @binding item -->
      <slot :item="i">{{ i.text }}</slot>
    </a>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'SdsScrollspy'
}
</script>

<script setup lang="ts">
import { PropType, watch, ref, computed } from 'vue'

const props = defineProps({
  /**
   * Determines the items list that is observed when the page scrolls.
   * 
   * This accepts an array of objects.
   * 
   * Example object:
   * 
   * `{ id: string, text: string }`
   * 
   * The object's `id` property should be a unique id for an HTML element. For example,
   * if you want the item to observe `<div id="test">`, the `id` would
   * be `test`.
   * 
   * The object's `text` property should be the content of the link that is observing
   * the page.
   */
  items: {
    type: Array as PropType<{ id: string, text: string }[]>,
    default: () => [],
  },
  /**
   * The HTML selector of the container for the element being spied upon.
   */
  parent: { type: String, default: undefined },
  /**
   * Determines the delay before observation begins.
   * 
   * This is useful when you may encounter timing issues in SPAs.
   */
  observeDelay: { type: Number, default: 0 },
  /**
   * Determines the CSS class list for each item.
   */
  itemClass: { type: String, default: '' },
  /**
   * Determines the CSS class list for the active item.
   */
  activeClass: { type: String, default: '' },
  /**
   * Determines the CSS class list for the inactive items.
   */
  inactiveClass: { type: String, default: '' }
})

const observer = ref()
const onScreenIds = ref<string[]>([])
const lastRemovedFromScreenId = ref()

const parentEl = computed<HTMLElement | null>(() => {
  if (typeof document === 'undefined') return null
  return props.parent ? document.querySelector(props.parent) : null
})

const activeId = computed(() => {
  const firstId = props.items.find((i) => onScreenIds.value.includes(i.id))
  if (typeof firstId === 'undefined') {
    return lastRemovedFromScreenId.value
  } else {
    return firstId.id
  }
})

watch(() => props.items, () => {
  setTimeout(() => {
    initObserver()
  }, props.observeDelay)
}, { immediate: true, deep: true })

const initObserver = () => {
  if (typeof IntersectionObserver === 'undefined') return
  destroyObserver()
  observer.value = new IntersectionObserver(onElementObserved, {
    root: parentEl.value
  })
  props.items.forEach((i) => {
    const el = document.getElementById(i.id)
    if (el) {
      observer.value.observe(el)
    }
  })
}

const destroyObserver = () => {
  observer.value && observer.value.disconnect()
  onScreenIds.value = []
  lastRemovedFromScreenId.value = null
  observer.value = null
}

const onElementObserved = (entries: { target: any; isIntersecting: any; }[]) => {
  entries.forEach(({ target, isIntersecting }) => {
    const id = target.getAttribute('id')
    if (isIntersecting) {
      onScreenIds.value.push(id)
      lastRemovedFromScreenId.value = null
    } else {
      onScreenIds.value = onScreenIds.value.filter((i) => i !== id)
      lastRemovedFromScreenId.value = id
    }
  })
}

const scrollToIdTarget = (id: string, event: Event) => {
  if (!parentEl.value) return
  const el = document.getElementById(id)
  if (!el) return
  event.preventDefault();
  parentEl.value.scrollTop = el.offsetTop - parentEl.value.offsetTop
}
</script>
