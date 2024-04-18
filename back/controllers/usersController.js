const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/userModel')
const Url = require('../models/urlModel')
const handleLogin = require('../middleware/handleLogin')

// Listar todos los usuarios #ROOT#
usersRouter.get('/', handleLogin, async (req, res) => {
    const loggedUserID = req.userID
    const loggedUser = await User.findById(loggedUserID)

    if (loggedUser._id.toString() !== process.env.ROOT_ID) {
        return res.status(401).json({error: 'Unauthorized'})
    }
    
    const users = await User.find({}).populate('urls')
    res.json(users)
})

// Listar un usuario #ROOT#
usersRouter.get('/:id', handleLogin, async (req, res) => {
    const loggedUserID = req.userID
    const paramUserID = req.params.id

    // if (loggedUserID.id !== process.env.ROOT_ID) {
    //     return res.status(401).json({error: 'Unauthorized'})
    // }

    const user = await User.findById(paramUserID).populate('urls', {user: 0})
    res.json(user)
})

// Eliminar URLs específicas para usuarios específicos
usersRouter.delete('/:id/:urlID', handleLogin, async (req, res) => {
    const { id, urlID } = req.params
    
    const user = await User.findById(id).populate('urls')
    const url = await Url.findById(urlID)

    const newUserURLs = user.urls.filter(url => url._id.toString() !== urlID)
    const newURLUsers = url.user.filter(user => user.toString() !== id)
    user.urls = newUserURLs
    url.user = newURLUsers
    const newUser = await user.save()
    await url.save()
    res.status(200).json(newUser)
})

// Crear un nuevo usuario (CREAR FUNCIONALIDAD)
usersRouter.post('/', /* handleLogin, */ async (req, res) => {
    // const loggedUserID = req.userID
    // const user = await User.findById(loggedUserID)

    // if (user.username !== 'rootadmin') {
    //     return res.status(401).json({error: 'Unauthorized'})
    // }

    try {
        const body = req.body
        const passwordHash = await bcrypt.hash(body.password, 10)

        const newUser = new User({
            username: body.username,
            name: body.name,
            password: passwordHash,
            urls: []
        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json(error)
    }
})

// Eliminar un usuario #ROOT#
usersRouter.delete('/:id', handleLogin, async (req, res) => {
    const rootID = req.userID
    const user = await User.findById(rootID)

    if (user.username !== 'rootadmin') {
        return res.status(401).json({error: 'Unauthorized'})
    }

    const id = req.params.id
    const deletedUser = await User.findByIdAndDelete(id)
    res.status(204).json(deletedUser)
})

module.exports = usersRouter