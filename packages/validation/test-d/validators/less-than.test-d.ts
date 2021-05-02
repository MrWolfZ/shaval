import { lessThan, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

expectError<Validator<string>>(lessThan(0))
expectAssignable<Validator<number>>(lessThan(0))
expectError<Validator<boolean>>(lessThan(0))
expectError<Validator<null>>(lessThan(0))
expectError<Validator<undefined>>(lessThan(0))
expectError<Validator<number | undefined>>(lessThan(0))
expectError<Validator<number | null>>(lessThan(0))
expectError<Validator<number | undefined | null>>(lessThan(0))
expectError<Validator<string[]>>(lessThan(0))
expectError<Validator<{ s: string }>>(lessThan(0))
