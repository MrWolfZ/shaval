import type { Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringValidator: Validator<string> = undefined!
const numberValidator: Validator<number> = undefined!
const stringOrNumberValidator: Validator<string | number> = undefined!

expectAssignable<Validator<string>>(stringValidator)
expectError<Validator<number>>(stringValidator)
expectError<Validator<string>>(stringOrNumberValidator)
expectError<Validator<string | number>>(stringValidator)
expectAssignable<Validator<string | number>>((value) =>
  typeof value === 'string' ? stringValidator(value) : numberValidator(value),
)
