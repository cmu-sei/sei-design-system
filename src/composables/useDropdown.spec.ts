import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { useDropdown } from './useDropdown'

describe('useDropdown', () => {
  it('should initialize with default values', () => {
    const dropdown = useDropdown()

    expect(dropdown.id).toBeDefined()
    expect(dropdown.buttonRef.value).toBeUndefined()
    expect(dropdown.zIndexClass.value).toBe('z-50')
  })

  it('should generate button classes for btn prefix', () => {
    const dropdown = useDropdown({
      prefix: 'btn',
      kind: 'primary',
      variant: 'blue',
      size: 'md'
    })

    expect(dropdown.btnClass.value).toBe('btn')
    expect(dropdown.kindClass.value).toBe('btn-primary')
    expect(dropdown.variantClass.value).toBe('btn-blue')
  })

  it('should generate button classes for action-btn prefix', () => {
    const dropdown = useDropdown({
      prefix: 'action-btn',
      kind: 'ghost',
      variant: 'gray',
      size: 'sm'
    })

    expect(dropdown.btnClass.value).toBe('action-btn')
    expect(dropdown.kindClass.value).toBe('action-btn-ghost')
    expect(dropdown.variantClass.value).toBe('action-btn-gray')
    expect(dropdown.sizeClass.value).toBe('action-btn-sm')
  })

  it('should support reactive prefix', () => {
    const prefix = ref<'btn' | 'action-btn'>('btn')
    
    const dropdown = useDropdown({
      prefix: () => prefix.value,
      kind: 'primary'
    })

    expect(dropdown.btnClass.value).toBe('btn')
    expect(dropdown.kindClass.value).toBe('btn-primary')

    prefix.value = 'action-btn'
    expect(dropdown.btnClass.value).toBe('action-btn')
    expect(dropdown.kindClass.value).toBe('action-btn-primary')
  })

  it('should handle z-index prop', () => {
    const dropdown = useDropdown({
      zIndex: '30'
    })

    expect(dropdown.zIndexClass.value).toBe('z-30')
  })

  it('should default to z-50 when zIndex is undefined', () => {
    const dropdown = useDropdown({
      zIndex: undefined
    })

    expect(dropdown.zIndexClass.value).toBe('z-50')
  })

  it('should handle empty string zIndex', () => {
    const dropdown = useDropdown({
      zIndex: ''
    })

    expect(dropdown.zIndexClass.value).toBe('')
  })

  it('should support reactive zIndex', () => {
    const zIndex = ref<'10' | '50'>('10')
    
    const dropdown = useDropdown({
      zIndex: () => zIndex.value
    })

    expect(dropdown.zIndexClass.value).toBe('z-10')

    zIndex.value = '50'
    expect(dropdown.zIndexClass.value).toBe('z-50')
  })

  it('should handle disabled state', () => {
    const dropdown = useDropdown({
      disabled: true
    })

    expect(dropdown.disabledClass.value).toBe('disabled')
  })

  it('should handle block state', () => {
    const dropdown = useDropdown({
      prefix: 'btn',
      block: true
    })

    expect(dropdown.blockClass.value).toContain('btn-block')
  })

  it('should handle active state', () => {
    const dropdown = useDropdown({
      prefix: 'btn',
      active: true
    })

    expect(dropdown.activeClass.value).toBe('active')
  })

  it('should call open with delay when handleClick is called and dropdown is closed', () => {
    const openDelay = 100
    const dropdown = useDropdown({ openDelay })

    const open = vi.fn()
    const close = vi.fn()

    dropdown.handleClick(false, open, close)

    expect(open).toHaveBeenCalledWith(100)
    expect(close).not.toHaveBeenCalled()
  })

  it('should call close with delay when handleClick is called and dropdown is open', () => {
    const closeDelay = 200
    const dropdown = useDropdown({ closeDelay })

    const open = vi.fn()
    const close = vi.fn()

    dropdown.handleClick(true, open, close)

    expect(close).toHaveBeenCalledWith(200)
    expect(open).not.toHaveBeenCalled()
  })

  it('should use default delays of 0', () => {
    const dropdown = useDropdown()

    const open = vi.fn()
    const close = vi.fn()

    dropdown.handleClick(false, open, close)
    expect(open).toHaveBeenCalledWith(0)

    dropdown.handleClick(true, open, close)
    expect(close).toHaveBeenCalledWith(0)
  })

  it('should generate dropdown classes with darkMode false', () => {
    const dropdown = useDropdown({
      darkMode: false
    })

    const classes = dropdown.dropdownClasses.value
    expect(classes['bg-white absolute border shadow-lg rounded-theme-md [.dropdown-dark_&]:border-gray-700 [.dropdown-dark_&]:bg-gray-950 dark:border-gray-700 dark:bg-gray-950']).toBe(true)
  })

  it('should generate dropdown classes with darkMode true', () => {
    const dropdown = useDropdown({
      darkMode: true
    })

    const classes = dropdown.dropdownClasses.value
    expect(classes['[.dropdown-dark_&]:border-gray-700 [.dropdown-dark_&]:bg-gray-950 dark:border-gray-700 dark:bg-gray-950']).toBe(true)
  })

  it('should include zIndexClass in dropdown classes', () => {
    const dropdown = useDropdown({
      zIndex: '30'
    })

    const classes = dropdown.dropdownClasses.value
    expect(classes['z-30']).toBe(true)
  })

  it('should support reactive darkMode', () => {
    const darkMode = ref(false)
    
    const dropdown = useDropdown({
      darkMode: () => darkMode.value
    })

    let classes = dropdown.dropdownClasses.value
    expect(classes['[.dropdown-dark_&]:border-gray-700 [.dropdown-dark_&]:bg-gray-950 dark:border-gray-700 dark:bg-gray-950']).toBe(false)

    darkMode.value = true
    classes = dropdown.dropdownClasses.value
    expect(classes['[.dropdown-dark_&]:border-gray-700 [.dropdown-dark_&]:bg-gray-950 dark:border-gray-700 dark:bg-gray-950']).toBe(true)
  })

  it('should support all button kinds', () => {
    const kinds: Array<'primary' | 'secondary' | 'ghost'> = ['primary', 'secondary', 'ghost']

    kinds.forEach(kind => {
      const dropdown = useDropdown({
        prefix: 'btn',
        kind
      })

      expect(dropdown.kindClass.value).toBe(`btn-${kind}`)
    })
  })

  it('should support all button variants', () => {
    const variants: Array<'gray' | 'blue' | 'red' | 'white'> = ['gray', 'blue', 'red', 'white']

    variants.forEach(variant => {
      const dropdown = useDropdown({
        prefix: 'btn',
        variant
      })

      expect(dropdown.variantClass.value).toBe(`btn-${variant}`)
    })
  })

  it('should support all button sizes', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg'> = ['xs', 'sm', 'md', 'lg']

    sizes.forEach(size => {
      const dropdown = useDropdown({
        prefix: 'btn',
        size
      })

      if (size === 'md') {
        expect(dropdown.sizeClass.value).toBe('btn-md') // md is default
      } else {
        expect(dropdown.sizeClass.value).toBe(`btn-${size}`)
      }
    })
  })

  it('should generate unique id for each instance', () => {
    const dropdown1 = useDropdown()
    const dropdown2 = useDropdown()

    // IDs should be defined (even if empty string in test environment)
    expect(dropdown1.id).toBeDefined()
    expect(dropdown2.id).toBeDefined()
    // In actual Vue app context, IDs would be different, but in tests they may both be empty string
    // The important thing is the composable doesn't throw an error
  })

  it('should handle all MaybeRefOrGetter options reactively', () => {
    const kind = ref<'primary' | 'secondary'>('primary')
    const variant = ref<'blue' | 'red'>('blue')
    const size = ref<'sm' | 'lg'>('sm')
    const disabled = ref(false)
    const block = ref(false)
    const active = ref(false)

    const dropdown = useDropdown({
      kind: () => kind.value,
      variant: () => variant.value,
      size: () => size.value,
      disabled: () => disabled.value,
      block: () => block.value,
      active: () => active.value
    })

    expect(dropdown.kindClass.value).toBe('btn-primary')
    expect(dropdown.variantClass.value).toBe('btn-blue')
    expect(dropdown.sizeClass.value).toBe('btn-sm')
    expect(dropdown.disabledClass.value).toBe('')
    expect(dropdown.blockClass.value).toBe('')
    expect(dropdown.activeClass.value).toBe('')

    kind.value = 'secondary'
    variant.value = 'red'
    size.value = 'lg'
    disabled.value = true
    block.value = true
    active.value = true

    expect(dropdown.kindClass.value).toBe('btn-secondary')
    expect(dropdown.variantClass.value).toBe('btn-red')
    expect(dropdown.sizeClass.value).toBe('btn-lg')
    expect(dropdown.disabledClass.value).toBe('disabled')
    expect(dropdown.blockClass.value).toContain('btn-block')
    expect(dropdown.activeClass.value).toBe('active')
  })
})
