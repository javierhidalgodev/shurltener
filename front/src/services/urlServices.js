import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL

const getUserURLs = async (user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  
  const res = await axios
  .get(`${baseURL}/users/${user.id}`, config)

  return res.data.urls
}

const shortURL = async (url, user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  
  const res = await axios.post(`${baseURL}/urls`, url, config)
  return res.data
}



export {
  getUserURLs,
  shortURL
}