// this file contains a end-to-end tests for the public API

import type { Validator } from '@shaval/validation'

describe(`@shaval/core`, () => {
  interface Todo {
    readonly id: string
    readonly description: string
    readonly isDone: boolean
  }

  it('works', () => {
    const validator: Validator<Todo> = (value) => value

    expect(validator).toBeDefined()
  })
})
