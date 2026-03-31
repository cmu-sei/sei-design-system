import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useButtonClasses } from './useButtonClasses'

describe('useButtonClasses', () => {
  describe('Button prefix (btn)', () => {
    it('should generate correct classes for primary button', () => {
      const { allClasses } = useButtonClasses({
        prefix: 'btn',
        kind: 'primary',
        variant: 'blue',
        size: 'md'
      })

      expect(allClasses.value).toContain('btn')
      expect(allClasses.value).toContain('btn-primary')
      expect(allClasses.value).toContain('btn-blue')
      expect(allClasses.value).toContain('btn-md')
    })

    it('should handle all size variants', () => {
      const sizes = ['xs', 'sm', 'md', 'lg'] as const

      sizes.forEach(size => {
        const { sizeClass } = useButtonClasses({
          prefix: 'btn',
          size
        })

        if (size === 'md') {
          expect(sizeClass.value).toBe('btn-md') // md is default, should still return class for consistency
        } else {
          expect(sizeClass.value).toBe(`btn-${size}`)
        }
      })
    })

    it('should handle state classes correctly', () => {
      const { disabledClass, activeClass, blockClass, pendingClass } = useButtonClasses({
        prefix: 'btn',
        disabled: true,
        active: true,
        block: true,
        pending: true
      })

      expect(disabledClass.value).toBe('disabled')
      expect(activeClass.value).toBe('active') // pending also sets active for btn
      expect(blockClass.value).toBe('btn-block flex items-center justify-center')
      expect(pendingClass.value).toBe('active pointer-events-none')
    })

    it('should apply CTA class for regular buttons', () => {
      const { ctaClass } = useButtonClasses({
        prefix: 'btn',
        cta: true
      })

      expect(ctaClass.value).toBe('btn-cta')
    })

    it('should support reactive values via functions', () => {
      const kind = ref<'primary' | 'secondary'>('primary')

      const { kindClass } = useButtonClasses({
        prefix: 'btn',
        kind: () => kind.value
      })

      expect(kindClass.value).toBe('btn-primary')

      kind.value = 'secondary'
      expect(kindClass.value).toBe('btn-secondary')
    })
  })

  describe('ActionButton prefix (action-btn)', () => {
    it('should generate correct classes for action button', () => {
      const { allClasses } = useButtonClasses({
        prefix: 'action-btn',
        kind: 'ghost',
        variant: 'gray',
        size: 'sm'
      })

      expect(allClasses.value).toContain('action-btn')
      expect(allClasses.value).toContain('action-btn-ghost')
      expect(allClasses.value).toContain('action-btn-gray')
      expect(allClasses.value).toContain('action-btn-sm')
    })

    it('should not apply CTA class to action buttons', () => {
      const { ctaClass } = useButtonClasses({
        prefix: 'action-btn',
        cta: true
      })

      expect(ctaClass.value).toBe('')
    })

    it('should handle block class for action buttons differently', () => {
      const { blockClass } = useButtonClasses({
        prefix: 'action-btn',
        block: true
      })

      expect(blockClass.value).toBe('action-btn-block')
      expect(blockClass.value).not.toContain('flex items-center')
    })

    it('should not auto-activate on pending for action buttons', () => {
      const { activeClass } = useButtonClasses({
        prefix: 'action-btn',
        pending: true,
        active: false
      })

      expect(activeClass.value).toBe('') // active not auto-set for action-btn
    })
  })

  describe('Edge cases', () => {
    it('should handle empty/no kind', () => {
      const { btnClass, kindClass } = useButtonClasses({
        kind: ''
      })

      expect(btnClass.value).toBe('')
      expect(kindClass.value).toBe('')
    })

    it('should filter out empty classes from allClasses', () => {
      const { allClasses } = useButtonClasses({
        prefix: 'btn',
        kind: '',
        variant: '',
        size: 'md'
      })

      expect(allClasses.value).toEqual(['btn-md'])
    })

    it('should handle all variant types', () => {
      const variants = ['gray', 'blue', 'red', 'white'] as const

      variants.forEach(variant => {
        const { variantClass } = useButtonClasses({
          prefix: 'btn',
          variant
        })

        expect(variantClass.value).toBe(`btn-${variant}`)
      })
    })
  })

  describe('Type safety', () => {
    it('should accept valid button kinds', () => {
      const kinds: Array<'primary' | 'secondary' | 'tertiary' | 'ghost'> = [
        'primary',
        'secondary',
        'tertiary',
        'ghost'
      ]

      kinds.forEach(kind => {
        const { kindClass } = useButtonClasses({
          prefix: 'btn',
          kind
        })

        expect(kindClass.value).toBeTruthy()
      })
    })
  })
})
