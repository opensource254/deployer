const ConfigController = require('../app/controllers/ConfigController')
/* eslint no-unused-vars: "off" */
const auth = require('../app/middleware/auth')()
const Route = require('express').Router()

/** Auth middleware */
Route.use(auth)

/**Get all routes */
Route.get('/', (req, res) => {
    ConfigController.index()
})

/**Get a specified config from the database */
Route.get('/:config', (req, res) => {
    ConfigController.show(req.params.config)
})

/**Update a config */
Route.put('/:config', (req, res) => {
    ConfigController.update(req.params.config, req.body)
})

/**Delete a config */
Route.delete('/:config', (req, res) => {
    ConfigController.delete(req.params.config)
})
