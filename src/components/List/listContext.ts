import type { ComputedRef, InjectionKey } from 'vue'

export interface ListContext {
  markerGridClass: string
  titleClass: string
}

export interface ListItemContext {
  markerColumnWidth: ComputedRef<string | undefined>
}

export const listContextKey: InjectionKey<ListContext> = Symbol('sdsList')
export const listItemContextKey: InjectionKey<ListItemContext> = Symbol('sdsListItem')