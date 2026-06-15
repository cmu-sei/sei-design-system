/**
 * Design System Composables
 * 
 * Reusable composition functions for Vue 3 components.
 * These composables encapsulate common patterns and logic used throughout
 * the SEI Design System, promoting code reuse and consistency.
 * 
 * All composables are exported for use by consumers of the design system.
 */

export { useButtonClasses } from './useButtonClasses'
export type { 
  ButtonKind, 
  ButtonVariant, 
  ButtonSize, 
  ActionButtonSize,
  ButtonClassConfig,
  ButtonClasses 
} from './useButtonClasses'

export { useDropdown } from './useDropdown'
export type { UseDropdownOptions, UseDropdownReturn } from './useDropdown'

export { useZIndex } from './useZIndex'
export type { ZIndexValue } from './useZIndex'

export { useOverlay } from './useOverlay'
export type { UseOverlayOptions, UseOverlayReturn } from './useOverlay'

export { useCloseOnEscape } from './useCloseOnEscape'

export { useFocusTrap, FOCUSABLE_SELECTOR } from './useFocusTrap'
export type { UseFocusTrapOptions, UseFocusTrapReturn } from './useFocusTrap'

export { default as usePaginationRange } from './usePaginationRange'

export { useVariantClasses, useMultipleVariantClasses } from './useVariantClasses'
export type { VariantClassConfig } from './useVariantClasses'

export { useEventListener } from './useEventListener'
export type { EventTarget, UseEventListenerOptions } from './useEventListener'

export { useFormValidation } from './useFormValidation'
export type { 
  ValidationState, 
  UseFormValidationOptions, 
  UseFormValidationReturn 
} from './useFormValidation'

export { formFieldProps, useFormField } from './useFormProps'

export type { DropdownPlacement } from './types'
export type { FormFieldProps, ComponentPropsWithFormFields } from './useFormProps'

export { removeHtmlFromString, normalizeString, useComboBoxSuggestions } from './useComboBoxSuggestions'
export type { ComboBoxGroup, ComboBoxSuggestion, ComboBoxSuggestionObject, ComboBoxType } from './useComboBoxSuggestions'

export { useComboBoxQuery } from './useComboBoxQuery'

export { useComboBoxSelection } from './useComboBoxSelection'

export { useComboBoxDropdownItems } from './useComboBoxDropdownItems'
export type { ComboBoxDropdownItem } from './useComboBoxDropdownItems'

export { useDebounce } from './useDebounce'

export { useThrottle } from './useThrottle'

export { useThrottleAndDebounce } from './useThrottleAndDebounce'

export { useClickOutside } from './useClickOutside'

export { useResizeObserver } from './useResizeObserver'

export { useVirtualScroller } from './useVirtualScroller'
export type { VirtualListItem, VirtualScrollAlignment } from './useVirtualScroller'

export { useLocalStorage, useSessionStorage } from './useStorage'

export { useTimedAction } from './useTimedAction'
export type { UseTimedActionOptions, UseTimedActionReturn } from './useTimedAction'

/**
 * Charting Composables
 */

export { useBarChart, isBarSeries } from './useBarChart'
export type { 
  BarData, 
  BarItem, 
  BarMode, 
  BarOrientation, 
  BarRect, 
  BarSeries, 
  BarTooltipData 
} from './useBarChart'

export { useChartAxis } from './useChartAxis'
export type { AxisDirection, ValueFormatter, TickFormatter, AnyScale } from './useChartAxis'

export { useChartConfig } from './useChartConfig'
export type { ChartConfig } from './useChartConfig'

export { useChartDimensions } from './useChartDimensions'

export { useDarkMode } from './useDarkMode'

export { useHeatmapChart } from './useHeatmapChart'
export type { 
  HeatmapCell, 
  HeatmapColors, 
  HeatmapRect, 
  HeatmapTooltipData, 
  HeatmapLegendItem, 
  HeatmapAxisOptions, 
  HeatmapLayoutOptions 
} from './useHeatmapChart'

export { useHoveredIndex } from './useHoveredIndex'

export { usePieChart } from './usePieChart'
export type { PieArcData, PieLegendItem, PieSlice } from './usePieChart'

export { useTooltip } from './useTooltip'
export type { TooltipState } from './useTooltip'