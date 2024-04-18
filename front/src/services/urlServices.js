import axios from 'axios'

const getUserURLs = async (user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  
  const res = await axios
  .get(`/api/users/${user.id}`, config)

  return res.data.urls
}

const shortURL = async (url, user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  
  const res = await axios.post(`/api/urls`, url, config)
  return res.data
}



export {
  getUserURLs,
  shortURL
}