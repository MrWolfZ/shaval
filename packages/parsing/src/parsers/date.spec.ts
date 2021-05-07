import { isSuccess } from '@shaval/core'
import { date } from './date.js'

describe(date.name, () => {
  it('succeeds for non-empty date', () => {
    const value = new Date()
    expect(date(value)).toBe(value)
  })

  it('fails for undefined', () => {
    expect(isSuccess(date(undefined))).toBe(false)
  })

  it('fails for null', () => {
    expect(isSuccess(date(null))).toBe(false)
  })

  it('fails for string', () => {
    expect(isSuccess(date('a'))).toBe(false)
  })

  it('fails for number', () => {
    expect(isSuccess(date(1))).toBe(false)
  })

  it('fails for boolean', () => {
    expect(isSuccess(date(true))).toBe(false)
  })

  it('fails for object', () => {
    expect(isSuccess(date({ s: '' }))).toBe(false)
  })

  it('fails for array', () => {
    expect(isSuccess(date([' ']))).toBe(false)
  })

  it('fails for function', () => {
    expect(isSuccess(date(() => void 0))).toBe(false)
  })
})
