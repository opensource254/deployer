// TODO Add bitbucket handler here
const router = require('express').Router()

router.get('/', (_req, res) => {
    res.json({ 'Message': 'Hurray! 🙌. Your Bitbucket Deployer is live' })
})

module.exports = router
