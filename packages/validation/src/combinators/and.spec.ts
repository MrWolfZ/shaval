import { failure, isFailure } from '@shaval/core'
import type { Validator } from '../validator.js'
import { and } from './and.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(and.name, () => {
  const validator1: Validator<string> = (value) => (value === 'a' ? value : failure(value, 'a'))
  const validator2: Validator<string> = (value) => (value === 'a' || value === 'b' ? value : failure(value, 'b'))
  const validator3: Validator<string> = (value) =>
    value === 'a' || value === 'b' || value === 'c' ? value : failure(value, 'c')

  it('throws for null validator parameter', () => {
    expect(() => and(validator1, null as any)).toThrow()
  })

  it('throws for undefined validator parameter', () => {
    expect(() => and(validator1, undefined as any)).toThrow()
  })

  it('if called with failure returns failure', () => {
    const validator = and(
      (v) => v,
      (v) => v,
    )

    const err = failure([], 'fail')
    expect(validator(err)).toBe(err)
  })

  const validator = and(validator1, validator2, validator3)

  it('succeeds for valid value', () => {
    expect(validator('a')).toBe('a')
  })

  it('fails for invalid value', () => {
    expect(isFailure(validator('d'))).toBe(true)
  })

  it('aggregates error messages from all failing validators', () => {
    const result = validator('c')

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.value).toBe('c')
    expect(Object.keys(result.errors[0]?.details ?? {})).toHaveLength(2)
  })
})
