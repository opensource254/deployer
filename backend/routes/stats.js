const router = require('express').Router()
const StatsController = require('../app/controllers/statsController')

router.get('/', (req, res, next) => {
  StatsController.getStats(req, res, next)
})

router.get('/deployments', (req, res, next) => {
  StatsController.getDeployments(req, res, next)
})

module.exports = router
