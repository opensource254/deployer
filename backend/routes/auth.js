const router = require('express').Router()
const authController = require('../app/controllers/authController')

/**
 *
 * Authenticate a user using email and password
 */
router.post('/login', (req, res, next) => {
  authController.attempt(req, res, next)
})

/**
 * Get the current authenticated user
 *
 */
router.get('/user', (req, res, next) => {
  authController.getUser(req, res, next)
})

/**
 * Logout a user from the system
 */
router.post('/logout', (req, res) => {
  authController.logout(req, res)
})

module.exports = router
