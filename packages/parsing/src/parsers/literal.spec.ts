import { isSuccess } from '@shaval/core'
import { literal } from './literal.js'

describe(literal.name, () => {
  it('succeeds for same value', () => {
    expect(literal('a')('a')).toBe('a')
    expect(literal(1)(1)).toBe(1)
    expect(literal(true)(true)).toBe(true)
  })

  it('fails for different value', () => {
    expect(isSuccess(literal('a')('b'))).toBe(false)
    expect(isSuccess(literal(1)(2))).toBe(false)
    expect(isSuccess(literal(true)(false))).toBe(false)
  })
})
