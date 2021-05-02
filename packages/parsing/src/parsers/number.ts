import { error } from '@shaval/core'
import type { Parser } from '../parser.js'

/**
 * @public
 */
export const number: Parser<number> = (value) => {
  if (typeof value === 'number') {
    return value
  }

  return error(value, 'value is not a number')
}
