import { validateArray, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringValidator: Validator<string> = undefined!
const numberValidator: Validator<number> = undefined!
const booleanValidator: Validator<boolean> = undefined!

// @ts-expect-error test
validateArray()

expectAssignable<Validator<readonly string[]>>(validateArray(stringValidator))
expectAssignable<Validator<readonly string[]>>(validateArray(stringValidator, stringValidator))
expectAssignable<Validator<readonly number[]>>(validateArray(numberValidator))
expectAssignable<Validator<readonly boolean[]>>(validateArray(booleanValidator))

expectError<Validator<readonly string[]>>(validateArray(numberValidator))
expectError<Validator<readonly string[]>>(validateArray(stringValidator, numberValidator))
