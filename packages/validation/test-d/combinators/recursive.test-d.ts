import { every, recursiveValidator, Validator } from '@shaval/validation'
import { expectAssignable } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const stringValidator: Validator<string> = undefined!

interface RecursiveObject {
  s: string
  recArr: RecursiveObject[]
}

expectAssignable<Validator<RecursiveObject>>(
  recursiveValidator<RecursiveObject>((self) => ({ s: stringValidator, recArr: every(self) })),
)
