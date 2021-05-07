import { date, Parser } from '@shaval/parsing'
import { expectError, expectType } from 'tsd'

expectType<Parser<Date>>(date)
expectError<Parser<number>>(date)
expectError<Parser<Date | undefined>>(date)
expectError<Parser<Date | null>>(date)
