/**
 * Formats a numeric value as a percentage string with appropriate rounding.
 *
 * Rounds to the nearest hundredth (2 decimal places) and displays:
 * - Whole numbers without decimals (e.g., "42%")
 * - One decimal place for fractional values (e.g., "42.5%")
 * - The string "—%" for non-finite values (Infinity, -Infinity, NaN)
 *
 * @param v - The numeric value to format. Can be any number including decimals.
 * @returns A formatted percentage string with the '%' symbol.
 *
 * @example
 * formatPercent(0.42) // "42%"
 * @example
 * formatPercent(0.425) // "42.5%"
 * @example
 * formatPercent(1) // "100%"
 * @example
 * formatPercent(NaN) // "—%"
 * @example
 * formatPercent(Infinity) // "—%"
 */
export function formatPercent(v: number): string {
  if (!isFinite(v)) return '—%'
  const rounded = Math.round(v * 100) / 100
  const formatted = rounded % 1 === 0 ? String(rounded) : rounded.toFixed(1)
  return `${formatted}%`
}