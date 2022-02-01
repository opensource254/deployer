const { DB } = require('mevn-orm')

class Statscontroller {
  /**
   * Get the data for the stats page
   *
   * @param {import('express').Request} req - the request object
   * @param {import('express').Response} res - the response object
   * @param {import('express').NextFunction} next - next callback
   */
  async getStats(req, res, next) {
    try {
      const applicationCount = await DB('applications').count(
        'id AS appCount'
      )
      const failedDeployments = await DB('deployments')
        .where({
          successful: false,
        })
        .count('id AS failedDeploymentCount')
      const successfulDeployments = await DB('deployments')
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
      const deployments = await DB('deployments')
        .join('applications', 'applications.id', 'deployments.application_id')
        .select('deployments.*', 'applications.name AS applicationName')
        .orderBy('deployments.created_at', 'DESC')
        .limit(15)

      res.json(deployments)
    } catch (error) {
      next(error)
    }
  }

  /***
   * Get a single deployment by id
   * @param {import('express').Request} req - the request object
   * @param {import('express').Response} res - the response object
   * @param {import('express').NextFunction} next - next callback
   * @returns {Promise<void>}
   **/
  async getDeployment(req, res, next) {
    try {
      const deployment = await DB.raw(
        `SELECT deployments.log, deployments.created_at, deployments.successful, deployments.id, TIMEDIFF(deployments.updated_at, deployments.created_at) AS duration, applications.name AS applicationName FROM deployments JOIN applications ON applications.id = deployments.application_id WHERE deployments.id = ${req.params.id} limit 1`
      )

      if (!deployment[0]) {
        res.status(404).json({
          message: 'Deployment not found',
        })
      }

      res.json(deployment[0][0])
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Statscontroller()
