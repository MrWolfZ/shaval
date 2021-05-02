import { error } from './result.js'

describe(error.name, () => {
  it('creates an error with the given messages', () => {
    const value = 'invalid value'
    const message = 'validation error'
    const err = error(value, message)

    expect(err.value).toBe(value)
    expect(err.errors).toContain(message)
    expect(err.nullOrUndefined).toBeUndefined()
  })
})
