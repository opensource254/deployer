const auth = (req, res, next) => {
    const { user } = req.session
    if (!user) {
        return res.status(401).json('You are not logged in')
    }
    next()
}
module.exports = auth