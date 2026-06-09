/**
 * Composable that reactively tracks the presence of a '.dark' class on a target element.
 *
 * Automatically updates when the class is added or removed via a MutationObserver.
 * Defaults to monitoring `document.body`, but can watch any element or use a dynamic getter.
 * Returns a reactive boolean ref indicating dark-mode state.
 *
 * @param {Element | Function | null} [target=null] - Target element to monitor. Can be:
 *   - null (default): watches document.body
 *   - Element: watches the specific element
 *   - Function: getter that returns the element to watch
 *
 * @returns {Ref<boolean>} Reactive boolean indicating whether the target has the 'dark' class.
 *
 * @example
 * // Watch document.body (default)
 * const isDark = useDarkMode()
 *
 * @example
 * // Watch a specific element
 * const isDark = useDarkMode(containerEl)
 *
 * @example
 * // Use a dynamic getter
 * const isDark = useDarkMode(() => document.querySelector('#theme-container'))
 */
export function useDarkMode(target: Element | (() => Element) | null = null): Ref<boolean> {
  function getTarget(): Element | null {
    if (typeof document === 'undefined') return null
    if (target === null) return document.body
    return typeof target === 'function' ? target() : target
  }

  const el = getTarget()

  const isDark = ref(el?.classList.contains('dark') ?? false)

  if (el) {
    const observer = new MutationObserver(() => {
      isDark.value = getTarget()?.classList.contains('dark') ?? false
    })
    observer.observe(el, { attributeFilter: ['class'] })
    onScopeDispose(() => observer.disconnect())
  }

  return isDark
}