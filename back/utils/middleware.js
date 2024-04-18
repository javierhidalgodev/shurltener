const ERROR_HANDLERS = {
  JsonWebTokenError: (res, error) => res.status(401).json({error: 'missing or invalid token'}),

  TokenExpiredError: (res, error) => res.status(401).json({error: 'token has been expired or revoked'}),

  defaultError: (res, error) => res.status(500).end()
}

const error = (error, req, res, next) => {
  console.log(error)

  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(res, error)
}

module.exports = {
  error
}