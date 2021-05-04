import type { Parser } from '@shaval/parsing'
import { expectAssignable, expectError } from 'tsd'

/* eslint-disable @typescript-eslint/no-non-null-assertion */

expectAssignable<Parser<string>>((value) => value as string)
expectError<Parser<string | number>>(undefined! as Parser<string>)
