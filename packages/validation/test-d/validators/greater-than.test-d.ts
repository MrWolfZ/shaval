import { greaterThan, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

expectError<Validator<string>>(greaterThan(0))
expectAssignable<Validator<number>>(greaterThan(0))
expectError<Validator<boolean>>(greaterThan(0))
expectError<Validator<null>>(greaterThan(0))
expectError<Validator<undefined>>(greaterThan(0))
expectError<Validator<number | undefined>>(greaterThan(0))
expectError<Validator<number | null>>(greaterThan(0))
expectError<Validator<number | undefined | null>>(greaterThan(0))
expectError<Validator<string[]>>(greaterThan(0))
expectError<Validator<{ s: string }>>(greaterThan(0))
