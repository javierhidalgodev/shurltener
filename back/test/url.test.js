const data = require('./url_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Url = require('../models/urlModel')

const api = supertest(app)

beforeEach(async () => {
  await Url.deleteMany({})

  const initialURLs = data.URLs.map(url => new Url(url))
  const promiseArray = initialURLs.map(url => url.save())
  await Promise.all(promiseArray)
})

describe('Viewing URLs...', () => {
  test('view URLs', async () => {
    const urls = data.URLs
  
    const result = await api.get('/api/urls')
    expect(result.body).toHaveLength(urls.length)
  })
})

describe('Deleting URLs...', () => {
  test('delete URL', async () => {
    const initialURLs = await Url.find({})
    const urlToDelete = initialURLs[0]
  
    await api.delete(`/api/urls/${urlToDelete.id}`).expect(204)
    
    const result = await api.get('/api/urls')
    expect(result.body).toHaveLength(data.URLs.length - 1)
  })
})

describe('Creating URLs...', () => {
  test('post URL', async () => {
    const newURL = {
      originalURL: 'https://fullstackopen.com/es/part3/guardando_datos_en_mongo_db',
      user: 'Robin'
    }
    
    await api
    .post('/api/urls')
    .send(newURL)
    .expect(201)
    
    const urlsInDB = await Url.find({})
    const contentToCheck = urlsInDB.map(url => url.originalURL)
    
    expect(urlsInDB).toHaveLength(data.URLs.length + 1)
    expect(contentToCheck).toContain(newURL.originalURL)
  })
  
  test('post URL without URL', async () => {
    const newURL = {
      user: 'Robin'
    }

    await api
      .post('/api/urls')
      .send(newURL)
      .expect(201)

  })
})

afterAll(() => {
  mongoose.connection.close()
})
