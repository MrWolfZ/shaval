import { failure } from '@shaval/core'
import type { Parser } from '../parser.js'

/**
 * @public
 */
export function literal<T extends string | number | boolean | symbol>(literalValue: T): Parser<T> {
  return (value) => {
    if (value === literalValue) {
      return value as T
    }

    return failure(value, 'value must be equal to literal value', { literalValue })
  }
}
