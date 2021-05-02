import type { Validator } from '@shaval/validation'

interface Todo {
  readonly id: string
  readonly description: string
  readonly isDone: boolean
}

const todo: Todo = {
  id: 'todo1',
  description: 'groceries',
  isDone: false,
}

const validator: Validator<Todo> = (value) => value as Todo

console.log(validator(todo))
