import { greaterThan, required, validateArray, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

expectError<Validator<string[]>>(validateArray())

expectAssignable<Validator<readonly string[]>>(validateArray())
expectAssignable<Validator<readonly number[]>>(validateArray())
expectAssignable<Validator<readonly boolean[]>>(validateArray())
expectAssignable<Validator<readonly null[]>>(validateArray())
expectAssignable<Validator<readonly undefined[]>>(validateArray())
expectAssignable<Validator<readonly (string | undefined)[]>>(validateArray())
expectAssignable<Validator<readonly (string | null)[]>>(validateArray())
expectAssignable<Validator<readonly (string | undefined | null)[]>>(validateArray())
expectAssignable<Validator<readonly string[][]>>(validateArray())
expectAssignable<Validator<readonly { s: string }[]>>(validateArray())

expectAssignable<Validator<readonly string[]>>(validateArray(required))
expectAssignable<Validator<readonly number[]>>(validateArray(required))
expectAssignable<Validator<readonly boolean[]>>(validateArray(required))
expectAssignable<Validator<readonly null[]>>(validateArray(required))
expectAssignable<Validator<readonly undefined[]>>(validateArray(required))
expectAssignable<Validator<readonly (string | undefined)[]>>(validateArray(required))
expectAssignable<Validator<readonly (string | null)[]>>(validateArray(required))
expectAssignable<Validator<readonly (string | undefined | null)[]>>(validateArray(required))
expectAssignable<Validator<readonly string[][]>>(validateArray(required))
expectAssignable<Validator<readonly { s: string }[]>>(validateArray(required))

expectError<Validator<readonly string[]>>(validateArray(greaterThan(0)))
expectAssignable<Validator<readonly number[]>>(validateArray(greaterThan(0)))
expectError<Validator<readonly boolean[]>>(validateArray(greaterThan(0)))
expectAssignable<Validator<readonly null[]>>(validateArray(greaterThan(0)))
expectAssignable<Validator<readonly undefined[]>>(validateArray(greaterThan(0)))
expectAssignable<Validator<readonly (number | undefined)[]>>(validateArray(greaterThan(0)))
expectAssignable<Validator<readonly (number | null)[]>>(validateArray(greaterThan(0)))
expectAssignable<Validator<readonly (number | undefined | null)[]>>(validateArray(greaterThan(0)))
expectError<Validator<readonly string[][]>>(validateArray(greaterThan(0)))
expectError<Validator<readonly { s: string }[]>>(validateArray(greaterThan(0)))

expectError<Validator<readonly string[]>>(validateArray(required, greaterThan(0)))
expectAssignable<Validator<readonly number[]>>(validateArray(required, greaterThan(0)))
expectError<Validator<readonly boolean[]>>(validateArray(required, greaterThan(0)))
expectAssignable<Validator<readonly null[]>>(validateArray(required, greaterThan(0)))
expectAssignable<Validator<readonly undefined[]>>(validateArray(required, greaterThan(0)))
expectAssignable<Validator<readonly (number | undefined)[]>>(validateArray(required, greaterThan(0)))
expectAssignable<Validator<readonly (number | null)[]>>(validateArray(required, greaterThan(0)))
expectAssignable<Validator<readonly (number | undefined | null)[]>>(validateArray(required, greaterThan(0)))
expectError<Validator<readonly string[][]>>(validateArray(required, greaterThan(0)))
expectError<Validator<readonly { s: string }[]>>(validateArray(required, greaterThan(0)))