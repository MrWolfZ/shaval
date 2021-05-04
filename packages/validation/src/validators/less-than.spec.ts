import { isFailure } from '@shaval/core'
import { lessThan } from './less-than.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(lessThan.name, () => {
  it('throws for null comparand parameter', () => {
    expect(() => lessThan(null as any)).toThrow()
  })

  it('throws for undefined comparand parameter', () => {
    expect(() => lessThan(undefined as any)).toThrow()
  })

  it('fails for null', () => {
    expect(isFailure(lessThan(1)(null as any))).toBe(true)
  })

  it('fails for undefined', () => {
    expect(isFailure(lessThan(1)(undefined as any))).toBe(true)
  })

  it('fails for NaN', () => {
    expect(isFailure(lessThan(1)(NaN))).toBe(true)
  })

  it('fails for non-numeric value', () => {
    expect(isFailure(lessThan(1)('string' as any))).toBe(true)
  })

  it('succeeds if value is less than comparand', () => {
    expect(lessThan(1)(0)).toBe(0)
  })

  it('fails if value is equal to comparand', () => {
    const result = lessThan(1)(1)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.value).toBe(1)
    expect(Object.values(result.errors[0]?.details ?? {})).toEqual([{ comparand: 1 }])
  })

  it('fails if value is greater than comparand', () => {
    const result = lessThan(1)(2)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.value).toBe(2)
    expect(Object.values(result.errors[0]?.details ?? {})).toEqual([{ comparand: 1 }])
  })
})
