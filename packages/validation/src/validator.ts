import type { Failure, Result } from '@shaval/core'

/**
 * @public
 */
export type Validator<T> = (value: T | Failure) => Result<T>
