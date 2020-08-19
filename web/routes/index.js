const express = require('express')
const AuthController = require('../app/controllers/authController')

const Route = express.Router()
const Validator = require('mevn-validator')

/* GET home page. */
Route.get('/', async (_req, res) => {
    res.json({ type: 'Success', message: 'Hurray The API is working' })
})

/** POST /api/login */
Route.post('/login', async (req, res) => {
    try {
        await new Validator(req.body, { email: 'required|email', password: 'string' }).validate()
        const { message, status } = await AuthController.attempt(req.body)
        req.session.user = message
        res.status(status).json(message)
    } catch (error) {
        res.status(422).json(error)
    }
})

/** Register a new user */
Route.post('/register', async (req, res) => {
    try {
        const { status, message } = await AuthController.register(req.body)
        return res.status(status).json(message)
    } catch (error) {
        res.status(error.status).json(error)
    }
})

module.exports = Route
