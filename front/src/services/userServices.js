import axios from "axios"

const deleteUserURL = async (url, user) => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    }
  
    const res = await axios.delete(`/api/users/${user.id}/${url.id}`, config)
    return res.data.urls
  }

  export {
    deleteUserURL
  }