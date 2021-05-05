import type { Validator, ValidatorOrShorthand } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringValidator: Validator<string> = undefined!
const stringArrayValidator: Validator<readonly string[]> = undefined!
const numberValidator: Validator<number> = undefined!
const numberArrayValidator: Validator<readonly number[]> = undefined!
const stringOrNumberValidator: Validator<string | number> = undefined!

expectAssignable<Validator<string>>(stringValidator)
expectError<Validator<number>>(stringValidator)
expectError<Validator<string>>(stringOrNumberValidator)
expectError<Validator<string | number>>(stringValidator)
expectAssignable<Validator<string | number>>((value) =>
  typeof value === 'string' ? stringValidator(value) : numberValidator(value),
)

expectAssignable<Validator<string>>((value) => stringValidator(stringValidator(value)))

expectAssignable<ValidatorOrShorthand<string>>(stringValidator)
expectAssignable<ValidatorOrShorthand<readonly string[]>>(stringArrayValidator)
expectError<ValidatorOrShorthand<readonly string[]>>(numberArrayValidator)
expectError<ValidatorOrShorthand<readonly string[]>>([stringValidator])
expectError<ValidatorOrShorthand<readonly string[]>>([numberValidator])
expectAssignable<ValidatorOrShorthand<{ s: string }>>({ s: stringValidator })
expectAssignable<ValidatorOrShorthand<{ s: string; n: number }>>({ s: stringValidator, n: numberValidator })
expectAssignable<ValidatorOrShorthand<{ s: string; n: number }>>({ s: stringValidator })
expectAssignable<ValidatorOrShorthand<{ s: string | number }>>({ s: stringOrNumberValidator })
expectError<ValidatorOrShorthand<{ s: string | null }>>({ s: stringValidator })
expectError<ValidatorOrShorthand<{ arr: string[] | null }>>({ arr: [stringValidator] })
expectError<ValidatorOrShorthand<{ o: { s: string } | null }>>({ o: { s: stringValidator } })
