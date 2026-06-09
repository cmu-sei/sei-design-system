import type { InjectionKey } from 'vue'

/**
 * Chart-wide configuration for color palettes and dark-mode state.
 * Injected via `provideChartConfig()` for use by all descendant chart components.
 * @interface ChartConfig
 * @property {Object} [colors] - Override the default color palettes.
 * @property {string[]} colors.light - Color palette for light mode.
 * @property {string[]} colors.dark - Color palette for dark mode.
 * @property {Ref<boolean>} [isDarkMode] - Override the dark-mode reactive flag. Useful for scoped dark-mode previews.
 */
export interface ChartConfig {
  /**
   * Override the color palettes used by all charts.
   * `light` is used in light mode, `dark` in dark mode.
   */
  colors?: { light: string[]; dark: string[] }
  /**
   * Override the dark-mode reactive flag. When provided, charts use this instead of
   * the default `useDarkMode()` body-class observer. Useful for scoped dark-mode previews.
   */
  isDarkMode?: Ref<boolean>
}

/**
 * Injection key for chart configuration used by Vue's provide/inject API.
 * @type {InjectionKey<ChartConfig>}
 * @const
 */
export const CHART_CONFIG_KEY: InjectionKey<ChartConfig> = Symbol('chartConfig')

/**
 * Provide chart configuration to all descendant chart components.
 * Call this in a parent component or at the app root to share color palettes and dark-mode settings.
 *
 * @param {ChartConfig} config - Chart configuration object with optional color overrides and dark-mode flag.
 *
 * @example
 * // App-level (main.ts) — set app-wide palette
 * app.provide(CHART_CONFIG_KEY, {
 *   colors: {
 *     light: ['#1f77b4', '#ff7f0e', '#2ca02c', ...],
 *     dark: ['#aec7e8', '#ffbb78', '#98df8a', ...]
 *   }
 * })
 *
 * @example
 * // Component-level — override for a subtree
 * export default {
 *   setup() {
 *     provideChartConfig({
 *       colors: {
 *         light: ['#000', '#333', '#666'],
 *         dark: ['#fff', '#ccc', '#999']
 *       }
 *     })
 *   }
 * }
 */
export function provideChartConfig(config: ChartConfig): void {
  provide(CHART_CONFIG_KEY, config)
}

/**
 * Retrieve the nearest injected ChartConfig from the component hierarchy.
 * Returns an empty object if no ChartConfig has been provided.
 *
 * @returns {ChartConfig} The injected chart configuration, or an empty object if none was provided.
 *
 * @example
 * export default {
 *   setup() {
 *     const config = useChartConfig()
 *     const isDark = config.isDarkMode ?? useDarkMode()
 *     const colors = config.colors?.light ?? defaultColors
 *   }
 * }
 */
export function useChartConfig(): ChartConfig {
  return inject(CHART_CONFIG_KEY, {})
}