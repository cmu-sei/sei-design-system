import type { ComputedRef, InjectionKey, Ref } from 'vue'

export type TimelineOrientation = 'horizontal' | 'vertical'

export interface TimelineItemRegistration {
  element: Ref<HTMLElement | null>
  hasCustomMarker: Readonly<Ref<boolean>>
}

export interface TimelineContext {
  hiddenCount: ComputedRef<number>
  timelineId: string
  orientation: ComputedRef<TimelineOrientation>
  expand: () => void
  registerItem: (item: TimelineItemRegistration) => void
  unregisterItem: (item: TimelineItemRegistration) => void
  isItemVisible: (item: TimelineItemRegistration) => boolean
  isLastVisible: (item: TimelineItemRegistration) => boolean
}

export const timelineContextKey: InjectionKey<TimelineContext> = Symbol('sdsTimeline')