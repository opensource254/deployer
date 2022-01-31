const router = require('express').Router()
const StatsController = require('../app/controllers/statsController')

router.get('/', StatsController.getStats)
router.get('/deployments', StatsController.getDeployments)
router.get('/deployments/:id', StatsController.getDeployment)

module.exports = router
