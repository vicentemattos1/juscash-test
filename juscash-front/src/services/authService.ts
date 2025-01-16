import axiosInstance from './axiosInstance'

export const createAccount = async (userData: {
  fullName: string
  email: string
  password: string
}) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData)
    return response
  } catch (error) {
    console.error('Erro ao criar conta')
    throw error
  }
}

export const login = async (userData: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post('/auth/login', userData)
    return response
  } catch (error) {
    console.error('Erro ao efetuar login')
    throw error
  }
}
