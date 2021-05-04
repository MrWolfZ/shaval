const FAILURE = Symbol()

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
export interface Failure<T> {
  readonly [FAILURE]: undefined
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
export type Result<T> = T | Failure<T>

/**
 * @public
 */
export function error<T>(value: unknown, ...errors: readonly (string | PropertyErrors)[]): Failure<T> {
  return {
    [FAILURE]: undefined,
    value,
    errors,
  }
}

/**
 * @public
 */
export function isSuccess<T>(result: Result<T>): result is T {
  return !isFailure(result)
}

/**
 * @public
 */
export function isFailure<T>(result: Result<T>): result is Failure<T> {
  return typeof result === 'object' && result !== null && FAILURE in result
}
