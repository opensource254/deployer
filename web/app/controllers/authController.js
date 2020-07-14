const Users = require('../models/User')
const Auth = require('../../services/auth')
class AuthController {

    /**
     * Authenticate and start a session
     * @param {Array} credentials 
     */
    async login(credentials = []) {
        return new Promise((resolve, reject) => {
            const user = Users.whereFirst(credentials)

            resolve(user)
        })
    }

    logout() {

    }
}

module.exports = new AuthController
