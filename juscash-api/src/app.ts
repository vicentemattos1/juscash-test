import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:5173', // Permitir apenas a origem da sua aplicação React
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir apenas os métodos necessários
    allowedHeaders: ['Content-Type', 'Authorization'], // Permitir os cabeçalhos necessários
    credentials: true, // Permitir cookies e credenciais, se necessário
  }),
)
app.use('/auth', authRoutes)
app.use('/users', userRoutes)

export default app
