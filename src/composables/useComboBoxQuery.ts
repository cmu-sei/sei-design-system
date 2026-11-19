import { useDebounceFn } from '@vueuse/core'
import { onScopeDispose, watch, type MaybeRefOrGetter, type Ref } from 'vue'

interface UseComboBoxQueryOptions {
  query: Ref<string>;
  debounce: MaybeRefOrGetter<number>;
  onComplete: (query: string) => void;
  onShowDropdown: () => void;
}

/** Optional search and popup side effects for a programmatic query update. */
export interface QueryUpdateOptions {
  emitComplete?: boolean;
  showDropdown?: boolean;
}

/**
 * Preserves literal queries and debounces search requests independently of popup interaction.
 * @param options - Query ref, debounce delay, and callbacks for query side effects.
 * @returns Helpers for internal and user-entered query updates.
 */
export function useComboBoxQuery(options: UseComboBoxQueryOptions) {
  let isInternalUpdate = false
  let revision = 0
  let lastPublishedQuery = options.query.value
  onScopeDispose(() => { revision++ }, true)
  const complete = useDebounceFn((value: string, requestRevision: number) => {
    if (requestRevision === revision) options.onComplete(value)
  }, options.debounce)

  const publishQuery = (value: string, updateOptions: QueryUpdateOptions) => {
    lastPublishedQuery = value
    const requestRevision = ++revision
    if (value.trim() && updateOptions.showDropdown) options.onShowDropdown()
    if (updateOptions.emitComplete) complete(value, requestRevision)
  }

  watch(options.query, value => {
    if (!isInternalUpdate && value !== lastPublishedQuery) publishQuery(value, { emitComplete: true, showDropdown: true })
  }, { flush: 'sync' })

  const setQuery = (value: string, updateOptions: QueryUpdateOptions = {}): void => {
    isInternalUpdate = true
    options.query.value = value
    isInternalUpdate = false
    publishQuery(value, updateOptions)
  }

  const setUserQuery = (value: string): void => {
    setQuery(value, { emitComplete: true, showDropdown: true })
  }

  return { setQuery, setUserQuery }
}
