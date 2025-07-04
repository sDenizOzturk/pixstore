// IMPORTANT: In this example, Pixstore is imported directly from a local build path for demonstration purposes.
// In real projects, you should install Pixstore via npm and import as follows:
//
//   import { initPixstoreBackend } from 'pixstore/backend'
//
import { ImageRecord } from '../../../../../dist/types'

export interface BasketballPlayerRecord {
  id: number
  name: string
  imageId: string
  teamId: number
}

export interface BasketballPlayer {
  id: number
  name: string
  imageRecord: ImageRecord
  teamId: number
}
