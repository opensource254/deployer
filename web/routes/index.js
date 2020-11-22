const express = require('express')
const AuthController = require('../app/controllers/AuthController')
const Route = express.Router()
const guest = require('../app/middleware/guest')
const auth = require('../app/middleware/auth')

/* GET the root aof the API */
Route.get('/', async (_req, res) => {
    res.json({ type: 'Success', message: 'Hurray The API is working' })
})

/**
 * GET and set the csrf cookie
 */
Route.get('/csrf-cookie', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken(), { domain: process.env.COOKIE_DOMAIN || 'localhost' })
    res.status(204).json('')
})

/** POST /api/login */
Route.post('/login', guest, async (req, res) => {
    try {
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
    if (process.env.NODE_ENV === 'production') { return res.status(405).json('Method not allowed') }
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
