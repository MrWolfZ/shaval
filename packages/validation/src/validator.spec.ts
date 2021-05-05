import { failure } from '@shaval/core'
import { resolveValidatorOrShorthand, Validator } from './validator.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(resolveValidatorOrShorthand.name, () => {
  const validator: Validator<string> = (value) => (value !== 'a' ? failure(value, 'not a') : value)

  it('resolves and shorthands', () => {
    const resolvedValidator = resolveValidatorOrShorthand([validator, validator])
    expect(resolvedValidator('a')).toBe('a')
  })

  it('resolves nested and shorthands', () => {
    const resolvedValidator = resolveValidatorOrShorthand([[validator, validator], validator])
    expect(resolvedValidator('a')).toBe('a')
  })

  it('resolves nested "and" object shorthands', () => {
    const resolvedValidator = resolveValidatorOrShorthand([{ s: validator }, { s: validator }])
    const value = { s: 'a' }
    expect(resolvedValidator(value)).toBe(value)
  })

  it('resolves object shorthands', () => {
    const resolvedValidator = resolveValidatorOrShorthand({ s: validator })
    const value = { s: 'a' }
    expect(resolvedValidator(value)).toBe(value)
  })

  it('resolves nested object shorthands', () => {
    const resolvedValidator = resolveValidatorOrShorthand<{ s: { o: string } }>({ s: { o: validator } })
    const value = { s: { o: 'a' } }
    expect(resolvedValidator(value)).toBe(value)
  })

  it('resolves nested object "and" shorthands', () => {
    const resolvedValidator = resolveValidatorOrShorthand({ s: [validator, validator] })
    const value = { s: 'a' }
    expect(resolvedValidator(value)).toBe(value)
  })

  it('returns validators', () => {
    const resolvedValidator = resolveValidatorOrShorthand(validator)
    expect(resolvedValidator('a')).toBe('a')
  })

  it('throws for null validator', () => {
    expect(() => resolveValidatorOrShorthand(null as any)).toThrow()
  })

  it('throws for undefined validator', () => {
    expect(() => resolveValidatorOrShorthand(undefined as any)).toThrow()
  })
})
