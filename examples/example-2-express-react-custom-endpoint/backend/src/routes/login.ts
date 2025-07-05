import { Router } from 'express'
import { loginAsPlayer, loginAsGM, loginAsStaff } from '../controllers/login'

export const loginRouter = Router()

loginRouter.post('/basketball-player', loginAsPlayer)
loginRouter.post('/general-manager', loginAsGM)
loginRouter.post('/federation-staff', loginAsStaff)
