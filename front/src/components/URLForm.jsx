import { Alert, Box, Button, TextField } from "@mui/material"
import { shortURL } from '../services/urlServices'

const URLForm = (props) => {
    const { user, url, setURL, urls, setURLs, notification, setNotification } = props

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const urlToShort = {
          originalURL: url,
          user: user.username
        }
    
        try {
          const urlData = await shortURL(urlToShort, user)
          if (urlData !== '') {
            setURLs(urls.concat(urlData))
            setNotification({ message: `URL acortada con éxito `, type: 'success' })
          } else {
            setNotification({ message: `Esta URL ya ha sido acortada antes`, type: 'info' })
          }
    
          setTimeout(() => {
            setNotification('')
          }, 10000)
    
          setURL('')
        } catch (error) {
          const errorMessage = error.response.data.error
          setNotification({ message: errorMessage, type: 'error' })
          setTimeout(() => {
            setNotification('')
          }, 10000)
        }
    
        setURL('')
      }

    return (
        <>
            <Box
                component='form'
                margin='20px 0'
                method='post'
                onSubmit={handleSubmit}
                width={'100%'}
                display={'flex'}
                alignItems={'flex-start'}
                gap={2}>
                <TextField
                    placeholder={'http://www.example.com'}
                    fullWidth
                    name='url'
                    size='small'
                    value={url}
                    onChange={({ target }) => setURL(target.value)}
                    required />
                <Button
                    type='submit'
                    variant='contained'
                    sx={{ backgroundColor: '#dbff00', fontWeight: 800, '&:hover': { backgroundColor: '#b4d100' }}}>
                    Short
                </Button>
            </Box>
            {
                notification &&
                <Alert
                    severity={notification.type}
                    variant='outlined'
                    sx={{ margin: '10px 0' }}>
                    {notification.message}
                </Alert>
            }
        </>
    )
}

export default URLForm