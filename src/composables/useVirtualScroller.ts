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
  overscan?: MaybeRefOrGetter<number>;
  getKey?: (item: T, index: number) => string | number;
}

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

  const startIndex = computed(() => {
    const firstVisibleIndex = Math.floor(scrollTop.value / itemHeight.value)
    return Math.max(0, firstVisibleIndex - overscan.value)
  })

  const endIndex = computed(() => {
    const lastVisibleIndex = Math.ceil((scrollTop.value + containerHeight.value) / itemHeight.value)
    return Math.min(items.value.length, lastVisibleIndex + overscan.value)
  })

  const virtualItems = computed<VirtualListItem<T>[]>(() => {
    return items.value.slice(startIndex.value, endIndex.value).map((item, offset) => {
      const index = startIndex.value + offset
      return {
        item,
        index,
        key: options.getKey?.(item, index) ?? index,
        offsetTop: index * itemHeight.value,
        height: itemHeight.value
      }
    })
  })

  const setScrollTop = (value: number): void => {
    scrollTop.value = Math.max(0, Math.min(value, Math.max(0, totalHeight.value - containerHeight.value)))
    if (options.containerRef?.value) {
      options.containerRef.value.scrollTop = scrollTop.value
    }
  }

  watchEffect(() => {
    const maxScrollTop = Math.max(0, totalHeight.value - containerHeight.value)
    if (scrollTop.value > maxScrollTop) setScrollTop(maxScrollTop)
  })

  const onScroll = (event: Event): void => {
    const target = event.target as HTMLElement | null
    scrollTop.value = target?.scrollTop ?? 0
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
    startIndex,
    endIndex,
    virtualItems,
    onScroll,
    scrollToIndex,
    setScrollTop
  }
}