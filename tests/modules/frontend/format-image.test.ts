import { formatEncodedImage } from '../../../src/frontend/format-image'
import { encodeImagePayload } from '../../../src/shared/image-encoder'

describe('formatEncodedImage', () => {
  it('decodes valid encoded payload and returns a FrontendImageRecord', () => {
    // Dummy data: png, token=42, buffer=[1,2,3]
    const payload = encodeImagePayload({
      imageFormat: 'png',
      token: 42,
      buffer: new Uint8Array([1, 2, 3]),
    })
    const id = 'test-id'
    const record = formatEncodedImage(id, payload)

    expect(record.id).toBe(id)
    expect(record.token).toBe(42)
    expect(record.data).toBeInstanceOf(Blob)
    expect(record.data.type).toBe('image/png')
    expect(record.lastUsed).toBeGreaterThan(0)
  })

  it('throws for unsupported image format', () => {
    const fakePayload = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 1])

    expect(() => formatEncodedImage('bad-id', fakePayload)).toThrow(
      'Unknown image format byte: 0',
    )
  })
})
