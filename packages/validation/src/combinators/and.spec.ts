import { failure, isFailure } from '@shaval/core'
import type { Validator } from '../validator.js'
import { and } from './and.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(and.name, () => {
  const validator1: Validator<string> = (value) => (value === 'a' ? value : failure(value, 'a'))
  const validator2: Validator<string> = (value) => (value === 'a' || value === 'b' ? value : failure(value, 'b'))
  const validator3: Validator<string> = (value) =>
    value === 'a' || value === 'b' || value === 'c' ? value : failure(value, 'c')

  it('throws for null validator parameter', () => {
    expect(() => and(validator1, null as any)).toThrow()
  })

  it('throws for undefined validator parameter', () => {
    expect(() => and(validator1, undefined as any)).toThrow()
  })

  it('if called with failure returns failure', () => {
    const validator = and(
      (v) => v,
      (v) => v,
    )

    const err = failure([], 'fail')
    expect(validator(err)).toBe(err)
  })

  const validator = and(validator1, validator2, validator3)

  it('succeeds for valid value', () => {
    expect(validator('a')).toBe('a')
  })

  it('fails for invalid value', () => {
    expect(isFailure(validator('d'))).toBe(true)
  })

  it('aggregates error messages from all failing validators', () => {
    const result = validator('c')

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.value).toBe('c')
    expect(Object.keys(result.errors[0]?.details ?? {})).toHaveLength(2)
  })

  it('resolves "and" shorthand', () => {
    const validator: Validator<number> = (value) => value
    expect(and([validator, validator], [validator, validator])(1)).toEqual(1)
  })

  it('resolves "and" shorthand for rest arg', () => {
    const validator: Validator<number> = (value) => value
    expect(and([validator, validator], [validator, validator], [validator, validator])(1)).toEqual(1)
  })

  it('resolves nested "and" shorthand', () => {
    const validator: Validator<number> = (value) => value
    expect(and([validator, [validator, validator]], [validator, validator])(1)).toEqual(1)
  })

  it('resolves object shorthand', () => {
    const validator: Validator<number> = (value) => value
    const value = { n: 1 }
    expect(and({ n: validator }, { n: validator })(value)).toBe(value)
  })

  it('resolves object shorthand for rest arg', () => {
    const validator: Validator<number> = (value) => value
    const value = { n: 1 }
    expect(and({ n: validator }, { n: validator }, { n: validator })(value)).toBe(value)
  })

  describe('intersections', () => {
    interface Object1 {
      s: string
    }

    interface Object2 {
      n: number
    }

    const validator1: Validator<Object1> = (value) => ((value as Object1).s === 'a' ? value : failure(value, '1'))
    const validator2: Validator<Object2> = (value) => ((value as Object2).n === 1 ? value : failure(value, '2'))

    const validator = and(validator1, validator2)

    it('succeeds for valid value', () => {
      const value: Object1 & Object2 = { s: 'a', n: 1 }
      expect(validator(value)).toBe(value)
    })

    it('fails for invalid value', () => {
      const value: Object1 & Object2 = { s: '', n: 1 }
      expect(isFailure(validator(value))).toBe(true)
    })
  })
})
