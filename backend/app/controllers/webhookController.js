/* eslint-disable camelcase */
const { exec } = require('child_process')
const Controller = require('./controller')

class WebhookController extends Controller {
  /**
   * Handle the github webhook
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async github(req, res, next) {
    const app = await this._DB('applications')
      .where({ full_name: req.body.repository.full_name })
      .first()
    if (app) {
      const deploy = exec(app.command, async (_err, output, warning) => {
        await this._DB('deployments').insert({
          application_id: app.id,
          log: output,
          successful: 1,
        })
      })
      deploy
        .on('error', (err) => {
          console.log(err.stack)
        })
        .on('message', (m) => {
          console.log(m)
        })

      deploy.stdout.on('data', (c) => {
        console.log(c)
      })
    }
    res.status(201).json('') // Return 201 to Github
  }

  /**
   * Handle the webhook and send the progress to socket.io connection
   * Return a 201 status code to Github
   * Save the log in the database
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   * @returns {Promise<void>}
   * @private
   * @memberof WebhookController
   * @static
   * @method github
   * @alias WebhookController.github
   * @since 0.0.1
   * @category webhook
   * @description Handle the github webhook
   * @example
   */
  async handle(req, res, next) {
    const app = await this._DB('applications')
      .where({ full_name: req.body.repository.full_name })
      .first()
    if (app) {
      const deploy = exec(app.command, async (_err, output, warning) => {
        await this._DB('deployments').insert({
          application_id: app.id,
          log: output,
          successful: 1,
        })
      })
      deploy
        .on('error', (err) => {
          console.log(err.stack)
        })
        .on('message', (m) => {
          console.log(m)
        })

      deploy.stdout.on('data', (c) => {
        this.io.emit('deployment', c)
      })
    }
    res.status(201).json('') // Return 201 to Github
  }
}

module.exports = new WebhookController()
