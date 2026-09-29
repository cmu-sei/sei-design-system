/**
 * Whether rendered chart items use more than one distinct color.
 * @param items - Rendered items with resolved colors.
 * @returns True when at least two items have different colors.
 */
export function hasMultipleColors(items: readonly { color?: string }[]): boolean {
  return items.length > 1 && items.some((item) => item.color !== items[0]?.color)
}
