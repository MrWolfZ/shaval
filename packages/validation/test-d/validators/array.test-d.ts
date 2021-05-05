import { arrayValidator, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringValidator: Validator<string> = undefined!
const numberValidator: Validator<number> = undefined!
const booleanValidator: Validator<boolean> = undefined!

// @ts-expect-error test
arrayValidator()

expectAssignable<Validator<readonly string[]>>(arrayValidator(stringValidator))
expectAssignable<Validator<readonly string[]>>(arrayValidator(stringValidator, stringValidator))
expectAssignable<Validator<readonly number[]>>(arrayValidator(numberValidator))
expectAssignable<Validator<readonly boolean[]>>(arrayValidator(booleanValidator))
expectAssignable<Validator<readonly string[]>>(arrayValidator([stringValidator, stringValidator]))
expectAssignable<Validator<readonly { s: string }[]>>(arrayValidator({ s: stringValidator }))

expectError<Validator<readonly string[]>>(arrayValidator(numberValidator))
expectError<Validator<readonly string[]>>(arrayValidator(stringValidator, numberValidator))
