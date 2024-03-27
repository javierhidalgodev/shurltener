const error = (error, req, res, next) => {
  console.log(error.name)
}

module.exports = {
  error
}