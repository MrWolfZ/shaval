import { failure, isFailure } from '@shaval/core'
import { greaterThan } from './greater-than.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(greaterThan.name, () => {
  it('throws for null comparand parameter', () => {
    expect(() => greaterThan(null as any)).toThrow()
  })

  it('throws for undefined comparand parameter', () => {
    expect(() => greaterThan(undefined as any)).toThrow()
  })

  it('if called with failure returns failure', () => {
    const err = failure(1, 'fail')
    expect(greaterThan(0)(err)).toBe(err)
  })

  it('fails for null', () => {
    expect(isFailure(greaterThan(1)(null as any))).toBe(true)
  })

  it('fails for undefined', () => {
    expect(isFailure(greaterThan(1)(undefined as any))).toBe(true)
  })

  it('fails for NaN', () => {
    expect(isFailure(greaterThan(1)(NaN))).toBe(true)
  })

  it('fails for non-numeric value', () => {
    expect(isFailure(greaterThan(1)('string' as any))).toBe(true)
  })

  it('succeeds if value is greater than comparand', () => {
    expect(greaterThan(1)(2)).toBe(2)
  })

  it('fails if value is equal to comparand', () => {
    const result = greaterThan(1)(1)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.value).toBe(1)
    expect(Object.values(result.errors[0]?.details ?? {})).toEqual([{ comparand: 1 }])
  })

  it('fails if value is less than comparand', () => {
    const result = greaterThan(1)(0)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.value).toBe(0)
    expect(Object.values(result.errors[0]?.details ?? {})).toEqual([{ comparand: 1 }])
  })
})
