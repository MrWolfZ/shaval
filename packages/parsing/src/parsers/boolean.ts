import { error } from '@shaval/core'
import type { Parser } from '../parser.js'

/**
 * @public
 */
export const boolean: Parser<boolean> = (value) => {
  if (typeof value === 'boolean') {
    return value
  }

  return error(value, 'value is not a boolean')
}
