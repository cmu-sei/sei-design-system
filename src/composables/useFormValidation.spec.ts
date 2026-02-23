import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useFormValidation } from './useFormValidation'

describe('useFormValidation', () => {
  it('should return default values when no options provided', () => {
    const {
      validationClasses,
      validationAttrs,
      isInteractive,
      validationState,
      isValid,
      isInvalid,
      isRequired,
      isDisabled,
      isReadonly
    } = useFormValidation()

    expect(validationClasses.value).toEqual({
      valid: false,
      invalid: false,
      disabled: false,
      readonly: false,
      required: false
    })
    expect(validationAttrs.value).toEqual({})
    expect(isInteractive.value).toBe(true)
    expect(validationState.value).toBe('neutral')
    expect(isValid.value).toBe(false)
    expect(isInvalid.value).toBe(false)
    expect(isRequired.value).toBe(false)
    expect(isDisabled.value).toBe(false)
    expect(isReadonly.value).toBe(false)
  })

  it('should handle valid state', () => {
    const { validationClasses, validationState, isValid } = useFormValidation({
      valid: true
    })

    expect(validationClasses.value.valid).toBe(true)
    expect(validationState.value).toBe('valid')
    expect(isValid.value).toBe(true)
  })

  it('should handle invalid state', () => {
    const { validationClasses, validationState, isInvalid } = useFormValidation({
      invalid: true
    })

    expect(validationClasses.value.invalid).toBe(true)
    expect(validationState.value).toBe('invalid')
    expect(isInvalid.value).toBe(true)
  })

  it('should prioritize invalid over valid in validation state', () => {
    const { validationState } = useFormValidation({
      valid: true,
      invalid: true
    })

    expect(validationState.value).toBe('invalid')
  })

  it('should handle disabled state', () => {
    const { validationClasses, isDisabled, isInteractive } = useFormValidation({
      disabled: true
    })

    expect(validationClasses.value.disabled).toBe(true)
    expect(isDisabled.value).toBe(true)
    expect(isInteractive.value).toBe(false)
  })

  it('should handle readonly state', () => {
    const { validationClasses, isReadonly, isInteractive } = useFormValidation({
      readonly: true
    })

    expect(validationClasses.value.readonly).toBe(true)
    expect(isReadonly.value).toBe(true)
    expect(isInteractive.value).toBe(false)
  })

  it('should handle required state', () => {
    const { isRequired } = useFormValidation({
      required: true
    })

    expect(isRequired.value).toBe(true)
  })

  it('should not be interactive when disabled', () => {
    const { isInteractive } = useFormValidation({
      disabled: true
    })

    expect(isInteractive.value).toBe(false)
  })

  it('should not be interactive when readonly', () => {
    const { isInteractive } = useFormValidation({
      readonly: true
    })

    expect(isInteractive.value).toBe(false)
  })

  it('should not be interactive when both disabled and readonly', () => {
    const { isInteractive } = useFormValidation({
      disabled: true,
      readonly: true
    })

    expect(isInteractive.value).toBe(false)
  })

  it('should react to changes in reactive refs', () => {
    const valid = ref(false)
    const invalid = ref(false)
    const disabled = ref(false)

    const { validationClasses, validationState, isInteractive } = useFormValidation({
      valid,
      invalid,
      disabled
    })

    // Initial state
    expect(validationState.value).toBe('neutral')
    expect(isInteractive.value).toBe(true)

    // Change to valid
    valid.value = true
    expect(validationClasses.value.valid).toBe(true)
    expect(validationState.value).toBe('valid')

    // Change to invalid
    invalid.value = true
    expect(validationClasses.value.invalid).toBe(true)
    expect(validationState.value).toBe('invalid')

    // Disable
    disabled.value = true
    expect(validationClasses.value.disabled).toBe(true)
    expect(isInteractive.value).toBe(false)
  })

  it('should work with getter functions', () => {
    const valid = false
    const disabled = false

    const { validationClasses, isInteractive } = useFormValidation({
      valid: () => valid,
      disabled: () => disabled
    })

    // Initial state
    expect(validationClasses.value.valid).toBe(false)
    expect(isInteractive.value).toBe(true)

    // Note: Changes to plain variables won't trigger reactivity
    // This demonstrates that getter functions work but aren't reactive
    // For reactive behavior, use refs
  })

  it('should handle all states simultaneously', () => {
    const { validationClasses, validationAttrs } = useFormValidation({
      valid: true,
      invalid: true,
      disabled: true,
      readonly: true,
      required: true
    })

    expect(validationClasses.value).toEqual({
      valid: true,
      invalid: true,
      disabled: true,
      readonly: true,
      required: true
    })
    expect(validationAttrs.value).toEqual({
      'aria-invalid': 'true',
      'aria-disabled': 'true',
      'aria-required': 'true',
      'aria-readonly': 'true'
    })
  })

  it('should work in a realistic form scenario', () => {
    const value = ref('')
    const touched = ref(false)
    const submitting = ref(false)

    const isValid = ref(false)
    const isInvalid = ref(false)

    // Simulate validation logic
    const validate = () => {
      if (!touched.value) return
      isValid.value = value.value.length >= 3
      isInvalid.value = touched.value && value.value.length < 3
    }

    const { validationClasses, isInteractive, validationState } = useFormValidation({
      valid: isValid,
      invalid: isInvalid,
      disabled: submitting
    })

    // Initial state
    expect(validationState.value).toBe('neutral')
    expect(isInteractive.value).toBe(true)

    // User touches field
    touched.value = true
    validate()
    expect(validationState.value).toBe('invalid')

    // User types valid input
    value.value = 'test'
    validate()
    expect(validationState.value).toBe('valid')
    expect(validationClasses.value.valid).toBe(true)

    // Form submitting
    submitting.value = true
    expect(isInteractive.value).toBe(false)
    expect(validationClasses.value.disabled).toBe(true)
  })

  it('should expose all boolean flags for flexible usage', () => {
    const {
      isValid,
      isInvalid,
      isRequired,
      isDisabled,
      isReadonly
    } = useFormValidation({
      valid: true,
      invalid: false,
      required: true,
      disabled: false,
      readonly: true
    })

    expect(isValid.value).toBe(true)
    expect(isInvalid.value).toBe(false)
    expect(isRequired.value).toBe(true)
    expect(isDisabled.value).toBe(false)
    expect(isReadonly.value).toBe(true)
  })
})
