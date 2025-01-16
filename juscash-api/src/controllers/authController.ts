import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { addUser, findUserByEmail } from '../models/userModel'
import { randomUUID } from 'node:crypto'
import { env } from '@/config/env'

const register = async (req: Request, res: Response): Promise<void> => {
  const { email, fullName, password } = req.body

  if (!email || !password || !fullName) {
    res.status(400).json({ error: 'Verifique os campos.' })
    return
  }

  const hashedPassword = await bcrypt.hash(password, 6)
  addUser({ id: randomUUID(), fullName, email, password: hashedPassword })

  res.status(201).json({ message: 'Usuário registrado com sucesso!' })
}

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: 'E-mail e senha são obrigatórios.' })
    return
  }

  try {
    const user = await findUserByEmail(email)

    if (!user) {
      throw new Error('Not found')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error()
    }

    const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
      expiresIn: '1h',
    })

    res.status(200).json({ message: 'Login bem-sucedido.', token })
  } catch (err) {
    console.log(err)
    res.status(404).json({ error: 'Usuário ou senha inválidos.' })
    return
  }
}

export { register, login }
