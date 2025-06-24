import * as Backend from '../../dist/backend/index.js'

const expectedExports = [
  'initPixstoreBackend',
  'getImageRecord',
  'saveImage',
  'saveImageFromFile',
  'updateImage',
  'updateImageFromFile',
  'deleteImage',
  'imageExists',
  'getImage',
  'customEndpointHelper',
].sort()

const actualExports = Object.keys(Backend).sort()

if (JSON.stringify(actualExports) !== JSON.stringify(expectedExports)) {
  console.error(
    'Export list changed: If you have added/removed an export, update this check and document the API change.',
  )
  console.error('Expected:', expectedExports)
  console.error('Received:', actualExports)
  process.exit(1)
} else {
  console.log('Backend exports match exactly.')
}
