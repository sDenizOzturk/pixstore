// Import Pixstore backend initializer from the official package.
import { saveImage } from '../../../../../dist/backend'
//import { saveImage } from "pixstore/backend";

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
      const { id: imageId } = await saveImage(imageBuffer)

      addPlayer({
        id: playerId,
        name: playerName,
        imageId: imageId,
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
