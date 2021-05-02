import type { Parser } from '@shaval/parsing'
import { expectAssignable } from 'tsd'

expectAssignable<Parser<string>>((value) => value as string)
