import { onClickOutside } from '@vueuse/core'
import type { Ref } from 'vue'

/**
 * Composable for detecting clicks outside an element.
 * 
 * Triggers a callback when a click occurs outside the specified target element.
 * Automatically cleans up event listeners on component unmount.
 * 
 * This is useful for:
 * - Closing dropdowns/menus
 * - Dismissing modals/popovers
 * - Hiding tooltips
 * - Collapsing expanded sections
 * - Any UI that should close when clicking outside
 * 
 * @param target - The element ref to watch for outside clicks
 * @param handler - Callback function to execute when click outside occurs
 * @returns Cleanup function to stop listening
 * 
 * @example
 * Basic usage with dropdown:
 * ```vue
 * <script setup lang="ts">
 * import { ref } from 'vue'
 * import { useClickOutside } from '@/composables'
 * 
 * const dropdownRef = ref<HTMLElement>()
 * const isOpen = ref(false)
 * 
 * useClickOutside(dropdownRef, () => {
 *   isOpen.value = false
 * })
 * </script>
 * 
 * <template>
 *   <div ref="dropdownRef">
 *     <button @click="isOpen = !isOpen">Toggle</button>
 *     <ul v-if="isOpen">
 *       <li>Option 1</li>
 *       <li>Option 2</li>
 *     </ul>
 *   </div>
 * </template>
 * ```
 * 
 * @example
 * With conditional listening:
 * ```ts
 * const menuRef = ref<HTMLElement>()
 * const isMenuOpen = ref(false)
 * 
 * useClickOutside(
 *   menuRef,
 *   () => {
 *     if (isMenuOpen.value) {
 *       isMenuOpen.value = false
 *     }
 *   }
 * )
 * ```
 * 
 * @example
 * Multiple target elements:
 * ```ts
 * const dropdown1 = ref<HTMLElement>()
 * const dropdown2 = ref<HTMLElement>()
 * 
 * useClickOutside(dropdown1, () => closeDropdown1())
 * useClickOutside(dropdown2, () => closeDropdown2())
 * ```
 */
export function useClickOutside(
  target: Ref<HTMLElement | undefined | null>,
  handler: (event: MouseEvent) => void,
  options?: Parameters<typeof onClickOutside>[2]
) {
  if (options) {
    return onClickOutside(target, handler, options)
  }
  return onClickOutside(target, handler)
}
