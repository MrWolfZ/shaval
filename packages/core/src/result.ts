const FAILURE = Symbol()

/**
 * @public
 */
export type ErrorMessage = string

/**
 * @public
 */
export interface Errors {
  readonly path: readonly string[]
  readonly value: unknown
  readonly details: Readonly<Record<ErrorMessage, unknown>>
}

/**
 * @public
 */
export interface Failure {
  readonly [FAILURE]: undefined
  readonly errors: readonly Errors[]
}

/**
 * @public
 */
export type Result<T> = T | Failure

/**
 * @public
 */
export function failure(value: unknown, message: ErrorMessage, details?: unknown): Failure

/**
 * @public
 */
export function failure(value: unknown, details: Readonly<Record<ErrorMessage, unknown>>): Failure

/**
 * @public
 */
export function failure(errors: readonly Errors[]): Failure

/**
 * @public
 */
export function failure(arg1: unknown, arg2?: unknown, arg3?: unknown): Failure {
  let errors: readonly Errors[]

  if (arg2 === undefined) {
    errors = mergeErrors(arg1 as readonly Errors[])
  } else if (typeof arg2 === 'string') {
    errors = [{ path: [], value: arg1, details: { [arg2]: arg3 } }]
  } else {
    errors = [{ path: [], value: arg1, details: arg2 as Readonly<Record<ErrorMessage, unknown>> }]
  }

  return {
    [FAILURE]: undefined,
    errors,
  }

  function mergeErrors(errors: readonly Errors[]) {
    return groupBy(errors, (err) => err.value)
      .map((a) => groupBy(a, (err) => err.path.join('.')))
      .reduce((agg, arr) => [...agg, ...arr], [])
      .map((arr) => arr.reduce((agg, a) => ({ ...agg, details: { ...agg.details, ...a.details } })))
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
export function isFailure<T>(result: Result<T>): result is Failure {
  return typeof result === 'object' && result !== null && FAILURE in result
}

function groupBy<T>(items: readonly T[], keySelector: (item: T) => unknown): readonly (readonly T[])[] {
  if (items.length === 1) {
    return [items]
  }

  const errorsByValue = new Map<unknown, T[]>()

  for (const item of items) {
    const key = keySelector(item)
    if (!errorsByValue.has(key)) {
      errorsByValue.set(key, [])
    }

    errorsByValue.get(key)?.push(item)
  }

  return [...errorsByValue.values()]
}
