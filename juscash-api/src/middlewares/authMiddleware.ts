import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { env } from '../config/env'
import { User } from '../models/userModel' // Importa o modelo User

interface DecodedToken extends JwtPayload {
  id: string
  fullName: string
  email: string
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    res.status(401).json({ error: 'Token não fornecido.' })
    return
  }

  try {
    const token = authHeader.split(' ')[1]
    const { id, email, fullName } = jwt.verify(
      token,
      env.JWT_SECRET,
    ) as DecodedToken

    req.user = { id, email, fullName } as Omit<User, 'password'>

    next()
  } catch (err) {
    res.status(403).json({ error: 'Token inválido.' })
  }
}
