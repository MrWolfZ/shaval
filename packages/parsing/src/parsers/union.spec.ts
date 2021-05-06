import { failure, isFailure, isSuccess } from '@shaval/core'
import type { Parser } from '../parser.js'
import { union } from './union.js'

describe(union.name, () => {
  const stringParser: Parser<string> = (value) => (value === 'a' ? value : failure(value, 'string'))
  const numberParser: Parser<number> = (value) => (value === 1 ? value : failure(value, 'number'))
  const booleanParser: Parser<boolean> = (value) => (value === true ? value : failure(value, 'boolean'))

  describe('two types', () => {
    const parser = union(stringParser, numberParser)

    it('succeeds for valid value of first type', () => {
      expect(parser('a')).toBe('a')
    })

    it('succeeds for valid value of second type', () => {
      expect(parser(1)).toBe(1)
    })

    it('fails for invalid value of first type', () => {
      expect(isSuccess(parser('b'))).toBe(false)
    })

    it('fails for invalid value of second type', () => {
      expect(isSuccess(parser(2))).toBe(false)
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

      expect(result.errors).toHaveLength(1)
      expect(result.errors[0]?.value).toBe(value)
      expect(Object.keys(result.errors[0]?.details ?? {})).toHaveLength(2)
    })

    it('resolves array shorthand', () => {
      const parser = union(stringParser, [stringParser])
      const value = ['a']
      expect(parser(value)).toEqual(value)
    })

    it('resolves array shorthand in rest arg', () => {
      const parser = union(stringParser, numberParser, [stringParser])
      const value = ['a']
      expect(parser(value)).toEqual(value)
    })

    it('resolves object shorthand', () => {
      const parser = union(stringParser, { s: stringParser })
      const value = { s: 'a' }
      expect(parser(value)).toEqual(value)
    })

    it('resolves object shorthand in rest arg', () => {
      const parser = union(stringParser, numberParser, { s: stringParser })
      const value = { s: 'a' }
      expect(parser(value)).toEqual(value)
    })
  })

  describe('three types', () => {
    const parser = union(stringParser, numberParser, booleanParser)

    it('succeeds for valid value of first type', () => {
      expect(parser('a')).toBe('a')
    })

    it('succeeds for valid value of second type', () => {
      expect(parser(1)).toBe(1)
    })

    it('succeeds for valid value of third type', () => {
      expect(parser(true)).toBe(true)
    })

    it('fails for invalid value of first type', () => {
      expect(isSuccess(parser('b'))).toBe(false)
    })

    it('fails for invalid value of second type', () => {
      expect(isSuccess(parser(2))).toBe(false)
    })

    it('fails for invalid value of third type', () => {
      expect(isSuccess(parser(false))).toBe(false)
    })

    it('aggregates errors from all properties', () => {
      const value = {}
      const result = parser(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(1)
      expect(result.errors[0]?.value).toBe(value)
      expect(Object.keys(result.errors[0]?.details ?? {})).toHaveLength(3)
    })
  })
})
