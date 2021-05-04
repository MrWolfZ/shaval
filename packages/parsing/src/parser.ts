import type { Result } from '@shaval/core'

/**
 * Helper interface to force the type system to handle unions
 * properly (e.g. so that `Parser<string>` is not assignable to
 * `Parser<string | number>` or `Parser<string | undefined>`)
 *
 * @public
 */
export interface _ResultTypeMarker<T> {
  /**
   * This property never exists at runtime.
   */
  readonly nullOrUndefined?: undefined extends T ? 'undefined' : null extends T ? 'null' : never
}

/**
 * @public
 */
export type ParserResult<T> = Result<T> & _ResultTypeMarker<T>

/**
 * @public
 */
export type Parser<T> = (value: unknown) => ParserResult<T>
