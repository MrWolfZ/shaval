import type { Validator } from '@shaval/validation'
import { expectAssignable, expectError } from 'tsd'

expectAssignable<Validator<string>>((value) => value)
expectError<Validator<string | number>>(undefined! as Validator<string>)
