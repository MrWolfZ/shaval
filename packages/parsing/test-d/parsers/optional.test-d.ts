import { optional, Parser } from '@shaval/parsing'
import { expectError, expectType } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringParser: Parser<string> = undefined!

expectType<Parser<string | undefined>>(optional(stringParser))
expectError<Parser<string>>(optional(stringParser))
expectType<Parser<string[] | undefined>>(optional([stringParser]))
expectType<Parser<{ s: string } | undefined>>(optional({ s: stringParser }))
