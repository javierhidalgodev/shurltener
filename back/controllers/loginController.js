const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userModel')

// Login
loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body
    
    // No separar la validación de usuario y password, para no dar pistas de qué está mal
    const user = await User.findOne({ username })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password)
        
    if (!(user && passwordCorrect)) {
        res.status(401).json({error: 'invalid user or password'})
    } else {
        const userForToken = {
            id: user._id,
            username: user.username
        }

        const token = jwt.sign(userForToken, process.env.JWT_SECRET, {expiresIn: 60 * 10})
        
        res.send({
            id: user._id,
            name: user.name,
            username: user.username,
            token
        })
    }
})

module.exports = loginRouter