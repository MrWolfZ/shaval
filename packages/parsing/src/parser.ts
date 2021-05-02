import type { ShavalResult } from '@shaval/core'

/**
 * @public
 */
export type Parser<T> = (value: unknown) => ShavalResult<T>
