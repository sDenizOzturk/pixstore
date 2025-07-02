import {
  handleErrorSync,
  handleErrorAsync,
  setCustomErrorHandler,
} from '../../../src/shared/handle-error'
import { PixstoreError } from '../../../src/shared/pixstore-error'
import { pixstoreConfig } from '../../../src/shared/pixstore-config'

afterEach(() => {
  // Varsayılan handler ile resetle
  setCustomErrorHandler(undefined)
  pixstoreConfig.errorHandlingMode = 'hybrid'
})

describe('handleErrorSync', () => {
  it('returns value if no error (hybrid)', () => {
    pixstoreConfig.errorHandlingMode = 'hybrid'
    expect(handleErrorSync(() => 123)).toBe(123)
  })

  it('returns null and logs PixstoreError in hybrid mode', () => {
    pixstoreConfig.errorHandlingMode = 'hybrid'
    const error = new PixstoreError('Test')
    const log = jest.spyOn(console, 'warn').mockImplementation(() => {})
    expect(() =>
      handleErrorSync(() => {
        throw error
      }),
    ).not.toThrow()
    expect(
      handleErrorSync(() => {
        throw error
      }),
    ).toBeNull()
    expect(log).toHaveBeenCalledWith(error)
    log.mockRestore()
  })

  it('throws non-PixstoreError in hybrid mode', () => {
    pixstoreConfig.errorHandlingMode = 'hybrid'
    expect(() =>
      handleErrorSync(() => {
        throw new Error('Other')
      }),
    ).toThrow('Other')
  })

  it('logs and returns null in warn mode', () => {
    pixstoreConfig.errorHandlingMode = 'warn'
    const log = jest.spyOn(console, 'warn').mockImplementation(() => {})
    expect(
      handleErrorSync(() => {
        throw new Error('warn')
      }),
    ).toBeNull()
    expect(log).toHaveBeenCalled()
    log.mockRestore()
  })

  it('returns null silently in silent mode', () => {
    pixstoreConfig.errorHandlingMode = 'silent'
    expect(
      handleErrorSync(() => {
        throw new Error('silent')
      }),
    ).toBeNull()
  })

  it('calls custom error handler in custom mode', () => {
    pixstoreConfig.errorHandlingMode = 'custom'
    const handler = jest.fn()
    setCustomErrorHandler(handler)
    expect(
      handleErrorSync(() => {
        throw new Error('custom')
      }),
    ).toBeNull()
    expect(handler).toHaveBeenCalled()
  })

  it('throws if no custom handler set in custom mode', () => {
    pixstoreConfig.errorHandlingMode = 'custom'
    setCustomErrorHandler(undefined)
    expect(() =>
      handleErrorSync(() => {
        throw new Error('custom2')
      }),
    ).toThrow('Custom error handler is not set')
  })

  it('throws in throw mode', () => {
    pixstoreConfig.errorHandlingMode = 'throw'
    expect(() =>
      handleErrorSync(() => {
        throw new Error('throw')
      }),
    ).toThrow('throw')
  })
})

describe('handleErrorAsync', () => {
  it('returns value if no error (hybrid)', async () => {
    pixstoreConfig.errorHandlingMode = 'hybrid'
    await expect(handleErrorAsync(async () => 42)).resolves.toBe(42)
  })

  it('returns null and logs PixstoreError in hybrid mode', async () => {
    pixstoreConfig.errorHandlingMode = 'hybrid'
    const error = new PixstoreError('AsyncTest')
    const log = jest.spyOn(console, 'warn').mockImplementation(() => {})
    await expect(
      handleErrorAsync(async () => {
        throw error
      }),
    ).resolves.toBeNull()
    expect(log).toHaveBeenCalledWith(error)
    log.mockRestore()
  })

  it('throws non-PixstoreError in hybrid mode', async () => {
    pixstoreConfig.errorHandlingMode = 'hybrid'
    await expect(
      handleErrorAsync(async () => {
        throw new Error('OtherAsync')
      }),
    ).rejects.toThrow('OtherAsync')
  })

  it('logs and returns null in warn mode', async () => {
    pixstoreConfig.errorHandlingMode = 'warn'
    const log = jest.spyOn(console, 'warn').mockImplementation(() => {})
    await expect(
      handleErrorAsync(async () => {
        throw new Error('warnAsync')
      }),
    ).resolves.toBeNull()
    expect(log).toHaveBeenCalled()
    log.mockRestore()
  })

  it('returns null silently in silent mode', async () => {
    pixstoreConfig.errorHandlingMode = 'silent'
    await expect(
      handleErrorAsync(async () => {
        throw new Error('silentAsync')
      }),
    ).resolves.toBeNull()
  })

  it('calls custom error handler in custom mode', async () => {
    pixstoreConfig.errorHandlingMode = 'custom'
    const handler = jest.fn()
    setCustomErrorHandler(handler)
    await expect(
      handleErrorAsync(async () => {
        throw new Error('customAsync')
      }),
    ).resolves.toBeNull()
    expect(handler).toHaveBeenCalled()
  })

  it('throws if no custom handler set in custom mode', async () => {
    pixstoreConfig.errorHandlingMode = 'custom'
    setCustomErrorHandler(undefined)
    await expect(
      handleErrorAsync(async () => {
        throw new Error('custom2Async')
      }),
    ).rejects.toThrow('Custom error handler is not set')
  })

  it('throws in throw mode', async () => {
    pixstoreConfig.errorHandlingMode = 'throw'
    await expect(
      handleErrorAsync(async () => {
        throw new Error('throwAsync')
      }),
    ).rejects.toThrow('throwAsync')
  })
})
