import { error } from '@shaval/core'
import type { Parser } from '../parser.js'

/**
 * @public
 */
export const string: Parser<string> = (value) => {
  if (typeof value === 'string') {
    return value
  }

  return error(value, 'value is not a string')
}
