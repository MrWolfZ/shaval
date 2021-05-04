import { failure, isFailure } from '@shaval/core'
import type { Validator } from '../validator.js'
import { objectValidator } from './object.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(objectValidator.name, () => {
  it('throws for null validators', () => {
    expect(() => objectValidator<{ s: string }>(null as any)).toThrow()
  })

  it('throws for undefined validators', () => {
    expect(() => objectValidator<{ s: string }>(undefined as any)).toThrow()
  })

  it('throws for null property validator', () => {
    expect(() => objectValidator<{ s: string }>({ s: null as any })).toThrow()
  })

  it('throws for explicitly undefined property validator', () => {
    expect(() => objectValidator<{ s: string }>({ s: undefined as any })).toThrow()
  })

  it('does not throw for undefined property validator', () => {
    expect(() => objectValidator<{ s: string }>({})).not.toThrow()
  })

  it('if called with failure returns failure', () => {
    const validator = objectValidator({})
    const err = failure({}, 'fail')
    expect(validator(err)).toBe(err)
  })

  describe('simple object', () => {
    interface SimpleObject {
      s: string
      n: number
    }

    describe('no validators', () => {
      const validator = objectValidator<SimpleObject>({})

      it('succeeds for any value', () => {
        const value: SimpleObject = { s: '', n: 0 }
        expect(validator(value)).toBe(value)
      })
    })

    describe('with single validator for single property', () => {
      const propValidator: Validator<number> = (value) =>
        value === 1 ? value : failure([{ value, path: ['a'], details: { a: undefined } }])

      const validator = objectValidator<SimpleObject>({ n: propValidator })

      it('succeeds for valid property', () => {
        const value: SimpleObject = { s: '', n: 1 }
        expect(validator(value)).toBe(value)
      })

      it('fails for invalid property', () => {
        expect(isFailure(validator({ s: '', n: 0 }))).toBe(true)
      })

      it('adds the property name to path for errors', () => {
        const result = validator({ s: '', n: 0 })

        if (!isFailure(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(1)
        expect(result.errors[0]?.path).toEqual(['n', 'a'])
      })
    })

    describe('with multiple validators for single property', () => {
      const propValidator1: Validator<number> = (value) =>
        value === 1 ? value : failure([{ value, path: ['a'], details: { a: undefined } }])
      const propValidator2: Validator<number> = (value) =>
        value === 1 ? value : failure([{ value, path: ['b'], details: { b: undefined } }])

      const validator = objectValidator<SimpleObject>({ n: [propValidator1, propValidator2] })

      it('succeeds for valid property', () => {
        const value: SimpleObject = { s: '', n: 1 }
        expect(validator(value)).toBe(value)
      })

      it('fails for invalid property', () => {
        expect(isFailure(validator({ s: '', n: 0 }))).toBe(true)
      })

      it('aggregates error messages from all validators', () => {
        const result = validator({ s: '', n: 0 })

        if (!isFailure(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(2)
      })

      it('adds the property name to path for errors', () => {
        const result = validator({ s: '', n: 0 })

        if (!isFailure(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(2)
        expect(result.errors[0]?.path).toEqual(['n', 'a'])
        expect(result.errors[1]?.path).toEqual(['n', 'b'])
      })
    })

    describe('with single validator for multiple properties', () => {
      const propValidator1: Validator<string> = (value) =>
        value === 'a' ? value : failure([{ value, path: ['a'], details: { a: undefined } }])
      const propValidator2: Validator<number> = (value) =>
        value === 1 ? value : failure([{ value, path: ['b'], details: { b: undefined } }])

      const validator = objectValidator<SimpleObject>({ s: propValidator1, n: propValidator2 })

      it('succeeds for valid properties', () => {
        const value: SimpleObject = { s: 'a', n: 1 }
        expect(validator(value)).toBe(value)
      })

      it('fails for single invalid property', () => {
        expect(isFailure(validator({ s: '', n: 1 }))).toBe(true)
      })

      it('aggregates error messages from all validators', () => {
        const result = validator({ s: '', n: 0 })

        if (!isFailure(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(2)
      })

      it('adds the property name to path for errors', () => {
        const result = validator({ s: '', n: 0 })

        if (!isFailure(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(2)
        expect(result.errors[0]?.path).toEqual(['s', 'a'])
        expect(result.errors[1]?.path).toEqual(['n', 'b'])
      })
    })

    describe('with mulitple validators for multiple properties', () => {
      const propValidator1: Validator<string> = (value) =>
        value === 'a' ? value : failure([{ value, path: ['a'], details: { a: undefined } }])
      const propValidator2: Validator<string> = (value) =>
        ['a', 'b'].includes(value as string) ? value : failure([{ value, path: ['b'], details: { b: undefined } }])
      const propValidator3: Validator<number> = (value) =>
        value === 1 ? value : failure([{ value, path: ['c'], details: { c: undefined } }])
      const propValidator4: Validator<number> = (value) =>
        [1, 2].includes(value as number) ? value : failure([{ value, path: ['d'], details: { d: undefined } }])

      const validator = objectValidator<SimpleObject>({
        s: [propValidator1, propValidator2],
        n: [propValidator3, propValidator4],
      })

      it('succeeds for valid properties', () => {
        const value: SimpleObject = { s: 'a', n: 1 }
        expect(validator(value)).toBe(value)
      })

      it('fails for single invalid property', () => {
        expect(isFailure(validator({ s: '', n: 1 }))).toBe(true)
      })

      it('aggregates error messages from all validators', () => {
        const result = validator({ s: '', n: 2 })

        if (!isFailure(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(3)
      })

      it('adds the property name to path for errors', () => {
        const result = validator({ s: '', n: 2 })

        if (!isFailure(result)) {
          return fail('result was not an error')
        }

        expect(result.errors).toHaveLength(3)
        expect(result.errors[0]?.path).toEqual(['s', 'a'])
        expect(result.errors[1]?.path).toEqual(['s', 'b'])
        expect(result.errors[2]?.path).toEqual(['n', 'c'])
      })
    })
  })

  describe('object with optional property', () => {
    interface ObjectWithOptionalProperty {
      n?: number
    }

    const propValidator: Validator<number> = (val) => (val === 1 ? val : { ...failure(val, ''), path: ['a'] })
    const validator = objectValidator<ObjectWithOptionalProperty>({ n: propValidator })

    it('succeeds for missing property', () => {
      const value: ObjectWithOptionalProperty = {}
      expect(validator(value)).toBe(value)
    })

    it('succeeds for valid property', () => {
      const value: ObjectWithOptionalProperty = { n: 1 }
      expect(validator(value)).toBe(value)
    })

    it('fails for invalid property', () => {
      expect(isFailure(validator({ n: 0 }))).toBe(true)
    })

    it('fails for explicitly undefined property', () => {
      expect(isFailure(validator({ n: undefined }))).toBe(true)
    })
  })

  describe('object with nullable property', () => {
    interface ObjectWithNullableProperty {
      n: number | null
    }

    const propValidator: Validator<number | null> = (val) => (val === 1 || val === null ? val : failure(val, ''))
    const validator = objectValidator<ObjectWithNullableProperty>({ n: propValidator })

    it('succeeds for null property', () => {
      const value: ObjectWithNullableProperty = { n: null }
      expect(validator(value)).toBe(value)
    })

    it('succeeds for valid property', () => {
      const value: ObjectWithNullableProperty = { n: 1 }
      expect(validator(value)).toBe(value)
    })

    it('fails for invalid property', () => {
      expect(isFailure(validator({ n: 0 }))).toBe(true)
    })
  })
})
