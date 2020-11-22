const { Router } = require('express')
const auth = require('../app/middleware/auth')
const router = Router()
const configController = require('../app/controllers/ConfigController')
/**
 * Excecute a given command
 * 
 */
router.post('/run', auth, async (req, res) => {
    try {
        const output = await configController.run(req.body.command)
        res.status(output.status).json(output.message)
    } catch (error) {
        res.json(error)
    }

})

module.exports = router