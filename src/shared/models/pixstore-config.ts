import { ImageFormat } from './image-format'

export interface PixstoreConfig {
  imageFormats: readonly ImageFormat[]
  imageFormatToByte: Map<ImageFormat, number>
  byteToImageFormat: Map<number, ImageFormat>
  imageExtension: string
  imageRootDir: string
  defaultEndpointHost: string
  serverHost: string
  defaultEndpointPort: number
  defaultEndpointRoute: string
  databasePath: string
  frontendDbName: string
  frontendDbVersion: number
  imageStoreName: string
  frontendImageCacheLimit: number
  frontendCleanupBatch: number
}
