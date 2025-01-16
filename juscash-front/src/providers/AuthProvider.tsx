import React, { createContext, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Create the AuthContext
const AuthContext = createContext({})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('@juscash-token')

    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
