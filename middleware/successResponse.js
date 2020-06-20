/**
 * Return a success ping message
 * @param {String} service 
 */
module.exports = function successResponse(service = '') {
    return (_req, res) => {
        return res.json({ 'Message': `Hurray! 🙌. Your ${service} Deployer is live` })
    }
}
