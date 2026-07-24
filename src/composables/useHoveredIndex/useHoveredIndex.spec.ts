import { useHoveredIndex } from './index'
import { describe, it, expect } from 'vitest'

describe('useHoveredIndex', () => {
  it('starts with a null hovered index', () => {
    const { hoveredIndex } = useHoveredIndex()
    expect(hoveredIndex.value).toBeNull()
  })

  it('updates hovered index through setHovered', () => {
    const { hoveredIndex, setHovered } = useHoveredIndex()

    setHovered(3)
    expect(hoveredIndex.value).toBe(3)

    setHovered(null)
    expect(hoveredIndex.value).toBeNull()
  })
})