import type { Result } from '@shaval/core'

/**
 * @public
 */
export type Validator<T> = (value: T) => Result<T>
