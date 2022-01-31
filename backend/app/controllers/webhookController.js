/* eslint-disable camelcase */
const { execFile, exec } = require('child_process')
const path = require('path')
const Controller = require('./controller')

class WebhookController extends Controller {
  /**
   * Ping the webhook endpoint to check if it's working
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   * @param {import('express').NextFunction} next 
   * @returns 
   */
  async ping(req, res, next) {
    return res.json({
      message: 'pong',
    })
  }


  /**
   * Handle the github webhook
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async github(req, res, next) {
    if (!req.body.repository) {
      return res.status(400).json('No repository provided')
    }
    const { full_name } = req.body.repository
    if (!full_name) {
      return res.status(400).json('Repository name is missing')
    }
    res.status(201).json(`Webhook received for ${full_name}`)
    const app = await this._DB('applications')
      .where({ full_name: req.body.repository.full_name })
      .first()
    if (app) {
      const [deploymentId] = await this._DB('deployments').insert({
        application_id: app.id,
        log: '',
        successful: 0,
      })
      const deploy = execFile(
        path.resolve(__dirname, '../../../bin/deploy.sh'),
        [app.deploy_directory, app.clone_url, app.deploy_branch]
      )
      // create a write stream and pipe the output to it
      let output = ''
      let errorOutput = ''
      deploy.on('close', async (code) => {
        if (code !== 0) {
          return await this._DB('deployments')
            .where({ id: deploymentId })
            .update({
              application_id: app.id,
              log: errorOutput,
              successful: 0,
              updated_at: new Date(),
            })
        }
        // run the application post deploy script
        const postDeploy = exec(
          `cd ${app.deploy_directory}${app.name} && ${app.deploy_script} && echo "$(date): Deployment successful"`,
          (_err, output, warning) => {
            if (warning) {
              output += warning
            }
          }
        )
        postDeploy
          .on('error', (err) => {
            errorOutput += err
          })
          .on('message', (m) => {
            output += m
          })

        postDeploy.stdout.on('data', (c) => {
          output += c
        })

        postDeploy.stderr.on('data', (c) => {
          errorOutput += c
        })

        postDeploy.on('close', async (code) => {
          if (code !== 0) {
            return await this._DB('deployments')
              .where({ id: deploymentId })
              .update({
                application_id: app.id,
                log: errorOutput,
                successful: 0,
                updated_at: new Date(),
              })
          }
          return await this._DB('deployments')
            .where({ id: deploymentId })
            .update({
              application_id: app.id,
              log: output,
              successful: 1,
              updated_at: new Date(),
            })
        })
      })

      deploy.stdout.on('data', (c) => {
        output += c
      })

      deploy.stderr.on('data', (c) => {
        errorOutput += c
      })

      deploy.on('error', (err) => {
        errorOutput += err
      })

      deploy.on('message', (m) => {
        output += m
      })
    }
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
          // eslint-disable-next-line no-console
          console.log(err.stack)
        })
        .on('message', (m) => {
          // eslint-disable-next-line no-console
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
