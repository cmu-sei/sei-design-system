/**
 * Converts a pixel value to rem units.
 * @param px - The pixel value to convert.
 * @param base - The base font size in pixels (default is 16).
 * @param decimals - The number of decimal places to include in the result (default is 0).
 * @returns The value in rem units as a number.
 */
export default function pxToRem(px: number, base = 16, decimals = 0): string {
  return (px / base).toFixed(decimals)
}