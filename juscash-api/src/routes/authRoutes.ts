import express, { Request, Response } from 'express'
import { register, login } from '../controllers/authController'
import { authenticateToken } from '../middlewares/authMiddleware'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

export default router
