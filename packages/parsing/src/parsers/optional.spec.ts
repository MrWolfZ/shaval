import { isSuccess } from '@shaval/core'
import { number } from './number.js'
import { optional } from './optional.js'

describe(optional.name, () => {
  it('succeeds for zero', () => {
    expect(optional(number)(0)).toBe(0)
  })

  it('succeeds for non-zero optional', () => {
    expect(optional(number)(1)).toBe(1)
  })

  it('succeeds for undefined', () => {
    expect(optional(number)(undefined)).toBe(undefined)
  })

  it('fails for null', () => {
    expect(isSuccess(optional(number)(null))).toBe(false)
  })

  it('fails for string', () => {
    expect(isSuccess(optional(number)('a'))).toBe(false)
  })

  it('fails for boolean', () => {
    expect(isSuccess(optional(number)(true))).toBe(false)
  })

  it('fails for object', () => {
    expect(isSuccess(optional(number)({ s: '' }))).toBe(false)
  })

  it('fails for array', () => {
    expect(isSuccess(optional(number)([' ']))).toBe(false)
  })
})
