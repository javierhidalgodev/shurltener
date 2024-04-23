require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const ROOT_ID = process.env.NODE_ENV === 'test'
  ? process.env.TEST_ROOT_ID
  : process.env.ROOT_ID


const BASE_URL = process.env.NODE_ENV === 'development'
  ? process.env.DEV_BASE_URL
  : process.env.PROD_BASE_URL

module.exports = {
  PORT,
  MONGODB_URI,
  ROOT_ID,
  BASE_URL
}