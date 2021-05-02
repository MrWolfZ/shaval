import { failure } from '@shaval/core'
import type { Parser } from '../parser.js'
import { nullable } from './nullable.js'

describe(nullable.name, () => {
  it('succeeds for null', () => {
    const parser: Parser<number> = (value) => failure(value, '')
    expect(nullable(parser)(null)).toBe(null)
  })

  it('calls nested parser for non-null values', () => {
    const parser: Parser<number> = () => 100
    expect(nullable(parser)(0)).toBe(100)
  })

  it('resolves array shorthand', () => {
    const parser: Parser<number> = (value) => value as number
    const value = [1]
    expect(nullable([parser])(value)).toEqual(value)
  })

  it('resolves object shorthand', () => {
    const parser: Parser<number> = (value) => value as number
    const value = { n: 1 }
    expect(nullable({ n: parser })(value)).toEqual(value)
  })
})
