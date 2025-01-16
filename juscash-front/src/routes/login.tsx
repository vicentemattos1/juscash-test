import React, { useState } from 'react'
import {
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Link,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('E-mail inválido')
      .required('E-mail é obrigatório'),
    password: Yup.string().required('Senha é obrigatório'),
  })

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await login({
          email: values.email,
          password: values.password,
        })
        localStorage.setItem('@juscash-token', response.data.token)
        alert('Login efetuado com sucesso!')
        navigate('/')
      } catch {
        alert('Erro ao efetuar login. Tente novamente.')
      }
    },
  })

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      bgcolor="#f5f5f5"
    >
      <Typography variant="h4" gutterBottom>
        JusCash
      </Typography>
      <Box
        component="form"
        maxWidth={400}
        width="100%"
        p={3}
        onSubmit={handleSubmit}
      >
        <Box mb={2}>
          <Typography variant="subtitle1" component="label" htmlFor="email">
            E-mail:
          </Typography>
          <TextField
            sx={{ mt: '0.5rem' }}
            id="email"
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle1" component="label" htmlFor="password">
            Senha:
          </Typography>
          <TextField
            sx={{ mt: '0.5rem' }}
            id="password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            margin="normal"
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            display: 'flex',
            margin: 'auto',
            px: '2.5rem',
            py: '0.25rem',
            textTransform: 'initial',
            fontWeight: 'bold',
            bgcolor: '#2cbd62',
          }}
        >
          Login
        </Button>
        <Link
          href="/new-user"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            textTransform: 'initial',
            color: '#072854',
            fontWeight: 500,
            mt: '2rem',
          }}
        >
          Não possui conta? Cadastre-se
        </Link>
      </Box>
    </Box>
  )
}

export default Login
