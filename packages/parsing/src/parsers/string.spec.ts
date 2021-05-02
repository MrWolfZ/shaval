import { isSuccess } from '@shaval/core'
import { string } from './string.js'

describe(string.name, () => {
  it('succeeds for empty string', () => {
    expect(string('')).toBe('')
  })

  it('succeeds for non-empty string', () => {
    expect(string('a')).toBe('a')
  })

  it('fails for undefined', () => {
    expect(isSuccess(string(undefined))).toBe(false)
  })

  it('fails for null', () => {
    expect(isSuccess(string(null))).toBe(false)
  })

  it('fails for number', () => {
    expect(isSuccess(string(1))).toBe(false)
  })

  it('fails for boolean', () => {
    expect(isSuccess(string(true))).toBe(false)
  })

  it('fails for object', () => {
    expect(isSuccess(string({ s: '' }))).toBe(false)
  })

  it('fails for array', () => {
    expect(isSuccess(string([' ']))).toBe(false)
  })
})
