import type { ImageFormat } from './image-format.js'

export interface PixstoreBackendConfig {
  imageFormats: readonly ImageFormat[]
  imageRootDir: string
  databasePath: string
  defaultEndpointHost: string
  defaultEndpointEnabled: boolean
  defaultEndpointPort: number
  defaultEndpointRoute: string
  accessControlAllowOrigin: string
}

export interface PixstoreFrontendConfig {
  imageFormats: readonly ImageFormat[]
  backendApiHost: string
  frontendDbName: string
  frontendDbVersion: number
  imageStoreName: string
  frontendImageCacheLimit: number
  frontendCleanupBatch: number
  defaultEndpointPort: number
}

export interface PixstoreConfig
  extends PixstoreBackendConfig,
    PixstoreFrontendConfig {
  imageFormatToByte: Map<ImageFormat, number>
  byteToImageFormat: Map<number, ImageFormat>
  imageExtension: string
}
