import { PixstoreBackendConfig } from '../shared/models/pixstore-config'
import { initPixstore, pixstoreConfig } from '../shared/pixstore-config'
import { startDefaultEndpoint } from './default-endpoint'

export const initPixstoreBackend = (
  config: Partial<PixstoreBackendConfig> = {},
) => {
  initPixstore(config)
  if (pixstoreConfig.defaultEndpointEnabled) {
    startDefaultEndpoint()
  }
}

export {
  getImageRecord,
  saveImage,
  saveImageFromFile,
  updateImage,
  updateImageFromFile,
  deleteImage,
  imageExists,
  getImage,
} from './image-service'

export type { ImageRecord } from '../shared/models/image-record'

export { customEndpointHelper } from './custom-endpoint'
