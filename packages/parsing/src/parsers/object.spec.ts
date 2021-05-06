import { failure, isFailure, isSuccess } from '@shaval/core'
import type { Parser } from '../parser.js'
import { object } from './object.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(object.name, () => {
  const stringParser: Parser<string> = (value) => (value === 'a' ? value : failure(value, 'string'))
  const numberParser: Parser<number> = (value) => (value === 1 ? value : failure(value, 'number'))

  interface TestObject {
    s: string
    n: number
  }

  const parser = object<TestObject>({
    s: stringParser,
    n: numberParser,
  })

  it('succeeds for object of correct shape', () => {
    const value: TestObject = { s: 'a', n: 1 }
    expect(parser(value)).toEqual(value)
  })

  it('fails for object with missing property', () => {
    const value: Partial<TestObject> = { s: 'a' }
    expect(isSuccess(parser(value))).toBe(false)
  })

  it('fails for object with multiple missing properties', () => {
    const value: Partial<TestObject> = {}
    expect(isSuccess(parser(value))).toBe(false)
  })

  it('calls the property parser for each property', () => {
    const value: TestObject = { s: 'a', n: 1 }

    const sParser = jest.fn()
    const nParser = jest.fn()
    const parser = object<TestObject>({
      s: sParser,
      n: nParser,
    })

    parser(value)
    expect(sParser).toHaveBeenCalledTimes(1)
    expect(sParser).toHaveBeenCalledWith(value.s)
    expect(nParser).toHaveBeenCalledTimes(1)
    expect(nParser).toHaveBeenCalledWith(value.n)
  })

  it('aggregates errors from all properties', () => {
    const value: TestObject = { s: 'b', n: 2 }
    const result = parser(value)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(2)
  })

  it('adds the property name to path for errors', () => {
    const value: TestObject = { s: 'b', n: 2 }
    const result = parser(value)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(2)
    expect(result.errors[0]?.path).toEqual(['s'])
    expect(result.errors[1]?.path).toEqual(['n'])
  })

  it('returns a deep copy', () => {
    const value: TestObject = { s: 'a', n: 1 }
    expect(parser(value)).not.toBe(value)
    expect(parser(value)).toEqual(value)
  })

  it('strips unknown properties', () => {
    const expected: TestObject = { s: 'a', n: 1 }
    const input = { ...expected, extra: '' }
    expect(parser(input)).toEqual(expected)
  })

  describe('object with optional property', () => {
    interface ObjectWithOptionalProperty {
      s: string
      n?: number
    }

    const optionalNumberParser: Parser<number | undefined> = (value) =>
      value === 1 || value === undefined ? (value as number) : failure(value, 'number')

    const parser = object<ObjectWithOptionalProperty>({
      s: stringParser,
      n: optionalNumberParser,
    })

    it('succeeds for object of correct shape', () => {
      const value: ObjectWithOptionalProperty = { s: 'a', n: 1 }
      expect(parser(value)).toEqual(value)
    })

    it('succeeds for object with missing optional property', () => {
      const value: ObjectWithOptionalProperty = { s: 'a' }
      expect(parser(value)).toEqual(value)
    })

    it('succeeds for object with optional property explicitly undefined', () => {
      const value: ObjectWithOptionalProperty = { s: 'a', n: undefined }
      expect(parser(value)).toEqual(value)
    })

    it('fails for object with missing required property', () => {
      const value: Partial<ObjectWithOptionalProperty> = { n: 1 }
      expect(isSuccess(parser(value))).toBe(false)
    })
  })

  describe('object with nullable property', () => {
    interface ObjectWithNullableProperty {
      n: number | null
    }

    const nullableNumberParser: Parser<number | null> = (value) =>
      value === 1 || value === null ? (value as number) : failure(value, 'number')

    const parser = object<ObjectWithNullableProperty>({
      n: nullableNumberParser,
    })

    it('succeeds for object of correct shape', () => {
      const value: ObjectWithNullableProperty = { n: 1 }
      expect(parser(value)).toEqual(value)
    })

    it('succeeds for object with null property', () => {
      const value: ObjectWithNullableProperty = { n: null }
      expect(parser(value)).toEqual(value)
    })

    it('fails for object with missing property', () => {
      const value: Partial<ObjectWithNullableProperty> = {}
      expect(isSuccess(parser(value))).toBe(false)
    })
  })

  it('resolves array shorthand for property parser', () => {
    const parser: Parser<number> = () => 2
    const value = { n: [1] }
    expect(object({ n: [parser] })(value)).toEqual({ n: [2] })
  })

  it('resolves object shorthand for property parser', () => {
    const parser: Parser<number> = () => 2
    const value = { o: { n: 1 } }
    expect(object({ o: { n: parser } })(value)).toEqual({ o: { n: 2 } })
  })

  it('resolves nested object shorthand for property parser', () => {
    const parser: Parser<number> = () => 2
    const value = { o: { n: { i: 1 } } }
    expect(object({ o: { n: { i: parser } } })(value)).toEqual({ o: { n: { i: 2 } } })
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
    class TestClass implements TestObject {
      s = ''
      n = 0
      b = false
    }

    const value = new TestClass()

    expect(isSuccess(parser(value))).toBe(false)
  })

  it('throws for null config', () => {
    expect(() => object(null as any)).toThrow()
  })

  it('throws for undefined config', () => {
    expect(() => object(undefined as any)).toThrow()
  })

  it('throws for null property parser', () => {
    expect(() => object({ s: null as any })).toThrow()
  })

  it('throws for undefined property parser', () => {
    expect(() => object({ s: undefined as any })).toThrow()
  })
})
