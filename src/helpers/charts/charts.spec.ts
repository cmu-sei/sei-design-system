import { describe, expect, it } from 'vitest'
import {
  BAND_PADDING,
  DEFAULT_BAR_CHART_MARGIN,
  DEFAULT_CHART_MARGIN,
  MIN_LABEL_ANGLE,
  defaultColors,
  defaultSingleColor,
  formatPercent,
  resolveColor,
  resolveItemColor,
  sortByProperty,
} from './index'
import { defaultColorsDark, defaultSingleColorDark, lineChartColorValues } from './colors'

interface SortableItem {
  label: string
  value: number
}

describe('helpers/charts', () => {
  describe('formatPercent', () => {
    it('formats whole-number percentages without decimals', () => {
      expect(formatPercent(42)).toBe('42%')
    })

    it('formats decimal percentages to one decimal place after rounding', () => {
      expect(formatPercent(42.44)).toBe('42.4%')
    })

    it('returns em-dash percent for non-finite values', () => {
      expect(formatPercent(Number.NaN)).toBe('—%')
      expect(formatPercent(Number.POSITIVE_INFINITY)).toBe('—%')
      expect(formatPercent(Number.NEGATIVE_INFINITY)).toBe('—%')
    })
  })

  describe('sortByProperty', () => {
    const items: SortableItem[] = [
      { label: 'Charlie', value: 3 },
      { label: 'Alpha', value: 1 },
      { label: 'Bravo', value: 2 },
    ]

    it('sorts by numeric property ascending by default without mutating the input', () => {
      const sorted = sortByProperty(items, 'value')

      expect(sorted.map(({ value }) => value)).toEqual([1, 2, 3])
      expect(items.map(({ value }) => value)).toEqual([3, 1, 2])
    })

    it('sorts by numeric property descending', () => {
      const sorted = sortByProperty(items, 'value', 'desc')
      expect(sorted.map(({ value }) => value)).toEqual([3, 2, 1])
    })

    it('sorts by alpha order using string comparison', () => {
      const sorted = sortByProperty(items, 'label', 'alpha')
      expect(sorted.map(({ label }) => label)).toEqual(['Alpha', 'Bravo', 'Charlie'])
    })
  })

  describe('resolveItemColor', () => {
    it('returns undefined when no color is provided', () => {
      expect(resolveItemColor(undefined, false)).toBeUndefined()
    })

    it('returns a plain string color as-is', () => {
      expect(resolveItemColor('var(--color-blue-400)', true)).toBe('var(--color-blue-400)')
    })

    it('resolves light and dark object colors based on mode', () => {
      const color = { light: 'var(--color-blue-300)', dark: 'var(--color-blue-700)' }

      expect(resolveItemColor(color, false)).toBe('var(--color-blue-300)')
      expect(resolveItemColor(color, true)).toBe('var(--color-blue-700)')
    })
  })

  describe('resolveColor', () => {
    it('returns the explicit color when provided', () => {
      expect(resolveColor('#123456', 0)).toBe('#123456')
    })

    it('selects colors from the default light and dark palettes using modulo index', () => {
      expect(resolveColor(undefined, 0, false)).toBe(defaultColors[0])
      expect(resolveColor(undefined, defaultColors.length + 1, false)).toBe(defaultColors[1])
      expect(resolveColor(undefined, 0, true)).toBe(defaultColorsDark[0])
    })

    it('uses configured color palettes when provided', () => {
      const config = {
        colors: {
          light: ['light-a', 'light-b'],
          dark: ['dark-a', 'dark-b'],
        },
      }

      expect(resolveColor(undefined, 1, false, config)).toBe('light-b')
      expect(resolveColor(undefined, 2, true, config)).toBe('dark-a')
    })

    it('falls back to single-series defaults when configured palettes are empty', () => {
      const emptyConfig = { colors: { light: [], dark: [] } }

      expect(resolveColor(undefined, 0, false, emptyConfig)).toBe(defaultSingleColor)
      expect(resolveColor(undefined, 0, true, emptyConfig)).toBe(defaultSingleColorDark)
    })
  })

  describe('constants and mappings', () => {
    it('exports expected chart constants', () => {
      expect(BAND_PADDING).toBe(0.1)
      expect(DEFAULT_CHART_MARGIN).toEqual({ top: 20, right: 20, bottom: 20, left: 20 })
      expect(DEFAULT_BAR_CHART_MARGIN).toEqual({ top: 20, right: 20, bottom: 36, left: 72 })
      expect(MIN_LABEL_ANGLE).toBe(Math.PI / 12)
    })

    it('maps known line color classes to css variable values', () => {
      expect(lineChartColorValues['text-blue-400']).toBe('var(--color-blue-400)')
      expect(lineChartColorValues['text-gray-200']).toBe('var(--color-gray-200)')
    })
  })
})
