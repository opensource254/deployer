const { DB } = require('mevn-orm')
const Application = require('../models/application')
const Controller = require('./controller')

class ApplicationController extends Controller {
  /**
   * Show all the applications. (15 per page)
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async index(req, res, next) {
    try {
      const apps = await DB('applications').limit(15)
      res.json(apps)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Create a new event
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async create(req, res, next) {
    // eslint-disable-next-line camelcase
    const { name, full_name, command } = req.body
    try {
      const exists = await DB('applications')
        .where('name', name)
        .orWhere('full_name', full_name)
        .first()
      if (exists) {
        return res
          .status(422)
          .json({ errors: { name: ['The application already exists'] } })
      }
      const app = await Application.create({
        name,
        full_name,
        command,
      })

      res.status(201).json(app)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Show an application with a given ID
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  show(req, res) {}

  /**
   * Update information about a particular event
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  update(req, res) {}

  /**
   * Delete an application from the database
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  delete(req, res) {}
}

module.exports = new ApplicationController()
