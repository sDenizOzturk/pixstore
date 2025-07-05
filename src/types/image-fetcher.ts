import { ImageRecord } from './image-record.ts'

export type ImageFetcher = (
  imageRecord: ImageRecord, // Includes id, token, decryption meta, and stateless proof
  context?: unknown, // Optional context (user, session, etc.)
) => Promise<Uint8Array>
