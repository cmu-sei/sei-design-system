import { describe, it, expect } from 'vitest'
import { getAvatarGroupMaskAlign, getAvatarGroupMaskSpec } from './avatarGroupMask'

describe('getAvatarGroupMaskAlign', () => {
  it('returns "99% 50%"', () => {
    expect(getAvatarGroupMaskAlign()).toBe('99% 50%')
  })
})

describe('getAvatarGroupMaskSpec', () => {
  describe('circle shape', () => {
    it('generates correct mask for xs size with default density and forge theme', () => {
      const mask = getAvatarGroupMaskSpec('circle', 'xs', 'default', 'forge')
      expect(mask).toContain('circle cx="996" cy="500" r="13.5"')
      expect(mask).toContain('linear-gradient(#fff, #fff)')
    })

    it('generates correct mask for xs size with condensed density and forge theme', () => {
      const mask = getAvatarGroupMaskSpec('circle', 'xs', 'condensed', 'forge')
      expect(mask).toContain('circle cx="989" cy="500" r="13.5"')
    })

    it('generates correct mask for sm size with default density and forge theme', () => {
      const mask = getAvatarGroupMaskSpec('circle', 'sm', 'default', 'forge')
      expect(mask).toContain('circle cx="1000" cy="500" r="17"')
    })

    it('generates correct mask for sm size with condensed density and forge theme', () => {
      const mask = getAvatarGroupMaskSpec('circle', 'sm', 'condensed', 'forge')
      expect(mask).toContain('circle cx="992" cy="500" r="17"')
    })

    it('generates correct mask for md size with default density and forge theme', () => {
      const mask = getAvatarGroupMaskSpec('circle', 'md', 'default', 'forge')
      expect(mask).toContain('circle cx="1000" cy="500" r="26"')
    })

    it('generates correct mask for md size with condensed density and forge theme', () => {
      const mask = getAvatarGroupMaskSpec('circle', 'md', 'condensed', 'forge')
      expect(mask).toContain('circle cx="988" cy="500" r="26"')
    })

    it('returns a circle SVG (not a rect) for circle shape', () => {
      const mask = getAvatarGroupMaskSpec('circle', 'md', 'default', 'forge')
      expect(mask).toContain('<circle')
      expect(mask).not.toContain('<rect')
    })

    it('uses forge theme by default when no theme is supplied', () => {
      const withDefault = getAvatarGroupMaskSpec('square', 'md', 'default')
      const withForge = getAvatarGroupMaskSpec('square', 'md', 'default', 'forge')
      expect(withDefault).toBe(withForge)
    })
  })

  describe('square shape', () => {
    it('generates correct mask for xs size with default density and forge theme', () => {
      const mask = getAvatarGroupMaskSpec('square', 'xs', 'default', 'forge')
      expect(mask).toContain('rect x="983" y="487" width="26" height="26" rx="4"')
    })

    it('generates correct mask for xs size with condensed density and forge theme', () => {
      const mask = getAvatarGroupMaskSpec('square', 'xs', 'condensed', 'forge')
      expect(mask).toContain('rect x="976" y="487" width="26" height="26" rx="4"')
    })

    it('generates correct mask for xs size with default density and plaid theme (rx="0")', () => {
      const mask = getAvatarGroupMaskSpec('square', 'xs', 'default', 'plaid')
      expect(mask).toContain('rect x="983" y="487" width="26" height="26" rx="0"')
    })

    it('generates correct mask for sm size with default density and forge theme', () => {
      const mask = getAvatarGroupMaskSpec('square', 'sm', 'default', 'forge')
      expect(mask).toContain('rect x="983" y="483" width="34" height="34" rx="4"')
    })

    it('generates correct mask for sm size with condensed density and forge theme', () => {
      const mask = getAvatarGroupMaskSpec('square', 'sm', 'condensed', 'forge')
      expect(mask).toContain('rect x="975" y="483" width="34" height="34" rx="4"')
    })

    it('generates correct mask for sm size with plaid theme (rx="0")', () => {
      const mask = getAvatarGroupMaskSpec('square', 'sm', 'default', 'plaid')
      expect(mask).toContain('rect x="983" y="483" width="34" height="34" rx="0"')
    })

    it('generates correct mask for md size with default density and forge theme', () => {
      const mask = getAvatarGroupMaskSpec('square', 'md', 'default', 'forge')
      expect(mask).toContain('rect x="975" y="475" width="50" height="50" rx="6"')
    })

    it('generates correct mask for md size with condensed density and forge theme', () => {
      const mask = getAvatarGroupMaskSpec('square', 'md', 'condensed', 'forge')
      expect(mask).toContain('rect x="963" y="475" width="50" height="50" rx="6"')
    })

    it('generates correct mask for md size with plaid theme (rx="0")', () => {
      const mask = getAvatarGroupMaskSpec('square', 'md', 'default', 'plaid')
      expect(mask).toContain('rect x="975" y="475" width="50" height="50" rx="0"')
    })

    it('returns a rect SVG (not a circle) for square shape', () => {
      const mask = getAvatarGroupMaskSpec('square', 'md', 'default', 'forge')
      expect(mask).toContain('<rect')
      expect(mask).not.toContain('<circle')
    })
  })

  describe('SVG structure', () => {
    it('includes a valid SVG data URI', () => {
      const mask = getAvatarGroupMaskSpec('circle', 'md', 'default', 'forge')
      expect(mask).toContain('data:image/svg+xml,')
      expect(mask).toContain('<svg viewBox="0 0 1000 1000"')
    })

    it('includes a linear-gradient fallback', () => {
      const mask = getAvatarGroupMaskSpec('square', 'sm', 'condensed', 'plaid')
      expect(mask).toContain('linear-gradient(#fff, #fff)')
    })
  })
})
