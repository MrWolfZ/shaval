import { Parser, tuple } from '@shaval/parsing'
import { expectError, expectType } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringParser: Parser<string> = undefined!
const numberParser: Parser<number> = undefined!
const booleanParser: Parser<boolean> = undefined!
const stringArrayParser: Parser<string[]> = undefined!

// @ts-expect-error test
tuple()

expectType<Parser<[string]>>(tuple(stringParser))
expectType<Parser<[string[]]>>(tuple([stringParser]))
expectType<Parser<[string, number]>>(tuple(stringParser, numberParser))
expectType<Parser<[number, string]>>(tuple(numberParser, stringParser))
expectError<Parser<[string, number]>>(tuple(stringParser, stringParser))
expectError<Parser<[string, number]>>(tuple(numberParser, numberParser))

expectType<Parser<[string, number, boolean]>>(tuple(stringParser, numberParser, booleanParser))
expectType<Parser<[string, boolean, number]>>(tuple(stringParser, booleanParser, numberParser))
expectError<Parser<[string, number, boolean]>>(tuple(stringParser, numberParser))

expectType<Parser<[string, number, boolean, string[]]>>(
  tuple(stringParser, numberParser, booleanParser, stringArrayParser),
)

expectType<Parser<[string, string[]]>>(tuple(stringParser, [stringParser]))
expectError<Parser<[string, string[]]>>(tuple(stringParser, [numberParser]))
expectType<Parser<[string[], string]>>(tuple([stringParser], stringParser))
expectError<Parser<[string[], string]>>(tuple(stringParser, [stringParser]))
expectType<Parser<[number[], string[]]>>(tuple([numberParser], [stringParser]))
expectType<Parser<[string[], number[]]>>(tuple([stringParser], [numberParser]))
expectType<Parser<[string, number, string]>>(tuple(stringParser, numberParser, stringParser))
expectType<Parser<[string, number, string[]]>>(tuple(stringParser, numberParser, [stringParser]))
expectType<Parser<[string, number[], string]>>(tuple(stringParser, [numberParser], stringParser))
expectType<Parser<[string[], number, string]>>(tuple([stringParser], numberParser, stringParser))
expectType<Parser<[string[], number[], string]>>(tuple([stringParser], [numberParser], stringParser))
expectType<Parser<[string[], number[], boolean[]]>>(tuple([stringParser], [numberParser], [booleanParser]))
expectType<Parser<[string, number, string, string]>>(tuple(stringParser, numberParser, stringParser, stringParser))
expectType<Parser<[string, number, string, string, string]>>(
  tuple(stringParser, numberParser, stringParser, stringParser, stringParser),
)
expectError(tuple(stringParser, [numberParser], [booleanParser], stringParser))

expectType<Parser<[string, { s: string }]>>(tuple(stringParser, { s: stringParser }))
expectType<Parser<[{ s: string }, string]>>(tuple({ s: stringParser }, stringParser))
expectType<Parser<[string, number, { s: string }]>>(tuple(stringParser, numberParser, { s: stringParser }))
