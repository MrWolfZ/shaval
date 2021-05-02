import { boolean, nullable, optional, Parser } from '@shaval/parsing'
import { expectError, expectType } from 'tsd'

expectType<Parser<boolean>>(boolean)
expectType<Parser<boolean | undefined>>(optional(boolean))
expectError<Parser<boolean | undefined>>(nullable(boolean))
expectType<Parser<boolean | null>>(nullable(boolean))
expectError<Parser<boolean | null>>(optional(boolean))
expectType<Parser<boolean | null | undefined>>(optional(nullable(boolean)))
expectType<Parser<boolean | null | undefined>>(nullable(optional(boolean)))
