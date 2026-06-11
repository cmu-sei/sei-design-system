import type { Ref, ComputedRef } from 'vue'
import type { Axis, AxisDomain, ScaleBand, ScaleLinear, NumberValue } from '@/lib/d3'
import { axisBottom, axisLeft, axisTop, axisRight, format } from '@/lib/d3'

/**
 * Axis direction for D3 axis placement.
 * @type {('bottom' | 'left' | 'top' | 'right')} AxisDirection
 */
export type AxisDirection = 'bottom' | 'left' | 'top' | 'right'

/**
 * Value formatter for D3 axis tick labels.
 * Can be either a D3 format specifier string or a custom formatter function.
 * @type {(string | Function)} ValueFormatter
 */
export type ValueFormatter = string | ((value: number) => string)
export type TickFormatter = (value: AxisDomain) => string

type BandScale = ScaleBand<string>
type LinearScale = ScaleLinear<number, number>
/**
 * Union type of all scale types supported by the chart axis composable.
 *
 * Includes both categorical (band) scales for label axes and linear scales for value axes.
 * @type {(ScaleBand<string> | ScaleLinear<number, number>)} AnyScale
 */
export type AnyScale = BandScale | LinearScale

/**
 * Composable that creates a reactive D3 axis generator for the given scale and direction.
 *
 * When `valueFormat` is provided, applies custom tick formatting.
 * - Pass a D3 format specifier string (e.g., '~s', ',.0f') to use d3.format().
 * - Pass a function `(value: number) => string` for fully custom formatting.
 *
 * Note: Pass `valueFormat` only for numeric (linear scale) axes, not categorical (band) axes.
 *
 * @param {Ref<AnyScale> | ComputedRef<AnyScale>} scale - Reactive D3 scale (ScaleBand<string> or ScaleLinear<number, number>).
 * @param {Ref<AxisDirection> | ComputedRef<AxisDirection>} direction - Axis placement: 'bottom' | 'left' | 'top' | 'right'.
 * @param {Ref<ValueFormatter | undefined> | ComputedRef<ValueFormatter | undefined>} [valueFormat] - Optional reactive format specifier string or formatter function.
 * @param {Ref<number | undefined> | ComputedRef<number | undefined>} [ticks] - Optional reactive target tick count for linear axes.
 *
 * @returns {ComputedRef<Axis<AxisDomain>>} Reactive D3 axis generator configured with the scale, direction, and formatting.
 *
 * @example
 * const xAxis = useChartAxis(
 *   categoryScale,
 *   computed(() => 'bottom')
 * )
 *
 * @example
 * const yAxis = useChartAxis(
 *   valueScale,
 *   computed(() => 'left'),
 *   computed(() => ',.0f'),  // format with comma thousands separator
 *   computed(() => 5)        // target 5 ticks
 * )
 */
export function useChartAxis(
  scale: Ref<AnyScale> | ComputedRef<AnyScale>,
  direction: Ref<AxisDirection> | ComputedRef<AxisDirection>,
  valueFormat?: Ref<ValueFormatter | undefined> | ComputedRef<ValueFormatter | undefined>,
  ticks?: Ref<number | undefined> | ComputedRef<number | undefined>,
  tickFormatter?: Ref<TickFormatter | undefined> | ComputedRef<TickFormatter | undefined>,
  tickValues?: Ref<AxisDomain[] | undefined> | ComputedRef<AxisDomain[] | undefined>,
): ComputedRef<Axis<AxisDomain>> {
  return computed<Axis<AxisDomain>>(() => {
    let axis: Axis<AxisDomain>
    switch (direction.value) {
      case 'bottom':
        axis = axisBottom(scale.value as LinearScale) as unknown as Axis<AxisDomain>
        break
      case 'left':
        axis = axisLeft(scale.value as LinearScale) as unknown as Axis<AxisDomain>
        break
      case 'top':
        axis = axisTop(scale.value as LinearScale) as unknown as Axis<AxisDomain>
        break
      case 'right':
        axis = axisRight(scale.value as LinearScale) as unknown as Axis<AxisDomain>
        break
    }

    // Add comfortable padding between tick marks and labels (default D3 value is 3)
    axis.tickPadding(8)

    // Limit tick count for linear (value) axes to prevent label collisions on resize
    if (ticks?.value != null) {
      ;(axis as Axis<NumberValue>).ticks(ticks.value)
    }

    const values = tickValues?.value
    if (values?.length) {
      ;(axis as Axis<AxisDomain>).tickValues(values)
    }

    const categoricalFormatter = tickFormatter?.value
    if (categoricalFormatter) {
      ;(axis as Axis<AxisDomain>).tickFormat(categoricalFormatter)
      return axis
    }

    const fmt = valueFormat?.value
    if (fmt !== undefined) {
      const numericAxis = axis as Axis<NumberValue>
      const formatter =
        typeof fmt === 'function'
          ? (v: NumberValue) => fmt(typeof v === 'number' ? v : v.valueOf())
          : format(fmt)
      numericAxis.tickFormat(formatter)
    }

    return axis
  })
}