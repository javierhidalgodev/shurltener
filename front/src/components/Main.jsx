import { Box, Button, CircularProgress, Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getUserURLs, shortURL } from '../services/urlServices'
import Login from './Login'
import UrlsTable from "./UrlsTable"
import login from "../services/loginServices"
import URLForm from "./URLForm"
import { jwtDecode } from "jwt-decode"

const Main = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [url, setURL] = useState('')
  const [urls, setURLs] = useState([])
  const [shortedURL, setShortedURL] = useState('')
  const [notification, setNotification] = useState('')

  const fetchURLs = async (user) => {
    const userURLs = await getUserURLs(user)
    setURLs(userURLs)
  }

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'))

    if (loggedUser) {
      const { exp } = jwtDecode(loggedUser.token)

      exp * 1000 < new Date().getTime()
        ? setUser(null)
        : setUser(loggedUser)
    }
  }, [])

  useEffect(() => {
    if (user) {
      try {
        fetchURLs(user)
      } catch (error) {
        console.log(error)
      }
    }
  }, [user])

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

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

  }

  const handleLogout = () => {
    setUser(null)
    setURLs([])
    setURL('')
    setNotification('')
    window.localStorage.removeItem('user')
  }

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
    <Container maxWidth='md' sx={{
      marginTop: '60px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }} >
      <Typography variant='h3' my={0} fontWeight='bold' textAlign='center' fontSize={'clamp(2rem, 5vw, 3rem)'}>
        URL shortener microservice
      </Typography>
      <Typography variant='subtitle1' textAlign='center'>
        Acorta tus URLS de forma rápida y sencilla
      </Typography>

      {
        user
        ? (
            <>
              <URLForm url={url} setURL={setURL} handleSubmit={handleSubmit} notification={notification} />
              {
                urls.length > 0
                  ?
                  <>
                    <UrlsTable urls={urls} setURLs={setURLs} user={user} />
                    <Typography component='small' my={3}>Usuario: {user.username}</Typography>
                    <Button
                      onClick={handleLogout}
                      variant='contained'
                      sx={{ width: 'fit-content', fontWeight: 800, backgroundColor: '#dbff00', '&:hover': { backgroundColor: '#b4d100' } }}
                    >
                      Logout
                    </Button>
                  </>
                  : <p>No existen entradas</p>
              }
            </>
          )
          : <Login setUsername={setUsername} setPassword={setPassword} handleLoginSubmit={handleLoginSubmit} notification={notification} />
      }
    </Container>
  )
}

export default Main