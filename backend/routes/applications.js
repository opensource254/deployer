const router = require('express').Router()

/**
 * Load all the applications from the database.
 * The default result count is 15 per page
 */
router.get('/', (req, res) => {})

/**
 * Create a new application and return it with
 * a 201 response
 */
router.post('/', (req, res) => {})

/**
 * Get a application using it's database ID
 * A 404 response is returned if the application was
 * Not found in the database
 */
router.get('/:id', (req, res) => {})

/**
 * Update an application's information.
 * Returns 201 on success
 */
router.put('/:id', (req, res) => {})

/**
 * Deletes an application from the database
 * A 200 response is returned on success
 */
router.delete('/', (req, res) => {})

module.exports = router
