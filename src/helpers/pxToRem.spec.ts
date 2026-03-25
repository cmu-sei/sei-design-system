import { describe, expect, it } from 'vitest'
import pxToRem from './pxToRem'

describe('pxToRem', () => {
  describe('basic conversion', () => {
    it('converts 16px to 1rem using default base', () => {
      expect(pxToRem(16)).toBe('1')
    })

    it('converts 8px to 0.5rem using default base', () => {
      expect(pxToRem(8, 16, 1)).toBe('0.5')
    })

    it('converts 32px to 2rem using default base', () => {
      expect(pxToRem(32)).toBe('2')
    })

    it('converts 0px to 0rem', () => {
      expect(pxToRem(0)).toBe('0')
    })
  })

  describe('custom base', () => {
    it('converts px using a custom base of 10', () => {
      expect(pxToRem(10, 10)).toBe('1')
    })

    it('converts 20px with base 10 to 2rem', () => {
      expect(pxToRem(20, 10)).toBe('2')
    })
  })

  describe('decimal precision', () => {
    it('rounds to 0 decimal places by default', () => {
      expect(pxToRem(10)).toBe('1')
    })

    it('returns 2 decimal places when decimals is 2', () => {
      expect(pxToRem(10, 16, 2)).toBe('0.63')
    })

    it('returns 4 decimal places when decimals is 4', () => {
      expect(pxToRem(10, 16, 4)).toBe('0.6250')
    })
  })

  describe('return type', () => {
    it('always returns a string', () => {
      expect(typeof pxToRem(16)).toBe('string')
    })
  })
})
