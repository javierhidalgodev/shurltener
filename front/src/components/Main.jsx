import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import Login from './Login'
import UrlsTable from "./UrlsTable"
import URLForm from "./URLForm"
import { Button, Container, Typography } from "@mui/material"
import { getUserURLs } from '../services/urlServices'

const Main = () => {
  const [user, setUser] = useState(null)
  const [url, setURL] = useState('')
  const [urls, setURLs] = useState([])
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
      // try {
        fetchURLs(user)
      // } catch (error) {
        // console.log(error)
      // }
    }
  }, [user])

  const handleLogout = () => {
    setUser(null)
    setURLs([])
    setURL('')
    setNotification('')
    window.localStorage.removeItem('user')
  }

  return (
    <Container
      maxWidth='md'
      sx={{marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
      <Typography
        variant='h3'
        my={0}
        fontWeight='bold'
        textAlign='center'
        fontSize={'clamp(2rem, 5vw, 3rem)'} >
        URL shortener microservice
      </Typography>
      <Typography
        variant='subtitle1'
        textAlign='center' >
        Acorta tus URLS de forma rápida y sencilla
      </Typography>

      {
        user
          ? (
            <>
              <URLForm user={user} url={url} setURL={setURL} urls={urls} setURLs={setURLs} notification={notification} setNotification={setNotification} />
              {
                urls.length > 0
                  ?
                  <UrlsTable urls={urls} setURLs={setURLs} user={user} />
                  : <p>No existen entradas</p>
              }
              <Typography component='small' my={3}>Usuario: {user.username}</Typography>
              <Button
                onClick={handleLogout}
                variant='contained'
                sx={{ width: 'fit-content', fontWeight: 800, backgroundColor: '#dbff00', '&:hover': { backgroundColor: '#b4d100' } }}>
                Logout
              </Button>
            </>
          )
          : <Login notification={notification} setNotification={setNotification} setUser={setUser} />
      }
    </Container>
  )
}

export default Main