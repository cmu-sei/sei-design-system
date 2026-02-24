import { computed, toValue, type Ref, type MaybeRefOrGetter } from 'vue'

/**
 * Validation state for a form field.
 * - 'valid': Field has passed validation
 * - 'invalid': Field has failed validation
 * - 'neutral': No validation state (default)
 */
export type ValidationState = 'valid' | 'invalid' | 'neutral'

/**
 * Options for configuring form field validation behavior.
 */
export interface UseFormValidationOptions {
  /**
   * Whether the field is in a valid state.
   * @default false
   */
  valid?: MaybeRefOrGetter<boolean>

  /**
   * Whether the field is in an invalid state.
   * @default false
   */
  invalid?: MaybeRefOrGetter<boolean>

  /**
   * Whether the field is required.
   * @default false
   */
  required?: MaybeRefOrGetter<boolean>

  /**
   * Whether the field is disabled.
   * @default false
   */
  disabled?: MaybeRefOrGetter<boolean>

  /**
   * Whether the field is read-only.
   * @default false
   */
  readonly?: MaybeRefOrGetter<boolean>
}

/**
 * Return type from the useFormValidation composable.
 */
export interface UseFormValidationReturn {
  /**
   * Computed object of CSS classes for validation states.
   * Can be spread directly into component class bindings.
   * 
   * @example
   * ```vue
   * <input :class="validationClasses" />
   * ```
   */
  validationClasses: Ref<{
    valid: boolean
    invalid: boolean
    disabled: boolean
    readonly: boolean
    required: boolean
  }>

  /**
   * Computed object of ARIA attributes for accessibility.
   * Can be spread directly into component attribute bindings.
   * 
   * @example
   * ```vue
   * <input v-bind="validationAttrs" />
   * ```
   */
  validationAttrs: Ref<{
    'aria-invalid'?: 'true'
    'aria-disabled'?: 'true'
    'aria-required'?: 'true'
    'aria-readonly'?: 'true'
  }>

  /**
   * Whether the field can be interacted with.
   * False if disabled or readonly.
   */
  isInteractive: Ref<boolean>

  /**
   * Current validation state of the field.
   * Returns 'invalid', 'valid', or 'neutral'.
   */
  validationState: Ref<ValidationState>

  /**
   * Whether the field is in a valid state.
   */
  isValid: Ref<boolean>

  /**
   * Whether the field is in an invalid state.
   */
  isInvalid: Ref<boolean>

  /**
   * Whether the field is required.
   */
  isRequired: Ref<boolean>

  /**
   * Whether the field is disabled.
   */
  isDisabled: Ref<boolean>

  /**
   * Whether the field is read-only.
   */
  isReadonly: Ref<boolean>
}

/**
 * Composable for managing form field validation states.
 * 
 * Provides a consistent API for handling validation states, disabled states,
 * readonly states, and required states across all form components in the design system.
 * 
 * This eliminates repetitive prop definitions and computed properties while ensuring
 * consistent behavior and styling across all form fields.
 * 
 * @param options - Configuration options for validation behavior
 * @returns Validation state and helper properties
 * 
 * @example
 * Basic usage in an input component:
 * ```vue
 * <script setup lang="ts">
 * import { useFormValidation } from '@/composables'
 * 
 * const props = defineProps({
 *   valid: { type: Boolean, default: false },
 *   invalid: { type: Boolean, default: false },
 *   disabled: { type: Boolean, default: false },
 *   readonly: { type: Boolean, default: false },
 *   required: { type: Boolean, default: false }
 * })
 * 
 * const {
 *   validationClasses,
 *   isInteractive,
 *   validationState
 * } = useFormValidation({
 *   valid: () => props.valid,
 *   invalid: () => props.invalid,
 *   disabled: () => props.disabled,
 *   readonly: () => props.readonly,
 *   required: () => props.required
 * })
 * </script>
 * 
 * <template>
 *   <input
 *     class="form-control"
 *     :class="validationClasses"
 *     :disabled="!isInteractive"
 *   />
 * </template>
 * ```
 * 
 * @example
 * Using validation state for conditional rendering:
 * ```vue
 * <template>
 *   <div>
 *     <input :class="validationClasses" />
 *     <p v-if="validationState === 'invalid'" class="text-red-600">
 *       Please correct this field
 *     </p>
 *     <p v-if="validationState === 'valid'" class="text-green-600">
 *       Looks good!
 *     </p>
 *   </div>
 * </template>
 * ```
 * 
 * @example
 * With reactive refs:
 * ```ts
 * const isValid = ref(false)
 * const isDisabled = ref(false)
 * 
 * const { validationClasses, isInteractive } = useFormValidation({
 *   valid: isValid,
 *   disabled: isDisabled
 * })
 * 
 * // Later...
 * isValid.value = true  // validationClasses will update reactively
 * ```
 * 
 * @example
 * Conditional interactivity:
 * ```vue
 * <template>
 *   <button
 *     :disabled="!isInteractive"
 *     @click="isInteractive ? handleClick() : null"
 *   >
 *     Submit
 *   </button>
 * </template>
 * ```
 */
export function useFormValidation(
  options: UseFormValidationOptions = {}
): UseFormValidationReturn {
  const {
    valid = false,
    invalid = false,
    required = false,
    disabled = false,
    readonly = false
  } = options

  // Computed properties for individual states
  const isValid = computed(() => toValue(valid))
  const isInvalid = computed(() => toValue(invalid))
  const isRequired = computed(() => toValue(required))
  const isDisabled = computed(() => toValue(disabled))
  const isReadonly = computed(() => toValue(readonly))

  // Computed class object for template bindings
  const validationClasses = computed(() => ({
    valid: isValid.value,
    invalid: isInvalid.value,
    disabled: isDisabled.value,
    readonly: isReadonly.value,
    required: isRequired.value
  }))

  // Computed ARIA attributes for accessibility
  const validationAttrs = computed(() => ({
    ...(isInvalid.value && { 'aria-invalid': 'true' as const }),
    ...(isDisabled.value && { 'aria-disabled': 'true' as const }),
    ...(isRequired.value && { 'aria-required': 'true' as const }),
    ...(isReadonly.value && { 'aria-readonly': 'true' as const })
  }))

  // Whether the field can be interacted with
  const isInteractive = computed(() => !isDisabled.value && !isReadonly.value)

  // Current validation state
  const validationState = computed<ValidationState>(() => {
    if (isInvalid.value) return 'invalid'
    if (isValid.value) return 'valid'
    return 'neutral'
  })

  return {
    validationClasses,
    validationAttrs,
    isInteractive,
    validationState,
    isValid,
    isInvalid,
    isRequired,
    isDisabled,
    isReadonly
  }
}
