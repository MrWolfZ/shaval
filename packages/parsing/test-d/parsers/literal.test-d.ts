import { literal, Parser } from '@shaval/parsing'
import { expectError, expectType } from 'tsd'

expectType<Parser<'a'>>(literal('a'))
expectError<Parser<'b'>>(literal('a'))
expectType<Parser<1>>(literal(1))
expectError<Parser<2>>(literal(1))
expectType<Parser<true>>(literal(true))
expectError<Parser<false>>(literal(true))
expectError<Parser<'b'>>(literal(1))
