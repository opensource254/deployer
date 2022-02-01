/* eslint-disable camelcase */
const { execFile, exec } = require('child_process')
const { writeFile } = require('fs/promises')
const path = require('path')
const Controller = require('./controller')
const { mail, slack, notifications } = require('../../notifications/notification')

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
    await this.deploy(full_name)
  }


  /**
   * Handle the Bitbucket webhook
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   * @returns {Promise<void>}
   */
  async bitbucket(req, res, next) {
    if (!req.body.repository) {
      return res.status(400).json('No repository provided')
    }
    const { full_name } = req.body.repository
    if (!full_name) {
      return res.status(400).json('Repository name is missing')
    }
    res.status(201).json(`Webhook received for ${full_name}`)
    await this.deploy(full_name)
  }

  /** 
    * Handle the Gitlab webhook
    * @param {import('express').Request} req
    * @param {import('express').Response} res
    * @param {import('express').NextFunction} next
    * @returns {Promise<void>}
    */
  async gitlab(req, res, next) {
    if (!req.body.project) {
      return res.status(400).json('No repository provided')
    }
    const { path_with_namespace } = req.body.project
    if (!path_with_namespace) {
      return res.status(400).json('Repository name is missing')
    }
    res.status(201).json(`Webhook received for ${path_with_namespace}`) // TODO: This is not the correct webhook from Gitlab
    await this.deploy(path_with_namespace)
  }


  /**
   * Handle the deployment
   * @param {String} appName
   * @returns {Promise<void>}
   */
  async deploy(appName) {
    console.log('Deploying')
    let errorLog = ''
    let successLog = ''

    try {
      const app = await this._DB('applications')
        .where({ full_name: appName })
        .first()

      if (app) {
        await this._DB('applications')
          .where({ id: app.id }).update({
            locked: true,
          })
        const [deploymentId] = await this._DB('deployments')
          .insert({
            application_id: app.id,
            log: '',
            successful: 0,
            status: 'pending',
          })
        const deploy = execFile(
          path.resolve(__dirname, '../../../bin/deploy.sh'),
          [app.deploy_directory, app.clone_url, app.deploy_branch]
        )

        deploy.on('close', async (code) => {
          if (code !== 0) {
            await this._DB('deployments')
              .where({ id: deploymentId })
              .update({
                application_id: app.id,
                log: errorLog,
                successful: 0,
                status: 'failed',
                updated_at: new Date(),
              })
          } else {
            await this._DB('deployments')
              .where({ id: deploymentId })
              .update({
                application_id: app.id,
                log: successLog,
                successful: 1,
                status: 'success',
                updated_at: new Date(),
              })
          }
        })

        deploy.stdout.on('data', (c) => {
          successLog += c
        })
        deploy.stderr.on('data', (c) => {
          errorLog += c
        })

        deploy.on('error', (err) => {
          errorLog += err
        })

        deploy.on('message', (m) => {
          successLog += m
        })

        await this._DB('applications')
          .where({ id: app.id })
          .update({
            locked: false,
          })

        console.log(`Deployment of ${appName} finished`)

        return this._sendNotifications()
      }
    }
    catch (err) {
      await writeFile('logs/deploy.log', new Date() + ': ')
      await writeFile('logs/deploy.log', new Error(err).name, { flag: 'a' })
      await writeFile('logs/deploy.log', new Error(err).message, { flag: 'a' })
      await writeFile('logs/deploy.log', new Error(err).stack, { flag: 'a' })
      await writeFile('logs/deploy.log', '\n', { flag: 'a' })
    }
  }

  /**
   * Send notifications to the user
    * @param {import('../models/user').User} user
    * @param {String} type
    * @param {String} content
    * @returns {Promise<void>}
    * @private
    * @memberof WebhookController
    */
  async _sendNotifications(user, type, content) {
    console.log('Sending notifications')
    try {
      mail(user, type, content)
      await slack(user, type, content)
      await notifications(user, type, content)
    } catch (error) {
      console.log(error)
      await writeFile('logs/notifications.log', new Date() + ': ')
      await writeFile('logs/notifications.log', new Error(error).name, { flag: 'a' })
      await writeFile('logs/notifications.log', new Error(error).message, { flag: 'a' })
      await writeFile('logs/notifications.log', new Error(error).stack, { flag: 'a' })
      await writeFile('logs/notifications.log', '\n', { flag: 'a' })
    }
  }
}

module.exports = new WebhookController()
