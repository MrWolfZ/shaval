import { failure, isFailure, isSuccess } from '@shaval/core'
import type { Parser } from '../parser.js'
import { record } from './record.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(record.name, () => {
  const keyParser: Parser<string> = (value) => (value === 'a' || value === 'b' ? value : failure(value, 'fail'))
  const valueParser: Parser<number> = (value) => (value === 1 || value === 2 ? value : failure(value, 'fail'))
  const parser = record(keyParser, valueParser)

  it('succeeds for empty record', () => {
    const value = {}
    expect(parser(value)).toEqual(value)
  })

  it('succeeds for non-empty record of valid keys and values', () => {
    const value = { a: 1, b: 2 }
    expect(parser(value)).toEqual(value)
  })

  it('defaults key parser to string parser', () => {
    const value = { a: 1, b: 2 }
    const parser = record(valueParser)
    expect(parser(value)).toEqual(value)
  })

  it('succeeds for non-empty record with number keys', () => {
    const stringParser: Parser<string> = (value) => (typeof value === 'string' ? value : failure(value, 'fail'))
    const parser = record(stringParser, stringParser)
    const testSymbol = Symbol()
    const value = { 1: 'a', 2: 'b' }
    expect(parser(value)).toEqual(value)
    expect(isSuccess(parser({ 1: 1, b: 2, [testSymbol]: 3 }))).toBe(false)
  })

  it('succeeds for non-empty record with symbol keys', () => {
    const testSymbol = Symbol()
    const symbolParser: Parser<typeof testSymbol> = (value) => (value === testSymbol ? value : failure(value, 'fail'))
    const stringParser: Parser<string> = (value) => (typeof value === 'string' ? value : failure(value, 'fail'))
    const parser = record(symbolParser, stringParser)
    const value = { [testSymbol]: 'a', [testSymbol]: 'b' }
    expect(parser(value)).toEqual(value)
  })

  it('fails if one key is invalid', () => {
    expect(isSuccess(parser({ 1: 1, b: 2 }))).toBe(false)
  })

  it('fails if one value is invalid', () => {
    expect(isSuccess(parser({ a: 'a', b: 2 }))).toBe(false)
  })

  it('fails if multiple keys are invalid', () => {
    expect(isSuccess(parser({ c: 'a', d: 2 }))).toBe(false)
  })

  it('fails if multiple values are invalid', () => {
    expect(isSuccess(parser({ a: 'a', b: 3 }))).toBe(false)
  })

  it('fails if key and value are invalid', () => {
    expect(isSuccess(parser({ a: 1, c: 3 }))).toBe(false)
  })

  it('fails if key and value for different entries are invalid', () => {
    expect(isSuccess(parser({ c: 1, b: 3 }))).toBe(false)
  })

  it('calls the key parser for each key', () => {
    const value = { a: 1, b: 2 }

    const kParser = jest.fn().mockImplementation((v) => v)
    const parser = record(kParser, valueParser)

    parser(value)
    expect(kParser).toHaveBeenCalledTimes(2)
    expect(kParser).toHaveBeenCalledWith('a')
    expect(kParser).toHaveBeenCalledWith('b')
  })

  it('calls the value parser for each value', () => {
    const value = { a: 1, b: 2 }

    const vParser = jest.fn()
    const parser = record(keyParser, vParser)

    parser(value)
    expect(vParser).toHaveBeenCalledTimes(2)
    expect(vParser).toHaveBeenCalledWith(1)
    expect(vParser).toHaveBeenCalledWith(2)
  })

  it('aggregates errors from all keys', () => {
    const result = parser({ a: 1, c: 2, d: 3 })

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(2)
  })

  it('aggregates errors from all values', () => {
    const result = parser({ a: 3, b: 4 })

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(2)
  })

  it('aggregates errors from all keys and values', () => {
    const result = parser({ a: 3, c: 2 })

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(2)
  })

  it('adds the key to path for key errors', () => {
    const result = parser({ a: 1, c: 2, d: 3 })

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(2)
    expect(result.errors[0]?.path).toEqual(['c'])
    expect(result.errors[1]?.path).toEqual(['d'])
  })

  it('adds the stringified key to path for key errors', () => {
    const testSymbol = Symbol('s')
    const result = parser({ a: 1, [testSymbol]: 2 })

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.path).toEqual(['Symbol(s)'])
  })

  it('adds the key to path for value errors', () => {
    const result = parser({ a: 3, b: 4 })

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(2)
    expect(result.errors[0]?.path).toEqual(['a'])
    expect(result.errors[1]?.path).toEqual(['b'])
  })

  it('adds the symbol key value to path for value errors', () => {
    const testSymbol = Symbol('s')
    const keyParser: Parser<string | symbol> = (value) =>
      value === 'a' || value === testSymbol ? value : failure(value, 'fail')
    const parser = record(keyParser, valueParser)
    const result = parser({ a: 1, [testSymbol]: 4 })

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.path).toEqual(['Symbol(s)'])
  })

  it('returns a deep copy', () => {
    const value = { a: 1, b: 2 }
    expect(parser(value)).not.toBe(value)
    expect(parser(value)).toEqual(value)
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

  it('fails for array', () => {
    expect(isSuccess(parser([' ']))).toBe(false)
  })

  it('fails for function', () => {
    expect(isSuccess(parser(() => void 0))).toBe(false)
  })

  it('fails for class instance', () => {
    class TestClass {
      s = ''
      n = 0
      b = false
    }

    const value = new TestClass()

    expect(isSuccess(parser(value))).toBe(false)
  })

  it('throws for null key parser', () => {
    expect(() => record(null as any, valueParser)).toThrow()
  })

  it('throws for undefined key parser', () => {
    expect(() => record(undefined as any, valueParser)).toThrow()
  })

  it('throws for null value parser', () => {
    expect(() => record(keyParser, null as any)).toThrow()
  })
})
