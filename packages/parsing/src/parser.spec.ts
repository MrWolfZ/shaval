import { Parser, resolveParserOrShorthand } from './parser.js'

/* eslint-disable @typescript-eslint/no-explicit-any */

describe(resolveParserOrShorthand.name, () => {
  const expectedValue = 'expected'
  const parser: Parser<string> = () => expectedValue

  it('resolves array shorthands', () => {
    const resolvedParser = resolveParserOrShorthand([parser])
    expect(resolvedParser([''])).toEqual([expectedValue])
  })

  it('resolves nested array shorthands', () => {
    const resolvedParser = resolveParserOrShorthand([[parser]])
    expect(resolvedParser([['']])).toEqual([[expectedValue]])
  })

  it('resolves nested array object shorthands', () => {
    const resolvedParser = resolveParserOrShorthand([{ s: parser }])
    expect(resolvedParser([{ s: '' }])).toEqual([{ s: expectedValue }])
  })

  it('resolves object shorthands', () => {
    const resolvedParser = resolveParserOrShorthand({ s: parser })
    expect(resolvedParser({ s: '' })).toEqual({ s: expectedValue })
  })

  it('resolves neested object shorthands', () => {
    const resolvedParser = resolveParserOrShorthand({ s: { o: parser } })
    expect(resolvedParser({ s: { o: '' } })).toEqual({ s: { o: expectedValue } })
  })

  it('resolves neested object array shorthands', () => {
    const resolvedParser = resolveParserOrShorthand({ s: [parser] })
    expect(resolvedParser({ s: [''] })).toEqual({ s: [expectedValue] })
  })

  it('returns parsers', () => {
    const resolvedParser = resolveParserOrShorthand(parser)
    expect(resolvedParser('')).toEqual(expectedValue)
  })

  it('throws for null parser', () => {
    expect(() => resolveParserOrShorthand(null as any)).toThrow()
  })

  it('throws for undefined parser', () => {
    expect(() => resolveParserOrShorthand(undefined as any)).toThrow()
  })
})
