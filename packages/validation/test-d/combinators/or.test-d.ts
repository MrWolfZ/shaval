import { greaterThan, or, required, sameAs, validateObject, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

expectError<Validator<string>>(or(required, greaterThan(0)))
expectAssignable<Validator<number>>(or(required, greaterThan(0)))
expectError<Validator<boolean>>(or(required, greaterThan(0)))
expectAssignable<Validator<null>>(or(required, greaterThan(0)))
expectAssignable<Validator<undefined>>(or(required, greaterThan(0)))
expectAssignable<Validator<number | undefined>>(or(required, greaterThan(0)))
expectAssignable<Validator<number | null>>(or(required, greaterThan(0)))
expectAssignable<Validator<number | undefined | null>>(or(required, greaterThan(0)))
expectError<Validator<string[]>>(or(required, greaterThan(0)))
expectError<Validator<{ s: string }>>(or(required, greaterThan(0)))
expectAssignable<Validator<number>>(or(greaterThan(0), sameAs(5)))

interface SimpleObject {
  n: number
}

expectAssignable<Validator<SimpleObject>>(
  or(
    validateObject<SimpleObject>({
      n: [required, greaterThan(0)],
    }),
    validateObject<SimpleObject>({
      n: greaterThan(0),
    }),
  ),
)
