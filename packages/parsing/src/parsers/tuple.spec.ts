import { failure, isFailure, isSuccess } from '@shaval/core'
import type { Parser } from '../parser.js'
import { tuple } from './tuple.js'

describe(tuple.name, () => {
  const stringParser: Parser<string> = (value) => (value === 'a' ? value : failure(value, 'string'))
  const numberParser: Parser<number> = (value) => (value === 1 ? value : failure(value, 'number'))
  const booleanParser: Parser<boolean> = (value) => (value === true ? value : failure(value, 'boolean'))

  describe('two types', () => {
    const parser = tuple(stringParser, numberParser)

    it('succeeds for all valid values', () => {
      const value = ['a', 1]
      expect(parser(value)).toEqual(value)
    })

    it('fails for invalid first value', () => {
      expect(isSuccess(parser(['b', 1]))).toBe(false)
    })

    it('fails for invalid second value', () => {
      expect(isSuccess(parser(['a', 2]))).toBe(false)
    })

    it('fails for tuple of wrong length', () => {
      expect(isSuccess(parser(['a', 1, true]))).toBe(false)
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
      const result = parser([undefined, undefined])

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)
    })

    it('adds the index to path for errors', () => {
      const value = ['b', 2]
      const result = parser(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)
      expect(result.errors[0]?.path).toEqual(['0'])
      expect(result.errors[1]?.path).toEqual(['1'])
    })

    it('returns a deep copy', () => {
      const value = ['a', 1]
      expect(parser(value)).not.toBe(value)
      expect(parser(value)).toEqual(value)
    })
  })

  describe('three types', () => {
    const parser = tuple(stringParser, numberParser, booleanParser)

    it('succeeds for all valid values', () => {
      const value = ['a', 1, true]
      expect(parser(value)).toEqual(value)
    })

    it('fails for invalid first value', () => {
      expect(isSuccess(parser(['b', 1, true]))).toBe(false)
    })

    it('fails for invalid second value', () => {
      expect(isSuccess(parser(['a', 2, true]))).toBe(false)
    })

    it('fails for invalid third value', () => {
      expect(isSuccess(parser(['a', 1, false]))).toBe(false)
    })

    it('fails for tuple of wrong length', () => {
      expect(isSuccess(parser(['a', 1]))).toBe(false)
      expect(isSuccess(parser(['a', 1, true, '']))).toBe(false)
    })

    it('aggregates errors from all properties', () => {
      const result = parser([undefined, undefined, undefined])

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(3)
    })

    it('adds the index to path for errors', () => {
      const value = ['b', 1, false]
      const result = parser(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)
      expect(result.errors[0]?.path).toEqual(['0'])
      expect(result.errors[1]?.path).toEqual(['2'])
    })

    it('returns a deep copy', () => {
      const value = ['a', 1, true]
      expect(parser(value)).not.toBe(value)
      expect(parser(value)).toEqual(value)
    })
  })

  it('calls the item parser for each item in order', () => {
    const value = [1, 2, 3]
    const itemParser = jest.fn()
    const parser = tuple(itemParser, itemParser, itemParser)
    parser(value)
    expect(itemParser).toHaveBeenCalledTimes(value.length)
    expect(itemParser).toHaveBeenNthCalledWith(1, 1)
    expect(itemParser).toHaveBeenNthCalledWith(2, 2)
    expect(itemParser).toHaveBeenNthCalledWith(3, 3)
  })

  it('resolves array shorthand', () => {
    const parser = tuple(stringParser, [stringParser])
    const value = ['a', ['a']]
    expect(parser(value)).toEqual(value)
  })

  it('resolves array shorthand in rest arg', () => {
    const parser = tuple(stringParser, numberParser, [stringParser])
    const value = ['a', 1, ['a']]
    expect(parser(value)).toEqual(value)
  })

  it('resolves object shorthand', () => {
    const parser = tuple(stringParser, { s: stringParser })
    const value = ['a', { s: 'a' }]
    expect(parser(value)).toEqual(value)
  })

  it('resolves object shorthand in rest arg', () => {
    const parser = tuple(stringParser, numberParser, { s: stringParser })
    const value = ['a', 1, { s: 'a' }]
    expect(parser(value)).toEqual(value)
  })
})
