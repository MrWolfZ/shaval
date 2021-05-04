import { Errors, isFailure } from '@shaval/core'
import { greaterThan } from '../validators/greater-than.js'
import { lessThan } from '../validators/less-than.js'
import { sameAs } from '../validators/same-as.js'
import { or } from './or.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(or.name, () => {
  it('throws for null validator parameter', () => {
    expect(() => or(null as any)).toThrow()
  })

  it('throws for undefined validator parameter', () => {
    expect(() => or(undefined as any)).toThrow()
  })

  describe('no validators', () => {
    const validator = or()

    it('succeeds for empty string', () => {
      expect(validator('')).toBe('')
    })

    it('succeeds for non-empty string', () => {
      expect(validator('a')).toBe('a')
    })
  })

  describe('with single validator', () => {
    const validator = or(greaterThan(0))

    it('succeeds for valid value', () => {
      expect(validator(1)).toBe(1)
    })

    it('fails for invalid value', () => {
      const result = validator(0)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(1)
    })
  })

  describe('with multiple validators', () => {
    const validator = or<number>(greaterThan(4), lessThan(2), sameAs(3))

    it('succeeds for valid value of first validator', () => {
      expect(validator(5)).toBe(5)
    })

    it('succeeds for valid value of second validator', () => {
      expect(validator(1)).toBe(1)
    })

    it('succeeds for valid value of third validator', () => {
      expect(validator(3)).toBe(3)
    })

    it('fails for invalid value', () => {
      const result = validator(2)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(1)
    })

    it('aggregates error messages from all validators and adds them to special error message as details', () => {
      const result = validator(2)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(1)
      expect(result.errors[0]?.value).toBe(2)

      const errorDetails = result.errors[0]?.details ?? {}
      const detailKeys = Object.keys(errorDetails)
      expect(detailKeys).toHaveLength(1)

      const nestedErrors = errorDetails[detailKeys[0] ?? ''] as Errors[]
      expect(nestedErrors).toHaveLength(1)
      expect(Object.keys(nestedErrors[0]?.details ?? {})).toHaveLength(3)
    })
  })
})
