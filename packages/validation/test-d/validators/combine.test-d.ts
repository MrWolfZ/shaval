import { combine, greaterThan, required, sameAs, validateObject, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

expectError<Validator<string>>(combine(required, greaterThan(0)))
expectAssignable<Validator<number>>(combine(required, greaterThan(0)))
expectError<Validator<boolean>>(combine(required, greaterThan(0)))
expectAssignable<Validator<null>>(combine(required, greaterThan(0)))
expectAssignable<Validator<undefined>>(combine(required, greaterThan(0)))
expectAssignable<Validator<number | undefined>>(combine(required, greaterThan(0)))
expectAssignable<Validator<number | null>>(combine(required, greaterThan(0)))
expectAssignable<Validator<number | undefined | null>>(combine(required, greaterThan(0)))
expectError<Validator<string[]>>(combine(required, greaterThan(0)))
expectError<Validator<{ s: string }>>(combine(required, greaterThan(0)))
expectAssignable<Validator<number>>(combine(greaterThan(0), sameAs(5)))

interface SimpleObject {
  n: number
}

expectAssignable<Validator<SimpleObject>>(
  combine(
    validateObject<SimpleObject>({
      n: [required, greaterThan(0)],
    }),
    validateObject<SimpleObject>({
      n: greaterThan(0),
    }),
  ),
)
