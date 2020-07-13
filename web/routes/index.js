const express = require('express');
const AuthController = require('../app/controllers/authController');
const Router = express.Router();

/* GET home page. */
Router.get('/', async (_req, res) => {
  res.json({ 'type': 'Success', message: 'Hurray The API is working' })
})

/** POST /api/login */
Router.post('/login', async (req, res) => {
  req.session.user = await AuthController.login()
  res.json(req.session.user)
})

module.exports = Router;
