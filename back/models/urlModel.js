const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const urlSchema = new mongoose.Schema({
  originalURL: {
    type: String,
    required: true
  },
  shortedURL: {
    type: String,
    required: true
  },
  user: {
    type: String
  }
}) 

urlSchema.plugin(uniqueValidator)

urlSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(),
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Url', urlSchema, 'urls')