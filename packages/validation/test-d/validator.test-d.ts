import type { Result } from '@shaval/core'
import { custom, Validator, validator, ValidatorOrShorthand } from '@shaval/validation'
import { expectAssignable, expectError, expectType } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringValidator: Validator<string> = undefined!
const stringArrayValidator: Validator<readonly string[]> = undefined!
const numberValidator: Validator<number> = undefined!
const numberArrayValidator: Validator<readonly number[]> = undefined!
const stringOrNumberValidator: Validator<string | number> = undefined!
const objectValidator: Validator<{ s: string }> = undefined!

expectAssignable<Validator<string>>(stringValidator)
expectError<Validator<number>>(stringValidator)
expectError<Validator<string>>(stringOrNumberValidator)
expectError<Validator<string | number>>(stringValidator)
expectAssignable<Validator<string | number>>((value) =>
  typeof value === 'string' ? stringValidator(value) : numberValidator(value),
)
expectAssignable<Validator<{ s: string }>>(objectValidator)

expectAssignable<Validator<string>>((value) => stringValidator(stringValidator(value)))

expectAssignable<ValidatorOrShorthand<string>>(stringValidator)
expectAssignable<ValidatorOrShorthand<readonly string[]>>(stringArrayValidator)
expectError<ValidatorOrShorthand<readonly string[]>>(numberArrayValidator)
expectError<ValidatorOrShorthand<readonly string[]>>([stringValidator])
expectError<ValidatorOrShorthand<readonly string[]>>([numberValidator])
expectAssignable<ValidatorOrShorthand<{ s: string }>>({ s: stringValidator })
expectAssignable<ValidatorOrShorthand<{ s: string; n: number }>>({ s: stringValidator, n: numberValidator })
expectAssignable<ValidatorOrShorthand<{ s: string; n: number }>>({ s: stringValidator })
expectAssignable<ValidatorOrShorthand<{ s: string; n: number }>>([{ s: stringValidator }, { n: numberValidator }])
expectAssignable<ValidatorOrShorthand<{ s: string | number }>>({ s: stringOrNumberValidator })
expectError<ValidatorOrShorthand<{ s: string | number }>>({ s: stringValidator })
expectError<ValidatorOrShorthand<{ s: string }>>({ s: stringOrNumberValidator })
expectError<ValidatorOrShorthand<{ s: string | null }>>({ s: stringValidator })
expectError<ValidatorOrShorthand<{ arr: string[] | null }>>({ arr: [stringValidator] })
expectError<ValidatorOrShorthand<{ o: { s: string } | null }>>({ o: { s: stringValidator } })

expectType<Validator<string>>(validator(stringValidator))
expectType<Validator<readonly string[]>>(validator(stringArrayValidator))
expectError<Validator<readonly string[]>>(validator(numberArrayValidator))
expectError<Validator<readonly string[]>>(
  validator<string>([stringValidator, stringValidator]),
)
expectError<Validator<readonly string[]>>(
  validator<number>([numberValidator, numberValidator]),
)
expectType<Validator<{ s: string }>>(
  validator<{ s: string }>({ s: stringValidator }),
)
expectType<Validator<{ s: string; n: number }>>(
  validator<{ s: string; n: number }>({ s: stringValidator, n: numberValidator }),
)
expectType<Validator<{ s: string; n: number }>>(
  validator<{ s: string; n: number }>({ s: stringValidator }),
)
expectType<Validator<{ s: string; n: number }>>(
  validator<{ s: string; n: number }>([{ s: stringValidator }, { n: numberValidator }]),
)
expectType<Validator<{ s: string | number }>>(
  validator<{ s: string | number }>({ s: stringOrNumberValidator }),
)
expectError<Validator<{ s: string | number }>>(
  validator<{ s: string | number }>({ s: stringValidator }),
)
expectError<Validator<{ s: string }>>(
  validator<{ s: string }>({ s: stringOrNumberValidator }),
)
expectError<Validator<{ s: string | null }>>(
  validator<{ s: string | null }>({ s: stringValidator }),
)
expectError<Validator<{ arr: string[] | null }>>(
  validator<{ arr: string[] | null }>({ arr: [stringValidator] }),
)
expectError<Validator<{ o: { s: string } | null }>>(
  validator<{ o: { s: string } | null }>({ o: { s: stringValidator } }),
)

expectType<Validator<string>>(custom(stringValidator))
expectType<Validator<string>>(custom<string>((value) => value))
expectType<Validator<readonly string[]>>(custom(stringArrayValidator))
expectType<Validator<readonly string[]>>(custom<readonly string[]>((value) => value))
expectType<Validator<{ s: string }>>(custom(objectValidator))
expectType<Validator<{ s: string }>>(custom<{ s: string }>((value) => value))
expectType<Validator<string | number>>(custom((value: string | number) => value))
expectType<Validator<string | number>>(custom(<T extends string | number>(value: T) => value))

expectAssignable<Result<string>>(custom(<T>(value: T) => value)(''))
expectAssignable<Result<number>>(custom(<T>(value: T) => value)(1))
expectError(custom(<T extends string>(value: T) => value)(1))
