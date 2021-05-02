import { required, Validator } from '@shaval/validation'
import { expectAssignable } from 'tsd'

expectAssignable<Validator<string>>(required)
expectAssignable<Validator<number>>(required)
expectAssignable<Validator<boolean>>(required)
expectAssignable<Validator<null>>(required)
expectAssignable<Validator<undefined>>(required)
expectAssignable<Validator<string | undefined>>(required)
expectAssignable<Validator<string | null>>(required)
expectAssignable<Validator<string | undefined | null>>(required)
expectAssignable<Validator<string[]>>(required)
expectAssignable<Validator<string[] | undefined>>(required)
expectAssignable<Validator<{ s: string }>>(required)
expectAssignable<Validator<{ s: string } | undefined>>(required)
