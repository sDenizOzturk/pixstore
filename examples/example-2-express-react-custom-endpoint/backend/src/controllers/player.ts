// Import Pixstore from the official package.
import { getImageRecord } from 'pixstore/backend'

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
