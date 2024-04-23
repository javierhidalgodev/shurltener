import { Alert, Box, Button, List, TextField, Typography } from '@mui/material'

const Login = (props) => {
    const { setUsername, setPassword, handleLoginSubmit, notification } = props

    return (
        <Box
            component='form'
            onSubmit={handleLoginSubmit}
            maxWidth='400px'
            margin='60px 0px'
            padding='40px'
            border='1px solid #333'
            borderRadius='10px'
            sx={{
                background: '#0a0a0a',
            }}
            noValidate >
            <Typography variant='h5' fontWeight='bold' mb='20px' >
                Login
            </Typography>
            <TextField
                onChange={({ target }) => setUsername(target.value)}
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
            />
            <TextField
                onChange={({ target }) => setPassword(target.value)}
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
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
                sx={{ my: 3, fontWeight: 800, backgroundColor: '#dbff00', '&:hover': { backgroundColor: '#b4d100'} }}
            >
                Sign In
            </Button>
            <Typography variant='body2'>
                Para probar la aplicación, utiliza las siguientes credenciales:
            </Typography>
            <List component='ul' sx={{listStyleType: 'disc', listStylePosition: 'inside'}}>
                <li>username: <strong>demo-user</strong></li>
                <li>username: <strong>demo-user-pass</strong></li>
            </List>
        </Box>
    )
}

export default Login