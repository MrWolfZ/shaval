import { failure } from '@shaval/core'
import type { Parser } from '../parser.js'
import { optional } from './optional.js'

describe(optional.name, () => {
  it('succeeds for undefined', () => {
    const parser: Parser<number> = (value) => failure(value, '')
    expect(optional(parser)(undefined)).toBe(undefined)
  })

  it('calls nested parser for defined values', () => {
    const parser: Parser<number> = () => 100
    expect(optional(parser)(0)).toBe(100)
  })

  it('resolves array shorthand', () => {
    const parser: Parser<number> = (value) => value as number
    const value = [1]
    expect(optional([parser])(value)).toEqual(value)
  })

  it('resolves object shorthand', () => {
    const parser: Parser<number> = (value) => value as number
    const value = { n: 1 }
    expect(optional({ n: parser })(value)).toEqual(value)
  })
})
