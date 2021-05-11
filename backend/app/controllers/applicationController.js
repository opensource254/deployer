const Controller = require('./controller')

class ApplicationController extends Controller {
  /**
   * Show all the applications. (15 per page)
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  index(req, res) {}

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
