import { failure } from '@shaval/core'
import { custom, validator, Validator } from './validator.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(validator.name, () => {
  const stringValidator: Validator<string> = (value) => (value !== 'a' ? failure(value, 'not a') : value)

  it('resolves and shorthands', () => {
    const resolvedValidator = validator([stringValidator, stringValidator])
    expect(resolvedValidator('a')).toBe('a')
  })

  it('resolves nested and shorthands', () => {
    const resolvedValidator = validator([[stringValidator, stringValidator], stringValidator])
    expect(resolvedValidator('a')).toBe('a')
  })

  it('resolves nested "and" object shorthands', () => {
    const resolvedValidator = validator([{ s: stringValidator }, { s: stringValidator }])
    const value = { s: 'a' }
    expect(resolvedValidator(value)).toBe(value)
  })

  it('resolves object shorthands', () => {
    const resolvedValidator = validator({ s: stringValidator })
    const value = { s: 'a' }
    expect(resolvedValidator(value)).toBe(value)
  })

  it('resolves nested object shorthands', () => {
    const resolvedValidator = validator<{ s: { o: string } }>({ s: { o: stringValidator } })
    const value = { s: { o: 'a' } }
    expect(resolvedValidator(value)).toBe(value)
  })

  it('resolves nested object "and" shorthands', () => {
    const resolvedValidator = validator({ s: [stringValidator, stringValidator] })
    const value = { s: 'a' }
    expect(resolvedValidator(value)).toBe(value)
  })

  it('returns validators', () => {
    const resolvedValidator = validator(stringValidator)
    expect(resolvedValidator('a')).toBe('a')
  })

  it('throws for null validator', () => {
    expect(() => validator(null as any)).toThrow()
  })

  it('throws for undefined validator', () => {
    expect(() => validator(undefined as any)).toThrow()
  })
})

describe(custom.name, () => {
  it('throws for null validator parameter', () => {
    expect(() => custom(null as any)).toThrow()
  })

  it('throws for undefined validator parameter', () => {
    expect(() => custom(undefined as any)).toThrow()
  })

  it('if called with failure returns failure', () => {
    const validator = custom((v) => v)

    const err = failure([], 'fail')
    expect(validator(err)).toBe(err)
  })

  it('if called with value calls validation function', () => {
    const expectedValue = 'expected'
    const validationFn: Validator<string> = () => expectedValue
    const validator = custom(validationFn)
    expect(validator('')).toBe(expectedValue)
  })
})
