import { computed, ref, toValue, watchEffect, type MaybeRefOrGetter, type Ref } from 'vue'
import { useResizeObserver } from './useResizeObserver'

export type VirtualScrollAlignment = 'start' | 'center' | 'end' | 'auto'

export interface VirtualListItem<T> {
  item: T;
  index: number;
  key: string | number;
  offsetTop: number;
  height: number;
}

interface UseVirtualScrollerOptions<T> {
  items: MaybeRefOrGetter<readonly T[]>;
  itemHeight: MaybeRefOrGetter<number>;
  containerRef?: Ref<HTMLElement | undefined>;
  containerHeight?: MaybeRefOrGetter<number | undefined>;
  scrollOffset?: MaybeRefOrGetter<number | undefined>;
  maxScrollHeight?: MaybeRefOrGetter<number | undefined>;
  overscan?: MaybeRefOrGetter<number>;
  getKey?: (item: T, index: number) => string | number;
}

const DEFAULT_MAX_SCROLL_HEIGHT = 10000000

/**
 * Calculates a fixed-height virtual scrolling window for large lists.
 * @param options - Items, row sizing, and optional scroll container details.
 * @returns Virtual rows, total size metadata, and scroll helpers.
 */
export function useVirtualScroller<T>(options: UseVirtualScrollerOptions<T>) {
  const scrollTop = ref(0)
  const measuredContainerHeight = ref(0)

  const itemHeight = computed(() => Math.max(1, toValue(options.itemHeight)))
  const overscan = computed(() => Math.max(0, toValue(options.overscan) ?? 0))
  const items = computed(() => [...toValue(options.items)])
  const scrollOffset = computed(() => Math.max(0, toValue(options.scrollOffset) ?? 0))
  const maxScrollHeight = computed(() => Math.max(containerHeight.value, toValue(options.maxScrollHeight) ?? DEFAULT_MAX_SCROLL_HEIGHT))

  if (options.containerRef) {
    useResizeObserver(options.containerRef, (entry) => {
      measuredContainerHeight.value = entry.contentRect.height
    })
  }

  watchEffect(() => {
    const configuredHeight = toValue(options.containerHeight)
    if (configuredHeight !== undefined) {
      measuredContainerHeight.value = configuredHeight
      return
    }

    if (options.containerRef?.value) {
      measuredContainerHeight.value = options.containerRef.value.clientHeight
    }
  })

  const containerHeight = computed(() => Math.max(0, measuredContainerHeight.value))
  const totalHeight = computed(() => items.value.length * itemHeight.value)
  const scrollHeight = computed(() => Math.min(totalHeight.value, maxScrollHeight.value))
  const maxScrollTop = computed(() => Math.max(0, totalHeight.value - containerHeight.value))
  const maxPhysicalScrollTop = computed(() => Math.max(0, scrollHeight.value - containerHeight.value))

  const toPhysicalScrollTop = (value: number): number => {
    if (maxScrollTop.value === 0 || maxPhysicalScrollTop.value === 0) return 0
    return value / maxScrollTop.value * maxPhysicalScrollTop.value
  }

  const toVirtualScrollTop = (value: number): number => {
    if (maxPhysicalScrollTop.value === 0) return 0
    return value / maxPhysicalScrollTop.value * maxScrollTop.value
  }

  const startIndex = computed(() => {
    const firstVisibleIndex = Math.floor(scrollTop.value / itemHeight.value)
    return Math.max(0, firstVisibleIndex - overscan.value)
  })

  const endIndex = computed(() => {
    const lastVisibleIndex = Math.ceil((scrollTop.value + containerHeight.value) / itemHeight.value)
    return Math.min(items.value.length, lastVisibleIndex + overscan.value)
  })

  const virtualItems = computed<VirtualListItem<T>[]>(() => {
    const physicalScrollTop = toPhysicalScrollTop(scrollTop.value)
    return items.value.slice(startIndex.value, endIndex.value).map((item, offset) => {
      const index = startIndex.value + offset
      const virtualOffsetTop = index * itemHeight.value
      return {
        item,
        index,
        key: options.getKey?.(item, index) ?? index,
        offsetTop: physicalScrollTop + virtualOffsetTop - scrollTop.value,
        height: itemHeight.value
      }
    })
  })

  const setScrollTop = (value: number): void => {
    scrollTop.value = Math.max(0, Math.min(value, maxScrollTop.value))
    if (options.containerRef?.value) {
      options.containerRef.value.scrollTop = toPhysicalScrollTop(scrollTop.value) + scrollOffset.value
    }
  }

  watchEffect(() => {
    if (scrollTop.value > maxScrollTop.value) setScrollTop(maxScrollTop.value)
  })

  const onScroll = (event: Event): void => {
    const target = event.target as HTMLElement | null
    const physicalScrollTop = Math.max(0, Math.min((target?.scrollTop ?? 0) - scrollOffset.value, maxPhysicalScrollTop.value))
    scrollTop.value = toVirtualScrollTop(physicalScrollTop)
  }

  const scrollToIndex = (index: number, align: VirtualScrollAlignment = 'auto'): void => {
    if (index < 0 || index >= items.value.length) return

    const itemTop = index * itemHeight.value
    const itemBottom = itemTop + itemHeight.value
    const viewportTop = scrollTop.value
    const viewportBottom = viewportTop + containerHeight.value

    if (align === 'auto' && itemTop >= viewportTop && itemBottom <= viewportBottom) return

    if (align === 'center') {
      setScrollTop(itemTop - (containerHeight.value - itemHeight.value) / 2)
      return
    }

    if (align === 'end' || (align === 'auto' && itemBottom > viewportBottom)) {
      setScrollTop(itemBottom - containerHeight.value)
      return
    }

    setScrollTop(itemTop)
  }

  return {
    scrollTop,
    containerHeight,
    totalHeight,
    scrollHeight,
    startIndex,
    endIndex,
    virtualItems,
    onScroll,
    scrollToIndex,
    setScrollTop
  }
}