import type { ShavalResult } from '@shaval/core'

/**
 * @public
 */
export type Validator<T> = (value: T) => ShavalResult<T>
