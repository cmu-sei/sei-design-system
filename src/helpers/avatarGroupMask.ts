/**
 * Returns the CSS mask-position value for an avatar group item.
 * @returns The mask alignment string.
 */
export function getAvatarGroupMaskAlign(): string {
  return '99% 50%'
}

/**
 * Generates the CSS mask SVG string for an avatar group item.
 * @param shape - The avatar shape ('circle' | 'square').
 * @param size - The avatar size ('xs' | 'sm' | 'md').
 * @param density - The avatar group density ('default' | 'condensed').
 * @param theme - The theme variant ('forge' | 'plaid').
 * @returns The CSS mask string with an inline SVG data URI.
 */
export function getAvatarGroupMaskSpec(
  shape: 'circle' | 'square',
  size: 'xs' | 'sm' | 'md',
  density: 'default' | 'condensed',
  theme = 'forge'
): string {
  const vbWidth = 1000
  const vbHeight = 1000

  let maskX = 0
  let maskY = 0
  let maskSize = 0
  let maskRadius = 0
  let offset = 0

  switch (shape) {
    case 'circle':
      switch (size) {
        case 'xs':
          maskRadius = 1
          maskSize = 13.5
          offset = density === 'condensed' ? -11 : -4
          break
        case 'sm':
          maskRadius = 1
          maskSize = 17
          offset = density === 'condensed' ? -8 : 0
          break
        case 'md':
          maskRadius = 1
          maskSize = 26
          offset = density === 'condensed' ? -12 : 0
          break
      }
      maskX = vbWidth + offset
      maskY = vbHeight / 2
      break
    case 'square':
      switch (size) {
        case 'xs':
          maskRadius = theme === 'plaid' ? 0 : 4
          maskSize = 26
          maskX = density === 'condensed' ? 976 : 983
          maskY = 487
          break
        case 'sm':
          maskRadius = theme === 'plaid' ? 0 : 4
          maskSize = 34
          maskX = density === 'condensed' ? 975 : 983
          maskY = 483
          break
        case 'md':
          maskRadius = theme === 'plaid' ? 0 : 6
          maskSize = 50
          maskX = density === 'condensed' ? 963 : 975
          maskY = 475
          break
      }
      break
  }

  const circleMask = `url('data:image/svg+xml,<svg viewBox="0 0 ${vbWidth} ${vbHeight}" xmlns="http://www.w3.org/2000/svg"><circle cx="${maskX}" cy="${maskY}" r="${maskSize}" /></svg>'), linear-gradient(#fff, #fff)`
  const squareMask = `url('data:image/svg+xml,<svg viewBox="0 0 ${vbWidth} ${vbHeight}" xmlns="http://www.w3.org/2000/svg"><rect x="${maskX}" y="${maskY}" width="${maskSize}" height="${maskSize}" rx="${maskRadius}" /></svg>'), linear-gradient(#fff, #fff)`

  return shape === 'circle' ? circleMask : squareMask
}
