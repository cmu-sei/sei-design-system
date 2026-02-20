import { useFormValidation } from './useFormValidation'

/**
 * Standard form field props that all form components should have.
 * Use this to ensure consistency across components.
 * 
 * @example
 * Basic usage:
 * ```typescript
 * import { formFieldProps, useFormField } from '@/composables'
 * 
 * const props = defineProps({
 *   ...formFieldProps,
 *   placeholder: { type: String, default: '' },
 *   maxlength: { type: Number, default: 100 }
 * })
 * 
 * const { validationClasses } = useFormField(props)
 * ```
 */
export const formFieldProps = {
  /**
   * Disables the component to prevent user interaction.
   */
  disabled: { type: Boolean, default: false },
  
  /**
   * Determines whether the field is read-only.
   */
  readonly: { type: Boolean, default: false },
  
  /**
   * Determines whether the field is required.
   */
  required: { type: Boolean, default: false },
  
  /**
   * Sets a valid styling if true.
   */
  valid: { type: Boolean, default: false },
  
  /**
   * Sets an invalid styling if true.
   */
  invalid: { type: Boolean, default: false }
} as const

/**
 * Type for the standard form field props.
 */
export type FormFieldProps = typeof formFieldProps

/**
 * Interface for component props that include form field properties.
 * Extend this interface when typing component props that use formFieldProps.
 */
export interface ComponentPropsWithFormFields {
  disabled: boolean
  readonly: boolean
  required: boolean
  valid: boolean
  invalid: boolean
  [key: string]: unknown
}

/**
 * Convenience wrapper for useFormValidation that automatically maps
 * standard form field props. Eliminates repetitive prop mapping.
 * 
 * @param props - Component props object containing form field props
 * @returns Validation state and helper properties from useFormValidation
 * 
 * @example
 * ```typescript
 * import { formFieldProps, useFormField } from '@/composables'
 * 
 * const props = defineProps({
 *   ...formFieldProps,
 *   placeholder: { type: String, default: '' }
 * })
 * 
 * const { validationClasses, validationAttrs } = useFormField(props)
 * ```
 */
export function useFormField(props: ComponentPropsWithFormFields) {
  return useFormValidation({
    valid: () => props.valid,
    invalid: () => props.invalid,
    disabled: () => props.disabled,
    readonly: () => props.readonly,
    required: () => props.required
  })
}
