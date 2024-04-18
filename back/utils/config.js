require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const ADMIN_ID = process.env.NODE_ENV === 'test'
  ? process.env.TEST_ADMIN_ID
  : process.env.ADMIN_ID

module.exports = {
  PORT,
  MONGODB_URI
}