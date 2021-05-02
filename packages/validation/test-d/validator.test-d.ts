import type { Validator } from '@shaval/validation'
import { expectAssignable } from 'tsd'

expectAssignable<Validator<string>>((value) => value)
