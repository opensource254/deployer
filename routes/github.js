const express = require('express');
const Router = express.Router();
const Validate = require('../services/validate');
const deploy = require('../services/deployment');

/* GET home Route. */
Router.get('/', function (_req, res) {
  res.json({
    'Message': 'Hurray! 🙌. Your Github Deployer is live'
  })
});

// Receive the webhook and handle it
Router.post('/', async (req, res) => {
  try {
    const Config = await Validate.github(req.body)
    deploy(Config)
    return res.status(201).json('')
  } catch (error) {
    res.status(400).json(error.message)
    return
  }
})

module.exports = Router;
