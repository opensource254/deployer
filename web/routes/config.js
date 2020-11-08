const ConfigController = require('../app/controllers/ConfigController')
/* eslint no-unused-vars: "off" */
const auth = require('../app/middleware/auth')
const Route = require('express').Router()


/**Get all routes */
Route.get('/', auth, async (req, res) => {
    try {
        const configs = await ConfigController.index()
        res.status(configs.status).json(configs.message)
    } catch (error) {
        res.status(error.status).json(error.message)
    }
})

/**Create a new config */
Route.post('/', auth, async (req, res) => {
    try {
        const cfg = await ConfigController.create(req.body)
        res.status(cfg.status).json(cfg.message)
    } catch (error) {
        res.status(error.status || 422).json(error)
    }
})

/**Get a specified config from the database */
Route.get('/:config', auth, async (req, res) => {
    try {
        const config = await ConfigController.show(req.params.config)
        res.status(config.status).json(config.message)
    } catch (error) {
        res.status(error.message).json(error.message)
    }

})

/**Update a config */
Route.put('/:config', auth, async (req, res) => {
    try {
        const config = await ConfigController.update(req.params.config, req.body)
        res.status(config.status).json(config.message)
    } catch (error) {
        res.status(error.status || 422).json(error.message || error)
    }
})

/**Delete a config */
Route.delete('/:config', auth, async (req, res) => {
    try {
        const config = await ConfigController.delete(req.params.config)
        res.status(config.status).json(config.message)
    } catch (error) {
        res.status(error.status || 422).json(error.message || error)
    }
})

module.exports = Route
