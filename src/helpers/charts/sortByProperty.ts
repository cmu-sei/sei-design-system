export type SortOrder = 'asc' | 'desc' | 'alpha'

/**
 * Sorts an array of objects by a specified property in ascending, descending, or alphabetical order.
 * Returns a new sorted array without mutating the original.
 *
 * @template T - The type of objects in the array
 * @param data - The array of objects to sort
 * @param property - The object property key to sort by
 * @param order - Sort direction: 'asc' (ascending), 'desc' (descending), or 'alpha' (alphabetical). @default 'asc'
 * @returns A new sorted array
 *
 * @example
 * // Numeric sort descending
 * sortByProperty(items, 'value', 'desc')
 *
 * @example
 * // Alphabetical sort
 * sortByProperty(items, 'label', 'alpha')
 */
export function sortByProperty<T>(data: T[], property: keyof T, order: SortOrder = 'asc'): T[] {
  return [...data].sort((a, b) => {
    const valA = a[property]
    const valB = b[property]

    if (order === 'alpha') {
      return String(valA).localeCompare(String(valB))
    }

    if (valA < valB) return order === 'asc' ? -1 : 1
    if (valA > valB) return order === 'asc' ? 1 : -1
    return 0
  })
}