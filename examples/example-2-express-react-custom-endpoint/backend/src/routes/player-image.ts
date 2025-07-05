import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { getPlayerImage } from '../controllers/player-image'

export const playerImageRouter = Router()

// Custom Pixstore image endpoint with player-based access control.
// This route provides authenticated access to images using both playerId and imageId.
playerImageRouter.get('/:playerId/:imageId', requireAuth, getPlayerImage)
