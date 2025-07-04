import * as Frontend from '../../dist/shared/index.js'

const expectedExports = ['setCustomErrorHandler', 'getLastPixstoreError'].sort()

const actualExports = Object.keys(Frontend).sort()

if (JSON.stringify(actualExports) !== JSON.stringify(expectedExports)) {
  console.error(
    'Export list changed: If you have added/removed an export, update this check and document the API change.',
  )
  console.error('Expected:', expectedExports)
  console.error('Received:', actualExports)
  process.exit(1)
} else {
  console.log('Shared exports match exactly.')
}
