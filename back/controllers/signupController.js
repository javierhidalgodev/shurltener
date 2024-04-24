const bcrypt = require('bcrypt')
const signRouter = require('express').Router()
const User = require('../models/userModel')

signRouter.post('/', async (req, res) => {
    const { name, username, password } = req.body
    
    const exists = await User.findOne({ username })

    if (exists) {
        res.status(400).json({error: 'Username already in use'})
    } else {
        const passwordHash = await bcrypt.hash(password, 10)
    
        const newUser = new User({
            name,
            username,
            password: passwordHash
        })
    
        const savedUser = await newUser.save()
    
        res.status(201).json({message: 'user created'})
    }
})

module.exports = signRouter