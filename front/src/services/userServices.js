import axios from "axios"

const baseURL = 'https://shurltener-api.vercel.app/api'

const deleteUserURL = async (url, user) => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    }
  
    const res = await axios.delete(`${baseURL}/users/${user.id}/${url.id}`, config)
    return res.data.urls
  }

  export {
    deleteUserURL
  }