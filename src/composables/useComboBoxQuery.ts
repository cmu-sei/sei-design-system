import { watchDebounced } from '@vueuse/core'
import { nextTick, ref, toValue, type MaybeRefOrGetter, type Ref } from 'vue'
import { removeHtmlFromString } from './useComboBoxSuggestions'

interface UseComboBoxQueryOptions {
  query: Ref<string>;
  debounce: MaybeRefOrGetter<number>;
  onComplete: (query: string) => void;
  onShowDropdown: () => void;
}

interface QueryUpdateOptions {
  emitComplete?: boolean;
  showDropdown?: boolean;
}

/**
 * Coordinates sanitized ComboBox query updates with debounced complete events.
 * @param options - Query ref and callbacks for query side effects.
 * @returns Helpers for internal and user-entered query updates.
 */
export function useComboBoxQuery(options: UseComboBoxQueryOptions) {
  const nextQueryUpdate = ref<QueryUpdateOptions | null>(null)
  const skipNextQueryUpdate = ref(false)

  const setQuery = (value: string, updateOptions: QueryUpdateOptions = {}): void => {
    nextQueryUpdate.value = {
      emitComplete: updateOptions.emitComplete ?? false,
      showDropdown: updateOptions.showDropdown ?? false
    }
    options.query.value = removeHtmlFromString(value)
  }

  const setUserQuery = (value: string): void => {
    setQuery(value, { emitComplete: true, showDropdown: true })
  }

  watchDebounced(options.query, async () => {
    await nextTick()
    if (skipNextQueryUpdate.value) {
      skipNextQueryUpdate.value = false
      return
    }

    const queryUpdate = nextQueryUpdate.value
    const isExternalUpdate = queryUpdate === null
    const sanitizedQuery = removeHtmlFromString(options.query.value)

    if (sanitizedQuery !== options.query.value) {
      skipNextQueryUpdate.value = true
      options.query.value = sanitizedQuery
    }

    if (sanitizedQuery !== '' && (queryUpdate?.showDropdown ?? isExternalUpdate)) {
      options.onShowDropdown()
    }

    if (queryUpdate?.emitComplete ?? isExternalUpdate) {
      options.onComplete(sanitizedQuery)
    }

    nextQueryUpdate.value = null
  }, { debounce: toValue(options.debounce) })

  return {
    setQuery,
    setUserQuery
  }
}