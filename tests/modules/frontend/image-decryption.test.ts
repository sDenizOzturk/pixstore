import '../../utils/frontend-crypto-polyfill'

import { decryptImage } from '../../../src/frontend/image-decryption'
import { encryptImage } from '../../../src/backend/image-encryption'
import fs from 'fs'
import path from 'path'
import type { EncryptedImagePayload } from '../../../src/types/encrypted-image-payload'
import {
  AES_GCM_TAG_LENGTH,
  FRONTEND_AES_ALGORITHM,
} from '../../../src/shared/constants'

const toArrayBuffer = (buffer: Buffer): ArrayBuffer =>
  buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer

// Isolated decryption test (pure frontend)
test('decryptImage returns original buffer and format', async () => {
  const format = 1
  const original = new Uint8Array([format, 9, 8, 7, 6])
  const key = window.crypto.getRandomValues(new Uint8Array(32))
  const iv = window.crypto.getRandomValues(new Uint8Array(12))
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    key,
    { name: FRONTEND_AES_ALGORITHM },
    false,
    ['encrypt', 'decrypt'],
  )
  const encrypted = await window.crypto.subtle.encrypt(
    { name: FRONTEND_AES_ALGORITHM, iv, tagLength: AES_GCM_TAG_LENGTH },
    cryptoKey,
    original,
  )
  const encryptedBytes = new Uint8Array(encrypted)
  const tag = encryptedBytes.slice(-16)
  const ciphertext = encryptedBytes.slice(0, -16)

  const payload: EncryptedImagePayload = {
    encrypted: ciphertext.buffer,
    meta: { key: key.buffer, iv: iv.buffer, tag: tag.buffer },
  }

  const result = await decryptImage(payload)
  expect(result.format).toBe(format)
  expect(Array.from(result.buffer)).toEqual(Array.from(original.slice(1)))
})

// Backend encrypt, frontend decrypt (compatibility test)
test('backend encrypt, frontend decrypt (e2e)', async () => {
  const testImagePath = path.join(__dirname, '../../assets/antalya.jpg')
  const buffer = fs.readFileSync(testImagePath)
  const format = 2
  const { encryptedImage, imageEncryptionMeta } = encryptImage(format, buffer)

  const payload: EncryptedImagePayload = {
    encrypted: toArrayBuffer(encryptedImage),
    meta: {
      key: toArrayBuffer(imageEncryptionMeta.key),
      iv: toArrayBuffer(imageEncryptionMeta.iv),
      tag: toArrayBuffer(imageEncryptionMeta.tag),
    },
  }

  const result = await decryptImage(payload)
  expect(result.format).toBe(format)
  expect(Buffer.from(result.buffer).equals(buffer)).toBe(true)
})
