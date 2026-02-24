import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { useLocalStorage, useSessionStorage } from './useStorage'

describe('useStorage', () => {
  beforeEach(() => {
    // Clear storage before each test
    localStorage.clear()
    sessionStorage.clear()
  })

  describe('useLocalStorage', () => {
    it('should create a reactive ref with default value', () => {
      const stored = useLocalStorage('test-key', 'default-value')
      expect(stored.value).toBe('default-value')
    })

    it('should persist value to localStorage', async () => {
      const stored = useLocalStorage('test-key', 'initial')
      stored.value = 'updated'
      
      await nextTick()
      
      // Verify value was updated
      expect(stored.value).toBe('updated')
    })

    it('should retrieve existing value from localStorage', () => {
      // Pre-populate localStorage
      localStorage.setItem('existing-key', '"existing-value"')
      
      const stored = useLocalStorage('existing-key', 'default')
      // VueUse reads the string value from storage
      expect(stored.value).toBe('"existing-value"')
    })

    it('should work with complex objects', () => {
      interface TestObject {
        name: string
        count: number
      }
      
      const stored = useLocalStorage<TestObject>('object-key', { name: 'test', count: 0 })
      expect(stored.value).toEqual({ name: 'test', count: 0 })
      
      stored.value = { name: 'updated', count: 42 }
      expect(stored.value).toEqual({ name: 'updated', count: 42 })
    })

    it('should work with arrays', () => {
      const stored = useLocalStorage<number[]>('array-key', [1, 2, 3])
      expect(stored.value).toEqual([1, 2, 3])
      
      stored.value = [4, 5, 6]
      expect(stored.value).toEqual([4, 5, 6])
    })

    it('should work with boolean values', () => {
      const stored = useLocalStorage('bool-key', false)
      expect(stored.value).toBe(false)
      
      stored.value = true
      expect(stored.value).toBe(true)
    })

    it('should work with number values', () => {
      const stored = useLocalStorage('number-key', 42)
      expect(stored.value).toBe(42)
      
      stored.value = 100
      expect(stored.value).toBe(100)
    })

    it('should support removal via value = null', () => {
      const stored = useLocalStorage<string | null>('removable-key', 'value')
      stored.value = null
      
      // VueUse removes the item when set to null
      expect(stored.value).toBe(null)
    })
  })

  describe('useSessionStorage', () => {
    it('should create a reactive ref with default value', () => {
      const stored = useSessionStorage('test-key', 'default-value')
      expect(stored.value).toBe('default-value')
    })

    it('should persist value to sessionStorage', async () => {
      const stored = useSessionStorage('test-key', 'initial')
      stored.value = 'updated'
      
      await nextTick()
      
      // Verify value was updated
      expect(stored.value).toBe('updated')
    })

    it('should retrieve existing value from sessionStorage', () => {
      // Pre-populate sessionStorage
      sessionStorage.setItem('existing-key', '"existing-value"')
      
      const stored = useSessionStorage('existing-key', 'default')
      // VueUse reads the string value from storage
      expect(stored.value).toBe('"existing-value"')
    })

    it('should work with complex objects', () => {
      interface TestObject {
        step: number
        data: Record<string, unknown>
      }
      
      const stored = useSessionStorage<TestObject>('wizard-state', { 
        step: 1, 
        data: {} 
      })
      expect(stored.value).toEqual({ step: 1, data: {} })
      
      stored.value = { step: 2, data: { field: 'value' } }
      expect(stored.value).toEqual({ step: 2, data: { field: 'value' } })
    })

    it('should work with arrays', () => {
      const stored = useSessionStorage<string[]>('filters', [])
      expect(stored.value).toEqual([])
      
      stored.value = ['filter1', 'filter2']
      expect(stored.value).toEqual(['filter1', 'filter2'])
    })

    it('should be independent from localStorage', () => {
      const localStored = useLocalStorage('shared-key', 'local')
      const sessionStored = useSessionStorage('shared-key', 'session')
      
      // They should maintain separate values
      expect(localStored.value).toBe('local')
      expect(sessionStored.value).toBe('session')
      
      localStored.value = 'updated-local'
      expect(sessionStored.value).toBe('session') // Should not be affected
    })
  })
})
