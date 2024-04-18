import axios from 'axios'

const API = 'https://shurltener-api.vercel.app/api'

const getUserURLs = async (user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  
  const res = await axios
  .get(`${API}/users/${user.id}`, config)

  return res.data.urls
}

const shortURL = async (url, user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  
  const res = await axios.post(`${API}/urls`, url, config)
  return res.data
}



export {
  getUserURLs,
  shortURL
}