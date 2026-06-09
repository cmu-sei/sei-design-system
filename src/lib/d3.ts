/**
 * Re-exported D3 types used by chart composables and components.
 * @see {@link https://d3js.org} D3.js documentation
 */
export type {
  /** D3 pie arc datum with computed angle values. */
  PieArcDatum,
  /** D3 band scale for categorical axes. */
  ScaleBand,
  /** D3 linear scale for numeric axes. */
  ScaleLinear,
  /** Numeric value type alias used by D3. */
  NumberValue,
  /** D3 axis generator. */
  Axis,
  /** D3 axis domain type. */
  AxisDomain,
  /** D3 stack series data. */
  Series,
  /** Individual point in a D3 stack series. */
  SeriesPoint,
} from 'd3'

/**
 * Re-exported D3 functions used by chart composables.
 * These provide a cleaner import path than importing directly from 'd3'.
 * @see {@link https://d3js.org} D3.js documentation
 */
export {
  pie,
  arc,
  scaleBand,
  scaleLinear,
  axisBottom,
  axisLeft,
  axisTop,
  axisRight,
  select,
  stack,
  stackOrderNone,
  stackOffsetNone,
  max,
  min,
  format,
  easeCubicOut,
} from 'd3'