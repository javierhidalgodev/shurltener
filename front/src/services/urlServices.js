import axios from 'axios'

const getURLs = async () => {
  const res = await axios.get(`https://shurltener-api.vercel.app/api/urls`)

  return res
}

const shortURL = async (url) => {
  const res = await axios.post(`https://shurltener-api.vercel.app/api/urls`, url)
  return res
}

export {
  getURLs,
  shortURL
}