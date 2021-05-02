import { isSuccess } from '@shaval/core'
import { nullable } from './nullable.js'
import { number } from './number.js'

describe(nullable.name, () => {
  it('succeeds for zero', () => {
    expect(nullable(number)(0)).toBe(0)
  })

  it('succeeds for non-zero nullable', () => {
    expect(nullable(number)(1)).toBe(1)
  })

  it('succeeds for null', () => {
    expect(nullable(number)(null)).toBe(null)
  })

  it('fails for undefined', () => {
    expect(isSuccess(nullable(number)(undefined))).toBe(false)
  })

  it('fails for string', () => {
    expect(isSuccess(nullable(number)('a'))).toBe(false)
  })

  it('fails for boolean', () => {
    expect(isSuccess(nullable(number)(true))).toBe(false)
  })

  it('fails for object', () => {
    expect(isSuccess(nullable(number)({ s: '' }))).toBe(false)
  })

  it('fails for array', () => {
    expect(isSuccess(nullable(number)([' ']))).toBe(false)
  })
})
