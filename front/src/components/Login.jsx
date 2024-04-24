import { useState } from 'react'
import Instructions from './Instructions'
import { Alert, Box, Button, Divider, TextField, Typography } from '@mui/material'
import { login, signup } from "../services/loginServices"

const Login = (props) => {
  const { notification, setNotification, setUser } = props
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginMode, setLoginMode] = useState('login')

  const checkName = (e, name) => {
    const nameValidation = new RegExp(/^[a-zA-Z\s]*$/).test(name)

    if (!nameValidation) {
      e.target.name.focus()
      setNotification({ message: 'El nombre solo debe contener letras', type: 'error' })
      setTimeout(() => {
        setNotification('')
      }, 10000)
    }
    
    return nameValidation
  }

  const checkUsername = (e, username) => {
    const usernameValidation = new RegExp(/^[a-zA-Z0-9]*$/).test(username)
    
    if (!usernameValidation) {
      e.target.username.focus()
      setNotification({ message: 'El nombre de usuario solo debe contener letras y números', type: 'error' })
      setTimeout(() => {
        setNotification('')
      }, 10000)
    }
    
    return usernameValidation
  }
  
  const checkPassword = (e, password) => {
    const passValidation = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(password)
    
    if(!passValidation) {
      e.target.password.focus()
      setNotification({ message: 'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número', type: 'error' })
      setTimeout(() => {
        setNotification('')
      }, 10000)

    }

    return passValidation
  }

  const handleMode = () => {
    setName('')
    setUsername('')
    setPassword('')
    setLoginMode(loginMode === 'login' ? 'signup' : 'login')
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    if (loginMode === 'login') {
      try {
        const res = await login({ username, password })
        setUser(res.data)
        setUsername('')
        setPassword('')
        window.localStorage.setItem('user', JSON.stringify(res.data))
      } catch (error) {
        setNotification({ message: 'Credenciales incorrectas', type: 'error' })
        setTimeout(() => {
          setNotification('')
        }, 10000)
      }
    } else {
      if(checkName(e, name) && checkPassword(e, password) && checkUsername(e, username)) {
        try {
          await signup({ name, username, password })
          setName('')
          setUsername('')
          setPassword('')
          setLoginMode('login')
          setNotification({ message: 'User created successfully', type: 'success' })
          setTimeout(() => {
            setNotification('')
          }, 10000)
        } catch (error) {
          setUsername('')
          const errorMessage = error.response.data.error
          setNotification({ message: errorMessage, type: 'error' })
          setTimeout(() => {
            setNotification('')
          }, 10000)
        }
      }
    }
  }

  return (
    <Box
      component='form'
      onSubmit={(e) => handleLoginSubmit(e)}
      maxWidth='400px'
      margin='60px 0px'
      padding='40px'
      border='1px solid #333'
      borderRadius='10px'
      sx={{
        background: '#0a0a0a',
      }} >
      <Typography variant='h5' fontWeight='bold' mb='20px' >
        <Box display={'flex'} justifyContent='space-around'>
          <Button variant='text' style={loginMode === 'login' ? { background: 'rgba(255,255,255,0.1)' } : {}} sx={{ padding: '.3rem 1.2rem', color: '#dbff00' }} onClick={handleMode}>
            Login
          </Button>
          <Divider orientation="vertical" flexItem aria-hidden="true" />

          <Button variant='text' style={loginMode === 'signup' ? { background: 'rgba(255,255,255,0.1)' } : {}} sx={{ padding: '.3rem 1.2rem', color: '#dbff00' }} onClick={handleMode}>
            Sign Up
          </Button>
        </Box>
      </Typography>
      {
        loginMode === 'signup' &&
        <TextField
          onChange={({ target }) => setName(target.value)}
          value={name}
          required
          fullWidth
          id='name'
          label='Name'
          name='name'
          sx={{ marginTop: '16px' }}
        />
      }
      <TextField
        onChange={({ target }) => setUsername(target.value)}
        value={username}
        required
        fullWidth
        id='username'
        label='Username'
        name='username'
        sx={{ marginTop: '16px' }}
      />
      <TextField
        onChange={({ target }) => setPassword(target.value)}
        value={password}
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
        sx={{ marginTop: '16px' }}
      />
      {
        notification &&
        <Alert severity={notification.type} variant='outlined' sx={{ margin: '10px 0' }}>
          {notification.message}
        </Alert>
      }
      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={{ my: 3, fontWeight: 800, backgroundColor: '#dbff00', '&:hover': { backgroundColor: '#b4d100' } }}
      >
        {loginMode === 'login' ? 'Login' : 'Sign Up'}
      </Button>
      {
        loginMode === 'signup' && <Instructions />
      }
    </Box>
  )
}

export default Login