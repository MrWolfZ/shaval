import { nullable, Parser } from '@shaval/parsing'
import { expectError, expectType } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringParser: Parser<string> = undefined!

expectType<Parser<string | null>>(nullable(stringParser))
expectError<Parser<string>>(nullable(stringParser))
expectType<Parser<string[] | null>>(nullable([stringParser]))
expectType<Parser<{ s: string } | null>>(nullable({ s: stringParser }))
