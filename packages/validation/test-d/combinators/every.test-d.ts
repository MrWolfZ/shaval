import { every, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringValidator: Validator<string> = undefined!
const numberValidator: Validator<number> = undefined!
const booleanValidator: Validator<boolean> = undefined!

// @ts-expect-error test
every()

expectAssignable<Validator<readonly string[]>>(every(stringValidator))
expectAssignable<Validator<readonly string[]>>(every(stringValidator, stringValidator))
expectAssignable<Validator<readonly number[]>>(every(numberValidator))
expectAssignable<Validator<readonly boolean[]>>(every(booleanValidator))
expectAssignable<Validator<readonly string[]>>(every([stringValidator, stringValidator]))
expectAssignable<Validator<readonly { s: string }[]>>(every({ s: stringValidator }))

expectError<Validator<readonly string[]>>(every(numberValidator))
expectError<Validator<readonly string[]>>(every(stringValidator, numberValidator))
