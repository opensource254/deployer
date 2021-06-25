const router = require('express').Router()
const applicationController = require('../app/controllers/applicationController')

router
  /**
   * List all applications
   */
  .get('/', (req, res, next) => {
    applicationController.index(req, res, next)
  })

  /**
   * Create a new application
   */
  .post('/', (req, res, next) => {
    applicationController.create(req, res, next)
  })

  /**
   * Get an application with :id
   */
  .get('/:id', (req, res) => {})

  /**
   * Update an application
   */
  .put('/:id', (req, res) => {})

  /**
   * Delete an application
   */
  .delete('/:id', (req, res, next) => {
    applicationController.delete(req, res, next)
  })

module.exports = router
