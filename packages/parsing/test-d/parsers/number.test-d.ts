import { number, Parser } from '@shaval/parsing'
import { expectError, expectType } from 'tsd'

expectType<Parser<number>>(number)
expectError<Parser<string>>(number)
expectError<Parser<number | undefined>>(number)
expectError<Parser<number | null>>(number)
