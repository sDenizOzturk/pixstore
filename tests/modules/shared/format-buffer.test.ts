import {
  arrayBufferToBase64,
  base64ToArrayBuffer,
} from '../../../src/shared/format-buffer.js'

describe('format-buffer', () => {
  it('arrayBufferToBase64 <-> base64ToArrayBuffer is reversible', () => {
    const original = new Uint8Array([1, 2, 3, 4, 255, 0, 127, 128])
    const base64 = arrayBufferToBase64(original)
    const restored = new Uint8Array(base64ToArrayBuffer(base64))
    expect(restored).toEqual(original)
  })
})
