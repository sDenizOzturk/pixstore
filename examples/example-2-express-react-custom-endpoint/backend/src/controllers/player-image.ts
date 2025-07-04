import { Request, Response } from 'express'
import { getPlayerById, getGeneralManagerById } from '../store/in-memory-db'
// IMPORTANT: In this example, Pixstore is imported directly from a local build path for demonstration purposes.
// In real projects, you should install Pixstore via npm and import as follows:
//
//   import { initPixstoreBackend } from 'pixstore/backend'
//
import { customEndpointHelper } from '../../../../../dist/backend'
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
    const clientTokenRaw = req.query.token ?? req.headers['x-pixstore-token']
    const clientToken =
      clientTokenRaw !== undefined ? Number(clientTokenRaw) : 0

    const statelessProofRaw = req.query.proof ?? req.headers['x-pixstore-proof']
    const statelessProof =
      typeof statelessProofRaw === 'string' ? statelessProofRaw : undefined

    if (!statelessProof) {
      res.status(400).json({ error: 'Missing proof' })
      return
    }

    // --- CRITICAL ---
    // This is the key Pixstore integration point for secure image delivery.
    // customEndpointHelper must be used here to ensure the backend can enforce access rules,
    // validate tokens, and correctly serve encoded image data.
    // WARNING: Do NOT attempt to serve raw files or database blobs directly!
    // Pixstore relies on this function for its authentication, auditing, and format compatibility.
    // If you skip this, the library WILL NOT work securely or as intended.
    const payload = await customEndpointHelper(
      imageId.toString(),
      clientToken,
      statelessProof,
    )
    res.send(payload)
  } catch {
    res.status(404).json({ error: 'Image not found' })
  }
}
