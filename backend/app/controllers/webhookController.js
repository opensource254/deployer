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
      console.log('hehe')
      const deploy = exec(app.command)
      deploy.on('error', (err) => {
        console.log(err.stack)
      })
      deploy.on('message', (m) => {
        console.log(m)
      })
      deploy.stdout.on('data', (c) => {
        console.log(c)
      })
    }
    res.status(201).json('') // Return 201 to Github
  }
}

module.exports = new WebhookController()
