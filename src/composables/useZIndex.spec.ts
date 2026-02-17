import { describe, it, expect } from 'vitest'
import { useZIndex } from './useZIndex'

describe('useZIndex', () => {
  it('should generate correct z-index class for each level', () => {
    const levels = ['0', '10', '20', '30', '40', '50', 'auto'] as const

    levels.forEach(level => {
      const { zIndexClass } = useZIndex(level)
      expect(zIndexClass.value).toBe(`z-${level}`)
    })
  })

  it('should return empty string for empty value', () => {
    const { zIndexClass } = useZIndex('')
    expect(zIndexClass.value).toBe('')
  })

  it('should support reactive values via function', () => {
    const level = ref<'10' | '50'>('10')
    
    const { zIndexClass } = useZIndex(() => level.value)
    expect(zIndexClass.value).toBe('z-10')

    level.value = '50'
    expect(zIndexClass.value).toBe('z-50')
  })

  it('should handle static values', () => {
    const { zIndexClass } = useZIndex('30')
    expect(zIndexClass.value).toBe('z-30')
  })

  it('should handle default value for popover-like components', () => {
    // Simulating common pattern: default z-50 for popovers
    const { zIndexClass } = useZIndex('50')
    expect(zIndexClass.value).toBe('z-50')
  })
})
