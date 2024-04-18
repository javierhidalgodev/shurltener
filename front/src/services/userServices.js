import axios from "axios"

const API = 'https://shurltener-api.vercel.app/api'

const deleteUserURL = async (url, user) => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    }
  
    const res = await axios.delete(`${API}/users/${user.id}/${url.id}`, config)
    return res.data.urls
  }

  export {
    deleteUserURL
  }