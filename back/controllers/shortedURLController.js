const shortedURLController = require('express').Router()
const Url = require('../models/urlModel')

// Responsable de la redirección en la aplicación principal
shortedURLController.get('/:id', async (request, response) => {
  const {id} = request.params

  const shortedURLObject = await Url.findOne({shortedURL: id})

  shortedURLObject
    ? response.redirect(shortedURLObject.originalURL)
    : response.status(400).json({error: 'Not found'})

})

module.exports = shortedURLController