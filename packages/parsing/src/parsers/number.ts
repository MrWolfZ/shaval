import { failure } from '@shaval/core'
import type { Parser } from '../parser.js'

/**
 * @public
 */
export const number: Parser<number> = (value) => {
  if (typeof value === 'number') {
    return value
  }

  return failure(value, 'value must be a number')
}
