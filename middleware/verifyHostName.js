/**
 * The hosts allowed to access the current route
 * @param {Array} allowedHosts 
 */
module.exports = function verifyhostName(allowedHosts = []) {
    if (allowedHosts.length === 0) {
        allowedHosts = process.env.ALLOWED_HOSTS.split(',')
    }
    return (req, res, next) => {
        if (allowedHosts.indexOf(req.hostname) === -1) {
            return res.status(403).json({ message: `${req.hostname} is not allowed to make requests to this endpoint` })
        }
        return next()
    }
}
