import { getUsers } from '@/models/userModel'
import { Response, Request } from 'express'

export const usersController = async (
  _: Request,
  res: Response,
): Promise<void> => {
  const users = await getUsers()

  res.status(200).json({ users })
}
