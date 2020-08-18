const express = require('express')

const Router = express.Router()
const Validate = require('../services/validate')
const deploy = require('../services/deployment')
const successResponse = require('../middleware/successResponse')

/* GET Github's index route */
Router.get('/', successResponse('Github'))

/**  Receive the Github's webhook and handle it */
Router.post('/', async (req, res) => {
    try {
        deploy(await Validate.github(req))
        return res.status(201).json('')
    } catch (error) {
        res.status(error.status ? error.status : 400).json(error.message)
    }
})

module.exports = Router
