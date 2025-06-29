import '../../utils/frontend-crypto-polyfill'

import { decryptImage } from '../../../src/frontend/image-decryption.js'
import { encryptImage } from '../../../src/backend/image-encryption.js'
import fs from 'fs'
import path from 'path'
import {
  AES_GCM_TAG_LENGTH,
  FRONTEND_AES_ALGORITHM,
} from '../../../src/shared/constants.js'
import {
  byteToImageFormat,
  imageFormatToByte,
} from '../../../src/shared/format-image.js'

import { arrayBufferToBase64 } from '../../../src/shared/format-buffer.js'

// Isolated decryption test (pure frontend)
test('decryptImage returns original buffer and format', async () => {
  const format = imageFormatToByte('png')
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

  const result = await decryptImage(ciphertext, {
    key: arrayBufferToBase64(key.buffer),
    iv: arrayBufferToBase64(iv.buffer),
    tag: arrayBufferToBase64(tag.buffer),
  })
  expect(result.format).toBe(byteToImageFormat(format))
  expect(Array.from(result.buffer)).toEqual(Array.from(original.slice(1)))
})

// Backend encrypt, frontend decrypt (compatibility test)
test('backend encrypt, frontend decrypt (e2e)', async () => {
  const testImagePath = path.join(__dirname, '../../assets/antalya.jpg')
  const buffer = fs.readFileSync(testImagePath)

  const { encrypted, meta } = encryptImage(buffer)

  const result = await decryptImage(encrypted, {
    key: meta.key,
    iv: meta.iv,
    tag: meta.tag,
  })
  expect(result.format).toBe('jpg')
  expect(Buffer.from(result.buffer).equals(buffer)).toBe(true)
})
