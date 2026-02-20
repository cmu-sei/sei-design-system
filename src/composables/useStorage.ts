import { useStorage } from '@vueuse/core'
import type { RemovableRef } from '@vueuse/core'

/**
 * Composable for reactive localStorage access.
 * 
 * Creates a reactive ref that synchronizes with localStorage.
 * Changes to the ref automatically update localStorage, and changes
 * in localStorage (from other tabs) update the ref.
 * 
 * This is useful for:
 * - Persisting user preferences
 * - Remembering UI state (sidebar collapsed, theme, etc.)
 * - Caching data
 * - Storing form drafts
 * - Session consistency across tabs
 * 
 * @param key - The localStorage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns Reactive ref synced with localStorage
 * 
 * @example
 * Store user preferences:
 * ```vue
 * <script setup lang="ts">
 * import { useLocalStorage } from '@/composables'
 * 
 * const sidebarCollapsed = useLocalStorage('sidebar-collapsed', false)
 * const theme = useLocalStorage('theme', 'light')
 * 
 * // Changes automatically persist to localStorage
 * sidebarCollapsed.value = true
 * theme.value = 'dark'
 * </script>
 * ```
 * 
 * @example
 * Store complex objects:
 * ```ts
 * interface UserSettings {
 *   fontSize: number
 *   notifications: boolean
 *   language: string
 * }
 * 
 * const settings = useLocalStorage<UserSettings>('user-settings', {
 *   fontSize: 14,
 *   notifications: true,
 *   language: 'en'
 * })
 * 
 * // Update individual properties
 * settings.value.fontSize = 16
 * ```
 * 
 * @example
 * Cache API responses:
 * ```ts
 * const cachedData = useLocalStorage<any[]>('api-cache', [])
 * 
 * async function fetchData() {
 *   if (cachedData.value.length > 0) {
 *     return cachedData.value
 *   }
 *   const data = await api.getData()
 *   cachedData.value = data
 *   return data
 * }
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): RemovableRef<T> {
  return useStorage(key, defaultValue, localStorage)
}

/**
 * Composable for reactive sessionStorage access.
 * 
 * Similar to useLocalStorage but uses sessionStorage instead.
 * Data persists only for the browser session (until tab is closed).
 * 
 * This is useful for:
 * - Temporary state that shouldn't persist across sessions
 * - Wizard/multi-step form data
 * - Current page navigation state
 * - Temporary filters/search state
 * 
 * @param key - The sessionStorage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns Reactive ref synced with sessionStorage
 * 
 * @example
 * Store wizard progress:
 * ```ts
 * import { useSessionStorage } from '@/composables'
 * 
 * const currentStep = useSessionStorage('wizard-step', 1)
 * const formData = useSessionStorage('wizard-data', {})
 * 
 * // Persists during session, cleared when tab closes
 * currentStep.value = 2
 * ```
 * 
 * @example
 * Temporary search state:
 * ```ts
 * const searchQuery = useSessionStorage('search-query', '')
 * const searchFilters = useSessionStorage('search-filters', {})
 * 
 * // State persists during navigation but not across sessions
 * ```
 */
export function useSessionStorage<T>(
  key: string,
  defaultValue: T
): RemovableRef<T> {
  return useStorage(key, defaultValue, sessionStorage)
}
