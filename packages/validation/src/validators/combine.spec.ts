import { isShavalError } from '@shaval/core'
import { combine } from './combine.js'
import { greaterThan } from './greater-than.js'
import { lessThan } from './less-than.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(combine.name, () => {
  it('throws for null validator parameter', () => {
    expect(() => combine(null as any)).toThrow()
  })

  it('throws for undefined validator parameter', () => {
    expect(() => combine(undefined as any)).toThrow()
  })

  describe('no validators', () => {
    const validator = combine()

    it('succeeds for empty string', () => {
      expect(validator('')).toBe('')
    })

    it('succeeds for non-empty string', () => {
      expect(validator('a')).toBe('a')
    })
  })

  describe('with single validator', () => {
    const validator = combine(greaterThan(0))

    it('succeeds for valid value', () => {
      expect(validator(1)).toBe(1)
    })

    it('fails for invalid value', () => {
      const result = validator(0)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(0)
      expect(result.errors).toHaveLength(1)
    })
  })

  describe('with multiple validators', () => {
    const validator = combine(greaterThan(0), lessThan(4))

    it('succeeds for valid value', () => {
      expect(validator(1)).toBe(1)
    })

    it('fails for invalid value', () => {
      const result = validator(0)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(0)
      expect(result.errors).toHaveLength(1)
    })

    it('aggregates error messages from all validators', () => {
      const validator = combine(greaterThan(0), greaterThan(-1))
      const result = validator(-1)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(-1)
      expect(result.errors).toHaveLength(2)
    })
  })
})
