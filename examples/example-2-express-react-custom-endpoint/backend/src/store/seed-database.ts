// IMPORTANT: In this example, Pixstore is imported directly from a local build path for demonstration purposes.
// In real projects, you should install Pixstore via npm and import as follows:
//
//   import { initPixstoreBackend } from 'pixstore/backend'
//
import { saveImage } from '../../../../../dist/backend'

import {
  addTeam,
  addPlayer,
  addGeneralManager,
  addFederationStaff,
} from './in-memory-db'

import { readdir, stat, readFile } from 'fs/promises'
import path from 'path'

export const seedCommissioner = () => {
  addFederationStaff({ id: 1, role: 'commissioner' })
}

export const seedTeamsAndPlayers = async (defaultImagesDir: string) => {
  let teamId = 1
  let playerId = 1
  const teamDirs = await readdir(defaultImagesDir)

  for (const teamDir of teamDirs) {
    const fullTeamPath = path.join(defaultImagesDir, teamDir)
    if (!(await stat(fullTeamPath)).isDirectory()) continue

    addTeam({ id: teamId, teamName: teamDir })
    addGeneralManager({ id: teamId, teamId: teamId })

    const playerFiles = await readdir(fullTeamPath)
    for (const file of playerFiles) {
      if (!file.endsWith('.png')) continue
      const playerName = file.replace(/\.png$/i, '')
      const imagePath = path.join(fullTeamPath, file)
      const imageBuffer = await readFile(imagePath)

      // Store the player's image in Pixstore and receive its unique imageId.
      // The image buffer is saved to the Pixstore backend storage.
      // The returned imageId will be used to link this image with the player record.
      const imageRecord = await saveImage(imageBuffer)
      if (!imageRecord) {
        throw new Error(
          `Failed to save image for player ${playerName} (${imagePath})`,
        )
      }

      addPlayer({
        id: playerId,
        name: playerName,
        imageId: imageRecord.id,
        teamId: teamId,
      })
      playerId++
    }
    teamId++
  }
}

export const seedDatabase = async () => {
  seedCommissioner()
  await seedTeamsAndPlayers(path.resolve(__dirname, '../../default-images'))
}
