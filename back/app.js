const config = require('./utils/config')
const middleware = require('./utils/middleware')

const express = require('express')
require('express-async-errors')
const path = require('path')
const app = express()

// Conexión del back con el front
const cors = require('cors')

// Importar rutas
const urlsRouter = require('./controllers/urlsRouter')
const shortedURL = require('./controllers/shortedURLController')

const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
  .then(db => {
    console.log(`Connected to MongoDB`);
  })
  .catch(error => {
    console.log(`Error connecting to MongoDB:`, error.message);
  })

const corsOptions = {
  origin: 'https://shurltener.vercel.app/',
  optionsSuccessStatus: 200
}

// app.use(express.static(path.resolve(__dirname, './dist')))
app.use(cors(corsOptions))
app.use(express.static('dist'))
app.use(express.json())

// app.get('/', (request, response) => {
//   response.send('<h1>ShURLtener</h1>')
// })

app.use('/api/urls', urlsRouter)
app.use('/api/shorted', shortedURL)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../front/dist', 'index.html'))
})

app.use(middleware.error)
module.exports = app