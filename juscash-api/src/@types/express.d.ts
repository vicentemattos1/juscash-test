import { User } from '../models/userModel' // Importa o modelo User

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, 'password'> // Omitimos o campo `password` por segurança
    }
  }
}
