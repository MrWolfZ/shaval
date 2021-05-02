import { isShavalError } from '@shaval/core'
import { greaterThan } from './greater-than.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(greaterThan.name, () => {
  it('throws for null comparand parameter', () => {
    expect(() => greaterThan(null as any)).toThrow()
  })

  it('throws for undefined comparand parameter', () => {
    expect(() => greaterThan(undefined as any)).toThrow()
  })

  it('succeeds for null', () => {
    expect(greaterThan(1)(null)).toBe(null)
  })

  it('succeeds for undefined', () => {
    expect(greaterThan(1)(undefined)).toBe(undefined)
  })

  it('succeeds for non-numeric value', () => {
    expect(greaterThan(1)('string' as any)).toBe('string')
  })

  it('succeeds if value is greater than comparand', () => {
    expect(greaterThan(1)(2)).toBe(2)
  })

  it('fails if value is equal to comparand', () => {
    const result = greaterThan(1)(1)

    if (!isShavalError(result)) {
      return fail('result was not an error')
    }

    expect(result.value).toBe(1)
    expect(result.errors).toHaveLength(1)
  })

  it('fails if value is less than comparand', () => {
    const result = greaterThan(1)(0)

    if (!isShavalError(result)) {
      return fail('result was not an error')
    }

    expect(result.value).toBe(0)
    expect(result.errors).toHaveLength(1)
  })
})
