const express = require('express');
const AuthController = require('../app/controllers/authController');
const Route = express.Router();
const Validator = require('mevn-validator')

/* GET home page. */
Route.get('/', async (_req, res) => {
  res.json({ 'type': 'Success', message: 'Hurray The API is working' })
})

/** POST /api/login */
Route.post('/login', async (req, res) => {
  try {
    await new Validator(req.body, { email: 'required|email', password: 'string' }).validate()
    req.session.user = await AuthController.login(req.body)
    res.json(req.session.user)
  } catch (error) {
    res.status(422).json(error)
  }
})

/** Register a new user */
Route.post('/register', async (req, res) => {
  try {
    await new Validator(req.body, { email: 'required', password: 'required|min:8' }).validate()
    return res.json(await AuthController.register(req.body))
  } catch (error) {
    res.status(422).json(error)
  }
})

module.exports = Route;
