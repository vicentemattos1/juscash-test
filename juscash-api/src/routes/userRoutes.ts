import express from 'express'
import { usersController } from '../controllers/usersController'
import { authenticateToken } from '../middlewares/authMiddleware'

const userRoutes = express.Router()

userRoutes.get('/', authenticateToken, usersController)

export default userRoutes
