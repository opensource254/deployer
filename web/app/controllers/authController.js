const User = require('../models/User')
// const Auth = require('../../services/auth')

class AuthController {
    /**
     * Authenticate and start a session
     * @param {Array} credentials
     */
    async login (credentials = []) {
        return new Promise((resolve) => {
            const user = User.whereFirst(credentials)

            resolve(user)
        })
    }

    logout () {

    }

    register (credentials = []) {
        try {
            return User.create(credentials)
        } catch (error) {
            return { status: 500, message: error }
        }
    }
}

module.exports = new AuthController()
