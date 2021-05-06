import { isSuccess } from '@shaval/core'
import { literal } from './literal.js'

describe(literal.name, () => {
  const symbol1 = Symbol()
  const symbol2 = Symbol()

  it('succeeds for same value', () => {
    expect(literal('a')('a')).toBe('a')
    expect(literal(1)(1)).toBe(1)
    expect(literal(true)(true)).toBe(true)
    expect(literal(symbol1)(symbol1)).toBe(symbol1)
  })

  it('fails for different value', () => {
    expect(isSuccess(literal('a')('b'))).toBe(false)
    expect(isSuccess(literal(1)(2))).toBe(false)
    expect(isSuccess(literal(true)(false))).toBe(false)
    expect(isSuccess(literal(symbol1)(symbol2))).toBe(false)
  })
})
