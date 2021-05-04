import type { Result } from '@shaval/core'
import { expectAssignable } from 'tsd'

expectAssignable<Result<string>>('')
