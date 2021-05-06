import { nullable, optional, Parser, union } from '@shaval/parsing'
import { expectError, expectType } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringParser: Parser<string> = undefined!
const numberParser: Parser<number> = undefined!
const booleanParser: Parser<boolean> = undefined!
const stringArrayParser: Parser<string[]> = undefined!

// @ts-expect-error test
union()

// @ts-expect-error test
union(stringParser)

expectType<Parser<string | number>>(union(stringParser, numberParser))
expectType<Parser<string | number>>(union(numberParser, stringParser))
expectError<Parser<string | number>>(union(stringParser, stringParser))
expectError<Parser<string | number>>(union(numberParser, numberParser))
expectType<Parser<string | number | undefined>>(optional(union(stringParser, numberParser)))
expectError<Parser<string | number | undefined>>(nullable(union(stringParser, numberParser)))
expectType<Parser<string | number | null>>(nullable(union(stringParser, numberParser)))
expectError<Parser<string | number | null>>(optional(union(stringParser, numberParser)))
expectType<Parser<string | number | null | undefined>>(optional(nullable(union(stringParser, numberParser))))
expectType<Parser<string | number | null | undefined>>(nullable(optional(union(stringParser, numberParser))))

expectType<Parser<string | number | boolean>>(union(stringParser, numberParser, booleanParser))
expectType<Parser<string | number | boolean>>(union(stringParser, booleanParser, numberParser))
expectError<Parser<string | number | boolean>>(union(stringParser, numberParser))
expectType<Parser<string | number | boolean | undefined>>(optional(union(stringParser, numberParser, booleanParser)))
expectError<Parser<string | number | boolean | undefined>>(nullable(union(stringParser, numberParser, booleanParser)))
expectType<Parser<string | number | boolean | null>>(nullable(union(stringParser, numberParser, booleanParser)))
expectError<Parser<string | number | boolean | null>>(optional(union(stringParser, numberParser, booleanParser)))
expectType<Parser<string | number | boolean | null | undefined>>(
  optional(nullable(union(stringParser, numberParser, booleanParser))),
)
expectType<Parser<string | number | boolean | null | undefined>>(
  nullable(optional(union(stringParser, numberParser, booleanParser))),
)

expectType<Parser<string | number | boolean | string[]>>(
  union(stringParser, numberParser, booleanParser, stringArrayParser),
)

expectType<Parser<string | string[]>>(union(stringParser, [stringParser]))
expectType<Parser<string | string[]>>(union([stringParser], stringParser))
expectType<Parser<number[] | string[]>>(union([stringParser], [numberParser]))
expectType<Parser<string | number | boolean[]>>(union(stringParser, numberParser, [booleanParser]))
expectType<Parser<string | number[] | boolean>>(union(stringParser, [numberParser], booleanParser))
expectType<Parser<string[] | number | boolean>>(union([stringParser], numberParser, booleanParser))
expectType<Parser<string[] | number[] | boolean[]>>(union([stringParser], [numberParser], [booleanParser]))

expectType<Parser<string | { s: string }>>(union(stringParser, { s: stringParser }))
expectType<Parser<string | { s: string }>>(union({ s: stringParser }, stringParser))
expectType<Parser<string | number | { s: string }>>(union(stringParser, numberParser, { s: stringParser }))
