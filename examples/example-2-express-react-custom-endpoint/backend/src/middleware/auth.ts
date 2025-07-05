import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET } from '../constants'

export interface SecureRequest extends Request {
  user: AuthUser
}

export interface AuthUser {
  id: number
  userType: 'basketballPlayer' | 'generalManager' | 'federationStaff'
  name: string
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid Authorization header' })
    return
  }
  const token = authHeader.slice(7)

  try {
    const decoded = jwt.verify(token, SECRET) as AuthUser
    // Attach user info to req
    ;(req as SecureRequest).user = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
