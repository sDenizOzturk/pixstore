import type { ImageFormat } from './image-format.js'

export interface PixstoreBackendConfig {
  imageFormats: readonly ImageFormat[]
  imageRootDir: string
  databasePath: string
  defaultEndpointHost: string
  defaultEndpointEnabled: boolean
  defaultEndpointPort: number
  defaultEndpointRoute: string
}

export interface PixstoreFrontendConfig {
  imageFormats: readonly ImageFormat[]
  frontendDbName: string
  serverHost: string
  frontendDbVersion: number
  imageStoreName: string
  frontendImageCacheLimit: number
  frontendCleanupBatch: number
}

export interface PixstoreConfig
  extends PixstoreBackendConfig,
    PixstoreFrontendConfig {
  imageFormatToByte: Map<ImageFormat, number>
  byteToImageFormat: Map<number, ImageFormat>
  imageExtension: string
}
