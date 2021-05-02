import { isSuccess } from '@shaval/core'
import { number } from './number.js'

describe(number.name, () => {
  it('succeeds for zero', () => {
    expect(number(0)).toBe(0)
  })

  it('succeeds for non-zero number', () => {
    expect(number(1)).toBe(1)
  })

  it('fails for undefined', () => {
    expect(isSuccess(number(undefined))).toBe(false)
  })

  it('fails for null', () => {
    expect(isSuccess(number(null))).toBe(false)
  })

  it('fails for string', () => {
    expect(isSuccess(number('a'))).toBe(false)
  })

  it('fails for boolean', () => {
    expect(isSuccess(number(true))).toBe(false)
  })

  it('fails for object', () => {
    expect(isSuccess(number({ s: '' }))).toBe(false)
  })

  it('fails for array', () => {
    expect(isSuccess(number([' ']))).toBe(false)
  })
})
