const router = require('express').Router()

/**
 *
 * Authenticate a user using email and password
 */
router.post('/login', (req, res) => {
  res.json('Login route')
})

/**
 * Get the current authenticated user
 *
 */
router.get('/user', (req, res) => {
  res.json('The current user')
})

/**
 * Logout a user from the system
 */
router.post('/logout', (req, res) => {
  res.json('You have been logged ot')
})

module.exports = router
