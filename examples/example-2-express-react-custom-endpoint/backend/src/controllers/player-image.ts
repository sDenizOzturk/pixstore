import { Request, Response } from 'express'
import { getPlayerById, getGeneralManagerById } from '../store/in-memory-db'
// Import Pixstore backend initializer from the official package.
import { customEndpointHelper } from '../../../../../dist/backend'
//import { customEndpointHelper } from "pixstore/backend";
import { SecureRequest } from '../middleware/auth'

export const getPlayerImage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const playerId = Number(req.params.playerId)
  const imageId = req.params.imageId
  const user = (req as SecureRequest).user

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const player = getPlayerById(playerId)
  if (!player) {
    res.status(404).json({ error: 'Player not found' })
    return
  }

  const isOwnPlayer =
    user.userType === 'basketballPlayer' && user.id === player.id
  const isOwnTeam =
    user.userType === 'generalManager' &&
    (() => {
      const gm = getGeneralManagerById(user.id)
      return !!gm && gm.teamId === player.teamId
    })()
  const isStaff = user.userType === 'federationStaff'

  if (!isOwnPlayer && !isOwnTeam && !isStaff) {
    res.status(403).json({ error: 'Forbidden' })
    return
  }

  if (player.imageId !== imageId) {
    res.status(400).json({ error: 'Invalid imageId for player' })
    return
  }

  try {
    // --- CRITICAL ---
    // This is the key Pixstore integration point for secure image delivery.
    // customEndpointHelper must be used here to ensure the backend can enforce access rules,
    // validate tokens, and correctly serve encoded image data.
    // WARNING: Do NOT attempt to serve raw files or database blobs directly!
    // Pixstore relies on this function for its authentication, auditing, and format compatibility.
    // If you skip this, the library WILL NOT work securely or as intended.
    const payload = await customEndpointHelper(imageId.toString())
    res.send(payload)
  } catch {
    res.status(404).json({ error: 'Image not found' })
  }
}
