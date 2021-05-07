import { Parser, parser } from './parser.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(parser.name, () => {
  const expectedValue = 'expected'
  const stringParser: Parser<string> = () => expectedValue

  it('resolves array shorthands', () => {
    const resolvedParser = parser([stringParser])
    expect(resolvedParser([''])).toEqual([expectedValue])
  })

  it('resolves nested array shorthands', () => {
    const resolvedParser = parser([[stringParser]])
    expect(resolvedParser([['']])).toEqual([[expectedValue]])
  })

  it('resolves nested array object shorthands', () => {
    const resolvedParser = parser([{ s: stringParser }])
    expect(resolvedParser([{ s: '' }])).toEqual([{ s: expectedValue }])
  })

  it('resolves object shorthands', () => {
    const resolvedParser = parser({ s: stringParser })
    expect(resolvedParser({ s: '' })).toEqual({ s: expectedValue })
  })

  it('resolves nested object shorthands', () => {
    const resolvedParser = parser({ s: { o: stringParser } })
    expect(resolvedParser({ s: { o: '' } })).toEqual({ s: { o: expectedValue } })
  })

  it('resolves nested object array shorthands', () => {
    const resolvedParser = parser({ s: [stringParser] })
    expect(resolvedParser({ s: [''] })).toEqual({ s: [expectedValue] })
  })

  it('returns parsers', () => {
    const resolvedParser = parser(stringParser)
    expect(resolvedParser('')).toEqual(expectedValue)
  })

  it('throws for null parser', () => {
    expect(() => parser(null as any)).toThrow()
  })

  it('throws for undefined parser', () => {
    expect(() => parser(undefined as any)).toThrow()
  })
})
