import path from 'path'
import {
  getImage,
  deleteImage,
  saveImage,
  updateImage,
} from '../../src/backend/image-service'
import fs from 'fs'

const assetsDir = path.resolve(__dirname, '../assets')
const imageFile = path.join(assetsDir, 'antalya.jpg')
const imageFile2 = path.join(assetsDir, 'vilnius.jpg')
const N = 100

describe('Pixstore backend highload scenario', () => {
  const prefix = 'stress'
  const ids: string[] = []

  it('should save a large number of images', async () => {
    const buffer = fs.readFileSync(imageFile)

    for (let i = 0; i < N; ++i) {
      const record = await saveImage(buffer, prefix)
      ids.push(record.id)
    }
  })

  it('should read all images', async () => {
    for (const id of ids) {
      const { buffer } = await getImage(id)
      expect(buffer.length).toBeGreaterThan(0)
    }
  })

  it('should update all images', async () => {
    const buffer2 = fs.readFileSync(imageFile2)
    for (const id of ids) {
      await updateImage(id, buffer2, prefix)
      const { buffer } = await getImage(id)
      expect(buffer.length).toBeGreaterThan(0)
    }
  })

  it('should read all images after update', async () => {
    for (const id of ids) {
      const { buffer } = await getImage(id)
      expect(buffer.length).toBeGreaterThan(0)
    }
  })

  it('should delete all images', async () => {
    for (const id of ids) {
      expect(await deleteImage(id)).toBe(true)
    }
  })
})
