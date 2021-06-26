const router = require('express').Router()
const webhookController = require('../app/controllers/webhookController')

router

  /**
   * Github hnadler
   */
  .post('/github', (req, res, next) => {
    webhookController.github(req, res, next)
  })

module.exports = router
