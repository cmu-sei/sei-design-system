/**
 * Monochromatic blue color scheme (12 shades from light to dark).
 * Used as the base for categorical color palettes and dark mode variants.
 * CSS custom properties are used for dynamic theming support.
 * @const
 */
export const monochromeColorScheme = Object.freeze([
  'var(--color-white)',
  'var(--color-blue-25)',
  'var(--color-blue-50)',
  'var(--color-blue-100)',
  'var(--color-blue-200)',
  'var(--color-blue-300)',
  'var(--color-blue-400)',
  'var(--color-blue-500)',
  'var(--color-blue-600)',
  'var(--color-blue-700)',
  'var(--color-blue-800)',
  'var(--color-blue-900)',
  'var(--color-blue-950)',
  'var(--color-black)',
] as const)

/**
 * Default categorical color palette for charts.
 * Based on a perceptually distinguishable color scale.
 * @const
 */
export const defaultColors: string[] = monochromeColorScheme.slice(4)

/**
 * Dark-mode categorical color palette — the same range reversed.
 * @const
 */
export const defaultColorsDark: string[] = [...monochromeColorScheme].reverse().slice(4)

/**
 * Heatmap-specific palette with lighter tones (starts from blue-50).
 * This is intentionally separate so only Heatmap defaults are affected.
 * @const
 */
export const heatmapColors: string[] = monochromeColorScheme.slice(2)

/**
 * Dark-mode heatmap palette derived from the same base range.
 * @const
 */
export const heatmapColorsDark: string[] = [...monochromeColorScheme].reverse().slice(2)

/**
 * Default color used for single-series bar charts (blue-600).
 * @const
 */
export const defaultSingleColor = monochromeColorScheme[8] // blue-600

/**
 * Default color used for single-series bar charts in dark mode (blue-300).
 * @const
 */
export const defaultSingleColorDark = monochromeColorScheme[5] // blue-300

/**
 * Resolves a `color` property that is either a plain string or a `{ light, dark }` object
 * to a single color string based on the current dark-mode state.
 */
export function resolveItemColor(
  color: { light: string; dark: string } | string | undefined,
  isDark: boolean,
): string | undefined {
  if (color == null) return undefined
  if (typeof color === 'string') return color
  return isDark ? color.dark : color.light
}

/**
 * Resolves a color for a chart element by index, falling back to the default palette.
 *
 * When an explicit color is provided, it is returned as-is.
 * Otherwise, the color is determined by the palette based on the index and dark mode state.
 * If a ChartConfig with color overrides is provided, those take precedence over the default palettes.
 *
 * @param color - Optional explicit color string. If provided, this is returned immediately.
 * @param index - Index into the palette used to select a color when `color` is undefined.
 * @param isDark - Whether to use the dark-mode palette. @default false
 * @param config - Optional ChartConfig containing color overrides.
 * @returns The resolved color string from either the explicit color, palette, or fallback.
 *
 * @example
 * // Use palette color at index 0
 * resolveColor(undefined, 0, false) // returns defaultColors[0]
 *
 * @example
 * // Use dark-mode palette
 * resolveColor(undefined, 2, true) // returns defaultColorsDark[2]
 *
 * @example
 * // Use explicit color (overrides palette)
 * resolveColor('#ff0000', 0, false) // returns '#ff0000'
 */
export function resolveColor(
  color: string | undefined,
  index: number,
  isDark = false,
  config?: { colors?: { light: string[]; dark: string[] } },
): string {
  const palette = isDark
    ? (config?.colors?.dark ?? defaultColorsDark)
    : (config?.colors?.light ?? defaultColors)
  return color ?? palette[index % palette.length] ?? (isDark ? defaultSingleColorDark : defaultSingleColor)
}