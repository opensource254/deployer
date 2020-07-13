const Users = require('../models/User')
class AuthController {

    /**
     * Authenticate and start a session
     * @param {Array} credentials 
     */
    async login(credentials = []) {
        return new Promise((resolve, reject) => {
            const user = Users.first()

            resolve(user)
        })
    }

    logout() {

    }
}

module.exports = new AuthController
