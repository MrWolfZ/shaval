import { failure } from '@shaval/core'
import type { Parser } from '../parser.js'

/**
 * @public
 */
export const boolean: Parser<boolean> = (value) => {
  if (typeof value === 'boolean') {
    return value
  }

  return failure(value, 'value must be a boolean')
}
