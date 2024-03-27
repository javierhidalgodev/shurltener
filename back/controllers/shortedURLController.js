const shortedURLController = require('express').Router()
const Url = require('../models/urlModel')

shortedURLController.get('/:id', async (request, response) => {
  const {id} = request.params

  const shortedURLObject = await Url.findOne({shortedURL: id})

  shortedURLObject
    ? response.redirect(shortedURLObject.originalURL)
    : response.status(400).json({error: 'Not found'})

})

module.exports = shortedURLController