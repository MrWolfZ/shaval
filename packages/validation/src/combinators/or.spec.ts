import { Errors, failure, isFailure } from '@shaval/core'
import type { Validator } from '../validator.js'
import { or } from './or.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(or.name, () => {
  const validator1: Validator<string> = (value) => (value === 'a' ? value : failure(value, 'a'))
  const validator2: Validator<string> = (value) => (value === 'b' ? value : failure(value, 'b'))
  const validator3: Validator<string> = (value) => (value === 'c' ? value : failure(value, 'c'))

  it('throws for null validator parameter', () => {
    expect(() => or(validator1, null as any)).toThrow()
  })

  it('throws for undefined validator parameter', () => {
    expect(() => or(validator1, undefined as any)).toThrow()
  })

  it('if called with failure returns failure', () => {
    const validator = or(
      (v) => v,
      (v) => v,
    )

    const err = failure([], 'fail')
    expect(validator(err)).toBe(err)
  })

  const validator = or(validator1, validator2, validator3)

  it('succeeds for valid value of first validator', () => {
    expect(validator('a')).toBe('a')
  })

  it('succeeds for valid value of second validator', () => {
    expect(validator('b')).toBe('b')
  })

  it('succeeds for valid value of third validator', () => {
    expect(validator('c')).toBe('c')
  })

  it('fails for invalid value', () => {
    expect(isFailure(validator('d'))).toBe(true)
  })

  it('aggregates error messages from all validators and adds them to special error message as details', () => {
    const result = validator('d')

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.value).toBe('d')

    const errorDetails = result.errors[0]?.details ?? {}
    const detailKeys = Object.keys(errorDetails)
    expect(detailKeys).toHaveLength(1)

    const nestedErrors = errorDetails[detailKeys[0] ?? ''] as Errors[]
    expect(nestedErrors).toHaveLength(1)
    expect(Object.keys(nestedErrors[0]?.details ?? {})).toHaveLength(3)
  })
})
