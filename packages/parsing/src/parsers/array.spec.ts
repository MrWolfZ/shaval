import { failure, isFailure, isSuccess } from '@shaval/core'
import type { Parser } from '../parser.js'
import { array, readonlyArray } from './array.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(array.name, () => {
  const itemParser: Parser<number> = (value) => (value === 1 ? value : failure(value, 'fail'))
  const parser = array(itemParser)

  it('succeeds for empty array', () => {
    const value: number[] = []
    expect(parser(value)).toEqual(value)
  })

  it('succeeds for non-empty array of valid values', () => {
    const value = [1, 1]
    expect(parser(value)).toEqual(value)
  })

  it('fails if one item is invalid', () => {
    expect(isSuccess(parser([1, 2]))).toBe(false)
  })

  it('calls the item parser for each item in order', () => {
    const value = [1, 2, 3]
    const itemParser = jest.fn()
    const parser = array(itemParser)
    parser(value)
    expect(itemParser).toHaveBeenCalledTimes(value.length)
    expect(itemParser).toHaveBeenNthCalledWith(1, 1)
    expect(itemParser).toHaveBeenNthCalledWith(2, 2)
    expect(itemParser).toHaveBeenNthCalledWith(3, 3)
  })

  it('aggregates errors from all items', () => {
    const value = [2, 1, 3]
    const result = parser(value)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(2)
  })

  it('adds the index to path for errors', () => {
    const value = [2, 1, 3]
    const result = parser(value)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(2)
    expect(result.errors[0]?.path).toEqual(['0'])
    expect(result.errors[1]?.path).toEqual(['2'])
  })

  it('returns a deep copy', () => {
    const value = [1, 1, 1]
    expect(parser(value)).not.toBe(value)
    expect(parser(value)).toEqual(value)
  })

  it('resolves array shorthand', () => {
    const parser: Parser<number> = () => 2
    const value = [[1]]
    expect(array([parser])(value)).toEqual([[2]])
  })

  it('resolves nested array shorthand', () => {
    const parser: Parser<number> = () => 2
    const value = [[[1]]]
    expect(array([[parser]])(value)).toEqual([[[2]]])
  })

  it('resolves object shorthand', () => {
    const parser: Parser<number> = () => 2
    const value = [{ n: 1 }]
    expect(array({ n: parser })(value)).toEqual([{ n: 2 }])
  })

  it('fails for zero', () => {
    expect(isSuccess(parser(0))).toBe(false)
  })

  it('fails for number', () => {
    expect(isSuccess(parser(1))).toBe(false)
  })

  it('fails for null', () => {
    expect(isSuccess(parser(null))).toBe(false)
  })

  it('fails for string', () => {
    expect(isSuccess(parser('a'))).toBe(false)
  })

  it('fails for boolean', () => {
    expect(isSuccess(parser(true))).toBe(false)
  })

  it('fails for object', () => {
    expect(isSuccess(parser({ s: '' }))).toBe(false)
  })

  it('fails for function', () => {
    expect(isSuccess(parser(() => void 0))).toBe(false)
  })

  it('throws for null parser', () => {
    expect(() => array(null as any)).toThrow()
  })

  it('throws for undefined parser', () => {
    expect(() => array(undefined as any)).toThrow()
  })
})

describe(readonlyArray.name, () => {
  const itemParser: Parser<number> = (value) => (value === 1 ? value : failure(value, 'fail'))
  const parser = readonlyArray(itemParser)

  it('succeeds for empty array', () => {
    const value: number[] = []
    expect(parser(value)).toEqual(value)
  })

  it('succeeds for non-empty array of valid values', () => {
    const value = [1, 1]
    expect(parser(value)).toEqual(value)
  })

  it('fails if one item is invalid', () => {
    expect(isSuccess(parser([1, 2]))).toBe(false)
  })

  it('calls the item parser for each item in order', () => {
    const value = [1, 2, 3]
    const itemParser = jest.fn()
    const parser = readonlyArray(itemParser)
    parser(value)
    expect(itemParser).toHaveBeenCalledTimes(value.length)
    expect(itemParser).toHaveBeenNthCalledWith(1, 1)
    expect(itemParser).toHaveBeenNthCalledWith(2, 2)
    expect(itemParser).toHaveBeenNthCalledWith(3, 3)
  })

  it('aggregates errors from all items', () => {
    const value = [2, 1, 3]
    const result = parser(value)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(2)
  })

  it('adds the index to path for errors', () => {
    const value = [2, 1, 3]
    const result = parser(value)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(2)
    expect(result.errors[0]?.path).toEqual(['0'])
    expect(result.errors[1]?.path).toEqual(['2'])
  })

  it('returns a deep copy', () => {
    const value = [1, 1, 1]
    expect(parser(value)).not.toBe(value)
    expect(parser(value)).toEqual(value)
  })

  it('resolves array shorthand', () => {
    const parser: Parser<number> = () => 2
    const value = [[1]]
    expect(readonlyArray([parser])(value)).toEqual([[2]])
  })

  it('resolves nested array shorthand', () => {
    const parser: Parser<number> = () => 2
    const value = [[[1]]]
    expect(readonlyArray([[parser]])(value)).toEqual([[[2]]])
  })

  it('resolves object shorthand', () => {
    const parser: Parser<number> = () => 2
    const value = [{ n: 1 }]
    expect(readonlyArray({ n: parser })(value)).toEqual([{ n: 2 }])
  })

  it('fails for zero', () => {
    expect(isSuccess(parser(0))).toBe(false)
  })

  it('fails for number', () => {
    expect(isSuccess(parser(1))).toBe(false)
  })

  it('fails for null', () => {
    expect(isSuccess(parser(null))).toBe(false)
  })

  it('fails for string', () => {
    expect(isSuccess(parser('a'))).toBe(false)
  })

  it('fails for boolean', () => {
    expect(isSuccess(parser(true))).toBe(false)
  })

  it('fails for object', () => {
    expect(isSuccess(parser({ s: '' }))).toBe(false)
  })

  it('fails for function', () => {
    expect(isSuccess(parser(() => void 0))).toBe(false)
  })

  it('throws for null parser', () => {
    expect(() => readonlyArray(null as any)).toThrow()
  })

  it('throws for undefined parser', () => {
    expect(() => readonlyArray(undefined as any)).toThrow()
  })
})
