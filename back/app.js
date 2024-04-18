const config = require('./utils/config')
const middleware = require('./utils/middleware')

const express = require('express')
require('express-async-errors')
const path = require('path')
const app = express()

// Conexión del back con el front
const cors = require('cors')

// Importar rutas
const loginController = require('./controllers/loginController')
const urlsController = require('./controllers/urlsController')
const shortedURL = require('./controllers/shortedURLController')
const usersController = require('./controllers/usersController')

const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
  .then(db => {
    // console.log(`Connected to MongoDB`);
  })
  .catch(error => {
    // console.log(`Error connecting to MongoDB:`, error.message);
  })

const corsOptions = {
  origin: 'https://shurltener.vercel.app',
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.options('*', cors())
app.use(express.static('dist'))
app.use(express.json())

app.use('/api/login', loginController)
app.use('/api/users', usersController)
app.use('/api/urls', urlsController)
app.use('/api/shorted', shortedURL)

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../front/dist', 'index.html'))
// })

app.use(middleware.error)
module.exports = app