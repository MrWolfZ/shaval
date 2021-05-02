import { isSuccess } from '@shaval/core'
import { boolean } from './boolean.js'

describe(boolean.name, () => {
  it('succeeds for true', () => {
    expect(boolean(true)).toBe(true)
  })

  it('succeeds for false', () => {
    expect(boolean(false)).toBe(false)
  })

  it('fails for undefined', () => {
    expect(isSuccess(boolean(undefined))).toBe(false)
  })

  it('fails for null', () => {
    expect(isSuccess(boolean(null))).toBe(false)
  })

  it('fails for number', () => {
    expect(isSuccess(boolean(1))).toBe(false)
  })

  it('fails for string', () => {
    expect(isSuccess(boolean('a'))).toBe(false)
  })

  it('fails for object', () => {
    expect(isSuccess(boolean({ s: '' }))).toBe(false)
  })

  it('fails for array', () => {
    expect(isSuccess(boolean([' ']))).toBe(false)
  })
})
