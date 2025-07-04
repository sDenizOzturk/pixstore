import { ImageRecord } from './image-record.ts'

export type ImageFetcher = (
  imageRecord: ImageRecord,
  context?: any,
) => Promise<Uint8Array>
