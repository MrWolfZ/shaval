import { Errors, failure, isFailure, isSuccess } from './result.js'

describe(failure.name, () => {
  it('creates a failure with a message', () => {
    const value = 'invalid value'
    const message = 'validation error'
    const err = failure(value, message)

    expect(err.errors).toHaveLength(1)
    expect(err.errors[0]?.path).toEqual([])
    expect(err.errors[0]?.value).toBe(value)
    expect(err.errors[0]?.details).toEqual({ [message]: undefined })
  })

  it('creates a failure with a message and details', () => {
    const value = 'invalid value'
    const message = 'validation error'
    const details = { s: 'a' }
    const err = failure(value, message, details)

    expect(err.errors).toHaveLength(1)
    expect(err.errors[0]?.path).toEqual([])
    expect(err.errors[0]?.value).toBe(value)
    expect(err.errors[0]?.details).toEqual({ [message]: details })
  })

  it('creates a failure with multiple messages', () => {
    const value = 'invalid value'
    const message1 = 'validation error 1'
    const details1 = { a: 'a' }
    const message2 = 'validation error 2'
    const details2 = { b: 'b' }
    const details = { [message1]: details1, [message2]: details2 }
    const err = failure(value, details)

    expect(err.errors).toHaveLength(1)
    expect(err.errors[0]?.path).toEqual([])
    expect(err.errors[0]?.value).toBe(value)
    expect(err.errors[0]?.details).toBe(details)
  })

  it('creates a failure with a single property error', () => {
    const value = 'invalid value'
    const message = 'validation error'
    const details = { [message]: { s: 'a' } }
    const path = ['prop']
    const propError: Errors = { path, value, details }
    const err = failure([propError])

    expect(err.errors).toHaveLength(1)
    expect(err.errors[0]?.path).toBe(path)
    expect(err.errors[0]?.value).toBe(value)
    expect(err.errors[0]?.details).toBe(details)
  })

  it('creates a failure with multiple property errors', () => {
    const value1 = 'invalid value 1'
    const value2 = 'invalid value 2'
    const message1 = 'validation error 1'
    const message2 = 'validation error 2'
    const details1 = { [message1]: { a: 'a' } }
    const details2 = { [message2]: { b: 'b' } }
    const path1 = ['prop1']
    const path2 = ['prop2']
    const propError1: Errors = { path: path1, value: value1, details: details1 }
    const propError2: Errors = { path: path2, value: value2, details: details2 }
    const err = failure([propError1, propError2])

    expect(err.errors).toHaveLength(2)
    expect(err.errors[0]?.path).toBe(path1)
    expect(err.errors[0]?.value).toBe(value1)
    expect(err.errors[0]?.details).toBe(details1)
    expect(err.errors[1]?.path).toBe(path2)
    expect(err.errors[1]?.value).toBe(value2)
    expect(err.errors[1]?.details).toBe(details2)
  })

  it('creates a failure with multiple property errors with same path but different value (which should never happen)', () => {
    const value1 = 'invalid value 1'
    const value2 = 'invalid value 2'
    const message1 = 'validation error 1'
    const message2 = 'validation error 2'
    const details1 = { [message1]: { a: 'a' } }
    const details2 = { [message2]: { b: 'b' } }
    const path = ['prop']
    const propError1: Errors = { path, value: value1, details: details1 }
    const propError2: Errors = { path, value: value2, details: details2 }
    const err = failure([propError1, propError2])

    expect(err.errors).toHaveLength(2)
    expect(err.errors[0]?.path).toBe(path)
    expect(err.errors[0]?.value).toBe(value1)
    expect(err.errors[0]?.details).toBe(details1)
    expect(err.errors[1]?.path).toBe(path)
    expect(err.errors[1]?.value).toBe(value2)
    expect(err.errors[1]?.details).toBe(details2)
  })

  it('creates a failure with multiple property errors with same value but different path', () => {
    const value = 'invalid value'
    const message1 = 'validation error 1'
    const message2 = 'validation error 2'
    const details1 = { [message1]: { a: 'a' } }
    const details2 = { [message2]: { b: 'b' } }
    const path1 = ['prop1']
    const path2 = ['prop2']
    const propError1: Errors = { path: path1, value, details: details1 }
    const propError2: Errors = { path: path2, value, details: details2 }
    const err = failure([propError1, propError2])

    expect(err.errors).toHaveLength(2)
    expect(err.errors[0]?.path).toBe(path1)
    expect(err.errors[0]?.value).toBe(value)
    expect(err.errors[0]?.details).toBe(details1)
    expect(err.errors[1]?.path).toBe(path2)
    expect(err.errors[1]?.value).toBe(value)
    expect(err.errors[1]?.details).toBe(details2)
  })

  it('merges errors for same path and value', () => {
    const value = 'invalid value'
    const message1 = 'validation error 1'
    const message2 = 'validation error 2'
    const details1 = { [message1]: { a: 'a' } }
    const details2 = { [message2]: { b: 'b' } }
    const path = ['prop']
    const propError1: Errors = { path, value, details: details1 }
    const propError2: Errors = { path, value, details: details2 }
    const err = failure([propError1, propError2])

    expect(err.errors).toHaveLength(1)
    expect(err.errors[0]?.path).toBe(path)
    expect(err.errors[0]?.value).toBe(value)
    expect(err.errors[0]?.details).toEqual({ ...details1, ...details2 })
  })

  it('creates a failure with no property errors', () => {
    expect(failure([]).errors).toHaveLength(0)
  })
})

describe(isSuccess.name, () => {
  it('returns true for any non-error value', () => {
    expect(isSuccess(undefined)).toBe(true)
    expect(isSuccess(null)).toBe(true)
    expect(isSuccess('')).toBe(true)
    expect(isSuccess('a')).toBe(true)
    expect(isSuccess(true)).toBe(true)
    expect(isSuccess(false)).toBe(true)
    expect(isSuccess(0)).toBe(true)
    expect(isSuccess(-1)).toBe(true)
    expect(isSuccess(1)).toBe(true)
    expect(isSuccess(['a'])).toBe(true)
    expect(isSuccess({ s: 'a' })).toBe(true)
    expect(isSuccess(Symbol())).toBe(true)
  })

  it('returns false for error value', () => {
    expect(isSuccess(failure('', ''))).toBe(false)
  })
})

describe(isFailure.name, () => {
  it('returns false for any non-error value', () => {
    expect(isFailure(undefined)).toBe(false)
    expect(isFailure(null)).toBe(false)
    expect(isFailure('')).toBe(false)
    expect(isFailure('a')).toBe(false)
    expect(isFailure(true)).toBe(false)
    expect(isFailure(false)).toBe(false)
    expect(isFailure(0)).toBe(false)
    expect(isFailure(-1)).toBe(false)
    expect(isFailure(1)).toBe(false)
    expect(isFailure(['a'])).toBe(false)
    expect(isFailure({ s: 'a' })).toBe(false)
    expect(isFailure(Symbol())).toBe(false)
  })

  it('returns true for error value', () => {
    expect(isFailure(failure('', ''))).toBe(true)
  })
})
