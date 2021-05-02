const router = require('express').Router()
const authController = require('../app/controllers/authController')

/**
 *
 * Authenticate a user using email and password
 */
router.post('/login', (req, res) => {
  authController.attempt(req, res)
})

/**
 * Get the current authenticated user
 *
 */
router.get('/user', (req, res) => {
  authController.getUser(req, res)
})

/**
 * Logout a user from the system
 */
router.post('/logout', (req, res) => {
  authController.logout(req, res)
})

module.exports = router
