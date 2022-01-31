const router = require('express').Router()
const webhookController = require('../app/controllers/webhookController')

router

  /**
   * Ping the webhook endpoint to check if it's working
   * @route GET /webhooks/ping
   * @group webhooks
   * @returns {object} 200 - A success message
   * @returns {Error}  default - Unexpected error
   */
  .get('/ping', webhookController.ping)
  /**
   * Github hnadler
   */
  .post('/github', webhookController.github)

module.exports = router
