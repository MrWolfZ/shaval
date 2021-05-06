import { literal, Parser } from '@shaval/parsing'
import { expectError, expectType } from 'tsd'

const symbol1 = Symbol()
const symbol2 = Symbol()

expectType<Parser<'a'>>(literal('a'))
expectError<Parser<'b'>>(literal('a'))
expectError<Parser<'b'>>(literal(1))
expectError<Parser<'b'>>(literal(symbol1))
expectType<Parser<1>>(literal(1))
expectError<Parser<2>>(literal(1))
expectError<Parser<2>>(literal('a'))
expectError<Parser<2>>(literal(symbol1))
expectType<Parser<true>>(literal(true))
expectError<Parser<false>>(literal(true))
expectError<Parser<false>>(literal('a'))
expectError<Parser<false>>(literal(symbol1))

expectType<Parser<typeof symbol1>>(literal(symbol1))
expectError<Parser<typeof symbol2>>(literal(symbol1))
expectError<Parser<typeof symbol2>>(literal('a'))
expectError<Parser<typeof symbol2>>(literal(1))
expectError<Parser<typeof symbol2>>(literal(true))
