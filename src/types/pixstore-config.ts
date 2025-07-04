import type { ImageFormat } from './image-format.js'
import type { ErrorHandlingMode } from './error-handling-mode.js'

export interface PixstoreBackendConfig {
  imageFormats: readonly ImageFormat[]
  imageRootDir: string
  databasePath: string
  statelessKeyWindowLength: number
  defaultEndpointEnabled: boolean
  defaultEndpointListenHost: string
  defaultEndpointListenPort: number
  defaultEndpointRoute: string
  accessControlAllowOrigin: string
  errorHandlingMode: ErrorHandlingMode
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
  errorHandlingMode: ErrorHandlingMode
}

export interface PixstoreConfig
  extends PixstoreBackendConfig,
    PixstoreFrontendConfig {
  imageFormatToByte: Map<ImageFormat, number>
  byteToImageFormat: Map<number, ImageFormat>
  imageExtension: string
}
