import { isFailure, isSuccess } from '@shaval/core'
import { boolean } from './boolean.js'
import { nullable } from './nullable.js'
import { number } from './number.js'
import { optional } from './optional.js'
import { string } from './string.js'
import { union } from './union.js'

describe(union.name, () => {
  describe('two types', () => {
    const parser = union(string, number)

    it('succeeds for empty string', () => {
      expect(parser('')).toBe('')
    })

    it('succeeds for non-empty string', () => {
      expect(parser('a')).toBe('a')
    })

    it('succeeds for zero', () => {
      expect(parser(0)).toBe(0)
    })

    it('succeeds for non-zero', () => {
      expect(parser(1)).toBe(1)
    })

    it('fails for undefined', () => {
      expect(isSuccess(parser(undefined))).toBe(false)
    })

    it('fails for null', () => {
      expect(isSuccess(parser(null))).toBe(false)
    })

    it('fails for boolean', () => {
      expect(isSuccess(parser(true))).toBe(false)
    })

    it('fails for object', () => {
      expect(isSuccess(parser({ s: '' }))).toBe(false)
    })

    it('fails for array', () => {
      expect(isSuccess(parser([' ']))).toBe(false)
    })

    it('fails for function', () => {
      expect(isSuccess(parser(() => void 0))).toBe(false)
    })

    it('aggregates errors from all properties', () => {
      const value = {}
      const result = parser(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(value)
      expect(result.errors).toHaveLength(2)
    })
  })

  describe('two types with optional type', () => {
    const parser = union(optional(string), number)

    it('succeeds for empty string', () => {
      expect(parser('')).toBe('')
    })

    it('succeeds for non-empty string', () => {
      expect(parser('a')).toBe('a')
    })

    it('succeeds for zero', () => {
      expect(parser(0)).toBe(0)
    })

    it('succeeds for non-zero', () => {
      expect(parser(1)).toBe(1)
    })

    it('succeeds for undefined', () => {
      expect(parser(undefined)).toBe(undefined)
    })

    it('fails for null', () => {
      expect(isSuccess(parser(null))).toBe(false)
    })

    it('fails for boolean', () => {
      expect(isSuccess(parser(true))).toBe(false)
    })

    it('fails for object', () => {
      expect(isSuccess(parser({ s: '' }))).toBe(false)
    })

    it('fails for array', () => {
      expect(isSuccess(parser([' ']))).toBe(false)
    })
  })

  describe('two types with nullable type', () => {
    const parser = union(nullable(string), number)

    it('succeeds for empty string', () => {
      expect(parser('')).toBe('')
    })

    it('succeeds for non-empty string', () => {
      expect(parser('a')).toBe('a')
    })

    it('succeeds for zero', () => {
      expect(parser(0)).toBe(0)
    })

    it('succeeds for non-zero', () => {
      expect(parser(1)).toBe(1)
    })

    it('succeeds for null', () => {
      expect(parser(null)).toBe(null)
    })

    it('fails for undefined', () => {
      expect(isSuccess(parser(undefined))).toBe(false)
    })

    it('fails for boolean', () => {
      expect(isSuccess(parser(true))).toBe(false)
    })

    it('fails for object', () => {
      expect(isSuccess(parser({ s: '' }))).toBe(false)
    })

    it('fails for array', () => {
      expect(isSuccess(parser([' ']))).toBe(false)
    })
  })

  describe('three types', () => {
    const parser = union(string, number, boolean)

    it('succeeds for empty string', () => {
      expect(parser('')).toBe('')
    })

    it('succeeds for non-empty string', () => {
      expect(parser('a')).toBe('a')
    })

    it('succeeds for zero', () => {
      expect(parser(0)).toBe(0)
    })

    it('succeeds for non-zero', () => {
      expect(parser(1)).toBe(1)
    })

    it('succeeds for true', () => {
      expect(parser(true)).toBe(true)
    })

    it('succeeds for false', () => {
      expect(parser(false)).toBe(false)
    })

    it('fails for undefined', () => {
      expect(isSuccess(parser(undefined))).toBe(false)
    })

    it('fails for null', () => {
      expect(isSuccess(parser(null))).toBe(false)
    })

    it('fails for object', () => {
      expect(isSuccess(parser({ s: '' }))).toBe(false)
    })

    it('fails for array', () => {
      expect(isSuccess(parser([' ']))).toBe(false)
    })

    it('aggregates errors from all properties', () => {
      const value = {}
      const result = parser(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(value)
      expect(result.errors).toHaveLength(3)
    })
  })
})
