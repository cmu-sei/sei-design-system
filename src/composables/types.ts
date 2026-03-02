/**
 * Shared type definitions for the SEI Design System
 */

import type { Placement as BasePlacement } from '@floating-ui/dom'

/**
 * Shared placement type for all dropdown components.
 * Extends the base FloatingUI placement with auto-placement variants.
 */
export type DropdownPlacement = BasePlacement | 'auto' | 'auto-start' | 'auto-end'
