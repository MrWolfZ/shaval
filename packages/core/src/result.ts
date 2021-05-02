/**
 * @public
 */
export interface ShavalError<T> {
  readonly prop?: T
}

/**
 * @public
 */
export type Result<T> = T | ShavalError<T>
