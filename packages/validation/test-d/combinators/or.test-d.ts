import { or, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringValidator: Validator<string> = undefined!
const numberValidator: Validator<number> = undefined!
const stringOrNumberValidator: Validator<string | number> = undefined!
const objectValidator: Validator<{ s: string }> = undefined!

// @ts-expect-error test
or()

// @ts-expect-error test
or(stringValidator)

// @ts-expect-error test
or(stringValidator, numberValidator)

expectAssignable<Validator<string>>(or(stringValidator, stringValidator))
expectAssignable<Validator<string>>(or([stringValidator, stringValidator], [stringValidator, stringValidator]))
expectAssignable<Validator<string>>(or(stringValidator, stringValidator, stringValidator))
expectAssignable<Validator<string>>(
  or([stringValidator, stringValidator], [stringValidator, stringValidator], [stringValidator, stringValidator]),
)
expectAssignable<Validator<string | number>>(or(stringOrNumberValidator, stringOrNumberValidator))
expectError<Validator<number>>(or(stringValidator, stringValidator))
expectAssignable<Validator<{ s: string }>>(or(objectValidator, objectValidator))
expectAssignable<Validator<{ s: string }>>(or({ s: stringValidator }, { s: stringValidator }))
expectAssignable<Validator<{ s: string }>>(or({ s: stringValidator }, { s: stringValidator }, { s: stringValidator }))
