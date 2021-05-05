import { Parser, string } from '@shaval/parsing'
import { expectError, expectType } from 'tsd'

expectType<Parser<string>>(string)
expectError<Parser<number>>(string)
expectError<Parser<string | undefined>>(string)
expectError<Parser<string | null>>(string)
