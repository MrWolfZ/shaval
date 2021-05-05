import { failure, isFailure } from '@shaval/core'
import type { Validator } from '../validator.js'
import { allowUndefined } from './allow-undefined.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(allowUndefined.name, () => {
  const wrappedValidator: Validator<string> = (value) => (value === 'a' ? value : failure(value, 'a'))

  it('throws for null validator parameter', () => {
    expect(() => allowUndefined(null as any)).toThrow()
  })

  it('throws for undefined validator parameter', () => {
    expect(() => allowUndefined(undefined as any)).toThrow()
  })

  it('if called with failure returns failure', () => {
    const validator = allowUndefined((v) => v)

    const err = failure([], 'fail')
    expect(validator(err)).toBe(err)
  })

  const validator = allowUndefined(wrappedValidator)

  it('succeeds for valid value', () => {
    expect(validator('a')).toBe('a')
  })

  it('succeeds for undefined', () => {
    expect(validator(undefined)).toBe(undefined)
  })

  it('fails for invalid value', () => {
    expect(isFailure(validator('d'))).toBe(true)
  })

  it('resolves "and" shorthand', () => {
    const validator: Validator<number> = (value) => value
    expect(allowUndefined([validator, validator])(1)).toEqual(1)
  })

  it('resolves object shorthand', () => {
    const validator: Validator<number> = (value) => value
    const value = { n: 1 }
    expect(allowUndefined({ n: validator })(value)).toBe(value)
  })
})
