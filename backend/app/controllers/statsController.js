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

  /***
   * Get the deployments list for the deployments page
   * @param {import('express').Request} req - the request object
   * @param {import('express').Response} res - the response object
   * @param {import('express').NextFunction} next - next callback
   * @returns {Promise<void>}
   */
  async getDeployments(req, res, next) {
    try {
      const deployments = await this._DB('deployments')
        .join('applications', 'applications.id', 'deployments.application_id')
        .select('deployments.*', 'applications.name AS applicationName')
        .orderBy('deployments.created_at', 'DESC')
        .limit(15)

      res.json(deployments)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Statscontroller()
