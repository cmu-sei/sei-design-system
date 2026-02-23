import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useVariantClasses, useMultipleVariantClasses } from './useVariantClasses'

describe('useVariantClasses', () => {
  const sizeMap = {
    sm: 'w-32',
    md: 'w-48',
    lg: 'w-64'
  }

  const variantMap = {
    blue: 'bg-blue-600 text-white',
    red: 'bg-red-600 text-white',
    gray: 'bg-gray-600 text-white'
  }

  it('should return correct class for valid value with function getter', () => {
    const size = ref<'sm' | 'md' | 'lg'>('md')
    const sizeClass = useVariantClasses(() => size.value, sizeMap)
    
    expect(sizeClass.value).toBe('w-48')
  })

  it('should return correct class for valid value with ref getter', () => {
    const size = ref<'sm' | 'md' | 'lg'>('lg')
    const sizeClass = useVariantClasses(size, sizeMap)
    
    expect(sizeClass.value).toBe('w-64')
  })

  it('should react to changes in prop value', () => {
    const size = ref<'sm' | 'md' | 'lg'>('sm')
    const sizeClass = useVariantClasses(size, sizeMap)
    
    expect(sizeClass.value).toBe('w-32')
    
    size.value = 'lg'
    expect(sizeClass.value).toBe('w-64')
  })

  it('should return default value class when provided and value not in map', () => {
    const size = ref('xl')
    const sizeClass = useVariantClasses(size, sizeMap, 'md')
    
    expect(sizeClass.value).toBe('w-48')
  })

  it('should return empty string when value not in map and no default', () => {
    const size = ref('xl')
    const sizeClass = useVariantClasses(size, sizeMap)
    
    expect(sizeClass.value).toBe('')
  })

  it('should return empty string when value is undefined and no default', () => {
    const size = ref<string | undefined>(undefined)
    const sizeClass = useVariantClasses(size, sizeMap)
    
    expect(sizeClass.value).toBe('')
  })

  it('should return default value when value is undefined and default provided', () => {
    const size = ref<string | undefined>(undefined)
    const sizeClass = useVariantClasses(size, sizeMap, 'md')
    
    expect(sizeClass.value).toBe('w-48')
  })

  it('should work with different value types', () => {
    const variant = ref<'blue' | 'red' | 'gray'>('red')
    const variantClass = useVariantClasses(() => variant.value, variantMap)
    
    expect(variantClass.value).toBe('bg-red-600 text-white')
    
    variant.value = 'blue'
    expect(variantClass.value).toBe('bg-blue-600 text-white')
  })

  it('should handle complex class strings', () => {
    const complexMap = {
      primary: 'px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md',
      secondary: 'px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg'
    }
    
    const type = ref<'primary' | 'secondary'>('primary')
    const typeClass = useVariantClasses(type, complexMap)
    
    expect(typeClass.value).toBe('px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md')
  })
})

describe('useMultipleVariantClasses', () => {
  it('should return computed refs for multiple configurations', () => {
    const size = ref<'sm' | 'md' | 'lg'>('md')
    const variant = ref<'blue' | 'red'>('blue')
    
    const classes = useMultipleVariantClasses({
      size: {
        propGetter: size,
        classMap: { sm: 'w-32', md: 'w-48', lg: 'w-64' },
        defaultValue: 'md'
      },
      variant: {
        propGetter: variant,
        classMap: { blue: 'bg-blue-600', red: 'bg-red-600' },
        defaultValue: 'blue'
      }
    })
    
    expect(classes.size.value).toBe('w-48')
    expect(classes.variant.value).toBe('bg-blue-600')
  })

  it('should react to changes in all configurations', () => {
    const size = ref<'sm' | 'md' | 'lg'>('sm')
    const variant = ref<'blue' | 'red'>('red')
    
    const classes = useMultipleVariantClasses({
      size: {
        propGetter: size,
        classMap: { sm: 'w-32', md: 'w-48', lg: 'w-64' }
      },
      variant: {
        propGetter: variant,
        classMap: { blue: 'bg-blue-600', red: 'bg-red-600' }
      }
    })
    
    expect(classes.size.value).toBe('w-32')
    expect(classes.variant.value).toBe('bg-red-600')
    
    size.value = 'lg'
    variant.value = 'blue'
    
    expect(classes.size.value).toBe('w-64')
    expect(classes.variant.value).toBe('bg-blue-600')
  })

  it('should work with function getters', () => {
    const props = ref({ size: 'md' as 'sm' | 'md' | 'lg', variant: 'blue' as 'blue' | 'red' })
    
    const classes = useMultipleVariantClasses({
      size: {
        propGetter: () => props.value.size,
        classMap: { sm: 'w-32', md: 'w-48', lg: 'w-64' }
      },
      variant: {
        propGetter: () => props.value.variant,
        classMap: { blue: 'bg-blue-600', red: 'bg-red-600' }
      }
    })
    
    expect(classes.size.value).toBe('w-48')
    expect(classes.variant.value).toBe('bg-blue-600')
    
    props.value = { size: 'lg', variant: 'red' }
    
    expect(classes.size.value).toBe('w-64')
    expect(classes.variant.value).toBe('bg-red-600')
  })
})
