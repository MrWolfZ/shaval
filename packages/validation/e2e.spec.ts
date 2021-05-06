// this file contains a end-to-end tests for the public API

import { failure } from '@shaval/core'
import { and, every, required, validator } from '@shaval/validation'
import { allowUndefined } from './src/combinators/allow-undefined.js'
import type { Validator } from './src/validator.js'

describe(`@shaval/core`, () => {
  interface Todo {
    readonly id: string
    readonly description: string
    readonly isDone: boolean
    readonly remarks: readonly string[]
    readonly details?: {
      readonly author: string
    }
  }

  const todo: Todo = {
    id: '1',
    description: 'groceries',
    isDone: false,
    remarks: ['too lazy'],
    details: {
      author: 'me',
    },
  }

  it('works', () => {
    const nonEmptyStringValidator: Validator<string> = (value) =>
      typeof value === 'string' && value.length > 0 ? value : failure(value, '')

    const todoValidator = validator<Todo>({
      id: [required, nonEmptyStringValidator],
      remarks: every(nonEmptyStringValidator, nonEmptyStringValidator),
      details: allowUndefined([
        {
          author: nonEmptyStringValidator,
        },
        {
          author: nonEmptyStringValidator,
        },
      ]),
    })

    const todoValidatorWithoutShorthands = validator<Todo>({
      id: and(required, nonEmptyStringValidator),
      remarks: every(nonEmptyStringValidator, nonEmptyStringValidator),
      details: allowUndefined(
        and(
          {
            author: nonEmptyStringValidator,
          },
          {
            author: nonEmptyStringValidator,
          },
        ),
      ),
    })

    expect(todoValidator(todo)).toEqual(todo)
    expect(todoValidatorWithoutShorthands(todo)).toEqual(todo)
  })
})
