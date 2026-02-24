import { computed, type ComputedRef } from 'vue'

/**
 * Z-index layer values supported by the design system
 */
export type ZIndexValue = '0' | '10' | '20' | '30' | '40' | '50' | 'auto' | ''

/**
 * Composable for generating consistent z-index Tailwind classes.
 * 
 * This composable standardizes z-index management across overlays, modals,
 * dropdowns, and other layered components in the design system.
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useZIndex } from '@/composables/useZIndex'
 * 
 * const props = defineProps({
 *   zIndex: { 
 *     type: String as PropType<ZIndexValue>, 
 *     default: '50' 
 *   }
 * })
 * 
 * const { zIndexClass } = useZIndex(() => props.zIndex)
 * </script>
 * 
 * <template>
 *   <div :class="['popover', zIndexClass]">
 *     <slot />
 *   </div>
 * </template>
 * ```
 * 
 * @param value - Z-index value (string or getter function)
 * @returns Object containing the computed zIndexClass
 */
export function useZIndex(
  value: (() => ZIndexValue) | ZIndexValue
): { zIndexClass: ComputedRef<string> } {
  const getValue = (): ZIndexValue => {
    return typeof value === 'function' ? value() : value
  }

  const zIndexClass = computed(() => {
    const zIndex = getValue()
    
    const zIndexMap: Record<Exclude<ZIndexValue, ''>, string> = {
      '0': 'z-0',
      '10': 'z-10',
      '20': 'z-20',
      '30': 'z-30',
      '40': 'z-40',
      '50': 'z-50',
      'auto': 'z-auto'
    }
    
    return zIndexMap[zIndex as Exclude<ZIndexValue, ''>] || ''
  })

  return {
    zIndexClass
  }
}
