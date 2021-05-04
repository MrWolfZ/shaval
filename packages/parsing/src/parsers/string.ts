import { failure } from '@shaval/core'
import type { Parser } from '../parser.js'

/**
 * @public
 */
export const string: Parser<string> = (value) => {
  if (typeof value === 'string') {
    return value
  }

  return failure(value, 'value must be a string')
}
