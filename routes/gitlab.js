const express = require('express')

const Router = express.Router()
const Validate = require('../services/validate')
const deploy = require('../services/deployment')
const successResponse = require('../middleware/successResponse')

/* GET Gitlab's index route */
Router.get('/', successResponse('Gitlab'))

/** Handle the POST request for gitlab */
Router.post('/', async (req, res) => {
    try {
        deploy(await Validate.gitlab(req.body))
        return res.status(201).json('')
    } catch (error) {
        return res.status(error.status ? error.status : 400).json(error.message)
    }
})

module.exports = Router
