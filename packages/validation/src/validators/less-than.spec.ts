import { isShavalError } from '@shaval/core'
import { lessThan } from './less-than.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(lessThan.name, () => {
  it('throws for null comparand parameter', () => {
    expect(() => lessThan(null as any)).toThrow()
  })

  it('throws for undefined comparand parameter', () => {
    expect(() => lessThan(undefined as any)).toThrow()
  })

  it('succeeds for null', () => {
    expect(lessThan(1)(null)).toBe(null)
  })

  it('succeeds for undefined', () => {
    expect(lessThan(1)(undefined)).toBe(undefined)
  })

  it('succeeds for non-numeric value', () => {
    expect(lessThan(1)('string' as any)).toBe('string')
  })

  it('succeeds if value is less than comparand', () => {
    expect(lessThan(1)(0)).toBe(0)
  })

  it('fails if value is equal to comparand', () => {
    const result = lessThan(1)(1)

    if (!isShavalError(result)) {
      return fail('result was not an error')
    }

    expect(result.value).toBe(1)
    expect(result.errors).toHaveLength(1)
  })

  it('fails if value is greater than comparand', () => {
    const result = lessThan(1)(2)

    if (!isShavalError(result)) {
      return fail('result was not an error')
    }

    expect(result.value).toBe(2)
    expect(result.errors).toHaveLength(1)
  })
})
