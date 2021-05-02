import { nullable, number, optional, Parser } from '@shaval/parsing'
import { expectError, expectType } from 'tsd'

expectType<Parser<number>>(number)
expectType<Parser<number | undefined>>(optional(number))
expectError<Parser<number | undefined>>(nullable(number))
expectType<Parser<number | null>>(nullable(number))
expectError<Parser<number | null>>(optional(number))
expectType<Parser<number | null | undefined>>(optional(nullable(number)))
expectType<Parser<number | null | undefined>>(nullable(optional(number)))
