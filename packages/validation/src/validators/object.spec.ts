import { isShavalError } from '@shaval/core'
import { validateArray } from './array.js'
import { greaterThan } from './greater-than.js'
import { validateObject } from './object.js'
import { required } from './required.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(validateObject.name, () => {
  it('throws for null validators', () => {
    expect(() => validateObject<{ s: string }>(null as any)).toThrow()
  })

  it('throws for undefined validators', () => {
    expect(() => validateObject<{ s: string }>(undefined as any)).toThrow()
  })

  it('throws for null property validator', () => {
    expect(() => validateObject<{ s: string }>({ s: null as any })).toThrow()
  })

  it('throws for explicitly undefined property validator', () => {
    expect(() => validateObject<{ s: string }>({ s: undefined as any })).toThrow()
  })

  it('does not throw for undefined property validator', () => {
    expect(() => validateObject<{ s: string }>({})).not.toThrow()
  })

  describe('simple object', () => {
    interface SimpleObject {
      s: string
      n1: number
      n2: number
      b: boolean
    }

    describe('no validators', () => {
      const validator = validateObject<SimpleObject>({})

      it('succeeds for any value', () => {
        const value: SimpleObject = { s: '', n1: 0, n2: 0, b: false }
        expect(validator(value)).toBe(value)
      })
    })

    describe('with single validator for single property', () => {
      const validator = validateObject<SimpleObject>({ n1: greaterThan(0) })

      it('succeeds for valid property', () => {
        const value: SimpleObject = { s: '', n1: 1, n2: 0, b: false }
        expect(validator(value)).toBe(value)
      })

      it('fails for invalid property', () => {
        const value: SimpleObject = { s: '', n1: 0, n2: 0, b: false }
        const result = validator(value)

        if (!isShavalError(result)) {
          return fail('result was not an error')
        }

        expect(result.value).toBe(value)
        expect(result.errors).toHaveLength(1)
      })

      it('adds the property name to path for errors', () => {
        const value: SimpleObject = { s: '', n1: 0, n2: 0, b: false }
        const result = validator(value)

        if (!isShavalError(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(1)

        const error = result.errors[0]

        if (typeof error === 'string') {
          return fail('error was not a property error')
        }

        expect(error?.path).toEqual(['n1'])
      })
    })

    describe('with multiple validators for single property', () => {
      const validator = validateObject<SimpleObject>({ n1: [greaterThan(0), greaterThan(1)] })

      it('succeeds for valid property', () => {
        const value: SimpleObject = { s: '', n1: 2, n2: 0, b: false }
        expect(validator(value)).toBe(value)
      })

      it('fails for invalid property', () => {
        const value: SimpleObject = { s: '', n1: 1, n2: 0, b: false }
        const result = validator(value)

        if (!isShavalError(result)) {
          return fail('result was not an error')
        }

        expect(result.value).toBe(value)
        expect(result.errors).toHaveLength(1)
      })

      it('aggregates error messages from all validators', () => {
        const value: SimpleObject = { s: '', n1: 0, n2: 0, b: false }
        const result = validator(value)

        if (!isShavalError(result)) {
          return fail('result was not an error')
        }

        expect(result.value).toBe(value)
        expect(result.errors).toHaveLength(2)
      })

      it('adds the property name to path for errors', () => {
        const value: SimpleObject = { s: '', n1: 0, n2: 0, b: false }
        const result = validator(value)

        if (!isShavalError(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(2)

        const error1 = result.errors[0]
        const error2 = result.errors[1]

        if (typeof error1 === 'string' || typeof error2 === 'string') {
          return fail('error was not a property error')
        }

        expect(error1?.path).toEqual(['n1'])
        expect(error2?.path).toEqual(['n1'])
      })
    })

    describe('with single validator for multiple properties', () => {
      const validator = validateObject<SimpleObject>({ n1: greaterThan(0), n2: greaterThan(1) })

      it('succeeds for valid properties', () => {
        const value: SimpleObject = { s: '', n1: 1, n2: 2, b: false }
        expect(validator(value)).toBe(value)
      })

      it('fails for single invalid property', () => {
        const value: SimpleObject = { s: '', n1: 1, n2: 0, b: false }
        const result = validator(value)

        if (!isShavalError(result)) {
          return fail('result was not an error')
        }

        expect(result.value).toBe(value)
        expect(result.errors).toHaveLength(1)
      })

      it('fails for multiple invalid properties and aggregates errors', () => {
        const value: SimpleObject = { s: '', n1: 0, n2: 0, b: false }
        const result = validator(value)

        if (!isShavalError(result)) {
          return fail('result was not an error')
        }

        expect(result.value).toBe(value)
        expect(result.errors).toHaveLength(2)
      })

      it('adds the property name to path for errors', () => {
        const value: SimpleObject = { s: '', n1: 0, n2: 0, b: false }
        const result = validator(value)

        if (!isShavalError(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(2)

        const error1 = result.errors[0]
        const error2 = result.errors[1]

        if (typeof error1 === 'string' || typeof error2 === 'string') {
          return fail('error was not a property error')
        }

        expect(error1?.path).toEqual(['n1'])
        expect(error2?.path).toEqual(['n2'])
      })
    })

    describe('with mulitple validators for multiple properties', () => {
      const validator = validateObject<SimpleObject>({ n1: [greaterThan(0), greaterThan(1)], n2: greaterThan(1) })

      it('succeeds for valid properties', () => {
        const value: SimpleObject = { s: '', n1: 2, n2: 2, b: false }
        expect(validator(value)).toBe(value)
      })

      it('fails for single invalid property', () => {
        const value: SimpleObject = { s: '', n1: 1, n2: 2, b: false }
        const result = validator(value)

        if (!isShavalError(result)) {
          return fail('result was not an error')
        }

        expect(result.value).toBe(value)
        expect(result.errors).toHaveLength(1)
      })

      it('fails for multiple invalid properties and aggregates errors', () => {
        const value: SimpleObject = { s: '', n1: 0, n2: 0, b: false }
        const result = validator(value)

        if (!isShavalError(result)) {
          return fail('result was not an error')
        }

        expect(result.value).toBe(value)
        expect(result.errors).toHaveLength(3)
      })

      it('adds the property name to path for errors', () => {
        const value: SimpleObject = { s: '', n1: 0, n2: 0, b: false }
        const result = validator(value)

        if (!isShavalError(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(3)

        const error1 = result.errors[0]
        const error2 = result.errors[1]
        const error3 = result.errors[2]

        if (typeof error1 === 'string' || typeof error2 === 'string' || typeof error3 === 'string') {
          return fail('error was not a property error')
        }

        expect(error1?.path).toEqual(['n1'])
        expect(error2?.path).toEqual(['n1'])
        expect(error3?.path).toEqual(['n2'])
      })
    })
  })

  describe('object with optional property', () => {
    interface ObjectWithOptionalProperty {
      n?: number
    }

    const validator = validateObject<ObjectWithOptionalProperty>({ n: greaterThan(0) })

    it('succeeds for undefined property', () => {
      const value: ObjectWithOptionalProperty = {}
      expect(validator(value)).toBe(value)
    })

    it('succeeds for valid property', () => {
      const value: ObjectWithOptionalProperty = { n: 1 }
      expect(validator(value)).toBe(value)
    })

    it('fails for invalid property', () => {
      const value: ObjectWithOptionalProperty = { n: 0 }
      const result = validator(value)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(value)
      expect(result.errors).toHaveLength(1)
    })

    it('fails for undefined property if required', () => {
      const value: ObjectWithOptionalProperty = { n: undefined }
      const validator = validateObject<ObjectWithOptionalProperty>({ n: required })
      const result = validator(value)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(value)
      expect(result.errors).toHaveLength(1)
    })

    it('adds the property name to path for errors', () => {
      const value: ObjectWithOptionalProperty = { n: 0 }
      const result = validator(value)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(1)

      const error = result.errors[0]

      if (typeof error === 'string') {
        return fail('error was not a property error')
      }

      expect(error?.path).toEqual(['n'])
    })
  })

  describe('object with optional property', () => {
    interface ObjectWithNullableProperty {
      n: number | null
    }

    const validator = validateObject<ObjectWithNullableProperty>({ n: greaterThan(0) })

    it('succeeds for null property', () => {
      const value: ObjectWithNullableProperty = { n: null }
      expect(validator(value)).toBe(value)
    })

    it('succeeds for valid property', () => {
      const value: ObjectWithNullableProperty = { n: 1 }
      expect(validator(value)).toBe(value)
    })

    it('fails for invalid property', () => {
      const value: ObjectWithNullableProperty = { n: 0 }
      const result = validator(value)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(value)
      expect(result.errors).toHaveLength(1)
    })

    it('fails for null property if required', () => {
      const value: ObjectWithNullableProperty = { n: null }
      const validator = validateObject<ObjectWithNullableProperty>({ n: required })
      const result = validator(value)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(value)
      expect(result.errors).toHaveLength(1)
    })

    it('adds the property name to path for errors', () => {
      const value: ObjectWithNullableProperty = { n: 0 }
      const result = validator(value)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(1)

      const error = result.errors[0]

      if (typeof error === 'string') {
        return fail('error was not a property error')
      }

      expect(error?.path).toEqual(['n'])
    })
  })

  describe('object with array property', () => {
    interface ObjectWithArrayProperty {
      arr: number[]
    }

    const validator = validateObject<ObjectWithArrayProperty>({ arr: validateArray(greaterThan(0)) })

    it('succeeds for valid property', () => {
      const value: ObjectWithArrayProperty = { arr: [1] }
      expect(validator(value)).toBe(value)
    })

    it('fails for invalid property', () => {
      const value: ObjectWithArrayProperty = { arr: [0] }
      const result = validator(value)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(value)
      expect(result.errors).toHaveLength(1)
    })

    it('adds the property name to path for errors', () => {
      const value: ObjectWithArrayProperty = { arr: [0] }
      const result = validator(value)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(1)

      const error = result.errors[0]

      if (typeof error === 'string') {
        return fail('error was not a property error')
      }

      expect(error?.path).toEqual(['arr', '0'])
    })
  })

  describe('object with object property', () => {
    interface ObjectWithObjectProperty {
      obj: {
        n: number
      }
    }

    const validator = validateObject<ObjectWithObjectProperty>({ obj: { n: greaterThan(0) } })

    it('succeeds for valid property', () => {
      const value: ObjectWithObjectProperty = { obj: { n: 1 } }
      expect(validator(value)).toBe(value)
    })

    it('fails for invalid property', () => {
      const value: ObjectWithObjectProperty = { obj: { n: 0 } }
      const result = validator(value)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.value).toBe(value)
      expect(result.errors).toHaveLength(1)
    })

    it('adds the property name to path for errors', () => {
      const value: ObjectWithObjectProperty = { obj: { n: 0 } }
      const result = validator(value)

      if (!isShavalError(result)) {
        return fail('result was not an error')
      }

      expect(result.errors).toHaveLength(1)

      const error = result.errors[0]

      if (typeof error === 'string') {
        return fail('error was not a property error')
      }

      expect(error?.path).toEqual(['obj', 'n'])
    })

    describe('with long form', () => {
      const validator = validateObject<ObjectWithObjectProperty>({
        obj: validateObject<ObjectWithObjectProperty['obj']>({ n: greaterThan(0) }),
      })

      it('succeeds for valid property', () => {
        const value: ObjectWithObjectProperty = { obj: { n: 1 } }
        expect(validator(value)).toBe(value)
      })

      it('fails for invalid property', () => {
        const value: ObjectWithObjectProperty = { obj: { n: 0 } }
        const result = validator(value)

        if (!isShavalError(result)) {
          return fail('result was not an error')
        }

        expect(result.value).toBe(value)
        expect(result.errors).toHaveLength(1)
      })
    })
  })
})
