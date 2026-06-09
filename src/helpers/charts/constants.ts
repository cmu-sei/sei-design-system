/**
 * Chart margin offsets (pixels) from the SVG container edges.
 * Used to reserve space for axes, labels, and legends.
 * @interface ChartMargin
 * @property {number} top - Top margin in pixels.
 * @property {number} right - Right margin in pixels.
 * @property {number} bottom - Bottom margin in pixels.
 * @property {number} left - Left margin in pixels.
 */
export interface ChartMargin {
  top: number
  right: number
  bottom: number
  left: number
}

/**
 * Default chart margin (pixels) applied when no `margin` prop is provided.
 * Provides equal spacing on all sides (20px).
 * @type {ChartMargin}
 */
export const DEFAULT_MARGIN: ChartMargin = { top: 20, right: 20, bottom: 20, left: 20 }

/**
 * Default margin for bar charts (pixels).
 * Provides extra bottom space (36px) for category-axis labels
 * and extra left space (72px) for value-axis tick labels.
 * @type {ChartMargin}
 */
export const DEFAULT_BAR_MARGIN: ChartMargin = { top: 20, right: 20, bottom: 36, left: 72 }

/**
 * Minimum arc angle (radians) required to render a pie-slice label.
 * Approximately 15 degrees (Math.PI / 12).
 * Angles smaller than this threshold will not display their labels.
 * @type {number}
 * @const
 */
export const MIN_LABEL_ANGLE: number = Math.PI / 12