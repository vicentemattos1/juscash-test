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
import { Login, Visibility, VisibilityOff } from '@mui/icons-material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createAccount } from '../services/authService'
import { useNavigate } from 'react-router-dom'

export const CreateAccount: React.FC = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const validationSchema = Yup.object({
    fullName: Yup.string().required('O nome completo é obrigatório'),
    email: Yup.string()
      .email('E-mail inválido')
      .required('E-mail é obrigatório'),
    password: Yup.string()
      .required('Senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'As senhas devem coincidir')
      .required('A confirmação de senha é obrigatória'),
  })

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createAccount({
          fullName: values.fullName,
          email: values.email,
          password: values.password,
        })
        alert('Conta criada com sucesso!')
        navigate('/login')
      } catch {
        alert('Erro ao criar conta. Tente novamente.')
      }
    },
  })
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }
  const handleTogglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm((prev) => !prev)
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
          <Typography
            variant="subtitle1"
            component="label"
            sx={{ display: 'flex' }}
            htmlFor="fullName"
          >
            Seu nome completo:<Box sx={{ color: 'red' }}>*</Box>
          </Typography>
          <TextField
            sx={{ mt: '0.5rem' }}
            id="fullName"
            name="fullName"
            type="text"
            fullWidth
            variant="outlined"
            margin="normal"
            value={values.fullName}
            onChange={handleChange}
            error={touched.fullName && Boolean(errors.fullName)}
            helperText={touched.fullName && errors.fullName}
          />
        </Box>
        <Box mb={2}>
          <Typography
            variant="subtitle1"
            component="label"
            sx={{ display: 'flex' }}
            htmlFor="email"
          >
            E-mail:<Box sx={{ color: 'red' }}>*</Box>
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
          <Typography
            variant="subtitle1"
            component="label"
            sx={{ display: 'flex' }}
            htmlFor="password"
          >
            Senha:<Box sx={{ color: 'red' }}>*</Box>
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
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            component="label"
            sx={{ display: 'flex' }}
            htmlFor="confirmPassword"
          >
            Confirme sua senha:<Box sx={{ color: 'red' }}>*</Box>
          </Typography>
          <TextField
            sx={{ mt: '0.5rem' }}
            id="confirmPassword"
            name="confirmPassword"
            type={showPasswordConfirm ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            margin="normal"
            value={values.confirmPassword}
            onChange={handleChange}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordConfirmVisibility}
                      edge="end"
                    >
                      {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Link
          href="/login"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            textTransform: 'initial',
            color: '#072854',
            fontWeight: 500,
            mb: 2,
          }}
        >
          Já possui conta? Fazer o login
        </Link>

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
            fontSize: '1rem',
          }}
        >
          Criar conta
        </Button>
      </Box>
    </Box>
  )
}

export default Login
