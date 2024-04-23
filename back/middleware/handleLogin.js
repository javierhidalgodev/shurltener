const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
    const authorization = request.get('authorization')
    let token = null
    
    if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const { id: userID } = decodedToken
    request.userID = userID

    next()
}