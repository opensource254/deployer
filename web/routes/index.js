const express = require('express');
const AuthController = require('../app/controllers/authController');
const Router = express.Router();
const Validator = require('mevn-validator')

/* GET home page. */
Router.get('/', async (_req, res) => {
  res.json({ 'type': 'Success', message: 'Hurray The API is working' })
})

/** POST /api/login */
Router.post('/login', async (req, res) => {
  try {
    await new Validator(req.body, { email: 'required|email', password: 'string' }).validate()
    req.session.user = await AuthController.login(req.body)
    res.json(req.session.user)
  } catch (error) {
    res.status(422).json(error)
  }
})

module.exports = Router;
