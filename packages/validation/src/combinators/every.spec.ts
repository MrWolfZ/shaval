import { failure, isFailure } from '@shaval/core'
import type { Validator } from '../validator.js'
import { every } from './every.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(every.name, () => {
  it('throws for null validator parameter', () => {
    expect(() => every(null as any)).toThrow()
  })

  it('throws for undefined validator parameter', () => {
    expect(() => every(undefined as any)).toThrow()
  })

  it('if called with failure returns failure', () => {
    const validator = every((v) => v)
    const err = failure([], 'fail')
    expect(validator(err)).toBe(err)
  })

  describe('with single validator', () => {
    const itemValidator: Validator<number> = (value) => value
    const validator = every(itemValidator)

    it('succeeds for empty array', () => {
      const value: number[] = []
      expect(validator(value)).toBe(value)
    })

    it('succeeds for non-empty array', () => {
      const value = [1, 2, 3]
      expect(validator(value)).toBe(value)
    })

    it('fails if single element is invalid', () => {
      const itemValidator: Validator<number> = (value) => (value === 1 ? failure(value, '') : value)
      const validator = every(itemValidator)
      expect(isFailure(validator([1, 2, 3]))).toBe(true)
    })

    it('fails if multiple elements are invalid', () => {
      const itemValidator: Validator<number> = (value) => (value !== 1 ? failure(value, '') : value)
      const validator = every(itemValidator)
      expect(isFailure(validator([1, 2, 3]))).toBe(true)
    })

    it('aggregates error messages from all items', () => {
      const itemValidator: Validator<number> = (value) => failure(value, '')
      const validator = every(itemValidator)

      const result = validator([1, 2])

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)
    })

    it('adds the item index to path for errors', () => {
      const itemValidator: Validator<number> = (value) =>
        value === 1 ? failure([{ value, path: ['p'], details: { '1': 1 } }]) : value === 3 ? failure(value, '3') : value

      const validator = every(itemValidator)

      const result = validator([1, 2, 3])

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)
      expect(result.errors[0]?.path).toEqual(['0', 'p'])
      expect(result.errors[1]?.path).toEqual(['2'])
    })
  })

  describe('with multiple validators', () => {
    const itemValidator1: Validator<number> = (value) => value
    const itemValidator2: Validator<number> = (value) => value
    const validator = every(itemValidator1, itemValidator2)

    it('succeeds for empty array', () => {
      const value: number[] = []
      expect(validator(value)).toBe(value)
    })

    it('succeeds for non-empty array', () => {
      const value = [1, 2, 3]
      expect(validator(value)).toBe(value)
    })

    it('fails if single element is invalid', () => {
      const itemValidator1: Validator<number> = (value) => (value === 1 ? failure(value, '') : value)
      const itemValidator2: Validator<number> = (value) => value
      const validator = every(itemValidator1, itemValidator2)
      expect(isFailure(validator([1, 2, 3]))).toBe(true)
    })

    it('fails if multiple elements are invalid', () => {
      const itemValidator1: Validator<number> = (value) => (value !== 1 ? failure(value, '') : value)
      const itemValidator2: Validator<number> = (value) => value
      const validator = every(itemValidator1, itemValidator2)
      expect(isFailure(validator([1, 2, 3]))).toBe(true)
    })

    it('aggregates error messages from all validators', () => {
      const itemValidator1: Validator<number> = (value) => failure(value, '1')
      const itemValidator2: Validator<number> = (value) => failure(value, '2')
      const validator = every(itemValidator1, itemValidator2)

      const result = validator([1])

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(1)
      expect(result.errors[0]?.value).toBe(1)
      expect(Object.keys(result.errors[0]?.details ?? {})).toHaveLength(2)
    })

    it('aggregates error messages from all items', () => {
      const itemValidator1: Validator<number> = (value) => failure(value, '')
      const itemValidator2: Validator<number> = (value) => value
      const validator = every(itemValidator1, itemValidator2)

      const result = validator([1, 2])

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)
      expect(result.errors[0]?.value).toBe(1)
      expect(result.errors[1]?.value).toBe(2)
      expect(Object.keys(result.errors[0]?.details ?? {})).toHaveLength(1)
      expect(Object.keys(result.errors[1]?.details ?? {})).toHaveLength(1)
    })

    it('adds the item index to path for errors', () => {
      const itemValidator1: Validator<number> = (value) => (value !== 2 ? failure(value, '') : value)
      const itemValidator2: Validator<number> = (value) => value
      const validator = every(itemValidator1, itemValidator2)

      const result = validator([1, 2, 3])

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)
      expect(result.errors[0]?.path).toEqual(['0'])
      expect(result.errors[1]?.path).toEqual(['2'])
    })
  })

  it('resolves "and" shorthand', () => {
    const validator: Validator<number> = (value) => value
    expect(every([validator, validator])([1])).toEqual([1])
  })

  it('resolves object shorthand', () => {
    const validator: Validator<number> = (value) => value
    const value = [{ n: 1 }]
    expect(every({ n: validator })(value)).toBe(value)
  })
})