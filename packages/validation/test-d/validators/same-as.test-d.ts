import { sameAs, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

expectError<Validator<string>>(sameAs(0))
expectAssignable<Validator<number>>(sameAs(0))
expectAssignable<Validator<undefined>>(sameAs(undefined))
expectAssignable<Validator<number | undefined>>(sameAs(0 as number | undefined))
expectAssignable<Validator<number | undefined>>(sameAs(undefined as number | undefined))
expectError<Validator<boolean>>(sameAs(0))
expectError<Validator<null>>(sameAs(0))
expectError<Validator<undefined>>(sameAs(0))
expectError<Validator<number | undefined>>(sameAs(0))
expectError<Validator<number | null>>(sameAs(0))
expectError<Validator<number | undefined | null>>(sameAs(0))
expectError<Validator<string[]>>(sameAs(0))
expectError<Validator<{ s: string }>>(sameAs(0))
