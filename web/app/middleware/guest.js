const guest = (req, res, next) => {
    const { user } = req.session
    if (user) {
        return res.json('You are already logged in')
    }
    next()
}
module.exports = guest