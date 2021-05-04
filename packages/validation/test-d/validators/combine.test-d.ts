import { combine, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringValidator: Validator<string> = undefined!
const numberValidator: Validator<number> = undefined!
const stringOrNumberValidator: Validator<string | number> = undefined!

// @ts-expect-error test
combine()

// @ts-expect-error test
combine(stringValidator)

// @ts-expect-error test
combine(stringValidator, numberValidator)

expectAssignable<Validator<string>>(combine(stringValidator, stringValidator))
expectAssignable<Validator<string | number>>(combine(stringOrNumberValidator, stringOrNumberValidator))
expectError<Validator<number>>(combine(stringValidator, stringValidator))
