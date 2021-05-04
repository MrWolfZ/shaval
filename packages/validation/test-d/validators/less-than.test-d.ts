import { lessThan, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

expectError<Validator<string>>(lessThan(0))
expectAssignable<Validator<number>>(lessThan(0))
expectError<Validator<boolean>>(lessThan(0))
expectAssignable<Validator<null>>(lessThan(0))
expectAssignable<Validator<undefined>>(lessThan(0))
expectAssignable<Validator<number | undefined>>(lessThan(0))
expectAssignable<Validator<number | null>>(lessThan(0))
expectAssignable<Validator<number | undefined | null>>(lessThan(0))
expectError<Validator<string[]>>(lessThan(0))
expectError<Validator<{ s: string }>>(lessThan(0))
