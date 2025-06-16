import { createUniqueId, toFilePath } from '../../src/backend/id'

beforeAll(async () => {
  await new Promise((res) => setTimeout(res, 50))
})

describe('createUniqueId', () => {
  it('generates a unique ID as a string', async () => {
    const id = await createUniqueId()
    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
  })

  it('generates different IDs on each call', async () => {
    const id1 = await createUniqueId()
    const id2 = await createUniqueId()
    expect(id1).not.toBe(id2)
  })

  it('adds dir prefix if provided', async () => {
    const id = await createUniqueId('students')
    expect(id.startsWith('students:')).toBe(true)
  })

  it('cleans dir prefix to only allow a-z, 0-9, dash, underscore', async () => {
    const id = await createUniqueId(' StUd-ent_!@# ')
    expect(id.startsWith('stud-ent_')).toBe(true)
  })
})

describe('toFilePath', () => {
  it('converts a valid image ID to a canonical file path', () => {
    expect(toFilePath('students:123123')).toBe(
      'pixstore-images/students/123123.webp',
    )
    expect(toFilePath('photos:abcDEF')).toBe(
      'pixstore-images/photos/abcDEF.webp',
    )
  })

  it('handles IDs with missing prefix', () => {
    expect(toFilePath(':123')).toBe('pixstore-images/unknown/:123.webp')
  })

  it('handles IDs with missing key', () => {
    expect(toFilePath('students:')).toBe(
      'pixstore-images/unknown/students:.webp',
    )
  })

  it('handles completely invalid IDs', () => {
    expect(toFilePath('nonsense')).toBe('pixstore-images/unknown/nonsense.webp')
    expect(toFilePath('')).toBe('pixstore-images/unknown/.webp')
  })
})
