import { array, ArrayParserShorthand, Parser } from '@shaval/parsing'
import { expectAssignable, expectError, expectType } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringParser: Parser<string> = undefined!
const numberParser: Parser<number> = undefined!
const optionalStringParser: Parser<string | undefined> = undefined!
const nullableStringParser: Parser<string | null> = undefined!
const stringOrNumberParser: Parser<string | number> = undefined!
const stringArrayParser: Parser<string[]> = undefined!
const objectParser: Parser<{ s: string }> = undefined!

expectType<Parser<string[]>>(array(stringParser))
expectType<Parser<(string | undefined)[]>>(array(optionalStringParser))
expectError<Parser<(string | undefined)[]>>(array(stringParser))
expectType<Parser<(string | null)[]>>(array(nullableStringParser))
expectError<Parser<(string | null)[]>>(array(stringParser))
expectType<Parser<(string | number)[]>>(array(stringOrNumberParser))
expectError<Parser<(string | number)[]>>(array(stringParser))
expectType<Parser<string[][]>>(array(stringArrayParser))
expectType<Parser<{ s: string }[]>>(array(objectParser))
expectType<Parser<string[][]>>(array([stringParser]))
expectType<Parser<string[][][]>>(
  array<string[]>([[stringParser]]),
)
expectType<Parser<{ s: string }[]>>(array({ s: stringParser }))
expectType<Parser<{ s: string }[][]>>(array([{ s: stringParser }]))

expectAssignable<ArrayParserShorthand<string>>([stringParser])
expectAssignable<ArrayParserShorthand<string[]>>([[stringParser]])
expectError<ArrayParserShorthand<string[]>>(stringParser)
expectError<ArrayParserShorthand<string[]>>([numberParser])
expectAssignable<ArrayParserShorthand<{ s: string }>>([{ s: stringParser }])
expectAssignable<ArrayParserShorthand<{ s: string; n: number }>>([{ s: stringParser, n: numberParser }])
expectError<ArrayParserShorthand<{ s: string; n: number }>>({ s: stringParser })
expectAssignable<ArrayParserShorthand<{ s: string | number }>>([{ s: stringOrNumberParser }])
