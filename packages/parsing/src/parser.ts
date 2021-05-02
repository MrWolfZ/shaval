import type { Result } from '@shaval/core'

/**
 * @public
 */
export type Parser<T> = (value: unknown) => Result<T>
