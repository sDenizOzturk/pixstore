import {
  FRONTEND_AES_ALGORITHM,
  AES_GCM_TAG_LENGTH,
} from '../shared/constants.js'
import type { EncryptedImagePayload } from '../types/encrypted-image-payload.js'
import type { DecodedImagePayload } from '../types/decoded-image-payload.js'

/**
 * Decrypts an EncryptedImagePayload using the Web Crypto API.
 * Returns a DecodedImagePayload ({ format, buffer }).
 */
export const decryptImage = async (
  payload: EncryptedImagePayload,
): Promise<DecodedImagePayload> => {
  const { encrypted, meta } = payload

  // 1) Import the raw AES key
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    meta.key,
    { name: FRONTEND_AES_ALGORITHM },
    false,
    ['decrypt'],
  )

  // 2) Re-concatenate ciphertext + GCM tag
  const ct = new Uint8Array(encrypted)
  const tag = new Uint8Array(meta.tag)
  const combined = new Uint8Array(ct.byteLength + tag.byteLength)
  combined.set(ct, 0)
  combined.set(tag, ct.byteLength)

  // 3) Decrypt the combined buffer
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: FRONTEND_AES_ALGORITHM,
      iv: meta.iv,
      tagLength: AES_GCM_TAG_LENGTH,
    },
    cryptoKey,
    combined.buffer,
  )

  // 4) Peel off the first byte as format, rest is the image data
  const bytes = new Uint8Array(decrypted)
  return {
    format: bytes[0],
    buffer: bytes.slice(1),
  }
}
