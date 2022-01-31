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

  /**
   * Bitbucket handler
   * @route POST /webhooks/bitbucket
   * @group webhooks
   * @returns {object} 201 - A success message
   * @returns {Error}  default - Unexpected error
   */
  .post('/bitbucket', webhookController.bitbucket)

  /**
   * Gitlab handler
   * @route POST /webhooks/gitlab
   * @group webhooks
   * @returns {object} 201 - A success message
   * @returns {Error}  default - Unexpected error
   */
  .post('/gitlab', webhookController.gitlab)

module.exports = router
