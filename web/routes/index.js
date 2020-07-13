const express = require('express');
const Router = express.Router();

/* GET home page. */
Router.get('/', async (_req, res) => {
  res.json({ 'type': 'Success', message: 'Hurray The API is working' })
})

module.exports = Router;
