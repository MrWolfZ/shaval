import { nullable, optional, Parser, string } from '@shaval/parsing'
import { expectError, expectType } from 'tsd'

// primitives

expectType<Parser<string>>(string)
expectType<Parser<string | undefined>>(optional(string))
expectError<Parser<string | undefined>>(nullable(string))
expectType<Parser<string | null>>(nullable(string))
expectError<Parser<string | number>>(string)
expectError<Parser<string | null>>(optional(string))
expectType<Parser<string | null | undefined>>(optional(nullable(string)))
expectType<Parser<string | null | undefined>>(nullable(optional(string)))
