import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { shortURL } from '../services/urlServices'
import UrlsTable from "./UrlsTable"

const Main = () => {
  const [url, setURL] = useState('')
  const [urls, setURLs] = useState([])
  const [shortedURL, setShortedURL] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    if(localStorage.getItem('urls')) {
      const urlsArray = JSON.parse(localStorage.getItem('urls'))
      setURLs(urlsArray)
    }
  } ,[])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const urlToShort = {
      originalURL: url
    }

    try {
      const res = await shortURL(urlToShort)
      if(localStorage.getItem('urls')) {
        const urlsArray = JSON.parse(localStorage.getItem('urls'))
  
        const exists = urlsArray.find(url => url.id === res.data.id)
  
        if(!exists) {
          const newArray = urlsArray.concat(res.data)
          setURLs(newArray)
          localStorage.setItem('urls', JSON.stringify(newArray))
          setShortedURL(res.data.shortedURL)
        } else {
          setNotification({message: `Esta URL ya ha sido acortada antes`, type: 'info'})
          setURL('')
          setTimeout(() => {
            setNotification('')
          }, 10000)
        }
      } else {
        const urlsArray = urls.concat(res.data)
        setURLs(urlsArray)
        localStorage.setItem('urls', JSON.stringify(urlsArray))
        setShortedURL(res.data.shortedURL)
      }
    } catch (error) {
      setNotification({message: 'URL inválida', type: 'error'})
      setURL('')
      setTimeout(() => {
        setNotification('')
      }, 10000)
    }
  }

  return (
    <Container maxWidth='md' sx={{
      marginTop: '60px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }} >
      <Typography variant='h3' my={0} fontWeight='bold' textAlign='center'>
        URL shortener microservice
      </Typography>
      <Typography variant='subtitle1' textAlign='center'>
        Acorta tus URLS de forma rápida y tenlas a mano siempre
      </Typography>
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
          sx={{backgroundColor: '#dbff00'}}>
          Short
        </Button>
      </Box>

      {
        notification &&
        <Alert severity={notification.type} variant='outlined' sx={{ margin: '10px 0' }}>{notification.message}</Alert>
      }
      {
        shortedURL !== '' &&
        <Alert severity='success' variant='outlined' sx={{ margin: '10px 0' }}>
          La URL ha sido acortada exitosamente: <a target='_blank' href={`https://shurltener.netlify.app/api/shorted/${shortedURL}`}>{shortedURL}</a>
        </Alert>
      }

      {
        urls.length > 0 
          ? <UrlsTable urls={urls} />
          : <p>No existen entradas</p>
      }
    </Container>
  )
}

export default Main