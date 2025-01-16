import db from '../config/db'

interface User {
  id: string
  email: string
  fullName: string
  password: string
}

const addUser = async (user: User): Promise<void> => {
  await db('users').insert(user)
}

const getUsers = async (): Promise<Omit<User, 'password'>[]> => {
  const columns = await db('users').columnInfo()

  const selectedColumns = Object.keys(columns).filter(
    (column) => column !== 'password',
  )

  // Retornar os dados sem o campo 'password'
  return await db('users').select(selectedColumns)
}
const findUserByEmail = async (email: string): Promise<User | undefined> => {
  return await db('users').where({ email }).first()
}

export { User, addUser, getUsers, findUserByEmail }
