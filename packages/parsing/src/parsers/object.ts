import type { _ReadonlyObject } from '@shaval/core'
import type { Parser } from '../parser.js'

/**
 * @public
 */
export type ObjectParsingConfig<T extends _ReadonlyObject> = {
  readonly [prop in keyof T]: Parser<T[prop]>
}

/**
 * @public
 */
export function object<T extends _ReadonlyObject>(config: ObjectParsingConfig<T>): Parser<T> {
  config

  return (value: unknown) => {
    // TODO
    return value as T
  }
}
