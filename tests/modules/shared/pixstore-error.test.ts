import { PixstoreError } from '../../../src/shared/pixstore-error.js'

describe('PixstoreError', () => {
  it('should be an instance of Error and PixstoreError', () => {
    const err = new PixstoreError('Custom error message')
    expect(err).toBeInstanceOf(PixstoreError)
    expect(err).toBeInstanceOf(Error)
    expect(err.name).toBe('PixstoreError')
    expect(err.message).toBe('Custom error message')
  })

  it('should be identified by instanceof in try/catch', () => {
    try {
      throw new PixstoreError('Test throw')
    } catch (e) {
      if (e instanceof PixstoreError) {
        expect(e).toBeInstanceOf(PixstoreError)
        expect(e).toBeInstanceOf(Error)
        expect(e.name).toBe('PixstoreError')
        expect(e.message).toBe('Test throw')
      } else {
        throw e // Unexpected error type
      }
    }
  })
})
