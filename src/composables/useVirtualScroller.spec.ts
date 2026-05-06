import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useVirtualScroller } from './useVirtualScroller'

describe('useVirtualScroller', () => {
  it('returns only the visible window plus overscan rows', () => {
    const items = ref(Array.from({ length: 100 }, (_, index) => `Item ${index}`))
    const virtualScroller = useVirtualScroller({
      items,
      itemHeight: 20,
      containerHeight: 100,
      overscan: 1
    })

    expect(virtualScroller.totalHeight.value).toBe(2000)
    expect(virtualScroller.startIndex.value).toBe(0)
    expect(virtualScroller.endIndex.value).toBe(6)
    expect(virtualScroller.virtualItems.value.map(item => item.index)).toEqual([0, 1, 2, 3, 4, 5])

    virtualScroller.setScrollTop(200)

    expect(virtualScroller.startIndex.value).toBe(9)
    expect(virtualScroller.endIndex.value).toBe(16)
    expect(virtualScroller.virtualItems.value[0]).toMatchObject({
      item: 'Item 9',
      index: 9,
      offsetTop: 180,
      height: 20
    })
  })

  it('scrolls indexes into view using alignment rules', () => {
    const virtualScroller = useVirtualScroller({
      items: Array.from({ length: 20 }, (_, index) => index),
      itemHeight: 10,
      containerHeight: 50,
      overscan: 0
    })

    virtualScroller.scrollToIndex(10, 'start')
    expect(virtualScroller.scrollTop.value).toBe(100)

    virtualScroller.scrollToIndex(12, 'end')
    expect(virtualScroller.scrollTop.value).toBe(80)

    virtualScroller.scrollToIndex(10, 'center')
    expect(virtualScroller.scrollTop.value).toBe(80)
  })

  it('updates scrollTop from scroll events', () => {
    const virtualScroller = useVirtualScroller({
      items: ['A', 'B', 'C'],
      itemHeight: 10,
      containerHeight: 20
    })
    const target = document.createElement('div')
    target.scrollTop = 10

    virtualScroller.onScroll(new Event('scroll', { bubbles: true, cancelable: true, composed: true }))
    expect(virtualScroller.scrollTop.value).toBe(0)

    virtualScroller.onScroll({ target } as unknown as Event)
    expect(virtualScroller.scrollTop.value).toBe(10)
  })
})
