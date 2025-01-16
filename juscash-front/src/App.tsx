import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './routes/login'
import { CreateAccount } from './routes/create-account'
import { AuthProvider } from './providers/AuthProvider'

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthProvider>
            <></>
          </AuthProvider>
        }
      />
      <Route path="/new-user" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
