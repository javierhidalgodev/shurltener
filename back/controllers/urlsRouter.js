const urlsRouter = require('express').Router()
const validURL = require('valid-url')
const shortener = require('shortid')
const Url = require('../models/urlModel')

urlsRouter.get('/', async (request, response) => {
  const urls = await Url.find({})
  // console.log(urls)
  response.json(urls)
})

urlsRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  const url = await Url.findOne({shortedURL: id})

  url
    ? response.json(url)
    : response.status(404).json({error: 'Not found'})
})

urlsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const res = await Url.findByIdAndDelete(id)

  response.status(204).json(res)
})

urlsRouter.post('/', async (request, response) => {
  const {originalURL, user} = request.body

  if (!validURL.isWebUri(originalURL)) {
    response.status(400).json({error: 'Invalid URL'})
  } else {
    let exists = await Url.findOne({originalURL: originalURL})

    if (exists) {
      response.status(201).json(exists)
    } else {
      const shortedURL = shortener.generate()

      const newURL = new Url({
        originalURL: originalURL,
        shortedURL,
        user: user
      })

      const savedURL = await newURL.save()

      response.status(201).json(savedURL)
    }
  }
})

module.exports = urlsRouter