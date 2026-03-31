import type { MobileMenuItem } from '../components/MobileMenu/MobileMenu.vue'

/**
 * The result of a mobile menu navigation action.
 */
export interface NavigateMobileMenuResult {
  /** The updated menu items with selection state applied. */
  menus: MobileMenuItem[]
  /** The key of the newly active panel, or 'root' if none selected. */
  panel: string
}

/**
 * Computes the updated selection state for a mobile menu navigation action.
 * Returns a new array of menu items with `selected` updated, and the resulting panel key.
 *
 * @param menus - The current list of mobile menu items.
 * @param currentPanel - The current active panel key.
 * @param value - The key of the panel to navigate to, or null to return to root.
 * @returns The updated menus and the new active panel key.
 */
export function navigateMobileMenu(
  menus: MobileMenuItem[],
  currentPanel: string,
  value: string | null = null
): NavigateMobileMenuResult {
  let panel = currentPanel

  const updatedMenus = menus.map(item => {
    const next = { ...item }
    next.selected = next.selected ? false : value === next.key
    if (next.selected && value) {
      panel = value
    }
    return next
  })

  return { menus: updatedMenus, panel }
}
