import { describe, it, expect } from 'vitest'
import { navigateMobileMenu } from './mobileMenuNavigate'
import type { MobileMenuItem } from '../components/MobileMenu/MobileMenu.vue'

const makeMenus = (): MobileMenuItem[] => [
  { key: 'plants', title: 'Plants', type: 'slide', selected: false },
  { key: 'trees', title: 'Trees', type: 'slide', selected: false },
  { key: 'bugs', title: 'Bugs', type: 'expand', selected: false },
]

describe('navigateMobileMenu', () => {
  describe('navigating to a panel', () => {
    it('should select the matching menu item and set panel to its key', () => {
      const { menus, panel } = navigateMobileMenu(makeMenus(), 'root', 'plants')
      expect(menus[0].selected).toBe(true)
      expect(panel).toBe('plants')
    })

    it('should leave non-matching menu items unselected', () => {
      const { menus } = navigateMobileMenu(makeMenus(), 'root', 'plants')
      expect(menus[1].selected).toBe(false)
      expect(menus[2].selected).toBe(false)
    })

    it('should set panel to the navigated key', () => {
      const { panel } = navigateMobileMenu(makeMenus(), 'root', 'trees')
      expect(panel).toBe('trees')
    })

    it('should not mutate the original menus array', () => {
      const original = makeMenus()
      navigateMobileMenu(original, 'root', 'plants')
      expect(original[0].selected).toBe(false)
    })
  })

  describe('navigating to null (root)', () => {
    it('should preserve current panel when value is null and nothing is selected', () => {
      const { panel } = navigateMobileMenu(makeMenus(), 'root', null)
      expect(panel).toBe('root')
    })

    it('should not select any menu item when value is null', () => {
      const { menus } = navigateMobileMenu(makeMenus(), 'root', null)
      expect(menus.every(m => !m.selected)).toBe(true)
    })

    it('should default value to null when no argument is supplied', () => {
      const { panel } = navigateMobileMenu(makeMenus(), 'root')
      expect(panel).toBe('root')
    })
  })

  describe('deselecting an already-selected item (e.g. expand type)', () => {
    it('should deselect a currently selected item when navigated to again', () => {
      const menus: MobileMenuItem[] = [
        { key: 'plants', title: 'Plants', type: 'slide', selected: true },
        { key: 'trees', title: 'Trees', type: 'slide', selected: false },
      ]
      const { menus: updated, panel } = navigateMobileMenu(menus, 'plants', 'plants')
      expect(updated[0].selected).toBe(false)
      // panel is preserved at 'plants' because no newly selected item changed it
      expect(panel).toBe('plants')
    })

    it('should preserve panel when an expand item toggles off', () => {
      const menus: MobileMenuItem[] = [
        { key: 'bugs', title: 'Bugs', type: 'expand', selected: true },
      ]
      const { panel } = navigateMobileMenu(menus, 'root', 'bugs')
      // bugs was selected → gets deselected; panel stays at 'root'
      expect(panel).toBe('root')
    })
  })

  describe('navigating to an unknown key', () => {
    it('should not select any item and should preserve the current panel', () => {
      const { menus, panel } = navigateMobileMenu(makeMenus(), 'root', 'unknown')
      expect(menus.every(m => !m.selected)).toBe(true)
      expect(panel).toBe('root')
    })
  })

  describe('return value shape', () => {
    it('returns an object with menus and panel properties', () => {
      const result = navigateMobileMenu(makeMenus(), 'root', 'trees')
      expect(result).toHaveProperty('menus')
      expect(result).toHaveProperty('panel')
    })

    it('returns a new array, not the same reference', () => {
      const original = makeMenus()
      const { menus } = navigateMobileMenu(original, 'root', 'trees')
      expect(menus).not.toBe(original)
    })
  })
})
