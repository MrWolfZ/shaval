import { isShavalError, isSuccess } from '@shaval/core'
import { array } from './array.js'
import { nullable } from './nullable.js'
import { number } from './number.js'
import { object } from './object.js'
import { optional } from './optional.js'
import { string } from './string.js'
import { union } from './union.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(array.name, () => {
  it('throws for null parser', () => {
    expect(() => object<{ s: string }>(null as any)).toThrow()
  })

  it('throws for undefined parser', () => {
    expect(() => object<{ s: string }>(undefined as any)).toThrow()
  })

  describe('primitive items', () => {
    const parser = array(number)

    it('suceeds for empty array', () => {
      const value: number[] = []
      expect(parser(value)).toEqual(value)
    })

    it('suceeds for non-empty array', () => {
      const value = [1, 2, 3]
      expect(parser(value)).toEqual(value)
    })

    it('fails for item of wrong type', () => {
      const value: number[] = [1, '' as any]
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for undefined item', () => {
      const value: number[] = [1, undefined as any]
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for null item', () => {
      const value: number[] = [1, null as any]
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('aggregates errors from all items', () => {
      const value: number[] = ['' as any, '' as any]
      const result = parser(value)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(value)
      expect(result.errors).toHaveLength(2)
    })

    it('adds the index to path for errors', () => {
      const value: number[] = ['' as any, 1, '' as any]
      const result = parser(value)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)

      const error1 = result.errors[0]
      const error2 = result.errors[1]

      if (typeof error1 === 'string' || typeof error2 === 'string') {
        return fail('error was not a property error')
      }

      expect(error1?.path).toEqual(['0'])
      expect(error2?.path).toEqual(['2'])
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
  })

  describe('optional items', () => {
    const parser = array(optional(number))

    it('suceeds for empty array', () => {
      const value: number[] = []
      expect(parser(value)).toEqual(value)
    })

    it('suceeds for non-empty array', () => {
      const value = [1, 2, 3]
      expect(parser(value)).toEqual(value)
    })

    it('suceeds for non-empty array with undefined value', () => {
      const value = [1, undefined, 3]
      expect(parser(value)).toEqual(value)
    })

    it('fails for item of wrong type', () => {
      const value: number[] = [1, '' as any]
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for null item', () => {
      const value: number[] = [1, null as any]
      expect(isSuccess(parser(value))).toBe(false)
    })
  })

  describe('nullable items', () => {
    const parser = array(nullable(number))

    it('suceeds for empty array', () => {
      const value: number[] = []
      expect(parser(value)).toEqual(value)
    })

    it('suceeds for non-empty array', () => {
      const value = [1, 2, 3]
      expect(parser(value)).toEqual(value)
    })

    it('suceeds for non-empty array with null value', () => {
      const value = [1, null, 3]
      expect(parser(value)).toEqual(value)
    })

    it('fails for item of wrong type', () => {
      const value: number[] = [1, '' as any]
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for undefined item', () => {
      const value: number[] = [1, undefined as any]
      expect(isSuccess(parser(value))).toBe(false)
    })
  })

  describe('union items', () => {
    const parser = array(union(string, number))

    it('suceeds for empty array', () => {
      const value: number[] = []
      expect(parser(value)).toEqual(value)
    })

    it('suceeds for non-empty array of first type', () => {
      const value = [1, 2, 3]
      expect(parser(value)).toEqual(value)
    })

    it('suceeds for non-empty array of second type', () => {
      const value = ['a', 'b', 'c']
      expect(parser(value)).toEqual(value)
    })

    it('suceeds for non-empty array with mixed values', () => {
      const value = [1, 'a', 3]
      expect(parser(value)).toEqual(value)
    })

    it('fails for item of wrong type', () => {
      const value: number[] = [1, true as any]
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for undefined item', () => {
      const value: number[] = [1, undefined as any]
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for null item', () => {
      const value: number[] = [1, null as any]
      expect(isSuccess(parser(value))).toBe(false)
    })
  })

  describe('array items', () => {
    const parser = array(array(number))

    it('suceeds for empty array', () => {
      const value: number[][] = []
      expect(parser(value)).toEqual(value)
    })

    it('suceeds for non-empty array', () => {
      const value = [[1, 2], [3]]
      expect(parser(value)).toEqual(value)
    })

    it('fails for item of wrong type', () => {
      const value: number[][] = [[1], '' as any]
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for undefined item', () => {
      const value: number[][] = [[1], undefined as any]
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for null item', () => {
      const value: number[][] = [[1], null as any]
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('aggregates errors from all array items', () => {
      const value: number[][] = [undefined as any, undefined as any]
      const result = parser(value)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(value)
      expect(result.errors).toHaveLength(2)
    })

    it('adds the property name to path for errors', () => {
      const value: number[][] = [[undefined as any], [1], [0, undefined as any]]
      const result = parser(value)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)

      const error1 = result.errors[0]
      const error2 = result.errors[1]

      if (typeof error1 === 'string' || typeof error2 === 'string') {
        return fail('error was not a property error')
      }

      expect(error1?.path).toEqual(['0', '0'])
      expect(error2?.path).toEqual(['2', '1'])
    })
  })

  describe('object items', () => {
    interface TestObject {
      n: number
    }

    const parser = array(
      object<TestObject>({ n: number }),
    )

    it('suceeds for empty array', () => {
      const value: TestObject[] = []
      expect(parser(value)).toEqual(value)
    })

    it('suceeds for non-empty array', () => {
      const value: TestObject[] = [{ n: 1 }, { n: 2 }]
      expect(parser(value)).toEqual(value)
    })

    it('fails for item of wrong type', () => {
      const value: TestObject[] = [{ n: 1 }, '' as any]
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for undefined item', () => {
      const value: TestObject[] = [{ n: 1 }, undefined as any]
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('fails for null item', () => {
      const value: TestObject[] = [{ n: 1 }, null as any]
      expect(isSuccess(parser(value))).toBe(false)
    })

    it('aggregates errors from all array items', () => {
      const value: TestObject[] = [undefined as any, undefined as any]
      const result = parser(value)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(value)
      expect(result.errors).toHaveLength(2)
    })

    it('adds the property name to path for errors', () => {
      const value: TestObject[] = [{ n: undefined as any }, { n: 1 }, { n: undefined as any }]
      const result = parser(value)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)

      const error1 = result.errors[0]
      const error2 = result.errors[1]

      if (typeof error1 === 'string' || typeof error2 === 'string') {
        return fail('error was not a property error')
      }

      expect(error1?.path).toEqual(['0', 'n'])
      expect(error2?.path).toEqual(['2', 'n'])
    })
  })
})
