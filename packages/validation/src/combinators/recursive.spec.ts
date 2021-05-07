import { failure, isFailure, isSuccess } from '@shaval/core'
import type { Validator } from '../validator.js'
import { every } from './every.js'
import { recursiveValidator } from './recursive.js'

describe(recursiveValidator.name, () => {
  const stringValidator: Validator<string> = (value) =>
    value === 'a' || value === 'b' ? value : failure(value, 'string')

  interface RecursiveObject {
    s: string
    recArr: RecursiveObject[]
  }

  const validator = recursiveValidator<RecursiveObject>((self) => ({
    s: stringValidator,
    recArr: every(self),
  }))

  it('succeeds for valid object', () => {
    const value: RecursiveObject = { s: 'a', recArr: [{ s: 'b', recArr: [] }] }
    expect(validator(value)).toEqual(value)
  })

  it('fails for object with invalid property', () => {
    const value: RecursiveObject = { s: 'c', recArr: [{ s: 'b', recArr: [] }] }
    expect(isSuccess(validator(value))).toBe(false)
  })

  it('fails for nested object with invalid property', () => {
    const value: RecursiveObject = { s: 'a', recArr: [{ s: 'c', recArr: [] }] }
    expect(isSuccess(validator(value))).toBe(false)
  })

  it('aggregates errors from all properties', () => {
    const value: RecursiveObject = { s: 'c', recArr: [{ s: 'c', recArr: [] }] }
    const result = validator(value)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(2)
  })

  it('adds the property name to path for errors', () => {
    const value: RecursiveObject = { s: 'c', recArr: [{ s: 'c', recArr: [] }] }
    const result = validator(value)

    if (!isFailure(result)) {
      return fail('result was not an error')
    }

    expect(result.errors).toHaveLength(2)
    expect(result.errors[0]?.path).toEqual(['s'])
    expect(result.errors[1]?.path).toEqual(['recArr', '0', 's'])
  })
})
