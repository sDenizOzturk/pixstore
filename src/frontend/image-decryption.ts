import {
  FRONTEND_AES_ALGORITHM,
  AES_GCM_TAG_LENGTH,
} from '../shared/constants.js'
import type { EncryptedImagePayload } from '../types/encrypted-image-payload.js'
import type { DecryptedImagePayload } from '../types/decrypted-image-payload.js'
import { byteToImageFormat } from '../shared/format-image.js'
import { base64ToArrayBuffer } from '../shared/format-buffer.js'

/**
 * Decrypts an EncryptedImagePayload using the Web Crypto API.
 * Returns a DecryptedImagePayload ({ format, buffer }).
 */
export const decryptImage = async (
  payload: EncryptedImagePayload,
): Promise<DecryptedImagePayload> => {
  const { encrypted, meta } = payload

  // Convert meta fields from base64 string to ArrayBuffer
  const key = base64ToArrayBuffer(meta.key)
  const iv = base64ToArrayBuffer(meta.iv)
  const tag = base64ToArrayBuffer(meta.tag)

  // 1) Import the raw AES key
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    key,
    { name: FRONTEND_AES_ALGORITHM },
    false,
    ['decrypt'],
  )

  // 2) Re-concatenate ciphertext + GCM tag
  const ct = new Uint8Array(encrypted)
  const tagBytes = new Uint8Array(tag)
  const combined = new Uint8Array(ct.byteLength + tagBytes.byteLength)
  combined.set(ct, 0)
  combined.set(tagBytes, ct.byteLength)

  // 3) Decrypt the combined buffer
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: FRONTEND_AES_ALGORITHM,
      iv: iv,
      tagLength: AES_GCM_TAG_LENGTH,
    },
    cryptoKey,
    combined.buffer,
  )

  // 4) Peel off the first byte as format, rest is the image data
  const bytes = new Uint8Array(decrypted)
  return {
    format: byteToImageFormat(bytes[0]),
    buffer: bytes.slice(1),
  }
}
