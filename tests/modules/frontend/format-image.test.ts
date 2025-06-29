import { decryptedPayloadToBlob } from '../../../src/frontend/format-image'
import type { DecryptedImagePayload } from '../../../src/types/image-payload.js'
import { ImageFormat } from '../../../src/types/image-format.js'

// Helper to create a dummy DecryptedImagePayload
const createPayload = (
  format: ImageFormat,
  data: number[],
): DecryptedImagePayload => ({
  format,
  buffer: new Uint8Array(data),
})

describe('decryptedPayloadToBlob', () => {
  it('returns a Blob with the correct MIME type for a supported format', () => {
    const payload = createPayload('png', [1, 2, 3])
    const blob = decryptedPayloadToBlob(payload)
    expect(blob).toBeInstanceOf(Blob)
    expect(blob.type).toBe('image/png')
  })

  it('throws an error for an unsupported image format', () => {
    const payload = createPayload('bmp', [1, 2, 3])
    expect(() => decryptedPayloadToBlob(payload)).toThrow(
      'Unsupported image format: bmp',
    )
  })
})
