import { array, nullable, optional, Parser, string } from '@shaval/parsing'
import { expectError, expectType } from 'tsd'

expectType<Parser<string[]>>(array(string))
expectType<Parser<(string | undefined)[]>>(array(optional(string)))
expectError<Parser<(string | undefined)[]>>(array(string))
expectType<Parser<(string | null)[]>>(array(nullable(string)))
expectError<Parser<(string | null)[]>>(array(string))
expectType<Parser<(string | undefined | null)[]>>(array(optional(nullable(string))))
expectError<Parser<(string | undefined | null)[]>>(array(string))
