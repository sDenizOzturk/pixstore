import type { ImageFormat } from './image-format.js'

export interface PixstoreBackendConfig {
  imageFormats: readonly ImageFormat[]
  imageRootDir: string
  databasePath: string
  defaultEndpointEnabled: boolean
  defaultEndpointListenHost: string
  defaultEndpointListenPort: number
  defaultEndpointRoute: string
  accessControlAllowOrigin: string
}

export interface PixstoreFrontendConfig {
  imageFormats: readonly ImageFormat[]
  frontendDbName: string
  frontendDbVersion: number
  imageStoreName: string
  frontendImageCacheLimit: number
  frontendCleanupBatch: number
  defaultEndpointConnectHost: string
  defaultEndpointConnectPort: number
  defaultEndpointRoute: string
}

export interface PixstoreConfig
  extends PixstoreBackendConfig,
    PixstoreFrontendConfig {
  imageFormatToByte: Map<ImageFormat, number>
  byteToImageFormat: Map<number, ImageFormat>
  imageExtension: string
}
