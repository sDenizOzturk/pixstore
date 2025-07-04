// IMPORTANT: In this example, Pixstore is imported directly from a local build path for demonstration purposes.
// In real projects, you should install Pixstore via npm and import as follows:
//
//   import { initPixstoreBackend } from 'pixstore/backend'
//
import { getImageRecord } from '../../../../../dist/backend'

import { getPlayerById } from '../store/in-memory-db'
import { Request, Response } from 'express'
import { BasketballPlayer } from '../models/basketball-player'
import { SecureRequest } from '../middleware/auth'

export const getPlayer = (req: Request, res: Response) => {
  const requestedId = Number(req.params.id)
  const user = (req as SecureRequest).user

  const playerRecord = getPlayerById(requestedId)
  if (!playerRecord) {
    res.status(404).json({ error: 'Player not found' })
    return
  }

  if (
    (user.userType === 'basketballPlayer' && user.id === playerRecord.id) ||
    user.userType === 'generalManager' ||
    user.userType === 'federationStaff'
  ) {
    // Look up the image metadata from Pixstore for this player.
    // This record is required to allow frontend to securely fetch and display the image.
    const imageRecord = getImageRecord(playerRecord.imageId)!

    const player: BasketballPlayer = {
      ...playerRecord,
      imageRecord,
    }

    res.json(player)
    return
  }

  res.status(403).json({ error: 'Forbidden' })
}
