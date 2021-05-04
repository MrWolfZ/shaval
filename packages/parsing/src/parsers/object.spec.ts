import { isFailure, isSuccess } from '@shaval/core'
import { array } from './array.js'
import { boolean } from './boolean.js'
import { nullable } from './nullable.js'
import { number } from './number.js'
import { object } from './object.js'
import { optional } from './optional.js'
import { string } from './string.js'
import { union } from './union.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(object.name, () => {
  it('throws for null config', () => {
    expect(() => object<{ s: string }>(null as any)).toThrow()
  })

  it('throws for undefined config', () => {
    expect(() => object<{ s: string }>(undefined as any)).toThrow()
  })

  it('throws for null property parser', () => {
    expect(() => object<{ s: string }>({ s: null as any })).toThrow()
  })

  it('throws for undefined property parser', () => {
    expect(() => object<{ s: string }>({ s: undefined as any })).toThrow()
  })

  describe('simple object', () => {
    interface SimpleObject {
      s: string
      n: number
      b: boolean
    }

    const parser = object<SimpleObject>({
      s: string,
      n: number,
      b: boolean,
    })

    it('suceeds for object of correct shape', () => {
      const value: SimpleObject = { s: 'a', n: 1, b: true }
      expect(parser(value)).toEqual(value)
    })

    it('fails for object with missing property', () => {
      const value: Partial<SimpleObject> = { s: '', b: true }
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for object with multiple missing properties', () => {
      const value: Partial<SimpleObject> = { b: true }
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for object with property of wrong type', () => {
      const value: SimpleObject = { s: '', n: '' as any, b: true }
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('aggregates errors from all properties', () => {
      const value: Partial<SimpleObject> = { n: '' as any, b: false }
      const result = parser(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(value)
      expect(result.errors).toHaveLength(2)
    })

    it('adds the property name to path for errors', () => {
      const value: Partial<SimpleObject> = { n: '' as any, b: false }
      const result = parser(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)

      const error1 = result.errors[0]
      const error2 = result.errors[1]

      if (typeof error1 === 'string' || typeof error2 === 'string') {
        return fail('error was not a property error')
      }

      expect(error1?.path).toEqual(['s'])
      expect(error2?.path).toEqual(['n'])
    })

    it('returns a deep copy', () => {
      const value: SimpleObject = { s: 'a', n: 1, b: true }
      expect(parser(value)).not.toBe(value)
      expect(parser(value)).toEqual(value)
    })

    it('strips unknown properties', () => {
      const expected: SimpleObject = { s: 'a', n: 1, b: true }
      const input = { ...expected, extra: '' }
      expect(parser(input)).toEqual(expected)
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
      class TestClass implements SimpleObject {
        s = ''
        n = 0
        b = false
      }

      const value = new TestClass()

      expect(isSuccess(parser(value))).toBe(false)
    })
  })

  describe('object with optional property', () => {
    interface ObjectWithOptionalProperty {
      s: string
      n?: number
    }

    const parser = object<ObjectWithOptionalProperty>({
      s: string,
      n: optional(number),
    })

    it('suceeds for object of correct shape', () => {
      const value: ObjectWithOptionalProperty = { s: 'a', n: 1 }
      expect(parser(value)).toEqual(value)
    })

    it('suceeds for object with missing optional property', () => {
      const value: ObjectWithOptionalProperty = { s: 'a' }
      expect(parser(value)).toEqual(value)
    })

    it('suceeds for object with optional property explicitly undefined', () => {
      const value: ObjectWithOptionalProperty = { s: 'a', n: undefined }
      expect(parser(value)).toEqual(value)
    })

    it('fails for object with missing required property', () => {
      const value: Partial<ObjectWithOptionalProperty> = { n: 1 }
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for object with optional property of wrong type', () => {
      const value: ObjectWithOptionalProperty = { s: '', n: '' as any }
      expect(isSuccess(parser(value))).toBe(false)
    })
  })

  describe('object with nullable property', () => {
    interface ObjectWithNullableProperty {
      n: number | null
    }

    const parser = object<ObjectWithNullableProperty>({
      n: nullable(number),
    })

    it('suceeds for object of correct shape', () => {
      const value: ObjectWithNullableProperty = { n: 1 }
      expect(parser(value)).toEqual(value)
    })

    it('suceeds for object with null property', () => {
      const value: ObjectWithNullableProperty = { n: null }
      expect(parser(value)).toEqual(value)
    })

    it('fails for object with missing property', () => {
      const value: Partial<ObjectWithNullableProperty> = {}
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for object with property of wrong type', () => {
      const value: ObjectWithNullableProperty = { n: '' as any }
      expect(isSuccess(parser(value))).toBe(false)
    })
  })

  describe('object with union property', () => {
    interface ObjectWithOptionalProperty {
      s: string | number
    }

    const parser = object<ObjectWithOptionalProperty>({
      s: union(string, number),
    })

    it('suceeds for object with property of first type', () => {
      const value: ObjectWithOptionalProperty = { s: 'a' }
      expect(parser(value)).toEqual(value)
    })

    it('suceeds for object with property of second type', () => {
      const value: ObjectWithOptionalProperty = { s: 1 }
      expect(parser(value)).toEqual(value)
    })

    it('fails for object with missing required property', () => {
      const value: Partial<ObjectWithOptionalProperty> = {}
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for object with property of wrong type', () => {
      const value: ObjectWithOptionalProperty = { s: {} as any }
      expect(isSuccess(parser(value))).toBe(false)
    })
  })

  describe('object with array property', () => {
    interface ObjectWithArrayProperty {
      arr: number[]
    }

    const parser = object<ObjectWithArrayProperty>({
      arr: array(number),
    })

    it('suceeds for object of correct shape', () => {
      const value: ObjectWithArrayProperty = { arr: [1] }
      expect(parser(value)).toEqual(value)
    })

    it('suceeds for empty array property', () => {
      const value: ObjectWithArrayProperty = { arr: [] }
      expect(parser(value)).toEqual(value)
    })

    it('fails for object with missing property', () => {
      const value: Partial<ObjectWithArrayProperty> = {}
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for object with property of wrong type', () => {
      const value: ObjectWithArrayProperty = { arr: '' as any }
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for object with array item of wrong type', () => {
      const value: ObjectWithArrayProperty = { arr: ['' as any] }
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('aggregates errors from all array items', () => {
      const value: Partial<ObjectWithArrayProperty> = { arr: ['' as any, '' as any] }
      const result = parser(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(value)
      expect(result.errors).toHaveLength(2)
    })

    it('adds the property name to path for errors', () => {
      const value: Partial<ObjectWithArrayProperty> = { arr: ['' as any, 0, '' as any] }
      const result = parser(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)

      const error1 = result.errors[0]
      const error2 = result.errors[1]

      if (typeof error1 === 'string' || typeof error2 === 'string') {
        return fail('error was not a property error')
      }

      expect(error1?.path).toEqual(['arr', '0'])
      expect(error2?.path).toEqual(['arr', '2'])
    })
  })

  describe('object with object property', () => {
    interface ObjectWithObjectProperty {
      obj: {
        s: string
        n: number
      }
    }

    const parser = object<ObjectWithObjectProperty>({
      obj: object({ s: string, n: number }),
    })

    it('suceeds for object of correct shape', () => {
      const value: ObjectWithObjectProperty = { obj: { s: '', n: 1 } }
      expect(parser(value)).toEqual(value)
    })

    it('fails for object with missing property', () => {
      const value: Partial<ObjectWithObjectProperty> = {}
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for object with property of wrong type', () => {
      const value: ObjectWithObjectProperty = { obj: '' as any }
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for object with property of wrong type', () => {
      const value: ObjectWithObjectProperty = { obj: { s: '', n: '' as any } }
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('aggregates errors from all nested properties', () => {
      const value: ObjectWithObjectProperty = { obj: { s: 0 as any, n: '' as any } }
      const result = parser(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(value)
      expect(result.errors).toHaveLength(2)
    })

    it('adds the property name to path for errors', () => {
      const value: ObjectWithObjectProperty = { obj: { s: 0 as any, n: '' as any } }
      const result = parser(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)

      const error1 = result.errors[0]
      const error2 = result.errors[1]

      if (typeof error1 === 'string' || typeof error2 === 'string') {
        return fail('error was not a property error')
      }

      expect(error1?.path).toEqual(['obj', 's'])
      expect(error2?.path).toEqual(['obj', 'n'])
    })
  })
})
