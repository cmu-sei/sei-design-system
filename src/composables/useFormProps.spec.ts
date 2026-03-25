import { describe, expect, it } from 'vitest'
import { formFieldProps, useFormField } from './useFormProps'

describe('formFieldProps', () => {
  it('defines disabled prop with default false', () => {
    expect(formFieldProps.disabled.default).toBe(false)
    expect(formFieldProps.disabled.type).toBe(Boolean)
  })

  it('defines readonly prop with default false', () => {
    expect(formFieldProps.readonly.default).toBe(false)
    expect(formFieldProps.readonly.type).toBe(Boolean)
  })

  it('defines required prop with default false', () => {
    expect(formFieldProps.required.default).toBe(false)
    expect(formFieldProps.required.type).toBe(Boolean)
  })

  it('defines valid prop with default false', () => {
    expect(formFieldProps.valid.default).toBe(false)
    expect(formFieldProps.valid.type).toBe(Boolean)
  })

  it('defines invalid prop with default false', () => {
    expect(formFieldProps.invalid.default).toBe(false)
    expect(formFieldProps.invalid.type).toBe(Boolean)
  })

  it('exposes exactly the five standard form field props', () => {
    expect(Object.keys(formFieldProps)).toEqual(['disabled', 'readonly', 'required', 'valid', 'invalid'])
  })
})

describe('useFormField', () => {
  const buildProps = (overrides = {}) => ({
    disabled: false,
    readonly: false,
    required: false,
    valid: false,
    invalid: false,
    ...overrides
  })

  it('returns validation state for default props', () => {
    const { validationState } = useFormField(buildProps())
    expect(validationState.value).toBe('neutral')
  })

  it('returns valid state when valid prop is true', () => {
    const { isValid, validationState } = useFormField(buildProps({ valid: true }))
    expect(isValid.value).toBe(true)
    expect(validationState.value).toBe('valid')
  })

  it('returns invalid state when invalid prop is true', () => {
    const { isInvalid, validationState } = useFormField(buildProps({ invalid: true }))
    expect(isInvalid.value).toBe(true)
    expect(validationState.value).toBe('invalid')
  })

  it('returns disabled state when disabled prop is true', () => {
    const { isDisabled, isInteractive } = useFormField(buildProps({ disabled: true }))
    expect(isDisabled.value).toBe(true)
    expect(isInteractive.value).toBe(false)
  })

  it('returns readonly state when readonly prop is true', () => {
    const { isReadonly, isInteractive } = useFormField(buildProps({ readonly: true }))
    expect(isReadonly.value).toBe(true)
    expect(isInteractive.value).toBe(false)
  })

  it('returns required state when required prop is true', () => {
    const { isRequired } = useFormField(buildProps({ required: true }))
    expect(isRequired.value).toBe(true)
  })

  it('includes aria-required in validationAttrs when required is true', () => {
    const { validationAttrs } = useFormField(buildProps({ required: true }))
    expect(validationAttrs.value).toHaveProperty('aria-required', 'true')
  })

  it('includes aria-invalid in validationAttrs when invalid is true', () => {
    const { validationAttrs } = useFormField(buildProps({ invalid: true }))
    expect(validationAttrs.value).toHaveProperty('aria-invalid', 'true')
  })
})
