import { some, Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringValidator: Validator<string> = undefined!
const numberValidator: Validator<number> = undefined!
const booleanValidator: Validator<boolean> = undefined!

// @ts-expect-error test
some()

expectAssignable<Validator<readonly string[]>>(some(stringValidator))
expectAssignable<Validator<readonly string[]>>(some(stringValidator, stringValidator))
expectAssignable<Validator<readonly number[]>>(some(numberValidator))
expectAssignable<Validator<readonly boolean[]>>(some(booleanValidator))
expectAssignable<Validator<readonly string[]>>(some([stringValidator, stringValidator]))
expectAssignable<Validator<readonly { s: string }[]>>(some({ s: stringValidator }))

expectError<Validator<readonly string[]>>(some(numberValidator))
expectError<Validator<readonly string[]>>(some(stringValidator, numberValidator))
