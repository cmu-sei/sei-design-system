type IndicatorSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type IndicatorPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type IndicatorPlacementOver = 'portrait' | 'circle' | 'square'

/**
 * Generates the CSS mask SVG string for an indicator badge.
 * @param size - The indicator size.
 * @param placement - The indicator placement relative to its host.
 * @param placementOver - The shape of the host element.
 * @param hideIndicator - When true, returns 'none'.
 * @returns The CSS mask string with an inline SVG data URI, or 'none'.
 */
export function getIndicatorMaskSpec(
  size: IndicatorSize,
  placement: IndicatorPlacement,
  placementOver: IndicatorPlacementOver,
  hideIndicator: boolean
): string {
  const vbWidth = 1000
  const vbHeight = 1000

  let maskX = 0
  let maskY = 0
  let maskRadius = 0
  let offset = 0

  switch (size) {
    case 'xs':
      offset = placementOver === 'circle' ? -3 : -2
      maskRadius = 5
      break
    case 'sm':
      offset = placementOver === 'circle' ? -5 : -2
      maskRadius = 7.5
      break
    case 'md':
      offset = placementOver === 'circle' ? -4 : -4
      maskRadius = 10
      break
    case 'lg':
      offset = placementOver === 'circle' ? -7 : -4
      maskRadius = 15
      break
    case 'xl':
      offset = placementOver === 'circle' ? -8 : -4
      maskRadius = 19.5
      break
    case '2xl':
      offset = placementOver === 'circle' ? 1 : -2
      maskRadius = 25
      break
  }

  if (placementOver === 'circle') {
    switch (placement) {
      case 'top-left':
        maskX = maskRadius + offset
        maskY = maskRadius + offset
        break
      case 'top-right':
        maskX = vbWidth - maskRadius - offset
        maskY = maskRadius + offset
        break
      case 'bottom-right':
        maskX = vbWidth - maskRadius - offset
        maskY = vbHeight - maskRadius - offset
        break
      case 'bottom-left':
        maskX = maskRadius + offset
        maskY = vbHeight - maskRadius - offset
    }
  } else if (placementOver === 'square') {
    switch (placement) {
      case 'top-left':
        maskX = maskRadius / 2 + offset
        maskY = maskRadius / 2 + offset
        break
      case 'top-right':
        maskX = vbWidth - maskRadius / 2 - offset
        maskY = maskRadius / 2 + offset
        break
      case 'bottom-right':
        maskX = vbWidth - maskRadius / 2 - offset
        maskY = vbHeight - maskRadius / 2 - offset
        break
      case 'bottom-left':
        maskX = maskRadius / 2 + offset
        maskY = vbHeight - maskRadius / 2 - offset
    }
  } else {
    switch (placement) {
      case 'top-left':
        maskX = maskRadius / 2 + offset
        maskY = maskRadius / 2 + offset
        break
      case 'top-right':
        maskX = vbWidth - maskRadius / 2 - offset
        maskY = maskRadius / 2 + offset
        break
      case 'bottom-right':
        maskX = vbWidth - maskRadius / 2 - offset
        maskY = vbHeight - maskRadius / 2 - offset
        break
      case 'bottom-left':
        maskX = maskRadius / 2 + offset
        maskY = vbHeight - maskRadius / 2 - offset
    }
  }

  return hideIndicator
    ? 'none'
    : `url('data:image/svg+xml,<svg viewBox="0 0 ${vbWidth} ${vbHeight}" xmlns="http://www.w3.org/2000/svg"><circle cx="${maskX}" cy="${maskY}" r="${maskRadius}" /></svg>'), linear-gradient(#fff, #fff)`
}

/**
 * Returns the CSS mask-position value for an indicator badge.
 * @param placement - The indicator placement.
 * @returns The mask alignment string, or null for the default case.
 */
export function getIndicatorMaskAlign(placement: IndicatorPlacement): string | null {
  switch (placement) {
    case 'top-left':
      return '0 0'
    case 'top-right':
      return '100% 0'
    case 'bottom-right':
      return '100% 100%'
    case 'bottom-left':
      return '0 100%'
    default:
      return null
  }
}
