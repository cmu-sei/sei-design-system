import type { ComputedRef, InjectionKey, Ref } from 'vue'

export type TimelineOrientation = 'horizontal' | 'vertical'

export interface TimelineItemRegistration {
  element: Ref<HTMLElement | null>
  hasCustomMarker: ComputedRef<boolean>
}

export interface TimelineContext {
  orientation: ComputedRef<TimelineOrientation>
  registerItem: (item: TimelineItemRegistration) => void
  unregisterItem: (item: TimelineItemRegistration) => void
  isItemVisible: (item: TimelineItemRegistration) => boolean
  isLastVisible: (item: TimelineItemRegistration) => boolean
}

export const timelineContextKey: InjectionKey<TimelineContext> = Symbol('sdsTimeline')