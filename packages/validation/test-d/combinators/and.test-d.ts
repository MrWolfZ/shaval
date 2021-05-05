import { and, AndValidatorShorthand, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringValidator: Validator<string> = undefined!
const numberValidator: Validator<number> = undefined!
const stringOrNumberValidator: Validator<string | number> = undefined!
const stringOrNullValidator: Validator<string | null> = undefined!
const stringArrayValidator: Validator<readonly string[]> = undefined!
const numberArrayValidator: Validator<readonly number[]> = undefined!

// @ts-expect-error test
and()

// @ts-expect-error test
and(stringValidator)

expectAssignable<Validator<string>>(and(stringValidator, stringValidator))
expectAssignable<Validator<string | number>>(and(stringOrNumberValidator, stringOrNumberValidator))
expectError<Validator<number>>(and(stringValidator, stringValidator))
expectError<Validator<string | number>>(and(stringValidator, numberValidator))
expectAssignable<Validator<string & number>>(and(stringValidator, numberValidator))

const objectValidator1: Validator<{ s: string }> = undefined!
const objectValidator2: Validator<{ n: number }> = undefined!
expectAssignable<Validator<{ s: string } & { n: number }>>(and(objectValidator1, objectValidator2))

expectError<AndValidatorShorthand<string>>([stringValidator])
expectAssignable<AndValidatorShorthand<string>>([stringValidator, stringValidator])
expectError<AndValidatorShorthand<string | null>>([stringOrNullValidator, stringValidator])
expectError<AndValidatorShorthand<string>>([stringValidator, numberValidator])
expectAssignable<AndValidatorShorthand<readonly string[]>>([stringArrayValidator, stringArrayValidator])
expectError<AndValidatorShorthand<string[]>>(stringValidator)
expectError<AndValidatorShorthand<readonly string[]>>([stringArrayValidator, numberArrayValidator])
expectAssignable<AndValidatorShorthand<{ s: string }>>([{ s: stringValidator }, { s: stringValidator }])
expectError<AndValidatorShorthand<{ s: string } | null>>([() => null, { s: stringValidator }])
expectAssignable<AndValidatorShorthand<{ s: string; n: number }>>([
  { s: stringValidator, n: numberValidator },
  { s: stringValidator, n: numberValidator },
])
expectAssignable<AndValidatorShorthand<{ s: string; n: number }>>([{ s: stringValidator }, { s: stringValidator }])
expectError<AndValidatorShorthand<{ s: string; n: number }>>({ s: stringValidator })
expectAssignable<AndValidatorShorthand<{ s: string | number }>>([
  { s: stringOrNumberValidator },
  { s: stringOrNumberValidator },
])
