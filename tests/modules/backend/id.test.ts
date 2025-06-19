import { createUniqueId, toFilePath } from '../../../src/backend/id'

import { IMAGE_ROOT_DIR, IMAGE_EXTENSION } from '../../../src/constants'

describe('createUniqueId', () => {
  it('generates a unique ID as a string', () => {
    const id = createUniqueId()
    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
  })

  it('generates different IDs on each call', () => {
    const id1 = createUniqueId()
    const id2 = createUniqueId()
    expect(id1).not.toBe(id2)
  })

  it('adds dir prefix if provided', () => {
    const id = createUniqueId('students')
    expect(id.startsWith('students:')).toBe(true)
  })

  it('cleans dir prefix to only allow a-z, 0-9, dash, underscore', () => {
    const id = createUniqueId(' StUd-ent_!@# ')
    expect(id.startsWith('stud-ent_')).toBe(true)
  })
})

describe('toFilePath', () => {
  it('converts a valid image ID to a canonical file path', () => {
    expect(toFilePath('students:123123')).toBe(
      `${IMAGE_ROOT_DIR}/students/123123${IMAGE_EXTENSION}`,
    )
    expect(toFilePath('photos:abcDEF')).toBe(
      `${IMAGE_ROOT_DIR}/photos/abcDEF${IMAGE_EXTENSION}`,
    )
  })

  it('handles IDs with missing prefix', () => {
    expect(toFilePath(':123')).toBe(`${IMAGE_ROOT_DIR}/:123${IMAGE_EXTENSION}`)
  })

  it('handles IDs with missing key', () => {
    expect(toFilePath('students:')).toBe(
      `${IMAGE_ROOT_DIR}/students:${IMAGE_EXTENSION}`,
    )
  })

  it('handles completely invalid IDs', () => {
    expect(toFilePath('nonsense')).toBe(
      `${IMAGE_ROOT_DIR}/nonsense${IMAGE_EXTENSION}`,
    )
    expect(toFilePath('')).toBe(`${IMAGE_ROOT_DIR}/${IMAGE_EXTENSION}`)
  })
})
