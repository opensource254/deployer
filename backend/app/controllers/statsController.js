const Controller = require('./controller')

class Statscontroller extends Controller {
  /**
   * Get the data for the stats page
   *
   * @param {import('express').Request} req - the request object
   * @param {import('express').Response} res - the response object
   * @param {import('express').NextFunction} next - next callback
   */
  async getStats(req, res, next) {
    try {
      const applicationCount = await this._DB('applications').count(
        'id AS appCount'
      )
      const failedDeployments = await this._DB('deployments')
        .where({
          successful: false,
        })
        .count('id AS failedDeploymentCount')
      const successfulDeployments = await this._DB('deployments')
        .where({
          successful: true,
        })
        .count('id AS successfulDeploymentCount')

      const stats = {
        applicationCount: applicationCount[0].appCount,
        failedDeployments: failedDeployments[0].failedDeploymentCount,
        successfulDeployments:
          successfulDeployments[0].successfulDeploymentCount,
        totalDeployments:
          successfulDeployments[0].successfulDeploymentCount +
          failedDeployments[0].failedDeploymentCount,
      }

      res.json(stats)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Statscontroller()
