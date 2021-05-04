import { error, isFailure, isSuccess, PropertyErrors } from './result.js'

describe(error.name, () => {
  it('creates an error with a single string message', () => {
    const value = 'invalid value'
    const message = 'validation error'
    const err = error(value, message)

    expect(err.value).toBe(value)
    expect(err.errors).toEqual([message])
    expect(err.nullOrUndefined).toBeUndefined()
  })

  it('creates an error with multiple string messages', () => {
    const value = 'invalid value'
    const message1 = 'validation error 1'
    const message2 = 'validation error 2'
    const err = error(value, message1, message2)

    expect(err.value).toBe(value)
    expect(err.errors).toEqual([message1, message2])
    expect(err.nullOrUndefined).toBeUndefined()
  })

  it('creates an error with a single property error', () => {
    const value = 'invalid value'
    const propError: PropertyErrors = { path: ['prop'], messages: ['validation error'] }
    const err = error(value, propError)

    expect(err.value).toBe(value)
    expect(err.errors).toEqual([propError])
    expect(err.nullOrUndefined).toBeUndefined()
  })

  it('creates an error with multiple property errors', () => {
    const value = 'invalid value'
    const propError1: PropertyErrors = { path: ['prop1'], messages: ['validation error 1'] }
    const propError2: PropertyErrors = { path: ['prop2'], messages: ['validation error 2'] }
    const err = error(value, propError1, propError2)

    expect(err.value).toBe(value)
    expect(err.errors).toEqual([propError1, propError2])
    expect(err.nullOrUndefined).toBeUndefined()
  })

  it('creates an error with mixed string message and property error', () => {
    const value = 'invalid value'
    const message = 'validation error 1'
    const propError: PropertyErrors = { path: ['prop'], messages: ['validation error 2'] }
    const err = error(value, message, propError)

    expect(err.value).toBe(value)
    expect(err.errors).toEqual([message, propError])
    expect(err.nullOrUndefined).toBeUndefined()
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
    expect(isSuccess(error('', ''))).toBe(false)
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
    expect(isFailure(error('', ''))).toBe(true)
  })
})
