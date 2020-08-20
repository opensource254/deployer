const express = require('express')
const AuthController = require('../app/controllers/authController')

const Route = express.Router()
const Validator = require('mevn-validator')
const guest = require('../app/middleware/guest')
const auth = require('../app/middleware/auth')

/* GET home page. */
Route.get('/', async (_req, res) => {
    res.json({ type: 'Success', message: 'Hurray The API is working' })
})

/** POST /api/login */
Route.post('/login', guest, async (req, res) => {
    try {
        await new Validator(req.body, { email: 'required|email', password: 'string' }).validate()
        const { message, status } = await AuthController.attempt(req.body)
        if (status === 200) {
            req.session.user = message
        }
        res.status(status).json(message)
    } catch (error) {
        res.status(422).json(error)
    }
})

/** Register a new user */
Route.post('/register', guest, async (req, res) => {
    try {
        const { status, message } = await AuthController.register(req.body)
        if (status === 200) {
            req.session.user = message
        }
        return res.status(status).json(message)
    } catch (error) {
        res.status(error.status).json(error)
    }
})

/**Get Logout a user */
Route.post('/logout', auth, (req, res) => {
    req.session = null
    return res.json('You have been signed out')
})

Route.get('/user', auth, (req, res) => {
    res.json(req.session.user)
})

module.exports = Route
