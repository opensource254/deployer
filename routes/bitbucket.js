const Router = require('express').Router()
const Validate = require('../services/validate')
const deploy = require('../services/deployment')

Router.get('/', (_req, res) => {
    res.json({ 'Message': 'Hurray! 🙌. Your Bitbucket Deployer is live' })
})

/**
 * ----------------------------------
 * Handle the incoming webhook
 * ----------------------------------
 */
Router.post('/', async (req, res) => {
    try {
        const Config = await Validate.bitbucket(req.body)
        deploy(Config)
        return res.status(201).json('')
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
})

module.exports = Router
