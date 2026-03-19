import { describe, it, expect } from 'vitest'
import { getIndicatorMaskSpec, getIndicatorMaskAlign } from './indicatorMask'

describe('getIndicatorMaskAlign', () => {
  it('returns "0 0" for top-left', () => {
    expect(getIndicatorMaskAlign('top-left')).toBe('0 0')
  })

  it('returns "100% 0" for top-right', () => {
    expect(getIndicatorMaskAlign('top-right')).toBe('100% 0')
  })

  it('returns "100% 100%" for bottom-right', () => {
    expect(getIndicatorMaskAlign('bottom-right')).toBe('100% 100%')
  })

  it('returns "0 100%" for bottom-left', () => {
    expect(getIndicatorMaskAlign('bottom-left')).toBe('0 100%')
  })
})

describe('getIndicatorMaskSpec', () => {
  describe('hideIndicator', () => {
    it('returns "none" when hideIndicator is true', () => {
      expect(getIndicatorMaskSpec('md', 'top-right', 'portrait', true)).toBe('none')
    })

    it('returns an SVG mask string when hideIndicator is false', () => {
      const mask = getIndicatorMaskSpec('md', 'top-right', 'portrait', false)
      expect(mask).toContain('url(')
      expect(mask).toContain('data:image/svg+xml,')
    })
  })

  describe('SVG structure', () => {
    it('includes SVG viewBox of 0 0 1000 1000', () => {
      const mask = getIndicatorMaskSpec('md', 'top-right', 'circle', false)
      expect(mask).toContain('<svg viewBox="0 0 1000 1000"')
    })

    it('includes a circle element in the SVG', () => {
      const mask = getIndicatorMaskSpec('xs', 'top-left', 'circle', false)
      expect(mask).toContain('<circle cx=')
    })

    it('includes a linear-gradient fallback', () => {
      const mask = getIndicatorMaskSpec('sm', 'bottom-right', 'square', false)
      expect(mask).toContain('linear-gradient(#fff, #fff)')
    })
  })

  describe('placementOver circle', () => {
    it('should compute mask for xs size, top-right placement over circle', () => {
      const mask = getIndicatorMaskSpec('xs', 'top-right', 'circle', false)
      // offset = -3, maskRadius = 5 → maskX = 1000 - 5 - (-3) = 998, maskY = 5 + (-3) = 2
      expect(mask).toContain('circle cx="998" cy="2" r="5"')
    })

    it('should compute mask for xs size, top-left placement over circle', () => {
      const mask = getIndicatorMaskSpec('xs', 'top-left', 'circle', false)
      // maskX = 5 + (-3) = 2, maskY = 5 + (-3) = 2
      expect(mask).toContain('circle cx="2" cy="2" r="5"')
    })

    it('should compute mask for sm size, bottom-right placement over circle', () => {
      const mask = getIndicatorMaskSpec('sm', 'bottom-right', 'circle', false)
      // offset = -5, maskRadius = 7.5 → maskX = 1000 - 7.5 - (-5) = 997.5, maskY = 1000 - 7.5 - (-5) = 997.5
      expect(mask).toContain('circle cx="997.5" cy="997.5" r="7.5"')
    })

    it('should compute mask for md size, top-left placement over circle', () => {
      const mask = getIndicatorMaskSpec('md', 'top-left', 'circle', false)
      // offset = -4, maskRadius = 10 → maskX = 10 + (-4) = 6, maskY = 10 + (-4) = 6
      expect(mask).toContain('circle cx="6" cy="6" r="10"')
    })

    it('should compute mask for lg size, bottom-left placement over circle', () => {
      const mask = getIndicatorMaskSpec('lg', 'bottom-left', 'circle', false)
      // offset = -7, maskRadius = 15 → maskX = 15 + (-7) = 8, maskY = 1000 - 15 - (-7) = 992
      expect(mask).toContain('circle cx="8" cy="992" r="15"')
    })

    it('should compute mask for xl size, top-right placement over circle', () => {
      const mask = getIndicatorMaskSpec('xl', 'top-right', 'circle', false)
      // offset = -8, maskRadius = 19.5 → maskX = 1000 - 19.5 - (-8) = 988.5, maskY = 19.5 + (-8) = 11.5
      expect(mask).toContain('circle cx="988.5" cy="11.5" r="19.5"')
    })

    it('should compute mask for 2xl size, bottom-right placement over circle', () => {
      const mask = getIndicatorMaskSpec('2xl', 'bottom-right', 'circle', false)
      // offset = 1, maskRadius = 25 → maskX = 1000 - 25 - 1 = 974, maskY = 1000 - 25 - 1 = 974
      expect(mask).toContain('circle cx="974" cy="974" r="25"')
    })
  })

  describe('placementOver square', () => {
    it('should compute mask for xs size, top-right placement over square', () => {
      const mask = getIndicatorMaskSpec('xs', 'top-right', 'square', false)
      // offset = -2, maskRadius = 5 → maskX = 1000 - 5/2 - (-2) = 999.5, maskY = 5/2 + (-2) = 0.5
      expect(mask).toContain('circle cx="999.5" cy="0.5" r="5"')
    })

    it('should compute mask for md size, bottom-left placement over square', () => {
      const mask = getIndicatorMaskSpec('md', 'bottom-left', 'square', false)
      // offset = -4, maskRadius = 10 → maskX = 10/2 + (-4) = 1, maskY = 1000 - 10/2 - (-4) = 999
      expect(mask).toContain('circle cx="1" cy="999" r="10"')
    })

    it('should compute mask for lg size, bottom-right placement over square', () => {
      const mask = getIndicatorMaskSpec('lg', 'bottom-right', 'square', false)
      // offset = -4, maskRadius = 15 → maskX = 1000 - 15/2 - (-4) = 996.5, maskY = 1000 - 15/2 - (-4) = 996.5
      expect(mask).toContain('circle cx="996.5" cy="996.5" r="15"')
    })
  })

  describe('placementOver portrait', () => {
    it('should compute mask for xs size, top-left placement over portrait', () => {
      const mask = getIndicatorMaskSpec('xs', 'top-left', 'portrait', false)
      // offset = -2, maskRadius = 5 → maskX = 5/2 + (-2) = 0.5, maskY = 5/2 + (-2) = 0.5
      expect(mask).toContain('circle cx="0.5" cy="0.5" r="5"')
    })

    it('should compute mask for md size, top-right placement over portrait', () => {
      const mask = getIndicatorMaskSpec('md', 'top-right', 'portrait', false)
      // offset = -4, maskRadius = 10 → maskX = 1000 - 10/2 - (-4) = 999, maskY = 10/2 + (-4) = 1
      expect(mask).toContain('circle cx="999" cy="1" r="10"')
    })

    it('should compute mask for 2xl size, bottom-left placement over portrait', () => {
      const mask = getIndicatorMaskSpec('2xl', 'bottom-left', 'portrait', false)
      // offset = -2, maskRadius = 25 → maskX = 25/2 + (-2) = 10.5, maskY = 1000 - 25/2 - (-2) = 989.5
      expect(mask).toContain('circle cx="10.5" cy="989.5" r="25"')
    })
  })
})
