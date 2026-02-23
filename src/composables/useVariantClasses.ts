import { computed, toValue, type Ref, type MaybeRefOrGetter } from 'vue'

/**
 * Configuration object mapping variant values to CSS classes.
 * 
 * @example
 * ```ts
 * const sizeMap = {
 *   sm: 'w-32',
 *   md: 'w-48',
 *   lg: 'w-64'
 * }
 * ```
 */
export interface VariantClassConfig {
  [key: string]: string
}

/**
 * Composable for mapping component prop values to CSS classes.
 * 
 * This eliminates repetitive switch statements and computed properties
 * that map size, variant, type, and other props to their corresponding
 * CSS classes.
 * 
 * @param propGetter - Function or ref that returns the current prop value
 * @param classMap - Object mapping prop values to CSS classes
 * @param defaultValue - Optional default. Can be either:
 *   - A key that exists in classMap (will look up the class)
 *   - A literal class string (will be used directly)
 * @returns Computed ref containing the CSS class for the current prop value
 * 
 * @example
 * Basic usage with size prop:
 * ```vue
 * <script setup lang="ts">
 * import { useVariantClasses } from '@/composables'
 * 
 * const props = defineProps({
 *   size: { type: String as PropType<'sm' | 'md' | 'lg'>, default: 'md' }
 * })
 * 
 * const sizeClass = useVariantClasses(
 *   () => props.size,
 *   {
 *     sm: 'w-32',
 *     md: 'w-48',
 *     lg: 'w-64'
 *   },
 *   'md'  // Key lookup - will return 'w-48' when prop is 'md'
 * )
 * </script>
 * 
 * <template>
 *   <div :class="sizeClass">Content</div>
 * </template>
 * ```
 * 
 * @example
 * Using literal class string as default:
 * ```ts
 * const sizeClass = useVariantClasses(
 *   () => props.size,
 *   {
 *     sm: 'w-4 h-4',
 *     lg: 'w-20 h-20'
 *   },
 *   'w-12 h-12'  // Literal class string - used directly if prop doesn't match
 * )
 * ```
 * 
 * @example
 * Multiple variant classes:
 * ```ts
 * const sizeClass = useVariantClasses(() => props.size, sizeMap, 'md')
 * const variantClass = useVariantClasses(() => props.variant, variantMap, 'blue')
 * const typeClass = useVariantClasses(() => props.type, typeMap)
 * ```
 * 
 * @example
 * With reactive ref:
 * ```ts
 * const selectedSize = ref('md')
 * const sizeClass = useVariantClasses(selectedSize, sizeMap)
 * ```
 */
export function useVariantClasses<T extends string>(
  propGetter: MaybeRefOrGetter<T | undefined>,
  classMap: VariantClassConfig,
  defaultValue?: T
): Ref<string> {
  return computed(() => {
    const value = toValue(propGetter)
    
    // If value exists in map, return it
    if (value && value in classMap) {
      return classMap[value]
    }
    
    // If default value specified and exists in map, return it
    if (defaultValue && defaultValue in classMap) {
      return classMap[defaultValue]
    }
    
    // If default value specified but not in map, use it as literal class string
    if (defaultValue) {
      return defaultValue
    }
    
    // Return empty string if no match
    return ''
  })
}

/**
 * Variant of useVariantClasses that supports multiple class maps.
 * Returns an object with computed refs for each class map.
 * 
 * @param configs - Object mapping keys to variant class configurations
 * @returns Object with computed refs for each configuration
 * 
 * @example
 * ```ts
 * const classes = useMultipleVariantClasses({
 *   size: {
 *     propGetter: () => props.size,
 *     classMap: { sm: 'w-32', md: 'w-48', lg: 'w-64' },
 *     defaultValue: 'md'
 *   },
 *   variant: {
 *     propGetter: () => props.variant,
 *     classMap: { blue: 'bg-blue-600', red: 'bg-red-600' },
 *     defaultValue: 'blue'
 *   }
 * })
 * 
 * // Use in template:
 * <div :class="[classes.size, classes.variant]">Content</div>
 * ```
 */
export function useMultipleVariantClasses<
  T extends Record<string, {
    propGetter: MaybeRefOrGetter<string | undefined>
    classMap: VariantClassConfig
    defaultValue?: string
  }>
>(configs: T): { [K in keyof T]: Ref<string> } {
  const result = {} as { [K in keyof T]: Ref<string> }
  
  for (const key in configs) {
    const config = configs[key]
    result[key] = useVariantClasses(
      config.propGetter,
      config.classMap,
      config.defaultValue
    )
  }
  
  return result
}
