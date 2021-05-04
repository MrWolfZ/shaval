import { and, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringValidator: Validator<string> = undefined!
const numberValidator: Validator<number> = undefined!
const stringOrNumberValidator: Validator<string | number> = undefined!

// @ts-expect-error test
and()

// @ts-expect-error test
and(stringValidator)

// @ts-expect-error test
and(stringValidator, numberValidator)

expectAssignable<Validator<string>>(and(stringValidator, stringValidator))
expectAssignable<Validator<string | number>>(and(stringOrNumberValidator, stringOrNumberValidator))
expectError<Validator<number>>(and(stringValidator, stringValidator))
