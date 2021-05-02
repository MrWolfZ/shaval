const ERROR = Symbol()

/**
 * @public
 */
export interface PropertyErrors {
  readonly path: readonly string[]
  readonly messages: readonly string[]
}

/**
 * @public
 */
export interface ShavalError<T> {
  readonly [ERROR]: undefined
  readonly value: unknown
  readonly errors: readonly (string | PropertyErrors)[]

  /**
   * This property never exists at runtime, it is just a
   * utility to force the type system to handle unions properly
   * (e.g. so that `Parser<string>` is not assignable to
   * `Parser<string | number>` or `Parser<string | undefined>`)
   */
  readonly nullOrUndefined?: undefined extends T ? 'undefined' : null extends T ? 'null' : never
}

/**
 * @public
 */
export type ShavalResult<T> = T | ShavalError<T>

/**
 * @public
 */
export function error<T>(value: unknown, ...errors: readonly (string | PropertyErrors)[]): ShavalError<T> {
  return {
    [ERROR]: undefined,
    value,
    errors,
  }
}

/**
 * @public
 */
export function isSuccess<T>(result: ShavalResult<T>): result is T {
  return !isShavalError(result)
}

/**
 * @public
 */
export function isShavalError<T>(result: ShavalResult<T>): result is ShavalError<T> {
  return typeof result === 'object' && result !== null && ERROR in result
}
