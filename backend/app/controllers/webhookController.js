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
    const full_name = req.body.repository
    const app = await this._DB('applications').where({ full_name }).first()
    if (app) {
      const deploy = exec(app.command)
      deploy.stdout.on('data', (chunk) => {
        console.log(chunk)
      })
    }
    res.status(201).json('') // Return 201 to Github
  }
}

module.exports = new WebhookController()
