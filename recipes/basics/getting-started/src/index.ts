import { isFailure } from '@shaval/core'
import { boolean, number, object, optional, string } from '@shaval/parsing'
import { greaterThan, objectValidator } from '@shaval/validation'

interface Todo {
  readonly id: string
  readonly description: string
  readonly isDone?: boolean
  readonly timesCompleted: number
}

const todo: Todo = {
  id: 'todo1',
  description: 'groceries',
  isDone: false,
  timesCompleted: 0,
}

const parser = object<Todo>({
  id: string,
  description: string,
  isDone: optional(boolean),
  timesCompleted: number,
})

const validator = objectValidator<Todo>({
  timesCompleted: greaterThan(-1),
})

const result = validator(parser(todo))

console.log(`is failure: ${isFailure(result)}; result: ${result}`)
