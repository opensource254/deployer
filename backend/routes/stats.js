const router = require('express').Router()
const StatsController = require('../app/controllers/statsController')

router.get('/', (req, res, next) => {
  StatsController.getStats(req, res, next)
})

module.exports = router
