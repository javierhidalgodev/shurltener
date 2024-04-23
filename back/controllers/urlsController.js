const jwt = require('jsonwebtoken')
const urlsRouter = require('express').Router()
const validURL = require('valid-url')
const shortener = require('nanoid')
const Url = require('../models/urlModel')
const User = require('../models/userModel')
const handleLogin = require('../middleware/handleLogin')

urlsRouter.get('/', handleLogin, async (request, response) => {
  const urls = await Url.find({}).populate('user')
  // console.log(urls)
  response.json(urls)
})

urlsRouter.get('/:id', handleLogin, async (request, response) => {
  const id = request.params.id

  const url = await Url.findOne({_id: id}).populate('user')

  url
    ? response.json(url)
    : response.status(404).json({error: 'Not found'})
})

urlsRouter.delete('/:id', handleLogin, async (request, response) => {
  const id = request.params.id
  const res = await Url.findByIdAndDelete(id)

  response.status(204).json(res)
})

urlsRouter.post('/', handleLogin, async (request, response) => {
  const {originalURL, user} = request.body
  
  // conseguir usuario + token
  const uID = request.userID

  // Comprobar que la URL es válida
  if (!validURL.isWebUri(originalURL)) {
    response.status(400).json({error: 'Invalid URL'})
  } else {
    // Comprobar que existe en la base de datos
    let exists = await Url.findOne({originalURL: originalURL})
    if (exists) {
      const userID = await User.findById(uID)
      // Comprobar si el usario que la intenta guardar, ya la tenía
      if(!userID.urls.includes(exists._id)) {
        try {
          exists.user.push(userID)
          userID.urls.push(exists)
          await exists.save()
          await userID.save()
          response.status(201).json(exists)
        } catch (error) {
          console.log('urlsController error: ', error);
        }
      } else {
        // No tendría que devolver nada, porque ya estaría en la UI reflejada
        response.status(200).end()
      }
    } else {
      const shortedURL = shortener.nanoid(8)
      const userID = await User.findOne({username: user})

      const newURL = new Url({
        originalURL: originalURL,
        shortedURL,
        user: [userID._id]
      })

      const savedURL = await newURL.save()
      userID.urls = userID.urls.concat(newURL)
      await userID.save()

      response.status(201).json(savedURL)
    }
  }
})

module.exports = urlsRouter