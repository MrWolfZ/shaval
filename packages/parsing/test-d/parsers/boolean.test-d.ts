import { boolean, Parser } from '@shaval/parsing'
import { expectError, expectType } from 'tsd'

expectType<Parser<boolean>>(boolean)
expectError<Parser<string>>(boolean)
expectError<Parser<boolean | undefined>>(boolean)
expectError<Parser<boolean | null>>(boolean)
