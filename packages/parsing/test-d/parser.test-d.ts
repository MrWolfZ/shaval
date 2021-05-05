import type { Parser, ParserOrShorthand, ParserResult } from '@shaval/parsing'
import { expectAssignable, expectError, expectType } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringParser: Parser<string> = undefined!
const optionalStringParser: Parser<string | undefined> = undefined!
const nullableStringParser: Parser<string | null> = undefined!
const stringArrayParser: Parser<string[]> = undefined!
const numberParser: Parser<number> = undefined!
const stringOrNumberParser: Parser<string | number> = undefined!

expectType<Parser<string>>(stringParser)
expectType<Parser<string | undefined>>(optionalStringParser)
expectType<Parser<string | null>>(nullableStringParser)
expectType<Parser<string[]>>(stringArrayParser)
// TODO expectType<Parser<readonly string[]>>(stringArrayParser)
expectError<Parser<number>>(stringParser)
expectError<Parser<string>>(stringOrNumberParser)
expectError<Parser<string | number>>(stringParser)
expectAssignable<Parser<string | number>>((value) =>
  typeof value === 'string' ? stringParser(value) : numberParser(value),
)

expectType<Parser<string>>((value) => stringParser(stringParser(value)))

expectAssignable<ParserOrShorthand<string>>(stringParser)
expectAssignable<ParserOrShorthand<string[]>>(stringArrayParser)
expectAssignable<ParserOrShorthand<string[]>>([stringParser])
expectError<ParserOrShorthand<string[]>>([numberParser])
expectAssignable<ParserOrShorthand<{ s: string }>>({ s: stringParser })
expectAssignable<ParserOrShorthand<{ s: string; n: number }>>({ s: stringParser, n: numberParser })
expectError<ParserOrShorthand<{ s: string; n: number }>>({ s: stringParser })
expectAssignable<ParserOrShorthand<{ s: string | number }>>({ s: stringOrNumberParser })

expectAssignable<ParserResult<string>>('')
expectAssignable<ParserResult<string | undefined>>('')
expectAssignable<ParserResult<string | undefined>>(undefined)
expectAssignable<ParserResult<string | null>>('')
expectAssignable<ParserResult<string | null>>(null)
expectAssignable<ParserResult<string | number>>('')
expectAssignable<ParserResult<string | number>>(1)
expectAssignable<ParserResult<string[]>>([])
expectAssignable<ParserResult<string[]>>([''])
expectAssignable<ParserResult<readonly string[]>>([''])
expectError<ParserResult<number>>('')
expectError<ParserResult<string | number>>([])
