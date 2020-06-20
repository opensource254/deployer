const Router = require('express').Router()
const Validate = require('../services/validate')
const deploy = require('../services/deployment')
const successResponse = require('../middleware/successResponse')

Router.get('/', successResponse('Bitbucket'))
/**
 * ----------------------------------
 * Handle the incoming bitbucket
 * ----------------------------------
 */
Router.post('/', async (req, res) => {
    try {
        deploy(await Validate.bitbucket(req.body))
        return res.status(201).json('')
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
})

module.exports = Router
