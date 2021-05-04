import { isFailure } from '@shaval/core'
import { validateArray } from './array.js'
import { greaterThan } from './greater-than.js'
import { lessThan } from './less-than.js'
import { validateObject } from './object.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(validateArray.name, () => {
  it('throws for null validator parameter', () => {
    expect(() => validateArray(null as any)).toThrow()
  })

  it('throws for undefined validator parameter', () => {
    expect(() => validateArray(undefined as any)).toThrow()
  })

  describe('primitive elements', () => {
    describe('no validators', () => {
      const validator = validateArray()

      it('succeeds for empty array', () => {
        const value: number[] = []
        expect(validator(value)).toBe(value)
      })

      it('succeeds for non-empty array', () => {
        const value = [1, 2, 3]
        expect(validator(value)).toBe(value)
      })
    })

    describe('with single validator', () => {
      const validator = validateArray(greaterThan(0))

      it('succeeds for empty array', () => {
        const value: number[] = []
        expect(validator(value)).toBe(value)
      })

      it('succeeds for non-empty array', () => {
        const value = [1, 2, 3]
        expect(validator(value)).toBe(value)
      })

      it('fails if single element is invalid', () => {
        const value = [0, 2, 3]
        const result = validator(value)

        if (!isFailure(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(1)
      })

      it('fails if multiple elements are invalid', () => {
        const value = [0, -1, 3]
        const result = validator(value)

        if (!isFailure(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(2)
      })

      it('aggregates error messages from all items', () => {
        const value = [-1, -2]
        const result = validator(value)

        if (!isFailure(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(2)
      })

      it('adds the item index to path for errors', () => {
        const value = [0, 1, -1]
        const result = validator(value)

        if (!isFailure(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(2)
        expect(result.errors[0]?.path).toEqual(['0'])
        expect(result.errors[1]?.path).toEqual(['2'])
      })
    })

    describe('with multiple validators', () => {
      const validator = validateArray(greaterThan(0), lessThan(4))

      it('succeeds for empty array', () => {
        const value: number[] = []
        expect(validator(value)).toBe(value)
      })

      it('succeeds for non-empty array', () => {
        const value = [1, 2, 3]
        expect(validator(value)).toBe(value)
      })

      it('fails if single element is invalid', () => {
        const value = [0, 2, 3]
        const result = validator(value)

        if (!isFailure(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(1)
      })

      it('fails if multiple elements are invalid', () => {
        const value = [0, 4, 3]
        const result = validator(value)

        if (!isFailure(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(2)
      })

      it('aggregates error messages from all validators', () => {
        const value = [0]
        const validator = validateArray(greaterThan(0), lessThan(0))
        const result = validator(value)

        if (!isFailure(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(1)
        expect(Object.keys(result.errors[0]?.details ?? {})).toHaveLength(2)
      })

      it('aggregates error messages from all items', () => {
        const value = [-1, 5]
        const validator = validateArray(greaterThan(0), lessThan(4))
        const result = validator(value)

        if (!isFailure(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(2)
      })

      it('adds the item index to path for errors', () => {
        const value = [-1, 1, 4]
        const validator = validateArray(greaterThan(0), lessThan(3))
        const result = validator(value)

        if (!isFailure(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(2)

        expect(result.errors[0]?.path).toEqual(['0'])
        expect(result.errors[1]?.path).toEqual(['2'])
      })
    })
  })

  describe('object elements', () => {
    interface TestObject {
      n: number
    }

    const validator = validateArray(
      validateObject<TestObject>({ n: greaterThan(0) }),
    )

    it('succeeds for empty array', () => {
      const value: TestObject[] = []
      expect(validator(value)).toBe(value)
    })

    it('succeeds for non-empty array', () => {
      const value: TestObject[] = [{ n: 1 }, { n: 2 }]
      expect(validator(value)).toBe(value)
    })

    it('fails if single element is invalid', () => {
      const value: TestObject[] = [{ n: 0 }, { n: 2 }]
      const result = validator(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(1)
    })

    it('fails if multiple elements are invalid', () => {
      const value: TestObject[] = [{ n: 0 }, { n: 0 }]
      const result = validator(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)
    })

    it('aggregates error messages from all items', () => {
      const value: TestObject[] = [{ n: 0 }, { n: 0 }]
      const result = validator(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)
    })

    it('adds the item index to path for errors', () => {
      const value: TestObject[] = [{ n: 0 }, { n: 0 }]
      const result = validator(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)
      expect(result.errors[0]?.path).toEqual(['0', 'n'])
      expect(result.errors[1]?.path).toEqual(['1', 'n'])
    })
  })

  describe('array elements', () => {
    const validator = validateArray(validateArray(greaterThan(0)))

    it('succeeds for empty array', () => {
      const value: number[][] = []
      expect(validator(value)).toBe(value)
    })

    it('succeeds for non-empty array', () => {
      const value: number[][] = [[1, 2], [3]]
      expect(validator(value)).toBe(value)
    })

    it('fails if single element is invalid', () => {
      const value: number[][] = [[0, 2], [3]]
      const result = validator(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(1)
    })

    it('fails if multiple elements are invalid', () => {
      const value: number[][] = [[0, 2], [0]]
      const result = validator(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)
    })

    it('aggregates error messages from all items', () => {
      const value: number[][] = [[0, -1], [0]]
      const result = validator(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(3)
    })

    it('adds the item index to path for errors', () => {
      const value: number[][] = [[1, 0], [1], [0]]
      const result = validator(value)

      if (!isFailure(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(2)

      expect(result.errors[0]?.path).toEqual(['0', '1'])
      expect(result.errors[1]?.path).toEqual(['2', '0'])
    })
  })
})
